package ee.tormi.KT2.repository;

import ee.tormi.KT2.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    List<ToDo> findByTitleContainingIgnoreCase(String title);
}

