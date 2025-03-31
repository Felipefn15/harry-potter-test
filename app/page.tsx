"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CharacterCard } from "@/components/character-card"
import { HouseSelector } from "@/components/house-selector"
import type { Character } from "@/lib/types"
import { fetchCharacters } from "@/lib/api"
import { useHouseContext } from "@/context/house-context"
import { Loader2 } from "lucide-react"

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const { preferredHouse } = useHouseContext()

  useEffect(() => {
    const getCharacters = async () => {
      try {
        const data = await fetchCharacters()
        setCharacters(data)
      } catch (error) {
        console.error("Failed to fetch characters:", error)
      } finally {
        setLoading(false)
      }
    }

    getCharacters()
  }, [])

  const students = characters.filter((character) => character.hogwartsStudent)
  const staff = characters.filter((character) => character.hogwartsStaff)

  // Filter characters by preferred house if one is selected
  const filteredCharacters = preferredHouse
    ? characters.filter((character) => character.house === preferredHouse)
    : characters

  const filteredStudents = preferredHouse
    ? students.filter((character) => character.house === preferredHouse)
    : students

  const filteredStaff = preferredHouse ? staff.filter((character) => character.house === preferredHouse) : staff

  return (
    <main className="container mx-auto px-4 py-4 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4 sm:mb-8 font-serif">Mischief Managed</h1>

      <div className="mb-4 sm:mb-8">
        <HouseSelector />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:mb-8 overflow-x-auto">
            <TabsTrigger value="all" className="text-sm sm:text-base">All ({filteredCharacters.length})</TabsTrigger>
            <TabsTrigger value="students" className="text-sm sm:text-base">Students ({filteredStudents.length})</TabsTrigger>
            <TabsTrigger value="staff" className="text-sm sm:text-base">Staff ({filteredStaff.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredCharacters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredStudents.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="staff" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {filteredStaff.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </main>
  )
}

