"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { initialDocuments, systemUsers } from "@/lib/seed";
import { getActiveUser, canEdit } from "@/lib/session";
import { readStorage, writeStorage } from "@/lib/storage";
import type { DocumentItem } from "@/lib/types";

const KEY = "ytso-btys-documents";
const empty: DocumentItem = { id: "", code: "", title: "", revision: "00", status: "Taslak", owner: "Necat Rüzgar", reviewDate: "", revisionDate: "", approvedBy: "", note: "" };

export default function DocumentsPage() {
  const [items, setItems] = useState<DocumentItem[]>(initialDocuments);
  const [editing, setEditing] = useState<DocumentItem | null>(null);
  const [editable, setEditable] = useState(true);

  useEffect(() => {
    setItems(readStorage(KEY, initialDocuments));
    setEditable(canEdit(getActiveUser().role));
    const refresh = () => setEditable(canEdit(getActiveUser().role));
    window.addEventListener("ytso-user-changed", refresh);
    return () => window.removeEventListener("ytso-user-changed", refresh);
  }, []);

  function save() {
    if (!editing || !editing.code.trim() || !editing.title.trim()) return;
    const item = { ...editing, id: editing.id || `doc-${Date.now()}` };
    const next = items.some((x) => x.id === item.id) ? items.map((x) => x.id === item.id ? item : x) : [...items, item];
    setItems(next); writeStorage(KEY, next); setEditing(null);
  }

  return <>
    <div className="page-heading"><div><span className="eyebrow">Doküman Merkezi</span><h2>Yürürlükteki dokümanlar</h2></div><button className="primary" disabled={!editable} onClick={() => setEditing(empty)}>Yeni doküman</button></div>
    {!editable && <div className="notice warning">Denetçi rolü yalnızca görüntüleyebilir. Düzenleme için Sistem Sorumlusu veya Yönetici seçilmelidir.</div>}
    <section className="panel"><div className="table-wrap"><table><thead><tr><th>Doküman No</th><th>Başlık</th><th>Revizyon</th><th>Sorumlu</th><th>Gözden Geçirme</th><th>Durum</th><th>İşlem</th></tr></thead><tbody>
      {items.map((doc) => <tr key={doc.id}><td><strong>{doc.code}</strong></td><td>{doc.title}</td><td>{doc.revision}</td><td>{doc.owner}</td><td>{doc.reviewDate || "—"}</td><td><Badge tone={doc.status === "Yürürlükte" ? "success" : "warning"}>{doc.status}</Badge></td><td><div className="action-links"><Link href={`/dokumanlar/${doc.id}`}>Görüntüle</Link><button className="link-button" disabled={!editable} onClick={() => setEditing(doc)}>Düzenle</button>{doc.code && <a href={`/documents/${doc.code}.md`} download>İndir</a>}</div></td></tr>)}
    </tbody></table></div></section>
    {editing && <div className="modal-backdrop"><div className="modal-card"><div className="modal-head"><h3>{editing.id ? "Dokümanı düzenle" : "Yeni doküman"}</h3><button onClick={() => setEditing(null)}>×</button></div><div className="form-grid">
      <label>Doküman kodu<input value={editing.code} onChange={e=>setEditing({...editing,code:e.target.value})}/></label>
      <label>Revizyon<input value={editing.revision} onChange={e=>setEditing({...editing,revision:e.target.value})}/></label>
      <label className="span-2">Başlık<input value={editing.title} onChange={e=>setEditing({...editing,title:e.target.value})}/></label>
      <label>Sorumlu<select value={editing.owner} onChange={e=>setEditing({...editing,owner:e.target.value})}>{systemUsers.map(u=><option key={u.id}>{u.name}</option>)}</select></label>
      <label>Durum<select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value as DocumentItem["status"]})}><option>Yürürlükte</option><option>Taslak</option></select></label>
      <label>Revizyon tarihi<input type="date" value={editing.revisionDate || ""} onChange={e=>setEditing({...editing,revisionDate:e.target.value})}/></label>
      <label>Gözden geçirme tarihi<input type="date" value={editing.reviewDate} onChange={e=>setEditing({...editing,reviewDate:e.target.value})}/></label>
      <label className="span-2">Onaylayan<input value={editing.approvedBy || ""} onChange={e=>setEditing({...editing,approvedBy:e.target.value})}/></label>
      <label className="span-2">Revizyon notu<textarea value={editing.note || ""} onChange={e=>setEditing({...editing,note:e.target.value})}/></label>
    </div><div className="modal-actions"><button onClick={()=>setEditing(null)}>Vazgeç</button><button className="primary" onClick={save}>Kaydet</button></div></div></div>}
  </>;
}
