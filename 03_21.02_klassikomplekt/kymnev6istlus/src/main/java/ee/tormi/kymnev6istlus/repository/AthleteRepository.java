package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {

    @Query("SELECT a FROM Athlete a LEFT JOIN FETCH a.points WHERE a.athleteId = :id")
    Optional<Athlete> findByIdWithPoints(@Param("id") Long id);
}
