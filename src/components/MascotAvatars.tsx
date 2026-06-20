import React from "react";

interface MascotProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

// 1. NASREDDİN HOCA - Turquoise robe, funny spectacles, large white turban, white beard, friendly smile
export function NasreddinHocaAvatar({ className = "", size = 96, animated = true }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
    >
      <circle cx="60" cy="60" r="56" fill="#F0FDFA" stroke="#0D9488" strokeWidth="3" />
      {/* Turban back shadow */}
      <ellipse cx="60" cy="34" rx="34" ry="16" fill="#E2E8F0" />
      {/* Main Turban */}
      <circle cx="60" cy="30" r="22" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
      <ellipse cx="60" cy="32" rx="14" ry="12" fill="#F8FAFC" />
      <path d="M44 32C44 26 50 20 60 20C70 20 76 26 76 32" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
      
      {/* Face */}
      <circle cx="60" cy="64" r="22" fill="#FED7AA" />
      
      {/* Gray Beard */}
      <path d="M38 64C38 84 46 94 60 94C74 94 82 84 82 64H38Z" fill="#E2E8F0" stroke="#CBCED6" strokeWidth="1.5" />
      <ellipse cx="60" cy="85" rx="14" ry="8" fill="#F1F5F9" />

      {/* Eyes */}
      <circle cx="51" cy="58" r="3" fill="#1E293B" />
      <circle cx="69" cy="58" r="3" fill="#1E293B" />
      
      {/* Spectacles / Gözlük */}
      <circle cx="51" cy="58" r="7" stroke="#EA580C" strokeWidth="2" fill="none" />
      <circle cx="69" cy="58" r="7" stroke="#EA580C" strokeWidth="2" fill="none" />
      <line x1="58" y1="58" x2="62" y2="58" stroke="#EA580C" strokeWidth="2" />
      <path d="M44 58C40 58 38 60 38 60" stroke="#EA580C" strokeWidth="1.5" fill="none" />
      <path d="M76 58C80 58 82 60 82 60" stroke="#EA580C" strokeWidth="1.5" fill="none" />

      {/* Rosy Cheeks */}
      <circle cx="43" cy="66" r="3" fill="#F43F5E" opacity="0.4" />
      <circle cx="77" cy="66" r="3" fill="#F43F5E" opacity="0.4" />

      {/* Pink Mouth */}
      <path d="M55 70C55 73 65 73 65 70" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Cute little nose */}
      <ellipse cx="60" cy="62" rx="4" ry="3" fill="#FDBA74" />
      
      {/* Turquoise Collar */}
      <path d="M42 86L60 102L78 86" stroke="#0D9488" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// 2. HACİVAT - Pointy beard, politeness, red/green traditional puppet hat, matching colors
export function HacivatAvatar({ className = "", size = 96, animated = true }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
    >
      <circle cx="60" cy="60" r="56" fill="#F0FDF4" stroke="#16A34A" strokeWidth="3" />
      
      {/* Traditional Hat (Külah) */}
      <path d="M38 42L60 12L82 42C82 42 70 46 60 46C50 46 38 42 38 42Z" fill="#DC2626" />
      <path d="M44 42L60 20L76 42" stroke="#FEF08A" strokeWidth="2" fill="none" />
      {/* Feather/Tassel detail */}
      <path d="M60 12C63 8 68 10 68 10" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
      
      {/* Face */}
      <path d="M38 42C38 42 36 68 60 74C84 68 82 42 82 42H38Z" fill="#FED7AA" />
      
      {/* Eye brow */}
      <path d="M46 51C50 49 53 51 53 51" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <path d="M74 51C70 49 67 51 67 51" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      {/* Eyes */}
      <circle cx="49" cy="55" r="3.5" fill="#1E293B" />
      <circle cx="71" cy="55" r="3.5" fill="#1E293B" />
      
      {/* Elegant Mustache & Beard */}
      <path d="M46 64C52 64 60 67 60 70C60 67 68 64 74 64C78 68 76 72 74 74C70 74 64 71 60 74C56 71 50 74 46 74C44 72 42 68 46 64Z" fill="#1E293B" />
      {/* Pointy polite Beard */}
      <path d="M54 74L60 94L66 74H54Z" fill="#1E293B" />

      {/* Rosy Cheeks */}
      <circle cx="42" cy="60" r="2.5" fill="#F43F5E" opacity="0.3" />
      <circle cx="78" cy="60" r="2.5" fill="#F43F5E" opacity="0.3" />

      {/* Nose */}
      <path d="M58 55C58 55 60 60 62 60" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" />
      
      {/* Collar */}
      <path d="M44 82L60 92L76 82" stroke="#16A34A" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

// 3. KARAGÖZ - Big funny round eyes, round curly beard, blue/yellow/red big hat
export function KaragozAvatar({ className = "", size = 96, animated = true }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
    >
      <circle cx="60" cy="60" r="56" fill="#EFF6FF" stroke="#2563EB" strokeWidth="3" />
      
      {/* Big quirky Hat (Işkırlak) */}
      <path d="M34 38C34 38 32 20 60 20C88 20 86 38 86 38H34Z" fill="#D97706" />
      <path d="M34 38C34 38 46 44 60 44C74 44 86 38 86 38" fill="#DC2626" />
      <circle cx="60" cy="20" r="4.5" fill="#FEF08A" />

      {/* Face */}
      <circle cx="60" cy="65" r="24" fill="#FED7AA" />

      {/* Big expressive Bold Eyes */}
      <circle cx="48" cy="58" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="72" cy="58" r="6" fill="#FFFFFF" stroke="#1E293B" strokeWidth="1.5" />
      <circle cx="48" cy="58" r="3.5" fill="#000000" />
      <circle cx="72" cy="58" r="3.5" fill="#000000" />
      
      {/* Thick Eyebrows */}
      <path d="M40 48C45 46 53 50 53 50" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M80 48C75 46 67 50 67 50" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" />

      {/* Big curved nose */}
      <path d="M60 56C64 56 68 60 62 65" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />

      {/* Big curly dark beard */}
      <path d="M36 67C36 84 44 94 60 94C76 94 84 84 84 67H36Z" fill="#111827" />
      <circle cx="44" cy="74" r="3" fill="#374151" />
      <circle cx="52" cy="80" r="3.5" fill="#374151" />
      <circle cx="60" cy="82" r="3" fill="#374151" />
      <circle cx="68" cy="80" r="3.5" fill="#374151" />
      <circle cx="76" cy="74" r="3" fill="#374151" />

      {/* Big open smile */}
      <path d="M54 71C54 76 66 76 66 71" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />

      {/* Blue Collar */}
      <path d="M42 89L60 102L78 89" stroke="#2563EB" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
}

// 4. DEDE KORKUT - Wise master, ancient leather headband, white hair, flowing white beard
export function DedeKorkutAvatar({ className = "", size = 96, animated = true }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
    >
      <circle cx="60" cy="60" r="56" fill="#FEF3C7" stroke="#D97706" strokeWidth="3" />
      
      {/* Wise Sage white hair back */}
      <circle cx="36" cy="62" r="14" fill="#FFFFFF" opacity="0.9" />
      <circle cx="84" cy="62" r="14" fill="#FFFFFF" opacity="0.9" />
      
      {/* Face */}
      <circle cx="60" cy="60" r="23" fill="#FDBA74" />
      
      {/* Sage Leather Headband */}
      <path d="M37 46C37 46 45 40 60 40C75 40 83 46 83 46L81 51C81 51 72 45 60 45C48 45 39 51 39 51L37 46Z" fill="#78350F" stroke="#F59E0B" strokeWidth="1" />
      <circle cx="60" cy="42.5" r="2.5" fill="#EF4444" />

      {/* Wise calm Eyes */}
      <path d="M47 56C49 54 53 54 55 56" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M65 56C67 54 71 54 73 56" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="51" cy="59" r="1.5" fill="#1E293B" />
      <circle cx="69" cy="59" r="1.5" fill="#1E293B" />

      {/* Flowing Wise White Beard */}
      <path d="M37 60H83C83 88 74 98 60 98C46 98 37 88 37 60Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M51 68C51 68 55 76 60 76C65 76 69 68 69 68" stroke="#1E293B" strokeWidth="1" fill="none" />
      
      {/* Mustache */}
      <path d="M46 60C50 60 55 64 60 64C65 64 70 60 74 60C78 64 75 68 74 68C69 68 64 65 60 65C56 65 51 68 46 68C45 68 42 64 46 60Z" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />

      {/* Nose */}
      <path d="M58 57C58 61 62 61 62 57" stroke="#EA580C" strokeWidth="1.5" />

      {/* Brown/Gold Robe Collar */}
      <path d="M44 83L60 98L76 83" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// 5. KELOĞLAN - Bald smart boy, adventurous red bandana/collar, big funny smile
export function KeloglanAvatar({ className = "", size = 96, animated = true }: MascotProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${animated ? "hover:scale-105 transition-transform duration-300" : ""}`}
    >
      <circle cx="60" cy="60" r="56" fill="#FFF7ED" stroke="#EA580C" strokeWidth="3" />
      
      {/* Bald Head back shadow */}
      <path d="M37 60C37 40 45 32 60 32C75 32 83 40 83 60C83 75 75 83 60 83C45 83 37 75 37 60Z" fill="#FFEDD5" />

      {/* Head Light glow */}
      <ellipse cx="60" cy="40" rx="10" ry="4" fill="#FFFFFF" opacity="0.5" />

      {/* Ears */}
      <circle cx="34" cy="62" r="6" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1" />
      <circle cx="86" cy="62" r="6" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="1" />

      {/* Funny eyes */}
      <circle cx="50" cy="56" r="3.5" fill="#1E293B" />
      <circle cx="70" cy="56" r="3.5" fill="#1E293B" />
      
      {/* Cheerful high Eyebrows */}
      <path d="M44 48C46 46 52 48 54 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M76 48C74 46 68 48 66 50" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Rosy Cheeks */}
      <circle cx="43" cy="64" r="4.5" fill="#F43F5E" opacity="0.4" />
      <circle cx="77" cy="64" r="4.5" fill="#F43F5E" opacity="0.4" />

      {/* Giant mischievous Smile */}
      <path d="M45 68C45 68 50 82 60 82C70 82 75 68 75 68" fill="#FFF" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 70C52 74 68 74 72 70" stroke="#EA580C" strokeWidth="1.5" />

      {/* Tiny button nose */}
      <circle cx="60" cy="59" r="3.5" fill="#FDBA74" />

      {/* Red bandana tie around neck */}
      <path d="M42 85H78L60 98L42 85Z" fill="#DC2626" />
      <circle cx="42" cy="85" r="3" fill="#D97706" />
      <circle cx="78" cy="85" r="3" fill="#D97706" />
    </svg>
  );
}

// Master component helper to load avatars by string keys
export default function MascotAvatar({
  name,
  className = "",
  size = 96,
  animated = true,
}: MascotProps & { name: string }) {
  const norm = name.toLowerCase();

  if (norm.includes("hoca") || norm.includes("nasreddin")) {
    return <NasreddinHocaAvatar className={className} size={size} animated={animated} />;
  }
  if (norm.includes("hacivat")) {
    return <HacivatAvatar className={className} size={size} animated={animated} />;
  }
  if (norm.includes("karagöz") || norm.includes("karagoz")) {
    return <KaragozAvatar className={className} size={size} animated={animated} />;
  }
  if (norm.includes("korkut") || norm.includes("dede")) {
    return <DedeKorkutAvatar className={className} size={size} animated={animated} />;
  }
  // Default to Keloğlan
  return <KeloglanAvatar className={className} size={size} animated={animated} />;
}
