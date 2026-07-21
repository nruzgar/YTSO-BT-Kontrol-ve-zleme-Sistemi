# Vercel Yayın Rehberi

## 1. Dosyaları GitHub deposuna gönderme

PowerShell içinde proje klasörüne geçin:

```powershell
cd C:\YOL\YTSO-BT-Kontrol-ve-zleme-Sistemi

git init
git branch -M main
git remote add origin https://github.com/nruzgar/YTSO-BT-Kontrol-ve-zleme-Sistemi.git
git add .
git commit -m "V0.1 BT kontrol ve izleme sistemi"
git push -u origin main
```

Depoda daha önce bir uzak bağlantı tanımlandıysa `git remote add origin` yerine aşağıdaki komutu kullanın:

```powershell
git remote set-url origin https://github.com/nruzgar/YTSO-BT-Kontrol-ve-zleme-Sistemi.git
```

## 2. Vercel bağlantısı

- Vercel hesabına giriş yapın.
- **Add New > Project** seçeneğine girin.
- GitHub listesinden ilgili depoyu seçin.
- Build ayarlarını değiştirmeyin.
- **Deploy** düğmesine basın.

## 3. İlk kontrol

Yayın tamamlandıktan sonra aşağıdaki ekranları kontrol edin:

- Genel Görünüm
- Kontroller
- Dokümanlar
- Riskler
- Uygunsuzluklar
- Envanter
- Denetim Görünümü

## 4. V0.1 veri sınırı

Bu sürümde kontrol ve uygunsuzluk verileri tarayıcının yerel hafızasında tutulur. Tarayıcı verileri temizlenirse kayıtlar silinir. Kurumsal ortak kullanım için V0.2 veritabanı geçişi yapılmalıdır.
