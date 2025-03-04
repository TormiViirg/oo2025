package ee.tormi.kymnev6istlus.controller;

import ee.tormi.kymnev6istlus.entity.DecathlonEvents;
import ee.tormi.kymnev6istlus.repository.DecathlonEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DecathlonEventsController {
    @Autowired
    DecathlonEventsRepository decathlonEventsRepository;

    @PostMapping("events")
    public List<DecathlonEvents> addEvent(@RequestBody DecathlonEvents decathlonEvents){
        decathlonEventsRepository.save(decathlonEvents);
        return decathlonEventsRepository.findAll();
    }
}
