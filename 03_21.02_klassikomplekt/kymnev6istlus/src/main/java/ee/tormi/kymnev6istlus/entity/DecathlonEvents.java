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

public class DecathlonEvents {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eventsId;
    private String decathlonEvents;
}
