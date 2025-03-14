package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.repository.ResultsRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    ResultsRepository resultsRepository;

    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("athlete/{id}/totalScores")
    public ResponseEntity<List<Integer>> getTotalScores(@PathVariable Long id) {
        Athlete athlete = athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("ATHLETE_NOT_FOUND"));

        List<Integer> totalScores = athlete.getResults()
                .stream()
                .map(Results::getTotalScore)
                .collect(Collectors.toList());

        return ResponseEntity.ok(totalScores);
    }


    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getAthleteId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getAge() <= 0){
            throw new RuntimeException("ERROR_AGE_MUST_BE_POSITIVE");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }
 /*   //Tee võimalus küsida kõiki sportlasi koos nende punktisummadega.
// peaks kogu kupatuse ringi tegema või lihtsalt chat gptst koodi otse copy pasteima :(

    @GetMapping
    public List<Athlete> getAllAthletes() {
        return athleteRepository.findAll();
        */

}