package ee.tormi.KT1.controller;

import ee.tormi.KT1.entity.Bucket;
import ee.tormi.KT1.entity.Conversion;
import ee.tormi.KT1.repository.BucketRepository;
import ee.tormi.KT1.repository.ConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import static java.lang.StringUTF16.toLowerCase;

@RestController
public class ConversionController {

    @Autowired
    private ConversionRepository conversionRepository;
    @Autowired
    private BucketRepository bucketRepository;

    @PostMapping("/convert")
    public ResponseEntity<?> convertNumbers(@RequestParam String conversionType) {
        List<Bucket> numbers = bucketRepository.findAll();
        List<Conversion.ConversionResult> savedResults = new ArrayList<>();
        for(Bucket num : numbers) {
            int original = num.getValue();
            String converted;

            switch (conversionType.toLowerCase()) {
                case "binary":
                    converted = Integer.toBinaryString(original);
                    break;
                case "octal":
                    converted = Integer.toOctalString(original);
                    break;
                case "hexadecimal":
                    converted = Integer.toHexString(original);
                    break;
                default:
                    return ResponseEntity.badRequest().body("Conversion type not recognized. Supported types are 'binary', 'octal' and 'hex");
            }
            Conversion.ConversionResult result = new Conversion.ConversionResult(original, converted, conversionType.toLowerCase());

            conversionRepository.save(result);
            savedResults.add(savedResults);
            }
            return ResponseEntity.ok(savedResults);
        }
    }
}
