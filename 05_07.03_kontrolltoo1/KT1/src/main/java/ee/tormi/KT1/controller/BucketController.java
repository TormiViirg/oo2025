package ee.tormi.KT1.controller;

import ee.tormi.KT1.entity.Bucket;
import ee.tormi.KT1.repository.BucketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
        if (bucket.getNumber() <= 0) {
            throw new RuntimeException("ERROR_NUMBER_MUST_BE_POSITIVE");
        }
        bucketRepository.save(bucket);
        return bucketRepository.findAll();
    }

    @GetMapping("integers")
    public List<Bucket> addInteger() {
        return bucketRepository.findAll();
    }

//localhost:8080/converter?number=255&type=hex
    //[kshaaval lubatud
    @GetMapping("converter")
    public String convertNumber(@RequestParam int number, @RequestParam String type) {
        return switch (type.toLowerCase()) {
            case "binary" -> Integer.toBinaryString(number);
            case "octal" -> Integer.toOctalString(number);
            case "hex" -> Integer.toHexString(number);
            default -> "Conversion type not recognized. Supported types are 'binary', 'octal' and 'hex'.";
        };
    }

}
