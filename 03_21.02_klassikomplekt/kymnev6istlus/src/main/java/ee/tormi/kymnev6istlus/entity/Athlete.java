package ee.tormi.kymnev6istlus.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
    private String bio;
    private LocalDate birthDate;
    private Double latitudeBirthPlace;
    private Double longitudeBirthPlace;

    @ManyToOne (fetch = FetchType.LAZY)
    @JoinColumn(name = "countryId", nullable = false)// sportlane ühest riigist aga ühel riigil mitu sportlast
    private Country country;

    @OneToMany(mappedBy = "athlete", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderColumn(name = "results_index")
    private List<Results> results = new ArrayList<>();

    @OneToMany(mappedBy = "athlete", cascade = CascadeType.ALL, orphanRemoval = true)//Ühel sportlasel võib olla mitu tulemuste komplekti ja sealt tulenevalt mitu selle põhjal arvutatud punktide oma
    @OrderColumn(name = "points_index")
    private List<Points> points = new ArrayList<>();
}
