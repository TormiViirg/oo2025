package ee.tormi.hulknurk.repository;

import ee.tormi.hulknurk.entity.Kordinaadistik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KordinaatRepository extends JpaRepository<Kordinaadistik, Long> {
}

