package com.tormi.veebipood.repository;

import com.tormi.veebipood.entity.Category;
import com.tormi.veebipood.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
