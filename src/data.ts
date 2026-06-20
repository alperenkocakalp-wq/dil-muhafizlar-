import { Badge } from "./types";

export const GAMIFIED_BADGES: Badge[] = [
  {
    id: "ilk-muhafiz",
    title: "İlk Adım Koruyucusu",
    description: "Sistemde ilk kelime düzeltmesini veya tespitini gerçekleştirerek Türkçe Muhafızı yolculuğuna başladın!",
    iconName: "Shield",
    requirement: "1 Kelime Düzelt",
    color: "bg-teal-100 border-teal-300 text-teal-800",
    textColor: "text-teal-600"
  },
  {
    id: "kelime-avcisi",
    title: "Kelime Detektifi",
    description: "Dezenformasyona uğramış, harfleri yutulmuş veya yabancı özentili tam 5 kelimeyi pırıl pırıl Türkçeye çevirdin!",
    iconName: "Search",
    requirement: "5 Kelime Düzelt",
    color: "bg-amber-100 border-amber-300 text-amber-800",
    textColor: "text-amber-600"
  },
  {
    id: "turkce-hayati",
    title: "Arı Türkçe Kahramanı",
    description: "Tam 10 kelimeyi dezenformasyon kıskacından kurtararak Türkçe kelimelerin gücünü herkese gösterdin!",
    iconName: "Flame",
    requirement: "10 Kelime Düzelt",
    color: "bg-red-100 border-red-300 text-red-800",
    textColor: "text-red-600"
  },
  {
    id: "hazine-avcisi",
    title: "Günün Kelimesi Kaşifi",
    description: "Günün kelimesini bularak, onun ardındaki o tatlı kültür hikayesini keşfettin!",
    iconName: "Compass",
    requirement: "Günün Kelimesi Keşfet",
    color: "bg-blue-100 border-blue-300 text-blue-800",
    textColor: "text-blue-600"
  },
  {
    id: "hacivat-ortagi",
    title: "Karagöz ile Hacivat Ortağı",
    description: "En çok karıştırılan kelimeler paneline göz attın ve dil kurallarının can dostu oldun!",
    iconName: "Sparkles",
    requirement: "Skorborda Göz At",
    color: "bg-purple-100 border-purple-300 text-purple-800",
    textColor: "text-purple-600"
  }
];

export const SAMPLE_TEXTS = [
  {
    title: "Karışık Hatalar 🎭",
    text: "Dün akşam herkez bahçede toplandı. Şöför amca bize tiren yolunu gösterdi. Ama biz flim izlemek istedik okey? Sonra Keloğlan yanımıza gelip 'saol' dedi.",
    description: "Geleneksel yazım hataları, harf fazlalıkları ve yabancı kelime bir arada."
  },
  {
    title: "Sosyal Medya Kısaltmaları 📱",
    text: "Slm canım krdşm, nbr? Tmm aksam guzel bir oyun oynarız inşallah, simdi ders çalışmam lazım, bye bye bro!",
    description: "Sosyal medyada yutulan harfler, tıkız diller ve klavye üşengeçlikleri."
  },
  {
    title: "Klavye Tembelliği ⌨️",
    text: "Turkce dunya uzerindeki en guzel ve en tatli dillerden biridir. Kelimelerimizi seytan gibi bozmadan, sirin sekilde yazmaliyiz.",
    description: "Türkçe karakterlerin (ü, ş, ç, ğ, ı, ö) yutularak İngilizceleştirildiği örnek."
  }
];
