import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminTopbar } from "./_components/admin-topbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-svh bg-[#F4F4F5]">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminTopbar />
        <main className="flex-1 px-4 pb-12 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
