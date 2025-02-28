package ee.tormi.proovikt.controller;

import ee.tormi.proovikt.entity.Suva;
import ee.tormi.proovikt.repository.SuvaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
/*Tee lisaks kolm API otspunkti: 1) tagastab numbrina kõikide andmebaasis olevate numbrite summa (täisnumber) 2) tagastab
kõikide andmebaasis olevate arvude aritmeetilise keskmise (komakohaga) 3) tagastab kõige suurema numbri,
mis andmebaasis leidub (täisnumber)*/

@RestController
public class SuvaController {

    @Autowired
    SuvaRepository suvaRepository;

    @GetMapping("sisestus")
    public List<Suva> getSuva() {
        return suvaRepository.findAll();
    }

    @PostMapping("sisestus")
    public Suva addSuva(@RequestBody Suva suva) {
        return suvaRepository.save(suva);
    }


    @GetMapping("summa")
    public int getSumma() {
        List<Suva> suvad = suvaRepository.findAll();
        return suvad.stream().mapToInt(s -> (int) s.getArvsisend()).sum();
    }


    @GetMapping("aritmeetiline")
    public double getAritmeetiline() {
        List<Suva> suvad = suvaRepository.findAll();
        return suvad.stream().mapToDouble(Suva::getArvsisend).average().orElse(0.0);
    }

    @GetMapping("suurim")
    public int getSuurim() {
        List<Suva> suvad = suvaRepository.findAll();
        return (int) suvad.stream().mapToDouble(Suva::getArvsisend).max().orElse(0.0);
    }

    @GetMapping("libisev")
    public List<Double> getLibisev() {
        List<Suva> suvad = suvaRepository.findAll();
        List<Double> tulemused = new ArrayList<>();

        if (suvad.size() < 3) {
            throw new RuntimeException("ERROR_FOR_ROLLING_AVERAGE_3_INPUTS_ARE_NEEDED_AT_MINIMUM");
        }

        for (int i = 0; i < suvad.size() - 2; i++) {
            double keskmine = (suvad.get(i).getArvsisend() +
                    suvad.get(i + 1).getArvsisend() +
                    suvad.get(i + 2).getArvsisend()) / 3.0;
            tulemused.add(keskmine);
        }
        return tulemused;
    }


/*
* Koosta API otspunkt andmebaasis olevate arvude libiseva keskmise leidmiseks. Väljundiks on massiiv, mis on andmebaasis
* olevatest arvudest kahe elemendi võrra lühem ning mille iga elemendi väärtuseks on andmebaasis vastava elemendi
* ning selle järgmise ja ülejärgmise elemendi keskmine.

Tee lisaks kolm API otspunkti:
1) tagastab numbrina kõikide andmebaasis olevate numbrite summa (täisnumber)
2) tagastab kõikide andmebaasis olevate arvude aritmeetilise keskmise (komakohaga)
3) tagastab kõige suurema numbri, mis andmebaasis leidub (täisnumber)*/

}
