package ee.mihkel.quizlet.entity;

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

public class Word {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordId;
    private String word;
    private String definition;
}