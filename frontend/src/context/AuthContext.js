import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem("userEmail"));

  useEffect(() => {
    if (token) localStorage.setItem("token", token); else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (userEmail) localStorage.setItem("userEmail", userEmail); else localStorage.removeItem("userEmail");
  }, [userEmail]);

  const value = useMemo(() => ({
    token,
    userEmail,
    isAuthenticated: Boolean(token),
    login: (newToken, email) => { setToken(newToken); setUserEmail(email); },
    logout: () => { setToken(null); setUserEmail(null); }
  }), [token, userEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }


