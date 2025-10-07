import React from "react";

function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading = false, 
  disabled = false,
  onClick,
  style = {},
  ...props 
}) {
  const baseStyle = {
    border: "none",
    borderRadius: 8,
    cursor: disabled || loading ? "not-allowed" : "pointer",
    fontWeight: 500,
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    opacity: disabled || loading ? 0.6 : 1,
    ...style
  };

  const variants = {
    primary: {
      background: "#3b82f6",
      color: "white",
      "&:hover": { background: "#2563eb" }
    },
    secondary: {
      background: "#f3f4f6",
      color: "#374151",
      border: "1px solid #d1d5db",
      "&:hover": { background: "#e5e7eb" }
    },
    success: {
      background: "#10b981",
      color: "white",
      "&:hover": { background: "#059669" }
    },
    danger: {
      background: "#ef4444",
      color: "white",
      "&:hover": { background: "#dc2626" }
    },
    ghost: {
      background: "transparent",
      color: "#6b7280",
      "&:hover": { background: "#f3f4f6" }
    }
  };

  const sizes = {
    sm: { padding: "6px 12px", fontSize: 14 },
    md: { padding: "8px 16px", fontSize: 14 },
    lg: { padding: "12px 24px", fontSize: 16 }
  };

  const buttonStyle = {
    ...baseStyle,
    ...variants[variant],
    ...sizes[size]
  };

  return (
    <button
      style={buttonStyle}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span>⏳</span>}
      {children}
    </button>
  );
}

export default Button;
