package com.tormi.veebipood.controller;

import com.tormi.veebipood.entity.Category;
import com.tormi.veebipood.entity.Product;
import com.tormi.veebipood.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CatagoryController {
    @Autowired
    CategoryRepository categoryRepository;

    @GetMapping("categories")
    public List<Category> getProducts() {
        return categoryRepository.findAll();// praegu andmebaasist tühi list select all from extentds JpaRepostory<Product
    }

    @PostMapping("categories")
    public List<Category> addProduct(@RequestBody Category category) {
        if (category.getId() != null){
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
    }

    @DeleteMapping("categories/{id}")
    public  List <Category>deleteProduct(PathVariable Long id){
        categoryRepository.deleteAllById(id);
        return categoryRepository.findAll();
    }
}
