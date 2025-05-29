package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Country;
import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CountryController {

    @Autowired
    private CountryRepository countryRepository;

    @PostMapping("countries")
    public List<Country> addCountries(@RequestBody List<Country> countries) {
        for (Country country : countries) {
            if (country.getCountryId() != null) {
                throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
            }
        }
        countryRepository.saveAll(countries);
        return countryRepository.findAll();
    }

    @GetMapping("countries")
    public List<Country> getResults(){
        return countryRepository.findAll();
    }
}

