package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Points;
import ee.tormi.kymnev6istlus.entity.Results;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultsRepository extends JpaRepository<Results, Long> {
}
