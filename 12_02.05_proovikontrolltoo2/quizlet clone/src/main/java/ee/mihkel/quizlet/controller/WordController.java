package ee.mihkel.quizlet.controller;

import ee.mihkel.quizlet.entity.Word;
import ee.mihkel.quizlet.repository.WordRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@RestController

public class WordController {

    @Autowired
    WordRepository wordRepository;

    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("words")
    public List<Word> getProducts() {
        return wordRepository.findAll();// praegu andmebaasist tühi list select all from extentds JpaRepostory<Product
    }

    @PostMapping("words")
    public List<Word> addWord(@RequestBody Word word) {
        if (word.getWordId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (word.getWord() == null){
            throw new RuntimeException("ERROR_WORD_MUST_NOT_BE_BLANK");
        }
        if (word.getDefinition() == null){
            throw new RuntimeException("ERROR_DEFINITION_MUST_NOT_BE_BLANK");
        }
        wordRepository.save(word);
        return wordRepository.findAll();
    }

    @DeleteMapping("word/{id}")
    public  List<Word>deleteWord(@PathVariable Long id){
        wordRepository.deleteById(id);
        return wordRepository.findAll();
    }

    @GetMapping("words/{id}")
    public  Word getWord(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow();
    }

    @PatchMapping("words")
    public List<Word> editWordValue(@RequestParam Long id, String field, String value) {
        if (id == null){
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Word word = wordRepository.findById(id).orElseThrow();
        switch (field) {
            case "word" -> {
                if (word.getWord() == null){
                    throw new RuntimeException("ERROR_WORD_MUST_NOT_BE_BLANK");
                }
                word.setWord(value);
            }
            case "definition" -> {
                if (word.getDefinition() == null){
                    throw new RuntimeException("ERROR_DEFINITION_MUST_NOT_BE_BLANK");
                }
                word.setDefinition(value);
            }
        }
        wordRepository.save(word);
        return wordRepository.findAll();
    }
}