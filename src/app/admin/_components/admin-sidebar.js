import Link from "next/link";
import { LayoutGrid, Truck } from "lucide-react";

const navItems = [
  { label: "Food menu", href: "/admin/food-menu", icon: LayoutGrid, active: true },
  { label: "Orders", href: "/admin/orders", icon: Truck, active: false },
];

export function AdminSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-10 bg-white px-4 py-6 lg:flex">
      <div className="flex items-center gap-2 px-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-[#EF4444]">
          {/* brand mark */}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-lg font-bold">NomNom</span>
          <span className="text-[11px] text-muted-foreground">Swift delivery</span>
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon, active }) => (
          <Link
            key={href}
            href={href}
            className={
              active
                ? "flex items-center gap-3 rounded-full bg-[#18181B] px-4 py-2.5 text-sm font-medium text-white"
                : "flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium text-muted-foreground"
            }
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
