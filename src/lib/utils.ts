import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toCardinal } from "n2words/fr-FR";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number | string): string {
  const number =
    typeof value === "string" ? Number(value) : value;

  if (Number.isNaN(number)) {
    return "";
  }

  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(number)
    .replace(/\u202F/g, " ");
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const genRanHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");


export function tempId() {
  return -Math.floor(Date.now() + Math.random() * 1000);
}


export const stringfyPrice = (amount: number) => {
  const [dirhams, centimes] = amount.toFixed(2).split(".");

  const dirhamsWords = toCardinal(Number(dirhams));
  const centimesWords =
    Number(centimes) > 0
      ? ` et ${toCardinal(Number(centimes))} centimes`
      : "";

  return `${dirhamsWords} dirhams${centimesWords}`;
};

