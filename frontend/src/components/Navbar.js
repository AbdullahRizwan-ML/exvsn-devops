import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, userEmail } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bg = dark ? "#0f172a" : "#1e293b";
  const linkColor = "white";
  const activeBg = dark ? "#1e40af" : "#3b82f6";
  const glassBg = dark ? "rgba(15, 23, 42, 0.8)" : "rgba(30, 41, 59, 0.8)";

  const navItems = [
    { to: "/user-profile", label: "Profile", icon: "👤" },
    { to: "/demand-forecaster", label: "Forecaster", icon: "📊" },
    { to: "/price-optimizer", label: "Optimizer", icon: "💰" },
    { to: "/rival-tracker", label: "Tracker", icon: "🔍" },
    { to: "/notification-service", label: "Alerts", icon: "🔔" },
    { to: "/chatbot", label: "Chat", icon: "💬" },
    { to: "/policy-shield", label: "Shield", icon: "🛡️" }
  ];

  return (
    <nav style={{ 
      position: "sticky", 
      top: 0, 
      zIndex: 50,
      background: scrolled ? glassBg : bg, 
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      transition: "all 0.3s ease"
    }}>
      <div style={{ 
        maxWidth: "1200px", 
        margin: "0 auto", 
        padding: "0 16px",
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between",
        height: "64px"
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ 
            background: activeBg, 
            color: "white", 
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 16
          }}>
            E
          </div>
          <span style={{ fontWeight: 700, fontSize: 18 }}>ExVision</span>
        </div>

        {/* Desktop Navigation */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 12px",
                borderRadius: 8,
                background: isActive ? activeBg : "transparent",
                color: linkColor,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                transition: "all 0.2s ease",
                opacity: isActive ? 1 : 0.8
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Side Actions */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {isAuthenticated ? (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ 
                background: "rgba(255,255,255,0.1)", 
                padding: "6px 12px", 
                borderRadius: 20, 
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                gap: 6
              }}>
                <span>👤</span>
                <span style={{ opacity: 0.9 }}>{userEmail}</span>
              </div>
              <button 
                onClick={() => { logout(); navigate("/login"); }} 
                style={{ 
                  background: "rgba(239, 68, 68, 0.1)", 
                  color: "#ef4444", 
                  border: "1px solid rgba(239, 68, 68, 0.2)", 
                  padding: "6px 12px", 
                  borderRadius: 8, 
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(239, 68, 68, 0.1)";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <NavLink 
                to="/login" 
                style={{ 
                  color: linkColor, 
                  textDecoration: "none", 
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                  opacity: 0.8
                }}
              >
                Login
              </NavLink>
              <NavLink 
                to="/register" 
                style={{ 
                  background: activeBg, 
                  color: "white", 
                  textDecoration: "none", 
                  padding: "8px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: "all 0.2s ease"
                }}
              >
                Register
              </NavLink>
            </div>
          )}
          
          <button 
            onClick={() => setDark(!dark)} 
            style={{ 
              background: "rgba(255,255,255,0.1)", 
              color: linkColor, 
              border: "1px solid rgba(255,255,255,0.2)", 
              padding: "8px", 
              borderRadius: 8, 
              cursor: "pointer",
              fontSize: 16,
              transition: "all 0.2s ease",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255,255,255,0.1)";
            }}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              background: "transparent",
              border: "none",
              color: linkColor,
              cursor: "pointer",
              padding: 8,
              fontSize: 20
            }}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          background: bg,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 8
        }}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 16px",
                borderRadius: 8,
                background: isActive ? activeBg : "transparent",
                color: linkColor,
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500
              })}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
