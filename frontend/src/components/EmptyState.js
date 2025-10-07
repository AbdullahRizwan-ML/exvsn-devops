import React from "react";

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div style={{ textAlign: "center", padding: "40px", border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ color: "#6b7280", marginBottom: 12 }}>{description}</div>
      {actionLabel && (
        <button onClick={onAction} style={{ background: "#14b8a6", color: "white", border: "none", padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}>{actionLabel}</button>
      )}
    </div>
  );
}

export default EmptyState;


