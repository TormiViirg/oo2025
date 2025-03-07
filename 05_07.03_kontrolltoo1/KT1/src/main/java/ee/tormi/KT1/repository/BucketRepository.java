package ee.tormi.KT1.repository;

import ee.tormi.KT1.entity.Bucket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BucketRepository extends JpaRepository<Bucket, Long> {
}
