import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";
import Chart from "../components/ui/Chart";
import { useAuth } from "../context/AuthContext";

function UserProfile() {
  const { userEmail, userName } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const userStats = [
    { title: "Total Revenue", value: "$24,580", change: 12.5, changeType: "positive", icon: "💰", trend: [18, 22, 19, 25, 28, 24] },
    { title: "Active Projects", value: "8", change: 2, changeType: "positive", icon: "📊", trend: [5, 6, 7, 6, 8, 8] },
    { title: "Conversion Rate", value: "3.2%", change: -0.5, changeType: "negative", icon: "📈", trend: [3.5, 3.2, 3.8, 3.1, 3.3, 3.2] },
    { title: "Customer Satisfaction", value: "4.8/5", change: 0.2, changeType: "positive", icon: "⭐", trend: [4.6, 4.7, 4.8, 4.7, 4.8, 4.8] }
  ];

  const recentActivity = [
    { action: "Updated pricing strategy", time: "2 hours ago", type: "update" },
    { action: "New competitor added", time: "4 hours ago", type: "add" },
    { action: "Forecast generated", time: "1 day ago", type: "generate" },
    { action: "Policy updated", time: "2 days ago", type: "policy" }
  ];

  const revenueData = [
    { label: "Jan", value: 18000 },
    { label: "Feb", value: 22000 },
    { label: "Mar", value: 19500 },
    { label: "Apr", value: 25000 },
    { label: "May", value: 28000 },
    { label: "Jun", value: 24580 }
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "activity", label: "Activity", icon: "📝" }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <div style={{ 
            width: 64, 
            height: 64, 
            borderRadius: "50%", 
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: "bold",
            color: "white"
          }}>
            {userEmail?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
              Welcome back, {userName}!
            </h1>
            <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
              Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e5e7eb" }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: "transparent",
                border: "none",
                padding: "12px 16px",
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? "2px solid #3b82f6" : "2px solid transparent",
                color: activeTab === tab.id ? "#3b82f6" : "#6b7280",
                fontWeight: activeTab === tab.id ? 600 : 500,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "all 0.2s ease"
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Stats Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
            gap: 20, 
            marginBottom: 32 
          }}>
            {userStats.map((stat, index) => (
              <MetricCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Row */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "2fr 1fr", 
            gap: 20, 
            marginBottom: 32 
          }}>
            <Card>
              <Chart 
                data={revenueData} 
                type="line" 
                title="Revenue Trend" 
                height={300}
                color="#3b82f6"
              />
            </Card>
            
            <Card>
              <Chart 
                data={[
                  { label: "Desktop", value: 45 },
                  { label: "Mobile", value: 35 },
                  { label: "Tablet", value: 20 }
                ]} 
                type="pie" 
                title="Traffic Sources" 
                height={300}
              />
            </Card>
          </div>
        </>
      )}

      {activeTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Card>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>Account Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Email</label>
                <input 
                  type="email" 
                  value={userEmail} 
                  readOnly
                  style={{ 
                    width: "100%", 
                    padding: "8px 12px", 
                    border: "1px solid #d1d5db", 
                    borderRadius: 6,
                    background: "#f9fafb"
                  }} 
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" 
                  defaultValue="John Doe"
                  style={{ 
                    width: "100%", 
                    padding: "8px 12px", 
                    border: "1px solid #d1d5db", 
                    borderRadius: 6
                  }} 
                />
              </div>
              <Button variant="primary">Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 16px 0", fontSize: 18, fontWeight: 600 }}>Preferences</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Email notifications
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Weekly reports
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" />
                Marketing emails
              </label>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "activity" && (
        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentActivity.map((activity, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: "12px 0",
                borderBottom: index < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none"
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: "50%", 
                  background: activity.type === "update" ? "#3b82f6" : 
                             activity.type === "add" ? "#10b981" : 
                             activity.type === "generate" ? "#f59e0b" : "#8b5cf6"
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: "#111827" }}>{activity.action}</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

export default UserProfile;
