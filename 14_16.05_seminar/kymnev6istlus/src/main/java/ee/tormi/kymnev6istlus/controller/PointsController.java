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

@CrossOrigin(origins = "http://localhost:5173")
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


}

