package ee.tormi.kymnev6istlus.service;
import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.PointsRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
@Service

public class DecathlonLogic {

    private final PointsRepository pointsRepository;

    public DecathlonLogic(PointsRepository pointsRepository) {
        this.pointsRepository = pointsRepository;
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
            if (perf == null) return 0.0;
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
            return A * Math.pow(x, C);
        }
    }

    public Points computeSome(Results results) {
        Points points = new Points();

        points.setHundredMeterRun(
                Event.HUNDRED_METER_RUN.score(results.getSecondsHundredMeterRun())
        );
        points.setLongJump(
                Event.LONG_JUMP.score(results.getMetersLongJump())
        );
        points.setShotPut(
                Event.SHOT_PUT.score(results.getMetersShotPut())
        );
        points.setHighJump(
                Event.HIGH_JUMP.score(results.getMetersHighJump())
        );
        points.setFourHundredMeterRun(
                Event.FOUR_HUNDRED_METER_RUN.score(results.getSecondsFourHundredMeterRun())
        );
        points.setHundredTenMeterHurdle(
                Event.HUNDRED_TEN_METER_HURDLE.score(results.getSecondsHundredTenMeterHurdle())
        );
        points.setDiscusThrow(
                Event.DISCUS_THROW.score(results.getMetersDiscusThrow())
        );
        points.setPoleVault(
                Event.POLE_VAULT.score(results.getMetersPoleVault())
        );
        points.setJavelin(
                Event.JAVELIN.score(results.getMetersJavelin())
        );
        points.setThousandFiveHundredMeterRun(
                Event.THOUSAND_FIVE_HUNDRED_METER_RUN.score(results.getSecondsThousandFiveHundredMeterRun())
        );

        Double total = calculateTotalScore(points);
        points.setTotalScore(total);

        return pointsRepository.save(points);
    }

    public List<Points> computeAll(List<Results> allResults) {
        List<Points> pointsList = new ArrayList<>();
        for (Results results : allResults) {
            pointsList.add(computeSome(results));
        }
        return pointsList;
    }

    public double calculateTotalScore(Points points) {
        return points.getHundredMeterRun()
                + points.getLongJump()
                + points.getShotPut()
                + points.getHighJump()
                + points.getFourHundredMeterRun()
                + points.getHundredTenMeterHurdle()
                + points.getDiscusThrow()
                + points.getPoleVault()
                + points.getJavelin()
                + points.getThousandFiveHundredMeterRun();
    }

}
