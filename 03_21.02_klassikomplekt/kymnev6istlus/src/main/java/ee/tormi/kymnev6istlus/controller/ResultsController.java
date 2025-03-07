package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.ResultsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
public class ResultsController {
    @Autowired
    ResultsRepository resultsRepository;

    //TODO ära lase siin muuta pärast 1. sisestust
    @PostMapping("results")
    public List<Results> addResult(@RequestBody Results results) {
        List<Integer> scores = Arrays.asList(
                results.getHundredMeterRun(),
                results.getLongJump(),
                results.getShotPut(),
                results.getHighJump(),
                results.getFourHundredMeterRun(),
                results.getHundredTenMeterHurdle(),
                results.getDiscusThrow(),
                results.getPoleVault(),
                results.getJavelin(),
                results.getThousandFiveHundredMeterRun()
        );

        int totalScore = 0;
        for (Integer score : scores) {
            totalScore += (score != null ? score : 0);
        }

        results.setTotalScore(totalScore);
        resultsRepository.save(results);
        return resultsRepository.findAll();
    }

    @PatchMapping("results")
    public List<Results> editResultValue(@RequestParam Long id, String field, int value) {
        Results results = resultsRepository.findById(id).orElseThrow();
        int oldValue = 0;

        switch (field) {
            case "hundredMeterRun" -> {
                oldValue = results.getHundredMeterRun();
                results.setHundredMeterRun(value);
            }
            case "longJump" -> {
                oldValue = results.getLongJump();
                results.setLongJump(value);
            }
            case "shotPut" -> {
                oldValue = results.getShotPut();
                results.setShotPut(value);
            }
            case "highJump" -> {
                oldValue = results.getHighJump();
                results.setHighJump(value);
            }
            case "fourHundredMeterRun" -> {
                oldValue = results.getFourHundredMeterRun();
                results.setFourHundredMeterRun(value);
            }
            case "hundredTenMeterHurdle" -> {
                oldValue = results.getHundredTenMeterHurdle();
                results.setHundredTenMeterHurdle(value);
            }
            case "discusThrow" -> {
                oldValue = results.getDiscusThrow();
                results.setDiscusThrow(value);
            }
            case "poleVault" -> {
                oldValue = results.getPoleVault();
                results.setPoleVault(value);
            }
            case "javelin" -> {
                oldValue = results.getJavelin();
                results.setJavelin(value);
            }
            case "thousandFiveHundredMeterRun" -> {
                oldValue = results.getThousandFiveHundredMeterRun();
                results.setThousandFiveHundredMeterRun(value);
            }
        }

        int difference = value - oldValue;
        results.setTotalScore(results.getTotalScore() + difference);
        resultsRepository.save(results);

        return resultsRepository.findAll();
    }
}

