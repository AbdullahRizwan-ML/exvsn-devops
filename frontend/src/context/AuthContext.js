import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // FORCE LOGIN ON EVERY LOAD
    const fakeToken = "exvsn-bypass-jwt-2025";
    const fakeUser = {
      email: "abc@bc.com",
      name: "Jenkins ",
      role: "Admin"
    };

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(fakeUser));

    setToken(fakeToken);
    setUser(fakeUser);
  }, []);

  const login = () => {};
  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      userEmail: user?.email || "abc@bc.com",
      userName: user?.name || "User"
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
