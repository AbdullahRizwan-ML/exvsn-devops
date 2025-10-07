import React, { useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import MetricCard from "../components/ui/MetricCard";
import Chart from "../components/ui/Chart";

function PriceOptimizer() {
  const [activeStrategy, setActiveStrategy] = useState("dynamic");
  const [isOptimizing, setIsOptimizing] = useState(false);

  const pricingMetrics = [
    { title: "Revenue Impact", value: "+$12,400", change: 15.2, changeType: "positive", icon: "💰", trend: [8000, 8500, 9200, 9800, 10500, 11200] },
    { title: "Profit Margin", value: "23.5%", change: 3.1, changeType: "positive", icon: "📊", trend: [20, 20.5, 21, 22, 22.5, 23.5] },
    { title: "Price Changes", value: "47", change: -12, changeType: "negative", icon: "🔄", trend: [60, 58, 55, 52, 49, 47] },
    { title: "Customer Retention", value: "94.2%", change: 1.8, changeType: "positive", icon: "👥", trend: [92, 92.5, 93, 93.5, 94, 94.2] }
  ];

  const priceHistory = [
    { label: "Week 1", value: 99.99 },
    { label: "Week 2", value: 104.50 },
    { label: "Week 3", value: 98.75 },
    { label: "Week 4", value: 102.25 },
    { label: "Week 5", value: 105.99 },
    { label: "Week 6", value: 103.50 }
  ];

  const competitorPrices = [
    { name: "Competitor A", price: 98.99, change: -2.1 },
    { name: "Competitor B", price: 105.50, change: 1.2 },
    { name: "Competitor C", price: 101.25, change: 0.5 },
    { name: "Your Price", price: 103.50, change: 0.8 }
  ];

  const strategies = [
    { 
      id: "dynamic", 
      name: "Dynamic Pricing", 
      description: "AI-powered real-time price adjustments",
      status: "active",
      revenue: "+$8,200",
      margin: "24.1%"
    },
    { 
      id: "competitive", 
      name: "Competitive Pricing", 
      description: "Match competitor prices with margin protection",
      status: "inactive",
      revenue: "+$5,100",
      margin: "21.8%"
    },
    { 
      id: "value", 
      name: "Value-Based", 
      description: "Price based on perceived customer value",
      status: "inactive",
      revenue: "+$6,800",
      margin: "22.9%"
    }
  ];

  const handleOptimizePrices = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      alert("Prices optimized successfully!");
    }, 2000);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#111827" }}>
            Price Optimizer
          </h1>
          <p style={{ margin: 4, color: "#6b7280", fontSize: 16 }}>
            Maximize revenue with intelligent pricing strategies
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Button 
            variant="secondary"
            onClick={() => alert("Export pricing data")}
          >
            Export Data
          </Button>
          <Button 
            variant="primary" 
            onClick={handleOptimizePrices}
            loading={isOptimizing}
          >
            {isOptimizing ? "Optimizing..." : "Optimize Prices"}
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
        {pricingMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Strategy Selection */}
      <Card style={{ marginBottom: 32 }}>
        <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Pricing Strategies</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              onClick={() => setActiveStrategy(strategy.id)}
              style={{
                padding: 20,
                border: activeStrategy === strategy.id ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                borderRadius: 12,
                cursor: "pointer",
                background: activeStrategy === strategy.id ? "#eff6ff" : "white",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{strategy.name}</h4>
                <div style={{ 
                  background: strategy.status === "active" ? "#10b981" : "#6b7280",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 500
                }}>
                  {strategy.status}
                </div>
              </div>
              <p style={{ margin: "0 0 12px 0", color: "#6b7280", fontSize: 14 }}>
                {strategy.description}
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Revenue Impact</div>
                  <div style={{ fontWeight: 600, color: "#10b981" }}>{strategy.revenue}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>Margin</div>
                  <div style={{ fontWeight: 600, color: "#3b82f6" }}>{strategy.margin}</div>
                </div>
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
            title="Price History" 
            height={300}
            color="#3b82f6"
          />
        </Card>
        
        <Card>
          <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600 }}>Competitor Analysis</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {competitorPrices.map((competitor, index) => (
              <div key={index} style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                padding: "8px 0",
                borderBottom: index < competitorPrices.length - 1 ? "1px solid #f3f4f6" : "none"
              }}>
                <div>
                  <div style={{ fontWeight: 500, color: "#111827" }}>{competitor.name}</div>
                  <div style={{ fontSize: 14, color: "#6b7280" }}>
                    {competitor.change > 0 ? "+" : ""}{competitor.change}%
                  </div>
                </div>
                <div style={{ 
                  fontWeight: 600, 
                  color: competitor.name === "Your Price" ? "#3b82f6" : "#111827"
                }}>
                  ${competitor.price}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Price Rules & Settings */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Price Rules</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Minimum Price</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Protect profit margins</div>
              </div>
              <div style={{ fontWeight: 600 }}>$89.99</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Maximum Price</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>Prevent overpricing</div>
              </div>
              <div style={{ fontWeight: 600 }}>$129.99</div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 500 }}>Change Frequency</div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>How often to update</div>
              </div>
              <div style={{ fontWeight: 600 }}>Daily</div>
            </div>
            <Button variant="secondary" style={{ width: "100%" }}>
              Edit Rules
            </Button>
          </div>
        </Card>

        <Card>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 18, fontWeight: 600 }}>Optimization Settings</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Optimization Goal</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="revenue">Maximize Revenue</option>
                <option value="profit">Maximize Profit</option>
                <option value="volume">Maximize Volume</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontWeight: 500 }}>Market Sensitivity</label>
              <select style={{ 
                width: "100%", 
                padding: "8px 12px", 
                border: "1px solid #d1d5db", 
                borderRadius: 6
              }}>
                <option value="high">High (Aggressive)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="low">Low (Conservative)</option>
              </select>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Consider competitor prices
              </label>
            </div>
            <div>
              <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" defaultChecked />
                Include demand forecasting
              </label>
            </div>
            <Button variant="primary" style={{ width: "100%" }}>
              Save Settings
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PriceOptimizer;
