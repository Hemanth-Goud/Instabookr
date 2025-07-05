package com.example.sb_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.sb_backend.model.Salon;

@Repository
public interface SalonRepository extends JpaRepository<Salon, Long> {

    // Find salons within a radius from given lat/lng (Haversine formula in SQL)
    @Query(value = "SELECT *, " +
            "(6371 * acos(cos(radians(:lat)) * cos(radians(latitude)) * cos(radians(longitude) - radians(:lng)) + sin(radians(:lat)) * sin(radians(latitude)))) AS distance " +
            "FROM salons " +
            "HAVING distance < 10 " +  // You can adjust radius value as needed
            "ORDER BY distance", nativeQuery = true)
    List<Salon> findNearbySalons(@Param("lat") double lat, @Param("lng") double lng);
}
