"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Character } from "@/lib/types"
import { useFavorites } from "@/context/favorites-context"
import { getHouseColor } from "@/lib/utils"
import { Heart } from "lucide-react"

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { favorites, toggleFavorite } = useFavorites()
  const [imageError, setImageError] = useState(false)

  const isFavorite = favorites.includes(character.id)
  const houseColor = getHouseColor(character.house)

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <Link href={`/character/${character.id}`}>
        <div className="relative w-full aspect-[3/4]">
          {character.image && !imageError ? (
            <Image
              src={character.image || "/placeholder.svg"}
              alt={character.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">No image</div>
          )}
          {character.house && <Badge className={`absolute top-2 right-2 ${houseColor}`}>{character.house}</Badge>}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/character/${character.id}`} className="hover:underline">
          <h3 className="font-bold truncate">{character.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">
          {character.hogwartsStudent ? "Student" : character.hogwartsStaff ? "Staff" : character.species || "Character"}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="ghost"
          size="sm"
          className={`px-0 ${isFavorite ? "text-red-500" : ""}`}
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(character.id)
          }}
        >
          <Heart className={`mr-1 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
          {isFavorite ? "Favorited" : "Favorite"}
        </Button>
      </CardFooter>
    </Card>
  )
}

