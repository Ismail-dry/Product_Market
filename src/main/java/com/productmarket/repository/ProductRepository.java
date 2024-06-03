package com.productmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.productmarket.model.Product;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByUserId(Long userId);
    List<Product> findByUserIdIsNull();
}