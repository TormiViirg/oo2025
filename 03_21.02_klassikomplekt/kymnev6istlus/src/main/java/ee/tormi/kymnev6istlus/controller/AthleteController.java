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
    @GetMapping("/athletes/{athleteId}/points")
    public ResponseEntity<List<Map<String, Object>>> getAthletePoints(@PathVariable Long point_id) {
        Athlete athlete = athleteRepository.findByIdWithPoints(point_id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Athlete not found"));

        List<Map<String, Object>> result = athlete.getPoints().stream()
                .map(points -> Map.<String,Object>of(
                        "point_id", points.getPointId(),
                        "totalScore",   points.getTotalScore()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getAthleteId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getBirthDate() == null){
            throw new RuntimeException("ERROR_DAY_OF_BIRTH_MUST_BE_SET");
        }
        if (athlete.getAthleteName() != null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        if (athlete.getLatitudeBirthPlace() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_LATITUDE");
        }
        if (athlete.getLongitudeBirthPlace() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_LONGITUDE");
        }
        athleteRepository.save(athlete);
        return athleteRepository.findAll();
    }

    @GetMapping("/athletes/points")
    public ResponseEntity<List<Map<String, Object>>> getAllAthletesWithPoints() {
        List<Athlete> athletes = athleteRepository.findAllWithPoints();

        List<Map<String, Object>> payload = athletes.stream()
                .map(athlete -> Map.of(
                        "athleteId",   athlete.getAthleteId(),
                        "athleteName", athlete.getAthleteName(),
                        "points",      athlete.getPoints().stream()
                                .map(points -> Map.of(
                                        "pointId", points.getPointId(),
                                        "totalScore",   points.getTotalScore()
                                ))
                                .toList()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(payload);
    }


}