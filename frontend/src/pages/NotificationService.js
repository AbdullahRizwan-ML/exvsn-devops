import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";

function NotificationService() {
  const [activeTab, setActiveTab] = useState("alerts");
  const [isSending, setIsSending] = useState(false);

  const notificationMetrics = [
    { title: "Total Alerts", value: "1,247", change: 12.5, changeType: "positive", icon: "🔔", trend: [1000, 1050, 1100, 1150, 1200, 1247] },
    { title: "Delivery Rate", value: "98.2%", change: 0.8, changeType: "positive", icon: "📤", trend: [97, 97.2, 97.5, 97.8, 98, 98.2] },
    { title: "Open Rate", value: "34.5%", change: -2.1, changeType: "negative", icon: "👁️", trend: [36, 35.5, 35, 34.8, 34.7, 34.5] },
    { title: "Click Rate", value: "8.7%", change: 1.2, changeType: "positive", icon: "🖱️", trend: [7.5, 7.8, 8, 8.2, 8.5, 8.7] }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Notification Service
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Manage alerts and notifications across your platform
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button 
            variant="secondary"
            onClick={() => alert("Send test notification")}
          >
            Send Test
          </Button>
          <Button 
            variant="primary" 
            onClick={() => alert("Create new notification")}
          >
            Create Alert
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
        gap: 20, 
        marginBottom: 32 
      }}>
        {notificationMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Recent Alerts</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { title: "Price Drop Alert", message: "Competitor dropped prices by 5%", time: "2 hours ago", type: "price" },
            { title: "Forecast Complete", message: "Q4 demand forecast generated", time: "4 hours ago", type: "forecast" },
            { title: "System Maintenance", message: "Scheduled maintenance at 2 AM", time: "6 hours ago", type: "system" }
          ].map((alert, index) => (
            <div key={index} style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 12, 
              padding: "16px",
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              background: "white"
            }}>
              <div style={{ fontSize: 20 }}>🔔</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: "#111827", marginBottom: 4 }}>{alert.title}</div>
                <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}>{alert.message}</div>
                <div style={{ color: "#9ca3af", fontSize: 12 }}>{alert.time}</div>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default NotificationService;
