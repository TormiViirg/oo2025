package ee.tormi.kymnev6istlus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity

public class Points {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long point_id;

    private Double hundredMeterRun;
    private Double longJump;
    private Double shotPut;
    private Double highJump;
    private Double fourHundredMeterRun;
    private Double hundredTenMeterHurdle;
    private Double discusThrow;
    private Double poleVault;
    private Double javelin;
    private Double thousandFiveHundredMeterRun;

    private Double totalScore;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn (name = "athlete_id", nullable = false)
    private Athlete athlete;
}
