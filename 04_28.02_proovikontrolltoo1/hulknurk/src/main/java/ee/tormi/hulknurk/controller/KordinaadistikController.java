package ee.tormi.hulknurk.controller;

import ee.tormi.hulknurk.entity.Kordinaadistik;
import ee.tormi.hulknurk.repository.KordinaatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class KordinaadistikController {
    @Autowired
    KordinaatRepository kordinaatRepository;

    @GetMapping("koik")
    public List<Kordinaadistik> getKordinaadistik() {
        return kordinaatRepository.findAll();
    }

    @PostMapping("sisestus")
    public List<Kordinaadistik> addKordinaadistik (@RequestParam double xKordinaat, double yKordinaat) {

    }

}
