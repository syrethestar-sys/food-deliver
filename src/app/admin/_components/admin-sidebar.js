"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Truck, Settings, LayoutDashboard } from "lucide-react";
import { Logo } from "@/components/Logo";

const navItems = [
  { label: "Food menu", href: "/admin/food-menu", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: Truck },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-10 bg-white px-4 py-6 lg:flex">
      <button onClick={handleBack} className="flex items-center gap-2 px-2 cursor-pointer">
        <span className="flex leading-tight gap-2 items-center">
          <Logo />
          <div className="flex flex-col">
            {" "}
            <span className="text-[20px] font-semibold">NomNom</span>
            <span className="text-[11px] text-muted-foreground">
              Swift delivery
            </span>
          </div>
        </span>
      </button>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? "flex items-center gap-3 rounded-full bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-out active:scale-[0.98]"
                  : "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 ease-out hover:bg-muted hover:text-foreground active:scale-[0.98]"
              }
            >
              <Icon className="size-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
