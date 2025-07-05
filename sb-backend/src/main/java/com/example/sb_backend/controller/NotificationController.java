package com.example.sb_backend.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sb_backend.model.Notification;
import com.example.sb_backend.repository.NotificationRepository;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:8081")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;

    // Add a new notification
    // @PostMapping("/add")
    // public Notification addNotification(@RequestBody Notification notification) {
    //       String message = request.get("message");
    //     Notification notification = new Notification(message, LocalDateTime.now());
    //     Notification saved = notificationRepository.save(notification);
    //     return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    // }
     @PostMapping("/add")
    public ResponseEntity<Notification> addNotification(@RequestBody Map<String, String> request) {
        String message = request.get("message");
        Notification notification = new Notification(message, LocalDateTime.now());
        Notification saved = notificationRepository.save(notification);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Fetch all notifications (newest first)
    @GetMapping("/all")
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }
}
