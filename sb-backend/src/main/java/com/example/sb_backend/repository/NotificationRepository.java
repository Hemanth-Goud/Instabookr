package com.example.sb_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.sb_backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
