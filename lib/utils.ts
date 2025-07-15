import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
  const userName = name.trim().split(" ").map((n) => n.charAt(0).toUpperCase()).join("");
  return userName;
}
