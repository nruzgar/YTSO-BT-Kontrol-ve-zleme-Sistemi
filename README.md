# YTSO BT Kontrol ve İzleme Sistemi

Yalova Ticaret ve Sanayi Odasının bilgi teknolojileri kontrollerini, risklerini, dokümanlarını, envanterini ve uygunsuzluk kayıtlarını tek noktadan izlemek amacıyla hazırlanan web uygulamasıdır.

## V0.1 kapsamı

- Genel yönetim ekranı
- Günlük ve haftalık kontrol listeleri
- Kontrol sonucundan otomatik uygunsuzluk oluşturma
- Doküman listesi
- Risk listesi ve risk puanları
- Uygunsuzluk kapatma işlemi
- BT envanteri
- Denetim özeti
- Tarayıcı tabanlı yerel veri saklama
- Vercel uyumlu Next.js yapı

## Kurulum

```bash
npm install
npm run dev
```

Ardından `http://localhost:3000` adresini açın.

## Vercel yayını

1. Bu klasörü GitHub deposuna gönderin.
2. Vercel hesabında **Add New Project** seçeneğini açın.
3. GitHub deposunu seçin.
4. Framework ayarı otomatik olarak Next.js seçilir.
5. **Deploy** düğmesine basın.

V0.1 sürümü harici veritabanı gerektirmez. Kayıtlar kullanıcının tarayıcısında saklanır. Bu nedenle aynı veriler farklı cihazlar arasında paylaşılmaz.

## V0.2 planı

- PostgreSQL veritabanı
- Kullanıcı girişi ve rol bazlı yetkilendirme
- Kurumsal dokümanların içerik ve revizyon yönetimi
- Kontrol kanıtı ve dosya yükleme
- Periyodik görev üretimi
- E-posta bildirimleri
- Denetçi için salt okunur kullanıcı hesabı
- PDF ve Excel raporları

## Güvenlik notu

Gerçek parola, bağlantı bilgisi, IP adresi veya gizli kurum verisi kaynak kod içine yazılmamalıdır. Ortam değişkenleri `.env.local` ve Vercel Project Settings üzerinden yönetilmelidir.
