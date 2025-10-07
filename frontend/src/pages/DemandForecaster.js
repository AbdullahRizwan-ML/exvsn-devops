import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";
import Chart from "../components/ui/Chart";

function DemandForecaster() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isGenerating, setIsGenerating] = useState(false);

  const forecastMetrics = [
    { title: "Next 30 Days", value: "2,450", change: 8.2, changeType: "positive", icon: "📈", trend: [2000, 2100, 2200, 2300, 2400, 2450] },
    { title: "Peak Demand", value: "3,200", change: 12.5, changeType: "positive", icon: "🔥", trend: [2800, 2900, 3000, 3100, 3150, 3200] },
    { title: "Low Demand", value: "1,800", change: -5.2, changeType: "negative", icon: "📉", trend: [1900, 1850, 1800, 1750, 1780, 1800] },
    { title: "Accuracy", value: "94.2%", change: 2.1, changeType: "positive", icon: "🎯", trend: [92, 92.5, 93, 93.5, 94, 94.2] }
  ];

  const historicalData = [
    { label: "Jan", value: 1800 },
    { label: "Feb", value: 2100 },
    { label: "Mar", value: 1950 },
    { label: "Apr", value: 2300 },
    { label: "May", value: 2500 },
    { label: "Jun", value: 2450 },
    { label: "Jul", value: 2800 },
    { label: "Aug", value: 3000 },
    { label: "Sep", value: 2750 },
    { label: "Oct", value: 3200 },
    { label: "Nov", value: 2900 },
    { label: "Dec", value: 3100 }
  ];

  const forecastData = [
    { label: "Week 1", value: 2400, type: "forecast" },
    { label: "Week 2", value: 2600, type: "forecast" },
    { label: "Week 3", value: 2800, type: "forecast" },
    { label: "Week 4", value: 3000, type: "forecast" }
  ];

  const seasonalFactors = [
    { month: "January", factor: 0.85, trend: "Low" },
    { month: "February", factor: 0.92, trend: "Rising" },
    { month: "March", factor: 0.88, trend: "Stable" },
    { month: "April", factor: 1.05, trend: "High" },
    { month: "May", factor: 1.12, trend: "Peak" },
    { month: "June", factor: 1.08, trend: "High" }
  ];

  const handleGenerateForecast = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert("New forecast generated successfully!");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Demand Forecaster
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Predict future demand with AI-powered forecasting
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{ 
              padding: "8px 12px", 
              border: "1px solid #d1d5db", 
              borderRadius: 6,
              background: "white"
            }}
          >
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="90d">90 Days</option>
          </select>
          <Button 
            variant="primary" 
            onClick={handleGenerateForecast}
            loading={isGenerating}
          >
            {isGenerating ? "Generating..." : "Generate Forecast"}
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
        {forecastMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
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
            data={[...historicalData, ...forecastData]} 
            type="line" 
            title="Demand Forecast" 
            height={350}
            color="#3b82f6"
          />
          <div style={{ marginTop: 16, display: "flex", gap: 16, justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 2, background: "#3b82f6" }} />
              <span style={{ fontSize: 12, color: "#6b7280" }}>Historical</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 12, height: 2, background: "#10b981", borderStyle: "dashed" }} />
              <span style={{ fontSize: 12, color: "#6b7280" }}>Forecast</span>
            </div>
          </div>
        </Card>
        
        <Card>
          <Chart 
            data={[
              { label: "Q1", value: 6500 },
              { label: "Q2", value: 7200 },
              { label: "Q3", value: 6800 },
              { label: "Q4", value: 7500 }
            ]} 
            type="bar" 
            title="Quarterly Demand" 
            height={350}
            color="#10b981"
          />
        </Card>
      </div>

      {/* Seasonal Analysis */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Seasonal Factors</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {seasonalFactors.map((season, index) => (
              <div key={index} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "12px 0",
                borderBottom: index < seasonalFactors.length - 1 ? "1px solid #f3f4f6" : "none"
              }}>
                <div>
                  <div style={{ fontWeight: 500, color: "#111827" }}>{season.month}</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>{season.trend}</div>
                </div>
                <div style={{ 
                  background: season.factor > 1 ? "#dcfce7" : "#fef3c7",
                  color: season.factor > 1 ? "#166534" : "#92400e",
                  padding: "4px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {season.factor}x
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Forecast Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Confidence Level</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="95">95% (High)</option>
                <option value="90">90% (Medium)</option>
                <option value="80">80% (Low)</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Model Type</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="arima">ARIMA</option>
                <option value="exponential">Exponential Smoothing</option>
                <option value="neural">Neural Network</option>
              </select>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Include external factors
              </label>
            </div>
            <Button variant="secondary" style={{ width: "100%" }}>
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DemandForecaster;
