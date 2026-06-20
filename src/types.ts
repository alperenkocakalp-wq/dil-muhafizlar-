export interface Correction {
  original: string;
  corrected: string;
  type: "Yazım Hatası" | "Yabancı Özentisi" | "Kelime Bozumu" | "Klavye Tembelliği" | string;
  mascot: string;
  reason: string;
  example: string;
}

export interface CorrectResponse {
  success: boolean;
  engine: string;
  originalText: string;
  correctedText: string;
  corrections: Correction[];
}

export interface DynamicStats {
  word: string;
  corrected: string;
  count: number;
  reason: string;
  type: string;
}

export interface DayWord {
  original: string;
  corrected: string;
  type: string;
  explanation: string;
  example: string;
  story: string;
}

export interface UserProfile {
  username: string;
  selectedAvatarId: string; // "nasreddin" | "hacivat" | "karagoz" | "dedekorkut" | "keloglan"
  totalCorrected: number;
  rankXP: number; // 1 XP per correction
  unlockedBadges: string[]; // e.g. "ilk-adim", "dil-koruyucusu", "turkce-hayati", "kelime-avcisi"
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  requirement: string;
  color: string;
  textColor: string;
}
