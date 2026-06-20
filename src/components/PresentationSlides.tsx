import React from "react";

interface PresentationSlidesProps {
  slideIndex: number;
}

export default function PresentationSlides({ slideIndex }: PresentationSlidesProps) {
  switch (slideIndex) {
    case 0: // Slide 1: Giriş Kapak
      return (
        <div className="space-y-6 py-6 px-4 sm:px-8 text-left h-full flex flex-col justify-between select-none">
          <div className="space-y-4">
            {/* Accent colored line */}
            <div className="flex h-1.5 w-32 rounded-full overflow-hidden">
              <div className="bg-[#1C4E3D] w-1/2"></div>
              <div className="bg-[#9C2A22] w-1/2"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#1C4E3D] leading-tight tracking-tight mt-6">
              Dezenformasyona Uğramış <br />
              <span className="text-[#1C4E3D]">Türkçe Kelimeleri Tespit ve</span> <br />
              <span className="border-b-4 border-[#9C2A22] pb-1 inline-block">Düzeltme Sistemi</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-stone-600 font-sans max-w-2xl pt-2 font-medium">
              Yapay zekâ destekli, dilimizin yapısal bütünlüğünü korumaya yönelik yenilikçi bir teknoloji çözümü.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-8 border-t border-stone-200 text-xs text-stone-500 font-sans font-semibold">
            <div className="flex items-center gap-2">
              <span className="text-lg text-[#9C2A22]">👥</span>
              <span>Karamanoğulları Rapor Ekibi</span>
            </div>
            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <span className="text-lg">📅</span>
              <span>20 Haziran 2026</span>
            </div>
          </div>
        </div>
      );

    case 1: // Slide 2: Proje Konusu ve Temel Amacı
      return (
        <div className="space-y-5 text-left py-2 select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3 flex items-center gap-2">
            Proje Konusu ve Temel Amacı
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Card 1 */}
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#1C4E3D] font-bold mb-3">
                  <span className="w-7 h-7 bg-[#1C4E3D]/10 rounded-full flex items-center justify-center text-sm">ℹ️</span>
                  <span className="text-sm font-sans font-bold uppercase tracking-wider">Proje Konusu</span>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm font-sans leading-relaxed">
                  Bu proje; dijitalleşmenin hızlanmasıyla birlikte günlük hayatımıza kontrolsüzce giren yabancı dil unsurlarını ele almaktadır.
                </p>
                <p className="text-stone-650 text-xs sm:text-sm font-sans leading-relaxed mt-3 border-t border-dashed border-stone-200 pt-3">
                  Sistemimiz; yanlış yazılmış, yabancı dil etkisiyle bozulmuş veya anlam kaymasına uğramış Türkçe kelimeleri akıllı algoritmalarla tespit edip doğru alternatifler üretir.
                </p>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#9C2A22] font-bold mb-3">
                  <span className="w-7 h-7 bg-[#9C2A22]/10 rounded-full flex items-center justify-center text-sm">🎯</span>
                  <span className="text-sm font-sans font-bold uppercase tracking-wider">Projenin Temel Amacı</span>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700 font-sans font-medium">
                  <li className="flex items-start gap-2">
                    <span className="text-[#9C2A22] font-bold mt-0.5">✓</span>
                    <span>Yanlış kullanılan kelimeleri anlık olarak saptamak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9C2A22] font-bold mt-0.5">✓</span>
                    <span>Dilsel dezenformasyona karşı doğru karşılıklar önermek.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9C2A22] font-bold mt-0.5">✓</span>
                    <span>Özellikle genç nesillerde dil farkındalığı oluşturmak.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#9C2A22] font-bold mt-0.5">✓</span>
                    <span>Türkçenin zenginliğini ve yapısını korumak.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      );

    case 2: // Slide 3: Problem Tanımı ve İhtiyaç Analizi
      return (
        <div className="space-y-5 text-left py-2 select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Problem Tanımı ve İhtiyaç Analizi
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#9C2A22] font-bold flex items-center gap-1.5">
                  <span>⚠️</span> Mevcut Tehdit Nedir?
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans font-semibold">
                  Hızlı dijital iletişim araçları, sosyal medyanın kontrolsüz dili, otomatik makine çevirileri ve yabancı dillerin (özellikle İngilizce) hiyerarşik etkisi nedeniyle dilimiz yapısal bir yozlaşma tehlikesiyle karşı karşıyadır.
                </p>
              </div>
              
              <div className="space-y-3 pt-2">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#1C4E3D] font-bold flex items-center gap-1.5">
                  <span>📊</span> İhtiyaç Analizi & Hedef Kitle
                </h3>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5 items-start bg-[#FAF8F5] p-3 rounded-xl border border-stone-150 shadow-sm">
                    <span className="text-lg">🎓</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C4E3D]">Eğitim Çağındaki Gençler:</h4>
                      <p className="text-[11px] sm:text-xs text-stone-600 font-sans font-medium">Doğru dil kullanım alışkanlığı kazanması gereken ilkokul ve ortaokul öğrencileri.</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 items-start bg-[#FAF8F5] p-3 rounded-xl border border-stone-150 shadow-sm">
                    <span className="text-lg">👪</span>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#1C4E3D]">Eğitmenler ve Veliler:</h4>
                      <p className="text-[11px] sm:text-xs text-stone-600 font-sans font-medium">Öğrencileri doğru yönlendirmek için güvenilir bir referans kaynağı arayan yetişkinler.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border-2 border-[#D4A373]/30 shadow-inner flex flex-col items-center justify-center relative min-h-[190px] overflow-hidden">
                <div className="w-full flex justify-center gap-2 border-b-4 border-amber-800 pb-1 mt-6">
                  <div className="w-5 h-20 bg-rose-700 rounded-sm transform -rotate-12 transition-all"></div>
                  <div className="w-6 h-22 bg-emerald-700 rounded-sm"></div>
                  <div className="w-4 h-18 bg-amber-600 rounded-sm transform rotate-6 transition-all"></div>
                  <div className="w-5 h-24 bg-indigo-700 rounded-sm"></div>
                  <div className="w-6 h-20 bg-stone-700 rounded-sm"></div>
                </div>
                <div className="w-full flex justify-center gap-3 border-b-2 border-dashed border-stone-200 mt-5 pb-0.5">
                  <span className="text-xl">📚</span>
                  <span className="text-xl">💡</span>
                  <span className="text-xl">🏠</span>
                </div>
                <span className="text-[10px] font-sans font-bold text-[#D4A373] uppercase tracking-widest mt-2 block">
                  Dil Kütüphanesi ve Okuma Alanı
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case 3: // Slide 4: Örnek Hatalar
      return (
        <div className="space-y-4 text-left py-2 select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Sistem Tarafından Tespit Edilen Örnek Hatalar
          </h2>
          
          <div className="overflow-x-auto shadow-sm rounded-xl border border-stone-200 mt-2">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1C4E3D] text-white">
                  <th className="p-2 sm:p-3 font-sans font-bold uppercase tracking-wider">Bozulmuş / Dezenformasyona Uğramış</th>
                  <th className="p-2 sm:p-3 font-sans font-bold uppercase tracking-wider">Doğru ve Saf Türkçe Karşılığı</th>
                  <th className="p-2 sm:p-3 font-sans font-bold uppercase tracking-wider">Yapılan Hatanın Türü / Sınıflandırma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 bg-stone-50/20 font-sans font-semibold text-stone-700">
                <tr className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-2.5 sm:p-3 text-red-600 font-mono font-bold">realizasyon</td>
                  <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">gerçekleştirme</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 text-xs font-semibold">Gereksiz Yabancı Terim Tercihi</td>
                </tr>
                <tr className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-2.5 sm:p-3 text-red-600 font-mono font-bold">chek etmek</td>
                  <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">kontrol etmek</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 text-xs font-semibold">Yarı-Yabancı Karma Yapı Bozulması</td>
                </tr>
                <tr className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-2.5 sm:p-3 text-red-600 font-mono font-bold">aplikasyon</td>
                  <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">uygulama</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 text-xs font-semibold">Batı Kökenli Kelime Dezenformasyonu</td>
                </tr>
                <tr className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-2.5 sm:p-3 text-red-600 font-mono font-bold">download etmek</td>
                  <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">indirmek</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 text-xs font-semibold">Dijital Terimlerin Yozlaştırılması</td>
                </tr>
                <tr className="hover:bg-stone-50/60 transition-colors">
                  <td className="p-2.5 sm:p-3 text-red-600 font-mono font-bold">realize olmak</td>
                  <td className="p-2.5 sm:p-3 text-emerald-700 font-bold">fark etmek</td>
                  <td className="p-2.5 sm:p-3 text-stone-500 text-xs font-semibold">Anlam Kayması ve Yanlış Fiilleştirme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 4: // Slide 5: Yenilikçilik ve Yaratıcılık
      return (
        <div className="space-y-5 text-left py-2 select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Yenilikçilik ve Yaratıcılık
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#1C4E3D]/10 hover:border-[#1C4E3D]/30 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 mb-3 text-lg">
                  🪄
                </div>
                <h4 className="text-sm font-bold text-[#1C4E3D] mb-2">Semantik Derinlik</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium">
                  Klasik yazım denetleyicileri sadece harf imlasına odaklanırken, projemiz kelimenin kullanıldığı cümlenin bağlamsal anlam bozulmalarını analiz eder.
                </p>
              </div>
            </div>
            
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#1C4E3D]/10 hover:border-[#1C4E3D]/30 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 mb-3 text-lg">
                  🌿
                </div>
                <h4 className="text-sm font-bold text-[#1C4E3D] mb-2">Yabancılaşma Analizi</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium">
                  Dilimize melezleşerek giren hibrit kullanımları (örneğin "etmek/olmak" ile birleşen batı kökenli fiiller) özel morfolojik kurallarla saptar.
                </p>
              </div>
            </div>
            
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#1C4E3D]/10 hover:border-[#1C4E3D]/30 transition-all shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 mb-3 text-lg">
                  🔄
                </div>
                <h4 className="text-sm font-bold text-[#1C4E3D] mb-2">Dinamik Güncellenme</h4>
                <p className="text-xs text-stone-600 leading-relaxed font-sans font-medium">
                  Sosyal medyadaki popüler kültür etkisiyle anlık türeyen yeni dezenformasyon eğilimlerini izleyerek yapay zekâ modelini sürekli canlı tutar.
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    case 5: // Slide 6: Sistem Mimarisi Katmanları
      return (
        <div className="space-y-4 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3 mb-1">
            Sistem Mimarisi Katmanları
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-3">
            {[
              { step: "1. Veri Katmanı", desc: "Sözlükler, forumlar, dijital metinler ve sosyal medya girdileriyle zengin bir ham veri havuzu oluşturulur.", color: "border-rose-300 bg-rose-50/20 text-rose-950", icon: "📦" },
              { step: "2. NLP Katmanı", desc: "Doğal Dil İşleme teknikleriyle kelime kökleri, morfolojik ekler ve sentaktik yapılar çözümlenir.", color: "border-amber-300 bg-amber-50/20 text-amber-950", icon: "⚙️" },
              { step: "3. Yapay Zekâ", desc: "Derin öğrenme ve büyük dil modelleri (LLM) kullanılarak anlam kaymaları ve dezenformasyon tespiti yapılır.", color: "border-emerald-300 bg-emerald-50/20 text-emerald-950", icon: "🧠" },
              { step: "4. Düzeltme", desc: "Bulunan hatalı kelimeler için en uygun Türkçe karşılıklar ve cümle içi alternatif öneriler üretilir.", color: "border-blue-300 bg-blue-50/20 text-blue-900", icon: "↩️" },
              { step: "5. Kullanıcı", desc: "Hassas, hızlı ve anlaşılır web/mobil arayüzü sayesinde her yaş grubuna pratik kullanım sunulur.", color: "border-indigo-300 bg-indigo-50/20 text-indigo-900", icon: "💻" }
            ].map((item, index) => (
              <div key={index} className={`p-3 rounded-xl border flex flex-col justify-between ${item.color} shadow-sm transition-all hover:scale-102 h-full`}>
                <div>
                  <span className="text-xl mb-1.5 block">{item.icon}</span>
                  <h4 className="text-xs font-bold mb-1">{item.step}</h4>
                  <p className="text-[10px] sm:text-[11px] leading-relaxed opacity-95 font-semibold">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 6: // Slide 7: Yapay Zekâ Analiz ve İşlem Süreci
      return (
        <div className="space-y-5 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Yapay Zekâ Analiz ve İşlem Süreci
          </h2>
          
          <div className="relative pt-2 pb-1">
            <div className="hidden sm:block absolute left-4 right-4 top-[50px] h-1 bg-stone-200 rounded-full -z-10" />
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { no: "1", title: "Girdi Alımı", desc: "Kullanıcı analiz etmek istediği paragrafı veya metni arayüze girer.", icon: "⌨️" },
                { no: "2", title: "Ön İşleme", desc: "Metin kelimelerine ayrıştırılır, noktalama işaretlerinden temizlenir.", icon: "🧹" },
                { no: "3", title: "Derin Analiz", desc: "Yapay zekâ modeli, her kelimenin bağlamsal ve anlamsal kökünü inceler.", icon: "🔬" },
                { no: "4", title: "Hata Tespiti", desc: "Yabancılaşmış veya bozulmuş kelimeler ve öbekler işaretlenir.", icon: "🔍" },
                { no: "5", title: "Öneri Sunumu", desc: "Model, tespit ettiği her hata için alternatif saf Türkçe kelimeleri sunar.", icon: "💡" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-stone-50/50 p-3.5 rounded-2xl border border-stone-200/50 shadow-sm relative hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1C4E3D] text-white rounded-full flex items-center justify-center font-bold text-base shadow-sm border-2 border-white mb-2">
                    {item.icon}
                  </div>
                  <span className="text-[10px] text-[#9C2A22] font-black tracking-wider uppercase mb-0.5">ADIM {item.no}</span>
                  <h4 className="text-xs font-bold text-[#1C4E3D] mb-1">{item.title}</h4>
                  <p className="text-[10px] text-stone-600 leading-relaxed font-sans font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 7: // Slide 8: Kullanılacak Teknolojiler
      return (
        <div className="space-y-5 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Kullanılacak Teknolojiler
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60 shadow-sm">
              <div className="flex items-center gap-2 text-[#1C4E3D] font-bold mb-3 border-b border-stone-200 pb-2">
                <span className="text-lg">💻</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wider">Arka Plan ve Model Altyapısı</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D] text-base">🐍</span>
                  <div>
                    <span className="font-bold text-stone-850">Python:</span>
                    <span className="text-stone-500 block text-xs">Veri analitiği ve model geliştirme sürecinin temel dili.</span>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D] text-base">🧠</span>
                  <div>
                    <span className="font-bold text-stone-850">NLP & Makine Öğrenmesi:</span>
                    <span className="text-stone-500 block text-xs">SpaCy, NLTK ve özelleştirilmiş Türkçe transformatör modelleri.</span>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D] text-base">👁️‍🗨️</span>
                  <div>
                    <span className="font-bold text-stone-855">Büyük Dil Modelleri (LLM):</span>
                    <span className="text-stone-500 block text-xs">Semantik çıkarımlar ve esnek doğru karşılık alternatifleri için entegre yapay zekâ.</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/60 shadow-sm">
              <div className="flex items-center gap-2 text-[#9C2A22] font-bold mb-3 border-b border-stone-200 pb-2">
                <span className="text-lg">🌐</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wider">Entegrasyon ve Ön Yüz</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                <li className="flex gap-2 items-start">
                  <span className="text-[#9C2A22] text-base">🔌</span>
                  <div>
                    <span className="font-bold text-stone-850">REST API:</span>
                    <span className="text-stone-500 block text-xs">Farklı platformların sistemi arka planda çağırabilmesi için hafif ve hızlı servis mimarisi.</span>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#9C2A22] text-base">🎨</span>
                  <div>
                    <span className="font-bold text-stone-850">HTML, CSS & JavaScript:</span>
                    <span className="text-stone-500 block text-xs">Kullanıcının masaüstü veya mobil cihazlardan anında erişebileceği modern, duyarlı arayüz.</span>
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#9C2A22] text-base">🛠️</span>
                  <div>
                    <span className="font-bold text-stone-850">Hızlı Entegrasyon:</span>
                    <span className="text-stone-500 block text-xs">Eğitim portallarına (örneğin EBA) kolayca eklenebilecek modüler tasarım.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 8: // Slide 9: Uygulanabilirlik ve Sürdürülebilirlik
      return (
        <div className="space-y-5 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Uygulanabilirlik ve Sürdürülebilirlik
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-4 bg-rose-50/20 p-6 rounded-2xl border-2 border-dashed border-[#9C2A22]/20 flex flex-col justify-center items-center text-center">
              <span className="text-4xl sm:text-5xl font-serif font-black text-[#9C2A22] leading-none mb-2">100%</span>
              <h4 className="text-xs font-bold text-[#1C4E3D] font-sans">Dinamik & Ölçeklenebilir Yapı</h4>
            </div>
            
            <div className="md:col-span-8 bg-stone-50/50 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-xs sm:text-sm uppercase tracking-wider text-[#1C4E3D] font-bold flex items-center gap-1.5 border-b border-stone-250 pb-1.5">
                  <span>🛡️</span> Sürdürülebilir Proje Modeli
                </h3>
                
                <div className="space-y-2.5 font-semibold">
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong className="text-indigo-900 uppercase tracking-wide text-[10px] sm:text-xs block mb-0.5">Uygulanabilirlik:</strong> 
                    Geliştirilen sistem, bir web API servisi olarak tasarlandığından tüm eğitim platformlarına, tarayıcı eklentilerine ve kurumsal yazışma sistemlerine kolayca entegre edilebilir.
                  </p>
                  <div className="border-t border-dashed border-stone-200 mt-2 pt-2 space-y-1.5 text-xs text-stone-600">
                    <strong className="text-[#9C2A22] uppercase tracking-wide text-[10px] sm:text-xs block mb-1">Sürdürülebilirlik Stratejisi:</strong>
                    <p className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[#9C2A22] font-bold">🚀</span>
                      <span>Modelin performans takibi düzenli aralıklarla otomatize edilecektir.</span>
                    </p>
                    <p className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-[#9C2A22] font-bold">🔄</span>
                      <span>Yeni nesil internet jargonu ve dezenformasyon trendleri her ay otomatik güncellenen veri kümeleriyle sisteme öğretilecektir.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 9: // Slide 10: Riskler ve Önlemler
      return (
        <div className="space-y-4 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Riskler ve Önlemler
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200 space-y-2">
                <h3 className="text-xs uppercase tracking-wider text-red-700 font-bold flex items-center gap-1.5">
                  <span>⚠️</span> Kritik Risk Alanları
                </h3>
                <ul className="space-y-1.5 text-xs text-stone-600 font-semibold leading-relaxed">
                  <li>
                    <strong className="text-stone-850">Teknik:</strong> Dilin dinamik değişimi sebebiyle modelin yanlış önerilerde bulunması.
                  </li>
                  <li>
                    <strong className="text-stone-850">Operasyonel:</strong> Eşzamanlı yoğun isteklerde sunucu kaynaklarının yetersiz kalması.
                  </li>
                  <li>
                    <strong className="text-stone-850">Etik:</strong> Bölgesel ağızların veya sanatsal deyimlerin sistem tarafından hatalı şekilde "dezenformasyon" olarak sınıflandırılması.
                  </li>
                </ul>
              </div>
              
              <div className="bg-emerald-50/20 p-4 rounded-xl border border-emerald-250 space-y-1.5">
                <h3 className="text-xs uppercase tracking-wider text-emerald-800 font-bold flex items-center gap-1.5">
                  <span>🛡️</span> Alınacak Önlemler
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-semibold">
                  Duyarlı bir <strong className="text-emerald-950 font-bold">Kullanıcı Geri Bildirim Döngüsü</strong> kurulacaktır. Her hatalı tespitte dil bilimci akademisyenler gözetiminde veri seti güncellenecektir. Bölgesel ifadeleri ayırt etmek için semantik bir bağlam koruması geliştirilecektir.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col items-center justify-center bg-stone-50/50 rounded-2xl p-4 border border-stone-200">
              <div className="w-14 h-14 rounded-full bg-indigo-50 border border-indigo-250 flex items-center justify-center text-3xl mb-3 shadow-inner">
                🧠
              </div>
              <h4 className="text-[11px] font-bold text-[#1C4E3D] uppercase tracking-wider mb-1">NATURAL LANGUAGE PROCESSING</h4>
              <p className="text-[9px] text-stone-500 font-mono text-center">EDITABLE STROKE GRAPHICS</p>
              <div className="flex gap-2 mt-4 text-xs font-semibold">
                <span className="px-2 py-1 bg-white border border-stone-200 rounded-lg shadow-sm font-mono">1010</span>
                <span className="px-2 py-1 bg-white border border-stone-200 rounded-lg shadow-sm font-mono">1001</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 10: // Slide 11: Stratejik SWOT Analizi
      return (
        <div className="space-y-4 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Stratejik SWOT Analizi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-[#1C4E3D]/5 hover:bg-[#1C4E3D]/10 transition-colors p-4 rounded-xl border border-[#1C4E3D]/20 space-y-1.5 shadow-sm">
              <h3 className="text-xs font-bold text-[#1C4E3D] uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-emerald-700">🟢</span> GÜÇLÜ YÖNLER (Strengths)
              </h3>
              <ul className="space-y-1 text-xs text-stone-700 font-semibold list-disc pl-4 leading-relaxed">
                <li>Doğrudan Türkçe dil yapısına ve morfolojisine odaklı olması.</li>
                <li>Eğitim teknolojileri alanında doğrudan pratik katma değer sunması.</li>
              </ul>
            </div>
            
            <div className="bg-[#9C2A22]/5 hover:bg-[#9C2A22]/10 transition-colors p-4 rounded-xl border border-[#9C2A22]/20 space-y-1.5 shadow-sm">
              <h3 className="text-xs font-bold text-[#9C2A22] uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-rose-700">🔴</span> ZAYIF YÖNLER (Weaknesses)
              </h3>
              <ul className="space-y-1 text-xs text-stone-700 font-semibold list-disc pl-4 leading-relaxed">
                <li>Anlam kaymalarını yüksek doğrulukla saptamak için sürekli derin ve büyük veri kümesine ihtiyaç duyması.</li>
              </ul>
            </div>
            
            <div className="bg-[#1C4E3D]/5 hover:bg-[#1C4E3D]/10 transition-colors p-4 rounded-xl border border-[#1C4E3D]/20 space-y-1.5 shadow-sm">
              <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-emerald-600">📈</span> FIRSATLAR (Opportunities)
              </h3>
              <ul className="space-y-1 text-xs text-stone-700 font-semibold list-disc pl-4 leading-relaxed">
                <li>Milli Eğitim Bakanlığı platformları (EBA vb.) ve kamu kurumlarıyla resmi entegrasyon potansiyeli.</li>
              </ul>
            </div>
            
            <div className="bg-[#9C2A22]/5 hover:bg-[#9C2A22]/10 transition-colors p-4 rounded-xl border border-[#9C2A22]/20 space-y-1.5 shadow-sm">
              <h3 className="text-xs font-bold text-[#9C2A22] uppercase tracking-wider flex items-center gap-1.5">
                <span className="text-amber-600">⚠️</span> TEHDİTLER (Threats)
              </h3>
              <ul className="space-y-1 text-xs text-stone-700 font-semibold list-disc pl-4 leading-relaxed">
                <li>Dijital jargonda yeni hatalı kullanımların tespit edilme hızından daha çabuk yayılması.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 11: // Slide 12: Dijital İçerik, Markalaşma ve Çıktılar
      return (
        <div className="space-y-5 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Dijital İçerik, Markalaşma ve Çıktılar
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/65 shadow-sm">
              <div className="flex items-center gap-2 text-[#1C4E3D] font-bold mb-3 border-b border-stone-150 pb-2">
                <span className="text-lg">📦</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wider">Beklenen Dijital Çıktılar</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D]">🌐</span>
                  <div>
                    <span className="font-bold">Web Uygulaması:</span> Herkesin metin yapıştırıp anında analiz alabileceği ana sayfa.
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D]">🔌</span>
                  <div>
                    <span className="font-bold">Modüler API:</span> Diğer yerli sistemlere dil denetleme desteği sunan altyapı.
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#1C4E3D]">🎓</span>
                  <div>
                    <span className="font-bold">Eğitim Modülü:</span> Okullarda Türkçe derslerine yardımcı eğlenceli oyunlaştırılmış test paneli.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-stone-50/50 p-5 rounded-2xl border border-stone-200/65 shadow-sm">
              <div className="flex items-center gap-2 text-[#9C2A22] font-bold mb-3 border-b border-stone-150 pb-2">
                <span className="text-lg">⭐️</span>
                <span className="text-xs font-sans font-bold uppercase tracking-wider">Markalaşma & Sunum Kalitesi</span>
              </div>
              <ul className="space-y-4 text-xs sm:text-sm text-stone-700 font-semibold leading-relaxed">
                <li>
                  <span className="font-bold text-[#1C4E3D] block mb-0.5">Marka Değeri:</span>
                  <p className="text-stone-650 text-xs font-semibold">Dil bilincini her yaştan kitleye sevdirmek adına temiz, sade ve modern bir görsel kimlik tasarlanmıştır.</p>
                </li>
                <li>
                  <span className="font-bold text-[#1C4E3D] block mb-0.5">Sunum ve Değerlendirme Kalitesi:</span>
                  <p className="text-stone-650 text-xs font-semibold">Proje, akademik dürüstlük, kaynak doğruluğu ve teknik mükemmeliyeti gözeterek en üst düzey rapor standartlarında hazırlanmıştır.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 12: // Slide 13: Teşekkür Ederiz
      return (
        <div className="space-y-8 py-10 px-4 sm:px-8 text-center h-full flex flex-col justify-center items-center select-none">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-extrabold text-[#1C4E3D] leading-tight">
              Teşekkür Ederiz
            </h1>
            
            <div className="w-24 h-1 bg-[#9C2A22] mx-auto rounded-full my-4" />
            
            <p className="text-lg sm:text-xl text-[#1C4E3D] font-sans font-bold italic max-w-xl">
              "Türkçemizi korumak, geleceğimizi korumaktır."
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center pt-8 border-t border-stone-200/70 w-full max-w-xl text-stone-600 font-sans text-xs sm:text-sm font-bold">
            <div className="flex items-center gap-2">
              <span className="text-base">✉️</span>
              <span className="hover:underline cursor-pointer">karamanogullari@iletisim.com</span>
            </div>
            <div className="hidden sm:block text-stone-300">|</div>
            <div className="flex items-center gap-2">
              <span className="text-base">🌐</span>
              <span className="hover:underline cursor-pointer">www.karamanogullari-tddi.com</span>
            </div>
          </div>
        </div>
      );

    case 13: // Slide 14: Image Sources
      return (
        <div className="space-y-5 text-left py-2 font-sans select-none">
          <h2 className="text-xl sm:text-2xl font-serif font-extrabold text-[#1C4E3D] border-l-4 border-[#1C4E3D] pl-3">
            Görsel Kaynakları (Image Sources)
          </h2>
          
          <div className="space-y-3.5 pt-3 font-sans font-semibold">
            <div className="flex items-start gap-4 p-3.5 bg-stone-50/50 rounded-xl border border-stone-200/60 shadow-sm">
              <div className="w-16 h-12 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-2xl shrink-0 overflow-hidden shadow-inner">
                🏠
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-bold text-stone-700 break-all leading-normal">
                  https://img.dakohome.co.uk/JoWT-sEEqcpErBp26t6_SA/a1b0ff2d-c991-455c-20d7-d976447b6d00/thumb
                </h4>
                <span className="text-[10px] text-stone-400 block mt-1">
                  Source: <a href="http://www.dakohome.co.uk" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">www.dakohome.co.uk</a>
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-3.5 bg-stone-50/50 rounded-xl border border-stone-200/60 shadow-sm">
              <div className="w-16 h-12 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-2xl shrink-0 overflow-hidden shadow-inner">
                🧠
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-[11px] sm:text-xs font-bold text-stone-700 break-all leading-normal">
                  https://static.vecteezy.com/system/resources/previews/012/750/025/non_2x/natural-language-processing-turquoise-concept-icon-machine-learning-engineer-skill-abstract-idea-thin-line-illustration-isolated-outline-drawing-editable-stroke-vector.jpg
                </h4>
                <span className="text-[10px] text-stone-400 block mt-1">
                  Source: <a href="http://www.vecteezy.com" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">www.vecteezy.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="text-center py-10 font-sans font-bold text-stone-500 select-none">
          Slayt Bulunamadı.
        </div>
      );
  }
}
