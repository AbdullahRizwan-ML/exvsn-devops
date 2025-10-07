import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";

function PolicyShield() {
  const [activeTab, setActiveTab] = useState("policies");
  const [isCreating, setIsCreating] = useState(false);

  const policyMetrics = [
    { title: "Active Policies", value: "12", change: 2, changeType: "positive", icon: "🛡️", trend: [8, 9, 10, 11, 11, 12] },
    { title: "Violations Blocked", value: "47", change: 15, changeType: "positive", icon: "🚫", trend: [30, 32, 35, 38, 42, 47] },
    { title: "Compliance Rate", value: "98.5%", change: 1.2, changeType: "positive", icon: "✅", trend: [97, 97.2, 97.5, 97.8, 98, 98.5] },
    { title: "Risk Score", value: "Low", change: -5, changeType: "positive", icon: "📊", trend: [85, 80, 75, 70, 65, 60] }
  ];

  const policies = [
    { 
      id: 1, 
      name: "Price Change Limit", 
      description: "Prevent price changes exceeding 20% in 24 hours",
      status: "active",
      violations: 3,
      lastTriggered: "2 hours ago",
      severity: "high"
    },
    { 
      id: 2, 
      name: "Data Access Control", 
      description: "Restrict access to sensitive customer data",
      status: "active",
      violations: 0,
      lastTriggered: "Never",
      severity: "critical"
    },
    { 
      id: 3, 
      name: "Forecast Accuracy", 
      description: "Flag forecasts with accuracy below 80%",
      status: "active",
      violations: 1,
      lastTriggered: "1 day ago",
      severity: "medium"
    },
    { 
      id: 4, 
      name: "Competitor Monitoring", 
      description: "Alert when competitor prices drop below threshold",
      status: "inactive",
      violations: 0,
      lastTriggered: "Never",
      severity: "low"
    }
  ];

  const recentViolations = [
    { policy: "Price Change Limit", user: "john@company.com", action: "Attempted 25% price increase", time: "2 hours ago", status: "blocked" },
    { policy: "Data Access Control", user: "sarah@company.com", action: "Accessed customer PII", time: "4 hours ago", status: "allowed" },
    { policy: "Forecast Accuracy", user: "system", action: "Forecast accuracy dropped to 75%", time: "1 day ago", status: "flagged" }
  ];

  const handleCreatePolicy = () => {
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      alert("New policy created successfully!");
    }, 1500);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical": return "#ef4444";
      case "high": return "#f59e0b";
      case "medium": return "#3b82f6";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Policy Shield
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Enforce business rules and compliance across your platform
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button variant="secondary">Import Policies</Button>
          <Button 
            variant="primary" 
            onClick={handleCreatePolicy}
            loading={isCreating}
          >
            {isCreating ? "Creating..." : "Create Policy"}
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
        {policyMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e5e7eb", marginBottom: 32 }}>
        {[
          { id: "policies", label: "Policies", icon: "🛡️" },
          { id: "violations", label: "Violations", icon: "🚫" },
          { id: "settings", label: "Settings", icon: "⚙️" }
        ].map(tab => (
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

      {activeTab === "policies" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
          <Card>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Active Policies</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {policies.map((policy) => (
                <div key={policy.id} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 16, 
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  background: policy.status === "active" ? "white" : "#f9fafb"
                }}>
                  <div style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: "50%", 
                    background: policy.status === "active" ? "#10b981" : "#6b7280"
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ fontWeight: 600, color: "#111827" }}>{policy.name}</div>
                      <div style={{ 
                        background: getSeverityColor(policy.severity),
                        color: "white",
                        padding: "2px 6px",
                        borderRadius: 8,
                        fontSize: 10,
                        fontWeight: 500
                      }}>
                        {policy.severity}
                      </div>
                    </div>
                    <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}>{policy.description}</div>
                    <div style={{ fontSize: 12, color: "#9ca3af" }}>
                      {policy.violations} violations • Last triggered: {policy.lastTriggered}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Policy Templates</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Price Protection", description: "Prevent extreme price changes", category: "Pricing" },
                { name: "Data Privacy", description: "GDPR compliance rules", category: "Privacy" },
                { name: "Access Control", description: "User permission management", category: "Security" },
                { name: "Quality Gates", description: "Data quality thresholds", category: "Quality" }
              ].map((template, index) => (
                <div key={index} style={{ 
                  padding: 12, 
                  border: "1px solid #e5e7eb", 
                  borderRadius: 8,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.background = "#f3f4f6"}
                onMouseLeave={(e) => e.target.style.background = "white"}
                >
                  <div style={{ fontWeight: 500, color: "#111827", marginBottom: 4 }}>{template.name}</div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{template.description}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>{template.category}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "violations" && (
        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Recent Violations</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentViolations.map((violation, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 16, 
                padding: "16px",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                background: violation.status === "blocked" ? "#fef2f2" : 
                           violation.status === "flagged" ? "#fffbeb" : "white"
              }}>
                <div style={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: "50%", 
                  background: violation.status === "blocked" ? "#ef4444" : 
                             violation.status === "flagged" ? "#f59e0b" : "#10b981"
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: "#111827", marginBottom: 4 }}>{violation.policy}</div>
                  <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 4 }}>
                    {violation.user} - {violation.action}
                  </div>
                  <div style={{ fontSize: 12, color: "#9ca3af" }}>{violation.time}</div>
                </div>
                <div style={{ 
                  background: violation.status === "blocked" ? "#ef4444" : 
                             violation.status === "flagged" ? "#f59e0b" : "#10b981",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {violation.status}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "settings" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <Card>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Policy Settings</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Default Action</label>
                <select style={{ 
                  width: "100%", 
                  padding: "8px 12px", 
                  border: "1px solid #d1d5db", 
                  borderRadius: 6
                }}>
                  <option value="block">Block Violations</option>
                  <option value="warn">Warn Only</option>
                  <option value="log">Log Only</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Notification Level</label>
                <select style={{ 
                  width: "100%", 
                  padding: "8px 12px", 
                  border: "1px solid #d1d5db", 
                  borderRadius: 6
                }}>
                  <option value="all">All Violations</option>
                  <option value="high">High & Critical Only</option>
                  <option value="critical">Critical Only</option>
                </select>
              </div>
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" defaultChecked />
                  Auto-enable new policies
                </label>
              </div>
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" defaultChecked />
                  Send email notifications
                </label>
              </div>
              <Button variant="primary" style={{ width: "100%" }}>
                Save Settings
              </Button>
            </div>
          </Card>

          <Card>
            <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Compliance Status</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Overall Compliance</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Based on all policies</div>
                </div>
                <div style={{ fontWeight: 600, color: "#10b981" }}>98.5%</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Risk Level</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Current assessment</div>
                </div>
                <div style={{ fontWeight: 600, color: "#10b981" }}>Low</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Last Audit</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Compliance check</div>
                </div>
                <div style={{ fontWeight: 600 }}>2 days ago</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontWeight: 500 }}>Next Review</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>Scheduled audit</div>
                </div>
                <div style={{ fontWeight: 600 }}>In 5 days</div>
              </div>
              <Button variant="secondary" style={{ width: "100%" }}>
                Run Compliance Check
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default PolicyShield;
