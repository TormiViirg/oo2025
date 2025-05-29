import type { Country } from "./Country"
import type { Points } from "./Points"
import type { Results } from "./Results"

export type Athlete = {
    athleteId: number,
    athleteName: string,
    bio: string,
    birthDate: Date,
    latitudeBirthPlace: number,
    longitudeBirthPlace: number,

    country: Country,
    results: Results[],
    points: Points[]
}