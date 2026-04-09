import { SiteHeader } from "@/components/common/site-header";
import { SiteFooter } from "@/components/common/site-footer";
import type { ReactNode } from "react";

export function PublicShell({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: { company_name?: string; address?: string; email?: string; footer_text?: string };
}) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <SiteFooter
        companyName={footer?.company_name}
        address={footer?.address}
        email={footer?.email}
        footerText={footer?.footer_text}
      />
    </div>
  );
}
