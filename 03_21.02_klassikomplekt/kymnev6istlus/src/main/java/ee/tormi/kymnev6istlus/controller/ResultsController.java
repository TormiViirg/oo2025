package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.Results;
import ee.tormi.kymnev6istlus.repository.ResultsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ResultsController {
    @Autowired
    ResultsRepository resultsRepository;

    @PostMapping("results")
    public List<Results> addResult(@RequestBody Results results){
        resultsRepository.save(results);
        return resultsRepository.findAll();
    }
}
