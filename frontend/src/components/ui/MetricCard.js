import React from "react";
import Card from "./Card";

function MetricCard({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon, 
  trend = [],
  style = {} 
}) {
  const changeColor = changeType === "positive" ? "#10b981" : changeType === "negative" ? "#ef4444" : "#6b7280";
  
  return (
    <Card style={{ ...style }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#6b7280" }}>
          {title}
        </h3>
        {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
      </div>
      
      <div style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 4 }}>
        {value}
      </div>
      
      {change !== undefined && (
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ 
            color: changeColor, 
            fontSize: 12, 
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 2
          }}>
            {changeType === "positive" ? "↗" : changeType === "negative" ? "↘" : "→"}
            {Math.abs(change)}%
          </span>
          <span style={{ fontSize: 12, color: "#6b7280" }}>vs last month</span>
        </div>
      )}
      
      {trend.length > 0 && (
        <div style={{ marginTop: 12, height: 20 }}>
          <svg width="100%" height="20" style={{ overflow: "visible" }}>
            <polyline
              points={trend.map((val, i) => `${(i / (trend.length - 1)) * 100},${20 - (val / Math.max(...trend)) * 15}`).join(" ")}
              fill="none"
              stroke={changeColor}
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </div>
      )}
    </Card>
  );
}

export default MetricCard;
