package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.repository.ResultsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    ResultsRepository resultsRepository;

    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("athlete/{id}/totalScores")
    public ResponseEntity<List<Integer>> getTotalScores(@PathVariable Long id) {
        Athlete athlete = athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("Product not found"));

        List<Integer> totalScores = athlete.getResults()
                .stream()
                .map(Results::getTotalScore)
                .collect(Collectors.toList());

        return ResponseEntity.ok(totalScores);
    }


    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
}