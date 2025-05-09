package ee.mihkel.quizlet.repository;
import ee.mihkel.quizlet.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long>{
}
