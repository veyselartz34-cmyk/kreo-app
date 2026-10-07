const fs = require('fs');
const path = require('path');

const replacements = [
  // Checkout
  { from: /Odeme Basarili!/g, to: "Ödeme Başarılı!" },
  { from: /Siparis detaylariniz e-posta adresinize gonderildi./g, to: "Sipariş detaylarınız e-posta adresinize gönderildi." },
  { from: /Dosyayi Indir/g, to: "Dosyayı İndir" },
  { from: /Vitrine Don/g, to: "Vitrine Dön" },
  { from: /Odeme Bilgileri/g, to: "Ödeme Bilgileri" },
  { from: /Guvenli iyzico altyapisi ile odemenizi tamamlayin./g, to: "Güvenli iyzico altyapısı ile ödemenizi tamamlayın." },
  { from: /Iletisim/g, to: "İletişim" },
  { from: /Kart Bilgileri/g, to: "Kart Bilgileri" },
  { from: /Kart Numarasi/g, to: "Kart Numarası" },
  { from: /Kart Uzerindeki Isim/g, to: "Kart Üzerindeki İsim" },
  { from: /Ode/g, to: "Öde" },
  { from: /Guvenli Odeme/g, to: "Güvenli Ödeme" },
  { from: /Siparis Ozeti/g, to: "Sipariş Özeti" },
  { from: /Ara Toplam/g, to: "Ara Toplam" },
  { from: /Odenecek Tutar/g, to: "Ödenecek Tutar" },
  { from: /iyzico Korumali Alisveris/g, to: "iyzico Korumalı Alışveriş" },
  { from: /Odemeniz iyzico guvencesiyle gerceklesmektedir./g, to: "Ödemeniz iyzico güvencesiyle gerçekleşmektedir." },
  { from: /Geri Don/g, to: "Geri Dön" },

  // Register / Login
  { from: /Hesap Olustur/g, to: "Hesap Oluştur" },
  { from: /ucretsiz vitrinini ac ve kazanmaya basla./g, to: "ücretsiz vitrinini aç ve kazanmaya başla." },
  { from: /Lutfen tum alanlari doldurun./g, to: "Lütfen tüm alanları doldurun." },
  { from: /Kayit basarili! Lutfen e-postanizi kontrol edin./g, to: "Kayıt başarılı! Lütfen e-postanızı kontrol edin." },
  { from: /Kayit olunurken bir sorun olustu./g, to: "Kayıt olunurken bir sorun oluştu." },
  { from: /Kullanici Adi/g, to: "Kullanıcı Adı" },
  { from: /Sifre/g, to: "Şifre" },
  { from: /Kayit Yapiliyor.../g, to: "Kayıt Yapılıyor..." },
  { from: /Kreo'ya Katil/g, to: "Kreo'ya Katıl" },
  { from: /Zaten hesabin var mi\?/g, to: "Zaten hesabın var mı?" },
  { from: /Giris Yap/g, to: "Giriş Yap" },
  { from: /Ana Sayfaya Don/g, to: "Ana Sayfaya Dön" },
  { from: /donusturmenin en zarif yolu. Dijital urunler, danismanlik seanslari ve ucretli toplulugun icin ihtiyacin olan tek platform./g, to: "dönüştürmenin en zarif yolu. Dijital ürünler, danışmanlık seansları ve ücretli topluluğun için ihtiyacın olan tek platform." },
  { from: /Turkiye'nin Secimi/g, to: "Türkiye'nin Seçimi" },
  { from: /Binlerce ureticiye katil/g, to: "Binlerce üreticiye katıl" },
  
  // Dashboard / Products New
  { from: /Yeni Urun Ekle/g, to: "Yeni Ürün Ekle" },
  { from: /Satmaya baslamak icin urununuzu olusturun./g, to: "Satmaya başlamak için ürününüzü oluşturun." },
  { from: /Urun Adi/g, to: "Ürün Adı" },
  { from: /Orn: 1 Aylik Figma Egitimi/g, to: "Örn: 1 Aylık Figma Eğitimi" },
  { from: /Aciklama/g, to: "Açıklama" },
  { from: /Urununuzun neler icerdigini detaylica anlatin.../g, to: "Ürününüzün neler içerdiğini detaylıca anlatın..." },
  { from: /Kapak Fotografi Yukle/g, to: "Kapak Fotoğrafı Yükle" },
  { from: /Degistir/g, to: "Değiştir" },
  { from: /Musterinin satin aldiktan sonra indirecegi/g, to: "Müşterinin satın aldıktan sonra indireceği" },
  { from: /dosyasini urunu kaydettikten sonraki ekranda yukleyeceksiniz./g, to: "dosyasını ürünü kaydettikten sonraki ekranda yükleyeceksiniz." },
  { from: /Canli Onizleme/g, to: "Canlı Önizleme" },
  { from: /Kapak Gorseli/g, to: "Kapak Görseli" },
  { from: /Dijital Urun/g, to: "Dijital Ürün" },
  { from: /Birebir Gorusme/g, to: "Birebir Görüşme" },
  { from: /Ornek Urun Basligi/g, to: "Örnek Ürün Başlığı" },
  { from: /Urun aciklamasi burada gorunecek. Musterileriniz bu ozeti okuyarak karar verecek./g, to: "Ürün açıklaması burada görünecek. Müşterileriniz bu özeti okuyarak karar verecek." },
  { from: /Urun Olusturuldu!/g, to: "Ürün Oluşturuldu!" },
  { from: /Olusturuluyor.../g, to: "Oluşturuluyor..." },
  { from: /Urunu Yayinla/g, to: "Ürünü Yayınla" },
  { from: /Yayinla'ya bastiktan sonra urun vitrininizde gorunmeye baslar./g, to: "Yayınla'ya bastıktan sonra ürün vitrininizde görünmeye başlar." },
  
  // StorefrontClient
  { from: /Kapak Fotografi/g, to: "Kapak Fotoğrafı" },
  { from: /Buraya henuz bir biyografi eklenmedi./g, to: "Buraya henüz bir biyografi eklenmedi." },
  { from: /En Populer Hizmet/g, to: "En Popüler Hizmet" },
  { from: /Birebir gorusme ayarlayarak dogrudan iletisime gecin./g, to: "Birebir görüşme ayarlayarak doğrudan iletişime geçin." },
  { from: /Dijital Urunler & Icerikler/g, to: "Dijital Ürünler & İçerikler" },
  { from: /Henuz Icerik Yok/g, to: "Henüz İçerik Yok" },
  { from: /Satici henuz bir urun veya hizmet yayinlamadi. Lutfen daha sonra tekrar kontrol edin./g, to: "Satıcı henüz bir ürün veya hizmet yayınlamadı. Lütfen daha sonra tekrar kontrol edin." }
];

const filesToProcess = [
  'src/app/checkout/[id]/CheckoutClient.tsx',
  'src/app/register/page.tsx',
  'src/app/login/page.tsx',
  'src/app/dashboard/products/new/page.tsx',
  'src/app/[username]/StorefrontClient.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/dashboard/layout.tsx',
  'src/app/dashboard/products/page.tsx'
];

filesToProcess.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    replacements.forEach(rep => {
      content = content.replace(rep.from, rep.to);
    });
    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
});
