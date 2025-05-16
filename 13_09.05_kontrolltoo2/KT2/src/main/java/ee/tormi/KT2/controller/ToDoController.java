package ee.tormi.KT2.controller;

import ee.tormi.KT2.entity.ToDo;
import ee.tormi.KT2.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(
        origins        = "http://localhost:5173",
        allowedHeaders = "*",
        methods        = {
                RequestMethod.GET,
                RequestMethod.POST,
                RequestMethod.PATCH,
                RequestMethod.DELETE,
                RequestMethod.OPTIONS
        }
)
@RequestMapping("/ToDos")
@RestController
public class ToDoController {

    @Autowired
    ToDoRepository toDoRepository;

    @GetMapping
    public List<ToDo> getToDos() {
        return toDoRepository.findAll();// praegu andmebaasist tühi list select all from extentds JpaRepostory<Product
    }

    @PostMapping
    public List<ToDo> addToDo(@RequestBody ToDo toDo) {
        if (toDo.getUserId() == null) {
            throw new RuntimeException("ERROR_USER_MUST_ADD_TODO");
        }
        if (toDo.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        toDoRepository.save(toDo); //insert into products toimub frontendis
        return toDoRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public List<ToDo> deleteToDo(@PathVariable Long id) {
        toDoRepository.deleteById(id);
        return toDoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ToDo getToDo(@PathVariable Long id) {
        return toDoRepository.findById(id).orElseThrow();
    }

    //products?id=4&field=name&value=Aura
    @PatchMapping
    public List<ToDo> editProductValue(@RequestParam Long id, String field, String value) {
        if (id == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        ToDo toDo = toDoRepository.findById(id).orElseThrow();
        switch (field) {
            case "title" -> toDo.setTitle(value);
            /*case "id" -> {
                throw new RuntimeException("ERROR_CANNOT_CHANGE_CREATOR");
            }*/
            case "completed" -> toDo.setCompleted(Boolean.parseBoolean(value));
        }
        toDoRepository.save(toDo);
        return toDoRepository.findAll();
    }
}