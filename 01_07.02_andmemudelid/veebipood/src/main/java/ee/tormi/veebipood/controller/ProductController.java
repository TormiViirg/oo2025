package ee.tormi.veebipood.controller;

import ee.tormi.veebipood.entity.Product;
import ee.tormi.veebipood.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5137")
@RestController
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findAll();// praegu andmebaasist tühi list select all from extentds JpaRepostory<Product
    }

    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null){
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (product.getPrice() <= 0){
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product); //insert into products toimub frontendis
        return productRepository.findAll();
    }

    @DeleteMapping("products/{id}")
    public  List<Product>deleteProduct(@PathVariable Long id){
        productRepository.deleteById(id);
        return productRepository.findAll();
    }

    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if (product.getId() == null) {
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        if (product.getPrice() <= 0) {
            throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
        }
        productRepository.save(product);
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public  Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow();
    }

//products?id=4&field=name&value=Aura
    @PatchMapping("products")
    public List<Product> editProductValue(@RequestParam Long id, String field, String value) {
        if (id == null){
            throw new RuntimeException("ERROR_CANNOT_EDIT_WITHOUT_ID");
        }
        Product product = productRepository.findById(id).orElseThrow();
        switch (field) {
            case "name" -> product.setName(value);
            case "price" -> {
                if (Double.parseDouble(value) <= 0) {
                    throw new RuntimeException("ERROR_PRICE_MUST_BE_POSITIVE");
                }
                product.setPrice(Double.parseDouble(value));
            }
            case "image" -> product.setImage(value);
            case "active" -> product.setActive(Boolean.parseBoolean(value));
        }
        productRepository.save(product);
        return productRepository.findAll();
    }
}
