import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const UserProfile = lazy(() => import("./pages/UserProfile"));
const DemandForecaster = lazy(() => import("./pages/DemandForecaster"));
const PriceOptimizer = lazy(() => import("./pages/PriceOptimizer"));
const RivalTracker = lazy(() => import("./pages/RivalTracker"));
const NotificationService = lazy(() => import("./pages/NotificationService"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const PolicyShield = lazy(() => import("./pages/PolicyShield"));

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Suspense fallback={<div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/user-profile" replace />} />
              <Route path="/login" element={<Navigate to="/user-profile" replace />} />
              <Route path="/register" element={<Navigate to="/user-profile" replace />} />

              <Route path="/user-profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/demand-forecaster" element={<ProtectedRoute><DemandForecaster /></ProtectedRoute>} />
              <Route path="/price-optimizer" element={<ProtectedRoute><PriceOptimizer /></ProtectedRoute>} />
              <Route path="/rival-tracker" element={<ProtectedRoute><RivalTracker /></ProtectedRoute>} />
              <Route path="/notification-service" element={<ProtectedRoute><NotificationService /></ProtectedRoute>} />
              <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
              <Route path="/policy-shield" element={<ProtectedRoute><PolicyShield /></ProtectedRoute>} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
