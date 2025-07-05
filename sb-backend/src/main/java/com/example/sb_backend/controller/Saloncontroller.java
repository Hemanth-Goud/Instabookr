package com.example.sb_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.sb_backend.model.Salon;
import com.example.sb_backend.repository.SalonRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/salons")
public class Saloncontroller {

    @Autowired
    private SalonRepository salonRepository;

    // ✅ Get all salons (optional endpoint)
    @GetMapping("/all")
    public List<Salon> getAllSalons() {
        return salonRepository.findAll();
    }

    // ✅ Get nearby salons using lat/lng
    @GetMapping("/nearby")
    public List<Salon> getNearbySalons(@RequestParam double lat, @RequestParam double lng) {
        return salonRepository.findNearbySalons(lat, lng);
    }
}
