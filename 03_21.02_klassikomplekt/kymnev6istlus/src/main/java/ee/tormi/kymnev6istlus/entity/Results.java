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
    private Long id;//kuna alade arv ei muutu pole vahetabelit vaja, saab eraldi veeru anda ja kui mõni koht tühi siis
    // see info mille põhjal saab statistikat teha
    private int hundredMeterRun;
    private int longJump;
    private int shotPut;
    private int highJump;
    private int fourHundredMeterRun;
    private int hundredTenMeterHurdle;
    private int discusThrow;
    private int poleVault;
    private int javelin;
    private int thousandFiveHundredMeterRun;

    private float totalScore;
}
