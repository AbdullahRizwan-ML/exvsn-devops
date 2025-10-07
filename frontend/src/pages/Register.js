import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.register({ email, full_name: fullName, password });
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Create your account</div>
          <div style={{ color: "#6b7280", marginTop: 4 }}>It’s quick and easy</div>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
          {error && <div style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fecaca", padding: 8, borderRadius: 8, marginBottom: 12 }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Full name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                required
                placeholder="John Doe"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, outline: "none" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{ width: "100%", boxSizing: "border-box", padding: "10px 40px 10px 12px", border: "1px solid #d1d5db", borderRadius: 8, outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 8, top: 6, background: "transparent", border: 0, cursor: "pointer", color: "#6b7280", padding: "4px 8px" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", background: loading ? "#93c5fd" : "#2563eb", color: "white", border: 0, padding: "10px 12px", borderRadius: 8, cursor: loading ? "not-allowed" : "pointer", fontWeight: 600 }}
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>

        <div style={{ textAlign: "center", marginTop: 12, color: "#6b7280" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;


