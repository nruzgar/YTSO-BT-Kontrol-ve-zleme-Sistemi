# YTSO BT Kontrol, İzleme ve Erken Uyarı Sistemi

## V0.2 — Early Warning Core

Yalova Ticaret ve Sanayi Odası bilgi teknolojileri kontrollerini, risklerini, dokümanlarını, lisanslarını, bakımlarını ve uygunsuzluklarını tek merkezden izlemek için hazırlanmış Vercel uyumlu Next.js uygulamasıdır.

### Aktif sistem sorumluları

- Necat Rüzgar
- Gökhan Ergül

### V0.2 kapsamı

- Yönetim paneli
- Erken Uyarı Merkezi
- Günlük, haftalık ve aylık çevrim içi kontroller
- Son 12 aylık günlük, haftalık, aylık, altı aylık ve yıllık ön kayıt arşivi
- Lisans bitiş ve yenileme takibi
- Son bakım ve sonraki bakım tarihi takibi
- Risk ve uygunsuzluk görünümü
- Doküman merkezi
- Denetim görünümü

## Önemli veri notu

Geçmiş dönem kontrol kayıtları hızlı başlangıç amacıyla **Taslak Ön Kayıt** durumunda üretilmiştir. Bu kayıtlar gerçek yapılmış faaliyet kanıtı sayılmaz. Denetimde kullanılmadan önce kurum logları, servis formları, görev kayıtları veya Necat Rüzgar / Gökhan Ergül teyidi ile doğrulanmalıdır.

## Kurulum

```powershell
npm install
npm run dev
```

Üretim kontrolü:

```powershell
npm run build
```

## GitHub güncelleme

```powershell
git add .
git commit -m "V0.2 early warning, license and maintenance tracking"
git push origin main
```

Vercel, GitHub push sonrasında otomatik olarak yeni sürümü yayınlar.

## Sonraki sürüm

V0.3 kapsamında PostgreSQL veritabanı, gerçek giriş/rol yönetimi, kayıt doğrulama akışı, dosya kanıtları ve e-posta bildirimleri planlanmıştır.


## V0.3 - Kritik Yazılım, Lisans ve Yenileme Takibi

Gerçek YTSO yazılım envanteri eklendi: Trend Micro Worry-Free Services, Veeam VDP Essentials VUL, Komspot, KLOG 5651 ve Sophos XG 135 Xstream Protection. Lisans tarihleri kullanıcı tarafından doğrulanana kadar `Tarih Bekleniyor` durumundadır; sistemde sahte tarih üretilmez.

## V0.4 - Doküman Erişimi ve Yönetim KPI Paneli

- Dokümanlar görüntülenebilir ve Markdown olarak indirilebilir.
- Her doküman için ayrı detay sayfası oluşturuldu.
- Dashboard'a Denetim Hazırlık Skoru eklendi.
- Kontrol, doküman, risk, bakım, lisans ve kanıt doğrulama KPI'ları eklendi.

## V0.5 - Editable Operations

- Doküman revizyonu, sorumlu, onaylayan ve gözden geçirme tarihi düzenlenebilir.
- Lisans bitiş/yenileme tarihi, uyarı eşiği, tedarikçi ve sorumlu düzenlenebilir.
- Bakım son/sonraki tarihleri, durum, tedarikçi ve sorumlu düzenlenebilir.
- Kullanıcı ve rol yönetimi eklendi.
- Aktif kullanıcı üst menüden değiştirilebilir.
- Denetçi rolü salt görüntüleme yetkisine sahiptir.
- Veriler V0.5'te tarayıcı localStorage alanında saklanır. Gerçek çok kullanıcılı kullanım için PostgreSQL ve kimlik doğrulama V0.6 kapsamındadır.
