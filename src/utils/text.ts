import { Language } from "@/types";

export const maybePluralize = (
  count: number,
  noun: string,
  lang: Language["lang"]
): string => {
  if (lang === "en") {
    return `${count} ${noun}${count !== 1 ? "s" : ""}`;
  }

  if (lang === "uk") {
    // **Singular case: 1, 21, 31, 41...**
    if (count % 10 === 1 && count % 100 !== 11) {
      return `${count} ${noun}`;
    }

    // **Plural for numbers 2-4, except 12-14**
    if (
      count % 10 >= 2 &&
      count % 10 <= 4 &&
      (count % 100 < 10 || count % 100 >= 20)
    ) {
      if (noun.endsWith("е")) {
        return `${count} ${noun.slice(0, -1)}я`; // "місце" → "місця"
      }
      if (noun.endsWith("о")) {
        return `${count} ${noun.slice(0, -1)}а`; // "дерево" → "дерева"
      }
      if (noun.endsWith("ка")) {
        return `${count} ${noun.slice(0, -2)}и`; // "автівка" → "автівки"
      }
      if (noun.endsWith("я")) {
        return `${count} ${noun.slice(0, -1)}і`; // "мамуся" → "мамусі"
      }
      if (noun.endsWith("ок")) {
        return `${count} ${noun.slice(0, -2)}и`; // "огірок" → "огірки"
      }
      return `${count} ${noun}и`; // Default plural form
    }

    // **For 0, 5+, 11-14 → Genitive plural**
    if (noun.endsWith("е")) {
      return `${count} ${noun.slice(0, -1)}ь`; // "місце" → "місць"
    }
    if (noun.endsWith("о")) {
      return `${count} ${noun.slice(0, -1)}а`; // "дерево" → "дерева"
    }
    if (noun.endsWith("ка")) {
      return `${count} ${noun.slice(0, -2)}ок`; // "автівка" → "автівок"
    }
    if (noun.endsWith("я")) {
      return `${count} ${noun.slice(0, -1)}ь`; // "мамуся" → "мамусь"
    }
    if (noun.endsWith("ок")) {
      return `${count} ${noun.slice(0, -2)}ків`; // "огірок" → "огірків"
    }

    return `${count} ${noun}ів`; // Default masculine plural (e.g., "результат" → "результатів")
  }

  return `${count} ${noun}`; // Default fallback
};
