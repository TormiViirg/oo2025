package ee.tormi.KT1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Bucket {
    @Id//tabeli id veerg
    @GeneratedValue(strategy = GenerationType.IDENTITY)//autoincremen eri väljad nt id kasulikt
    private Long id;
    private int number;
}
