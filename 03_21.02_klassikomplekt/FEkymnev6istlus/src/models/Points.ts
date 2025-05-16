import type { Athlete } from "./Athletes"

export type Points = {
    pointId: number,
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

    athlete: Athlete
}