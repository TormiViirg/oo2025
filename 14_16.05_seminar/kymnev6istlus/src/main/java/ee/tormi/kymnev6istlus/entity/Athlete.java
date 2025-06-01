package ee.tormi.kymnev6istlus.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })

public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athleteId;

    private String athleteName;
    private Double age;
    private Double latitudeBirthPlace;
    private Double longitudeBirthPlace;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "countryId", nullable = false)// sportlane ühest riigist aga ühel riigil mitu sportlast
    private Country country;

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
}
