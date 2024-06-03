package com.productmarket.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.productmarket.model.Product;
import com.productmarket.model.User;
import com.productmarket.repository.ProductRepository;
import com.productmarket.repository.UserRepository;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
 
    @Autowired
    private UserRepository userRepository;

    public List<Product> getAvailableProducts() {
        return productRepository.findByUserIdIsNull();
    }
    
    public List<Product> getProductsByUser(User user) {
        return productRepository.findByUserId(user.getId());
    }

    public void buyProduct(Long productId, Long userID) {
        Product product = productRepository.findById(productId).orElse(null);
        User user = userRepository.findById(userID).orElse(null);
        
        if (user != null && product != null && product.getUser() == null && user.getBalance() >= product.getProductInfo().getPrice()) {
            user.setBalance(user.getBalance() - product.getProductInfo().getPrice());
            userRepository.save(user);
            product.setUser(user);
            /*return*/ productRepository.save(product);
        }
        //return null;
    }

    public void cancelProduct(Long productId, Long userID) {
        Product product = productRepository.findById(productId).orElse(null);
        User user = userRepository.findById(userID).orElse(null);
        
        if (user!= null && product != null && product.getUser().equals(user)) {
            user.setBalance(user.getBalance() + product.getProductInfo().getPrice());
            userRepository.save(user);

            product.setUser(null);
            productRepository.save(product);
        }
    }
}