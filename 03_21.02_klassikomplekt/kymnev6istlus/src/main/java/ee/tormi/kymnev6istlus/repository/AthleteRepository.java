package ee.tormi.kymnev6istlus.repository;

import ee.tormi.kymnev6istlus.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {

    @Query("SELECT athlete FROM Athlete athlete LEFT JOIN FETCH athlete.points WHERE athlete.athleteId = :athleteId")
    Optional<Athlete> findByIdWithPoints(@Param("athleteId") Long athleteId);

    @Query("SELECT DISTINCT athlete FROM Athlete athlete LEFT JOIN FETCH athlete.points")
    List<Athlete> findAllWithPoints();

    @Query("""
        SELECT a
        FROM Athlete a
        LEFT JOIN FETCH a.results r
        LEFT JOIN FETCH a.points  p
        LEFT JOIN FETCH a.country c
        WHERE a.athleteId = :id
    """)
    Optional<Athlete> findByIdEverything(@Param("id") Long id);

    Page<Athlete> findByCountry_CountryId(Long countryId, Pageable pageable);
}
