package ee.tormi.KT1.repository;

import ee.tormi.KT1.entity.Conversion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversionRepository extends JpaRepository<Conversion.ConversionResult, Long> {
}
