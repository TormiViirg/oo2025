package ee.tormi.KT2.repository;

import ee.tormi.KT2.entity.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {
}

