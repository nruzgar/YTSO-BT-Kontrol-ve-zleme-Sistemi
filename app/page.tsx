"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/Badge";
import StatCard from "@/components/StatCard";
import { historicalControls, initialAlerts, initialControls, initialDocuments, initialFindings, initialLicenses, initialMaintenances, initialRisks } from "@/lib/seed";
import { readStorage } from "@/lib/storage";
import type { ControlItem, FindingItem } from "@/lib/types";

export default function DashboardPage() {
  const [controls, setControls] = useState<ControlItem[]>(initialControls);
  const [findings, setFindings] = useState<FindingItem[]>(initialFindings);

  useEffect(() => {
    setControls(readStorage("ytso-controls", initialControls));
    setFindings(readStorage("ytso-findings", initialFindings));
  }, []);

  const completed = controls.filter((item) => item.status === "completed").length;
  const openFindings = findings.filter((item) => item.status !== "closed").length;
  const criticalRisks = initialRisks.filter((item) => item.probability * item.impact >= 16).length;
  const criticalAlerts = initialAlerts.filter((item) => item.level === "Kritik" || item.level === "Uyarı").length;
  const compliance = useMemo(() => controls.length ? Math.round((completed / controls.length) * 100) : 0, [completed, controls.length]);
  const expiringLicenses = initialLicenses.filter((item) => item.status !== "Aktif").length;
  const dueMaintenances = initialMaintenances.filter((item) => item.status !== "Planlı").length;
  const verifiedHistory = historicalControls.filter((item) => item.verification === "Kurumca Doğrulandı").length;
  const documentCurrency = 100;
  const riskControlRate = initialRisks.length ? Math.round(((initialRisks.length - criticalRisks) / initialRisks.length) * 100) : 100;
  const maintenanceCompliance = initialMaintenances.length ? Math.round(((initialMaintenances.length - dueMaintenances) / initialMaintenances.length) * 100) : 100;
  const licenseDataRate = initialLicenses.length ? Math.round((initialLicenses.filter((item) => item.status !== "Tarih Bekleniyor").length / initialLicenses.length) * 100) : 100;
  const auditReadiness = Math.round((compliance + documentCurrency + riskControlRate + maintenanceCompliance + licenseDataRate) / 5);

  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow">Genel Görünüm</span><h2>21 Temmuz 2026 durum özeti</h2></div>
        <Badge tone="success">Sistem aktif</Badge>
      </div>

      <div className="stats-grid">
        <StatCard label="Bugünkü Kontroller" value={`${completed}/${controls.length}`} detail="Tamamlanan kontrol sayısı" />
        <StatCard label="Aktif Erken Uyarı" value={criticalAlerts} detail="Kritik ve uyarı seviyesindeki kayıt" />
        <StatCard label="Lisans Yenileme" value={expiringLicenses} detail="Yenileme işlemi bekleyen lisans" />
        <StatCard label="Yaklaşan / Geciken Bakım" value={dueMaintenances} detail="İşlem gerektiren bakım kaydı" />
      </div>

      <section className="panel kpi-panel">
        <div className="panel-header"><div><span className="eyebrow">Yönetim KPI Paneli</span><h3>Denetim hazırlık ve BT uyum göstergeleri</h3></div><div className="score-ring"><strong>{auditReadiness}</strong><span>/100</span></div></div>
        <div className="kpi-grid">
          {[
            ["Kontrol Tamamlama", compliance, "Günlük ve dönemsel kontroller"],
            ["Doküman Güncelliği", documentCurrency, "Yürürlük ve revizyon takibi"],
            ["Risk Kontrol Oranı", riskControlRate, "Kritik olmayan risk oranı"],
            ["Bakım Uyum Oranı", maintenanceCompliance, "Planında ilerleyen bakımlar"],
            ["Lisans Veri Tamlığı", licenseDataRate, "Bitiş tarihi doğrulanan lisanslar"],
            ["Kanıt Doğrulama", historicalControls.length ? Math.round((verifiedHistory / historicalControls.length) * 100) : 0, "Kurumca teyit edilen geçmiş kayıtlar"]
          ].map(([label, value, detail]) => <div className="kpi-item" key={String(label)}><div><strong>{label}</strong><span>{detail}</span></div><b>%{value}</b><div className="progress"><i style={{width: `${value}%`}} /></div></div>)}
        </div>
      </section>

      <div className="two-column">
        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">Erken Uyarı</span><h3>Öncelikli bildirimler</h3></div><Badge tone="danger">{criticalAlerts} önemli</Badge></div>
          <div className="list">
            {initialAlerts.slice(0, 5).map((alert) => (
              <div className="list-row" key={alert.id}>
                <div><strong>{alert.title}</strong><span>{alert.owner} · {alert.dueDate ?? "Tarih yok"}</span></div>
                <Badge tone={alert.level === "Kritik" ? "danger" : alert.level === "Uyarı" ? "warning" : "neutral"}>{alert.level}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">Denetim Kanıtı</span><h3>Geçmiş dönem kayıtları</h3></div><Badge>{historicalControls.length} kayıt</Badge></div>
          <div className="summary-block">
            <strong>Son 12 aylık ön kayıt seti oluşturuldu.</strong>
            <p>Günlük, haftalık, aylık, altı aylık ve yıllık kayıtlar Necat Rüzgar ile Gökhan Ergül arasında dağıtıldı. Bu kayıtlar denetim kanıtı olarak kullanılmadan önce kurum kayıtlarıyla doğrulanmalıdır.</p>
          </div>
          <div className="metric-row"><span>Doğrulanmayı bekleyen</span><strong>{historicalControls.filter((item) => item.verification === "Taslak Ön Kayıt").length}</strong></div>
          <div className="metric-row"><span>Kurumca doğrulanan</span><strong>0</strong></div>
        </section>
      </div>

      <div className="stats-grid">
        <StatCard label="Açık Uygunsuzluk" value={openFindings} detail="Takip edilmesi gereken kayıt" />
        <StatCard label="Kritik Risk" value={criticalRisks} detail="Puanı 16 ve üzeri risk" />
        <StatCard label="Yürürlükteki Doküman" value={initialDocuments.length} detail="Revizyon ve gözden geçirme takibi" />
        <StatCard label="Güncel Kontrol Uyum Oranı" value={`%${compliance}`} detail="Bugünkü kontrol gerçekleşme oranı" />
      </div>

      <section className="panel">
        <div className="panel-header"><div><span className="eyebrow">Görev Dağılımı</span><h3>Aktif sistem sorumluları</h3></div></div>
        <div className="two-column compact">
          <div className="person-card"><strong>Necat Rüzgar</strong><span>Sistem sorumlusu · Doküman, risk, lisans ve bakım takibi</span></div>
          <div className="person-card"><strong>Gökhan Ergül</strong><span>Sistem sorumlusu · Kontrol, envanter, bakım ve uygunsuzluk takibi</span></div>
        </div>
      </section>
    </>
  );
}
