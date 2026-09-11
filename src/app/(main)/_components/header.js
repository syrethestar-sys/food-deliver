"use client";

import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import { Logo } from "../../../components/Logo";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/providers/cart-provider";

export function Header() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <header className="flex items-center justify-between px-8 py-3">
      <Link href="/" className="flex gap-2 items-center">
        <Logo />
        <div className="flex flex-col">
          <p className="font-bold text-[20px]">
            Nom<span className="text-[#EF4444]">Nom</span>
          </p>
          <p className="text-[12px]">Swift Delivery</p>
        </div>
      </Link>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <button className="h-9 flex justify-center items-center gap-1 rounded-full border text-sm text-[12px] p-2 cursor-pointer">
              <MapPin color="#EF4444" size={20} />
              <p className=" text-[#EF4444] flex items-center gap-1">
                Delivery address:
                <span className="text-[#71717A] flex items-center">
                  Add location <ChevronRight size={16} />
                </span>
              </p>
            </button>
            <button className="relative flex justify-center items-center w-9 h-9 rounded-full bg-[white] border cursor-pointer">
              <ShoppingCart color="black" size={16} />
              {count > 0 && (
                <span className="absolute top-[-1] right-[-1] flex size-4 items-center justify-center rounded-full bg-[#EF4444] text-[10px] text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        ) : (
          <Link
            href="/signup"
            className="rounded-full border px-3 py-1.5 text-sm"
          >
            Sign up
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="flex justify-center items-center w-9 h-9 rounded-full p-2 bg-[#EF4444] cursor-pointer"
          >
            <User color="white" size={16} />
          </button>
        ) : (
          <Link
            href="/login"
            className="bg-[#EF4444] rounded-full border px-3 py-1.5 text-sm text-white"
          >
            Log in
          </Link>
        )}
      </div>
    </header>
  );
}
