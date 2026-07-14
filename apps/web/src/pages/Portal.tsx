import React, { useEffect, useState } from "react";
import type { Visit } from "../types";
import { api } from "../api/client";
import { Button, Card, Input, Pill } from "../components/ui";

function fmtWhen(v: Visit) {
  const s = new Date(v.scheduledStart);
  const e = new Date(v.scheduledEnd);
  const day = s.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  const start = s.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  const end = e.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${day} · ${start} – ${end}`;
}

export default function PortalPage() {
  const [items, setItems] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reschedule, setReschedule] = useState<Visit | null>(null);
  const [draftStart, setDraftStart] = useState("");
  const [draftEnd, setDraftEnd] = useState("");

  async function refresh() {
    setLoading(true);
    setError(null);
    const res = await api.portalUpcoming();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setItems(res.data.visits);
  }

  useEffect(() => {
    void refresh();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(1200px 800px at 20% 10%, rgba(0,0,0,0.06), transparent), #f6f6f7",
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto", display: "grid", gap: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)" }}>Customer portal</div>
            <div style={{ fontSize: 24, fontWeight: 750, letterSpacing: -0.2 }}>Your visits</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {loading ? <Pill>Loading…</Pill> : <Pill>{items.length} upcoming</Pill>}
            <Button variant="ghost" onClick={() => void refresh()}>
              Refresh
            </Button>
          </div>
        </div>

        {error ? <Card style={{ padding: 14, color: "#b00020" }}>{error}</Card> : null}

        <div style={{ display: "grid", gap: 12 }}>
          {items.length === 0 ? (
            <Card style={{ padding: 16, color: "rgba(0,0,0,0.55)" }}>No upcoming visits.</Card>
          ) : (
            items.map((v) => (
              <Card key={`${v.jobId}:${v.id}`} style={{ padding: 16 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 750 }}>{v.title || "Scheduled visit"}</div>
                    <div style={{ marginTop: 6, color: "rgba(0,0,0,0.65)", fontSize: 14 }}>{fmtWhen(v)}</div>

                    {v.technicianName ? (
                      <div style={{ marginTop: 6, color: "rgba(0,0,0,0.55)", fontSize: 13 }}>
                        Technician: {v.technicianName}
                      </div>
                    ) : null}

                    {v.address?.line1 ? (
                      <div style={{ marginTop: 6, color: "rgba(0,0,0,0.55)", fontSize: 13 }}>{v.address.line1}</div>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
                    <Pill>{v.status}</Pill>
                    <div style={{ display: "flex", gap: 10 }}>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setReschedule(v);
                          setDraftStart(v.scheduledStart);
                          setDraftEnd(v.scheduledEnd);
                        }}
                      >
                        Reschedule
                      </Button>

                      <Button
                        variant="danger"
                        onClick={async () => {
                          const reason = prompt("Reason for cancellation?")?.trim();
                          if (!reason) return;
                          const res = await api.portalCancel(v.id, { reason });
                          if (!res.ok) {
                            alert(res.error);
                            return;
                          }
                          await refresh();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {reschedule ? (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.25)",
              display: "grid",
              placeItems: "center",
              padding: 18,
            }}
            onMouseDown={() => setReschedule(null)}
          >
            <div style={{ width: "min(720px, 96vw)" }} onMouseDown={(e) => e.stopPropagation()}>
              <Card style={{ padding: 14 }}>
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ fontSize: 18, fontWeight: 750 }}>Reschedule visit</div>

                  <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>Start</div>
                      <Input value={draftStart} onChange={(e) => setDraftStart(e.target.value)} />
                    </div>

                    <div>
                      <div style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", marginBottom: 6 }}>End</div>
                      <Input value={draftEnd} onChange={(e) => setDraftEnd(e.target.value)} />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 4 }}>
                    <Button variant="ghost" onClick={() => setReschedule(null)}>
                      Cancel
                    </Button>

                    <Button
                      onClick={async () => {
                        const jobId = reschedule.jobId;
                        if (!jobId) {
                          alert("Missing jobId on visit");
                          return;
                        }

                        const res = await api.portalReschedule(
                          { jobId, visitId: reschedule.id },
                          {
                            scheduledStart: draftStart,
                            scheduledEnd: draftEnd,
                          }
                        );

                        if (!res.ok) {
                          alert(res.error);
                          return;
                        }

                        setReschedule(null);
                        await refresh();
                      }}
                    >
                      Confirm
                    </Button>
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
