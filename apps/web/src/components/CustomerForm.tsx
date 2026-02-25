export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import React, { useState } from 'react';
import { Button, Card, Input, Label } from './ui';

export function CustomerForm(props: {
  onSubmit: (data: { name: string; email?: string; phone?: string }) => Promise<void> | void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <Card style={{ padding: 16 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>New customer</div>
        <Button variant="ghost" onClick={props.onCancel}>Close</Button>
      </div>

      <div style={{ marginTop: 14, display: 'grid', gap: 12 }}>
        <div>
          <Label>Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>
        <div>
          <Label>Email</Label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@company.com" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 555-5555" />
        </div>
      </div>

      {error ? (
        <div style={{ marginTop: 10, color: '#b00020', fontSize: 13 }}>{error}</div>
      ) : null}

      <div style={{ marginTop: 14, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={props.onCancel} disabled={busy}>Cancel</Button>
        <Button
          variant="primary"
          disabled={busy || name.trim().length < 2}
          onClick={async () => {
            setBusy(true);
            setError(null);
            try {
              await props.onSubmit({
                name: name.trim(),
                email: email.trim() || undefined,
                phone: phone.trim() || undefined,
              });
            } catch (e) {
              setError(e instanceof Error ? e.message : 'Failed to create customer');
            } finally {
              setBusy(false);
            }
          }}
        >
          Create
        </Button>
      </div>
    </Card>
  );
}
