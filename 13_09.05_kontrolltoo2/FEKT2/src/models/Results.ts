import type { Athlete } from "./Athletes"

export type Results = {
    resultsId: number,
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
    
    athlete: Athlete
}