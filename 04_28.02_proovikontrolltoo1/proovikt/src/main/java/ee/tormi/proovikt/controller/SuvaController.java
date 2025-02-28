package ee.tormi.proovikt.controller;

import ee.tormi.proovikt.entity.Suva;
import ee.tormi.proovikt.repository.SuvaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*Tee lisaks kolm API otspunkti: 1) tagastab numbrina kõikide andmebaasis olevate numbrite summa (täisnumber) 2) tagastab
kõikide andmebaasis olevate arvude aritmeetilise keskmise (komakohaga) 3) tagastab kõige suurema numbri,
mis andmebaasis leidub (täisnumber)*/

@RestController
public class SuvaController {

    @Autowired
    SuvaRepository suvaRepository;

    @GetMapping("sisestus")
    public List<Suva> get() {
        return suvaRepository.findAll();
    }

    @PostMapping("sisestus")
    public Suva addSuva(@RequestBody Suva suva) {
        return suvaRepository.save(suva);
    }

}
