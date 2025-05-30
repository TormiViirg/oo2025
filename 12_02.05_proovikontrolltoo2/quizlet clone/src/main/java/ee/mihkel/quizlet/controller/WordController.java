package ee.mihkel.quizlet.controller;

import ee.mihkel.quizlet.entity.Word;
import ee.mihkel.quizlet.repository.WordRepository;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Getter
@CrossOrigin(origins = "http://localhost:5173")
@RestController


public class WordController {

    @Autowired
    WordRepository wordRepository;

    //kuna ma ei taibanud omal elu lihtsaks teha siis kuna sportlane võib mitmel võistlusel osaleda ja seetõtu mitu resulti
    @GetMapping("words")
    public List<Word> getWords() {
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

    @PutMapping("words/{id}")
    public Word updateWord(@PathVariable Long id, @RequestBody Word updated) {
        Word word = wordRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Word not found"));
        if (updated.getWord() == null || updated.getWord().isBlank())
            throw new RuntimeException("ERROR_WORD_MUST_NOT_BE_BLANK");
        if (updated.getDefinition() == null || updated.getDefinition().isBlank())
            throw new RuntimeException("ERROR_DEFINITION_MUST_NOT_BE_BLANK");

        word.setWord(updated.getWord());
        word.setDefinition(updated.getDefinition());
        return wordRepository.save(word);
    }

    @PostMapping("words/bulk")
    public List<Word> addWords(@RequestBody List<Word> words) {
        for (Word word : words) {
            if (word.getWordId() != null) {
                throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
            }
            if (word.getWord() == null || word.getWord().isBlank()) {
                throw new RuntimeException("ERROR_WORD_MUST_NOT_BE_BLANK");
            }
            if (word.getDefinition() == null || word.getDefinition().isBlank()) {
                throw new RuntimeException("ERROR_DEFINITION_MUST_NOT_BE_BLANK");
            }
        }
        wordRepository.saveAll(words);
        return wordRepository.findAll();
    }

}