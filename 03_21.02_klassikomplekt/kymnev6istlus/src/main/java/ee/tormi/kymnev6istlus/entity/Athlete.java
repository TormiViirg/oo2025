package ee.tormi.kymnev6istlus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athlete_id;
    private String athleteName;
    private String bio;
    private LocalDate birthDate;
    private double latitudeBirthPlace;
    private double longitudeBirthPlace;

    @ManyToOne// sportlane ühest riigist aga ühel riigil mitu sportlast
    private Country country;

    @OneToMany//Ühel sportlasel võib olla mitu tulemuste komplekti ja seal mitu tulemust
    private Results results;

    @OneToMany//Ühel sportlasel võib olla mitu tulemuste komplekti ja sealt tulenevalt mitu selle põhjal arvutatud punktide oma
    private Points points;
}
