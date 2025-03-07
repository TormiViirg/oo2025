package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Country;
import ee.tormi.kymnev6istlus.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @PostMapping("countries")
    public List<Country> addCountries(@RequestBody List<Country> countries) {//list kuna ei viitsi ükshaaval sisestada

        countryRepository.saveAll(countries);
        return countryRepository.findAll();
    }
}

