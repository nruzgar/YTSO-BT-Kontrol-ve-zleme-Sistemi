"use client";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { initialFindings } from "@/lib/seed";
import { readStorage, writeStorage } from "@/lib/storage";
import type { FindingItem } from "@/lib/types";

export default function FindingsPage() {
  const [items, setItems] = useState<FindingItem[]>(initialFindings);
  useEffect(() => setItems(readStorage("ytso-findings", initialFindings)), []);
  function close(id: string) { const next = items.map((item) => item.id === id ? { ...item, status: "closed" as const } : item); setItems(next); writeStorage("ytso-findings", next); }
  return <><div className="page-heading"><div><span className="eyebrow">Faaliyet Takibi</span><h2>Uygunsuzluklar</h2></div><Badge tone="warning">{items.filter((i) => i.status !== "closed").length} açık kayıt</Badge></div><section className="panel"><div className="table-wrap"><table><thead><tr><th>Kaynak</th><th>Tespit</th><th>Önem</th><th>Sorumlu</th><th>Hedef Tarih</th><th>Durum</th><th></th></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td>{item.source}</td><td><strong>{item.title}</strong></td><td><Badge tone={item.severity === "Kritik" ? "danger" : "warning"}>{item.severity}</Badge></td><td>{item.owner}</td><td>{item.targetDate}</td><td>{item.status === "closed" ? "Kapatıldı" : "Açık"}</td><td>{item.status !== "closed" && <button className="text-button" onClick={() => close(item.id)}>Kapat</button>}</td></tr>)}</tbody></table></div></section></>;
}
