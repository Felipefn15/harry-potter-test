import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHouseColor(house?: string) {
  switch (house) {
    case "Gryffindor":
      return "bg-red-500 text-white"
    case "Slytherin":
      return "bg-green-600 text-white"
    case "Hufflepuff":
      return "bg-yellow-500 text-black"
    case "Ravenclaw":
      return "bg-blue-600 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

