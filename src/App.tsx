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
  AlertCircle
} from "lucide-react";

import MascotAvatar, {
  NasreddinHocaAvatar,
  HacivatAvatar,
  KaragozAvatar,
  DedeKorkutAvatar,
  KeloglanAvatar
} from "./components/MascotAvatars";
import { GAMIFIED_BADGES, SAMPLE_TEXTS } from "./data";
import { Correction, DayWord, DynamicStats, UserProfile } from "./types";

export default function App() {
  // Navigation Tabs: "düzeltici" (Corrector), "skorbord" (Scoreboard), "gunun-kelimesi" (Daily Word), "profil" (Profile)
  const [activeTab, setActiveTab] = useState<"duzeltici" | "skorbord" | "gunun-kelimesi" | "profil">("duzeltici");

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
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between">
      
      {/* Top Colorful Header (Traditional tiles, modernized, kid-friendly) */}
      <header className="bg-white border-b-4 border-turquoise-500 shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            {/* Super friendly traditional logo widget */}
            <div className="animate-kids-wiggle">
              <NasreddinHocaAvatar size={64} animated={false} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-kids font-bold text-turquoise-700 tracking-tight">Türkçe Kelime Muhafızı</h1>
                <span className="bg-clay-100 text-clay-800 text-xs font-bold px-2.5 py-1 rounded-full border border-clay-500 font-kids">7-14 Yaş</span>
              </div>
              <p className="text-xs text-stone-500 max-w-md font-sans">
                Geleneksel karakterlerimiz Hoca, Hacivat ve Keloğlan ile dezenformasyona dur de, dilimizi pırıl pırıl koru!
              </p>
            </div>
          </div>

          {/* Dil Muhafızı Mini Profile Status Tracker */}
          <div 
            onClick={() => setActiveTab("profil")}
            className="flex items-center gap-3 bg-stone-50 hover:bg-stone-100 border-2 border-stone-200 p-2.5 rounded-2xl cursor-pointer transition-all self-stretch sm:self-auto"
          >
            <div className="w-10 h-10 rounded-full bg-turquoise-100 border border-turquoise-400 flex items-center justify-center overflow-hidden">
              <MascotAvatar name={profile.selectedAvatarId} size={40} animated={false} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs font-kids font-bold text-stone-700">
                <span>{profile.username}</span>
                <span className="text-turquoise-600">Seviye {userLevel}</span>
              </div>
              <div className="w-32 bg-stone-200 h-2 rounded-full overflow-hidden mt-1 border border-stone-300">
                <div 
                  className="bg-turquoise-500 h-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (profile.rankXP % 30) * 3.3)}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Fun Navigation Tab Rails */}
        <div className="max-w-6xl mx-auto px-4 flex gap-1 justify-start">
          <button
            onClick={() => setActiveTab("duzeltici")}
            className={`px-4 sm:px-6 py-2.5 font-kids font-bold text-sm sm:text-base rounded-t-2xl border-t-2 border-x-2 transition-all flex items-center gap-2 ${
              activeTab === "duzeltici"
                ? "bg-stone-50 border-stone-200 text-turquoise-700 border-b-stone-50 z-10 bottom-[-2px] relative"
                : "bg-stone-150 border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Sparkles size={18} />
            Kelime Kurtarıcı
          </button>
          
          <button
            onClick={handleViewScoreboard}
            className={`px-4 sm:px-6 py-2.5 font-kids font-bold text-sm sm:text-base rounded-t-2xl border-t-2 border-x-2 transition-all flex items-center gap-2 ${
              activeTab === "skorbord"
                ? "bg-stone-50 border-stone-200 text-turquoise-700 border-b-stone-50 z-10 bottom-[-2px] relative"
                : "bg-stone-150 border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            }`}
          >
            <TrendingUp size={18} />
            Kelime Ağacı & Skorbord
          </button>

          <button
            onClick={() => setActiveTab("gunun-kelimesi")}
            className={`px-4 sm:px-6 py-2.5 font-kids font-bold text-sm sm:text-base rounded-t-2xl border-t-2 border-x-2 transition-all flex items-center gap-2 ${
              activeTab === "gunun-kelimesi"
                ? "bg-stone-50 border-stone-200 text-turquoise-700 border-b-stone-50 z-10 bottom-[-2px] relative"
                : "bg-stone-150 border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Compass size={18} />
            Hazine Sandığı (Günün Kelimesi)
          </button>

          <button
            onClick={() => setActiveTab("profil")}
            className={`px-4 sm:px-6 py-2.5 font-kids font-bold text-sm sm:text-base rounded-t-2xl border-t-2 border-x-2 transition-all flex items-center gap-2 ${
              activeTab === "profil"
                ? "bg-stone-50 border-stone-200 text-turquoise-700 border-b-stone-50 z-10 bottom-[-2px] relative"
                : "bg-stone-150 border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100"
            }`}
          >
            <User size={18} />
            Profil Kulübesi
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="max-w-6xl w-full mx-auto p-4 flex-1">
        
        {/* TAB 1: INTERACTIVE CORRECTOR */}
        {activeTab === "duzeltici" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Input Box Panel */}
            <div className="lg:col-span-7 bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col gap-4">
              
              <div className="flex items-center justify-between">
                <span className="font-kids font-bold text-lg text-stone-700 flex items-center gap-2">
                  <BookMarked className="text-turquoise-500" />
                  Kelimelerini Kontrol Et
                </span>
                <span className="text-xs font-mono text-stone-400">Türkçe Muhafızı Yapay Zekası</span>
              </div>

              {/* Sample Texts pre-selector */}
              <div>
                <label className="block text-xs font-bold text-stone-500 mb-2">Hızlı Örneklerle Dene:</label>
                <div className="flex flex-wrap gap-2">
                  {SAMPLE_TEXTS.map((sample, key) => (
                    <button
                      key={key}
                      onClick={() => setInputText(sample.text)}
                      title={sample.description}
                      className="bg-stone-100 hover:bg-turquoise-50 hover:border-turquoise-400 text-xs font-bold text-stone-600 px-3 py-1.5 rounded-full border border-stone-200 transition-all cursor-pointer"
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
                  className="w-full bg-stone-50 hover:bg-stone-50/50 focus:bg-white text-stone-800 text-lg p-4 rounded-2xl border-2 border-stone-200 focus:border-turquoise-500 focus:outline-none transition-all placeholder-stone-400 font-sans"
                />
                
                {inputText && (
                  <button
                    onClick={handleReset}
                    className="absolute bottom-4 right-4 bg-stone-200 hover:bg-stone-300 text-stone-600 p-2 rounded-full transition-all"
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
                  className="flex-1 bg-turquoise-500 hover:bg-turquoise-600 disabled:bg-stone-200 disabled:text-stone-400 text-white font-kids font-bold text-lg py-3.5 px-6 rounded-2xl cursor-pointer shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <Sparkles size={22} className={loading ? "animate-spin" : ""} />
                  {loading ? "Muhafızlar İnceliyor..." : "Yapay Zeka ile Analiz Et 🔮"}
                </button>
              </div>

              {/* Loading Display Box */}
              {loading && (
                <div className="p-6 bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl text-center space-y-4 animate-pulse">
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
                  <p className="text-turquoise-800 font-kids font-bold text-base">{loadingMessage}</p>
                </div>
              )}

              {/* Corrector Response Outputs */}
              {correctorResult && !loading && (
                <div className="space-y-4">
                  
                  {/* Highlight text renderer */}
                  {renderHighlightedSentence()}

                  {/* Dynamic Help prompt if errors found */}
                  {correctorResult.corrections && correctorResult.corrections.length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-clay-100 border border-clay-500 text-clay-800 rounded-xl">
                      <div className="flex items-center gap-2">
                        <AlertCircle size={18} className="text-clay-600 shrink-0" />
                        <span className="text-sm font-medium">Kelimelerin üzerine tıklayıp doğrusunu görebilirsin!</span>
                      </div>
                      <button
                        onClick={handleAutoCorrectAll}
                        className="bg-white hover:bg-stone-50 text-clay-800 border border-clay-500 text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-sm cursor-pointer"
                      >
                        Sihirli Dokunuşla Hepsini Düzelt ✨
                      </button>
                    </div>
                  )}

                  <div className="text-xs text-stone-400 font-mono text-right">
                    İnceleme Motoru: <span className="text-turquoise-600 font-bold">{correctorResult.engine}</span>
                  </div>
                </div>
              )}

            </div>

            {/* Left Box Panel: Mascot Speech bubbles / Dynamic detail Cards */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              
              {selectedCorrection ? (
                // Beautifully designed interactive bubble based on selected correction
                <div className="bg-white border-4 border-turquoise-400 rounded-3xl p-5 shadow-lg relative animate-kids-wiggle">
                  
                  {/* Crown Accent top-right */}
                  <div className="absolute top-[-15px] left-8 bg-turquoise-400 text-white font-kids font-bold text-xs px-3 py-1 rounded-full border-2 border-white shadow-md">
                    {selectedCorrection.mascot} Anlatıyor 🎭
                  </div>

                  {/* Mascot Avatar and Comparison */}
                  <div className="flex gap-4 items-start pt-3 mb-4">
                    <div className="bg-gradient-to-br from-turquoise-50 to-turquoise-100 p-2.5 rounded-2xl border-2 border-turquoise-200">
                      <MascotAvatar name={selectedCorrection.mascot} size={72} animated={true} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <label className="block text-xs uppercase font-extrabold tracking-widest text-stone-400">Sözün Özü:</label>
                      <div className="flex items-center gap-3">
                        <span className="text-rose-500 line-through text-lg font-bold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">{selectedCorrection.original}</span>
                        <span className="text-stone-400 font-bold">➡️</span>
                        <span className="text-teal-600 text-2xl font-kids font-extrabold bg-teal-50 px-3 py-1 rounded-lg border-2 border-teal-300 shadow-sm">{selectedCorrection.corrected}</span>
                      </div>
                      <div className="pt-1.5">
                        <span className="bg-stone-100 text-stone-600 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase border">
                          Hata Türü: {selectedCorrection.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Explanation Section */}
                  <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3 shadow-inner">
                    <p className="text-stone-800 text-base font-sans font-medium italic relative">
                      &ldquo;{selectedCorrection.reason}&rdquo;
                    </p>
                    
                    <div className="border-t border-stone-200 pt-2 text-sm text-stone-600">
                      <span className="font-bold text-stone-800">Örnek Kullanım:</span>
                      <p className="text-stone-700 italic font-medium bg-white p-2 rounded-xl mt-1.5 border">
                        {selectedCorrection.example}
                      </p>
                    </div>
                  </div>

                  {/* Option to replace card directly */}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => replaceWord(selectedCorrection.original, selectedCorrection.corrected)}
                      className="flex-1 bg-stone-900 border-2 border-stone-950 hover:bg-stone-800 text-white font-kids font-bold py-2.5 px-4 rounded-xl shadow cursor-pointer transition-all active:scale-[0.98]"
                    >
                      Sadece Bu Kelimeyi Düzelt 🛠️
                    </button>
                    <button
                      onClick={() => setSelectedCorrection(null)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-600 border px-3 rounded-xl transition-all"
                    >
                      Kapat
                    </button>
                  </div>

                </div>
              ) : (
                // Default Helper panel if nothing selected yet
                <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col gap-6 text-center">
                  <div className="flex justify-center gap-1">
                    <NasreddinHocaAvatar size={80} />
                  </div>
                  <div>
                    <h3 className="text-xl font-kids font-bold text-stone-700">Hey Dostlar! Dil Muhafızlığına Hoş Geldiniz!</h3>
                    <p className="text-sm text-stone-500 mt-2 leading-relaxed">
                      Lütfen soldaki kutuya cümleni yazıp dezenformasyon analizi başlat. Yanlış yazılan, harfi yutulmuş veya özentili kelimeleri tespit edip bu paneli pırıl pırıl dolduracağız!
                    </p>
                  </div>

                  <div className="bg-stone-50 p-4 rounded-2xl border text-left space-y-3">
                    <h4 className="text-xs font-bold text-stone-600 uppercase tracking-wider">Muhafızlık Kuralları:</h4>
                    <ul className="text-xs text-stone-500 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-teal-500 font-bold">✓</span> Kelimeleri yazarken sesli harflerimizi (a, e, ı, i, o, ö, u, ü) kıskançça koru.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-teal-500 font-bold">✓</span> Klavyeni tembelleştirme, noktalarını eksiltme.
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-teal-500 font-bold">✓</span> Yabancı slangler yerine sıcacık Türkçemizi konuş.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Informative Side Card: Dil Muhafızı Dereceleri */}
              <div className="bg-gradient-to-br from-turquoise-500 to-turquoise-600 text-white p-5 rounded-3xl shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Shield size={24} className="text-teal-200" />
                  <h4 className="font-kids font-bold text-base">Haftalık Dil Muhafızı Skor Defteri</h4>
                </div>
                <p className="text-xs text-teal-100">
                  Bugün toplam <span className="font-bold underline text-white">{totalPlatformCorrections}</span> dezenformasyon kelime Muhafızlar tarafından temizlendi!
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4 text-center">
                  <div>
                    <span className="block text-xl font-bold font-mono">{profile.totalCorrected}</span>
                    <span className="text-[10px] text-teal-100 uppercase tracking-wide">Düzelttiğin Kelime</span>
                  </div>
                  <div>
                    <span className="block text-xl font-bold font-mono">{profile.rankXP}</span>
                    <span className="text-[10px] text-teal-100 uppercase tracking-wide">Duyarlılık Puanın (XP)</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SCOREBOARD & SUCCESS DIL AGACI */}
        {activeTab === "skorbord" && (
          <div className="space-y-6">
            
            {/* Header intro */}
            <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h2 className="text-2xl font-kids font-bold text-stone-800">Başarı Ağacı & Karıştırılan Kelimeler</h2>
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full border border-teal-300">Dinamik Platform Skorları</span>
                </div>
                <p className="text-sm text-stone-500">
                  Öğrencilerimiz tarafından en çok yazılan, dezenformasyona uğramış kelimelerin güncel listesi ve senin düzeltme ağacının yeşerme süreci!
                </p>
              </div>

              {/* dynamic score summary */}
              <div className="bg-turquoise-50 border-2 border-turquoise-200 px-6 py-4 rounded-2xl text-center shadow-inner shrink-0">
                <span className="text-xs text-stone-400 capitalize block font-bold">Düzelti Başarı Ağacı</span>
                <span className="text-3xl font-mono font-bold text-turquoise-600 block">{profile.totalCorrected} Dal Blooming</span>
                <p className="text-[10px] text-stone-500 mt-1">Ağacın her 3 düzeltmede bir elma verecektir!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Blooming Success Tree Visual widget */}
              <div className="lg:col-span-5 bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col items-center text-center">
                <span className="font-kids font-bold text-base text-stone-700 block mb-2">Benim Dil Muhafızlığı Gelişim Ağacım 🌳</span>
                
                {/* Custom SVG Tree rendering apples representing rescued words */}
                <div className="w-full max-w-[280px] h-[280px] bg-stone-50 rounded-2xl relative border flex items-center justify-center overflow-hidden my-4">
                  
                  {/* Tree Trunk & branches */}
                  <svg width="220" height="240" viewBox="0 0 100 100" className="absolute bottom-0 z-0">
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
                    Dil muhafızı, düzelttiğin her dezenformasyon kelimesi bu başarı ağacını pırıl pırıl besliyor! Toplamda <span className="font-bold text-teal-600">{Math.floor(profile.totalCorrected / 2)} adet elma</span> büyüttün.
                  </p>
                </div>

              </div>

              {/* Dynamic Confused Words Scoreboard */}
              <div className="lg:col-span-7 bg-white p-5 rounded-3xl border-2 border-stone-200 shadow-sm flex flex-col gap-4">
                <span className="font-kids font-bold text-base text-stone-700 flex items-center gap-2">
                  <TrendingUp className="text-turquoise-500" />
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
                          className="bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-kids font-bold ${positionBadge}`}>
                              {idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-rose-500 line-through text-sm font-semibold">{item.word}</span>
                                <span className="text-stone-400">➡️</span>
                                <span className="text-teal-600 text-base font-bold bg-white px-2 py-0.5 rounded border border-teal-200">{item.corrected}</span>
                              </div>
                              <p className="text-[10px] text-stone-500 pr-4 mt-1 leading-normal italic">&ldquo;{item.reason}&rdquo;</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 border-t sm:border-0 pt-2 sm:pt-0">
                            <span className="bg-stone-200/60 text-stone-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                              {item.type}
                            </span>
                            <span className="bg-red-50 text-red-600 font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-red-200 flex items-center gap-1.5 shadow-sm">
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

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-500 leading-relaxed font-sans">
                  💡 <span className="font-bold text-stone-700">Dil Muhafızlığı İnfografiği:</span> Bu tablodaki düzeltme sayıları, tüm akranlarınla kurduğunuz ortak mücadelenin eseridir. En çok karıştırılan kelimeleri görerek kendimizi daha güçlü kılabiliriz!
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
              <div className="bg-white border-2 border-stone-200 p-8 rounded-3xl text-center shadow-md space-y-6 flex flex-col items-center">
                
                <div className="w-28 h-28 bg-stone-50 rounded-full border flex items-center justify-center relative animate-kids-wiggle">
                  <div className="text-5xl">🎁</div>
                  <div className="absolute top-0 right-0 bg-orange-500 text-white font-kids font-bold text-xs p-1 rounded-full animate-bounce">Yeni!</div>
                </div>

                <div>
                  <h2 className="text-2xl font-kids font-bold text-stone-800">Altın Hazine Sandığı</h2>
                  <p className="text-sm text-stone-500 mt-2 max-w-sm mx-auto">
                    Heyecan verici bir Türkçe kelime ve onun ardındaki sevimli geleneksel hikayeyi keşfetmek için kutsal sandığın kilidini aç, Muhafız!
                  </p>
                </div>

                <button
                  onClick={handleOpenTreasure}
                  className="bg-orange-500 hover:bg-orange-600 border-2 border-orange-600 text-white font-kids font-bold text-lg py-3 px-8 rounded-2xl shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  Sandığın Kilidini Kaldır ve Oku 🔑
                </button>

              </div>
            ) : (
              // Elegant illuminated manuscript of the DayWord
              dayWord && (
                <div className="bg-gradient-to-b from-[#FFFDF5] to-[#fcfaf0] border-4 border-[#D97706]/40 p-6 rounded-3xl shadow-lg space-y-5 relative animate-kids-wiggle">
                  
                  {/* Decorative corner borders representing Turkish pattern ornaments */}
                  <div className="absolute top-2 left-2 text-[#D97706] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute top-2 right-2 text-[#D97706] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute bottom-2 left-2 text-[#D97706] opacity-30 text-xl font-bold">❈</div>
                  <div className="absolute bottom-2 right-2 text-[#D97706] opacity-30 text-xl font-bold">❈</div>

                  <div className="text-center pt-2">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-[#B45309]">Kültür Defterimizden</span>
                    <h2 className="text-3xl font-kids font-bold text-[#78350F] mt-1">Günün Kültür Kelimesi 📜</h2>
                    <p className="text-xs text-stone-400 mt-1">Her gün farklı bilgi sandığı açılır!</p>
                  </div>

                  {/* Word Display Banner */}
                  <div className="bg-[#FEF3C7] border-2 border-[#F59E0B] p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#B45309] block">Dezenformasyon Hali:</span>
                      <span className="text-rose-600 line-through text-lg font-semibold">{dayWord.original}</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[#D97706] font-bold text-xl">➡️</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#B45309] block">Pürüzsüz Türkçe:</span>
                      <span className="text-emerald-700 text-2xl font-kids font-extrabold block">{dayWord.corrected}</span>
                    </div>
                  </div>

                  {/* Fun story / tongue twister explanation */}
                  <div className="bg-white border border-[#F3E8FF] p-4 rounded-xl shadow-inner space-y-3">
                    <span className="bg-violet-100 text-violet-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Hoca der ki / Tekerleme
                    </span>
                    <p className="text-stone-800 text-base leading-relaxed italic font-medium font-sans">
                      &ldquo;{dayWord.story}&rdquo;
                    </p>
                  </div>

                  {/* Example */}
                  <div className="bg-stone-50/50 p-4 rounded-xl border border-stone-200">
                    <span className="text-xs font-bold text-stone-800 block mb-1">Cümle İçinde Kullanalım:</span>
                    <p className="text-[#78350F] italic font-semibold text-sm">
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
                      className="flex-1 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-kids font-bold py-2.5 px-4 rounded-xl transition-all shadow cursor-pointer text-center"
                    >
                      Düzelticimizde Dene 🛠️
                    </button>
                    <button
                      onClick={() => setTreasureOpened(false)}
                      className="bg-stone-100 hover:bg-stone-200 text-stone-600 border text-sm font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      Kutuyu Kapat
                    </button>
                  </div>

                </div>
              )
            )}

          </div>
        )}

        {/* TAB 4: USER PROFILE DIL MUHAFIZI HUT */}
        {activeTab === "profil" && (
          <div className="max-w-2xl mx-auto space-y-6 animate-kids-wiggle">
            
            {/* Main profile card */}
            <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm">
              
              <div className="text-center pb-6 border-b border-stone-200 flex flex-col sm:flex-row items-center gap-6 justify-start text-left">
                
                {/* Chosen large avatar visual */}
                <div className="bg-gradient-to-br from-turquoise-100 to-turquoise-200 p-3 rounded-full border-4 border-turquoise-400 relative">
                  <MascotAvatar name={profile.selectedAvatarId} size={96} animated={true} />
                  <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-1 rounded-full border-2 border-white shadow">
                    <Award size={18} />
                  </div>
                </div>

                <div className="space-y-2 flex-1">
                  
                  {/* Name Input Edit area */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-stone-400 mb-1">Muhafız İsminiz:</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={profile.username}
                        onChange={e => setProfile({ ...profile, username: e.target.value })}
                        maxLength={24}
                        placeholder="Örn: Dil Gözcüsü Alperen"
                        className="bg-stone-50 border-2 border-stone-200 px-3.5 py-1.5 text-stone-800 font-kids text-lg font-bold rounded-xl focus:border-turquoise-500 focus:outline-none transition-all flex-1"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="text-stone-400 text-xs font-bold block uppercase tracking-wider">Unvanınız / Mevkiniz:</span>
                    <span className="bg-orange-100 text-orange-850 text-sm font-kids font-bold px-3 py-1 rounded-full inline-block mt-0.5 border border-orange-300">
                      🛡️ {userTitle}
                    </span>
                  </div>

                </div>

              </div>

              {/* Progress Level and statistics inside profile */}
              <div className="py-6 border-b border-stone-200 space-y-3">
                <div className="flex justify-between items-center text-sm font-kids font-bold text-stone-700">
                  <span className="flex items-center gap-1.5 text-turquoise-600">
                    <Shield size={18} />
                    Seviye {userLevel} Gelişim Oranı
                  </span>
                  <span>{profile.rankXP % 30} / 30 XP</span>
                </div>
                
                <div className="w-full bg-stone-100 rounded-full h-4 border border-stone-300 overflow-hidden shadow-inner relative">
                  <div 
                    className="bg-turquoise-500 h-full transition-all duration-500 rounded-full" 
                    style={{ width: `${Math.min(100, (profile.rankXP % 30) * 3.3)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-stone-600">
                    Bir Sonraki Seviye İçin {30 - (profile.rankXP % 30)} XP Gerekli!
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-2">
                  <div className="bg-stone-50 p-3 rounded-2xl text-center border">
                    <span className="block text-2xl font-mono font-bold text-turquoise-600">{profile.totalCorrected}</span>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Kurtarılan Sözcük</span>
                  </div>
                  <div className="bg-stone-50 p-3 rounded-2xl text-center border">
                    <span className="block text-2xl font-mono font-bold text-turquoise-600">{profile.rankXP}</span>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Toplam Tecrübe (XP)</span>
                  </div>
                </div>
              </div>

              {/* Avatar Switcher selector carousel */}
              <div className="py-4 space-y-3">
                <span className="block text-stone-700 text-sm font-kids font-bold">Kültürel Kahraman Avatarımı Seç:</span>
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
                            ? "border-turquoise-500 bg-turquoise-50 ring-2 ring-turquoise-400/50" 
                            : "border-stone-200 hover:bg-stone-50 hover:border-stone-400"
                        }`}
                      >
                        <div className="shrink-0">{avatarItem.comp}</div>
                        <span className="text-[10px] font-kids font-bold text-stone-600 truncate max-w-full">
                          {avatarItem.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Badges Locker Display panel */}
            <div className="bg-white p-6 rounded-3xl border-2 border-stone-200 shadow-sm space-y-4">
              <span className="font-kids font-bold text-base text-stone-700 flex items-center gap-2">
                <Award className="text-orange-500" />
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
                          ? `${badge.color} shadow-sm cursor-pointer hover:scale-101` 
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
                        <div className="pt-1.5 flex items-center gap-1.5 text-[9px] font-extrabold text-stone-500 uppercase tracking-widest">
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

      </main>

      {/* Footer detailing the educational target */}
      <footer className="bg-stone-900 text-stone-400 py-6 border-t-4 border-clay-500 mt-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-1">
            <span className="font-kids font-bold text-white text-base block">Dezenformasyona Uğramış Türkçe Kelimeleri Tespit ve Düzeltme Sistemi</span>
            <p className="text-xs text-stone-400 max-w-xl">
              Bu platform, çocuklarımızın dijital çağda Türkçeyi yutmadan, dejenere etmeden, sesli harflerine ve yazım kurallarına sahip çıkarak temiz bir dille konuşmasını pekiştirmek için tasarlanmıştır.
            </p>
          </div>
          <div className="text-xs text-stone-500 font-mono text-center md:text-right">
            <span>© 2026 Türkçe Kelime Muhafızı · Sürüm 1.4.0</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
