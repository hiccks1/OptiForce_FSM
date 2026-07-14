import React, { useMemo, useState } from "react";
import type { Visit } from "../types";
import { Button, Card, Pill } from "./ui";

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d: Date, days: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return x;
}

function fmtShort(d: Date) {
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

function monthMatrix(anchor: Date) {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const firstDow = (first.getDay() + 6) % 7; // monday=0
  const gridStart = addDays(first, -firstDow);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) days.push(addDays(gridStart, i));
  return days;
}

export function CalendarView(props: {
  visits: Visit[];
  onSelectVisit?: (v: Visit) => void;
  onCreateAt?: (startIso: string, endIso: string) => void;
}) {
  const [anchor, setAnchor] = useState(() => startOfDay(new Date()));
  const [selectedDay, setSelectedDay] = useState(() => startOfDay(new Date()));

  const days = useMemo(() => monthMatrix(anchor), [anchor]);

  const visitsByDay = useMemo(() => {
    const map = new Map<string, Visit[]>();
    for (const v of props.visits) {
      const key = startOfDay(new Date(v.scheduledStart)).toISOString();
      const arr = map.get(key) ?? [];
      arr.push(v);
      map.set(key, arr);
    }
    for (const arr of map.values()) {
      arr.sort((x, y) => +new Date(x.scheduledStart) - +new Date(y.scheduledStart));
    }
    return map;
  }, [props.visits]);

  const agenda = useMemo(() => {
    const key = startOfDay(selectedDay).toISOString();
    return visitsByDay.get(key) ?? [];
  }, [visitsByDay, selectedDay]);

  const monthLabel = anchor.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();
  const inMonth = (d: Date) => d.getMonth() === anchor.getMonth();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.35fr 0.85fr", gap: 16 }}>
      <Card style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              variant="ghost"
              onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}
            >
              ←
            </Button>
            <div style={{ fontSize: 18, fontWeight: 650 }}>{monthLabel}</div>
            <Button
              variant="ghost"
              onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}
            >
              →
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={() => {
              const now = new Date();
              const start = new Date(now);
              start.setMinutes(0, 0, 0);
              const end = new Date(start);
              end.setHours(end.getHours() + 1);
              props.onCreateAt?.(start.toISOString(), end.toISOString());
            }}
          >
            New visit
          </Button>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", padding: "4px 6px" }}>
              {d}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 6, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {days.map((d) => {
            const key = startOfDay(d).toISOString();
            const count = visitsByDay.get(key)?.length ?? 0;

            const selected = isSameDay(d, selectedDay);
            const today = isSameDay(d, new Date());

            return (
              <div
                key={key}
                onClick={() => setSelectedDay(startOfDay(d))}
                style={{
                  borderRadius: 14,
                  border: selected ? "1px solid rgba(0,0,0,0.35)" : "1px solid rgba(0,0,0,0.08)",
                  background: selected ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.55)",
                  padding: 10,
                  minHeight: 78,
                  cursor: "pointer",
                  position: "relative",
                  opacity: inMonth(d) ? 1 : 0.45,
                }}
                title={d.toDateString()}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{d.getDate()}</div>
                  {today ? <Pill style={{ padding: "4px 8px", fontSize: 11 }}>Today</Pill> : null}
                </div>

                <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {count > 0 ? (
                    <Pill style={{ fontSize: 11 }}>
                      {count} event{count === 1 ? "" : "s"}
                    </Pill>
                  ) : (
                    <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>—</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Agenda</div>
            <div style={{ fontSize: 18, fontWeight: 650 }}>{fmtShort(selectedDay)}</div>
          </div>

          <Button
            variant="ghost"
            onClick={() => {
              const s = startOfDay(selectedDay);
              const start = new Date(s);
              start.setHours(9, 0, 0, 0);
              const end = new Date(start);
              end.setHours(end.getHours() + 1);
              props.onCreateAt?.(start.toISOString(), end.toISOString());
            }}
          >
            + Add
          </Button>
        </div>

        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 10 }}>
          {agenda.length === 0 ? (
            <div style={{ padding: 14, borderRadius: 14, border: "1px dashed rgba(0,0,0,0.15)", color: "rgba(0,0,0,0.55)" }}>
              No visits.
            </div>
          ) : (
            agenda.map((v) => (
              <div
                key={v.id}
                onClick={() => props.onSelectVisit?.(v)}
                style={{
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid rgba(0,0,0,0.08)",
                  background: "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 650 }}>{v.title || v.customerName || "Visit"}</div>
                  <Pill style={{ fontSize: 11 }}>{v.status}</Pill>
                </div>
                <div style={{ marginTop: 6, fontSize: 13, color: "rgba(0,0,0,0.65)" }}>
                  {fmtTime(v.scheduledStart)} – {fmtTime(v.scheduledEnd)}
                  {v.technicianName ? ` · ${v.technicianName}` : ""}
                </div>
                {v.address?.line1 ? (
                  <div style={{ marginTop: 6, fontSize: 12, color: "rgba(0,0,0,0.55)" }}>{v.address.line1}</div>
                ) : null}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
