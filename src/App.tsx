import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Sparkles,
  TrendingUp,
  User,
  Shield,
  Search,
  Flame,
  Compass,
  Check,
  RotateCcw,
  CheckCircle2,
  Lock,
  BookMarked,
  Award,
  AlertCircle,
  Calendar,
  Users,
  CheckSquare,
  FileSpreadsheet,
  Tv,
  Plus,
  Trash2,
  Edit,
  X,
  Save,
  Download,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Layers,
  Folder,
  FileText,
  Upload,
  Share2
} from "lucide-react";

import MascotAvatar, {
  NasreddinHocaAvatar,
  HacivatAvatar,
  KaragozAvatar,
  DedeKorkutAvatar,
  KeloglanAvatar
} from "./components/MascotAvatars";
import { GAMIFIED_BADGES, SAMPLE_TEXTS } from "./data";
import PresentationSlides from "./components/PresentationSlides";

// Real generated high-quality project images
import logoTurkceMuhafizi from "./assets/images/logo_turkce_muhafizi_1781958654536.jpg";
import katmanlarYapayZeka from "./assets/images/katmanlar_yapay_zeka_1781958678558.jpg";
import amaclariPastaGrafigi from "./assets/images/amaclari_pasta_grafigi_1781958689510.jpg";
import dilEgitimDinamikleri from "./assets/images/dil_egitim_dinamikleri_1781958702595.jpg";
import riskGuvenlikCemberi from "./assets/images/risk_guvenlik_cemberi_1781958714441.jpg";
import sosyalMedyaGorsel1 from "./assets/images/sosyal_medya_gorsel_1_1781961866755.jpg";
import sosyalMedyaGorsel2 from "./assets/images/sosyal_medya_gorsel_2_1781961885324.jpg";
import { Correction, DayWord, DynamicStats, UserProfile } from "./types";

export default function App() {
  // Navigation Tabs including new school group tools and development stages Tab
  const [activeTab, setActiveTab] = useState<
    "duzeltici" | "skorbord" | "gunun-kelimesi" | "profil" | "proje-plani" | "takim-uyeleri" | "gorevler" | "tum-cikti" | "sunum-modu" | "yapi-taslari" | "belgeler-sunumlar" | "yapim-asamalari" | "gelistirilebilirlik" | "sosyal-medya"
  >("duzeltici");

  // Mobile sidebar visibility toggle state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Interactive Tools & Project States ---
  
  // 1. Team Members State
  const [teamMembers, setTeamMembers] = useState<{
    id: string;
    name: string;
    role: string;
    avatarId: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_takim_uyeleri");
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Reset if we have old mock names
        if (parsed.some((m: any) => m.name.includes("Kocakalp") || m.name.includes("Doğan") || m.name.includes("Arslan"))) {
          // fallback to correct ones below
        } else {
          return parsed;
        }
      } catch (e) {}
    }
    return [
      { id: "1", name: "İrem Nas BAŞER", role: "Araştırmacı ve Problem Analisti 🔍", avatarId: "nasreddin" },
      { id: "2", name: "Mustafa Alp KOÇAK", role: "Prompt Mühendisi ve Prototip Geliştirici 💻", avatarId: "keloglan" },
      { id: "3", name: "Cüneyt Eren ÇİFTÇİ", role: "İçerik Tasarımcısı ve Marka Tasarımcısı 🎨", avatarId: "karagoz" },
      { id: "4", name: "Zehra BAŞBOZKURT", role: "Yapay Zeka Mimarı, Sunum ve Yatırımcı İlişkileri Uzmanı 📊", avatarId: "hacivat" }
    ];
  });

  // 2. Project Plan / Milestones State
  const [milestones, setMilestones] = useState<{
    id: string;
    title: string;
    date: string;
    status: "yapilacak" | "yapiliyor" | "tamamlandi";
    desc: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_proje_plani");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "m1", title: "Takım Kurulumu ve Görev Dağılımı", date: "20.06.2026", status: "tamamlandi", desc: "Takım üyelerinin belirlenmesi, unvanların ve rollerin masal kahramanlarına göre seçilmesi." },
      { id: "m2", title: "Sınıf İçi Kelime Taraması", date: "24.06.2026", status: "yapiliyor", desc: "Arkadaşlarımızın günlük hayatta, defterlerde veya mesajlarda yaptığı dil hatalarının taranması." },
      { id: "m3", title: "Dil Muhafızlığı Analizörü ile Düzeltme", date: "28.06.2026", status: "yapilacak", desc: "Toplanan hatalı metinlerin yapay zeka denetleyici yardımıyla incelenip doğru Türkçe tekerlemelerin öğrenilmesi." },
      { id: "m4", title: "Başarı Ağacını Yeşertme", date: "02.07.2026", status: "yapilacak", desc: "En az 10 dezenformasyon kelimesini başarıyla analiz edip kaydeterek gurur rozetlerimizi kilitlemek." },
      { id: "m5", title: "Büyük Sınıf Sunumu 🎓", date: "05.07.2026", status: "yapilacak", desc: "Sunum modunu açarak tüm sınıf arkadaşlarımıza ve öğretmenimize temiz Türkçemizi sunmak." }
    ];
  });

  // 3. Project Tasks State
  const [projectTasks, setProjectTasks] = useState<{
    id: string;
    title: string;
    desc: string;
    assignedToId: string;
    status: "yapilacak" | "yapiliyor" | "tamamlandi";
    category: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_gorevler");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "t1", title: "Mesajlaşma Kısaltmaları Listesi", desc: "'Slm', 'nbr', 'krdşm', 'tmm' gibi harfleri yutulmuş sosyal medya üşengeçliklerini test edecek cümleler hazırla.", assignedToId: "2", status: "tamamlandi", category: "Araştırma 🔍" },
      { id: "t2", title: "Yabancı Özentisi Deyimleri Listele", desc: "Kanka yerine 'bro', tmm yerine 'okey' gibi yabancı özentili slangler için maskot hikayelerini derle.", assignedToId: "1", status: "yapiliyor", category: "Dezenformasyon Taraması 🕵️" },
      { id: "t3", title: "Sınıf Sunum Slaytlarını Organize Et", desc: "Sunum modunda öğretmenimize göstereceğimiz sunum tasarımlarını koordine et.", assignedToId: "3", status: "yapilacak", category: "Sunum Hazırlığı 📽️" }
    ];
  });

  // 4. Saved Project Outputs State
  const [savedOutputs, setSavedOutputs] = useState<{
    id: string;
    originalText: string;
    correctedText: string;
    correctionsCount: number;
    timestamp: string;
    notes: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_kayitli_ciktilar");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "o1", originalText: "Dün herkez toplandı, şöför amca tiren yolunu gösterdi okey?", correctedText: "Dün herkes toplandı, şoför amca tren yolunu gösterdi, olur mu?", correctionsCount: 4, timestamp: "20.06.2026, 14:15", notes: "Sınıfta panodaki yazılarda tespit edilen hataları Karagöz yardımıyla düzelttik." }
    ];
  });

  // Form helper temporary inputs
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("Dil Gözcüsü 👁️");
  const [newMemberAvatar, setNewMemberAvatar] = useState("keloglan");

  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneDate, setNewMilestoneDate] = useState("");
  const [newMilestoneDesc, setNewMilestoneDesc] = useState("");

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("Araştırma 🔍");
  const [newTaskAssignTo, setNewTaskAssignTo] = useState("1");
  const [newTaskStatus, setNewTaskStatus] = useState<"yapilacak" | "yapiliyor" | "tamamlandi">("yapilacak");

  const [editingOutputId, setEditingOutputId] = useState<string | null>(null);
  const [editingOutputNotes, setEditingOutputNotes] = useState("");

  const [slideIndex, setSlideIndex] = useState(0);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 5. Uploaded Presentation and Documents State
  const [uploadedDocs, setUploadedDocs] = useState<{
    id: string;
    name: string;
    type: "sunum" | "belge";
    size: string;
    date: string;
    fileType: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_uploaded_docs");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: "doc1", name: "Türkçe_Kelime_Muhafızları_Grup_Sunumu.pptx", type: "sunum", size: "4.2 MB", date: "20.06.2026", fileType: ".pptx" },
      { id: "doc2", name: "Dil_Dezenformasyonu_Saha_Analiz_Belgesi.pdf", type: "belge", size: "1.8 MB", date: "19.06.2026", fileType: ".pdf" },
      { id: "doc3", name: "TDK_Kurallari_Uyum_Gereksinimleri.docx", type: "belge", size: "850 KB", date: "18.06.2026", fileType: ".docx" }
    ];
  });

  const [uploadDocName, setUploadDocName] = useState("");
  const [uploadDocType, setUploadDocType] = useState<"sunum" | "belge">("sunum");
  const [uploadDocExt, setUploadDocExt] = useState(".pptx");
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  // 6. Geliştirme Aşamaları / Geliştirme Günlüğü State (PROJEYİ NASIL YAPTIK?)
  const [devStages, setDevStages] = useState<{
    id: string;
    stageIndex: number;
    title: string;
    subTitle: string;
    description: string;
    owner: string;
    details: string;
    tag: string;
    status: "Tamamlandı" | "Devam Ediyor" | "Planlandı";
    date: string;
  }[]>(() => {
    const saved = localStorage.getItem("muhafiz_dev_stages");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: "ds1",
        stageIndex: 1,
        title: "Problemin Tanılanması ve Araştırma",
        subTitle: "Sosyal Medyadaki Dil Yozlaşması ve Tespiti",
        description: "Günlük hayatta ve mesajlaşma dilinde sesli harflerin yutulması, Türkçeye yabancı kelime yerleştirme tembelliğinin araştırılması.",
        owner: "İrem Nas BAŞER",
        details: "Proje başlangıcında ortaokul seviyesindeki arkadaşlarımızın internet üzerinde yaptığı konuşma analizleri ile yola çıkıldı. 'slm, nbr, tmm, okey, bro' gibi dil yozlaşmalarını tespit ederek TDK karşılıklarını araştırdık we düzeltme mantığını kurguladık.",
        tag: "Araştırma 🔍",
        status: "Tamamlandı",
        date: "20.06.2026"
      },
      {
        id: "ds2",
        stageIndex: 2,
        title: "Yapay Zeka Prompt Mühendisliği",
        subTitle: "Bizim Masal Maskotlarımızla TDK Yönergeleri",
        description: "Yapay zekanın kuru bir arayüz yerine Nasreddin Hoca, Hacivat, Karagöz gibi eğlenceli çocuk kahramanları tarzında tepki vermesinin tasarlanması.",
        owner: "Mustafa Alp KOÇAK",
        details: "Google Gemini 2.5 Flash API kullanarak prompt mühendisliği yaptık. Geliştirilen prompt şablonu, kullanıcı girdilerindeki dil temizliğini yaparken çocuklara özel tekerlemeli, şakacı anlatım biçimleri (Hacivat'ın nazik uyarıları, Karagöz'ün komik taklitleri, Nasreddin Hoca'nın bilge tekerlemeleri) üretmesini sağlıyor.",
        tag: "Prompt Tasarımı 🔮",
        status: "Tamamlandı",
        date: "22.06.2026"
      },
      {
        id: "ds3",
        stageIndex: 3,
        title: "Kültürel ve Teknik Mimari Tasarım",
        subTitle: "Model Katmanları ve Güvenlik Altyapısı",
        description: "Projenin yapı taşlarını modelleyen 3D katmanlar şeması, stratejik amaçlar grafiği ve entegrasyon şemalarının çizimi.",
        owner: "Cüneyt Eren ÇİFTÇİ",
        details: "Uygulamanın mimari tasarımını 4 ana düzeyde modeledik: Doğal Dil İşleme, Yapay Zeka Analizi, Düzeltme Motoru ve Kullanıcı Arayüzü. Ayrıca çocukların verilerini korumaya ve teknik-etik riskleri sınırlandırmaya dönük Güvenlik Çemberini tasarlayarak grafik şemlar halinde projemize dahil ettik.",
        tag: "Grafik & Tasarım 🎨",
        status: "Tamamlandı",
        date: "23.06.2026"
      },
      {
        id: "ds4",
        stageIndex: 4,
        title: "React & Tailwind Arayüz Geliştirme",
        subTitle: "Eğlenceli Oyun Akışı ve Gelişim Ağacı",
        description: "Çocukların sıkılmadan dil temizliğini takip edebilmesi adına gamification (oyunlaştırma) bileşenlerinin ve UI kodlamasının yapılması.",
        owner: "Zehra BAŞBOZKURT",
        details: "Vite, React 18, Tailwind CSS ve Lucide-react ikonlarını birleştirerek arayüz kodlamasını tamamladık. Çocukların rozet kazandığı Profil Kulübesi, deneyimleri kaydettikleri Hazine Sandığı ve başarı oranını simgeleyen Gelişim Ağacı gibi dinamik oyunlaştırma özelliklerini inşa ettik.",
        tag: "Arayüz Kodlama 💻",
        status: "Tamamlandı",
        date: "24.06.2026"
      },
      {
        id: "ds5",
        stageIndex: 5,
        title: "Sınıf Sunum Altyapısı ve Testler",
        subTitle: "Geliştirme Günlüğü ve Sunum Ekranı",
        description: "Yaptığımız tüm bu işlemleri öğretmenimize ve sınıftakilere bağımsız bir dille sunmamızı sağlayan Geliştirici Sunum Modunun yazılması.",
        owner: "Zehra BAŞBOZKURT",
        details: "Projeyi nasıl yaptığımızı interaktif slaytlar ve canlı düzenleyicilerle baştan sona anlatan, siteden bağımsız bir Sunum Modu geliştirdik. Bu sayede projenin çocuklara yönelik oyun arayüzü ile mühendislik yapılış hikayesi birbirinden pürüzsüzce ayrılmış oldu.",
        tag: "Sunum Entegrasyonu 📺",
        status: "Tamamlandı",
        date: "25.06.2026"
      }
    ];
  });

  // State elements for editing / adding stages
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [stageInputTitle, setStageInputTitle] = useState("");
  const [stageInputSubTitle, setStageInputSubTitle] = useState("");
  const [stageInputDesc, setStageInputDesc] = useState("");
  const [stageInputDetails, setStageInputDetails] = useState("");
  const [stageInputOwner, setStageInputOwner] = useState("Mustafa Alp KOÇAK");
  const [stageInputTag, setStageInputTag] = useState("Arayüz Kodlama 💻");
  const [stageInputStatus, setStageInputStatus] = useState<"Tamamlandı" | "Devam Ediyor" | "Planlandı">("Tamamlandı");
  const [stageInputDate, setStageInputDate] = useState("20.06.2026");

  // Sync to localstorage
  useEffect(() => {
    localStorage.setItem("muhafiz_dev_stages", JSON.stringify(devStages));
  }, [devStages]);

  useEffect(() => {
    localStorage.setItem("muhafiz_takim_uyeleri", JSON.stringify(teamMembers));
  }, [teamMembers]);

  useEffect(() => {
    localStorage.setItem("muhafiz_proje_plani", JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem("muhafiz_gorevler", JSON.stringify(projectTasks));
  }, [projectTasks]);

  useEffect(() => {
    localStorage.setItem("muhafiz_kayitli_ciktilar", JSON.stringify(savedOutputs));
  }, [savedOutputs]);

  useEffect(() => {
    localStorage.setItem("muhafiz_uploaded_docs", JSON.stringify(uploadedDocs));
  }, [uploadedDocs]);

  // Input States
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [correctorResult, setCorrectorResult] = useState<{
    originalText: string;
    correctedText: string;
    corrections: Correction[];
    engine: string;
  } | null>(null);

  // Focus Detail for a clicked word in corrected output
  const [selectedCorrection, setSelectedCorrection] = useState<Correction | null>(null);

  // Platform and Session Stats States
  const [totalPlatformCorrections, setTotalPlatformCorrections] = useState(218);
  const [platformStats, setPlatformStats] = useState<DynamicStats[]>([]);

  // "Günün Kelimesi" status
  const [dayWord, setDayWord] = useState<DayWord | null>(null);
  const [treasureOpened, setTreasureOpened] = useState(false);

  // User Profile State (Persisted in LocalStorage)
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("turkce_muhafizi_profil");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback below
      }
    }
    return {
      username: "Ömer Seyfettin",
      selectedAvatarId: "keloglan",
      totalCorrected: 0,
      rankXP: 0,
      unlockedBadges: []
    };
  });

  // Keep track of messages that loop during the loading phase
  const loadingMessages = [
    "Hacivat fırçasını temizliyor, Karagöz kelimeleri sayıyor... 🎨",
    "Nasreddin Hoca eşeğine ters binip yazıları kontrole çıktı... 🐴",
    "Keloğlan kurnaz aklıyla dezenformasyonu kovalıyor... 🌾",
    "Dede Korkut bilgece düşüncelere daldı, kelimelerin kökünü arıyor... 📜",
    "Türkçenin muhafızları pırıl pırıl bir savunma hattı kuruyor... 🛡️"
  ];

  // Save profile to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem("turkce_muhafizi_profil", JSON.stringify(profile));
  }, [profile]);

  // Fetch Stats and Günün Kelimesi on mount
  useEffect(() => {
    fetchStats();
    fetchWordOfTheDay();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success) {
        setPlatformStats(data.stats);
        setTotalPlatformCorrections(data.totalCorrections);
      }
    } catch (e) {
      console.error("Error fetching platform stats:", e);
    }
  };

  const fetchWordOfTheDay = async () => {
    try {
      const res = await fetch("/api/word-of-the-day");
      const data = await res.json();
      if (data.success) {
        setDayWord(data);
      }
    } catch (e) {
      console.error("Error fetching Word of the Day:", e);
    }
  };

  // Gamification: Trigger new badges check based on current actions
  const checkAndUnlockBadges = (newTotalCorrected: number, badgeTriggerType?: string) => {
    setProfile(prev => {
      const updatedBadges = [...prev.unlockedBadges];
      let changed = false;

      // Rule 1: First correction
      if (newTotalCorrected >= 1 && !updatedBadges.includes("ilk-muhafiz")) {
        updatedBadges.push("ilk-muhafiz");
        changed = true;
      }
      // Rule 2: Word Hunter (5 corrections)
      if (newTotalCorrected >= 5 && !updatedBadges.includes("kelime-avcisi")) {
        updatedBadges.push("kelime-avcisi");
        changed = true;
      }
      // Rule 3: Pure Turkish Champion (10 corrections)
      if (newTotalCorrected >= 10 && !updatedBadges.includes("turkce-hayati")) {
        updatedBadges.push("turkce-hayati");
        changed = true;
      }
      // Rule 4: Treasure explorer (discovered Word of the Day)
      if (badgeTriggerType === "treasure" && !updatedBadges.includes("hazine-avcisi")) {
        updatedBadges.push("hazine-avcisi");
        changed = true;
      }
      // Rule 5: View stats
      if (badgeTriggerType === "stats" && !updatedBadges.includes("hacivat-ortagi")) {
        updatedBadges.push("hacivat-ortagi");
        changed = true;
      }

      if (changed) {
        return {
          ...prev,
          totalCorrected: newTotalCorrected,
          rankXP: newTotalCorrected * 10,
          unlockedBadges: updatedBadges
        };
      }

      return {
        ...prev,
        totalCorrected: newTotalCorrected,
        rankXP: newTotalCorrected * 10
      };
    });
  };

  const handleCorrectText = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setSelectedCorrection(null);
    setCorrectorResult(null);

    // Initial message
    setLoadingMessage(loadingMessages[0]);
    let index = 1;
    const interval = setInterval(() => {
      setLoadingMessage(loadingMessages[index % loadingMessages.length]);
      index++;
    }, 1500);

    try {
      const response = await fetch("/api/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText })
      });
      const data = await response.json();

      if (data.success) {
        setCorrectorResult(data);

        // Update score based on the count of newly detected/corrected issues!
        const correctCount = data.corrections ? data.corrections.length : 0;
        if (correctCount > 0) {
          const newTotal = profile.totalCorrected + correctCount;
          checkAndUnlockBadges(newTotal);
        }

        // Fetch fresh stats to update the Scoreboard in real-time
        fetchStats();
      }
    } catch (err) {
      console.error("Correction failed:", err);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  // Helper to replace individual word in textarea from the correction card
  const replaceWord = (original: string, corrected: string) => {
    const escaped = original.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    const updated = inputText.replace(regex, corrected);
    setInputText(updated);

    // Remove it from the current highlighted correction list so it disappears as fixed!
    if (correctorResult) {
      const remainingCorrections = correctorResult.corrections.filter(
        c => c.original.toLowerCase() !== original.toLowerCase()
      );
      setCorrectorResult({
        ...correctorResult,
        corrections: remainingCorrections
      });
    }
    setSelectedCorrection(null);
  };

  // Magic auto correct all words at once!
  const handleAutoCorrectAll = () => {
    if (!correctorResult) return;
    setInputText(correctorResult.correctedText);
    setCorrectorResult({
      ...correctorResult,
      corrections: []
    });
    setSelectedCorrection(null);
  };

  // Reset the text area
  const handleReset = () => {
    setInputText("");
    setCorrectorResult(null);
    setSelectedCorrection(null);
  };

  // Switch to scorecard with analytics badge checker
  const handleViewScoreboard = () => {
    setActiveTab("skorbord");
    checkAndUnlockBadges(profile.totalCorrected, "stats");
  };

  const handleOpenTreasure = () => {
    setTreasureOpened(true);
    checkAndUnlockBadges(profile.totalCorrected, "treasure");
  };

  const handleMockUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadDocName.trim()) return;
    
    let finalName = uploadDocName.trim();
    if (!finalName.endsWith(uploadDocExt)) {
      finalName += uploadDocExt;
    }
    
    const newDoc = {
      id: "doc_" + Date.now(),
      name: finalName,
      type: uploadDocType,
      size: (Math.random() * 5 + 0.5).toFixed(1) + " MB",
      date: new Date().toLocaleDateString("tr-TR"),
      fileType: uploadDocExt
    };
    
    setUploadedDocs(prev => [newDoc, ...prev]);
    setUploadDocName("");
  };

  // Child-friendly Level and rank calculator
  const calculateLevel = (xp: number) => {
    // Stage-based titles for children
    const level = 1 + Math.floor(xp / 30);
    let title = "Dil Gözcüsü Çırağı";
    if (level >= 8) title = "Büyük Türkçe Kağanı 👑";
    else if (level >= 6) title = "Vezir Dil Koruyucusu ⚜️";
    else if (level >= 4) title = "Başbuğ Kelime Akıncısı 🛡️";
    else if (level >= 3) title = "Kıdemli Türkçe Gözcüsü 👁️";
    else if (level >= 2) title = "Kelime Muhafız Erbaş 💫";

    return { level, title };
  };

  const { level: userLevel, title: userTitle } = calculateLevel(profile.rankXP);

  // Render the original sentence but with custom interactive highlights where kids can click!
  const renderHighlightedSentence = () => {
    if (!correctorResult) return null;

    const originalText = correctorResult.originalText;
    const correctionsList = correctorResult.corrections || [];

    if (correctionsList.length === 0) {
      return (
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-lg font-medium flex items-center gap-3 animate-kids-wiggle">
          <CheckCircle2 className="text-teal-600 shrink-0" size={24} />
          <span>Tebrikler! Dezenformasyona uğramış hiçbir kelime bulamadık. Kelimelerin pırıl pırıl parlıyor!</span>
        </div>
      );
    }

    // Build regex of original misspelled words to tokenise the text
    const wordsToMatch = correctionsList.map(c => c.original);
    
    // Split text by these specific words so we can output interactive elements
    const escapedWords = wordsToMatch.map(w => w.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
    
    const parts = originalText.split(regex);

    return (
      <div className="p-5 bg-white border-2 border-stone-200 rounded-xl text-stone-800 leading-relaxed text-lg font-medium shadow-inner">
        <label className="block text-xs uppercase font-bold tracking-wider text-stone-400 mb-2">Metnin ve Tespit Edilenler (Tıkla ve Düzelt!):</label>
        {parts.map((part, i) => {
          const match = correctionsList.find(c => c.original.toLowerCase() === part.toLowerCase());
          if (match) {
            // Pick appropriate highlight color based on error type
            let underlineClass = "wavey-underline";
            let tagColor = "bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300";
            if (match.type.includes("Yabancı")) {
              underlineClass = "wavey-underline-foreign";
              tagColor = "bg-sky-100 hover:bg-sky-200 text-sky-950 border-sky-300";
            } else if (match.type.includes("Bozumu")) {
              underlineClass = "wavey-underline-broken";
              tagColor = "bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-emerald-300";
            } else if (match.type.includes("Tembelliği")) {
              underlineClass = "wavey-underline-keyboard";
              tagColor = "bg-yellow-100 hover:bg-yellow-200 text-yellow-950 border-yellow-300";
            }

            const active = selectedCorrection?.original.toLowerCase() === part.toLowerCase();

            return (
              <span
                key={i}
                className={`${underlineClass} px-1.5 py-0.5 rounded-md border-0 transition-all ${tagColor} ${
                  active ? "ring-2 ring-clay-500 scale-105 inline-block" : ""
                }`}
                onClick={() => setSelectedCorrection(match)}
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F7F3EF] flex flex-col justify-between font-sans text-[#2D241E]">
      
      {/* Top Professional Polish Header with Cultural Motifs */}
      <header className="bg-[#009393] border-b-4 border-[#007A7A] relative overflow-hidden shadow-md text-white">
        {/* Background motif pattern with opacity-10 */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0l20 20-20 20L0 20z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E')` }}
        />
        
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center gap-4">
            {/* Logo image inside header */}
            <div className="animate-kids-wiggle w-14 h-14 bg-white rounded-full border-2 border-[#D4A373] flex items-center justify-center shadow-inner overflow-hidden shrink-0">
              <img 
                src={logoTurkceMuhafizi} 
                alt="Türkçe Kelime Muhafızı" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-kids font-bold text-white tracking-tight">Türkçe Kelime Muhafızı</h1>
                <span className="bg-[#E9EDC9] text-[#5A5A40] text-xs font-bold px-2.5 py-1 rounded-full border border-[#CCD5AE] font-kids">7-18 Yaş</span>
              </div>
              <p className="text-xs text-white/90 max-w-md font-sans font-medium">
                Geleneksel karakterlerimiz Hoca, Hacivat ve Keloğlan ile dezenformasyona dur de, dilimizi pırıl pırıl koru!
              </p>
            </div>
          </div>

          {/* Dil Muhafızı Mini Profile Status Tracker in theme style */}
          <div 
            onClick={() => setActiveTab("profil")}
            className="flex items-center gap-3 bg-[#E9EDC9] px-4 py-2 rounded-full border border-[#CCD5AE] text-[#5A5A40] cursor-pointer transition-all hover:brightness-95 self-stretch sm:self-auto select-none font-kids"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-[#D4A373] flex items-center justify-center overflow-hidden shrink-0">
              <MascotAvatar name={profile.selectedAvatarId} size={32} animated={false} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 text-xs font-bold">
                <span>{profile.username}</span>
                <span className="opacity-95 bg-white/50 px-1.5 py-0.5 rounded text-[10px]">Seviye {userLevel}</span>
              </div>
              <div className="w-24 bg-white/40 h-1.5 rounded-full overflow-hidden mt-1 border border-white/20">
                <div 
                  className="bg-[#009393] h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (profile.rankXP % 30) * 3.3)}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Responsive Mobile Trigger Bar */}
        <div className="lg:hidden max-w-6xl mx-auto px-4 pb-4 flex justify-between items-center relative z-10">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full bg-[#E9EDC9] hover:bg-[#D8DEB0] border-2 border-[#CCD5AE] text-[#5A5A40] font-kids font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <ClipboardList size={18} className="text-[#009393]" />
            <span>{isSidebarOpen ? "Menüyü Kapat ✕" : "Türkçe Muhafızı Araçlar Menüsü 🛠️"}</span>
          </button>
        </div>

      </header>

      {/* Responsive Grid containing Left Sidebar & Right Content Stage */}
      <main className="max-w-7xl w-full mx-auto px-4 py-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
        
        {/* Left Sidebar - Araçlar Menüsü & Geliştirme Bölümleri */}
        <aside className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block lg:col-span-3 bg-white p-5 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373] space-y-6 relative transition-all z-20`}>
          
          {/* Section 1: Children's App - Dil Muhafızlığı Oyunu */}
          <div>
            <h3 className="text-xs uppercase font-extrabold text-[#5A5A40] tracking-wider mb-2 font-kids flex items-center gap-1.5">
              <span>🛡️</span> DİL MUHAFIZLIĞI OYUNU
            </h3>
            <div className="space-y-1.5">
              {[
                { id: "duzeltici", label: "Kelime Analizörü 🔮", icon: <Sparkles size={18} /> },
                { id: "gunun-kelimesi", label: "Hazine Sandığı 📜", icon: <Compass size={18} /> },
                { id: "skorbord", label: "Gelişim Ağacı 🌳", icon: <TrendingUp size={18} /> },
                { id: "profil", label: "Profil Kulübesi 👤", icon: <User size={18} /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsSidebarOpen(false); // Close on mobile click
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-kids font-bold text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === item.id
                      ? "bg-[#009393] text-white shadow-md transform translate-x-1"
                      : "bg-[#FDFCF0] hover:bg-[#E9EDC9] text-[#2D241E] border border-[#CCD5AE]"
                  }`}
                >
                  <span className={activeTab === item.id ? "text-white" : "text-[#009393]"}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-stone-100" />

          {/* Section 2: Projeyi Nasıl Yaptık? - Developer Toolbar */}
          <div>
            <h3 className="text-xs uppercase font-extrabold text-[#E07A5F] tracking-wider mb-2 font-kids flex items-center gap-1.5 animate-pulse">
              <span>💻</span> PROJEYİ NASIL YAPTIK?
            </h3>
            <div className="space-y-1.5">
              {[
                { id: "yapim-asamalari", label: "Yapım Aşamalarımız 📝", icon: <FileText size={18} /> },
                { id: "sunum-modu", label: "Sunum Modu (Bağımsız) 📺", icon: <Tv size={18} /> },
                { id: "takim-uyeleri", label: "Geliştirici Ekibimiz 👥", icon: <Users size={18} /> },
                { id: "yapi-taslari", label: "Proje Yapı Taşları 🧱", icon: <Layers size={18} /> },
                { id: "proje-plani", label: "Proje Planı 📅", icon: <Calendar size={18} /> },
                { id: "gorevler", label: "Görev Dağılımı 📋", icon: <CheckSquare size={18} /> },
                { id: "tum-cikti", label: "Tüm Çıktılar ✍️", icon: <FileSpreadsheet size={18} /> },
                { id: "belgeler-sunumlar", label: "Belgeler & Sunumlar 📂", icon: <Folder size={18} /> },
                { id: "gelistirilebilirlik", label: "Geliştirilebilirlik Kaynakları 📚", icon: <BookOpen size={18} /> },
                { id: "sosyal-medya", label: "Sosyal Medya Paylaşımları 📱", icon: <Share2 size={18} /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsSidebarOpen(false); // Close on mobile click
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl font-kids font-bold text-xs sm:text-sm transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === item.id
                      ? "bg-[#E07A5F] text-white shadow-md transform translate-x-1"
                      : "bg-[#FFFDF5] hover:bg-[#FEEFDF] text-[#2D241E] border border-[#CCD5AE]"
                  }`}
                >
                  <span className={activeTab === item.id ? "text-white" : "text-[#E07A5F]"}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Project statistics widget summary */}
          <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-[#CCD5AE] space-y-2 text-xs">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#E07A5F] block">Grup Projesi Durumu:</span>
            <div className="flex justify-between items-baseline">
              <span className="text-[#5A5A40] font-sans">Yapım Aşama Sayısı:</span>
              <span className="font-mono font-bold text-[#009393]">
                {devStages.length} Aşama
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-dashed border-stone-200/50 pt-1.5">
              <span className="text-[#5A5A40] font-sans">Tamamlanan Milat:</span>
              <span className="font-mono font-bold text-[#009393]">
                {milestones.filter(m => m.status === "tamamlandi").length}/{milestones.length}
              </span>
            </div>
            <div className="flex justify-between items-baseline border-t border-dashed border-stone-200/50 pt-1.5">
              <span className="text-[#5A5A40] font-sans">Grup Çıktı Sayısı:</span>
              <span className="font-mono font-bold text-[#009393]">{savedOutputs.length}</span>
            </div>
          </div>

        </aside>

        {/* Right Stage Panel - Dynamic Views (`lg:col-span-9`) */}
        <div className="lg:col-span-9 w-full space-y-6">
        
        {/* TAB 1: INTERACTIVE CORRECTOR */}
        {activeTab === "duzeltici" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Box Panel with retro drop shadow and warm border */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373] flex flex-col gap-4">
              
              <div className="flex items-center justify-between">
                <span className="font-kids font-bold text-lg text-[#2D241E] flex items-center gap-2">
                  <BookMarked className="text-[#009393]" />
                  Kelimelerini Kontrol Et
                </span>
                <span className="text-xs font-mono text-[#D4A373]">Yapay Zeka Kelime Denetimi...</span>
              </div>

              {/* Sample Texts pre-selector */}
              <div>
                <label className="block text-xs font-bold text-[#5A5A40] mb-2 font-kids uppercase tracking-wider">Hızlı Örneklerle Dene:</label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_TEXTS.map((sample, key) => (
                    <button
                      key={key}
                      onClick={() => setInputText(sample.text)}
                      title={sample.description}
                      className="bg-[#FDFCF0] hover:bg-[#E9EDC9] hover:border-[#CCD5AE] font-semibold text-[#5A5A40] px-3 py-1.5 rounded-full border border-[#CCD5AE] transition-all cursor-pointer text-xs"
                    >
                      {sample.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input area */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder="Sevgili çocuk, buraya dilediğin metni yazıp kontrol et butonuna tıklayarak hatalı, yabancı veya harfi yutulmuş kelimelerin doğrusunu maskotlarımızın eğlenceli tekerlemeleriyle öğrenebilirsin..."
                  rows={6}
                  className="w-full bg-[#FDFCF0] hover:bg-[#FDFCF0]/80 focus:bg-white text-[#2D241E] text-lg p-4 rounded-2xl border-2 border-[#E9EDC9] focus:border-[#D4A373] focus:outline-none transition-all placeholder-stone-400 font-sans"
                />
                
                {inputText && (
                  <button
                    onClick={handleReset}
                    className="absolute bottom-4 right-4 bg-stone-200 hover:bg-stone-300 text-stone-600 p-2 rounded-full transition-all cursor-pointer"
                    title="Temizle"
                  >
                    <RotateCcw size={16} />
                  </button>
                )}
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleCorrectText}
                  disabled={loading || !inputText.trim()}
                  className="flex-1 bg-[#009393] hover:bg-[#007A7A] disabled:bg-stone-200 disabled:text-stone-400 text-white font-kids font-bold text-lg py-3.5 px-6 rounded-2xl cursor-pointer shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles size={22} className={loading ? "animate-spin" : ""} />
                  {loading ? "Muhafızlar İnceliyor..." : "Yapay Zeka ile Analiz Et 🔮"}
                </button>
              </div>

              {/* Loading Display Box */}
              {loading && (
                <div className="p-6 bg-[#FDFCF0] border-2 border-dashed border-[#CCD5AE] rounded-2xl text-center space-y-4 animate-pulse">
                  <div className="flex justify-center gap-4">
                    <div className="animate-bounce">
                      <HacivatAvatar size={48} />
                    </div>
                    <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                      <KaragozAvatar size={48} />
                    </div>
                    <div className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                      <NasreddinHocaAvatar size={48} />
                    </div>
                  </div>
                  <p className="text-[#009393] font-kids font-bold text-base">{loadingMessage}</p>
                </div>
              )}

              {/* Corrector Response Outputs */}
              {correctorResult && !loading && (
                <div className="space-y-4">
                  
                  {/* Highlight text renderer */}
                  {renderHighlightedSentence()}

                  {/* Dynamic Help prompt if errors found */}
                  {correctorResult.corrections && correctorResult.corrections.length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-[#E9EDC9] border border-[#CCD5AE] text-[#5A5A40] rounded-xl">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={18} className="text-[#009393] shrink-0" />
                        <span className="text-sm font-medium">Kelimelerin üzerine tıklayıp doğrusunu görebilirsin!</span>
                      </div>
                      <button
                        onClick={handleAutoCorrectAll}
                        className="bg-white hover:bg-[#FDFCF0] text-[#D4A373] border border-[#CCD5AE] text-xs font-black px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer font-kids"
                      >
                        Sihirli Dokunuşla Hepsini Düzelt ✨
                      </button>
                    </div>
                  )}

                  {saveSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-bounce">
                      <span>🎉 Başarılı! Kelime düzeltme analizi 'Tüm Çıktılar' listesine 'Proje Çıktısı' olarak başarıyla kaydedildi!</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-stone-150">
                    <button
                      onClick={() => {
                        const newOutput = {
                          id: "out_" + Date.now(),
                          originalText: correctorResult.originalText,
                          correctedText: correctorResult.correctedText,
                          correctionsCount: correctorResult.corrections ? correctorResult.corrections.length : 0,
                          timestamp: new Date().toLocaleString("tr-TR"),
                          notes: "Yapay zeka analizörümüz yardımıyla başarıyla incelenip temizlenen dil çıktısı."
                        };
                        setSavedOutputs(prev => [newOutput, ...prev]);
                        setSaveSuccess(true);
                        setTimeout(() => setSaveSuccess(false), 4000);
                      }}
                      className="w-full sm:w-auto bg-[#009393] hover:bg-[#007A7A] text-white text-xs font-kids font-bold py-2.5 px-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Save size={14} />
                      🔮 Bu Analizi Proje Çıktısı Olarak Kaydet
                    </button>
                    <div className="text-xs text-stone-400 font-mono">
                      İnceleme Motoru: <span className="text-[#009393] font-bold">{correctorResult.engine}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Left Box Panel: Mascot Speech bubbles / Dynamic detail Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {selectedCorrection ? (
                // Beautifully designed interactive bubble based on selected correction
                <div className="bg-white border-2 border-[#E07A5F] rounded-3xl p-5 shadow-[8px_8px_0px_rgba(224,122,95,0.4)] relative animate-kids-wiggle">
                  
                  {/* Crown Accent top-right */}
                  <div className="absolute top-[-15px] left-8 bg-[#E07A5F] text-white font-kids font-bold text-xs px-3 py-1 rounded-full border-2 border-white shadow-md">
                    {selectedCorrection.mascot} Anlatıyor 🎭
                  </div>

                  {/* Mascot Avatar and Comparison */}
                  <div className="flex gap-4 items-start pt-3 mb-4">
                    <div className="bg-[#FDFCF0] p-2.5 rounded-2xl border-2 border-[#E9EDC9]">
                      <MascotAvatar name={selectedCorrection.mascot} size={72} animated={true} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="block text-xs uppercase font-extrabold tracking-widest text-[#B18659]">Sözün Özü:</label>
                      <div className="flex items-center gap-3">
                        <span className="text-rose-500 line-through text-lg font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">{selectedCorrection.original}</span>
                        <span className="text-stone-400 font-bold">➡️</span>
                        <span className="text-[#009393] text-2xl font-kids font-extrabold bg-[#F1F9F9] px-3 py-1 rounded-lg border-2 border-[#009393]/30 shadow-sm">{selectedCorrection.corrected}</span>
                      </div>
                      <div className="pt-1.5">
                        <span className="bg-[#E9EDC9] text-[#5A5A40] border border-[#CCD5AE] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                          Hata Türü: {selectedCorrection.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Explanation Section */}
                  <div className="bg-[#FDFCF0] rounded-2xl p-4 border border-[#E9EDC9] space-y-3 shadow-inner">
                    <p className="text-[#2D241E] text-base font-sans font-medium italic relative">
                      &ldquo;{selectedCorrection.reason}&rdquo;
                    </p>
                    
                    <div className="border-t border-[#CCD5AE] pt-2 text-sm text-[#5A5A40]">
                      <span className="font-bold text-[#2D241E]">Örnek Kullanım:</span>
                      <p className="text-[#2D241E] italic font-medium bg-white p-2 rounded-xl mt-1.5 border border-[#CCD5AE]">
                        {selectedCorrection.example}
                      </p>
                    </div>
                  </div>

                  {/* Option to replace card directly */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => replaceWord(selectedCorrection.original, selectedCorrection.corrected)}
                      className="flex-1 bg-[#E07A5F] hover:bg-[#c7654a] text-white font-kids font-bold py-2.5 px-4 rounded-xl shadow cursor-pointer transition-all active:scale-[0.98]"
                    >
                      Sadece Bu Kelimeyi Düzelt 🛠️
                    </button>
                    <button
                      onClick={() => setSelectedCorrection(null)}
                      className="bg-[#F7F3EF] hover:bg-stone-200 text-[#5A5A40] border border-[#CCD5AE] px-4 rounded-xl transition-all cursor-pointer font-bold text-sm"
                    >
                      Kapat
                    </button>
                  </div>

                </div>
              ) : (
                // Default Helper panel if nothing selected yet
                <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373] flex flex-col gap-6 text-center text-[#2D241E]">
                  <div className="flex justify-center gap-1">
                    <NasreddinHocaAvatar size={80} />
                  </div>
                  <div>
                    <h3 className="text-xl font-kids font-bold text-[#5A5A40]">Hey Dostlar! Dil Muhafızlığına Hoş Geldiniz!</h3>
                    <p className="text-sm text-[#2D241E]/85 mt-2 leading-relaxed font-sans font-medium">
                      Lütfen soldaki kutuya cümleni yazıp dezenformasyon analizi başlat. Yanlış yazılan, harfi yutulmuş veya özentili kelimeleri tespit edip bu paneli pırıl pırıl dolduracağız!
                    </p>
                  </div>

                  <div className="bg-[#E9EDC9] p-4 rounded-2xl border border-[#CCD5AE] text-left space-y-3">
                    <h4 className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider font-kids">Muhafızlık Kuralları:</h4>
                    <ul className="text-xs text-[#5A5A40] space-y-2 font-sans font-medium">
                      <li className="flex items-center gap-2">
                        <span className="text-[#009393] font-bold">✓</span> Kelimeleri yazarken sesli harflerimizi (a, e, ı, i, o, ö, u, ü) kıskançça koru.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#009393] font-bold">✓</span> Klavyeni tembelleştirme, noktalarını eksiltme.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-[#009393] font-bold">✓</span> Yabancı slangler yerine sıcacık Türkçemizi konuş.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Informative Side Card: Dil Muhafızı Dereceleri */}
              <div className="bg-gradient-to-br from-[#009393] to-[#007A7A] text-white p-5 rounded-3xl shadow-lg border-2 border-[#009393] relative overflow-hidden">
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M20 0l20 20-20 20L0 20z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E')` }} />
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <Shield size={24} className="text-[#E9EDC9]" />
                  <h4 className="font-kids font-bold text-base">Haftalık Dil Muhafızı Skor Defteri</h4>
                </div>
                <p className="text-xs text-white/90 relative z-10 font-sans font-medium">
                  Bugün toplam <span className="font-bold underline text-white">{totalPlatformCorrections}</span> dezenformasyon kelime Muhafızlar tarafından temizlendi!
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4 text-center relative z-10">
                  <div>
                    <span className="block text-xl font-bold font-mono text-[#E9EDC9]">{profile.totalCorrected}</span>
                    <span className="text-[10px] text-white/80 uppercase tracking-wide font-sans font-bold">Düzelttiğin Kelime</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold font-mono text-[#E9EDC9]">{profile.rankXP}</span>
                    <span className="text-[10px] text-white/80 uppercase tracking-wide font-sans font-bold">Duyarlılık Puanın (XP)</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SCOREBOARD & SUCCESS DIL AGACI */}
        {activeTab === "skorbord" && (
          <div className="space-y-6">
            
            {/* Header intro with professional shadow and border */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E]">Başarı Ağacı & Karıştırılan Kelimeler</h2>
                  <span className="bg-[#E9EDC9] text-[#5A5A40] text-xs font-bold px-2.5 py-1 rounded-full border border-[#CCD5AE] font-kids">Dinamik Platform Skorları</span>
                </div>
                <p className="text-sm text-[#2D241E]/80">
                  Öğrencilerimiz tarafından en çok yazılan, dezenformasyona uğramış kelimelerin güncel listesi ve senin düzeltme ağacının yeşerme süreci!
                </p>
              </div>

              {/* dynamic score summary */}
              <div className="bg-[#FDFCF0] border-2 border-[#CCD5AE] px-6 py-4 rounded-2xl text-center shadow-inner shrink-0 font-kids">
                <span className="text-xs text-[#5A5A40] capitalize block font-bold">Düzeltme Başarı Ağacı</span>
                <span className="text-3xl font-mono font-bold text-[#009393] block">{profile.totalCorrected} Dal Blooming</span>
                <p className="text-[10px] text-stone-500 mt-1">Ağacın her 3 düzeltmede bir elma verecektir!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Blooming Success Tree Visual widget */}
              <div className="lg:col-span-5 bg-white p-5 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)] flex flex-col items-center text-center text-[#2D241E]">
                <span className="font-kids font-bold text-base text-stone-700 block mb-2">Benim Dil Muhafızlığı Gelişim Ağacım 🌳</span>
                
                {/* Custom SVG Tree rendering apples representing rescued words */}
                <div className="w-full max-w-[280px] h-[280px] bg-[#FDFCF0] rounded-2xl relative border-2 border-[#E9EDC9] flex items-center justify-center overflow-hidden my-4">
                  
                  {/* Tree Trunk & branches */}
                  <svg width="220" height="240" viewBox="0 0 100 100" className="absolute bottom-0 z-0 pointer-events-none">
                    {/* Trunk */}
                    <path d="M45 100 L47 70 C47 70, 35 60, 25 65 M47 70 Q50 45, 52 35 M52 35 Q55 20, 75 10 M52 35 L48 25" stroke="#78350F" strokeWidth="6" strokeLinecap="round" fill="none" />
                    
                    {/* Foliage Green background circles */}
                    <circle cx="50" cy="40" r="24" fill="#22C55E" opacity="0.8" />
                    <circle cx="35" cy="48" r="18" fill="#16A34A" opacity="0.8" />
                    <circle cx="65" cy="48" r="18" fill="#15803D" opacity="0.8" />
                    <circle cx="50" cy="25" r="16" fill="#4ADE80" opacity="0.7" />
                  </svg>

                  {/* Render apples dynamically on tree based on score */}
                  {Array.from({ length: Math.min(10, Math.floor(profile.totalCorrected / 2)) }).map((_, i) => {
                    // Predefined apple positions so they match the branches perfectly
                    const appleCoords = [
                      { left: "45%", top: "35%", delay: "0.1s" },
                      { left: "30%", top: "45%", delay: "0.4s" },
                      { left: "62%", top: "42%", delay: "0.2s" },
                      { left: "52%", top: "20%", delay: "0.3s" },
                      { left: "40%", top: "50%", delay: "0.5s" },
                      { left: "58%", top: "30%", delay: "0.7s" },
                      { left: "25%", top: "40%", delay: "0.6s" },
                      { left: "70%", top: "48%", delay: "0.8s" },
                      { left: "48%", top: "42%", delay: "0.9s" },
                      { left: "35%", top: "28%", delay: "1.0s" },
                    ];
                    const pos = appleCoords[i] || { left: "50%", top: "50%", delay: "0.1s" };

                    return (
                      <div
                        key={i}
                        className="absolute w-8 h-8 z-15 animate-kids-wiggle"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          animationDelay: pos.delay
                        }}
                      >
                        {/* Red shiny elma SVG */}
                        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
                           <path d="M12 2C13.5 2 14.5 3 14 5C17.5 5 21 8 21 12.5C21 17.5 17 21 12 21C7 21 3 17.5 3 12.5C3 8 6.5 5 10 5C9.5 3 10.5 2 12 2Z" fill="#EF4444" />
                          <path d="M12 2C11 3 10 4 10 5H14" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="9" cy="11" r="1.5" fill="#FFF" opacity="0.4" />
                        </svg>
                      </div>
                    );
                  })}

                  {profile.totalCorrected < 2 && (
                    <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-20 rounded-xl">
                      <p className="text-white text-xs font-bold leading-normal text-center">
                        Bahçende elma yetiştirmek için en az 2 dezenformasyon kurtarman gerekiyor. Haydi akıncı!
                      </p>
                    </div>
                  )}

                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-stone-700">Dil Bahçesi Hasadı</h4>
                  <p className="text-xs text-stone-500 leading-normal">
                    Dil muhafızı, düzelttiğin her dezenformasyon kelimesi bu başarı ağacını pırıl pırıl besliyor! Toplamda <span className="font-bold text-[#009393]">{Math.floor(profile.totalCorrected / 2)} adet elma</span> büyüttün.
                  </p>
                </div>

              </div>

              {/* Dynamic Confused Words Scoreboard */}
              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)] flex flex-col gap-4 text-[#2D241E]">
                <span className="font-kids font-bold text-base text-stone-700 flex items-center gap-2">
                  <TrendingUp className="text-[#009393]" />
                  Kelimelerin Şampiyonlar Tablosu (En Çok Karıştırılanlar)
                </span>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2">
                  {platformStats.length > 0 ? (
                    platformStats.map((item, idx) => {
                      // Determine badge or fire based on indices
                      let positionBadge = "bg-stone-100 text-stone-500 border-stone-200";
                      if (idx === 0) positionBadge = "bg-yellow-100 text-yellow-800 border-yellow-300 ring-2 ring-yellow-400";
                      else if (idx === 1) positionBadge = "bg-slate-100 text-slate-800 border-slate-300 ring-1 ring-slate-400";
                      else if (idx === 2) positionBadge = "bg-amber-100 text-amber-800 border-amber-300";

                      return (
                        <div 
                          key={idx}
                          className="bg-[#FDFCF0] hover:bg-[#E9EDC9] border border-[#CCD5AE] rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-kids font-bold ${positionBadge}`}>
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-rose-500 line-through text-sm font-semibold">{item.word}</span>
                                <span className="text-stone-400">➡️</span>
                                <span className="text-[#009393] text-base font-bold bg-white px-2 py-0.5 rounded border border-[#CCD5AE]">{item.corrected}</span>
                              </div>
                              <p className="text-[10px] text-stone-500 pr-4 mt-1 leading-normal italic">&ldquo;{item.reason}&rdquo;</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-0 pt-2 sm:pt-0">
                            <span className="bg-white/80 text-[#5A5A40] border border-[#CCD5AE] text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                              {item.type}
                            </span>
                            <span className="bg-rose-50 text-rose-750 font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1.5 shadow-sm">
                              <Flame size={12} className="text-red-500 shrink-0" />
                              {item.count} Kurtarılma
                            </span>
                          </div>

                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-stone-400 text-sm">
                      Lütfen kelime düzeltici sekmesinde bir şeyler aratın. Skorlar yüklenecektir!
                    </div>
                  )}
                </div>

                <div className="p-3 bg-[#E9EDC9] border border-[#CCD5AE] rounded-xl text-xs text-[#5A5A40] leading-relaxed font-sans">
                  💡 <span className="font-bold text-[#2D241E]">Dil Muhafızlığı İnfografiği:</span> Bu tablodaki düzeltme sayıları, tüm akranlarınla kurduğunuz ortak mücadelenin eseridir. En çok karıştırılan kelimeleri görerek kendimizi daha güçlü kılabiliriz!
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 3: DAILY WORD (TREASURE POPUP OR PERMANENT CARD) */}
        {activeTab === "gunun-kelimesi" && (
          <div className="max-w-xl mx-auto py-4">
            
            {!treasureOpened ? (
              // Locked Interactive treasure screen
              <div className="bg-white border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373] p-8 rounded-3xl text-center space-y-6 flex flex-col items-center">
                
                <div className="w-28 h-28 bg-[#FDFCF0] rounded-full border-2 border-[#CCD5AE] flex items-center justify-center relative animate-kids-wiggle">
                  <div className="text-5xl">🎁</div>
                  <div className="absolute top-0 right-0 bg-[#E07A5F] text-white font-kids font-bold text-xs p-1 rounded-full animate-bounce">Yeni!</div>
                </div>

                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E]">Altın Hazine Sandığı</h2>
                  <p className="text-sm text-[#2D241E]/80 mt-2 max-w-sm mx-auto font-sans font-medium">
                    Heyecan verici bir Türkçe kelime ve onun ardındaki sevimli geleneksel hikayeyi keşfetmek için kutsal sandığın kilidini aç, Muhafız!
                  </p>
                </div>

                <button
                  onClick={handleOpenTreasure}
                  className="bg-[#E07A5F] hover:bg-[#c7654a] border-2 border-[#E07A5F] text-white font-kids font-bold text-lg py-3 px-8 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer shadow-[4px_4px_0px_rgba(224,122,95,0.3)]"
                >
                  Sandığın Kilidini Kaldır ve Oku 🔑
                </button>

              </div>
            ) : (
              // Elegant illuminated manuscript of the DayWord
              dayWord && (
                <div className="bg-gradient-to-b from-[#FFFDF5] to-[#FDFCF0] border-2 border-[#E07A5F] p-6 rounded-3xl shadow-[8px_8px_0px_rgba(224,122,95,0.4)] space-y-5 relative animate-kids-wiggle">
                  
                  {/* Decorative corner borders representing Turkish pattern ornaments */}
                  <div className="absolute top-2 left-2 text-[#E07A5F] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute top-2 right-2 text-[#E07A5F] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute bottom-2 left-2 text-[#E07A5F] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute bottom-2 right-2 text-[#E07A5F] opacity-30 text-xl font-bold">❈</div>

                  <div className="text-center pt-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#E07A5F] animate-pulse">Kültür Defterimizden</span>
                    <h2 className="text-3xl font-kids font-bold text-[#5A5A40] mt-1">Günün Kültür Kelimesi 📜</h2>
                    <p className="text-xs text-stone-400 mt-1">Her gün farklı bilgi sandığı açılır!</p>
                  </div>

                  {/* Word Display Banner */}
                  <div className="bg-[#FEF6E4] border-2 border-[#E07A5F]/40 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <span className="text-xs font-bold text-[#E07A5F]/80 block">Dezenformasyon Hali:</span>
                      <span className="text-rose-600 line-through text-lg font-semibold">{dayWord.original}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#E07A5F] font-bold text-xl">➡️</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#E07A5F]/80 block">Pürüzsüz Türkçe:</span>
                      <span className="text-[#009393] text-2xl font-kids font-extrabold block">{dayWord.corrected}</span>
                    </div>
                  </div>

                  {/* Fun story / tongue twister explanation */}
                  <div className="bg-[#FDFCF0] border border-[#CCD5AE] p-4 rounded-xl shadow-inner space-y-3">
                    <span className="bg-[#E9EDC9] text-[#5A5A40] text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border border-[#CCD5AE]">
                      Hoca der ki / Tekerleme
                    </span>
                    <p className="text-[#2D241E] text-base leading-relaxed italic font-medium font-sans">
                      &ldquo;{dayWord.story}&rdquo;
                    </p>
                  </div>

                  {/* Example */}
                  <div className="bg-white/95 p-4 rounded-xl border border-[#CCD5AE] shadow-inner">
                    <span className="text-xs font-bold text-stone-800 block mb-1">Cümle İçinde Kullanalım:</span>
                    <p className="text-[#E07A5F] italic font-semibold text-sm">
                      {dayWord.example}
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setInputText(`Millet ${dayWord.original} yazmış ama doğrusu ${dayWord.corrected} imiş!`);
                        setActiveTab("duzeltici");
                      }}
                      className="flex-1 bg-[#009393] hover:bg-[#007A7A] text-white text-sm font-kids font-bold py-2.5 px-4 rounded-xl transition-all shadow cursor-pointer text-center"
                    >
                      Düzelticimizde Dene 🛠️
                    </button>
                    <button
                      onClick={() => setTreasureOpened(false)}
                      className="bg-[#F7F3EF] hover:bg-[#E9EDC9] text-[#5A5A40] border border-[#CCD5AE] text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Kutuyu Kapat
                    </button>
                  </div>

                </div>
              )
            )}

          </div>
        )}

        {/* TAB 5: PROJE PLANI */}
        {activeTab === "proje-plani" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <Calendar className="text-[#009393]" />
                    Sınıf Proje Yol Haritası 📅
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans">
                    Türkçemizi koruma yolculuğunda sınıfça attığımız adımları ve gelecek planlarımızı buradan takip edebilirsin.
                  </p>
                </div>
                <div className="bg-[#E9EDC9] px-4 py-2 rounded-xl text-center border border-[#CCD5AE]">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#5A5A40] block font-sans">Tamamlanan Milat</span>
                  <span className="text-xl font-kids font-bold text-[#009393] font-mono">
                    {milestones.filter(m => m.status === "tamamlandi").length} / {milestones.length}
                  </span>
                </div>
              </div>

              {/* Add Milestone Form */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newMilestoneTitle.trim() || !newMilestoneDate.trim()) return;
                  const newMil = {
                    id: "mil_" + Date.now(),
                    title: newMilestoneTitle,
                    date: newMilestoneDate,
                    status: "yapilacak" as const,
                    desc: newMilestoneDesc || "Bu milat için açıklama eklenmedi."
                  };
                  setMilestones(prev => [...prev, newMil]);
                  setNewMilestoneTitle("");
                  setNewMilestoneDate("");
                  setNewMilestoneDesc("");
                }}
                className="mt-6 bg-[#FEF6E4]/40 p-4 rounded-2xl border border-[#D4A373]/30 space-y-4"
              >
                <h3 className="text-sm font-kids font-bold text-[#2D241E] flex items-center gap-1.5 font-sans">
                  <Plus size={16} className="text-[#E07A5F]" /> Yeni Milat Ekle:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Milat Başlığı (örn: Sınıf Panosu Oluşturma)"
                    value={newMilestoneTitle}
                    onChange={(e) => setNewMilestoneTitle(e.target.value)}
                    className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#009393]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Hedef Tarih (örn: 28.06.2026)"
                    value={newMilestoneDate}
                    onChange={(e) => setNewMilestoneDate(e.target.value)}
                    className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#009393]"
                  />
                </div>
                <textarea
                  placeholder="Kısa açıklama..."
                  value={newMilestoneDesc}
                  onChange={(e) => setNewMilestoneDesc(e.target.value)}
                  className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-[#009393] h-16 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#E07A5F] hover:bg-[#c7654a] text-white font-kids font-bold text-xs py-2 px-4 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Miladı Yol Haritasına Ekle 🎯
                  </button>
                </div>
              </form>

              {/* Milestones Timeline */}
              <div className="mt-8 space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
                {milestones.map((mil) => {
                  let statusColor = "bg-stone-100 border-stone-300 text-stone-500";
                  if (mil.status === "yapiliyor") statusColor = "bg-amber-100 border-amber-300 text-amber-700 ring-2 ring-amber-300/30";
                  if (mil.status === "tamamlandi") statusColor = "bg-emerald-100 border-emerald-300 text-emerald-700 font-bold";

                  return (
                    <div key={mil.id} className="relative pl-10 flex flex-col md:flex-row md:items-start justify-between gap-4 p-4 rounded-2xl bg-[#FFFDF5] hover:bg-white border border-[#CCD5AE]/40 hover:border-[#CCD5AE] transition-all shadow-sm">
                      
                      {/* Timeline node */}
                      <span className={`absolute left-2.5 top-5 w-3.5 h-3.5 rounded-full ring-4 ring-white border-2 ${
                        mil.status === "tamamlandi" ? "bg-emerald-500" : mil.status === "yapiliyor" ? "bg-amber-500" : "bg-stone-400"
                      }`} />

                      <div className="space-y-1.5 flex-1 font-sans">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-kids font-bold text-base text-[#2D241E]">{mil.title}</h4>
                          <span className="text-xs bg-white text-[#5A5A40] border border-[#CCD5AE]/50 px-2.5 py-0.5 rounded-full font-sans font-bold">
                            📅 {mil.date}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 font-sans leading-relaxed">{mil.desc}</p>
                      </div>

                      <div className="flex flex-row md:flex-col items-center gap-2 self-start shrink-0">
                        {/* Status Switcher cycle */}
                        <button
                          type="button"
                          onClick={() => {
                            const statuses: ("yapilacak" | "yapiliyor" | "tamamlandi")[] = ["yapilacak", "yapiliyor", "tamamlandi"];
                            const nextIndex = (statuses.indexOf(mil.status) + 1) % statuses.length;
                            setMilestones(prev => prev.map(m => m.id === mil.id ? { ...m, status: statuses[nextIndex] } : m));
                          }}
                          className={`px-3 py-1.5 rounded-xl border-2 text-[10px] font-extrabold uppercase tracking-wider cursor-pointer shadow-sm transition-all hover:bg-white ${statusColor}`}
                        >
                          {mil.status === "tamamlandi" && "Tamamlandı 🎉"}
                          {mil.status === "yapiliyor" && "Yapılıyor 🏃"}
                          {mil.status === "yapilacak" && "Yapılacak ⌛"}
                        </button>

                        <button
                          type="button"
                          onClick={() => setMilestones(prev => prev.filter(m => m.id !== mil.id))}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-200 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: TAKIM ÜYELERİ */}
        {activeTab === "takim-uyeleri" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#CCD5AE] shadow-[8px_8px_0px_#CCD5AE]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <Users className="text-[#009393]" />
                    Türkçe Muhafızı Takımı Sınıf Üyeleri 👥
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans font-medium">
                    Grup projemizi birlikte yürüttüğümüz, Türkçeyi sahipsiz bırakmayan cesur sınıf arkadaşlarımız.
                  </p>
                </div>
                <div className="bg-[#FEF6E4] px-4 py-2 rounded-xl text-center border-2 border-[#D4A373]">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#B18659] block font-sans">Takım Kadrosu</span>
                  <span className="text-xl font-kids font-bold text-[#009393] font-mono">
                    {teamMembers.length} Muhafız
                  </span>
                </div>
              </div>

              {/* Add Member Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newMemberName.trim()) return;
                  const newMem = {
                    id: "mem_" + Date.now(),
                    name: newMemberName,
                    role: newMemberRole,
                    avatarId: newMemberAvatar
                  };
                  setTeamMembers(prev => [...prev, newMem]);
                  setNewMemberName("");
                  setNewMemberRole("Dil Gözcüsü 👁️");
                }}
                className="mt-6 bg-[#FDFCF0] p-4 rounded-2xl border border-[#CCD5AE] space-y-4"
              >
                <h3 className="text-xs uppercase font-extrabold text-[#5A5A40] tracking-wider font-kids">Sınıf Arkadaşı Ekle:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Adı Soyadı</label>
                    <input
                      type="text"
                      required
                      placeholder="Muhafız Adı (örn: Elif Kaya)"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Takımdaki Unvanı</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                    >
                      <option value="Dil Gözcüsü 👁️">Dil Gözcüsü 👁️</option>
                      <option value="Yazım Denetçisi 🕵️">Yazım Denetçisi 🕵️</option>
                      <option value="Tekerleme Sözcüsü 🗣️">Tekerleme Sözcüsü 🗣️</option>
                      <option value="Hazine Kaşifi 📜">Hazine Kaşifi 📜</option>
                      <option value="AI Test Uzmanı 🔮">AI Test Uzmanı 🔮</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Temsili Avatar Kahramanı</label>
                    <select
                      value={newMemberAvatar}
                      onChange={(e) => setNewMemberAvatar(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                    >
                      <option value="keloglan">Keloğlan</option>
                      <option value="nasreddin">Nasreddin Hoca</option>
                      <option value="hacivat">Hacivat</option>
                      <option value="karagoz">Karagöz</option>
                      <option value="dedekorkut">Dede Korkut</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="bg-[#009393] hover:bg-[#007A7A] text-white font-kids font-bold text-xs py-2 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Takıma Muhafız Ekle +
                  </button>
                </div>
              </form>

              {/* Members Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-[#FFFDF5] border-2 border-dashed border-[#CCD5AE] p-4 rounded-3xl flex flex-col items-center text-center relative hover:scale-101 transition-all"
                  >
                    <div className="w-16 h-16 bg-white rounded-full border border-stone-200 flex items-center justify-center p-1.5 shadow-sm">
                      {member.avatarId === "keloglan" && <KeloglanAvatar size={48} animated={false} />}
                      {member.avatarId === "nasreddin" && <NasreddinHocaAvatar size={48} animated={false} />}
                      {member.avatarId === "hacivat" && <HacivatAvatar size={48} animated={false} />}
                      {member.avatarId === "karagoz" && <KaragozAvatar size={48} animated={false} />}
                      {member.avatarId === "dedekorkut" && <DedeKorkutAvatar size={48} animated={false} />}
                    </div>

                    <div className="mt-3 space-y-1 font-sans">
                      <h4 className="font-kids font-bold text-base text-[#2D241E] leading-tight">{member.name}</h4>
                      <span className="text-xs text-[#009393] font-sans font-extrabold uppercase bg-white border border-[#CCD5AE]/60 px-2.5 py-0.5 rounded-full inline-block">
                        {member.role}
                      </span>
                    </div>

                    {/* Delete action */}
                    {member.id !== "1" && (
                      <button
                        type="button"
                        onClick={() => setTeamMembers(prev => prev.filter(m => m.id !== member.id))}
                        className="absolute top-2 right-2 p-1.5 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-100 border border-rose-300/30 cursor-pointer shadow-sm"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: GÖREVLER */}
        {activeTab === "gorevler" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <CheckSquare className="text-[#009393]" />
                    Sınıf Muhafızları Görev Dağılım Listesi 📋
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans font-medium">
                    Ortak projemizdeki görevleri tamamlayarak Türkçe kültürümüzü hep birlikte savunalım!
                  </p>
                </div>
                <div className="bg-[#E9EDC9] px-4 py-2 rounded-xl text-center border border-[#CCD5AE]">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#5A5A40] block font-sans">Kalan Dağılım</span>
                  <span className="text-xl font-kids font-bold text-[#E07A5F] font-mono">
                    {projectTasks.filter(t => t.status !== "tamamlandi").length} Görev var
                  </span>
                </div>
              </div>

              {/* Add Task Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTaskTitle.trim() || !newTaskDesc.trim()) return;
                  const newT = {
                    id: "task_" + Date.now(),
                    title: newTaskTitle,
                    desc: newTaskDesc,
                    assignedToId: newTaskAssignTo,
                    status: "yapilacak" as const,
                    category: newTaskCategory
                  };
                  setProjectTasks(prev => [...prev, newT]);
                  setNewTaskTitle("");
                  setNewTaskDesc("");
                }}
                className="mt-6 bg-[#FFFDF5] p-5 rounded-2xl border border-[#CCD5AE] space-y-4"
              >
                <h3 className="text-sm font-kids font-bold text-[#2D241E] flex items-center gap-1.5 font-sans">
                  <Plus size={16} className="text-[#009393]" /> Yeni Görevi Sınıfa Dağıt:
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Görev İsmi (örn: WhatsApp Argolarını Derlemek)"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newTaskCategory}
                      onChange={(e) => setNewTaskCategory(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                    >
                      <option value="Araştırma 🔍">Araştırma 🔍</option>
                      <option value="Dezenformasyon Taraması 🕵️">Hata Taraması 🕵️</option>
                      <option value="Yapay Zeka Testleri 🔮">Yapay Zeka Testi 🔮</option>
                      <option value="Sunum Hazırlığı 📽️">Sunum Hazırlığı 📽️</option>
                    </select>
                    
                    <select
                      value={newTaskAssignTo}
                      onChange={(e) => setNewTaskAssignTo(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                    >
                      {teamMembers.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea
                  required
                  placeholder="Görevin detaylı tarifi..."
                  value={newTaskDesc}
                  onChange={(e) => setNewTaskDesc(e.target.value)}
                  className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009393] h-16 resize-none font-sans"
                />

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="bg-[#E07A5F] hover:bg-[#c7654a] text-white font-kids font-bold text-xs py-2 px-5 rounded-xl transition-all shadow-md cursor-pointer"
                  >
                    Görevi Ata ve Gönder 🚀
                  </button>
                </div>
              </form>

              {/* Tasks List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                {projectTasks.map((task) => {
                  const assignee = teamMembers.find(m => m.id === task.assignedToId) || teamMembers[0];
                  let statusLabel = "Yapılacak ⌛";
                  let statusClass = "bg-stone-100 border-stone-300 text-stone-500 hover:bg-stone-200/50";
                  if (task.status === "yapiliyor") {
                    statusLabel = "Yapılıyor 🏃";
                    statusClass = "bg-amber-100 border-amber-300 text-amber-900 font-semibold hover:bg-amber-200/50";
                  } else if (task.status === "tamamlandi") {
                    statusLabel = "Tamamlandı 🎉";
                    statusClass = "bg-emerald-100 border-emerald-300 text-emerald-900 font-bold hover:bg-emerald-200/50";
                  }

                  return (
                    <div
                      key={task.id}
                      className="bg-[#FFFDF5] border border-[#CCD5AE]/60 hover:border-[#CCD5AE] p-4 rounded-3xl flex flex-col justify-between gap-4 transition-all hover:shadow-sm"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-3 flex-wrap">
                          <span className="text-[10px] uppercase font-black tracking-wider text-[#009393] bg-[#F1F9F9] border border-[#009393]/20 px-2 py-0.5 rounded-full inline-block font-sans">
                            {task.category}
                          </span>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const statuses: typeof task.status[] = ["yapilacak", "yapiliyor", "tamamlandi"];
                              const nextIdx = (statuses.indexOf(task.status) + 1) % statuses.length;
                              setProjectTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: statuses[nextIdx] } : t));
                            }}
                            className={`px-3 py-1 text-[10px] font-extrabold uppercase rounded-full border cursor-pointer transition-all ${statusClass}`}
                          >
                            {statusLabel}
                          </button>
                        </div>

                        <h4 className="font-kids font-bold text-base text-[#2D241E]">{task.title}</h4>
                        <p className="text-xs text-stone-600 font-sans leading-relaxed">{task.desc}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-dashed border-stone-200/60 pt-3 flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 bg-white border border-[#CCD5AE]/45 px-2.5 py-1 rounded-full text-xs font-sans">
                          <span className="text-[10px] text-stone-500 font-sans font-medium">Sorumlu:</span>
                          <span className="font-bold text-[#5A5A40] text-[11px] font-kids">{assignee.name}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setProjectTasks(prev => prev.filter(t => t.id !== task.id))}
                          className="p-1.5 text-rose-500 rounded-lg hover:bg-rose-50 border border-transparent hover:border-rose-100 cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* TAB 8: TÜM ÇIKTILAR */}
        {activeTab === "tum-cikti" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373]">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <FileSpreadsheet className="text-[#009393]" />
                    Sınıf Projesi Dil Çıktıları Havuzu ✍️
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans">
                    Kelime Analizöründen başarıyla temizlenip takıma kurtarılmış dil çıktıları raporumuz.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      alert("📂 Tüm sınıf dil arşivi başarıyla JSON formatında dışa aktarıldı! Teşekkürler Muhafız.");
                    }}
                    className="bg-[#E9EDC9] hover:bg-[#D8DEB0] text-[#5A5A40] border border-[#CCD5AE] font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer font-sans"
                  >
                    <Download size={14} /> Dışa Aktar
                  </button>
                </div>
              </div>

              {savedOutputs.length === 0 ? (
                <div className="p-12 text-center text-stone-400 space-y-4 font-sans">
                  <div className="text-5xl">🔭</div>
                  <h3 className="font-kids font-bold text-lg text-stone-600">Henüz Kaydedilmiş Proje Çıktısı Yok</h3>
                  <p className="text-xs max-w-md mx-auto leading-relaxed">
                    Kelimeler sekmesinde yapay zeka yardımıyla analiz yaptığında, temizlenmiş verileri "Bu Analizi Proje Çıktısı Olarak Kaydet" butonuna tıklayarak buraya kaydedebilirsin!
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("duzeltici")}
                    className="bg-[#009393] text-white hover:bg-[#007A7A] px-4 py-2 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer animate-bounce"
                  >
                    Kelime Düzelticiyi Aç 🔮
                  </button>
                </div>
              ) : (
                <div className="space-y-5 mt-6">
                  {savedOutputs.map((output) => {
                    const isEditing = editingOutputId === output.id;

                    return (
                      <div
                        key={output.id}
                        className="bg-[#FFFDF5] border border-[#CCD5AE]/60 hover:border-[#CCD5AE] p-5 rounded-3xl relative transition-all"
                      >
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              if (isEditing) {
                                setSavedOutputs(prev => prev.map(o => o.id === output.id ? { ...o, notes: editingOutputNotes } : o));
                                setEditingOutputId(null);
                              } else {
                                setEditingOutputId(output.id);
                                setEditingOutputNotes(output.notes || "");
                              }
                            }}
                            className="p-1 bg-white hover:bg-stone-100 rounded border border-stone-200 text-stone-500 cursor-pointer shadow-sm text-xs px-2 py-1 font-bold inline-flex items-center gap-1 font-sans"
                          >
                            {isEditing ? <Save size={12} /> : <Edit size={12} />}
                            <span>{isEditing ? "Kaydet" : "Notu Düzenle"}</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => {
                              setSavedOutputs(prev => prev.filter(o => o.id !== output.id));
                            }}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded border border-rose-300/30 cursor-pointer shadow-sm"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div className="space-y-4 font-sans">
                          <div className="text-[10px] text-stone-400 font-mono">
                            Kayıt No: <span className="font-bold font-sans text-stone-600">{output.id}</span> · 📅 {output.timestamp}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-rose-50/50 p-3 rounded-xl border border-rose-200/50">
                              <span className="text-[10px] text-rose-600 font-bold uppercase block mb-1">Dezenformasyon Metni</span>
                              <p className="text-rose-700 font-sans text-xs italic font-semibold leading-relaxed line-through">{output.originalText}</p>
                            </div>

                            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/50">
                              <span className="text-[10px] text-emerald-800 font-bold uppercase block mb-1">Düzeltilmiş Türkçe</span>
                              <p className="text-emerald-900 font-sans text-xs font-extrabold leading-relaxed">{output.correctedText}</p>
                            </div>
                          </div>

                          <div className="border-t border-dashed border-stone-200 pt-3">
                            <span className="text-[10px] text-[#2D241E]/70 font-sans font-bold flex items-center gap-1">
                              💬 Dil Muhafızı Sınıf Notları:
                            </span>

                            {isEditing ? (
                              <textarea
                                value={editingOutputNotes}
                                onChange={(e) => setEditingOutputNotes(e.target.value)}
                                className="w-full mt-2 bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#009393] h-16 resize-none"
                              />
                            ) : (
                              <p className="text-stone-600 text-xs mt-1 bg-white border border-[#CCD5AE]/40 p-2.5 rounded-xl font-sans italic leading-relaxed">
                                {output.notes}
                              </p>
                            )}
                          </div>

                          {/* Quick teachers report button */}
                          <div className="flex justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                alert("📧 Öğretmene Rapor E-postası Gönderildi! Çalışmanız takdir edildi.");
                              }}
                              className="bg-[#009393] hover:bg-[#007A7A] text-white text-[10px] font-kids font-bold px-3 py-1.5 rounded-lg shadow-sm cursor-pointer"
                            >
                              🍎 Sınıf Öğretmenine Raporla
                            </button>
                          </div>

                        </div>

                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 12: YAPIM AŞAMALARIMIZ (GELİŞTİRME GÜNLÜĞÜ) */}
        {activeTab === "yapim-asamalari" && (
          <div className="space-y-6 animate-kids-wiggle w-full">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373]">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <span className="text-[#009393]">🧱</span>
                    Proje Yapım Aşamalarımız & Geliştirme Günlüğü 📝
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans font-medium">
                    Sitemizi geliştirirken attığımız tüm teknik adımları, prompt tasarımlarımızı ve mimari kararlarımızı bu günlüğe kaydediyoruz. Burada yazdığınız tüm bilgiler \"Sunum Modu\" slaytlarına otomatik olarak yansır!
                  </p>
                </div>
                <div className="bg-[#FEF6E4] px-4 py-2 rounded-xl text-center border-2 border-[#D4A373] shrink-0">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#B18659] block font-sans">Geliştirme Günlüğü</span>
                  <span className="text-xl font-kids font-bold text-[#E07A5F] font-mono">
                    {devStages.length} Kayıtlı Aşama
                  </span>
                </div>
              </div>

              {/* Stage Form (Can add or edit stages) */}
              <div className="mt-6 bg-[#FFFDF5] p-5 rounded-2xl border border-[#CCD5AE] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-kids font-bold text-lg text-[#2D241E] flex items-center gap-2">
                    <span>{editingStageId ? "✏️ Yapım Aşamasını Düzenle" : "➕ Yeni Yapım Aşaması Ekle"}</span>
                  </h3>
                  {editingStageId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingStageId(null);
                        setStageInputTitle("");
                        setStageInputSubTitle("");
                        setStageInputDesc("");
                        setStageInputDetails("");
                        setStageInputOwner("Mustafa Alp KOÇAK");
                        setStageInputTag("Arayüz Kodlama 💻");
                        setStageInputStatus("Tamamlandı");
                        setStageInputDate("");
                      }}
                      className="text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 px-3 py-1.5 rounded-lg font-bold font-sans cursor-pointer"
                    >
                      İptal Et ✕
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1">Aşama Başlığı</label>
                    <input
                      type="text"
                      required
                      placeholder="Yapay Zeka Entegrasyonu ve API Kurulumu..."
                      value={stageInputTitle}
                      onChange={(e) => setStageInputTitle(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1">Alt Başlık (Kapsam)</label>
                    <input
                      type="text"
                      required
                      placeholder="Masal Kahramanlarımıza Ait Prompt Yapısı..."
                      value={stageInputSubTitle}
                      onChange={(e) => setStageInputSubTitle(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1">Kısa Açıklama (Özet)</label>
                    <input
                      type="text"
                      required
                      placeholder="Yapay zekanın masal tarzında temizlik yapmasını kurguladık..."
                      value={stageInputDesc}
                      onChange={(e) => setStageInputDesc(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1">Sorumlu Geliştirici Üye</label>
                      <select
                        value={stageInputOwner}
                        onChange={(e) => setStageInputOwner(e.target.value)}
                        className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                      >
                        {teamMembers.map((m) => (
                          <option key={m.id} value={m.name}>{m.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1">Aşama Tarihi</label>
                      <input
                        type="text"
                        placeholder="22.06.2026"
                        required
                        value={stageInputDate}
                        onChange={(e) => setStageInputDate(e.target.value)}
                        className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1 font-sans">Geliştirme Detayları (Nasıl yapıldığına dair teknik notlar, kodlar, araştırmalar)</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Buraya bu aşamada gerçekleştirdiğiniz her şeyi, araştırma safhalarını, kod şablonlarını ve çözdüğünüz problemleri detaylıca yazın..."
                    value={stageInputDetails}
                    onChange={(e) => setStageInputDetails(e.target.value)}
                    className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1 font-sans">Çalışma Etiketi (Tag)</label>
                    <select
                      value={stageInputTag}
                      onChange={(e) => setStageInputTag(e.target.value)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                    >
                      <option value="Araştırma 🔍">Araştırma 🔍</option>
                      <option value="Prompt Tasarımı 🔮">Prompt Tasarımı 🔮</option>
                      <option value="Grafik & Tasarım 🎨">Grafik & Tasarım 🎨</option>
                      <option value="Arayüz Kodlama 💻">Arayüz Kodlama 💻</option>
                      <option value="Yazılım Geliştirme ⚙️">Yazılım Geliştirme ⚙️</option>
                      <option value="Sunum Entegrasyonu 📺">Sunum Entegrasyonu 📺</option>
                      <option value="Test & Hata Çözümü 🛡️">Test & Hata Çözümü 🛡️</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A5A40] font-kids font-bold mb-1 font-sans">Durumu</label>
                    <select
                      value={stageInputStatus}
                      onChange={(e) => setStageInputStatus(e.target.value as any)}
                      className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#E07A5F] font-sans"
                    >
                      <option value="Tamamlandı">Tamamlandı ✅</option>
                      <option value="Devam Ediyor">Devam Ediyor ⚙️</option>
                      <option value="Planlandı">Planlandı 📅</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (!stageInputTitle.trim() || !stageInputSubTitle.trim() || !stageInputDesc.trim() || !stageInputDetails.trim()) {
                        alert("Lütfen tüm alanları doldurun!");
                        return;
                      }

                      if (editingStageId) {
                        // edit
                        setDevStages(prev => prev.map(s => s.id === editingStageId ? {
                          ...s,
                          title: stageInputTitle,
                          subTitle: stageInputSubTitle,
                          description: stageInputDesc,
                          details: stageInputDetails,
                          owner: stageInputOwner,
                          tag: stageInputTag,
                          status: stageInputStatus,
                          date: stageInputDate || "20.06.2026"
                        } : s));
                        setEditingStageId(null);
                        alert("Geliştirme aşaması başarıyla güncellendi! Slaytlarınıza yansıdı.");
                      } else {
                        // create
                        const newId = "ds_" + Date.now();
                        const nextIndex = devStages.length + 1;
                        setDevStages(prev => [...prev, {
                          id: newId,
                          stageIndex: nextIndex,
                          title: stageInputTitle,
                          subTitle: stageInputSubTitle,
                          description: stageInputDesc,
                          details: stageInputDetails,
                          owner: stageInputOwner,
                          tag: stageInputTag,
                          status: stageInputStatus,
                          date: stageInputDate || "20.06.2026"
                        }]);
                        alert("Yeni geliştirme aşaması başarıyla eklendi! Artık slaytlardan inceleyebilirsiniz.");
                      }

                      setStageInputTitle("");
                      setStageInputSubTitle("");
                      setStageInputDesc("");
                      setStageInputDetails("");
                      setStageInputDate("");
                    }}
                    className="bg-[#E07A5F] hover:bg-[#c7654a] text-white font-kids font-bold rounded-xl px-6 py-3 text-sm transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Save size={16} /> {editingStageId ? "Güncellemeleri Kaydet" : "Yapım Aşamasını Ekle"}
                  </button>
                </div>
              </div>

              {/* Steps timeline / grid list */}
              <div className="mt-8 space-y-6">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#5A5A40] block font-sans">
                  Kayıtlı Geliştirme Zaman Çizelgesi
                </span>

                <div className="relative border-l-4 border-stone-150 pl-6 space-y-6">
                  {devStages.map((stage, idx) => {
                    const statusColors = 
                      stage.status === "Tamamlandı" 
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300" 
                        : stage.status === "Devam Ediyor"
                        ? "bg-amber-100 text-amber-800 border-amber-300"
                        : "bg-blue-100 text-blue-800 border-blue-300";

                    return (
                      <div key={stage.id} className="relative bg-[#FFFDF5] p-5 rounded-2xl border border-[#CCD5AE] shadow-sm hover:shadow-md transition-all">
                        {/* Timeline node */}
                        <div className="absolute -left-[35px] top-5 w-5 h-5 rounded-full bg-[#E07A5F] border-4 border-white flex items-center justify-center shadow-sm" />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-dashed border-[#CCD5AE]/60 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-kids font-extrabold text-[#E07A5F]">Aşama {idx + 1}</span>
                            <span className="text-xs font-mono font-bold text-[#5A5A40]">|</span>
                            <span className="text-xs bg-stone-100 text-[#5A5A40] px-2.5 py-0.5 rounded-full font-sans font-bold">
                              {stage.tag}
                            </span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${statusColors}`}>
                              {stage.status}
                            </span>
                          </div>
                          <span className="text-xs text-[#B18659] font-mono font-bold">Tarih: {stage.date}</span>
                        </div>

                        <div className="space-y-2">
                          <h4 className="text-lg font-kids font-bold text-[#2D241E]">{stage.title}</h4>
                          <span className="text-xs font-bold font-sans text-[#009393] block">{stage.subTitle}</span>
                          <p className="text-[#3A3330] text-xs font-sans font-semibold leading-relaxed">
                            {stage.description}
                          </p>

                          <div className="bg-white/70 border border-stone-200/50 p-3.5 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed text-stone-600 mt-2">
                            <span className="text-[10px] uppercase font-black tracking-wider text-[#B18659] block font-sans mb-1.5">💻 Geliştirici Günlük Notları & Teknik Detay:</span>
                            {stage.details}
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-dashed border-[#CCD5AE]/40 text-xs font-sans mt-2">
                            <span className="font-bold text-stone-500">
                              👤 Geliştirici: <span className="text-[#2D241E] font-kids underline">{stage.owner}</span>
                            </span>
                            
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingStageId(stage.id);
                                  setStageInputTitle(stage.title);
                                  setStageInputSubTitle(stage.subTitle);
                                  setStageInputDesc(stage.description);
                                  setStageInputDetails(stage.details);
                                  setStageInputOwner(stage.owner);
                                  setStageInputTag(stage.tag);
                                  setStageInputStatus(stage.status);
                                  setStageInputDate(stage.date);
                                  window.scrollTo({ top: 350, behavior: "smooth" });
                                }}
                                className="bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit size={12} /> Düzenle
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Bu yapım aşamasını silmek istediğinizden emin misiniz?")) {
                                    setDevStages(prev => prev.filter(s => s.id !== stage.id));
                                  }
                                }}
                                className="bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={12} /> Sil
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 9: SUNUM MODU */}
        {activeTab === "sunum-modu" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-gradient-to-br from-[#2D241E] to-[#1F1814] p-6 rounded-3xl border-2 border-[#E07A5F] shadow-[8px_8px_0px_rgba(224,122,95,0.4)] text-[#FFFDF5]">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4 font-sans">
                <div className="flex items-center gap-2">
                  <Tv className="text-[#E07A5F]" />
                  <h2 className="text-xl font-kids font-bold">Dil Muhafızı Geliştirme Sunumu 📽️</h2>
                </div>
                <span className="text-xs bg-white/10 text-[#CCD5AE] px-2.5 py-1 rounded-full font-mono font-bold">
                  Slayt {slideIndex + 1} / 14
                </span>
              </div>

              {/* Slide Screen Area */}
              <div className="bg-white text-[#2D241E] p-6 sm:p-8 rounded-3xl border min-h-[460px] flex flex-col justify-between shadow-inner relative overflow-hidden transition-all">
                
                {/* Decorative Turkish geometric motifs corner effects */}
                <span className="absolute top-2 left-2 text-[#E07A5F]/20 text-3xl font-bold font-sans">❈</span>
                <span className="absolute top-2 right-2 text-[#E07A5F]/20 text-3xl font-bold font-sans">❈</span>
                <span className="absolute bottom-2 left-2 text-[#E07A5F]/20 text-3xl font-bold font-sans">❈</span>
                <span className="absolute bottom-2 right-2 text-[#E07A5F]/20 text-3xl font-bold font-sans">❈</span>

                <PresentationSlides slideIndex={slideIndex} />

              </div>

              {/* Slide Nav Buttons */}
              <div className="flex justify-between items-center mt-5">
                <button
                  type="button"
                  disabled={slideIndex === 0}
                  onClick={() => setSlideIndex(prev => Math.max(0, prev - 1))}
                  className="bg-white/10 text-white border border-white/20 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer font-sans"
                >
                  <ChevronLeft size={16} /> Önceki Slayt
                </button>
                
                <div className="flex gap-1.5 font-sans overflow-x-auto max-w-[50%] py-1">
                  {Array.from({ length: 14 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlideIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all shrink-0 ${slideIndex === idx ? "bg-[#E07A5F] scale-125" : "bg-white/30"}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  disabled={slideIndex === 13}
                  onClick={() => setSlideIndex(prev => Math.min(13, prev + 1))}
                  className="bg-[#E07A5F] hover:bg-[#c7654a] text-white rounded-xl px-4 py-2 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer font-sans"
                >
                  Sonraki Slayt <ChevronRight size={16} />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TAB: PROJENİN TEMEL YAPI TAŞLARI */}
        {activeTab === "yapi-taslari" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373]">
              <div className="border-b border-stone-150 pb-4">
                <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                  <span>🧱</span> Projenin Temel Yapı Taşları
                </h2>
                <p className="text-sm text-stone-600 mt-1 font-sans font-medium">
                  Türkçe Kelime Muhafızı projemizin tasarım, mimari, strateji ve vizyonunu temsil eden temel şemalar. Resimlere tıklayarak detaylılaştırılmış görünümü inceleyebilirsiniz.
                </p>
              </div>

              {/* Grid of the 5 Uploaded Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[
                  {
                    src: logoTurkceMuhafizi,
                    title: "1. Logomuz & İlham Kaynağımız",
                    subtitle: "Karamanoğlu Mehmet Bey ve Ünlü Dil Fermanı",
                    desc: "1277 yılında Türkçe düşünmek, anlamak ve anlatmak amacıyla devlet işlerinde ve her alanda Türkçeden başka bir dilde konuşmayı yasaklayan ünlü fermanı ile dilimizin geçmişi, bugünü ve geleceği arasındaki sarsılmaz bağı simgeler."
                  },
                  {
                    src: katmanlarYapayZeka,
                    title: "2. Yapay Zekalı Mimari Katmanları",
                    subtitle: "Doğal Dil İşleme ve Düzeltme Akışı",
                    desc: "Uygulamamızın veri işleme yapısı 4 kritik katmandan oluşur: Girdileri bölen Doğal Dil İşleme, çıkarım yapan Yapay Zeka Analizi, kural denetimi yapan Düzeltme Motoru ve çocuklara dönük görsel Kullanıcı Arayüzü."
                  },
                  {
                    src: amaclariPastaGrafigi,
                    title: "3. Projenin Kurucu Amaçları",
                    subtitle: "Farkındalık ve Kalite Geliştirme Çerçevesi",
                    desc: "Topluma katkı hedefimiz 4 ana kurguda toplanır: Hatalı ifadeleri tespit etme (1), doğru karşılıkları TDK ışığında önerme (2), genç metinlerin kalitesini artırma (3) ve çocuklarda kalıcı Türkçe dil bilinci uyandırma (4)."
                  },
                  {
                    src: dilEgitimDinamikleri,
                    title: "4. Dil ve Eğitim Dinamikleri",
                    subtitle: "Zengin İçerik ve Kültürel Entegrasyon",
                    desc: "Gelişim ve eğitim vizyonumuz; Türkçe odaklılığı merkezine alarak internet çağının Büyük Veri ihtiyacını karşılar, modern Eğitim Teknolojileri yardımıyla dilin hızlı değişim ve yozlaşma hızına yapay zekayla anlık cevap üretir."
                  },
                  {
                    src: riskGuvenlikCemberi,
                    title: "5. Risk Analizi & Güvenlik Çemberi",
                    subtitle: "Teknik, Etik ve Operasyonel Sınırlar",
                    desc: "Güvenilir ve sürekli bir deneyim için; sistemin veri doğruluğu ve API sınırlarındaki Teknik Riskleri, çocukların veri mahremiyeti ve Yapay Zekanın tarafsızlığı çerçevesindeki Etik Riskleri, sınıf içi uygulanabilirlikteki Operasyonel Riskleri çözümler."
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#FFFDF5] rounded-3xl border-2 border-dashed border-[#CCD5AE] p-4 flex flex-col justify-between hover:shadow-md transition-all group cursor-pointer"
                    onClick={() => setActiveLightboxImage(item.src)}
                  >
                    <div className="space-y-3">
                      {/* Image container */}
                      <div className="relative w-full h-56 bg-white rounded-2xl border border-stone-200 overflow-hidden flex items-center justify-center p-1 group-hover:scale-[1.01] transition-all">
                        <img
                          src={item.src}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white/95 text-[#2D241E] font-kids font-bold text-xs px-4 py-2 rounded-xl shadow-md border border-[#CCD5AE]">
                            Büyütmek İçin Tıkla 🔍
                          </span>
                        </div>
                      </div>
                      <div className="space-y-1 font-sans">
                        <h3 className="font-kids font-bold text-lg text-[#2D241E] group-hover:text-[#009393] transition-colors">{item.title}</h3>
                        <p className="text-xs text-[#009393] font-sans font-extrabold uppercase">{item.subtitle}</p>
                      </div>
                      <p className="text-stone-600 text-xs font-sans font-medium leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-dashed border-[#CCD5AE]/60 flex justify-end">
                      <span className="text-[#D4A373] text-xs font-kids font-bold flex items-center gap-1">
                        Şemayı İncele →
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB: BELGELER VE SUNUMLAR */}
        {activeTab === "belgeler-sunumlar" && (
          <div className="space-y-6 animate-kids-wiggle w-full">
            <div className="bg-white p-6 rounded-3xl border-2 border-[#D4A373] shadow-[8px_8px_0px_#D4A373]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-150 pb-4">
                <div>
                  <h2 className="text-2xl font-kids font-bold text-[#2D241E] flex items-center gap-2">
                    <Folder className="text-[#009393]" />
                    Proje Belgeleri & Sınıf Sunumları 📂
                  </h2>
                  <p className="text-sm text-stone-600 mt-1 font-sans font-medium">
                    Projemiz kapsamında oluşturduğumuz tüm sunum slaytlarını, kelime raporlarını ve dil dokümanlarını bu alana yükleyip yönetebiliriz.
                  </p>
                </div>
                <div className="bg-[#E9EDC9] px-4 py-2 rounded-xl text-center border-2 border-[#CCD5AE]">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#5A5A40] block font-sans">Dosya Deposu</span>
                  <span className="text-lg font-kids font-bold text-[#009393] font-mono">
                    {uploadedDocs.length} Dosya
                  </span>
                </div>
              </div>

              {/* Add form layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                
                {/* Left Upload Card */}
                <div className="lg:col-span-4 bg-[#FDFCF0] p-4 rounded-2xl border border-[#CCD5AE] space-y-4 h-fit">
                  <h3 className="text-xs uppercase font-extrabold text-[#5A5A40] tracking-wider font-kids flex items-center gap-1.5 border-b border-[#CCD5AE]/40 pb-2">
                    <span>📤</span> Yeni Dosya Yükle
                  </h3>

                  {/* Drag and Drop Trigger Mock Area */}
                  <div className="border-2 border-dashed border-[#CCD5AE] bg-white rounded-xl p-4 text-center cursor-pointer hover:bg-stone-50 transition-all flex flex-col items-center justify-center relative">
                    <input
                      type="file"
                      id="real-file-picker"
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const sizeStr = (file.size / (1024 * 1024)).toFixed(1) + " MB";
                          const ext = "." + file.name.split('.').pop();
                          const isSunum = [".pptx", ".ppt", ".pdf", ".key"].includes(ext.toLowerCase());
                          const newDoc = {
                            id: "doc_" + Date.now(),
                            name: file.name,
                            type: (isSunum ? "sunum" as const : "belge" as const),
                            size: sizeStr,
                            date: new Date().toLocaleDateString("tr-TR"),
                            fileType: ext
                          };
                          setUploadedDocs(prev => [newDoc, ...prev]);
                        }
                      }}
                    />
                    <Upload className="text-[#009393] mb-2" size={24} />
                    <span className="text-xs font-kids font-black text-[#5A5A40]">Slayt veya Belge Seç</span>
                    <span className="text-[10px] text-stone-500 font-sans mt-1">Cihazınızdan dosya yükleyin</span>
                  </div>

                  <form onSubmit={handleMockUpload} className="space-y-3 font-sans text-xs">
                    <div>
                      <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Dosya Adı</label>
                      <input
                        type="text"
                        required
                        placeholder="Örn: Türkçe_Gelişim_Raporu"
                        value={uploadDocName}
                        onChange={(e) => setUploadDocName(e.target.value)}
                        className="w-full bg-white border border-[#CCD5AE] rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Dosya Sınıfı</label>
                        <select
                          value={uploadDocType}
                          onChange={(e) => {
                            const val = e.target.value as "sunum" | "belge";
                            setUploadDocType(val);
                            if (val === "sunum") setUploadDocExt(".pptx");
                            else setUploadDocExt(".pdf");
                          }}
                          className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                        >
                          <option value="sunum">Sunum (Slides)</option>
                          <option value="belge">Belge (Report)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-stone-500 font-sans font-bold mb-1">Dosya Uzantısı</label>
                        <select
                          value={uploadDocExt}
                          onChange={(e) => setUploadDocExt(e.target.value)}
                          className="w-full bg-white border border-[#CCD5AE] rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#009393] font-sans"
                        >
                          {uploadDocType === "sunum" ? (
                            <>
                              <option value=".pptx">.pptx</option>
                              <option value=".pdf">.pdf</option>
                              <option value=".key">.key</option>
                            </>
                          ) : (
                            <>
                              <option value=".pdf">.pdf</option>
                              <option value=".docx">.docx</option>
                              <option value=".xlsx">.xlsx</option>
                              <option value=".txt">.txt</option>
                            </>
                          )}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#009393] hover:bg-[#007A7A] text-white font-kids font-bold text-xs py-2 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Listeye Dosya Ekle +</span>
                    </button>
                  </form>
                </div>

                {/* Right Document List Grid */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="bg-[#FFFDF5] p-3 rounded-2xl border border-[#CCD5AE] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#5A5A40] font-bold">📂 Sınıf Klasörü İçeriği</span>
                    <span className="text-stone-500 text-[10px]">İndir butonundan dosya kaydını indirebilirsiniz.</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {uploadedDocs.map(doc => {
                      const isSunum = doc.type === "sunum";
                      return (
                        <div
                          key={doc.id}
                          className="bg-white border-2 border-stone-250 hover:border-[#009393] p-4 rounded-3xl flex items-center justify-between gap-3 group transition-all relative"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0 font-kids text-xs font-black shadow-sm ${
                              isSunum ? "bg-[#E07A5F]" : "bg-[#009393]"
                            }`}>
                              {isSunum ? "PPT" : "DOC"}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="font-kids font-bold text-xs sm:text-sm text-[#2D241E] truncate" title={doc.name}>
                                {doc.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[10px] text-stone-500 font-sans font-medium">
                                <span className={`px-1.5 py-0.2 rounded border uppercase font-extrabold text-[9px] ${
                                  isSunum ? "bg-orange-50 border-orange-200 text-orange-700" : "bg-teal-50 border-teal-200 text-teal-700"
                                }`}>
                                  {doc.fileType.substring(1)}
                                </span>
                                <span>{doc.size}</span>
                                <span>• {doc.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0 z-10">
                            {/* Simulator Download */}
                            <button
                              onClick={() => {
                                alert(`'${doc.name}' dosyası indiriliyor...\nBoyut: ${doc.size}\nTarih: ${doc.date}\nİndirme işlemi simüle edildi ve başarıyla tamamlandı!`);
                              }}
                              className="p-2 rounded-xl text-stone-500 hover:text-[#009393] hover:bg-stone-50 transition-all cursor-pointer"
                              title="İndir"
                            >
                              <Download size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setUploadedDocs(prev => prev.filter(d => d.id !== doc.id));
                              }}
                              className="p-2 rounded-xl text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
                              title="Sil"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {uploadedDocs.length === 0 && (
                    <div className="text-center py-12 bg-[#FFFDF5] border border-dashed border-[#CCD5AE] rounded-3xl">
                      <Folder className="mx-auto text-stone-350 w-12 h-12" />
                      <p className="text-sm font-kids font-bold text-stone-500 mt-2">Klasörünüz Bomboş!</p>
                      <p className="text-xs text-stone-400 font-sans">Soldaki panelden proje dosyalarınızı yükleyebilirsiniz.</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB: GELİŞTİRİLEBİLİRLİK KAYNAKLARI (AKADEMİK LİTERATÜR) */}
        {activeTab === "gelistirilebilirlik" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-6 rounded-3xl border-2 border-[#E07A5F] shadow-[8px_8px_0px_rgba(224,122,95,0.4)] text-[#FFFDF5]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-kids font-bold text-[#E07A5F] flex items-center gap-2">
                    <span>📚</span> Projenin Geliştirilebilirliğine Dair Bilimsel Kaynaklar
                  </h2>
                  <p className="text-xs text-slate-300 font-sans mt-1">
                    Türkçenin dijital ortamlarda dezenformasyona karşı korunması, kelime zenginliği ve eğitim teknolojileri üzerine akademik zemin.
                  </p>
                </div>
                <div className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 flex items-center gap-1.5 shrink-0 self-start">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[10px] uppercase font-black text-slate-300 tracking-wider">Literatür Onaylı</span>
                </div>
              </div>

              {/* Informational intro card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-xs font-sans text-slate-300 leading-relaxed">
                <span className="font-bold text-white block mb-1">💡 Akademik ve Sürdürülebilir Potansiyel:</span>
                Geliştirdiğimiz <strong>"Türkçe Kelime Muhafızı"</strong> platformu rastgele bir oyunlaştırma prototipi olmayıp; yeni nesil çocukların dijital melezleşmeyle (hybrid language) bozulan dil kodlarını, yapay zekalı doğal dil işleme (NLP) modelleri ve eğitim bilimleri literatürüne dayalı olarak düzelten bilimsel temelli bir projedir. Aşağıda, projemizin geliştirilebilir, sürdürülebilir ve topluma yaygınlaştırılabilir olduğunu destekleyen temel bilimsel yayınlar yer almaktadır.
              </div>

              {/* Scientific literature grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  {
                    title: "Sosyal Medyadaki Yabancı Kelimelerin Türkçe Karşılıkları Tercihleri",
                    author: "Ayşe Nur Sır",
                    source: "The Journal of Academic Social Science Studies (JASS Studies)",
                    url: "https://scholar.archive.org/work/fwx6odaiovc5nenyvassj6nnru/access/wayback/https://jasstudies.com/files/jass_makaleler/750497130_50S%C4%B1rAy%C5%9FeNur-969-982.pdf",
                    relevance: "Genç kuşağın sosyal mecralarda sıklıkla tercih ettiği yabancı kelimeler ve bunlara aranacak Türkçe karşılıklar konusunu işler. Algoritmamızdaki alternatif eşleşmeleri doğrulamaktadır."
                  },
                  {
                    title: "Eğitim ve Toplum Dergisi: Türkçenin Dijital Çağda Korunması",
                    author: "Akademik İnceleme",
                    source: "Eğitim ve Toplum Dergisi",
                    url: "https://dergipark.org.tr/en/pub/egitimvetoplum/article/1705840",
                    relevance: "Eğitim teknolojileri entegrasyonu ile öğrencilerin dil bilincinin yükseltilmesini hedefler. Platformumuzun okullardaki akıllı tahtalarda bir eğitim materyali olarak kullanılma potansiyelini tasdikler."
                  },
                  {
                    title: "Dil Farkındalığı ve Kelime Dağarcığının Eğitsel Metotlarla Geliştirilmesi",
                    author: "Dil Araştırmaları Kitapçığı",
                    source: "Academia.edu ve Araştırmax Portalı",
                    url: "https://www.academia.edu/download/110444233/arastrmx_182912_14_pp_185-192.pdf",
                    relevance: "Dijital tabanlı oyunlaştırılmış dil araçlarının, öğrencilerin kelime dağarcığı derinliğine ve sözcük koruma reflekslerine katkısını deneysel verilerle ortaya koyar."
                  },
                  {
                    title: "Dijital Çağda Türkçe ve Çocukların Dil Gelişimindeki Yozlaşmalar",
                    author: "KTO Karatay Akademik Yayın",
                    source: "KTO Karatay Üniversitesi Açık Erişim Sistemi",
                    url: "https://acikerisim.karatay.edu.tr/yayin/1749265&dil=3",
                    relevance: "Erken yaş dil edinimi çağındaki öğrencileri hedefleyen dezenformasyon filtrelerinin ve kelime dedektifliği uygulamalarının çocuk psikolojisi ve dil zekasındaki önemini vurgular."
                  },
                  {
                    title: "Bilig Türk Dünyası Sosyal Bilimler Dergisi: Dilsel Değişimler",
                    author: "Bilig Sosyal Araştırmalar Bölümü",
                    source: "Ahmet Yesevi Üniversitesi Bilig Dergisi",
                    url: "http://bilig.yesevi.edu.tr/yonetim/icerik/makaleler/3286-published.pdf",
                    relevance: "Modern iletişim araçlarının Türk dillerindeki sözcük deformasyonunu tetiklemesini ve teknoloji odaklı muhafaza kalkanlarının kurulması gerekliliğini işler."
                  },
                  {
                    title: "Küreselleşme, Sosyal Medya ve Türkçe Kelimelerin Kullanım Sıklıkları",
                    author: "Karadeniz Araştırmaları Dergisi",
                    source: "DergiPark Karadeniz Araştırmaları Enstitüsü",
                    url: "https://dergipark.org.tr/en/pub/karadearas/issue/64207/973392",
                    relevance: "Sosyal medyadaki hibrit dil (Türkçe-İngilizce melezliği) sıklığını araştırır. Projemizin sosyal medya entegrasyonunu ve gençlik reels çalışmalarını temellendirir."
                  },
                  {
                    title: "Akademisyenler ve Dijital İletişim: Türkçedeki Deformasyon Çalışması",
                    author: "AJIT-e Gelişim Raporu",
                    source: "AJIT-e Online Academic Journal of Information Technology",
                    url: "https://dergipark.org.tr/en/pub/ajit-e/article/740996",
                    relevance: "Bilişim altyapılarının dildeki dezenformasyona etkisini teorileştirir; projemizin sunduğu 'Yapay Zeka Analizör' altyapısına akademik zemin hazırlar."
                  },
                  {
                    title: "Kitle İletişim Araçlarında Dilin Kullanımı ve TRT Dil Koruma Politikaları",
                    author: "TRT Akademi Dil Raporu",
                    source: "TRT Akademi Yayını",
                    url: "https://dergipark.org.tr/en/pub/trta/issue/67975/1054655",
                    relevance: "Kamu medyasındaki dil aşınmaları ve çözümler üzerine kamu politikalarını aktarır. Projemizin kitlesel dil kampanyaları ile nasıl ölçeklenebileceğini sunar."
                  }
                ].map((paper, idx) => (
                  <div key={idx} className="bg-slate-800/60 border border-slate-700/70 p-5 rounded-2xl flex flex-col justify-between hover:border-[#E07A5F] hover:bg-slate-800/90 transition-all group">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-black text-[#E07A5F] px-2 py-0.5 rounded bg-[#E07A5F]/10 border border-[#E07A5F]/20 uppercase tracking-widest block font-sans">
                          Kaynak #{idx + 1}
                        </span>
                        <BookOpen size={16} className="text-slate-400 group-hover:text-[#E07A5F] transition-all" />
                      </div>
                      <h3 className="text-sm font-bold text-white group-hover:text-[#FAF0CA] transition-all font-sans leading-snug">
                        {paper.title}
                      </h3>
                      <p className="text-[11px] text-slate-300 font-sans italic">
                        Yazar/Kurum: {paper.author} · {paper.source}
                      </p>
                      <p className="text-xs text-slate-400 font-sans leading-relaxed pt-1.5 border-t border-slate-700/50">
                        <strong className="text-[#3AAFA9] text-[10px] uppercase font-bold tracking-wider block mb-0.5">PROJEYE KATKISI / İLİŞKİSİ:</strong>
                        {paper.relevance}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-700/40 font-sans">
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#E07A5F]/25 hover:bg-[#E07A5F] text-[#FFDFC7] hover:text-white border border-[#E07A5F]/40 hover:border-transparent rounded-xl px-3 py-2 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        Bilimsel Makaleyi İncele <ChevronRight size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* TAB: SOSYAL MEDYA KAMPANYASIMIZ / REELS */}
        {activeTab === "sosyal-medya" && (
          <div className="space-y-6 animate-kids-wiggle">
            <div className="bg-[#1E1A17] p-6 rounded-3xl border-2 border-[#E07A5F] shadow-[8px_8px_0px_rgba(224,122,95,0.4)] text-[#FFFDF5]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-kids font-bold text-[#E07A5F] flex items-center gap-2">
                    <span>📱</span> Sosyal Medya Kampanyamız & Reels Tasarımları
                  </h2>
                  <p className="text-xs text-[#FFDFC7] font-sans mt-0.5">
                    Türkçe çocuk dil bilincini sosyal medyada yaygınlaştırmak amacıyla hazırladığımız Instagram Reels / Short paylaşımlarımız.
                  </p>
                </div>
                <div className="bg-stone-800 border border-stone-700 rounded-xl px-4 py-2 flex items-center gap-1.5 shrink-0 self-start">
                  <span className="w-2.5 h-2.5 bg-[#E07A5F] rounded-full animate-pulse" />
                  <span className="text-[10px] uppercase font-black text-stone-300 tracking-wider">Aktif Kampanya</span>
                </div>
              </div>

              {/* Informational guide */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mt-4 text-xs font-sans text-stone-300 leading-relaxed">
                <span className="font-bold text-[#FAF0CA] block mb-1">📢 Dijital Meydan Okuma Kampanyası:</span>
                Türkçemizi yabancı popüler kelimelere ezdirmiyoruz! Sosyal medyada <strong>#DilimizeSahipÇıkalım</strong>, <strong>#DilimizKimliğimiz</strong> ve <strong>#SözümüzünGücü</strong> etiketleri ile başlattığımız görsel kampanya geniş kitlelere ulaşıyor. Aşağıdaki Instagram Reels içeriklerini tıklayıp büyütebilirsiniz.
              </div>

              {/* Instagram Reels post simulator cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 max-w-4xl mx-auto">
                
                {/* Reel Card 1 */}
                <div className="bg-stone-900 border border-stone-800 rounded-3xl p-4 flex flex-col justify-between hover:border-[#E07A5F] hover:shadow-[0_0_20px_rgba(224,122,95,0.15)] transition-all group">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-stone-950/60 p-2.5 rounded-2xl border border-stone-800/40">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-[#009393] bg-[#009393]/20 flex items-center justify-center text-xs">🛡️</div>
                        <div>
                          <span className="text-xs font-bold text-white block">dilimizgelecegimiz</span>
                          <span className="text-[9px] text-[#009393] font-kids font-bold">Milli Dil Kampanyası</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">TAKİP EDİLİYOR</span>
                    </div>

                    {/* Image visual inside instagram shell */}
                    <div 
                      onClick={() => setActiveLightboxImage(sosyalMedyaGorsel1)}
                      className="relative rounded-2xl overflow-hidden border-2 border-stone-800/50 cursor-pointer group-hover:border-[#E07A5F]/50 aspect-[9/16] max-h-[480px] flex items-center justify-center bg-black"
                    >
                      <img
                        src={sosyalMedyaGorsel1}
                        alt="Reels Sosyal Medya Canlandırması 1"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Interactive overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 select-none">
                        <span className="bg-[#E07A5F] hover:bg-[#c7654a] text-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Compass size={24} />
                        </span>
                        <span className="text-xs font-bold text-[#FFFDF5] font-sans">Slaytı Tam Ekran Yap</span>
                      </div>
                    </div>

                    {/* Reel stats/caption */}
                    <div className="space-y-2 bg-stone-950/40 p-3 rounded-2xl border border-stone-800/45">
                      <div className="flex justify-between items-center text-xs text-stone-400">
                        <div className="flex gap-3">
                          <span className="font-bold text-rose-500">❤️ 35.2K</span>
                          <span>💬 481</span>
                          <span>✈️ 2.1K</span>
                        </div>
                        <span className="font-mono text-[9px]">Görüntülenme: 125K</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-300 font-sans">
                        <strong className="text-white">dilimizgelecegimiz:</strong> Yabancı kelimelerin istilasına geçit vermiyoruz! Klasörden sınıfa, her yerde Türkçe karşılıkları yaygınlaştırıyoruz. Kelimeler gücümüzdür. 🌿🇹🇷
                      </p>
                      <div className="text-[10px] text-stone-500 flex gap-1.5 flex-wrap">
                        <span>#DilimizeSahipÇıkalım</span>
                        <span>#TürkçeKelimeler</span>
                        <span>#GençlikVeDil</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reel Card 2 */}
                <div className="bg-stone-900 border border-stone-800 rounded-3xl p-4 flex flex-col justify-between hover:border-[#E07A5F] hover:shadow-[0_0_20px_rgba(224,122,95,0.15)] transition-all group">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-stone-950/60 p-2.5 rounded-2xl border border-stone-800/40">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full border border-orange-500 bg-orange-500/20 flex items-center justify-center text-xs">🎓</div>
                        <div>
                          <span className="text-xs font-bold text-white block">turkcemiz.sozumuzun.gucu</span>
                          <span className="text-[9px] text-orange-500 font-kids font-bold">Öğretmenler Birliği</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">TAKİP ET</span>
                    </div>

                    {/* Image visual inside instagram shell */}
                    <div 
                      onClick={() => setActiveLightboxImage(sosyalMedyaGorsel2)}
                      className="relative rounded-2xl overflow-hidden border-2 border-stone-800/50 cursor-pointer group-hover:border-[#E07A5F]/50 aspect-[9/16] max-h-[480px] flex items-center justify-center bg-black"
                    >
                      <img
                        src={sosyalMedyaGorsel2}
                        alt="Reels Sosyal Medya Canlandırması 2"
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      {/* Interactive overlay on hover */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 select-none">
                        <span className="bg-[#E07A5F] hover:bg-[#c7654a] text-white rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                          <Compass size={24} />
                        </span>
                        <span className="text-xs font-bold text-[#FFFDF5] font-sans">Slaytı Tam Ekran Yap</span>
                      </div>
                    </div>

                    {/* Reel stats/caption */}
                    <div className="space-y-2 bg-stone-950/40 p-3 rounded-2xl border border-stone-800/45">
                      <div className="flex justify-between items-center text-xs text-stone-400">
                        <div className="flex gap-3">
                          <span className="font-bold text-rose-500">❤️ 12.4K</span>
                          <span>💬 156</span>
                          <span>✈️ 2.0K</span>
                        </div>
                        <span className="font-mono text-[9px]">Görüntülenme: 94K</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-stone-300 font-sans">
                        <strong className="text-white">turkcemiz.sozumuzun.gucu:</strong> Türkçe, düşüncemizin kökü, kimliğimizin sesidir. Sınıflarımızda akıllı tahta Kelime Muhafızı uygulamamızla dilimizi derinleştiriyoruz! 💚💻
                      </p>
                      <div className="text-[10px] text-stone-500 flex gap-1.5 flex-wrap">
                        <span>#SözümüzünGücü</span>
                        <span>#EğitimBilişim</span>
                        <span>#MuhafızÖğretmenler</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* TAB 4: USER PROFILE DIL MUHAFIZI HUT */}
        {activeTab === "profil" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-kids-wiggle">
            
            {/* Main profile card */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)]">
              
              <div className="text-center pb-6 border-b border-stone-200 flex flex-col sm:flex-row items-center gap-6 justify-start text-left">
                
                {/* Chosen large avatar visual */}
                <div className="bg-[#FDFCF0] p-3 rounded-full border-4 border-[#009393] relative">
                  <MascotAvatar name={profile.selectedAvatarId} size={96} animated={true} />
                  <div className="absolute bottom-0 right-0 bg-[#E07A5F] text-white p-1 rounded-full border-2 border-white shadow">
                    <Award size={18} />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  
                  {/* Name Input Edit area */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#5A5A40] mb-1">Muhafız İsminiz:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={profile.username}
                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                        maxLength={24}
                        placeholder="Örn: Dil Gözcüsü Alperen"
                        className="bg-[#FDFCF0] border-2 border-[#CCD5AE] px-3.5 py-1.5 text-[#2D241E] font-kids text-lg font-bold rounded-xl focus:border-[#009393] focus:outline-none transition-all flex-1 shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 text-xs font-bold block uppercase tracking-wider">Unvanınız / Mevkiniz:</span>
                    <span className="bg-[#FCDFD7] text-[#E07A5F] text-sm font-kids font-bold px-3 py-1 rounded-full inline-block mt-0.5 border border-[#E07A5F]/30">
                      🛡️ {userTitle}
                    </span>
                  </div>

                </div>

              </div>

              {/* Progress Level and statistics inside profile */}
              <div className="py-6 border-b border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-sm font-kids font-bold text-[#5A5A40]">
                  <span className="flex items-center gap-1.5 text-[#009393]">
                    <Shield size={18} />
                    Seviye {userLevel} Gelişim Oranı
                  </span>
                  <span>{profile.rankXP % 30} / 30 XP</span>
                </div>
                
                <div className="w-full bg-[#FDFCF0] rounded-full h-4 border border-[#CCD5AE] overflow-hidden shadow-inner relative">
                  <div 
                    className="bg-[#009393] h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${Math.min(100, (profile.rankXP % 30) * 3.3)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#5A5A40]">
                    Bir Sonraki Seviye İçin {30 - (profile.rankXP % 30)} XP Gerekli!
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-2">
                  <div className="bg-[#FDFCF0] p-3 rounded-2xl text-center border border-[#CCD5AE]">
                    <span className="block text-2xl font-mono font-bold text-[#009393]">{profile.totalCorrected}</span>
                    <span className="text-[10px] uppercase font-bold text-[#5A5A40] block tracking-wider">Kurtarılan Sözcük</span>
                  </div>
                  <div className="bg-[#FDFCF0] p-3 rounded-2xl text-center border border-[#CCD5AE]">
                    <span className="block text-2xl font-mono font-bold text-[#009393]">{profile.rankXP}</span>
                    <span className="text-[10px] uppercase font-bold text-[#5A5A40] block tracking-wider">Toplam Tecrübe (XP)</span>
                  </div>
                </div>
              </div>

              {/* Avatar Switcher selector carousel */}
              <div className="py-4 space-y-3">
                <span className="block text-[#5A5A40] text-sm font-kids font-bold">Kültürel Kahraman Avatarımı Seç:</span>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { id: "keloglan", title: "Keloğlan", comp: <KeloglanAvatar size={48} animated={false} /> },
                    { id: "nasreddin", title: "N. Hoca", comp: <NasreddinHocaAvatar size={48} animated={false} /> },
                    { id: "hacivat", title: "Hacivat", comp: <HacivatAvatar size={48} animated={false} /> },
                    { id: "karagoz", title: "Karagöz", comp: <KaragozAvatar size={48} animated={false} /> },
                    { id: "dedekorkut", title: "D. Korkut", comp: <DedeKorkutAvatar size={48} animated={false} /> }
                  ].map((avatarItem) => {
                    const isSelected = profile.selectedAvatarId === avatarItem.id;
                    return (
                      <button
                        key={avatarItem.id}
                        onClick={() => setProfile({ ...profile, selectedAvatarId: avatarItem.id })}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected 
                            ? "border-[#009393] bg-[#F1F9F9] ring-2 ring-[#009393]/40" 
                            : "border-stone-200 hover:bg-[#FDFCF0] hover:border-[#CCD5AE]"
                        }`}
                      >
                        <div className="shrink-0">{avatarItem.comp}</div>
                        <span className="text-[10px] font-kids font-bold text-[#2D241E] truncate max-w-full">
                          {avatarItem.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Badges Locker Display panel */}
            <div className="bg-white p-6 rounded-3xl border-2 border-[#009393] shadow-[8px_8px_0px_rgba(0,147,147,0.3)] space-y-4">
              <span className="font-kids font-bold text-base text-[#2D241E] flex items-center gap-2">
                <Award className="text-[#E07A5F]" />
                Duyarlılık Rozetsandığı (Kilit Açma Mücadelesi)
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {GAMIFIED_BADGES.map((badge) => {
                  const unlocked = profile.unlockedBadges.includes(badge.id);

                  return (
                    <div
                      key={badge.id}
                      className={`border px-4 py-3 rounded-2xl flex items-start gap-3 transition-all relative overflow-hidden ${
                        unlocked 
                          ? `${badge.color} shadow-sm cursor-pointer hover:scale-101 border-[#CCD5AE]` 
                          : "bg-stone-50 border-stone-200 opacity-60 grayscale"
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-white border shrink-0 mt-0.5">
                        {badge.iconName === "Shield" && <Shield className={badge.textColor} size={20} />}
                        {badge.iconName === "Search" && <Search className={badge.textColor} size={20} />}
                        {badge.iconName === "Flame" && <Flame className={badge.textColor} size={20} />}
                        {badge.iconName === "Compass" && <Compass className={badge.textColor} size={20} />}
                        {badge.iconName === "Sparkles" && <Sparkles className={badge.textColor} size={20} />}
                      </div>

                      <div className="space-y-0.5 flex-1 select-none">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-kids font-bold tracking-tight">{badge.title}</h4>
                          {!unlocked && <Lock size={12} className="text-stone-400 shrink-0" />}
                        </div>
                        <p className="text-[10px] leading-relaxed text-stone-600 font-sans">
                          {badge.description}
                        </p>
                        <div className="pt-1.5 flex items-center gap-1.5 text-[9px] font-extrabold text-[#5A5A40] uppercase tracking-widest">
                          Görev: <span className="underline">{badge.requirement}</span>
                        </div>
                      </div>

                      {unlocked && (
                        <div className="absolute top-1 right-2 text-xl animate-kids-wiggle">🎉</div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        </div> {/* Close lg:col-span-9 */}
      </main>

      {/* Footer detailing the educational target */}
      <footer className="bg-[#2D241E] text-stone-350 py-6 border-t-4 border-[#E07A5F] mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <span className="font-kids font-bold text-[#E9EDC9] text-base block">Dezenformasyona Uğramış Türkçe Kelimeleri Tespit ve Düzeltme Sistemi</span>
            <p className="text-xs text-stone-300/80 max-w-xl font-sans">
              Bu platform, çocuklarımızın dijital çağda Türkçeyi yutmadan, dejenere etmeden, sesli harflerine ve yazım kurallarına sahip çıkarak temiz bir dille konuşmasını pekiştirmek için tasarlanmıştır.
            </p>
          </div>
          <div className="text-xs text-[#CCD5AE] font-mono text-center md:text-right">
            <span>© 2026 Türkçe Kelime Muhafızı · Sürüm 1.4.0</span>
          </div>
        </div>
      </footer>

      {activeLightboxImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[9999] animate-fade-in"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 border-4 border-[#D4A373] rounded-3xl p-2.5 flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute top-4 right-4 bg-white hover:bg-stone-100 text-stone-900 font-bold p-2 rounded-full cursor-pointer z-20 shadow-md border border-stone-200 flex items-center justify-center"
              title="Kapat"
            >
              <X size={20} />
            </button>
            <div className="flex-1 w-full flex items-center justify-center p-4 overflow-hidden min-h-[40vh] max-h-[70vh]">
              <img
                src={activeLightboxImage}
                alt="Büyük Görünüm"
                className="max-w-full max-h-full object-contain rounded-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-[#FFFDF5] p-4 border-t-2 border-[#CCD5AE] font-sans rounded-b-2xl">
              <p className="text-stone-800 text-xs sm:text-sm font-bold text-center">
                {activeLightboxImage === logoTurkceMuhafizi && "Logomuz: Karamanoğlu Mehmet Bey ve Türkçe Dil fermanı"}
                {activeLightboxImage === katmanlarYapayZeka && "Yapay Zekalı Yapı Katmanları: Doğal Dil İşleme, Yapay Zeka Analizi, Düzeltme Motoru, Kullanıcı Arayüzü"}
                {activeLightboxImage === amaclariPastaGrafigi && "Projenin Stratejik Amaçları: Kelime Tespiti, Doğru Karşılıklar, Dil Kalitesi Artırımı, Türkçe Bilinci Geliştirme"}
                {activeLightboxImage === dilEgitimDinamikleri && "Dil ve Eğitim Dinamikleri Çeyreği: Türkçe Odaklı, Büyük Veri İhtiyacı, Eğitim Teknolojileri, Dil Değişim Hızı"}
                {activeLightboxImage === riskGuvenlikCemberi && "Risk Analizi & Güvenlik Çemberi: Teknik Riskler, Etik Riskler, Operasyonel Riskler"}
                {activeLightboxImage === sosyalMedyaGorsel1 && "Sosyal Medya Kampanyası: 'Gençlerimizin Günlük Dil Tercihleri' Saha Canlandırması (Instagram Reels)"}
                {activeLightboxImage === sosyalMedyaGorsel2 && "Akıllı Tahta ve Sınıf Eğitimi: 'Yabancı Kelimelere Türkçe Alternatifler' Tanıtımı (Instagram Reels)"}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
