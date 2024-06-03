package com.productmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.productmarket.model.ProductInfo;

public interface ProductInfoRepository extends JpaRepository<ProductInfo, Long> {
}