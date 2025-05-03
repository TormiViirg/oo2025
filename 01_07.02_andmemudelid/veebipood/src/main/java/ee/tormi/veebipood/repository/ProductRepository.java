package ee.tormi.veebipood.repository;

import ee.tormi.veebipood.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Repository tagastab ainult kas Product, List<Product>
    //on juba by default sisse kirjutatud:
    //.findAll() ----> SELLECT * FROM products
    //.save() ---> INSERT values() INTO products
    //.deleteById() ---> DELETE FROM products WHERE
    //.findById() ---> SELECT product FROM products

    //costom repo päringud:

    // JPA buddy tuleb designer
    @Override
    List<Product> findAll();

    Page<Product> findByCategory_Id(Long id, Pageable pageable);
}
