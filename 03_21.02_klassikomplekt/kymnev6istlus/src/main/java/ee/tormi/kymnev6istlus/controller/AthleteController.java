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

@CrossOrigin(origins = "http://localhost:5173")
@Getter

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    PointsRepository pointsRepository;

    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("/athletes/overview/{athleteId}")
    public ResponseEntity<List<Map<String, Object>>> getAthletePoints(@PathVariable("athleteId") Long athleteId) {
        Athlete athlete = athleteRepository.findByIdWithPoints(athleteId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Athlete not found"));

        List<Map<String, Object>> result = athlete.getPoints().stream()
                .map(p -> Map.<String, Object>of(
                        "point_id",    p.getPointId(),
                        "totalScore",  p.getTotalScore(),
                        "athleteName", athlete.getAthleteName(),
                        "country",     athlete.getCountry().getCountryName()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

    // Võimalda salvestada sportlane: nimi, riik, vanus.
    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getAthleteId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getAthleteName() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        if (athlete.getBio() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_BIO");
        }
        if (athlete.getBirthDate() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_BIRTHDATE");
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

    @GetMapping("/athletes/{athleteId}/everything")
    public ResponseEntity<Map<String, Object>> getAthleteWithPoints(@PathVariable Long athleteId) {
        return athleteRepository
        .findByIdEverything(athleteId)
        .map(athlete -> {

            List<Map<String, Object>> resultsList = athlete.getResults().stream()
                    .map(r -> Map.<String, Object>ofEntries(
                            Map.entry("resultsId", r.getResultsId()),
                            Map.entry("secondsHundredMeterRun", r.getSecondsHundredMeterRun()),
                            Map.entry("metersLongJump", r.getMetersLongJump()),
                            Map.entry("metersShotPut", r.getMetersShotPut()),
                            Map.entry("metersHighJump", r.getMetersHighJump()),
                            Map.entry("secondsFourHundredMeterRun", r.getSecondsFourHundredMeterRun()),
                            Map.entry("secondsHundredTenMeterHurdle", r.getSecondsHundredTenMeterHurdle()),
                            Map.entry("metersDiscusThrow", r.getMetersDiscusThrow()),
                            Map.entry("metersPoleVault", r.getMetersPoleVault()),
                            Map.entry("metersJavelin", r.getMetersJavelin()),
                            Map.entry("secondsThousandFiveHundredMeterRun", r.getSecondsThousandFiveHundredMeterRun())
                    ))
                    .toList();

            List<Map<String, Object>> pointsList = athlete.getPoints().stream()
                    .map(p -> Map.<String, Object>ofEntries(
                            Map.entry("pointId", p.getPointId()),
                            Map.entry("hundredMeterRun", p.getHundredMeterRun()),
                            Map.entry("longJump", p.getLongJump()),
                            Map.entry("shotPut", p.getShotPut()),
                            Map.entry("highJump", p.getHighJump()),
                            Map.entry("fourHundredMeterRun", p.getFourHundredMeterRun()),
                            Map.entry("hundredTenMeterHurdle", p.getHundredTenMeterHurdle()),
                            Map.entry("discusThrow", p.getDiscusThrow()),
                            Map.entry("poleVault", p.getPoleVault()),
                            Map.entry("javelin", p.getJavelin()),
                            Map.entry("thousandFiveHundredMeterRun", p.getThousandFiveHundredMeterRun()),
                            Map.entry("totalScore", p.getTotalScore())
                    ))
                    .toList();

            Map<String, Object> countryMap = Map.of(
                    "countryId",   athlete.getCountry().getCountryId(),
                    "countryName", athlete.getCountry().getCountryName()
            );

            Map<String, Object> payload = Map.<String, Object>ofEntries(
                    Map.entry("athleteId", athlete.getAthleteId()),
                    Map.entry("athleteName", athlete.getAthleteName()),
                    Map.entry("bio", athlete.getBio()),
                    Map.entry("birthDate", athlete.getBirthDate()),
                    Map.entry("latitudeBirthPlace", athlete.getLatitudeBirthPlace()),
                    Map.entry("longitudeBirthPlace", athlete.getLongitudeBirthPlace()),
                    Map.entry("results", resultsList),
                    Map.entry("points", pointsList),
                    Map.entry("country", countryMap)
            );

            return ResponseEntity.ok(payload);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
