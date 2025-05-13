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

public class Results {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long results_id;

    private Double secondsHundredMeterRun;
    private Double metersLongJump;
    private Double metersShotPut;
    private Double metersHighJump;
    private Double secondsFourHundredMeterRun;
    private Double secondsHundredTenMeterHurdle;
    private Double metersDiscusThrow;
    private Double metersPoleVault;
    private Double metersJavelin;
    private Double secondsThousandFiveHundredMeterRun;
}
