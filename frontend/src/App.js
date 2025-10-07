import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
          <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>Loading...</div>}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
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
