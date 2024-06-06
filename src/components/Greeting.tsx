"use client";

const GREETINGS = [
  { language: "en", greeting: "Hello" },
  { language: "es", greeting: "Hola" },
  { language: "fr", greeting: "Bonjour" },
  { language: "zh-CN", greeting: "你好" },
  { language: "hi", greeting: "नमस्ते" },
  { language: "ar", greeting: "مرحبا" },
  { language: "pt", greeting: "Olá" },
  { language: "bn", greeting: "হ্যালো" },
  { language: "uk", greeting: "Вітаю" },
  { language: "ja", greeting: "こんにちは" },
  { language: "pa", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ" },
  { language: "de", greeting: "Hallo" },
  { language: "jv", greeting: "Halo" },
  { language: "ko", greeting: "안녕하세요" },
  { language: "tr", greeting: "Merhaba" },
  { language: "vi", greeting: "Xin chào" },
  { language: "it", greeting: "Ciao" },
  { language: "sw", greeting: "Hujambo" },
  { language: "th", greeting: "สวัสดี" },
  { language: "nl", greeting: "Hallo" },
];

export const Greeting = () => {
  const preferredLanguages =
    typeof window === "undefined" ? [] : navigator.languages;

  const { greeting } =
    preferredLanguages
      .map((lang) => GREETINGS.find((g) => lang.startsWith(g.language)))
      .find((g) => g !== undefined) ?? GREETINGS[0];

  return (
    <div className="text-center">
      <h1 className="text-9xl">{greeting}</h1>
      <h3 className="text-xl text-gray-700">мандруй / мрій / дій</h3>
    </div>
  );
};
