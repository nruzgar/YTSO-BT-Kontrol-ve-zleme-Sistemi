export type ControlStatus = "pending" | "completed" | "overdue";
export type FindingStatus = "open" | "in_progress" | "closed";
export type VerificationStatus = "Taslak Ön Kayıt" | "Kurumca Doğrulandı";
export type AlertLevel = "Bilgi" | "Dikkat" | "Uyarı" | "Kritik";

export interface UserItem {
  id: string;
  name: string;
  role: "Sistem Sorumlusu" | "Yönetici" | "Denetçi";
  active: boolean;
}

export interface ControlItem {
  id: string;
  title: string;
  frequency: "Günlük" | "Haftalık" | "Aylık" | "Altı Aylık" | "Yıllık";
  responsible: string;
  dueDate: string;
  status: ControlStatus;
  checks: { id: string; label: string; result?: "Uygun" | "Uygun Değil" | "Uygulanamaz" }[];
}

export interface ControlHistoryItem {
  id: string;
  controlType: "Günlük" | "Haftalık" | "Aylık" | "Altı Aylık" | "Yıllık";
  title: string;
  performedAt: string;
  responsible: string;
  result: "Uygun" | "Kısmen Uygun" | "Uygunsuzluk Var";
  verification: VerificationStatus;
  note: string;
}

export interface RiskItem {
  id: string;
  code: string;
  title: string;
  asset: string;
  probability: number;
  impact: number;
  owner: string;
  action: string;
}

export interface FindingItem {
  id: string;
  source: string;
  title: string;
  severity: "Düşük" | "Orta" | "Yüksek" | "Kritik";
  owner: string;
  targetDate: string;
  status: FindingStatus;
}

export interface DocumentItem {
  id: string;
  code: string;
  title: string;
  revision: string;
  status: "Yürürlükte" | "Taslak";
  owner: string;
  reviewDate: string;
}

export interface LicenseItem {
  id: string;
  product: string;
  category: string;
  supplier: string;
  responsible: string;
  expiryDate: string;
  warningDays: number;
  lastRenewalDate?: string;
  renewalPeriod: string;
  status: "Aktif" | "Yenileme Bekliyor" | "Süresi Doldu" | "Tarih Bekleniyor";
  note: string;
}

export interface SoftwareItem {
  id: string;
  product: string;
  purpose: string;
  platform: string;
  responsible: string;
  operationalCheck: string;
  evidence: string;
  status: "Aktif" | "Kontrol Gerekli";
}

export interface MaintenanceItem {
  id: string;
  assetCode: string;
  assetName: string;
  maintenanceType: string;
  responsible: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  status: "Planlı" | "Yaklaşıyor" | "Gecikmiş";
  supplier: string;
}

export interface AlertItem {
  id: string;
  level: AlertLevel;
  category: "Kontrol" | "Risk" | "Doküman" | "Lisans" | "Bakım" | "Uygunsuzluk";
  title: string;
  detail: string;
  dueDate?: string;
  owner: string;
}
