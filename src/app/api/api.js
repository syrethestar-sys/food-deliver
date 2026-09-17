import axios from "axios";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1000",
  headers: { "Content-Type": "application/json" },
});

server.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  config.headers.Authorization = token ? `Bearer ${token}` : null;
  return config;
});
