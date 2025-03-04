package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}
