import Badge from "@/components/Badge";
import { initialSoftware } from "@/lib/seed";

export default function SoftwarePage() {
  return <>
    <div className="page-heading"><div><span className="eyebrow">Yazılım Envanteri</span><h2>Kritik yazılımlar ve operasyonel kontroller</h2><p>Her ürün için lisans, çalışma durumu, kanıt ve sorumlu birlikte izlenir.</p></div><button className="primary">Yeni yazılım</button></div>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Yazılım</th><th>Amaç</th><th>Platform</th><th>Kontrol Edilecek Alan</th><th>Denetim Kanıtı</th><th>Sorumlu</th><th>Durum</th></tr></thead><tbody>
      {initialSoftware.map((item) => <tr key={item.id}><td><strong>{item.product}</strong></td><td>{item.purpose}</td><td>{item.platform}</td><td>{item.operationalCheck}</td><td>{item.evidence}</td><td>{item.responsible}</td><td><Badge tone={item.status === "Aktif" ? "success" : "warning"}>{item.status}</Badge></td></tr>)}
    </tbody></table></div></section>
  </>;
}
