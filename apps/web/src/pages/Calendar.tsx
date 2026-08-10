import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';  
import FullCalendar from '@fullcalendar/react';  
import resourceTimelinePlugin from '@fullcalendar/react-scheduler/resource-timeline';  
import dayGridPlugin from '@fullcalendar/react/daygrid';  
import timeGridPlugin from '@fullcalendar/react/timegrid';  
import interactionPlugin from '@fullcalendar/react/interaction';  
import scrollGridPlugin from '@fullcalendar/react-scheduler/scrollgrid';  
  
// Theme plugin JS + CSS layers (forma theme, blue palette)  
import formaThemePlugin from '@fullcalendar/react/themes/forma';  
import '@fullcalendar/react/skeleton.css';  
import '@fullcalendar/react/themes/forma/theme.css';  
import '@fullcalendar/react/themes/forma/palettes/blue.css';  
// Your own overrides — loaded LAST so it wins over the forma theme  
import './calendar.css';  
  
import Layout from '../components/Layout';  
import { api, type CalendarEvent } from '../api/client';  
import { theme, statusColor } from '../theme';  
  
const TECHS = [  
  { id: 'tech_amir', name: 'Amir Kaplan' },  
  { id: 'tech_dana', name: 'Dana Ruiz' },  
  { id: 'tech_leo', name: 'Leo Chen' },  
  { id: 'lead_jaime', name: 'Jaime Perez' },  
  { id: 'supervisor_luis', name: 'Luis Florez' },  
  { id: 'runner_chris', name: 'Chris Johnson' },  
  { id: 'sales_advisor_sammy', name: 'Sam Murphy' },  
  { id: 'installer_manual', name: 'Manual Hernandez' },  
];  
  
type ViewMode = 'resourceTimelineDay' | 'resourceTimelineWeek' | 'resourceTimelineMonth';  
  
type Editing =  
  | { mode: 'create'; date: Date; technicianId?: string }  
  | { mode: 'edit'; event: CalendarEvent }  
  | null;  
  
// Renders each job card with wrapping text so all info shows  
function renderEventContent(eventInfo: any) {  
  const props = eventInfo.event.extendedProps as CalendarEvent;  
  return (  
    <div  
      style={{  
        display: 'flex',  
        flexDirection: 'column',  
        gap: 2,  
        padding: '4px 6px',  
        width: '100%',  
        height: '100%',  
        boxSizing: 'border-box',  
        whiteSpace: 'normal',  
        overflow: 'hidden',  
      }}  
    >  
      <div style={{ fontSize: 12, fontWeight: 700, whiteSpace: 'normal', wordBreak: 'break-word' }}>  
        {props.customerName || 'No Name'}  
      </div>  
      {eventInfo.timeText && <div style={{ fontSize: 11, opacity: 0.9 }}>{eventInfo.timeText}</div>}  
      <div style={{ fontSize: 11, whiteSpace: 'normal', wordBreak: 'break-word' }}>{props.title}</div>  
      {props.address && (  
        <div style={{ fontSize: 10, opacity: 0.85, whiteSpace: 'normal', wordBreak: 'break-word' }}>  
          {props.address}  
        </div>  
      )}  
      {props.technicianName && <div style={{ fontSize: 10, opacity: 0.85 }}>{props.technicianName}</div>}  
    </div>  
  );  
}  
  
export default function Calendar(): React.JSX.Element {  
  const calendarRef = useRef<FullCalendar>(null);  
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);  
  const [techFilter, setTechFilter] = useState('');  
  const [editing, setEditing] = useState<Editing>(null);  
  const [msg, setMsg] = useState('');  
  
  // Track the range FullCalendar currently displays  
  const [currentRange, setCurrentRange] = useState<{ start: string; end: string }>({ start: '', end: '' });  
  
  // All views are resource-timeline so they scroll horizontally  
  const [viewMode, setViewMode] = useState<ViewMode>('resourceTimelineWeek');  
  
  // FIX: derive BOTH start and end from the args (master had `const start = dIso || currentRange.end`  
  // where `dIso` was undefined and `end` was never defined — nothing ever loaded).  
  const load = useCallback(  
    async (startIso?: string, endIso?: string) => {  
      const start = startIso || currentRange.start;  
      const end = endIso || currentRange.end;  
      if (!start || !end) return;  
  
      const calendarRes = await api.listCalendar({ start, end });  
      if (calendarRes.ok) setEvents(calendarRes.data.events);  
    },  
    [currentRange],  
  );  
  
  useEffect(() => {  
    load();  
  }, [load]);  
  
  // Switch views through the FullCalendar API. Types now match the state.  
  const changeViewMode = (newMode: ViewMode) => {  
    setViewMode(newMode);  
    calendarRef.current?.getApi()?.changeView(newMode);  
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
        extendedProps: { ...e },  
      };  
    });  
  }, [events, techFilter]);  
  
  const unscheduledEvents = useMemo(() => events.filter((e) => !e.technicianId), [events]);  
  const calendarResources = useMemo(() => TECHS.map((t) => ({ id: t.id, title: t.name })), []);  
  
  const handleFullCalendarEventDrop = async (dropInfo: any) => {  
    const { event } = dropInfo;  
    const rawProps = event.extendedProps as CalendarEvent;  
  
    const resources = event.getResources();  
    const targetTechId = resources && resources[0] ? resources[0].id : rawProps.technicianId;  
    const techName = TECHS.find((t) => t.id === targetTechId)?.name || null;  
  
    setEvents((prev) =>  
      prev.map((ev) =>  
        ev.id === event.id  
          ? {  
              ...ev,  
              technicianId: targetTechId,  
              start: event.startStr || new Date(event.start).toISOString(),  
              end: event.endStr || new Date(event.end).toISOString(),  
            }  
          : ev,  
      ),  
    );  
  
    const res = await api.updateVisit(rawProps.jobId, event.id, {  
      start: event.startStr || new Date(event.start).toISOString(),  
      end: event.endStr || new Date(event.end).toISOString(),  
      technicianId: targetTechId || null,  
      technicianName: techName,  
    });  
  
    if (!res.ok) {  
      setMsg('Failed to sync appointment positioning alterations to server.');  
      load();  
    }  
  };  
  
  const navBtn = (active: boolean): React.CSSProperties => ({  
    border: 'none',  
    borderRadius: 8,  
    fontSize: 13,  
    fontWeight: 600,  
    cursor: 'pointer',  
    padding: '6px 12px',  
    background: active ? '#fff' : 'transparent',  
    color: active ? '#111' : '#fff',  
  });  
  
  return (  
    <Layout  
      title="Dispatch Center Matrix"  
      actions={  
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>  
          <div style={{ display: 'flex', background: '#1d4ed8', borderRadius: 10, padding: 4 }}>  
            <button onClick={() => changeViewMode('resourceTimelineDay')} style={navBtn(viewMode === 'resourceTimelineDay')}>  
              Day View  
            </button>  
            <button onClick={() => changeViewMode('resourceTimelineWeek')} style={navBtn(viewMode === 'resourceTimelineWeek')}>  
              Week View  
            </button>  
            <button onClick={() => changeViewMode('resourceTimelineMonth')} style={navBtn(viewMode === 'resourceTimelineMonth')}>  
              Month View  
            </button>  
          </div>  
  
          <select  
            value={techFilter}  
            onChange={(e) => setTechFilter(e.target.value)}  
            style={{ padding: '9px 10px', borderRadius: 10, border: `1px solid ${theme.border}`, fontSize: 13 }}  
          >  
            <option value="">All technicians</option>  
            {TECHS.map((t) => (  
              <option key={t.id} value={t.id}>  
                {t.name}  
              </option>  
            ))}  
          </select>  
  
          <button  
            onClick={() => setEditing({ mode: 'create', date: new Date() })}  
            style={{ background: theme.primary, color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 600, cursor: 'pointer' }}  
          >  
            + New visit  
          </button>  
        </div>  
      }  
    >  
      {msg && (  
        <div style={{ background: '#ecfdf5', color: '#047857', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14, fontWeight: 500 }}>  
          {msg}  
        </div>  
      )}  
  
      {/* Main split: wide calendar + narrow unscheduled backlog */}  
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20, alignItems: 'start' }}>  
        {/* FullCalendar mount — horizontal scroll via overflowX on the wrapper */}  
        <div  
          className="fc-theme-customizer"  
          style={{  
            background: '#fff',  
            borderRadius: 12,  
            border: `1px solid ${theme.border}`,  
            padding: 16,  
            boxShadow: '0 2px 5px rgba(0,0,0,0.06)',  
            height: 'calc(100vh - 180px)',  
            overflowX: 'auto',  
            overflowY: 'auto',  
          }}  
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
            eventContent={renderEventContent}  
            resources={calendarResources}  
            events={visibleEvents}  
            datesSet={handleDatesSet}  
            eventDrop={handleFullCalendarEventDrop}  
            eventResize={handleFullCalendarEventDrop}  
            eventClick={(clickInfo) => setEditing({ mode: 'edit', event: clickInfo.event.extendedProps as CalendarEvent })}  
            select={(selectInfo: any) =>  
              setEditing({ mode: 'create', date: new Date(selectInfo.startStr), technicianId: selectInfo.resource?.id })  
            }  
            views={{  
              resourceTimelineDay: { slotDuration: '00:30:00', slotMinWidth: 90 },  
              resourceTimelineWeek: { slotDuration: { hours: 6 }, slotMinWidth: 120 },  
              resourceTimelineMonth: { slotDuration: { days: 1 }, slotMinWidth: 110 },  
            }}  
          />  
        </div>  
  
        {/* Unscheduled backlog sidebar */}  
        <div style={{ background: '#fff', padding: 16, borderRadius: 12, border: `1px solid ${theme.border}`, boxShadow: '0 2px 5px rgba(0,0,0,0.06)' }}>  
          <h3 style={{ margin: '0 0 12px 0', fontSize: 14, fontWeight: 700, color: theme.text }}>  
            Unscheduled Backlog Queue ({unscheduledEvents.length})  
          </h3>  
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 'calc(100vh - 260px)', overflowY: 'auto', paddingRight: 4 }}>  
            {unscheduledEvents.length === 0 ? (  
              <div style={{ color: '#94a3b8', fontSize: 13, textAlign: 'center', padding: '20px 0' }}>No unassigned backlog tickets.</div>  
            ) : (  
              unscheduledEvents.map((e) => (  
                <div  
                  key={e.id}  
                  onClick={() => setEditing({ mode: 'edit', event: e })}  
                  style={{ padding: 10, background: '#f8fafc', borderRadius: 8, border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'background 0.2s' }}  
                  onMouseEnter={(el) => (el.currentTarget.style.background = '#f1f5f9')}  
                  onMouseLeave={(el) => (el.currentTarget.style.background = '#f8fafc')}  
                >  
                  <div style={{ fontWeight: 600, color: '#1e293b', fontSize: 13 }}>{e.customerName || 'Unknown Client'}</div>  
                  <div style={{ color: '#64748b', marginTop: 3, fontSize: 12 }}>{e.title}</div>  
                </div>  
              ))  
            )}  
          </div>  
        </div>  
      </div>  
  
      {/* Edit / create modal */}  
      {editing && (  
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>  
          <div style={{ background: '#fff', padding: 24, borderRadius: 12, width: 480, border: `1px solid ${theme.border}`, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.25)' }}>  
            <h4 style={{ margin: '0 0 8px 0', fontSize: 16, fontWeight: 700 }}>  
              {editing.mode === 'create' ? 'Schedule Visit Window' : 'Manage Existing Visit'}  
            </h4>  
            <p style={{ fontSize: 13, color: '#64748b', margin: '0 0 20px 0', lineHeight: 1.5 }}>  
              {editing.mode === 'create'  
                ? `Booking targeted slot on: ${editing.date.toLocaleString()}`  
                : `Editing: "${editing.event.title}" for customer ${editing.event.customerName}`}  
            </p>  
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>  
              <button  
                onClick={() => setEditing(null)}  
                style={{ padding: '8px 16px', border: `1px solid ${theme.border}`, borderRadius: 8, cursor: 'pointer', background: '#fff', fontWeight: 600, fontSize: 13 }}  
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
                  style={{ padding: '8px 16px', border: 'none', borderRadius: 8, cursor: 'pointer', background: '#ef4444', color: '#fff', fontWeight: 600, fontSize: 13 }}  
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
