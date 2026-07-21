import Badge from "@/components/Badge";
import { initialDocuments } from "@/lib/seed";

export default function DocumentsPage() {
  return <><div className="page-heading"><div><span className="eyebrow">Doküman Merkezi</span><h2>Yürürlükteki dokümanlar</h2></div><button className="primary">Yeni doküman</button></div><section className="panel"><div className="table-wrap"><table><thead><tr><th>Doküman No</th><th>Başlık</th><th>Revizyon</th><th>Sorumlu</th><th>Gözden Geçirme</th><th>Durum</th></tr></thead><tbody>{initialDocuments.map((doc) => <tr key={doc.id}><td><strong>{doc.code}</strong></td><td>{doc.title}</td><td>{doc.revision}</td><td>{doc.owner}</td><td>{doc.reviewDate}</td><td><Badge tone="success">{doc.status}</Badge></td></tr>)}</tbody></table></div></section></>;
}
