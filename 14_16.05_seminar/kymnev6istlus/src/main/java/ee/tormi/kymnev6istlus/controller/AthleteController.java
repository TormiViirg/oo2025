package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.service.DecathlonLogic;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@Getter

@RestController
public class AthleteController {

    @Autowired
    AthleteRepository athleteRepository;
    @Autowired
    private DecathlonLogic decathlonLogic;

    //all athletes by country
    @GetMapping("/athletes/overview")
    public ResponseEntity<Page<Athlete>> getAthletesByCountry(
            @RequestParam("countryId") Long countryId,
            @RequestParam("page")      int page,
            @RequestParam("size")      int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("athleteName").ascending());
        Page<Athlete> athletesPage = athleteRepository.findByCountry_CountryId(countryId, pageable);
        return ResponseEntity.ok(athletesPage);
    }

    @GetMapping("/athletes/locations")
    public ResponseEntity<List<Map<String, Object>>> getAthletesLocations() {
        List<Athlete> allAthletes = athleteRepository.findAll();

        List<Map<String, Object>> result = allAthletes.stream()
                .map(athlete -> Map.<String, Object>of(
                        "athleteId", (Object) athlete.getAthleteId(),
                        "name",      (Object) athlete.getAthleteName(),
                        "latitude",  (Object) athlete.getLatitudeBirthPlace(),
                        "longitude", (Object) athlete.getLongitudeBirthPlace()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    // initialization of athlete
    @PostMapping("athlete")
    public List<Athlete> addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getAthleteId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getAthleteName() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        if (athlete.getAge() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_AGE");
        }
        if (athlete.getLatitudeBirthPlace() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_LATITUDE");
        }
        if (athlete.getLongitudeBirthPlace() == null){
            throw new RuntimeException("ERROR_MUST_ENTER_LONGITUDE");
        }

        decathlonLogic.computeSome(athlete);
        return athleteRepository.findAll();
    }
// edit afterwards
    @PutMapping("/editResults/{athleteId}")
    public List<Athlete> updateAthlete(@RequestBody Athlete athlete) {
        // For a PUT (update), the athlete must already have an ID
        if (athlete.getAthleteId() == null) {
            throw new RuntimeException("ERROR_MUST_PROVIDE_ID_FOR_UPDATE");
        }

        // Ensure the athlete actually exists before updating
        if (!athleteRepository.existsById(athlete.getAthleteId())) {
            throw new RuntimeException("ERROR_NO_ATHLETE_WITH_ID");
        }

        if (athlete.getAthleteName() == null) {
            throw new RuntimeException("ERROR_MUST_ENTER_NAME");
        }
        if (athlete.getAge() == null) {
            throw new RuntimeException("ERROR_MUST_ENTER_AGE");
        }
        if (athlete.getLatitudeBirthPlace() == null) {
            throw new RuntimeException("ERROR_MUST_ENTER_LATITUDE");
        }
        if (athlete.getLongitudeBirthPlace() == null) {
            throw new RuntimeException("ERROR_MUST_ENTER_LONGITUDE");
        }

        decathlonLogic.computeSome(athlete);
        return athleteRepository.findAll();
    }


    // everything about athlete
    @GetMapping("/everything/athletes/{athleteId}")
    public ResponseEntity<Athlete> getAthleteEverything(@PathVariable Long athleteId) {
        Athlete athlete = athleteRepository.findByIdWithCountry(athleteId)
                .orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND_WITH_ID" + athleteId));
        return ResponseEntity.ok(athlete);
    }

    // change any field
    @PatchMapping("/result/{athleteId}")
    public Athlete patchAthleteResults(
            @RequestParam("id") Long id,//resultsId
            @RequestParam("field") String field,
            @RequestParam("value") Double value) {

        Athlete athleteResult = athleteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ERROR_RESULT_NOT_FOUND_WITH_ID " + id));

        if (value < 0) {
            throw new RuntimeException("VALUE_MUST_BE_ZERO_OR_POSITIVE");
        }

        switch (field) {
            case "secondsHundredMeterRun" ->
                    athleteResult.setSecondsHundredMeterRun(value);
            case "secondsFourHundredMeterRun" ->
                    athleteResult.setSecondsFourHundredMeterRun(value);
            case "metersLongJump" ->
                    athleteResult.setMetersLongJump(value);
            case "metersShotPut" ->
                    athleteResult.setMetersShotPut(value);
            case "metersHighJump" ->
                    athleteResult.setMetersHighJump(value);
            case "secondsHundredTenMeterHurdle" ->
                    athleteResult.setSecondsHundredTenMeterHurdle(value);
            case "metersDiscusThrow" ->
                    athleteResult.setMetersDiscusThrow(value);
            case "metersPoleVault" ->
                    athleteResult.setMetersPoleVault(value);
            case "metersJavelin" ->
                    athleteResult.setMetersJavelin(value);
            case "secondsThousandFiveHundredMeterRun" ->
                    athleteResult.setSecondsThousandFiveHundredMeterRun(value);
            default ->
                    throw new RuntimeException("ERROR_INVALID_FIELD: " + field);
        }

        athleteRepository.save(athleteResult);
        Athlete athletePoints = decathlonLogic.computeSome(athleteResult);
        athleteRepository.save(athletePoints);
        return athletePoints;
    }
}
