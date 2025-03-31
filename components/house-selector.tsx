"use client"

import { useHouseContext } from "@/context/house-context"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function HouseSelector() {
  const { preferredHouse, setPreferredHouse } = useHouseContext()

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Select Your House</h2>
          <p className="text-sm text-muted-foreground">Choose your preferred Hogwarts house to filter characters</p>
        </div>

        <RadioGroup
          value={preferredHouse || ""}
          onValueChange={(value) => setPreferredHouse(value || null)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4"
        >
          <HouseOption
            value="Gryffindor"
            color="bg-red-100 border-red-300 dark:bg-red-950 dark:border-red-800"
            textColor="text-red-800 dark:text-red-300"
          />
          <HouseOption
            value="Slytherin"
            color="bg-green-100 border-green-300 dark:bg-green-950 dark:border-green-800"
            textColor="text-green-800 dark:text-green-300"
          />
          <HouseOption
            value="Hufflepuff"
            color="bg-yellow-100 border-yellow-300 dark:bg-yellow-950 dark:border-yellow-800"
            textColor="text-yellow-800 dark:text-yellow-300"
          />
          <HouseOption
            value="Ravenclaw"
            color="bg-blue-100 border-blue-300 dark:bg-blue-950 dark:border-blue-800"
            textColor="text-blue-800 dark:text-blue-300"
          />
          <div className="col-span-2 sm:col-span-4">
            <div
              className="border rounded-md p-3 flex items-center justify-center cursor-pointer hover:bg-accent"
              onClick={() => setPreferredHouse(null)}
            >
              <Label className="cursor-pointer">Show All Houses</Label>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}

function HouseOption({ value, color, textColor }: { value: string; color: string; textColor: string }) {
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem value={value} id={value} className="sr-only" />
      <Label
        htmlFor={value}
        className={`w-full border rounded-md p-3 flex items-center justify-center cursor-pointer ${color} ${textColor} hover:opacity-90`}
      >
        {value}
      </Label>
    </div>
  )
}

