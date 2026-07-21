import Badge from "@/components/Badge";
import { historicalControls, initialAlerts, initialDocuments, initialLicenses, initialMaintenances, initialRisks, systemUsers } from "@/lib/seed";

export default function AuditPage() {
  const draftCount = historicalControls.filter((item) => item.verification === "Taslak Ön Kayıt").length;
  return <>
    <div className="page-heading"><div><span className="eyebrow">Salt Okunur Görünüm</span><h2>Denetim hazırlık özeti</h2></div><Badge tone="warning">Ön kayıt doğrulaması sürüyor</Badge></div>
    <div className="stats-grid">
      <article className="stat-card"><span>Yürürlükteki Doküman</span><strong>{initialDocuments.length}</strong><small>Revizyon bilgileri kayıtlı</small></article>
      <article className="stat-card"><span>Geçmiş Kontrol Kaydı</span><strong>{historicalControls.length}</strong><small>Son 12 aylık aktarım seti</small></article>
      <article className="stat-card"><span>Aktif Uyarı</span><strong>{initialAlerts.length}</strong><small>Bakım, lisans ve kontrol uyarıları</small></article>
      <article className="stat-card"><span>Sistem Sorumlusu</span><strong>{systemUsers.length}</strong><small>Necat Rüzgar ve Gökhan Ergül</small></article>
    </div>
    <div className="two-column">
      <section className="panel audit-note"><h3>Kanıt durumu</h3><p>Sistemde son 12 aylık günlük, haftalık, aylık, altı aylık ve yıllık kontrol kayıtları ön kayıt olarak hazırlanmıştır. {draftCount} kayıt henüz kurumca doğrulanmamıştır. Denetimde yalnızca gerçek kayıt, log, servis formu veya sorumlu teyidi ile doğrulanan kayıtlar kesin kanıt olarak sunulmalıdır.</p></section>
      <section className="panel audit-note"><h3>İzlenen alanlar</h3><p>{initialRisks.length} öncelikli risk, {initialLicenses.length} lisans/abonelik ve {initialMaintenances.length} periyodik bakım kaydı çevrim içi olarak izlenmektedir. Bitiş ve sonraki bakım tarihleri Erken Uyarı Merkezi'ne yansıtılmaktadır.</p></section>
    </div>
    <section className="panel"><div className="panel-header"><div><span className="eyebrow">Sorumluluk</span><h3>Yetkili kişiler</h3></div></div><div className="two-column compact">{systemUsers.map((user) => <div className="person-card" key={user.id}><strong>{user.name}</strong><span>{user.role} · {user.active ? "Aktif" : "Pasif"}</span></div>)}</div></section>
  </>;
}
