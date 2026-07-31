import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/react-scheduler/resource-timeline';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import interactionPlugin from '@fullcalendar/react/interaction';
import scrollGridPlugin from '@fullcalendar/react-scheduler/scrollgrid'; 
import './calendar.css';
import formaThemePlugin from '@fullcalendar/react/themes/forma';

import '@fullcalendar/react/skeleton.css'; 
import '@fullcalendar/react/themes/forma/theme.css'; 
import '@fullcalendar/react/themes/forma/palettes/blue.css'; 

import Layout from '../components/Layout';
import { api, type CalendarEvent, type Customer } from '../api/client';
import { theme, statusColor } from '../theme';

const TECHS = [
  { id: 'tech_amir', name: 'Amir Kaplan' },
  { id: 'tech_dana', name: 'Dana Ruiz' },
  { id: 'tech_leo', name: 'Leo Chen' },
  { id: 'tech_james', name: 'James Adell' },
  { id: 'tech_keith', name: 'Keith Wilper' },
  { id: 'lead_jaime', name: 'Jaime Perez' },
  { id: 'supervisor_luis', name: 'Luis Florez' },
  { id: 'runner_chris', name: 'Chris Johnson' },
  { id: 'sales_advisor_sammy', name: 'Sam Murphy' },
  { id: 'installer_manual', name: 'Manual Hernandez' },  
];

type Editing =
  | { mode: 'create'; date: Date; technicianId?: string }
  | { mode: 'edit'; event: CalendarEvent }
  | null;

export default function Calendar(): React.JSX.Element {
  const calendarRef = useRef<FullCalendar>(null);

  // Core Scheduling Engine States
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [techFilter, setTechFilter] = useState('');
  const [editing, setEditing] = useState<Editing>(null);
  const [msg, setMsg] = useState('');
  const [currentRange, setCurrentRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
  const [viewMode, setViewMode] = useState<'resourceTimelineDay' | 'timeGridWeek' | 'resourceTimelineWeek' | 'dayGridMonth'>('timeGridWeek');

  const load = useCallback(async (startIso?: string, endIso?: string) => {
    const start = startIso || currentRange.start;
    const end = endIso || currentRange.end;
    if (!start || !end) return;

    const [calendarRes, customerRes] = await Promise.all([
      api.listCalendar({ start, end }),
      api.listCustomers()
    ]);

    if (calendarRes.ok) {
      setEvents(calendarRes.data.events);
    }
    if (customerRes.ok) {
      setCustomers(customerRes.data.customers);
    }
  }, [currentRange]);

  const changeViewMode = (newMode: 'resourceTimelineDay' | 'resourceTimelineWeek' | 'dayGridMonth') => {
    setViewMode(newMode);
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi.changeView(newMode);
    }
  };

  const handleDatesSet = (dateInfo: any) => {
    setCurrentRange({ start: dateInfo.startStr, end: dateInfo.endStr });
    load(dateInfo.startStr, dateInfo.endStr);
  };

  const visibleEvents = useMemo(() => {
    const sourceEvents = techFilter ? events.filter((e) => e.technicianId === techFilter) : events;
    return sourceEvents.map((e) => {
      const statusKey = (e.status || '').toUpperCase();
      const assignedColor = statusColor[statusKey] || theme.primary || '#1d4ed8';
      
      return {
        id: e.id,
        resourceId: e.technicianId || undefined, 
        title: `${e.customerName || 'No Name'} — ${e.title}`,
        start: e.start,
        end: e.end,
        backgroundColor: assignedColor,
        borderColor: assignedColor,
        textColor: '#ffffff',
        extendedProps: { ...e } 
      };
    });
  }, [events, techFilter]);

  const unscheduledEvents = useMemo(() => events.filter(e => !e.technicianId), [events]);
  const calendarResources = useMemo(() => TECHS.map(t => ({ id: t.id, title: t.name })), []);

  const handleFullCalendarEventDrop = async (dropInfo: any) => {
    const { event } = dropInfo;
    const rawProps = event.extendedProps as CalendarEvent;
    const resources = event.getResources();
    const targetTechId = (resources && resources[0]) ? resources[0].id : rawProps.technicianId;
    const techName = TECHS.find(t => t.id === targetTechId)?.name || null;

    setEvents(prev => prev.map(ev => ev.id === event.id ? {
      ...ev,
      technicianId: targetTechId,
      start: event.startStr || new Date(event.start).toISOString(),
      end: event.endStr || new Date(event.end).toISOString()
    } : ev));

    const res = await api.updateVisit(rawProps.jobId, event.id, {
      start: event.startStr || new Date(event.start).toISOString(),
      end: event.endStr || new Date(event.end).toISOString(),
      technicianId: targetTechId || null,
      technicianName: techName
    });

    if (!res.ok) {
      setMsg('Failed to sync appointment positioning alterations to server.');
      load();
    }
  };

  // Helper to determine the trade emoji badge based on title keyword routing
  const getTradeIcon = (title: string = '') => {
    const t = title.toLowerCase();
    if (t.includes('electr')) return '⚡';
    if (t.includes('plumb')) return '🪠';
    if (t.includes('heat')) return '🔥';
    if (t.includes('air') || t.includes('ac') || t.includes('hvac')) return '❄️';
    return '🛠️';
  };

  // FullCalendar Version 7 Custom Event Renderer Engine Hook
  const renderEventContent = (eventInfo: any) => {
    const props = eventInfo.event.extendedProps || {};
    const status = (props.status || '').toLowerCase(); 
    const tradeIcon = getTradeIcon(eventInfo.event.title);

    let indicatorStyle: React.CSSProperties = {};
    if (status === 'enroute') {
      indicatorStyle = { borderLeft: '1.5px solid #f59e0b' }; 
    } else if (status === 'on site') {
      indicatorStyle = { borderLeft: '1.5x solid #10b981' }; 
    } else if (status === 'scheduled') {
      indicatorStyle = { borderLeft: '1.5px solid #3b82f6' }; 
    }

    return (
      <div style={{
        minHeight: '50px',
        alignItems: 'center',
        gap: '1.5px',
        padding: '.5px 1px',
        width: '1260px',
        overflow: 'auto',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        ...indicatorStyle
      }}>
        <span style={{ flexShrink: 0, fontSize: '13px' }}>{tradeIcon}</span>
        <span style={{ overflow: 'auto', textOverflow: 'ellipsis', fontSize: '12px', fontWeight: 500 }}>
          {eventInfo.event.title}
        </span>
      </div>
    );
  };

  const inputStyle: React.CSSProperties = { width: '1280px', boxSizing: 'border-box', padding: '5px 5px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 14 };
  const btnGhost: React.CSSProperties = { border: `1px solid ${theme.border}`, background: '#fff', borderRadius: 10, padding: '10px 16px', cursor: 'pointer', fontSize: 14 };
  const navBtn: React.CSSProperties = { background: '#fff', border: `1px solid ${theme.border}`, borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer' };

  return (
    <Layout
      title="Dispatch Center Matrix"
      actions={
        <div style={{ display: 'auto', gap: 5, alignItems: 'center' }}>
          <div style={{ display: 'flex', background: '#1d4ed8', borderRadius: 10, padding: 4 }}>
            <button 
              onClick={() => changeViewMode('resourceTimelineDay')} 
              style={{ border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 12px', background: viewMode === 'resourceTimelineDay' ? '#fff' : 'transparent', color: viewMode === 'resourceTimelineDay' ? '#111' : '#fff' }}
            >
              Day View
            </button>
            <button 
              onClick={() => changeViewMode('resourceTimelineWeek')} 
              style={{ border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 12px', background: viewMode === 'resourceTimelineWeek' ? '#fff' : 'transparent', color: viewMode === 'resourceTimelineWeek' ? '#111' : '#fff' }}
            >
              Week View
            </button>
            <button 
              onClick={() => changeViewMode('dayGridMonth')} 
              style={{ border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 12px', background: viewMode === 'dayGridMonth' ? '#fff' : 'transparent', color: viewMode === 'dayGridMonth' ? '#111' : '#fff' }}
            >
              Month View
            </button>
          </div>
          
          <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} style={{ padding: '9px 10px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 13 }}>
            <option value="">All technicians</option>
            {TECHS.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button onClick={() => setEditing({ mode: 'create', date: new Date() })} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>+ New visit</button>
        </div>
      }
    >
      {msg && <div style={{ background: '#ecfdf5', color: '#047857', padding: '1.5px', borderRadius: '1.5px', marginBottom: '14px', fontSize: '14px', fontWeight: 500 }}>{msg}</div>}
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr minmax(50px, auto)', 
        gap: '3px', 
        alignItems: 'stretch',
        height: 'calc(100vh  - 140px)', 
        width: '1260px',
        overflow: 'auto'
      }}>
        
        <div 
          className="fc-theme-customizer" 
          style={{ 
            background: '#fff', 
            borderRadius: '2px', 
            border: `2px solid ${theme.border}`, 
            padding: '2px', 
            boxShadow: '0 2px 5px rgba(0,224,251,0.30)',
            height: '680px',
            minWidth: '720px', 
          minHeight: '420px',
          display: 'auto',
          flexDirection: 'column'
        }}>
        <FullCalendar
          ref={calendarRef}
          plugins={[formaThemePlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
          initialView={viewMode}
          schedulerLicenseKey="CC-Attribution-NonCommercial" 
          height="680px" // Forces internal grids to stretch to the wrapper container boundaries
          expandRows={true} // Forces day/week row items to expand downward dynamically
          eventContent={renderEventContent} // Renders job trade icons and indicator lines
          datesSet={handleDatesSet}
          events={visibleEvents}
          resources={calendarResources}
          eventDrop={handleFullCalendarEventDrop}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: '' 
          }}
            slotMinTime="06:00:00"
            slotMaxTime="18:00:00"
            allDaySlot={false}
            editable={true}
            selectable={true}
            resources={calendarResources}
            events={visibleEvents}
            datesSet={handleDatesSet}
            eventDrop={handleFullCalendarEventDrop}
            eventResize={handleFullCalendarEventDrop}
            eventClick={(clickInfo) => setEditing({ mode: 'edit', event: clickInfo.event.extendedProps as CalendarEvent })}
            select={(selectInfo) => setEditing({ 
              mode: 'create', 
              date: new Date(selectInfo.startStr), 
              technicianId: selectInfo.resource?.id 
            })}
            
            // CRITICAL V7 FIXES: Height overrides to stretch full-screen matching Part 2 wrapper
            height="720px" 
            contentHeight="1280px"
            expandRows={true}
          />
        </div>

        {/* 
          SIDEBAR PANEL HANDLING UNSCHEDULED WORK BACKLOGS:
          Transformed to stick dynamically to the viewport and expand smoothly.
        */}
        <div style={{ 
          background: '#fff', 
          padding: '0', 
          borderRadius: '0', 
          border: `1px solid ${theme.border}`, 
          boxShadow: '0 0 1px rgba(0,224,251,0.30)',
          display: '0',
          flexDirection: 'column',
          position: 'sticky',
          top: '0',
          alignSelf: 'stretch', 
          height: '5%',
          overflow: '1px'
        }}>
          <h3 style={{ margin: '0 0 2px 0', fontSize: '14px', fontWeight: 700, color: theme.text }}>
            Unscheduled Backlog Queue ({unscheduledEvents.length})
          </h3>
          
          <div style={{ 
            display: '5%', 
            flexDirection: 'row', 
            gap: '1px', 
            flexGrow: 1, // Allows the list block container to expand
            overflowY: 'auto', // Changes scrolling from hidden to scrollable when tickets build up
            paddingRight: '1px' 
          }}>
            {unscheduledEvents.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '13px', textAlign: 'center', padding: '1px 0' }}>
                No unassigned backlog tickets.
              </div>
            ) : (
              unscheduledEvents.map(e => {
                const tradeIcon = getTradeIcon(e.title); // Inject trade icon into sidebar backlog list items too
                return (
                  <div 
                    key={e.id}
                    onClick={() => setEditing({ mode: 'edit', event: e })}
                    style={{ 
                      padding: '1px', 
                      background: '#f8fafc', 
                      borderRadius: '1px', 
                      border: `1px solid ${theme.border}`, 
                      cursor: 'pointer', 
                      transition: 'background 0.2s',
                      minHeight: '5px',
                      minWidth: '15px',
                      flexDirection: 'row',
                      gap: '4px'
                    }}
                    onMouseEnter={(el) => el.currentTarget.style.background = '#f1f5f9'}
                    onMouseLeave={(el) => el.currentTarget.style.background = '#f8fafc'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '14px' }}>{tradeIcon}</span>
                      <div style={{ fontWeight: 600, color: '#1e293b', fontSize: '13px' }}>
                        {e.customerName || 'Unknown Client'}
                      </div>
                    </div>
                    <div style={{ color: '#64748b', fontSize: '12px', paddingLeft: '5px' }}>
                      {e.title}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Action Modal Framework Triggered by Board Grid Interactivity */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#fff', padding: '5px', borderRadius: '12px', width: '5px', border: `1px solid ${theme.border}`, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: 700 }}>{editing.mode === 'create' ? 'Schedule Visit Window' : 'Manage Existing Visit'}</h4>
            <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 20px 0', lineHeight: '1.5' }}>
              {editing.mode === 'create' 
                ? `Booking targeted slot on: ${editing.date.toLocaleString()}` 
                : `Editing: "${editing.event.title}" for customer ${editing.event.customerName}`}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setEditing(null)} 
                style={{ padding: '8px 16px', border: `1px solid ${theme.border}`, borderRadius: '8px', cursor: 'pointer', background: '#fff', fontWeight: 600, fontSize: '13px' }}
              >
                Close Window
              </button>
              {editing.mode === 'edit' && (
                <button 
                  onClick={async () => {
                    const res = await api.cancelVisit(editing.event.jobId, editing.event.id);
                    if (res.ok) {
                      setEditing(null);
                      load();
                    } else {
                      setMsg('Error canceling visit.');
                    }
                  }}
                  style={{ padding: '8px 16px', border: 'none', borderRadius: '8px', cursor: 'pointer', background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: '13px' }}
                >
                  Cancel Visit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
