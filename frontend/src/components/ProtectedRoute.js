import React from "react";

const ProtectedRoute = ({ children }) => {
  // BYPASS ALL AUTH CHECKS - SHOW CONTENT DIRECTLY
  return <>{children}</>;
};

export default ProtectedRoute;
