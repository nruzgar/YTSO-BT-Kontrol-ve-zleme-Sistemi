"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { initialControls, initialFindings } from "@/lib/seed";
import { readStorage, writeStorage } from "@/lib/storage";
import type { ControlItem, FindingItem } from "@/lib/types";

export default function ControlsPage() {
  const [controls, setControls] = useState<ControlItem[]>(initialControls);
  const [activeId, setActiveId] = useState(initialControls[0].id);

  useEffect(() => setControls(readStorage("ytso-controls", initialControls)), []);
  const active = controls.find((item) => item.id === activeId) ?? controls[0];

  function setResult(checkId: string, result: "Uygun" | "Uygun Değil" | "Uygulanamaz") {
    const next = controls.map((control) => control.id === active.id ? { ...control, checks: control.checks.map((check) => check.id === checkId ? { ...check, result } : check) } : control);
    setControls(next);
    writeStorage("ytso-controls", next);
  }

  function completeControl() {
    if (!active.checks.every((check) => check.result)) return alert("Tüm kontrol maddelerini değerlendiriniz.");
    const next = controls.map((control) => control.id === active.id ? { ...control, status: "completed" as const } : control);
    setControls(next);
    writeStorage("ytso-controls", next);

    const negativeChecks = active.checks.filter((check) => check.result === "Uygun Değil");
    if (negativeChecks.length) {
      const findings = readStorage<FindingItem[]>("ytso-findings", initialFindings);
      const created = negativeChecks.map((check, index) => ({
        id: `${Date.now()}-${index}`,
        source: active.title,
        title: check.label,
        severity: "Orta" as const,
        owner: "Bilgi İşlem",
        targetDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
        status: "open" as const
      }));
      writeStorage("ytso-findings", [...created, ...findings]);
    }
    alert("Kontrol kaydı tamamlandı.");
  }

  return (
    <>
      <div className="page-heading"><div><span className="eyebrow">Kontrol Merkezi</span><h2>Periyodik kontroller</h2></div><Badge>{controls.length} görev</Badge></div>
      <div className="control-layout">
        <aside className="panel control-menu">
          {controls.map((control) => <button key={control.id} className={active.id === control.id ? "selected" : ""} onClick={() => setActiveId(control.id)}><span>{control.title}</span><small>{control.frequency}</small></button>)}
        </aside>
        <section className="panel">
          <div className="panel-header"><div><span className="eyebrow">{active.frequency} kontrol</span><h3>{active.title}</h3></div><Badge tone={active.status === "completed" ? "success" : "warning"}>{active.status === "completed" ? "Tamamlandı" : "Bekliyor"}</Badge></div>
          <div className="check-list">
            {active.checks.map((check, index) => (
              <div className="check-row" key={check.id}>
                <div><span className="number">{index + 1}</span><strong>{check.label}</strong></div>
                <div className="segmented">
                  {(["Uygun", "Uygun Değil", "Uygulanamaz"] as const).map((value) => <button key={value} className={check.result === value ? "active" : ""} onClick={() => setResult(check.id, value)}>{value}</button>)}
                </div>
              </div>
            ))}
          </div>
          <div className="form-actions"><button className="primary" onClick={completeControl}>Kontrolü tamamla</button></div>
        </section>
      </div>
    </>
  );
}
