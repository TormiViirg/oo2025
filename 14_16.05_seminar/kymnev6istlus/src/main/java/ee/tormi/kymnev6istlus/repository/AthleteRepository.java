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

    Page<Athlete> findByCountry_CountryId(Long countryId, Pageable pageable);

    @Query("SELECT a FROM Athlete a WHERE a.athleteId = :id")
    Optional<Athlete> findByIdWithCountry(@Param("id") Long id);

}
