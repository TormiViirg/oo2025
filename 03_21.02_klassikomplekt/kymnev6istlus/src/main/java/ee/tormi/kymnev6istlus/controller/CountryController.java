package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Country;
import ee.tormi.kymnev6istlus.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//ei pannud lihtsalt andmebaasi sisse kuna ajad on nagu on :(
@RestController
public class CountryController {
    @Autowired
    CountryRepository countryRepository;

    @PostMapping("countries")
    public List<Country> addCountry(@RequestBody Country country) {
        countryRepository.save(country);
        return countryRepository.findAll();
    }

}
