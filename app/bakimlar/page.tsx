import Badge from "@/components/Badge";
import { initialMaintenances } from "@/lib/seed";

export default function MaintenancePage() {
  return <>
    <div className="page-heading"><div><span className="eyebrow">Bakım Yönetimi</span><h2>Periyodik bakım takvimi</h2></div><button className="primary">Yeni bakım</button></div>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Varlık</th><th>Bakım Türü</th><th>Son Bakım</th><th>Sonraki Bakım</th><th>Sorumlu</th><th>Tedarikçi</th><th>Durum</th></tr></thead><tbody>
      {initialMaintenances.map((item) => <tr key={item.id}><td><strong>{item.assetCode}</strong><br/>{item.assetName}</td><td>{item.maintenanceType}</td><td>{item.lastMaintenanceDate}</td><td><strong>{item.nextMaintenanceDate}</strong></td><td>{item.responsible}</td><td>{item.supplier}</td><td><Badge tone={item.status === "Planlı" ? "success" : item.status === "Gecikmiş" ? "danger" : "warning"}>{item.status}</Badge></td></tr>)}
    </tbody></table></div></section>
  </>;
}
