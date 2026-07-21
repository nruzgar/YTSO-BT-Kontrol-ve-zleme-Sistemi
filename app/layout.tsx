import type { Metadata } from "next";
import "./globals.css";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "YTSO BT Kontrol ve İzleme Sistemi",
  description: "Bilgi teknolojileri kontrolleri, riskleri, dokümanları ve düzeltici faaliyetleri için kurumsal izleme sistemi."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
