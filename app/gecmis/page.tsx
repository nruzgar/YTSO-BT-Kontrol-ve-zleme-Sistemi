"use client";

import { useMemo, useState } from "react";
import Badge from "@/components/Badge";
import { historicalControls } from "@/lib/seed";

export default function HistoryPage() {
  const [type, setType] = useState("Tümü");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => historicalControls.filter((item) => (type === "Tümü" || item.controlType === type) && `${item.title} ${item.responsible} ${item.performedAt}`.toLocaleLowerCase("tr-TR").includes(query.toLocaleLowerCase("tr-TR"))), [type, query]);

  return <>
    <div className="page-heading"><div><span className="eyebrow">Geçmiş Kayıtlar</span><h2>Son 12 aylık kontrol arşivi</h2></div><Badge tone="warning">Doğrulama gerekli</Badge></div>
    <section className="notice warning"><strong>Önemli:</strong> Bu kayıtlar hızlı başlangıç amacıyla oluşturulmuş ön kayıtlardır. Denetim kanıtına dönüştürülmeden önce servis formları, görev kayıtları, loglar veya sorumlu teyidiyle doğrulanmalıdır.</section>
    <section className="panel filter-bar"><select value={type} onChange={(event) => setType(event.target.value)}><option>Tümü</option><option>Günlük</option><option>Haftalık</option><option>Aylık</option><option>Altı Aylık</option><option>Yıllık</option></select><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tarih, kontrol veya sorumlu ara"/><Badge>{filtered.length} kayıt</Badge></section>
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Tarih</th><th>Periyot</th><th>Kontrol</th><th>Sorumlu</th><th>Sonuç</th><th>Doğrulama</th><th>Not</th></tr></thead><tbody>
      {filtered.slice(0, 220).map((item) => <tr key={item.id}><td>{item.performedAt}</td><td>{item.controlType}</td><td><strong>{item.title}</strong></td><td>{item.responsible}</td><td><Badge tone={item.result === "Uygun" ? "success" : "warning"}>{item.result}</Badge></td><td><Badge tone="warning">{item.verification}</Badge></td><td>{item.note}</td></tr>)}
    </tbody></table></div>{filtered.length > 220 && <p className="table-note">Performans için ilk 220 kayıt gösteriliyor. Arama ve filtre kullanarak diğer kayıtlara ulaşabilirsiniz.</p>}</section>
  </>;
}
