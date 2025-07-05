package com.example.sb_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.sb_backend.model.Booking;
import com.example.sb_backend.repository.BookingRepository;

@RestController
@CrossOrigin(origins = "http://localhost:8081") // your Expo app URL if needed
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addBooking(@RequestBody Booking booking) {
        System.out.println("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
       Booking saved = bookingRepository.save(booking);
       System.out.println("11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
    return ResponseEntity.status(HttpStatus.CREATED).body(saved);
}
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
}
}
