"use client";

import { useEffect, useMemo, useState } from "react";
import Badge from "@/components/Badge";
import StatCard from "@/components/StatCard";
import { initialControls, initialDocuments, initialFindings, initialRisks } from "@/lib/seed";
import { readStorage } from "@/lib/storage";
import type { ControlItem, FindingItem } from "@/lib/types";

export default function DashboardPage() {
  const [controls, setControls] = useState<ControlItem[]>(initialControls);
  const [findings, setFindings] = useState<FindingItem[]>(initialFindings);

  useEffect(() => {
    setControls(readStorage("ytso-controls", initialControls));
    setFindings(readStorage("ytso-findings", initialFindings));
  }, []);

  const completed = controls.filter((item) => item.status === "completed").length;
  const openFindings = findings.filter((item) => item.status !== "closed").length;
  const criticalRisks = initialRisks.filter((item) => item.probability * item.impact >= 16).length;
  const compliance = useMemo(() => controls.length ? Math.round((completed / controls.length) * 100) : 0, [completed, controls.length]);

  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow">Genel Görünüm</span><h2>Bugünün durumu</h2></div>
        <Badge tone="success">Sistem aktif</Badge>
      </div>

      <div className="stats-grid">
        <StatCard label="Bugünkü Kontroller" value={`${completed}/${controls.length}`} detail="Tamamlanan kontrol sayısı" />
        <StatCard label="Açık Uygunsuzluk" value={openFindings} detail="Takip edilmesi gereken kayıt" />
        <StatCard label="Kritik Risk" value={criticalRisks} detail="Puanı 16 ve üzeri risk" />
        <StatCard label="Uyum Oranı" value={`%${compliance}`} detail="Mevcut kontrol gerçekleşme oranı" />
      </div>

      <div className="two-column">
        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">Kontrol Takvimi</span><h3>Bekleyen işler</h3></div></div>
          <div className="list">
            {controls.map((control) => (
              <div className="list-row" key={control.id}>
                <div><strong>{control.title}</strong><span>{control.frequency} · {control.responsible}</span></div>
                <Badge tone={control.status === "completed" ? "success" : "warning"}>{control.status === "completed" ? "Tamamlandı" : "Bekliyor"}</Badge>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">Doküman Yönetimi</span><h3>Yürürlükteki belgeler</h3></div><Badge>{initialDocuments.length} belge</Badge></div>
          <div className="list">
            {initialDocuments.slice(0, 4).map((doc) => (
              <div className="list-row" key={doc.id}>
                <div><strong>{doc.code} · {doc.title}</strong><span>Revizyon {doc.revision}</span></div>
                <Badge tone="success">{doc.status}</Badge>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel">
        <div className="panel-header"><div><span className="eyebrow">Risk Görünümü</span><h3>Öncelikli riskler</h3></div></div>
        <div className="table-wrap"><table><thead><tr><th>Kod</th><th>Risk</th><th>Varlık</th><th>Puan</th><th>Sorumlu</th><th>Durum</th></tr></thead><tbody>
          {initialRisks.map((risk) => {
            const score = risk.probability * risk.impact;
            return <tr key={risk.id}><td>{risk.code}</td><td>{risk.title}</td><td>{risk.asset}</td><td><strong>{score}</strong></td><td>{risk.owner}</td><td><Badge tone={score >= 16 ? "danger" : score >= 11 ? "warning" : "neutral"}>{score >= 16 ? "Kritik" : score >= 11 ? "Yüksek" : "Orta"}</Badge></td></tr>;
          })}
        </tbody></table></div>
      </section>
    </>
  );
}
