"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Character } from "@/lib/types"
import { fetchCharacterById } from "@/lib/api"
import { useFavorites } from "@/context/favorites-context"
import { getHouseColor } from "@/lib/utils"
import { ArrowLeft, Heart, Loader2 } from "lucide-react"

export default function CharacterDetail({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { favorites, toggleFavorite } = useFavorites()

  const isFavorite = character ? favorites.includes(character.id) : false

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const data = await fetchCharacterById(params.id)
        setCharacter(data)
      } catch (error) {
        console.error("Failed to fetch character:", error)
      } finally {
        setLoading(false)
      }
    }

    getCharacter()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!character) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card>
          <CardContent className="p-6">
            <p>Character not found</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const houseColor = getHouseColor(character.house)

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[300px] aspect-[3/4] rounded-lg overflow-hidden border shadow-md">
            {character.image ? (
              <Image src={character.image || "/placeholder.svg"} alt={character.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">No image available</div>
            )}
          </div>

          <Button
            variant={isFavorite ? "default" : "outline"}
            className={`w-full ${isFavorite ? "bg-red-500 hover:bg-red-600" : ""}`}
            onClick={() => character && toggleFavorite(character.id)}
          >
            <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </Button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold font-serif">{character.name}</h1>
            {character.house && <Badge className={`${houseColor} px-3 py-1`}>{character.house}</Badge>}
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <InfoCard title="Alternate Names" value={character.alternate_names?.join(", ") || "None"} />
              <InfoCard title="Species" value={character.species || "Unknown"} />
              <InfoCard title="Gender" value={character.gender || "Unknown"} />
              <InfoCard title="Date of Birth" value={character.dateOfBirth || "Unknown"} />
            </div>

            <div className="grid gap-4">
              <InfoCard title="Ancestry" value={character.ancestry || "Unknown"} />
              <InfoCard title="Eye Color" value={character.eyeColour || "Unknown"} />
              <InfoCard title="Hair Color" value={character.hairColour || "Unknown"} />
              <InfoCard title="Patronus" value={character.patronus || "Unknown"} />
              <InfoCard
                title="Wand"
                value={
                  character.wand?.wood
                    ? `${character.wand.wood} wood, ${character.wand.core} core, ${character.wand.length}" length`
                    : "Unknown"
                }
              />
              <InfoCard
                title="Status"
                value={
                  character.hogwartsStudent ? "Hogwarts Student" : character.hogwartsStaff ? "Hogwarts Staff" : "Other"
                }
              />
              <InfoCard title="Actor" value={character.actor || "Unknown"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="font-medium">{value}</p>
    </div>
  )
}

