package com.productmarket.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String username;
    public String password;
    public String name;
    public String surname;
    public Double balance;
    public String creditCardNumber;
    public String creditCardExpiryDate;
    public String creditCardSecurityCode;

    // getters and setters
}