package com.productmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.productmarket.model.Product;
import com.productmarket.security.UserPrincipal;
import com.productmarket.service.ProductService;
import com.productmarket.service.UserService;
import com.productmarket.model.User;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @GetMapping()
    public List<Product> getProducts() {
        return productService.getAvailableProducts();
    }

    @PostMapping("/buy/{productId}")
    public void buyProduct(@PathVariable Long productId, @RequestParam Long userId) {
        productService.buyProduct(productId, userId);
    }

    @PostMapping("/cancel/{productId}")
    public void cancelProduct(@PathVariable Long productId, @RequestParam Long userId) {
        productService.cancelProduct(productId, userId);
    }
}