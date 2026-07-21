"use client";

import { useEffect, useState } from "react";
import Badge from "@/components/Badge";
import { initialLicenses, systemUsers } from "@/lib/seed";
import { getActiveUser, canEdit } from "@/lib/session";
import { readStorage, writeStorage } from "@/lib/storage";
import type { LicenseItem } from "@/lib/types";

const KEY = "ytso-btys-licenses";
const empty: LicenseItem = { id:"", product:"", category:"", supplier:"", responsible:"Necat Rüzgar", expiryDate:"", warningDays:60, renewalPeriod:"Yıllık", status:"Tarih Bekleniyor", note:"" };

export default function LicensesPage() {
  const [items,setItems]=useState(initialLicenses); const [editing,setEditing]=useState<LicenseItem|null>(null); const [editable,setEditable]=useState(true);
  useEffect(()=>{setItems(readStorage(KEY,initialLicenses)); setEditable(canEdit(getActiveUser().role)); const f=()=>setEditable(canEdit(getActiveUser().role)); window.addEventListener("ytso-user-changed",f); return()=>window.removeEventListener("ytso-user-changed",f)},[]);
  function save(){if(!editing?.product.trim())return; const item={...editing,id:editing.id||`lic-${Date.now()}`,status:editing.expiryDate?editing.status:"Tarih Bekleniyor"} as LicenseItem; const next=items.some(x=>x.id===item.id)?items.map(x=>x.id===item.id?item:x):[...items,item]; setItems(next);writeStorage(KEY,next);setEditing(null)}
  return <><div className="page-heading"><div><span className="eyebrow">Lisans Yönetimi</span><h2>Lisans, abonelik ve yenileme takibi</h2><p>Lisans tarihleri bu ekrandaki Yeni Lisans veya Düzenle işlemiyle girilir.</p></div><button className="primary" disabled={!editable} onClick={()=>setEditing(empty)}>Yeni lisans</button></div>
  <section className="panel"><div className="table-wrap"><table><thead><tr><th>Ürün / Hizmet</th><th>Kategori</th><th>Sorumlu</th><th>Bitiş Tarihi</th><th>Uyarı</th><th>Durum</th><th>İşlem</th></tr></thead><tbody>{items.map(item=><tr key={item.id}><td><strong>{item.product}</strong><br/><small>{item.note}</small></td><td>{item.category}</td><td>{item.responsible}</td><td><strong>{item.expiryDate||"Tarih girilmedi"}</strong></td><td>{item.warningDays} gün</td><td><Badge tone={item.status==="Aktif"?"success":item.status==="Süresi Doldu"?"danger":"warning"}>{item.status}</Badge></td><td><button className="link-button" disabled={!editable} onClick={()=>setEditing(item)}>Düzenle</button></td></tr>)}</tbody></table></div></section>
  {editing&&<div className="modal-backdrop"><div className="modal-card"><div className="modal-head"><h3>{editing.id?"Lisansı düzenle":"Yeni lisans"}</h3><button onClick={()=>setEditing(null)}>×</button></div><div className="form-grid">
    <label className="span-2">Ürün / hizmet<input value={editing.product} onChange={e=>setEditing({...editing,product:e.target.value})}/></label><label>Kategori<input value={editing.category} onChange={e=>setEditing({...editing,category:e.target.value})}/></label><label>Tedarikçi<input value={editing.supplier} onChange={e=>setEditing({...editing,supplier:e.target.value})}/></label>
    <label>Sorumlu<select value={editing.responsible} onChange={e=>setEditing({...editing,responsible:e.target.value})}>{systemUsers.map(u=><option key={u.id}>{u.name}</option>)}</select></label><label>Bitiş tarihi<input type="date" value={editing.expiryDate.includes("-")?editing.expiryDate:""} onChange={e=>setEditing({...editing,expiryDate:e.target.value})}/></label>
    <label>Son yenileme<input type="date" value={editing.lastRenewalDate||""} onChange={e=>setEditing({...editing,lastRenewalDate:e.target.value})}/></label><label>Uyarı eşiği<input type="number" min="1" value={editing.warningDays} onChange={e=>setEditing({...editing,warningDays:Number(e.target.value)})}/></label>
    <label>Yenileme periyodu<input value={editing.renewalPeriod} onChange={e=>setEditing({...editing,renewalPeriod:e.target.value})}/></label><label>Durum<select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value as LicenseItem["status"]})}><option>Aktif</option><option>Yenileme Bekliyor</option><option>Süresi Doldu</option><option>Tarih Bekleniyor</option></select></label>
    <label className="span-2">Not<textarea value={editing.note} onChange={e=>setEditing({...editing,note:e.target.value})}/></label></div><div className="modal-actions"><button onClick={()=>setEditing(null)}>Vazgeç</button><button className="primary" onClick={save}>Kaydet</button></div></div></div>}
  </>;
}
