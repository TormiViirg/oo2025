import type { Country } from "./Country"

export type Athlete = {

    athleteId: number,
    athleteName: string,
    bio: string,
    age: number,
    latitudeBirthPlace: number,
    longitudeBirthPlace: number,

    country: Country,
    
    secondsHundredMeterRun: number,
    metersLongJump: number,
    metersShotPut: number,
    metersHighJump: number,
    secondsFourHundredMeterRun: number,
    secondsHundredTenMeterHurdle: number,
    metersDiscusThrow: number,
    metersPoleVault: number,
    metersJavelin: number,
    secondsThousandFiveHundredMeterRun: number,

    hundredMeterRun: number,
    longJump: number,
    shotPut: number,
    highJump: number,
    fourHundredMeterRun: number,
    hundredTenMeterHurdle: number,
    discusThrow: number,
    poleVault: number,
    javelin: number,
    thousandFiveHundredMeterRun: number,

    totalScore: number,
}