import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CapFirstLetter = (str: string) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const Images = [
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
  "/images/bg1.png",
  "/images/bg2.png",
  "/images/bg3.png",
];
