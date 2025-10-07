import React from "react";

function Chart({ 
  data = [], 
  type = "line", 
  title = "", 
  height = 200, 
  color = "#3b82f6",
  style = {} 
}) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  const renderLineChart = () => {
    if (data.length < 2) return null;
    
    const width = 300;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    const points = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * chartWidth;
      const y = padding + ((maxValue - d.value) / range) * chartHeight;
      return `${x},${y}`;
    }).join(" ");
    
    return (
      <svg width={width} height={height} style={{ overflow: "visible" }}>
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((d, i) => {
          const x = padding + (i / (data.length - 1)) * chartWidth;
          const y = padding + ((maxValue - d.value) / range) * chartHeight;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  const renderBarChart = () => {
    const width = 300;
    const padding = 20;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barWidth = chartWidth / data.length * 0.8;
    const barSpacing = chartWidth / data.length * 0.2;
    
    return (
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const barHeight = (d.value / maxValue) * chartHeight;
          const x = padding + i * (barWidth + barSpacing) + barSpacing / 2;
          const y = padding + chartHeight - barHeight;
          
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={color}
              rx="2"
            />
          );
        })}
      </svg>
    );
  };

  const renderPieChart = () => {
    const radius = 60;
    const centerX = 100;
    const centerY = 100;
    let currentAngle = 0;
    
    const total = data.reduce((sum, d) => sum + d.value, 0);
    
    return (
      <svg width={200} height={200}>
        {data.map((d, i) => {
          const percentage = d.value / total;
          const angle = percentage * 360;
          const endAngle = currentAngle + angle;
          
          const x1 = centerX + radius * Math.cos((currentAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((currentAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
          
          const largeArcFlag = angle > 180 ? 1 : 0;
          const pathData = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
          ].join(' ');
          
          currentAngle = endAngle;
          
          return (
            <path
              key={i}
              d={pathData}
              fill={`hsl(${i * 60}, 70%, 50%)`}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case "line": return renderLineChart();
      case "bar": return renderBarChart();
      case "pie": return renderPieChart();
      default: return renderLineChart();
    }
  };

  return (
    <div style={{ ...style }}>
      {title && (
        <h3 style={{ margin: "0 0 16px 0", fontSize: 16, fontWeight: 600, color: "#374151" }}>
          {title}
        </h3>
      )}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {renderChart()}
      </div>
      {data.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          {data.map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <div 
                style={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: "50%", 
                  background: type === "pie" ? `hsl(${i * 60}, 70%, 50%)` : color 
                }} 
              />
              <span style={{ color: "#6b7280" }}>{d.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Chart;
