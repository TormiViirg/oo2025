package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Results;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ResultsRepository extends JpaRepository<Results, Long> {
   // @Query("SELECT r.totalScore FROM Result r WHERE r.athlete.id = :athleteId")
    //Integer findTotalScoreByAthleteId(@Param("athleteId") Long athleteId);
}
