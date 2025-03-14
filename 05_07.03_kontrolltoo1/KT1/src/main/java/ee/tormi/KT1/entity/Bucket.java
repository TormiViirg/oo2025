package ee.tormi.KT1.entity;

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

public class Bucket {
    @Getter
    @Id//tabeli id veerg
    @GeneratedValue(strategy = GenerationType.IDENTITY)//autoincremen eri väljad nt id kasulikt
    private Long id;
    private int number;
    public NumberEntity() {}

    public NumberEntity(int number) {
        this.number = number;
    }

    public int getValue() {
        return number;
    }

    public void setValue(int value) {
        this.number = number;
    }

}
