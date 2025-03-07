package ee.tormi.KT1.controller;

import ee.tormi.KT1.entity.Bucket;
import ee.tormi.KT1.repository.BucketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BucketController {

    @Autowired
    BucketRepository bucketRepository;

    @PostMapping("integers")
    public List<Bucket> addInteger(@RequestBody Bucket bucket) {
        if (bucket.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        //lisa veel üks veateade
        bucketRepository.save(bucket);
        return bucketRepository.findAll();
    }

    @GetMapping("integers")
    public List<Bucket> addInteger() {
        return bucketRepository.findAll();
    }

}
