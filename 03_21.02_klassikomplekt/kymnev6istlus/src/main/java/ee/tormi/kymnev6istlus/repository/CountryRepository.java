package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {
}
