package com.tormi.veebipood.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

//encaptilation
//hibernate automaatselt tabel klassi nimega pole sql vaja
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
}
