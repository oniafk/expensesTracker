/**
 * Capitalizes the first letter of a word and makes the rest lowercase
 * @param word - The string to capitalize
 * @returns The capitalized string
 */
export function ConvertCapitalize(word: string): string {
  if (!word || typeof word !== "string") {
    return "";
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Alternative approach if you need object-based input:
interface CurrencyExchange {
  from: string;
}

/**
 * Capitalizes the first letter of a currency string from an object
 * @param currencyObj - Object containing the currency string
 * @returns The capitalized string
 */
export function ConvertCapitalizeFromObject(
  currencyObj: CurrencyExchange
): string {
  if (!currencyObj?.from || typeof currencyObj.from !== "string") {
    return "";
  }
  return (
    currencyObj.from.charAt(0).toUpperCase() +
    currencyObj.from.slice(1).toLowerCase()
  );
}

// Usage examples:
// Simple string: ConvertCapitalize("usd") → "Usd"
// Object: ConvertCapitalizeFromObject({ from: "eur" }) → "Eur"
