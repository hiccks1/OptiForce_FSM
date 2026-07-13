export const DRIFTY_FILE_CONTRACT = {
  driftyVersion: "1.0.0",
  layers: ["L3_INTEGRATION"],
};

import React from 'react';

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        background: 'rgba(255,255,255,0.85)',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 16,
        boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
        ...props.style,
      }}
    />
  );
}

export function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }
) {
  const variant = props.variant ?? 'primary';

  const base: React.CSSProperties = {
    borderRadius: 12,
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid rgba(0,0,0,0.10)',
    cursor: props.disabled ? 'not-allowed' : 'pointer',
    opacity: props.disabled ? 0.6 : 1,
    transition: 'transform 0.08s ease, background 0.15s ease',
    userSelect: 'none',
  };

  const stylesByVariant: Record<string, React.CSSProperties> = {
    primary: { background: '#111', color: '#fff', borderColor: '#111' },
    ghost: { background: 'transparent', color: '#111' },
    danger: { background: '#fff', color: '#b00020', borderColor: 'rgba(176,0,32,0.25)' },
  };

  return (
    <button
      {...props}
      style={{ ...base, ...stylesByVariant[variant], ...props.style }}
      onMouseDown={(e) => {
        props.onMouseDown?.(e);
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        props.onMouseUp?.(e);
        (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
      }}
    />
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: '100%',
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.12)',
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        background: 'rgba(255,255,255,0.9)',
        ...props.style,
      }}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: '100%',
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.12)',
        padding: '10px 12px',
        fontSize: 14,
        outline: 'none',
        background: 'rgba(255,255,255,0.9)',
        ...props.style,
      }}
    />
  );
}

export function Label(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      style={{
        fontSize: 12,
        color: 'rgba(0,0,0,0.60)',
        marginBottom: 6,
        ...props.style,
      }}
    />
  );
}

export function Pill(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 10px',
        borderRadius: 999,
        border: '1px solid rgba(0,0,0,0.10)',
        background: 'rgba(255,255,255,0.70)',
        fontSize: 12,
        ...props.style,
      }}
    />
  );
}
