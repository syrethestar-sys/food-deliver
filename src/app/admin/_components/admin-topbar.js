import { UserSettings } from "@/app/(main)/_features/user-settings";
import { useAuth } from "@/providers/auth-provider";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export function AdminTopbar() {
  const { user, logout } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
const settingsRef = useRef(null);

  useEffect(() => {
    if (!isSettingsOpen) return;
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSettingsOpen]);
  return (
    <header className="flex h-16 items-center justify-end px-4 sm:px-6">
      {user ? (
        <div className="relative" ref={settingsRef}>
          <button
            onClick={() => setIsSettingsOpen((open) => !open)}
            className="flex justify-center items-center w-9 h-9 rounded-full p-2 bg-[#EF4444] cursor-pointer"
          >
            <User color="white" size={16} />
          </button>
          {isSettingsOpen && <UserSettings user={user} onSignOut={logout} />}
        </div>
      ) : (
        <Link
          href="/login"
          className="bg-[#EF4444] rounded-full border px-3 py-1.5 text-sm text-white"
        >
          Log in
        </Link>
      )}
    </header>
  );
}
