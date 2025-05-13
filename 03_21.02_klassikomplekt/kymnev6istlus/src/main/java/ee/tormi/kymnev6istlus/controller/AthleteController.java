package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.repository.PointsRepository;
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
    PointsRepository pointsRepository;


    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("athlete/{id}/totalScores")
    public ResponseEntity<List<Integer>> getTotalScores(@PathVariable Long id) {
        Athlete athlete = athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("ATHLETE_NOT_FOUND"));

        List<Integer> totalScores = athlete.getResults()
                .stream()
                .map(Points::getTotalScore)
                .collect(Collectors.toList());

        return ResponseEntity.ok(totalScores);
    }


    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getAthlete_id() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getBirthDate() == null){
            throw new RuntimeException("ERROR_AGE_MUST_BE_SET");
        }
        if (athlete.getAthleteName() != null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }


}