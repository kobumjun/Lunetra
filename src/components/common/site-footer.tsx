type FooterProps = {
  companyName?: string;
  address?: string;
  email?: string;
  footerText?: string;
};

export function SiteFooter({ companyName, address, email, footerText }: FooterProps) {
  return (
    <footer className="mt-20 border-t bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-zinc-600">
        <p className="font-semibold text-zinc-800">{companyName ?? "Lunetra Entertainment Network"}</p>
        <p>{address}</p>
        <p>{email}</p>
        <p className="mt-4 text-xs text-zinc-500">{footerText ?? "All rights reserved."}</p>
      </div>
    </footer>
  );
}
