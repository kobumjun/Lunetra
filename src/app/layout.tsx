import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Lunetra Entertainment Network",
  description: "K-POP 프로젝트 운영, 글로벌 오디션, 팬 참여 챌린지 플랫폼",
  openGraph: {
    title: "Lunetra Entertainment Network",
    description: "Global K-POP Project Platform",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
