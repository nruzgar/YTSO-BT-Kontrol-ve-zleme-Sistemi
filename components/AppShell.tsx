"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

const nav = [
  ["/", "Genel Görünüm"],
  ["/uyarilar", "Erken Uyarı Merkezi"],
  ["/kontroller", "Kontroller"],
  ["/gecmis", "Geçmiş Kayıtlar"],
  ["/dokumanlar", "Dokümanlar"],
  ["/riskler", "Riskler"],
  ["/uygunsuzluklar", "Uygunsuzluklar"],
  ["/envanter", "Envanter"],
  ["/yazilimlar", "Yazılımlar"],
  ["/lisanslar", "Lisanslar"],
  ["/bakimlar", "Bakımlar"],
  ["/denetim", "Denetim Görünümü"]
] as const;

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">BT</div>
          <div>
            <strong>YTSO BTYS</strong>
            <span>Kontrol, İzleme ve Erken Uyarı</span>
          </div>
        </div>
        <nav>
          {nav.map(([href, label]) => (
            <Link key={href} href={href} className={pathname === href ? "active" : ""}>{label}</Link>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" /> Sistem çevrim içi
        </div>
      </aside>
      <main className="main-area">
        <header className="topbar">
          <div>
            <span className="eyebrow">Yalova Ticaret ve Sanayi Odası</span>
            <h1>BT Kontrol, İzleme ve Erken Uyarı Sistemi</h1>
          </div>
          <div className="responsible-group">
            <span>Necat Rüzgar</span>
            <span>Gökhan Ergül</span>
          </div>
        </header>
        <section className="content">{children}</section>
      </main>
    </div>
  );
}
