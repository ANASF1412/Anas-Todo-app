import { createContext, useState, useCallback, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  // Initialize auth from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuth({
          isAuthenticated: true,
          user,
          token: storedToken,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth({ isAuthenticated: false, user: null, token: null, loading: false });
      }
    } else {
      setAuth({ isAuthenticated: false, user: null, token: null, loading: false });
    }
  }, []);

  const login = useCallback((user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({
      isAuthenticated: true,
      user,
      token,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
    });
  }, []);

  const updateUser = useCallback((updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setAuth((prev) => ({
      ...prev,
      user: updatedUser,
    }));
  }, []);

  const value = {
    ...auth,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
