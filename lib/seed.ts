import type { ControlItem, DocumentItem, FindingItem, RiskItem } from "./types";

export const initialControls: ControlItem[] = [
  {
    id: "daily-001",
    title: "Günlük Sistem Odası Kontrolü",
    frequency: "Günlük",
    responsible: "Bilgi İşlem",
    dueDate: new Date().toISOString().slice(0, 10),
    status: "pending",
    checks: [
      { id: "c1", label: "Sistem odası kapısı kilitli" },
      { id: "c2", label: "Ortam sıcaklığı uygun aralıkta" },
      { id: "c3", label: "UPS üzerinde alarm bulunmuyor" },
      { id: "c4", label: "Sunucular ve NAS çalışıyor" },
      { id: "c5", label: "Yedekleme işlemi başarıyla tamamlanmış" },
      { id: "c6", label: "Klima normal çalışıyor" },
      { id: "c7", label: "Su sızıntısı veya duman belirtisi yok" }
    ]
  },
  {
    id: "weekly-001",
    title: "Haftalık BT Kontrolü",
    frequency: "Haftalık",
    responsible: "Bilgi İşlem",
    dueDate: new Date().toISOString().slice(0, 10),
    status: "pending",
    checks: [
      { id: "w1", label: "Yedekleme günlükleri gözden geçirildi" },
      { id: "w2", label: "Disk kullanım oranları kontrol edildi" },
      { id: "w3", label: "Güvenlik güncellemeleri kontrol edildi" },
      { id: "w4", label: "Firewall ve switch kayıtları incelendi" }
    ]
  }
];

export const initialDocuments: DocumentItem[] = [
  { id: "d1", code: "BT-001", title: "Bilgi Teknolojileri Politikası", revision: "00", status: "Yürürlükte", owner: "Bilgi İşlem", reviewDate: "2027-07-01" },
  { id: "d2", code: "BT-002", title: "Sistem Odası Yönetim Talimatı", revision: "00", status: "Yürürlükte", owner: "Bilgi İşlem", reviewDate: "2027-07-01" },
  { id: "d3", code: "BT-003", title: "Sistem Odası Risk Analizi", revision: "00", status: "Yürürlükte", owner: "Bilgi İşlem", reviewDate: "2027-07-01" },
  { id: "d4", code: "BT-004", title: "Risk Değerlendirme Metodolojisi", revision: "00", status: "Yürürlükte", owner: "Bilgi İşlem", reviewDate: "2027-07-01" },
  { id: "d5", code: "BT-005", title: "Günlük Sistem Odası Kontrol Formu", revision: "00", status: "Yürürlükte", owner: "Bilgi İşlem", reviewDate: "2027-07-01" }
];

export const initialRisks: RiskItem[] = [
  { id: "r1", code: "R-001", title: "Elektrik kesintisi", asset: "Sunucular", probability: 3, impact: 5, owner: "Bilgi İşlem", action: "UPS kapasite ve akü testlerinin takibi" },
  { id: "r2", code: "R-004", title: "Klima arızası", asset: "Sistem Odası", probability: 3, impact: 5, owner: "İdari İşler", action: "Periyodik bakım ve sıcaklık alarmı" },
  { id: "r3", code: "R-012", title: "Yetkisiz giriş", asset: "Sistem Odası", probability: 3, impact: 5, owner: "Bilgi İşlem", action: "Giriş yetkilerinin gözden geçirilmesi" },
  { id: "r4", code: "R-031", title: "Depolama alanının dolması", asset: "NAS", probability: 4, impact: 4, owner: "Bilgi İşlem", action: "Kapasite eşiklerinin izlenmesi" },
  { id: "r5", code: "R-043", title: "Kimlik avı saldırısı", asset: "Kullanıcı Hesapları", probability: 4, impact: 4, owner: "Bilgi İşlem", action: "Farkındalık eğitimi ve MFA" }
];

export const initialFindings: FindingItem[] = [
  { id: "f1", source: "Aylık Kontrol", title: "UPS akü kapasite testi planlanmalı", severity: "Orta", owner: "Bilgi İşlem", targetDate: "2026-08-15", status: "open" }
];
