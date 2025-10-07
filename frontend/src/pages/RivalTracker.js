import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";
import Chart from "../components/ui/Chart";

function RivalTracker() {
  const [selectedCompetitor, setSelectedCompetitor] = useState("competitor-a");
  const [isTracking, setIsTracking] = useState(false);

  const trackingMetrics = [
    { title: "Competitors Tracked", value: "12", change: 2, changeType: "positive", icon: "👥", trend: [8, 9, 10, 11, 11, 12] },
    { title: "Price Alerts", value: "47", change: 15, changeType: "positive", icon: "🔔", trend: [30, 32, 35, 38, 42, 47] },
    { title: "Avg Price Difference", value: "-$2.50", change: -8.5, changeType: "positive", icon: "💰", trend: [-5, -4.5, -4, -3.5, -3, -2.5] },
    { title: "Market Share", value: "23.5%", change: 1.2, changeType: "positive", icon: "📊", trend: [22, 22.2, 22.5, 22.8, 23.1, 23.5] }
  ];

  const competitors = [
    { 
      id: "competitor-a", 
      name: "TechCorp Solutions", 
      website: "techcorp.com",
      currentPrice: 99.99,
      priceChange: -2.1,
      lastUpdate: "2 hours ago",
      status: "tracking",
      marketShare: 18.5,
      products: 45
    },
    { 
      id: "competitor-b", 
      name: "InnovateTech", 
      website: "innovatetech.io",
      currentPrice: 105.50,
      priceChange: 1.2,
      lastUpdate: "1 hour ago",
      status: "tracking",
      marketShare: 15.2,
      products: 32
    },
    { 
      id: "competitor-c", 
      name: "Future Systems", 
      website: "futuresys.com",
      currentPrice: 101.25,
      priceChange: 0.5,
      lastUpdate: "3 hours ago",
      status: "tracking",
      marketShare: 12.8,
      products: 28
    }
  ];

  const priceHistory = [
    { label: "Week 1", value: 98.99, competitor: "TechCorp" },
    { label: "Week 2", value: 101.50, competitor: "InnovateTech" },
    { label: "Week 3", value: 99.75, competitor: "Future Systems" },
    { label: "Week 4", value: 102.25, competitor: "TechCorp" },
    { label: "Week 5", value: 104.99, competitor: "InnovateTech" },
    { label: "Week 6", value: 103.50, competitor: "Future Systems" }
  ];

  const alerts = [
    { competitor: "TechCorp Solutions", action: "Price dropped by 5%", time: "2 hours ago", type: "price_drop" },
    { competitor: "InnovateTech", action: "New product launched", time: "4 hours ago", type: "product" },
    { competitor: "Future Systems", action: "Price increased by 3%", time: "6 hours ago", type: "price_increase" },
    { competitor: "TechCorp Solutions", action: "Promotion started", time: "1 day ago", type: "promotion" }
  ];

  const handleStartTracking = () => {
    setIsTracking(true);
    setTimeout(() => {
      setIsTracking(false);
      alert("Tracking started for selected competitor!");
    }, 1500);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Rival Tracker
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Monitor competitor pricing and market movements
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button 
            variant="secondary"
            onClick={() => alert("Add new competitor")}
          >
            Add Competitor
          </Button>
          <Button 
            variant="primary" 
            onClick={handleStartTracking}
            loading={isTracking}
          >
            {isTracking ? "Starting..." : "Start Tracking"}
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
        {trackingMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Competitors List */}
      <Card style={{ marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Tracked Competitors</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: 16 }}>
          {competitors.map((competitor) => (
            <div
              key={competitor.id}
              onClick={() => setSelectedCompetitor(competitor.id)}
              style={{
                padding: 20,
                border: selectedCompetitor === competitor.id ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                borderRadius: 12,
                cursor: "pointer",
                background: selectedCompetitor === competitor.id ? "#eff6ff" : "white",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{competitor.name}</h4>
                  <p style={{ margin: 2, color: "#6b7280", fontSize: 14 }}>{competitor.website}</p>
                </div>
                <div style={{ 
                  background: competitor.status === "tracking" ? "#10b981" : "#6b7280",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {competitor.status}
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Current Price</div>
                  <div style={{ fontWeight: 600, fontSize: 18 }}>${competitor.currentPrice}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Price Change</div>
                  <div style={{ 
                    fontWeight: 600, 
                    color: competitor.priceChange > 0 ? "#ef4444" : "#10b981"
                  }}>
                    {competitor.priceChange > 0 ? "+" : ""}{competitor.priceChange}%
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Market Share</div>
                  <div style={{ fontWeight: 600 }}>{competitor.marketShare}%</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Products</div>
                  <div style={{ fontWeight: 600 }}>{competitor.products}</div>
                </div>
              </div>
              
              <div style={{ fontSize: 12, color: "#6b7280" }}>
                Last updated: {competitor.lastUpdate}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Row */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "2fr 1fr", 
        gap: 20, 
        marginBottom: 32 
      }}>
        <Card>
          <Chart 
            data={priceHistory} 
            type="line" 
            title="Price Comparison Over Time" 
            height={300}
            color="#3b82f6"
          />
        </Card>
        
        <Card>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>Recent Alerts</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {alerts.map((alert, index) => (
              <div key={index} style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 12, 
                padding: "8px 0",
                borderBottom: index < alerts.length - 1 ? "1px solid #f3f4f6" : "none"
              }}>
                <div style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: "50%", 
                  background: alert.type === "price_drop" ? "#10b981" : 
                             alert.type === "price_increase" ? "#ef4444" : 
                             alert.type === "product" ? "#3b82f6" : "#f59e0b"
                }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, color: "#111827", fontSize: 14 }}>{alert.competitor}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{alert.action}</div>
                </div>
                <div style={{ fontSize: 12, color: "#6b7280" }}>{alert.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Settings & Configuration */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Tracking Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Update Frequency</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="realtime">Real-time</option>
                <option value="hourly">Every Hour</option>
                <option value="daily">Daily</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Price Change Threshold</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="1">1%</option>
                <option value="2">2%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
              </select>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Email notifications
              </label>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Track new products
              </label>
            </div>
            <Button variant="primary" style={{ width: "100%" }}>
              Save Settings
            </Button>
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Market Analysis</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Your Market Position</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Based on pricing analysis</div>
              </div>
              <div style={{ fontWeight: 600, color: "#3b82f6" }}>Competitive</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Price Advantage</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>vs average competitor</div>
              </div>
              <div style={{ fontWeight: 600, color: "#10b981" }}>+$2.50</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Market Share Trend</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Last 30 days</div>
              </div>
              <div style={{ fontWeight: 600, color: "#10b981" }}>↗ +1.2%</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Competitive Index</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Overall score</div>
              </div>
              <div style={{ fontWeight: 600, color: "#3b82f6" }}>8.5/10</div>
            </div>
            <Button variant="secondary" style={{ width: "100%" }}>
              View Full Report
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RivalTracker;
