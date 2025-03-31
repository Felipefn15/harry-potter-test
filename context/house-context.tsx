"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type House = "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw" | null

interface HouseContextType {
  preferredHouse: House
  setPreferredHouse: (house: House) => void
}

const HouseContext = createContext<HouseContextType>({
  preferredHouse: null,
  setPreferredHouse: () => {},
})

export function HouseProvider({ children }: { children: ReactNode }) {
  const [preferredHouse, setPreferredHouse] = useState<House>(null)

  // Load preferred house from localStorage on mount
  useEffect(() => {
    const storedHouse = localStorage.getItem("preferredHouse")
    if (storedHouse) {
      setPreferredHouse(JSON.parse(storedHouse))
    }
  }, [])

  // Save preferred house to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferredHouse", JSON.stringify(preferredHouse))
  }, [preferredHouse])

  return <HouseContext.Provider value={{ preferredHouse, setPreferredHouse }}>{children}</HouseContext.Provider>
}

export const useHouseContext = () => useContext(HouseContext)

