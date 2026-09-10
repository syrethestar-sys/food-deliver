"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Hydrate the user from localStorage after mount. This runs client-only so
    // the server and first client render both see `null` (no hydration mismatch).
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error(err);
    }
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData))
    if(userData.role === "admin"){
      router.push("/admin/food-menu")
    }else {
      router.push("/")
    }
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/login")
  }
  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
