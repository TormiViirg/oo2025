package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Athlete;
import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.AthleteRepository;
import ee.tormi.kymnev6istlus.repository.PointsRepository;
import ee.tormi.kymnev6istlus.repository.ResultsRepository;
import ee.tormi.kymnev6istlus.service.DecathlonLogic;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
public class PointsController {

    @Autowired
    PointsRepository pointsRepository;
    DecathlonLogic decathlonLogic;
    AthleteRepository athleteRepository;
    ResultsRepository resultsRepository;

    @GetMapping("points")
    public List<Points> getResults(){
        return pointsRepository.findAll();
    }

    @PutMapping("results/batch")
    public List<Points> addResultsBatch(@PathVariable Long athleteId, @RequestBody List<Results> resultsList) {

        Athlete athlete = athleteRepository.findById(athleteId)
            .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Athlete not found with id " + athleteId
            ));

        for (Results results : resultsList) {
            if (results.getResultsId() != null) {
                throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Result ID must not be provided when patching in batch"
                );
            }
        }

        for (Results results : resultsList) {
            if (results.getSecondsHundredMeterRun() != null && results.getSecondsFourHundredMeterRun() < 0 ||
                    results.getMetersLongJump() != null && results.getMetersLongJump() < 0 ||
                    results.getMetersShotPut() != null && results.getMetersShotPut() < 0 ||
                    results.getMetersHighJump() != null && results.getMetersHighJump() < 0 ||
                    results.getSecondsFourHundredMeterRun() != null && results.getSecondsFourHundredMeterRun() < 0 ||
                    results.getSecondsHundredTenMeterHurdle() != null && results.getSecondsHundredTenMeterHurdle() < 0 ||
                    results.getMetersDiscusThrow() != null && results.getMetersDiscusThrow() < 0 ||
                    results.getMetersPoleVault() != null && results.getMetersPoleVault() < 0 ||
                    results.getMetersJavelin() != null && results.getMetersJavelin() < 0 ||
                    results.getSecondsThousandFiveHundredMeterRun() != null && results.getSecondsThousandFiveHundredMeterRun() < 0) {
                throw new IllegalArgumentException("ERROR_FIELDS_MUST_CONTAIN_0_OR_POSITIVE_NUMBER");
            }
        }
        List<Results> savedResults = resultsRepository.saveAll(resultsList);
        List<Points> pointsList = decathlonLogic.computeAll(savedResults);
        return pointsRepository.saveAll(pointsList);
    }

    @PatchMapping("/results")
    public Points editResultValue(
            @RequestParam("id") Long id,//resultsId
            @RequestParam("field") String field,
            @RequestParam("value") Double value) {

        Results result = resultsRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Result not found with id " + id
            ));

        if (value < 0) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Value must be zero or positive"
            );
        }

        switch (field) {
            case "secondsHundredMeterRun" ->
                    result.setSecondsHundredMeterRun(value);
            case "secondsFourHundredMeterRun" ->
                    result.setSecondsFourHundredMeterRun(value);
            case "metersLongJump" ->
                    result.setMetersLongJump(value);
            case "metersShotPut" ->
                    result.setMetersShotPut(value);
            case "metersHighJump" ->
                    result.setMetersHighJump(value);
            case "secondsHundredTenMeterHurdle" ->
                    result.setSecondsHundredTenMeterHurdle(value);
            case "metersDiscusThrow" ->
                    result.setMetersDiscusThrow(value);
            case "metersPoleVault" ->
                    result.setMetersPoleVault(value);
            case "metersJavelin" ->
                    result.setMetersJavelin(value);
            case "secondsThousandFiveHundredMeterRun" ->
                    result.setSecondsThousandFiveHundredMeterRun(value);
            default ->
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST, "Invalid field: " + field);
        }

        resultsRepository.save(result);
        Points points = decathlonLogic.computeSome(result);
        pointsRepository.save(points);
        return points;
    }
}

