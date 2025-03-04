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
    private Long resultsId;
    private int eventsId;
    private float score;
}
