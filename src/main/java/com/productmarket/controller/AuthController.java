package com.productmarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.productmarket.model.LoginRequest;
import com.productmarket.model.User;
import com.productmarket.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if username already exists
        if (userService.findByUsername(user.getUsername()) != null) {
        	ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        }

        String Password = user.getPassword();
        
        // Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Register the user
        User registeredUser = userService.registerUser(user);
 
        // Authenticate the registered user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), Password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
   
        return ResponseEntity.status(HttpStatus.OK).body(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String username = loginRequest.username;
        String password = loginRequest.password;

        User user = userService.findByUsername(username);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
        	
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
            SecurityContextHolder.getContext().setAuthentication(authentication);
 
            return ResponseEntity.status(HttpStatus.OK).body(user);

        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/fetchuser")
    public ResponseEntity<User> fetchUser(@RequestParam Long userId) {
        return userService.findById(userId)
                .map(user -> ResponseEntity.ok().body(user))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    
    @GetMapping("/current")
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            System.out.println("no user");
        	return null;
        }
        String username = authentication.getName();
        System.out.println("yes user");
        return userService.findByUsername(username);
    }

    @PostMapping("/logout")
    public String logout() {
        SecurityContextHolder.clearContext();
        return "Kullanıcı başarıyla çıkış yaptı";
    }
}