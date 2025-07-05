package com.example.sb_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.sb_backend.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    
}
