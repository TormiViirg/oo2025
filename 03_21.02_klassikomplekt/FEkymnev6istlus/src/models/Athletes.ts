import type { Country } from "./Country"
import type { Points } from "./Points"
import type { Results } from "./Results"

export type Athlete = {
    athleteId: number,
    athleteName: string,
    bio: string,
    birthDate: string,
    latitudeBirthPlace: number,
    longitudeBirthPlace: number,

    country: Country,
    nestedResults?: Results[][],
    nestedPoints?: Points[][]
}