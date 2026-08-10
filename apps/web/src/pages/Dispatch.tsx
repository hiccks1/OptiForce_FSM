import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';  
import FullCalendar from '@fullcalendar/react';  
import resourceTimelinePlugin from '@fullcalendar/react-scheduler/resource-timeline';  
import scrollGridPlugin from '@fullcalendar/react-scheduler/scrollgrid';  
import dayGridPlugin from '@fullcalendar/react/daygrid';  
import timeGridPlugin from '@fullcalendar/react/timegrid';  
import interactionPlugin from '@fullcalendar/react/interaction';  
import formaThemePlugin from '@fullcalendar/react/themes/forma';  
import './calendar.css';  
import '@fullcalendar/react/skeleton.css';  
import '@fullcalendar/react/themes/forma/theme.css';  
import '@fullcalendar/react/themes/forma/palettes/blue.css';  
  
import Layout from '../components/Layout';  
import { api, type CalendarEvent, type Customer } from '../api/client';  
import { theme, statusColor } from '../theme';  
  
const TECHS = [  
 
  { id: 'installer_manual', name: 'Manual Hernandez' },
  { id: 'user_comp_demo_002_csr', name: 'CSR - Newport Smart Automation' },
  { id: 'user_comp_demo_002_manager', name: 'Manager - Newport Smart Automation' },
  { id: 'user_comp_demo_002_owner', name: 'Owner - Newport Smart Automation' },
  { id: 'user_comp_demo_002_tech0', name: 'Dana Ruiz' }, 
  { id: 'user_comp_demo_002_tech1', name: 'Leo Chen' }, 
  { id: 'user_comp_demo_002_tech2', name: 'Sarah Hendricks' }, 
  { id: 'user_comp_demo_002_tech3', name: 'Ravi Okafor' }, 
  { id: 'user_comp_demo_002_tech4', name: 'Nina Pratt' }, 
  { id: 'user_comp_demo_002_tech5', name: 'Owen Lopez' }, 
  { id: 'user_comp_demo_002_tech6', name: 'Mia Nguyen' }, 
 ];  
  
type ViewMode = 'resourceTimelineDay' | 'resourceTimelineWeek' | 'resourceTimelineMonth';  
  
type Editing =  
  | { mode: 'create'; date: Date; technicianId?: string }  
  | { mode: 'edit'; event: CalendarEvent }  
  | null;  
  
export default function Dispatch(): React.JSX.Element {  
  const calendarRef = useRef<FullCalendar>(null);  
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);  
  const [, setCustomers] = useState<Customer[]>([]);  
  const [techFilter, setTechFilter] = useState('');  
  const [editing, setEditing] = useState<Editing>(null);  
  const [msg, setMsg] = useState('');  
  const [currentRange, setCurrentRange] = useState<{ start: string; end: string }>({ start: '', end: '' });  
  const [viewMode, setViewMode] = useState<ViewMode>('resourceTimelineWeek');  
  
  const load = useCallback(async (startIso?: string, endIso?: string) => {  
    const start = startIso || currentRange.start;  
    const end = endIso || currentRange.end;  
    if (!start || !end) return;  
  
    const [calendarRes, customerRes] = await Promise.all([  
      api.listCalendar({ start, end }),  
      api.listCustomers(),  
    ]);  
    if (calendarRes.ok) setEvents(calendarRes.data.events);  
    if (customerRes.ok) setCustomers(customerRes.data.customers);  
  }, [currentRange]);  
  
  useEffect(() => {  
    // initial range: current week  
    const now = new Date();  
    const start = new Date(now); start.setDate(now.getDate() - now.getDay());  
    const end = new Date(start); end.setDate(start.getDate() + 7);  
    setCurrentRange({ start: start.toISOString(), end: end.toISOString() });  
    load(start.toISOString(), end.toISOString());  
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, []);  
  
  const changeViewMode = (newMode: ViewMode) => {  
    setViewMode(newMode);  
    calendarRef.current?.getApi().changeView(newMode);  
  };  
  
  const handleDatesSet = (dateInfo: any) => {  
    setCurrentRange({ start: dateInfo.startStr, end: dateInfo.endStr });  
    load(dateInfo.startStr, dateInfo.endStr);  
  };  
  
  const visibleEvents = useMemo(() => {  
    const source = techFilter ? events.filter((e) => e.technicianId === techFilter) : events;  
    return source.map((e) => {  
      const color = statusColor[(e.status || '').toUpperCase()] || theme.primary || '#1d4ed8';  
      return {  
        id: e.id,  
        resourceId: e.technicianId || undefined,  
        title: `${e.customerName || 'No Name'} — ${e.title}`,  
        start: e.start,  
        end: e.end,  
        backgroundColor: color,  
        borderColor: color,  
        textColor: '#ffffff',  
        extendedProps: { ...e },  
      };  
    });  
  }, [events, techFilter]);  
  
  const unscheduledEvents = useMemo(() => events.filter((e) => !e.technicianId), [events]);  
  const calendarResources = useMemo(() => TECHS.map((t) => ({ id: t.id, title: t.name })), []);  
  
  const handleEventDrop = async (dropInfo: any) => {  
    const { event } = dropInfo;  
    const rawProps = event.extendedProps as CalendarEvent;  
    const resources = event.getResources();  
    const targetTechId = resources && resources[0] ? resources[0].id : rawProps.technicianId;  
    const techName = TECHS.find((t) => t.id === targetTechId)?.name || null;  
  
    setEvents((prev) => prev.map((ev) => ev.id === event.id ? {  
      ...ev,  
      technicianId: targetTechId,  
      start: event.startStr || new Date(event.start).toISOString(),  
      end: event.endStr || new Date(event.end).toISOString(),  
    } : ev));  
  
    const res = await api.updateVisit(rawProps.jobId, event.id, {  
      start: event.startStr || new Date(event.start).toISOString(),  
      end: event.endStr || new Date(event.end).toISOString(),  
      technicianId: targetTechId || null,  
      technicianName: techName,  
    });  
    if (!res.ok) { setMsg('Failed to sync appointment change to server.'); load(); }  
  };  
  
  const getTradeIcon = (title = '') => {  
    const t = title.toLowerCase();  
    if (t.includes('electr')) return '⚡';  
    if (t.includes('plumb')) return '🪠';  
    if (t.includes('heat')) return '🔥';  
    if (t.includes('air') || t.includes('ac') || t.includes('hvac')) return '❄️';  
    return '🛠️';  
  };  
  
  const renderEventContent = (eventInfo: any) => {  
    const props = eventInfo.event.extendedProps || {};  
    const status = (props.status || '').toLowerCase();  
    const tradeIcon = getTradeIcon(eventInfo.event.title);  
  
    let borderColor = 'transparent';  
    if (status === 'enroute' || status === 'en_route') borderColor = '#f59e0b';  
    else if (status === 'on site' || status === 'on_site') borderColor = '#10b981';  
    else if (status === 'scheduled') borderColor = '#3b82f6';  
  
    return (  
      <div style={{  
        display: 'flex', flexDirection: 'column', gap: 2, padding: '4px 6px',  
        width: '100%', height: '100%', boxSizing: 'border-box',  
        whiteSpace: 'normal', overflow: 'hidden',  
        borderLeft: `3px solid ${borderColor}`,  
      }}>  
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>  
          <span style={{ flexShrink: 0, fontSize: 13 }}>{tradeIcon}</span>  
          <span style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'normal', wordBreak: 'break-word' }}>  
            {props.customerName || 'No Name'}  
          </span>  
        </div>  
        {eventInfo.timeText && <div style={{ fontSize: 11, opacity: 0.9 }}>{eventInfo.timeText}</div>}  
        <div style={{ fontSize: 11, whiteSpace: 'normal', wordBreak: 'break-word' }}>{props.title}</div>  
        {props.address?.line1 && (  
          <div style={{ fontSize: 10, opacity: 0.85, whiteSpace: 'normal', wordBreak: 'break-word' }}>  
            {props.address.line1}  
          </div>  
        )}  
      </div>  
    );  
  };  
  
  const toggle = (mode: ViewMode, label: string) => (  
    <button  
      onClick={() => changeViewMode(mode)}  
      style={{ border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '6px 12px', background: viewMode === mode ? '#fff' : 'transparent', color: viewMode === mode ? '#111' : '#fff' }}  
    >{label}</button>  
  );  
  
  return (  
    <Layout  
      title="Dispatch Center Matrix"  
      actions={  
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>  
          <div style={{ display: 'flex', background: '#1d4ed8', borderRadius: 10, padding: 4 }}>  
            {toggle('resourceTimelineDay', 'Day')}  
            {toggle('resourceTimelineWeek', 'Week')}  
            {toggle('resourceTimelineMonth', 'Month')}  
          </div>  
          <select value={techFilter} onChange={(e) => setTechFilter(e.target.value)} style={{ padding: '9px 10px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 13 }}>  
            <option value="">All technicians</option>  
            {TECHS.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}  
          </select>  
          <button onClick={() => setEditing({ mode: 'create', date: new Date() })} style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}>+ New visit</button>  
        </div>  
      }  
    >  
      {msg && <div style={{ background: '#ecfdf5', color: '#047857', padding: 12, borderRadius: 8, marginBottom: 14, fontSize: 14, fontWeight: 500 }}>{msg}</div>}  
  
	<div style={{ display: 'grid',  
gridTemplateColumns: '1fr',          // one full-width column  
gridTemplateRows: '1fr 98px',       // calendar takes the rest, backlog = 98px strip at bottom  
gap: '12px', alignItems: 'stretch', height: 'calc(100vh - 140px)', width: '100%',                        // full width instead of a fixed 1260px  
overflow: 'hidden' }}>  
                   <div
          className="fc-theme-customizer"  
          style={{ background: '#fff', borderRadius: 12, border: `1px solid ${theme.border}`, padding: 12, boxShadow: '0 2px 5px rgba(0,0,0,0.06)', overflowX: 'auto', overflowY: 'auto', minWidth: 0 }}  
        >  
          <FullCalendar  
            ref={calendarRef}  
            plugins={[formaThemePlugin, scrollGridPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}  
            initialView={viewMode}  
            schedulerLicenseKey="CC-Attribution-NonCommercial"  
            headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}  
            resourceAreaHeaderContent="Technician"  
            resourceAreaWidth="180px"  
            slotMinTime="06:00:00"  
            slotMaxTime="18:00:00"  
            allDaySlot={false}  
            editable  
            selectable  
            expandRows  
            height="100%"  
            resources={calendarResources}  
            events={visibleEvents}  
            eventContent={renderEventContent}  
            datesSet={handleDatesSet}  
            eventDrop={handleEventDrop}  
            eventResize={handleEventDrop}  
            eventClick={(clickInfo) => setEditing({ mode: 'edit', event: clickInfo.event.extendedProps as CalendarEvent })}  
            select={(selectInfo: any) => setEditing({ mode: 'create', date: new Date(selectInfo.startStr), technicianId: selectInfo.resource?.id })}  
            views={{  
              resourceTimelineDay: { slotDuration: '00:15:00', slotMinWidth: 120 },  
              resourceTimelineWeek: { slotDuration: { hours: 1 }, slotMinWidth: 120 },  
              resourceTimelineMonth: { slotDuration: { days: 1 }, slotMinWidth: 110 },  
            }}  
          />  
        </div>  
  
        <div style={{ background: '#fff', padding: 12, borderRadius: 12, border: `1px solid ${theme.border}`, boxShadow: '0 2px 5px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>  
          <h3 style={{ margin: '0 0 10px 0', fontSize: 14, fontWeight: 700, color: theme.text }}>  
            Unscheduled Backlog ({unscheduledEvents.length})  
          </h3>  
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, overflowY: 'auto', flexGrow: 1 }}>  
            {unscheduledEvents.length === 0 ? (  
              <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No unassigned tickets.</div>  
            ) : unscheduledEvents.map((e) => (  
              <div key={e.id} onClick={() => setEditing({ mode: 'edit', event: e })}  
                style={{ padding: 10, background: '#f8fafc', borderRadius: 8, border: `1px solid ${theme.border}`, cursor: 'pointer' }}  
                onMouseEnter={(el) => (el.currentTarget.style.background = '#f1f5f9')}  
                onMouseLeave={(el) => (el.currentTarget.style.background = '#f8fafc')}  
              >  
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>  
                  <span style={{ fontSize: 14 }}>{getTradeIcon(e.title)}</span>  
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{e.customerName || 'Unknown Client'}</div>  
                </div>  
                <div style={{ color: '#64748b', fontSize: 12, paddingLeft: 4, marginTop: 3 }}>{e.title}</div>  
              </div>  
            ))}  
          </div>  
        </div>  
      </div>  
  
      {editing && (  
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>  
          <div style={{ background: '#fff', padding: 24, borderRadius: 12, width: 420, border: `1px solid ${theme.border}`, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>  
            <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 700 }}>{editing.mode === 'create' ? 'Schedule Visit' : 'Manage Visit'}</h4>  
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>  
              {editing.mode === 'create'  
                ? `Booking slot on: ${editing.date.toLocaleString()}`  
                : `Editing "${editing.event.title}" for ${editing.event.customerName}`}  
            </p>  
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>  
              <button onClick={() => setEditing(null)} style={{ padding: '8px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', background: '#fff', fontWeight: 600, fontSize: 13 }}>Close</button>  
              {editing.mode === 'edit' && (  
                <button onClick={async () => {  
                  const res = await api.cancelVisit(editing.event.jobId, editing.event.id);  
                  if (res.ok) { setEditing(null); load(); } else setMsg('Error canceling visit.');  
                }} style={{ padding: '8px 16px', border: 'none', borderRadius: 8, cursor: 'pointer', background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: 13 }}>Cancel Visit</button>  
              )}  
            </div>  
          </div>  
        </div>  
      )}  
    </Layout>  
  );  
}
