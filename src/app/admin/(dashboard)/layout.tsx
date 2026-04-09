import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { adminLogout } from "@/lib/actions";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();
  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:grid-cols-[220px_1fr]">
      <AdminSidebar />
      <div className="space-y-4">
        <form action={adminLogout} className="flex justify-end">
          <Button variant="outline">로그아웃</Button>
        </form>
        {children}
      </div>
    </div>
  );
}
