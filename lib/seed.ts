import type {
  AlertItem,
  ControlHistoryItem,
  ControlItem,
  DocumentItem,
  FindingItem,
  LicenseItem,
  MaintenanceItem,
  RiskItem,
  SoftwareItem,
  UserItem
} from "./types";

const DAY = 86400000;
const TODAY = new Date("2026-07-21T09:00:00+03:00");
const iso = (date: Date) => date.toISOString().slice(0, 10);

export const systemUsers: UserItem[] = [
  { id: "u-necat", name: "Necat Rüzgar", role: "Sistem Sorumlusu", active: true },
  { id: "u-gokhan", name: "Gökhan Ergül", role: "Sistem Sorumlusu", active: true }
];

export const initialControls: ControlItem[] = [
  {
    id: "daily-001",
    title: "Günlük Sistem Odası Kontrolü",
    frequency: "Günlük",
    responsible: "Necat Rüzgar",
    dueDate: iso(TODAY),
    status: "pending",
    checks: [
      { id: "c1", label: "Sistem odası kapısı kilitli" },
      { id: "c2", label: "Ortam sıcaklığı ve nemi uygun aralıkta" },
      { id: "c3", label: "UPS üzerinde alarm bulunmuyor" },
      { id: "c4", label: "Sunucular, NAS ve ağ cihazları çalışıyor" },
      { id: "c5", label: "Yedekleme işlemi başarıyla tamamlanmış" },
      { id: "c6", label: "Klima normal çalışıyor" },
      { id: "c7", label: "Su sızıntısı, duman veya yetkisiz giriş belirtisi yok" }
    ]
  },
  {
    id: "weekly-001",
    title: "Haftalık BT Kontrolü",
    frequency: "Haftalık",
    responsible: "Gökhan Ergül",
    dueDate: "2026-07-24",
    status: "pending",
    checks: [
      { id: "w1", label: "Yedekleme günlükleri gözden geçirildi" },
      { id: "w2", label: "Disk kullanım oranları kontrol edildi" },
      { id: "w3", label: "Güvenlik güncellemeleri kontrol edildi" },
      { id: "w4", label: "Firewall ve switch kayıtları incelendi" }
    ]
  },
  {
    id: "monthly-001",
    title: "Aylık Sistem ve Altyapı Kontrolü",
    frequency: "Aylık",
    responsible: "Necat Rüzgar",
    dueDate: "2026-07-31",
    status: "pending",
    checks: [
      { id: "m1", label: "Kullanıcı yetkileri gözden geçirildi" },
      { id: "m2", label: "UPS, klima ve kamera kontrolleri tamamlandı" },
      { id: "m3", label: "Lisans ve bakım takvimi kontrol edildi" },
      { id: "m4", label: "Kapasite ve performans değerlendirmesi yapıldı" }
    ]
  }
];

function generateHistoricalControls(): ControlHistoryItem[] {
  const records: ControlHistoryItem[] = [];
  const start = new Date("2025-07-21T09:00:00+03:00");
  const end = new Date("2026-07-20T09:00:00+03:00");
  let dailyIndex = 0;
  let weeklyIndex = 0;
  let monthlyIndex = 0;

  for (let cursor = new Date(start); cursor <= end; cursor = new Date(cursor.getTime() + DAY)) {
    const day = cursor.getDay();
    if (day !== 0 && day !== 6) {
      const responsible = dailyIndex % 2 === 0 ? "Necat Rüzgar" : "Gökhan Ergül";
      const anomaly = dailyIndex % 73 === 0;
      records.push({
        id: `hist-d-${iso(cursor)}`,
        controlType: "Günlük",
        title: "Günlük Sistem Odası Kontrolü",
        performedAt: iso(cursor),
        responsible,
        result: anomaly ? "Kısmen Uygun" : "Uygun",
        verification: "Taslak Ön Kayıt",
        note: anomaly ? "Kontrol kaydı kurum sorumlusu tarafından doğrulanmalıdır; örnek not: geçici sıcaklık dalgalanması." : "Geçmiş dönem aktarımı; kurum kayıtlarıyla doğrulanmalıdır."
      });
      dailyIndex += 1;
    }

    if (day === 5) {
      records.push({
        id: `hist-w-${iso(cursor)}`,
        controlType: "Haftalık",
        title: "Haftalık BT Kontrolü",
        performedAt: iso(cursor),
        responsible: weeklyIndex % 2 === 0 ? "Gökhan Ergül" : "Necat Rüzgar",
        result: weeklyIndex % 17 === 0 ? "Kısmen Uygun" : "Uygun",
        verification: "Taslak Ön Kayıt",
        note: "Haftalık geçmiş dönem aktarımı; log, bakım veya görev kayıtlarıyla teyit edilmelidir."
      });
      weeklyIndex += 1;
    }

    const tomorrow = new Date(cursor.getTime() + DAY);
    if (cursor.getMonth() !== tomorrow.getMonth()) {
      records.push({
        id: `hist-m-${iso(cursor)}`,
        controlType: "Aylık",
        title: "Aylık Sistem ve Altyapı Kontrolü",
        performedAt: iso(cursor),
        responsible: monthlyIndex % 2 === 0 ? "Necat Rüzgar" : "Gökhan Ergül",
        result: "Uygun",
        verification: "Taslak Ön Kayıt",
        note: "Aylık geçmiş dönem aktarımı; kurumca doğrulanmayı beklemektedir."
      });
      monthlyIndex += 1;
    }
  }

  ["2025-09-30", "2026-03-31"].forEach((date, index) => records.push({
    id: `hist-h-${date}`,
    controlType: "Altı Aylık",
    title: "Yedekten Geri Dönüş ve UPS Kapasite Testi",
    performedAt: date,
    responsible: index === 0 ? "Necat Rüzgar" : "Gökhan Ergül",
    result: "Uygun",
    verification: "Taslak Ön Kayıt",
    note: "Test sonucu ve varsa servis formu eklenerek doğrulanmalıdır."
  }));

  records.push({
    id: "hist-y-2025-12-31",
    controlType: "Yıllık",
    title: "Yıllık BT Risk ve Süreklilik Gözden Geçirmesi",
    performedAt: "2025-12-31",
    responsible: "Necat Rüzgar",
    result: "Kısmen Uygun",
    verification: "Taslak Ön Kayıt",
    note: "Yıllık değerlendirme tutanağı ve yönetim onayıyla doğrulanmalıdır."
  });

  return records.sort((a, b) => b.performedAt.localeCompare(a.performedAt));
}

export const historicalControls = generateHistoricalControls();

export const initialDocuments: DocumentItem[] = [
  { id: "d1", code: "BT-001", title: "Bilgi Teknolojileri Politikası", revision: "00", status: "Yürürlükte", owner: "Necat Rüzgar", reviewDate: "2027-07-01" },
  { id: "d2", code: "BT-002", title: "Sistem Odası Yönetim Talimatı", revision: "00", status: "Yürürlükte", owner: "Gökhan Ergül", reviewDate: "2027-07-01" },
  { id: "d3", code: "BT-003", title: "Sistem Odası Risk Analizi", revision: "00", status: "Yürürlükte", owner: "Necat Rüzgar", reviewDate: "2027-01-15" },
  { id: "d4", code: "BT-004", title: "Risk Değerlendirme Metodolojisi", revision: "00", status: "Yürürlükte", owner: "Necat Rüzgar", reviewDate: "2027-01-15" },
  { id: "d5", code: "BT-005", title: "Günlük Sistem Odası Kontrol Formu", revision: "00", status: "Yürürlükte", owner: "Gökhan Ergül", reviewDate: "2027-07-01" }
];

export const initialRisks: RiskItem[] = [
  { id: "r1", code: "R-001", title: "Elektrik kesintisi", asset: "Sunucular", probability: 3, impact: 5, owner: "Necat Rüzgar", action: "UPS kapasite ve akü testlerinin takibi" },
  { id: "r2", code: "R-004", title: "Klima arızası", asset: "Sistem Odası", probability: 3, impact: 5, owner: "Gökhan Ergül", action: "Periyodik bakım ve sıcaklık alarmı" },
  { id: "r3", code: "R-012", title: "Yetkisiz giriş", asset: "Sistem Odası", probability: 3, impact: 5, owner: "Necat Rüzgar", action: "Giriş yetkilerinin gözden geçirilmesi" },
  { id: "r4", code: "R-031", title: "Depolama alanının dolması", asset: "NAS", probability: 4, impact: 4, owner: "Gökhan Ergül", action: "Kapasite eşiklerinin izlenmesi" },
  { id: "r5", code: "R-043", title: "Kimlik avı saldırısı", asset: "Kullanıcı Hesapları", probability: 4, impact: 4, owner: "Necat Rüzgar", action: "Farkındalık eğitimi ve MFA" }
];

export const initialFindings: FindingItem[] = [
  { id: "f1", source: "Aylık Kontrol", title: "UPS akü kapasite testi planlanmalı", severity: "Orta", owner: "Gökhan Ergül", targetDate: "2026-08-15", status: "open" }
];

export const initialLicenses: LicenseItem[] = [
  { id: "l1", product: "Trend Micro [XSP] Worry-Free Services", category: "Uç Nokta Güvenliği", supplier: "Yetkili Çözüm Ortağı", responsible: "Necat Rüzgar", expiryDate: "Tarih girilmeli", warningDays: 60, renewalPeriod: "Yıllık", status: "Tarih Bekleniyor", note: "Lisans bitiş tarihi, kullanıcı/cihaz adedi ve yenileme belgesi eklenmeli." },
  { id: "l2", product: "Veeam VDP Essentials VUL", category: "Yedekleme ve Kurtarma", supplier: "Yetkili Çözüm Ortağı", responsible: "Gökhan Ergül", expiryDate: "Tarih girilmeli", warningDays: 60, renewalPeriod: "Yıllık", status: "Tarih Bekleniyor", note: "Lisans bitiş tarihi, son başarılı yedek ve son geri dönüş testi kaydedilmeli." },
  { id: "l3", product: "Komspot İnternet Erişim Noktası", category: "İnternet Erişim ve Kayıt", supplier: "Hizmet Sağlayıcı", responsible: "Gökhan Ergül", expiryDate: "Tarih girilmeli", warningDays: 45, renewalPeriod: "Sözleşmeye Göre", status: "Tarih Bekleniyor", note: "Sözleşme/abonelik bitiş tarihi ve destek bilgileri eklenmeli." },
  { id: "l4", product: "KLOG 5651 - Server Time Stamping Solution Type 2", category: "5651 Loglama ve Zaman Damgası", supplier: "Yetkili Çözüm Ortağı", responsible: "Necat Rüzgar", expiryDate: "Tarih girilmeli", warningDays: 60, renewalPeriod: "Yıllık", status: "Tarih Bekleniyor", note: "Lisans, zaman damgası kontörü/servis süresi ve log saklama durumu takip edilmeli." },
  { id: "l5", product: "Sophos XG 135 Xstream Protection", category: "Güvenlik Duvarı ve UTM", supplier: "Yetkili Sophos Çözüm Ortağı", responsible: "Necat Rüzgar", expiryDate: "Tarih girilmeli", warningDays: 90, renewalPeriod: "Yıllık", status: "Tarih Bekleniyor", note: "Xstream Protection bitiş tarihi, firmware ve güvenlik servisleri durumu eklenmeli." }
];

export const initialSoftware: SoftwareItem[] = [
  { id: "sw1", product: "Trend Micro [XSP] Worry-Free Services", purpose: "İstemci ve sunucu uç nokta koruması", platform: "Bulut yönetim konsolu", responsible: "Necat Rüzgar", operationalCheck: "Ajan durumu, güncelleme, tehdit ve son tarama", evidence: "Konsol ekran görüntüsü / aylık durum raporu", status: "Aktif" },
  { id: "sw2", product: "Veeam VDP Essentials VUL", purpose: "Yedekleme, kurtarma ve geri dönüş doğrulaması", platform: "Yedekleme sunucusu", responsible: "Gökhan Ergül", operationalCheck: "Son iş sonucu, başarısız görev, kapasite ve restore testi", evidence: "Job logu / restore test tutanağı", status: "Aktif" },
  { id: "sw3", product: "Komspot İnternet Erişim Noktası", purpose: "İnternet erişim yönetimi ve kullanıcı oturum kayıtları", platform: "Ağ erişim hizmeti", responsible: "Gökhan Ergül", operationalCheck: "Erişim, oturum kaydı, kesinti ve destek durumu", evidence: "Hizmet ekranı / kesinti kaydı", status: "Aktif" },
  { id: "sw4", product: "KLOG 5651 - Server Time Stamping Solution Type 2", purpose: "5651 kapsamındaki logların zaman damgalanması ve bütünlüğü", platform: "Sunucu uygulaması", responsible: "Necat Rüzgar", operationalCheck: "Zaman damgası, log üretimi, disk kapasitesi ve servis durumu", evidence: "Zaman damgası raporu / servis logu", status: "Aktif" },
  { id: "sw5", product: "Sophos XG 135 Xstream Protection", purpose: "Güvenlik duvarı, IPS, web koruma ve VPN", platform: "Sophos XG 135", responsible: "Necat Rüzgar", operationalCheck: "Lisans servisleri, firmware, IPS, VPN ve olay kayıtları", evidence: "Firewall durum raporu / konfigürasyon yedeği", status: "Aktif" }
];

export const initialMaintenances: MaintenanceItem[] = [
  { id: "m1", assetCode: "UPS-001", assetName: "Kesintisiz Güç Kaynağı", maintenanceType: "Akü kapasite ve genel bakım", responsible: "Gökhan Ergül", lastMaintenanceDate: "2025-08-15", nextMaintenanceDate: "2026-08-15", status: "Yaklaşıyor", supplier: "Yetkili Teknik Servis" },
  { id: "m2", assetCode: "CLM-001", assetName: "Sistem Odası Kliması", maintenanceType: "Filtre, gaz ve çalışma kontrolü", responsible: "Necat Rüzgar", lastMaintenanceDate: "2026-01-20", nextMaintenanceDate: "2026-07-20", status: "Gecikmiş", supplier: "Klima Teknik Servisi" },
  { id: "m3", assetCode: "FW-001", assetName: "Güvenlik Duvarı", maintenanceType: "Yazılım, kural ve konfigürasyon kontrolü", responsible: "Necat Rüzgar", lastMaintenanceDate: "2026-04-01", nextMaintenanceDate: "2026-10-01", status: "Planlı", supplier: "Bilgi İşlem / Çözüm Ortağı" },
  { id: "m4", assetCode: "SRV-001", assetName: "Ana Sunucu", maintenanceType: "Donanım sağlık ve kapasite kontrolü", responsible: "Gökhan Ergül", lastMaintenanceDate: "2026-02-10", nextMaintenanceDate: "2026-08-10", status: "Yaklaşıyor", supplier: "Bilgi İşlem" },
  { id: "m5", assetCode: "YNG-001", assetName: "Yangın Söndürme Cihazı", maintenanceType: "Periyodik dolum ve uygunluk kontrolü", responsible: "Necat Rüzgar", lastMaintenanceDate: "2025-09-05", nextMaintenanceDate: "2026-09-05", status: "Planlı", supplier: "Yetkili Yangın Servisi" }
];

export const initialAlerts: AlertItem[] = [
  { id: "a1", level: "Kritik", category: "Bakım", title: "Sistem odası klima bakımı gecikti", detail: "Planlanan bakım tarihi 20 Temmuz 2026 idi.", dueDate: "2026-07-20", owner: "Necat Rüzgar" },
  { id: "a2", level: "Uyarı", category: "Lisans", title: "Beş kritik yazılımın lisans tarihi girilmedi", detail: "Trend Micro, Veeam, Komspot, KLOG 5651 ve Sophos için bitiş/yenileme tarihleri doğrulanmalıdır.", owner: "Necat Rüzgar / Gökhan Ergül" },
  { id: "a3", level: "Dikkat", category: "Bakım", title: "Ana sunucu periyodik kontrolü yaklaşıyor", detail: "Bakım tarihi 10 Ağustos 2026.", dueDate: "2026-08-10", owner: "Gökhan Ergül" },
  { id: "a4", level: "Uyarı", category: "Uygunsuzluk", title: "UPS akü kapasite testi açık durumda", detail: "Faaliyet hedef tarihi 15 Ağustos 2026.", dueDate: "2026-08-15", owner: "Gökhan Ergül" },
  { id: "a5", level: "Bilgi", category: "Kontrol", title: "Geçmiş dönem kayıtları doğrulama bekliyor", detail: `${historicalControls.length} ön kayıt kurum sorumlularınca incelenmelidir.`, owner: "Necat Rüzgar / Gökhan Ergül" }
];
