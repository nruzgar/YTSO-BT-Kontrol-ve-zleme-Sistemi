import Badge from "@/components/Badge";
import { initialAlerts } from "@/lib/seed";

export default function AlertsPage() {
  return <>
    <div className="page-heading"><div><span className="eyebrow">Erken Uyarı Merkezi</span><h2>İşlem gerektiren durumlar</h2></div><Badge tone="danger">{initialAlerts.length} aktif uyarı</Badge></div>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Seviye</th><th>Kategori</th><th>Uyarı</th><th>Açıklama</th><th>Sorumlu</th><th>Hedef Tarih</th></tr></thead><tbody>
      {initialAlerts.map((item) => <tr key={item.id}><td><Badge tone={item.level === "Kritik" ? "danger" : item.level === "Uyarı" || item.level === "Dikkat" ? "warning" : "neutral"}>{item.level}</Badge></td><td>{item.category}</td><td><strong>{item.title}</strong></td><td>{item.detail}</td><td>{item.owner}</td><td>{item.dueDate ?? "-"}</td></tr>)}
    </tbody></table></div></section>
  </>;
}
