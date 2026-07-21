import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { initialDocuments } from "@/lib/seed";

const documentBodies: Record<string, string[]> = {
  d1: ["YTSO, bilgi teknolojileri varlıklarının güvenliğini, erişilebilirliğini ve sürekliliğini kurumsal sorumluluk olarak kabul eder.", "Yetkilendirme, yedekleme, güncelleme, lisans, bakım ve olay kayıtları izlenebilir şekilde yönetilir.", "Bilgi teknolojileri süreçleri Necat Rüzgar ve Gökhan Ergül tarafından takip edilir; kritik durumlar yönetime raporlanır."],
  d2: ["Sistem odasına erişim yalnızca yetkili personelle sınırlandırılır.", "Sıcaklık, nem, UPS, klima, sunucu, ağ cihazları ve fiziksel güvenlik kontrolleri belirlenen periyotlarda gerçekleştirilir.", "Uygunsuzluklar kayıt altına alınır, sorumlu atanır ve hedef tarihe göre takip edilir."],
  d3: ["Elektrik kesintisi, klima arızası, yetkisiz giriş, kapasite yetersizliği, zararlı yazılım ve yedekleme başarısızlığı temel risk alanlarıdır.", "Her risk olasılık ve etki değerleriyle puanlanır; mevcut kontroller ve iyileştirme faaliyetleri tanımlanır.", "Kritik riskler erken uyarı merkezinde öncelikli olarak gösterilir."],
  d4: ["Risk puanı, olasılık ve etki değerlerinin çarpımıyla hesaplanır.", "1-5 düşük, 6-10 orta, 11-15 yüksek, 16-25 kritik risk olarak değerlendirilir.", "Riskler yılda en az bir kez ve önemli değişikliklerden sonra yeniden gözden geçirilir."],
  d5: ["Sistem odası kapısı, sıcaklık ve nem, UPS alarmı, sunucu ve ağ cihazları, yedekleme, klima ve fiziksel güvenlik günlük olarak kontrol edilir.", "Her madde Uygun, Uygun Değil veya Uygulanamaz olarak işaretlenir.", "Uygun olmayan sonuçlar otomatik olarak uygunsuzluk veya erken uyarı kaydına dönüştürülür."]
};

export function generateStaticParams() { return initialDocuments.map((doc) => ({ id: doc.id })); }

export default async function DocumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = initialDocuments.find((item) => item.id === id);
  if (!doc) notFound();
  const paragraphs = documentBodies[id] ?? [];
  return <>
    <div className="page-heading"><div><span className="eyebrow">{doc.code} · Revizyon {doc.revision}</span><h2>{doc.title}</h2></div><Badge tone="success">{doc.status}</Badge></div>
    <section className="panel document-viewer">
      <div className="document-meta"><span><strong>Sorumlu</strong>{doc.owner}</span><span><strong>Gözden geçirme</strong>{doc.reviewDate}</span><span><strong>Durum</strong>{doc.status}</span></div>
      <div className="document-body"><h3>Amaç ve kapsam</h3>{paragraphs.map((p, i) => <p key={i}>{p}</p>)}<h3>Kayıt ve kanıt</h3><p>Bu dokümanın uygulanmasına ilişkin kontrol sonuçları, bakım formları, lisans kayıtları, ekran görüntüleri ve diğer kanıtlar sistemde ilgili modül altında saklanır.</p></div>
      <div className="document-actions"><Link className="secondary-button" href="/dokumanlar">Listeye dön</Link><a className="primary" href={`/documents/${doc.code}.md`} download>Dokümanı indir</a></div>
    </section>
  </>;
}
