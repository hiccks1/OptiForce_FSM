export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import React, { useState } from 'react';
import { api } from '../api/client';
import { CustomerForm } from '../components/CustomerForm';
import { Card, Pill } from '../components/ui';

export default function NewCustomerPage() {
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div style={{ minHeight: '100vh', background: '#f6f6f7', padding: 20 }}>
      <div style={{ maxWidth: 720, margin: '0 auto', display: 'grid', gap: 14 }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.55)' }}>CRM</div>
          <div style={{ fontSize: 24, fontWeight: 750, letterSpacing: -0.2 }}>Create customer</div>
        </div>

        <CustomerForm
          onCancel={() => history.back()}
          onSubmit={async (data) => {
            setError(null);
            const res = await api.createCustomer(data);
            if (!res.ok) {
              setError(res.error);
              return;
            }
            setCreatedId(res.data.id);
          }}
        />

        {error ? <div style={{ color: '#b00020', fontSize: 13 }}>{error}</div> : null}

        {createdId ? (
          <Card style={{ padding: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>Customer created.</div>
            <Pill>ID: {createdId}</Pill>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
