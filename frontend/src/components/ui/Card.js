import React from "react";

function Card({ children, className = "", style = {}, hover = false, ...props }) {
  const cardStyle = {
    background: "white",
    borderRadius: 12,
    padding: 20,
    boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
    border: "1px solid #e5e7eb",
    transition: hover ? "all 0.2s ease" : "none",
    ...style
  };

  const hoverStyle = hover ? {
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)"
  } : {};

  return (
    <div 
      style={{...cardStyle, ...hoverStyle}} 
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
