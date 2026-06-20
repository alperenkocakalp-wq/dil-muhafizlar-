import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Pre-seeded common misspelled/deformed words for statistical tracking and fallback
const BASE_STATS = [
  { word: "herkez", corrected: "herkes", count: 42, reason: "Hacivat der ki: Herkes kelimesinin sonu 's' ile biter. Karagöz herkez yazınca Hacivat hep 'Herkes!' diye uyarır.", type: "Yazım Hatası" },
  { word: "şöför", corrected: "şoför", count: 35, reason: "Nasreddin Hoca der ki: Ön koltuktaki sürücüye 'şoför' deriz, iki tane 'ö' değil, ortadaki harf 'o' dur, aman dikkat!", type: "Yazım Hatası" },
  { word: "yalnış", corrected: "yanlış", count: 28, reason: "Keloğlan der ki: Bu kelime 'yanılmaktan' gelir, o yüzden 'yanlış' deriz. 'Yalın' olan yalnızdır!", type: "Yazım Hatası" },
  { word: "yanlız", corrected: "yalnız", count: 26, reason: "Dede Korkut der ki: Yalnız kelimesi tek başınadır. 'Yalın' (sade, tek) kökünden gelir, bu yüzden 'yalnız' yazılır.", type: "Yazım Hatası" },
  { word: "okey", corrected: "tamam", count: 22, reason: "Karagöz der ki: Hacivat bana 'okey' dediğinde ona 'Tamam de Karagöz'ün ortağı!' diyorum. Türkçemizde 'tamam' veya 'olur' çok daha pırıl pırıl!", type: "Yabancı Özentisi" },
  { word: "slm", corrected: "selam", count: 19, reason: "Keloğlan der ki: Sesli harflerimizi yutmayalım! Harflerimiz bizim incimizdir. 'slm' yerine 'selam' yazalım, sevgiyle selamlaşalım.", type: "Kelime Bozumu" },
  { word: "nbr", corrected: "ne haber", count: 16, reason: "Nasreddin Hoca der ki: 'Nbr' ne demektir yahu? Tatlıca 'Ne haber?' diye sormak varken dili kurutmayalım.", type: "Kelime Bozumu" },
  { word: "guzel", corrected: "güzel", count: 15, reason: "Dede Korkut der ki: Türkçe karakterlerimiz dilimizin süsüdür. Klavyemizde 'ü' varken 'guzel' yazarsak dilimizin ahengi bozulur.", type: "Klavye Tembelliği" },
  { word: "tmm", corrected: "tamam", count: 14, reason: "Hacivat der ki: Kısa yazacağım diye güzelim 'tamam' kelimesini harfsiz bırakma çocuk dostum.", type: "Kelime Bozumu" },
  { word: "bye", corrected: "hoşça kal", count: 12, reason: "Karagöz der ki: 'Bay bay' veya 'bye' yerine dilimizin o sıcak vedası 'hoşça kal' veya 'esen kal' kulağa çok daha tatlı geliyor!", type: "Yabancı Özentisi" }
];

// In-memory corrections list to dynamically updated with user inputs during runtime
let platformCorrections = [...BASE_STATS];

// Initialize Gemini SDK with lazy initialization helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
      console.log("Gemini API Client successfully initialized.");
    } else {
      console.warn("GEMINI_API_KEY is not defined or using placeholder. Running in Fallback Rule-Based engine mode.");
    }
  }
  return aiClient;
}

// Fallback rule-based matching dictionary
const FALLBACK_RULES: Record<string, { corrected: string; type: string; reason: string; example: string }> = {
  "herkez": {
    corrected: "herkes",
    type: "Yazım Hatası",
    reason: "Hacivat der ki: Herkes kelimesinin sonu 's' ile biter. Karagöz herkez yazınca Hacivat onu 'Sözün doğrusu herkes!' diye sevecenlikle uyarır.",
    example: "Dün akşam bayram şenliğine herkes katıldı."
  },
  "şöför": {
    corrected: "şoför",
    type: "Yazım Hatası",
    reason: "Nasreddin Hoca der ki: Arkasında oturduğumuz o usta kaptana 'şoför' deriz. İki kere 'ö' ünlemi olmaz, ortadaki harfimiz güler yüzlü bir 'o'dur!",
    example: "Güler yüzlü şoför amca bizi okul servisimizle eve bıraktı."
  },
  "yalnış": {
    corrected: "yanlış",
    type: "Yazım Hatası",
    reason: "Keloğlan der ki: Bu kelime 'yanılmak' fiilinden doğmuştur. Bu sebeple yan(ı)lış yani 'yanlış' demeliyiz. 'Yalın' olan ise yalnızdır!",
    example: "Sınavdaki o sorunun cevabını yanlış işaretlememeyi öğrendim."
  },
  "yanlız": {
    corrected: "yalnız",
    type: "Yazım Hatası",
    reason: "Dede Korkut der ki: Bir başına kalana, tek olana 'yalnız' deriz. Kökeni 'yalın' (tek, sade) sözcüğüdür, ardındaki harfler süzülüp 'yalnız' olur.",
    example: "Kütüphanede yalnız kalıp sessizce öykü kitabımı okudum."
  },
  "okey": {
    corrected: "tamam",
    type: "Yabancı Özentisi",
    reason: "Karagöz der ki: Hacivat bana 'okey okey' diye seslendiğinde ona gülüyorum. Türkçemizin pırıl pırıl bir 'tamam' veya 'olur' sözü varken okey de neymiş!",
    example: "Öğretmenim bana ödevimi sorduğunda ona gururla 'Tamam öğretmenim!' dedim."
  },
  "slm": {
    corrected: "selam",
    type: "Kelime Bozumu",
    reason: "Keloğlan der ki: Harfleri yutmak kelimelerin canını acıtır! Dilimiz sesli harflerle güzeldir. 'slm' yerine sevgiyle 'selam' yazalım.",
    example: "Sabah sınıfa girer girmez arkadaşlarıma selam verdim."
  },
  "nbr": {
    corrected: "ne haber",
    type: "Kelime Bozumu",
    reason: "Nasreddin Hoca der ki: Dile tembellik yakışmaz hey kuzum! Sıkıştırılmış 'nbr' yerine cana yakın ve tatlı bir 'Ne haber?' demeliyiz.",
    example: "Bahçede saklambaç oynayan kuzenimin yanına gidip 'Ne haber heyecanlı çocuk?' diye sordum."
  },
  "guzel": {
    corrected: "güzel",
    type: "Klavye Tembelliği",
    reason: "Dede Korkut der ki: 'ü' harfi dilimizin gülücüğüdür. Klavye tembelliği yapıp noktaları atarak 'guzel' yazarsak Türkçemizin ahengini bozarız.",
    example: "Öğretmenimizin tahtaya çizdiği o resim gerçekten çok güzel oldu."
  },
  "tmm": {
    corrected: "tamam",
    type: "Kelime Bozumu",
    reason: "Hacivat der ki: Hızlı yazmak uğruna kelimelerimizi budamayalım. 'tmm' yerine kelimeyi pırıl pırıl açıp 'tamam' yazalım.",
    example: "Annem akşam yemeği hazır dediğinde 'Tamam geliyorum' diye seslendim."
  },
  "bye": {
    corrected: "hoşça kal",
    type: "Yabancı Özentisi",
    reason: "Karagöz der ki: Bizim dostça, sevgiyle bezeli veda sözümüz 'hoşça kal' iken, kulağa soğuk gelen yabancı 'bye bye' sözüne ne gerek var dostlar!",
    example: "Okul çıkışında arkadaşım Ali'ye 'Hoşça kal, yarın görüşelim' diyerek el salladım."
  },
  "bro": {
    corrected: "kardeşim",
    type: "Yabancı Özentisi",
    reason: "Keloğlan der ki: Can dostlarımıza, sıcacık 'kardeşim', 'can dostum', 'arkadaşım' demek varken yabancı 'bro' demeyi Türkçemize yakıştıramıyorum.",
    example: "Sınıf arkadaşım benim en sevgili can kardeşim gibidir."
  },
  "seytan": {
    corrected: "şeytan",
    type: "Klavye Tembelliği",
    reason: "Nasreddin Hoca der ki: 'Ş' harfi bizim fısıltımızdır! 'seytan' yazarsak ş harfinin boynunu bükmüş oluruz. Şekerimiz, şenliğimiz, şeytanımız hepsi ş ile güzeldir.",
    example: "Kardeşime kurnaz kurnaz bakarak şaka yapan kedi çok şeytandı."
  },
  "makina": {
    corrected: "makine",
    type: "Yazım Hatası",
    reason: "Hacivat der ki: Fabrikalarda, evlerde çalışan o metal dostumuza 'makina' değil, incecik 'e' seslisiyle 'makine' dememiz gerekir çocuk dostlar.",
    example: "Babam yeni aldığı oyun hamuru yapma makinesini kurdu."
  },
  "tiren": {
    corrected: "tren",
    type: "Yazım Hatası",
    reason: "Karagöz der ki: Çuf çuf giden demir yola fazladan bir 'i' sığdırmışlar! 'Tiren' değil, doğrudan çılgınca giden rüzgar gibi tek hecede 'tren' yazarız.",
    example: "Hafta sonu dedemleri ziyaret etmek için hızlı trene bindik."
  },
  "traş": {
    corrected: "tıraş",
    type: "Yazım Hatası",
    reason: "Dede Korkut der ki: Tıraş kelimesinde o tatlı gizli kahraman 'ı' harfi yerini korur. 'Traş' değil, 'tıraş' şeklinde telaffuz ve tahrir edilir.",
    example: "Babam bayram sabahı pırıl pırıl tıraş oldu."
  },
  "flim": {
    corrected: "film",
    type: "Yazım Hatası",
    reason: "Keloğlan der ki: Sinemada izlediğimiz o heyecan dolu serüvene 'flim' denmez! Söylerken zorlansak da doğrusu 'film' şeklinde yazılır, 'i' sondaki l ile m arasında olmaz.",
    example: "Bu akşam ailecek çok eğlenceli bir animasyon filmi izleyeceğiz."
  },
  "sarj": {
    corrected: "şarj",
    type: "Yazım Hatası",
    reason: "Dede Korkut der ki: Telefonlarımızı, tabletlerimizi güçle dolduran o sisteme 'sarj' değil, 'şarj' deriz. Başı şenlikli 'ş', sonu ise rüzgarlı 'j'dir.",
    example: "Tabletimin şarjı bitince hemen ders çalışmak için kitaplarımı açtım."
  },
  "herkezle": {
    corrected: "herkesle",
    type: "Yazım Hatası",
    reason: "Hacivat der ki: Herkes kelimesi 's' ile bittiği için ek alırken de herkesle olur, z harfi asla aramıza sızamaz!",
    example: "Sınıfımızda herkesle iyi geçinmek bizi mutlu bir aile yapar."
  }
};

const MASCOTS = ["Nasreddin Hoca", "Hacivat", "Karagöz", "Dede Korkut", "Keloğlan"];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Get dynamic statistics and top misspelled words
  app.get("/api/stats", (req, res) => {
    // Return sorted statistics by counts
    const sortedStats = [...platformCorrections].sort((a, b) => b.count - a.count);
    res.json({
      success: true,
      stats: sortedStats.slice(0, 10),
      totalCorrections: platformCorrections.reduce((acc, curr) => acc + curr.count, 0)
    });
  });

  // API Route: "Word of the Day" (Günün Kelimesi) generator
  app.get("/api/word-of-the-day", (req, res) => {
    const keys = Object.keys(FALLBACK_RULES);
    // Find a word based on current day or randomly
    const index = Math.floor(Math.random() * keys.length);
    const wordKey = keys[index];
    const item = FALLBACK_RULES[wordKey];

    // Rhythms/Riddles based on mascot for extra children engagement
    const stories = [
      `Günün bilmecesi: '${item.corrected}' deriz de yazarız, yanlış yazıp dili bozar mıyız? ${item.reason}`,
      `Nasreddin Hoca eşeğine ters binmiş ama kelimeleri düzgün yazmış! '${wordKey}' değil '${item.corrected}' yazalım, dilimize neşe katalım!`,
      `Karagöz ile Hacivat perde kurmuş, '${item.corrected}' kelimesiyle canlara can sunmuş! İşte hikayesi: ${item.reason}`,
      `Keloğlan der ki: Dilini pırıl pırıl kullanan, kelimesini tam yazan, çocukların sultanı olur! '${wordKey}' yazanları uyaralım, doğrusu olan '${item.corrected}' sevdirelim.`
    ];

    const randomStory = stories[Math.floor(Math.random() * stories.length)];

    res.json({
      success: true,
      original: wordKey,
      corrected: item.corrected,
      type: item.type,
      explanation: item.reason,
      example: item.example,
      story: randomStory
    });
  });

  // API Route: Advanced Text Correction (Gemini API with Fallback engine)
  app.post("/api/correct", async (req, res) => {
    try {
      const { text } = req.body;
      if (!text || typeof text !== "string") {
        return res.status(400).json({ success: false, error: "Lütfen bir metin giriniz." });
      }

      const cleanText = text.trim();
      if (!cleanText) {
        return res.json({ success: true, originalText: text, correctedText: text, corrections: [] });
      }

      const client = getGeminiClient();

      if (client) {
        // Run with Gemini API
        try {
          const prompt = `İlkokul ve ortaokul yaşlarındaki çocukların (7-14 yaş) girdiği bir Türkçe metindeki yanlışları tespit etmen gerekiyor. Bir kelime dezenformasyona uğramışsa, klavye üşengeçliğinden dolayı Türkçe karakterler yutulmuşsa (ç yerine c, ü yerine u gibi), yabancı dillerden hatalı/özenti geçişler varsa (okey, bye, bro, trend vb.) ya da yanlış yazılmışsa (herkez, şöför, yalnış vb.) bunları bul.
          
Metin: "${cleanText}"

Lütfen bunu parse et ve çocukların ilgisini çekecek şekilde eğlenceli ve geleneksel karakterlerimizden (Nasreddin Hoca, Hacivat, Karagöz, Keloğlan, Dede Korkut) birinin diliyle çocuksu, şirin ve teşvik edici bir dille açıkla.

Süper katı JSON formatında şu şema ile yanıt ver:
{
  "correctedText": "Metnin dezenformasyon ve yazım hataları düzeltilmiş tertemiz tüm hali",
  "corrections": [
    {
      "original": "Tespit edilen hatalı/deforme veya yabancı kelime (Metindeki haliyle)",
      "corrected": "Doğru Türkçe kelime",
      "type": "Yazım Hatası" | "Yabancı Özentisi" | "Kelime Bozumu" | "Klavye Tembelliği",
      "mascot": "Nasreddin Hoca" | "Hacivat" | "Karagöz" | "Keloğlan" | "Dede Korkut",
      "reason": "Bir maskot ismi kullanarak çocuklara sevecen, eğitici, tatlı ve basit bir dil anlatımı. Örn: 'Nasreddin Hoca der ki: Ön koltuktaki usta kaptana şoför deriz hey gözüm! İki kere ö değil, ortadaki harfimiz o harfidir.'",
      "example": "Gramer açıklaması olmayan, çocuğun günlük hayatta kurabileceği pırıl pırıl bir Türkçe örnek cümle."
    }
  ]
}

Yanıtında sadece saf bir JSON dizesi döndür. Markdown 'json codeblock' sarmalayıcısı kullanma, doğrudan JSON nesnesi olsun.`;

          const candidateModels = [
            "gemini-2.5-flash",
            "gemini-2.0-flash",
            "gemini-1.5-flash",
            "gemini-3.5-flash",
            "gemini-flash-latest"
          ];
          let response = null;
          let activeModel = "";
          let lastError = null;

          for (const modelName of candidateModels) {
            for (let attempt = 1; attempt <= 2; attempt++) {
              try {
                console.log(`Attempting Gemini correction with model: ${modelName} (attempt ${attempt}/2)...`);
                response = await client.models.generateContent({
                  model: modelName,
                  contents: prompt,
                  config: {
                    responseMimeType: "application/json",
                    temperature: 0.3
                  }
                });
                activeModel = modelName;
                console.log(`Successfully completed generation using model: ${modelName}`);
                break;
              } catch (err: any) {
                lastError = err;
                console.warn(`Model ${modelName} (attempt ${attempt}) failed. Error:`, err.message || err);
                
                const statusCode = err.status || err.statusCode || (err.error && err.error.code);
                if (statusCode === 503 || statusCode === 429) {
                  console.log(`Transient error ${statusCode} detected. Waiting 1000ms before retrying/switching...`);
                  await new Promise(resolve => setTimeout(resolve, 1000));
                } else {
                  break;
                }
              }
            }
            if (response) {
              break;
            }
          }

          if (!response) {
            throw lastError || new Error("All candidate Gemini models failed.");
          }

          const responseText = response.text || "{}";
          let data;
          try {
            data = JSON.parse(responseText.trim());
          } catch (e) {
            // If markdown code blocks are present, clean them
            const cleaned = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
            data = JSON.parse(cleaned);
          }

          // Register found corrections dynamically into statistical scoreboard to make it live!
          if (data && Array.isArray(data.corrections)) {
            data.corrections.forEach((c: any) => {
              const orig = c.original.toLowerCase();
              const corrIndex = platformCorrections.findIndex(item => item.word === orig);
              if (corrIndex !== -1) {
                platformCorrections[corrIndex].count += 1;
              } else {
                platformCorrections.push({
                  word: orig,
                  corrected: c.corrected,
                  count: 1,
                  reason: c.reason,
                  type: c.type || "Yazım Hatası"
                });
              }
            });
          }

          return res.json({
            success: true,
            engine: `Gemini AI Engine (${activeModel})`,
            originalText: text,
            correctedText: data.correctedText || text,
            corrections: data.corrections || []
          });

        } catch (geminiError: any) {
          console.error("Gemini API Error, falling back to rule-based engine:", geminiError);
        }
      }

      // Rule-Based Engine (Fallback) - Perfect list match
      // Split into words, search for words that have a match in FALLBACK_RULES
      const words = cleanText.split(/([.,!?;:\s]+)/);
      const corrections: any[] = [];
      let correctedTextBuilder = "";

      for (let i = 0; i < words.length; i++) {
        const item = words[i];
        const normalized = item.toLowerCase().replace(/[.,!?;:]/g, "");
        const fallbackMatch = FALLBACK_RULES[normalized];

        if (fallbackMatch) {
          // Determine a mascot randomly based on indices
          const mascot = MASCOTS[(normalized.charCodeAt(0) + i) % MASCOTS.length];
          
          corrections.push({
            original: item.replace(/[.,!?;:]/g, ""), // Keep case closer to original but clean punctuation
            corrected: fallbackMatch.corrected,
            type: fallbackMatch.type,
            mascot: mascot,
            reason: fallbackMatch.reason,
            example: fallbackMatch.example
          });
          
          // Apply case sensitivity if original word was capitalized
          const isCapitalized = item[0] === item[0].toUpperCase() && item[0] !== item[0].toLowerCase();
          const replacement = isCapitalized 
            ? fallbackMatch.corrected[0].toUpperCase() + fallbackMatch.corrected.slice(1) 
            : fallbackMatch.corrected;

          correctedTextBuilder += item.replace(normalized, replacement);

          // Update dynamic scoreboard count
          const statsIndex = platformCorrections.findIndex(s => s.word === normalized);
          if (statsIndex !== -1) {
            platformCorrections[statsIndex].count += 1;
          } else {
            platformCorrections.push({
              word: normalized,
              corrected: fallbackMatch.corrected,
              count: 1,
              reason: fallbackMatch.reason,
              type: fallbackMatch.type
            });
          }
        } else {
          correctedTextBuilder += item;
        }
      }

      res.json({
        success: true,
        engine: "Dezenformasyon Türkçe Kural Motoru (Fallback)",
        originalText: text,
        correctedText: correctedTextBuilder,
        correctionsList: corrections, // Alias helper in case client maps directly
        corrections: corrections
      });

    } catch (err: any) {
      console.error("Critical server error in correction endpoint:", err);
      res.status(500).json({ success: false, error: "Sistemde geçici bir hata oluştu." });
    }
  });

  // Serve Client SPA assets using Vite configuration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server loaded as Express middleware.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static assets server routes declared for Production distribution.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server fully operational on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("An error occurred launching the full-stack server platform:", error);
});
