import Badge from "@/components/Badge";
import { initialLicenses } from "@/lib/seed";

export default function LicensesPage() {
  return <>
    <div className="page-heading"><div><span className="eyebrow">Lisans Yönetimi</span><h2>Lisans, abonelik ve yenileme takibi</h2><p>Gerçek tarihler girildiğinde sistem 90/60/45/30/15 günlük eşiklere göre uyarı üretir.</p></div><button className="primary">Yeni lisans</button></div>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Ürün / Hizmet</th><th>Kategori</th><th>Sorumlu</th><th>Bitiş Tarihi</th><th>Uyarı Eşiği</th><th>Yenileme</th><th>Durum</th></tr></thead><tbody>
      {initialLicenses.map((item) => <tr key={item.id}><td><strong>{item.product}</strong><br/><small>{item.note}</small></td><td>{item.category}</td><td>{item.responsible}</td><td><strong>{item.expiryDate}</strong></td><td>{item.warningDays} gün</td><td>{item.renewalPeriod}</td><td><Badge tone={item.status === "Aktif" ? "success" : item.status === "Süresi Doldu" ? "danger" : "warning"}>{item.status}</Badge></td></tr>)}
    </tbody></table></div></section>
  </>;
}
