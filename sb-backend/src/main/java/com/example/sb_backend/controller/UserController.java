package com.example.sb_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sb_backend.model.User;
import com.example.sb_backend.repository.UserRepository;

@RestController
@CrossOrigin(origins="http://localhost:8081")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository ur;

    @PostMapping("/register")
    public String register(@RequestBody User u) {
        User existuser = ur.findByEmail(u.getEmail());
        if (existuser != null) {
            return "Email already exists";
        }
        ur.save(u);
        return "Registration done successfully";
    }

    @PostMapping("/login")
    public String login(@RequestBody User u) {
        User existuser = ur.findByUsername(u.getUsername());
        if (existuser != null && existuser.getPassword().equals(u.getPassword())) {
            return "Login successful";
        }
        return "Invalid credentials";
    }

    // ✅ Existing get by email if needed
    // @GetMapping("/user-by-username/{email}")
    // public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
    //     User existuser = ur.findByEmail(email);
    //     if (existuser == null) {
    //         return ResponseEntity.notFound().build();
    //     }
    //     existuser.setPassword(null);
    //     return ResponseEntity.ok(existuser);
    // }

    // ✅ New: get by username for profile page
    @GetMapping("/user-by-username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        User existuser = ur.findByUsername(username);
        if (existuser == null) {
            return ResponseEntity.notFound().build();
        }
        existuser.setPassword(null);
        return ResponseEntity.ok(existuser);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        User existuser = ur.findByUsername(request.getUsername());
        if (existuser == null) {
            return ResponseEntity.badRequest().body("User not found");
        }

        if (!existuser.getPassword().equals(request.getOldPassword())) {
            return ResponseEntity.badRequest().body("Old password incorrect");
        }

        existuser.setPassword(request.getNewPassword());
        ur.save(existuser);
        return ResponseEntity.ok("Password changed successfully");
    }

    public static class PasswordChangeRequest {
        private String username;
        private String oldPassword;
        private String newPassword;

        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }

        public String getOldPassword() { return oldPassword; }
        public void setOldPassword(String oldPassword) { this.oldPassword = oldPassword; }

        public String getNewPassword() { return newPassword; }
        public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    }
}
