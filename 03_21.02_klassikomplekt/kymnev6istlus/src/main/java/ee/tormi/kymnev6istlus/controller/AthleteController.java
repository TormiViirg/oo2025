package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.repository.PointsRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    PointsRepository pointsRepository;


    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("/athletes/{athlete_id}/points")
    public ResponseEntity<List<Map<String, Object>>> getAthletePoints(@PathVariable Long point_id) {
        Athlete athlete = athleteRepository.findByIdWithPoints(point_id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Athlete not found"));

        List<Map<String, Object>> result = athlete.getPoints().stream()
                .map(points -> Map.<String,Object>of(
                        "point_id", points.getPoint_id(),
                        "totalScore",   points.getTotalScore()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
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
        if (athlete.getAthleteName() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        if (athlete.getAthleteName() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }


}