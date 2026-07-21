import Badge from "@/components/Badge";
const assets = [
  ["SRV-001", "Ana Sunucu", "Sistem Odası", "Kritik", "Aktif"],
  ["NAS-001", "Yedekleme NAS", "Sistem Odası", "Kritik", "Aktif"],
  ["FW-001", "Güvenlik Duvarı", "Sistem Odası", "Kritik", "Aktif"],
  ["UPS-001", "Kesintisiz Güç Kaynağı", "Sistem Odası", "Yüksek", "Bakım Planlı"]
];
export default function InventoryPage() { return <><div className="page-heading"><div><span className="eyebrow">Varlık Yönetimi</span><h2>BT envanteri</h2></div><button className="primary">Yeni varlık</button></div><section className="panel"><div className="table-wrap"><table><thead><tr><th>Varlık No</th><th>Tanım</th><th>Konum</th><th>Kritiklik</th><th>Durum</th></tr></thead><tbody>{assets.map((asset) => <tr key={asset[0]}><td><strong>{asset[0]}</strong></td><td>{asset[1]}</td><td>{asset[2]}</td><td>{asset[3]}</td><td><Badge tone={asset[4] === "Aktif" ? "success" : "warning"}>{asset[4]}</Badge></td></tr>)}</tbody></table></div></section></>; }
