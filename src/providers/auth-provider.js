"use client";

import { server } from "@/app/api/api";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cached = null;
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        cached = JSON.parse(savedUser);
        setUser(cached);
      }
    } catch (err) {
      console.error(err);
    }

    if (!localStorage.getItem("token")) {
      setUser(null);
      setReady(true);
      return;
    }

    server
      .get("/auth/me")
      .then((response) => {
        const verified = { ...cached, ...response.data.user };
        setUser(verified);
        localStorage.setItem("user", JSON.stringify(verified));
      })
      .catch(() => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .finally(() => setReady(true));
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    if (userData.role === "admin") {
      router.push("/admin/food-menu");
    } else {
      router.push("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };
  const updateAddress = (address) => {
    setUser((current) => {
      const updated = { ...current, address };
      localStorage.setItem("user", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <AuthContext.Provider value={{ user, ready, login, logout, updateAddress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within and AuthProvider");
  }
  return context;
}
