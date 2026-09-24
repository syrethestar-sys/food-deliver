"use client";

import { useAuth } from "@/providers/auth-provider";
import { AuthArtwork } from "./_components/auth-artwork";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({ children }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (user && ready) {
      router.replace(user.role === "admin" ? "/admin/food-menu" : "/");
    }
  }, [user, ready, router]);
  
  if (!ready) return null;
  if (user) return null;
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">{children}</div>
      </div>
      <AuthArtwork />
    </div>
  );
}
