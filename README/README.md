# E-Tedarik Platformu 🚀

E-Tedarik, şirketlerin manuel yürütülen satın alma süreçlerini dijitalleştiren, veri odaklı ve şeffaf bir B2B teklif toplama platformudur. Glassmorphism tasarım diliyle geliştirilmiş modern arayüzü sayesinde kullanıcı deneyimini (UI/UX) en üst düzeye çıkarmayı hedefler.

## 🌟 Projenin Amacı ve Özellikleri

Bu proje, şirketlerin alım kalemlerini sisteme girmesini ve tedarikçilerden gelen teklifleri tek bir panel üzerinden dinamik olarak yönetmesini sağlar.

- **Modern Landing Page:** Glassmorphism tarzı kullanılarak tasarlanmış, sisteme giriş ve kayıt akışlarına yönlendiren etkili ve responsive (mobil uyumlu) anasayfa.
- **Güvenli Kimlik Doğrulama:** E-posta ve şifre formatı validasyonlarına sahip, PDO ve Prepared Statements (SQL Injection koruması) kullanılarak geliştirilmiş PHP tabanlı Giriş (Login) ve Kayıt (Sign Up) sistemi.
- **Dinamik Teklif Paneli:**
  - Ana panelden yeni ürün talepleri oluşturabilme.
  - Gelen teklifleri modern kart/tablo tasarımlarıyla görüntüleme.
  - Teklifleri "Kabul Et" veya "Reddet" butonlarıyla dinamik olarak yönetme (DOM manipülasyonu ile anlık sayfa güncellemeleri).
- **Responsive Tasarım:** Tüm cihazlarda (mobil, tablet, masaüstü) kusursuz çalışan esnek CSS (Flexbox/Media Queries) yapısı.

## 🛠️ Kullanılan Teknolojiler

**Frontend:**
- HTML5 & CSS3 (Glassmorphism & Custom UI)
- Vanilla JavaScript (ES6+, Fetch API, DOM Manipülasyonu, LocalStorage)

**Backend & Veritabanı:**
- PHP (Native, PDO)
- MySQL (İlişkisel Veritabanı Yönetimi)

## ⚙️ Kurulum ve Çalıştırma (Lokal Ortam - XAMPP)

Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Projeyi Klonlayın veya İndirin:**
   Proje dosyalarını `.zip` olarak indirin ve klasöre çıkartın.
2. **XAMPP Dizinine Taşıyın:**
   Klasörü `C:\xampp\htdocs\` (veya Mac/Linux için uygun kök dizin) dizininin içine kopyalayın.
3. **Veritabanını İçe Aktarın:**
   - XAMPP kontrol panelinden Apache ve MySQL servislerini başlatın.
   - Tarayıcıda `http://localhost/phpmyadmin` adresine gidin.
   - `e_tedarik_db` adında yeni bir veritabanı oluşturun (Karşılaştırma: `utf8_general_ci`).
   - Proje klasöründe bulunan `e_tedarik_db.sql` dosyasını bu veritabanına **İçe Aktar (Import)** sekmesinden yükleyin.
4. **Veritabanı Bağlantısını Kontrol Edin:**
   `php/login.php` ve `php/sign.php` dosyalarındaki PDO bağlantı satırının yerel ayarlarınıza (`localhost`, `root`, şifresiz) uygun olduğundan emin olun.
5. **Projeyi Başlatın:**
   Tarayıcınızda `http://localhost/proje_klasor_adi/` adresine giderek projeyi görüntüleyebilirsiniz.

## 🌐 Canlı Önizleme

Proje şu anda canlı sunucuda test edilebilir durumdadır.
**Demo Linki:** [http://95.130.171.20/~st23360859061](http://95.130.171.20/~st23360859061)

> *Not: Canlı test ortamında sunucu taraflı önbelleklemeler nedeniyle güncellemeleri görmek için Gizli Sekme kullanılması tavsiye edilir.*

## 🧑‍💻 Geliştirici

**Alperen**
*Bursa Teknik Üniversitesi - Bilgisayar Mühendisliği*
- UI/UX Dizaynı ve Full-Stack Geliştirme

