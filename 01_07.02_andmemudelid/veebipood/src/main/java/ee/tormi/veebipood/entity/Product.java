package ee.tormi.veebipood.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//encaptilation
//hibernate automaatselt tabel klassi nimega pole sql vaja

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Product {//tabel hakkab andmebaasi minema
    @Id//tabeli id veerg
    @GeneratedValue(strategy = GenerationType.IDENTITY)//autoincremen eri väljad nt id kasulikt
    private Long id;
    private String name;
    private double price;
    private String image;
    private boolean active;

    @ManyToOne
    private Category category;
}
