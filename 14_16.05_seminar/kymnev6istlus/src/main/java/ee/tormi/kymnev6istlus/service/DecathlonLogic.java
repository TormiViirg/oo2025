package ee.tormi.kymnev6istlus.service;
import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class DecathlonLogic {

    private final AthleteRepository athleteRepository;

    public DecathlonLogic(AthleteRepository athleteRepository) {
        this.athleteRepository = athleteRepository;
    }


    enum Event {
        HUNDRED_METER_RUN(25.4347, 18,    1.81, true),
        LONG_JUMP(0.14354, 220, 1.40, false),
        SHOT_PUT(51.39,    1.5,  1.05, false),
        HIGH_JUMP(0.8465,   75,  1.42, false),
        FOUR_HUNDRED_METER_RUN(1.53775,82,  1.81, true),
        HUNDRED_TEN_METER_HURDLE(5.74352,   28.5,1.92, true),
        DISCUS_THROW(12.91,  4,    1.10, false),
        POLE_VAULT(0.2797, 100,  1.35, false),
        JAVELIN(10.14,     7,    1.08, false),
        THOUSAND_FIVE_HUNDRED_METER_RUN(0.03768, 480,  1.85, true);

        final double A, B, C;
        final boolean isTrack;  // track events use (B - P), field use (P*100 - B)

        Event(double A, double B, double C, boolean isTrack) {
            this.A = A;
            this.B = B;
            this.C = C;
            this.isTrack = isTrack;
        }

        double score(Double perf) {
            if (perf == null) {
                return 0.0;
            }
            double x;
            if (isTrack) {
                x = (B - perf);
            } else {
                if (this == LONG_JUMP || this == HIGH_JUMP || this == POLE_VAULT) {
                    x = perf * 100 - B;
                } else {
                    x = perf - B;
                }
            }
            if (x <= 0) {
                return 0.0;
            }
            return A * Math.pow(x, C);
        }
    }

    public Athlete computeSome(Athlete athlete) {

        athlete.setHundredMeterRun(
                Event.HUNDRED_METER_RUN.score(athlete.getSecondsHundredMeterRun())
        );
        athlete.setLongJump(
                Event.LONG_JUMP.score(athlete.getMetersLongJump())
        );
        athlete.setShotPut(
                Event.SHOT_PUT.score(athlete.getMetersShotPut())
        );
        athlete.setHighJump(
                Event.HIGH_JUMP.score(athlete.getMetersHighJump())
        );
        athlete.setFourHundredMeterRun(
                Event.FOUR_HUNDRED_METER_RUN.score(athlete.getSecondsFourHundredMeterRun())
        );
        athlete.setHundredTenMeterHurdle(
                Event.HUNDRED_TEN_METER_HURDLE.score(athlete.getSecondsHundredTenMeterHurdle())
        );
        athlete.setDiscusThrow(
                Event.DISCUS_THROW.score(athlete.getMetersDiscusThrow())
        );
        athlete.setPoleVault(
                Event.POLE_VAULT.score(athlete.getMetersPoleVault())
        );
        athlete.setJavelin(
                Event.JAVELIN.score(athlete.getMetersJavelin())
        );
        athlete.setThousandFiveHundredMeterRun(
                Event.THOUSAND_FIVE_HUNDRED_METER_RUN.score(athlete.getSecondsThousandFiveHundredMeterRun())
        );

        Double total = calculateTotalScore(athlete);
        athlete.setTotalScore(total);

        return athleteRepository.save(athlete);
    }

    public List<Athlete> computeAll(List<Athlete> allResults) {
        return allResults.stream()
                .map(this::computeSome)
                .collect(Collectors.toList());
    }

    public double calculateTotalScore(Athlete athlete) {

        double h100 = athlete.getHundredMeterRun() != null ? athlete.getHundredMeterRun() : 0.0;
        double lj = athlete.getLongJump() != null ? athlete.getLongJump() : 0.0;
        double sp = athlete.getShotPut() != null ? athlete.getShotPut() : 0.0;
        double hj = athlete.getHighJump() != null ? athlete.getHighJump() : 0.0;
        double f400 = athlete.getFourHundredMeterRun() != null ? athlete.getFourHundredMeterRun() : 0.0;
        double h110h = athlete.getHundredTenMeterHurdle() != null ? athlete.getHundredTenMeterHurdle() : 0.0;
        double disc = athlete.getDiscusThrow() != null ? athlete.getDiscusThrow() : 0.0;
        double pole = athlete.getPoleVault() != null ? athlete.getPoleVault() : 0.0;
        double jav = athlete.getJavelin() != null ? athlete.getJavelin() : 0.0;
        double m1500 = athlete.getThousandFiveHundredMeterRun() != null ? athlete.getThousandFiveHundredMeterRun() : 0.0;

        return h100 + lj + sp + hj + f400 + h110h + disc + pole + jav + m1500;
    }
}
