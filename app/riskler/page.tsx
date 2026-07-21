import Badge from "@/components/Badge";
import { initialRisks } from "@/lib/seed";

export default function RisksPage() {
  return <><div className="page-heading"><div><span className="eyebrow">Risk Merkezi</span><h2>Bilgi teknolojileri riskleri</h2></div><button className="primary">Yeni risk</button></div><section className="panel"><div className="table-wrap"><table><thead><tr><th>Kod</th><th>Risk</th><th>Varlık</th><th>O</th><th>E</th><th>Puan</th><th>Sorumlu</th><th>Planlanan tedbir</th></tr></thead><tbody>{initialRisks.map((risk) => { const score = risk.probability * risk.impact; return <tr key={risk.id}><td><strong>{risk.code}</strong></td><td>{risk.title}</td><td>{risk.asset}</td><td>{risk.probability}</td><td>{risk.impact}</td><td><Badge tone={score >= 16 ? "danger" : "warning"}>{score}</Badge></td><td>{risk.owner}</td><td>{risk.action}</td></tr>; })}</tbody></table></div></section></>;
}
