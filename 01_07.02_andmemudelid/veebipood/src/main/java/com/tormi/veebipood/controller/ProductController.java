package com.tormi.veebipood.controller;

import com.tormi.veebipood.entity.Product;
import com.tormi.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    ProductRepository productRepository;
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll();// praegu andmebaasist t[hi list select all from extentds JpaRepostory<Product
    }
    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        productRepository.save(product); //insert into products toimub frontendis
        return productRepository.findAll();
    }
}
