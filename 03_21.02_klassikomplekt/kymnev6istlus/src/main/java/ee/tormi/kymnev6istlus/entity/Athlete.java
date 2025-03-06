package ee.tormi.kymnev6istlus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athleteId;
    private String athleteName;
    private int age;

    @ManyToOne// sportlane ühest riigist aga ühel riigil mitu sportlast
    private Country country;

    @OneToMany//Ühel sportlasel võib olla mitu tulemuste komplekti ja seal mitu tulemust
    private List<Results> results;
}
