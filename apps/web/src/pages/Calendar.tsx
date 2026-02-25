export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import React, { useEffect, useMemo, useState } from "react";
import type { Visit } from "../types";
import { api } from "../api/client";
import { CalendarView } from "../components/CalendarView";
import { Button, Card, Input, Pill } from "../components/ui";

function isoRangeForMonth(anchor: Date) {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  start.setHours(0, 0, 0, 0);

  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);

  return { from: start.toISOString(), to: end.toISOString() };
}

export default function CalendarPage() {
  const [anchor, setAnchor] = useState(() => new Date());
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [techFilter, setTechFilter] = useState("");

  const [selected, setSelected] = useState<Visit | null>(null);
  const [createSeed, setCreateSeed] = useState<{ startIso: string; endIso: string } | null>(null);

  const range = useMemo(() => isoRangeForMonth(anchor), [anchor]);

  async function refresh() {
    setLoading(true);
    setError(null);

    const res = await api.listVisits({
      from: range.from,
      to: range.to,
      technicianId: undefined,
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    const tf = techFilter.trim();
    const filtered = tf ? res.data.filter((v) => (v.technicianId ?? "") === tf) : res.data;

    setVisits(filtered);
  }

  useEffect(() => {
    void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range.from, range.to]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 800px at 10% 10%, rgba(0,0,0,0.06), transparent), radial-gradient(900px 600px at 90% 0%, rgba(0,0,0,0.05), transparent), #f6f6f7",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Scheduling</div>
            <div style={{ fontSize: 24, fontWeight: 750, letterSpacing: -0.2 }}>Calendar</div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {loading ? <Pill>Loading…</Pill> : <Pill>{visits.length} events</Pill>}
            <Button variant="ghost" onClick={() => setAnchor(new Date())}>
              Today
            </Button>
            <Button variant="ghost" onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() - 1, 1))}>
              Prev
            </Button>
            <Button variant="ghost" onClick={() => setAnchor(new Date(anchor.getFullYear(), anchor.getMonth() + 1, 1))}>
              Next
            </Button>
          </div>
        </div>

        <Card style={{ padding: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 320 }}>
                <Input
                  placeholder="Filter by technicianId (optional)"
                  value={techFilter}
                  onChange={(e) => setTechFilter(e.target.value)}
                />
              </div>
              <Button variant="ghost" onClick={() => void refresh()}>
                Refresh
              </Button>
            </div>

            {error ? <div style={{ color: "#b00020", fontSize: 13 }}>{error}</div> : null}
          </div>
        </Card>

        <CalendarView
          visits={visits}
          onSelectVisit={(v) => setSelected(v)}
          onCreateAt={(startIso, endIso) => setCreateSeed({ startIso, endIso })}
        />

        {(selected || createSeed) ? (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.25)",
              display: "grid",
              placeItems: "center",
              padding: 18,
            }}
            onMouseDown={() => {
              setSelected(null);
              setCreateSeed(null);
            }}
          >
            <div style={{ width: "min(720px, 96vw)" }} onMouseDown={(e) => e.stopPropagation()}>
              <Card style={{ padding: 14 }}>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 750 }}>{selected ? "Edit visit" : "New visit"}</div>

                  <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>Start</div>
                      <Input
                        value={(selected?.scheduledStart ?? createSeed?.startIso) ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (selected) setSelected({ ...selected, scheduledStart: v });
                          else if (createSeed) setCreateSeed({ ...createSeed, startIso: v });
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>End</div>
                      <Input
                        value={(selected?.scheduledEnd ?? createSeed?.endIso) ?? ""}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (selected) setSelected({ ...selected, scheduledEnd: v });
                          else if (createSeed) setCreateSeed({ ...createSeed, endIso: v });
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>Technician ID</div>
                      <Input
                        placeholder="optional"
                        value={selected?.technicianId ?? ""}
                        onChange={(e) => {
                          if (!selected) return;
                          setSelected({ ...selected, technicianId: e.target.value || undefined });
                        }}
                      />
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>Title</div>
                      <Input
                        placeholder="Visit"
                        value={selected?.title ?? ""}
                        onChange={(e) => {
                          if (!selected) return;
                          setSelected({ ...selected, title: e.target.value });
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelected(null);
                        setCreateSeed(null);
                      }}
                    >
                      Cancel
                    </Button>

                    {selected ? (
                      <Button
                        onClick={async () => {
                          const jobId = selected.jobId;
                          if (!jobId) throw new Error("Missing jobId on visit");

                          const res = await api.updateVisit(
                            { jobId, visitId: selected.id },
                            {
                              scheduledStart: selected.scheduledStart,
                              scheduledEnd: selected.scheduledEnd,
                              technicianId: selected.technicianId,
                              title: selected.title,
                              notes: selected.notes,
                              customerName: selected.customerName,
                              address: selected.address,
                            }
                          );

                          if (!res.ok) throw new Error(res.error);
                          setSelected(null);
                          await refresh();
                        }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        onClick={async () => {
                          if (!createSeed) return;

                          const res = await api.createVisit({
                            scheduledStart: createSeed.startIso,
                            scheduledEnd: createSeed.endIso,
                          });

                          if (!res.ok) throw new Error(res.error);
                          setCreateSeed(null);
                          await refresh();
                        }}
                      >
                        Create
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
