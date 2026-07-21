export type ControlStatus = "pending" | "completed" | "overdue";
export type FindingStatus = "open" | "in_progress" | "closed";

export interface ControlItem {
  id: string;
  title: string;
  frequency: "Günlük" | "Haftalık" | "Aylık" | "Yıllık";
  responsible: string;
  dueDate: string;
  status: ControlStatus;
  checks: { id: string; label: string; result?: "Uygun" | "Uygun Değil" | "Uygulanamaz" }[];
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
