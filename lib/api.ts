import type { Character } from "./types"

const API_URL = "https://hp-api.onrender.com/api"

export async function fetchCharacters(): Promise<Character[]> {
  const response = await fetch(`${API_URL}/characters`)

  if (!response.ok) {
    throw new Error(`Failed to fetch characters: ${response.status}`)
  }

  const data = await response.json()

  // Add unique IDs if they don't exist
  return data.map((character: Character, index: number) => ({
    ...character,
    id: character.id || `character-${index}`,
  }))
}

export async function fetchCharacterById(id: string): Promise<Character> {
  // First fetch all characters
  const characters = await fetchCharacters()

  // Find the character with the matching ID
  const character = characters.find((char) => char.id === id)

  if (!character) {
    throw new Error(`Character with ID ${id} not found`)
  }

  return character
}

export async function fetchSpells() {
  const response = await fetch(`${API_URL}/spells`)

  if (!response.ok) {
    throw new Error(`Failed to fetch spells: ${response.status}`)
  }

  return response.json()
}

