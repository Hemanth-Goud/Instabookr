package com.example.sb_backend.configu;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.sb_backend.model.Salon;
import com.example.sb_backend.repository.SalonRepository;

import jakarta.annotation.PostConstruct;

@Component
public class DataLoader {

    @Autowired
    private SalonRepository salonRepository;

    @PostConstruct
    public void loadData() {
        // Clear existing data if needed (optional)
        salonRepository.deleteAll();

        List<Salon> salons = Arrays.asList(
            createSalon("Jawed Habib Hair & Beauty Rajam", "Srikakulam road, Rajam", 18.5903, 83.3980),
            createSalon("Naturals Salon", "1st Floor, DSL Complex, Srikakulam-Rajam Rd, opposite Axis Bank", 18.5898, 83.4012),
            createSalon("Charishma beauty & Spa", "Dr.no:-5-567, Palakonda Rd, beside apsara theatre", 18.5930, 83.4035),
            createSalon("Shine Beauty Parlour", "Opposite Satya complex, Palakonda - Rajam Rd, near JJ Innotel", 18.5950, 83.4020),
            createSalon("BLACK BRAND UNISEX FAMILY SALON & SPA", "1st floor, Surya durga complex, Karur vysya bank, opposite axis bank", 18.5910, 83.4005),
            createSalon("New trends salon & Tattoo", "Palakonda - Rajam Rd, opposite satya complex, near JJ innotel", 18.5945, 83.4015),
            createSalon("Anusri beauty parlour", "Mondi veedhi", 18.5920, 83.3990),
            createSalon("Sai Salon And Spa", "5-47, Bobbili-Parvathipuram Rd", 18.5960, 83.4000),
            createSalon("SAI SAHAJA EMPORIUM", "OPP:APASARA THEATER, BESIDES KOTAK MAHENDRA BANK", 18.5932, 83.4030),
            createSalon("Anil Saloon Hair Style And Spa", "FM26+WQ6", 18.5905, 83.3995),
            createSalon("Shree Mamatha", "FM25+58Q", 18.5915, 83.3985),
            createSalon("Balaji Styles Saloon", "Rajam", 18.5900, 83.4000),
            createSalon("SVR Hairstyles", "Opp. Subbarao Street, Rajam", 18.5907, 83.4009),
            createSalon("Lakme Salon Rajam", "RTC Complex Road, Rajam", 18.5912, 83.4018),
            createSalon("VLCC Salon & Wellness", "Beside Reliance Trends, Rajam", 18.5895, 83.4025),
            createSalon("Trends Gents Parlour", "Near Gandhi Statue, Rajam", 18.5887, 83.4003),
            createSalon("Sri Sai Beauty Parlour", "Market Street, Rajam", 18.5908, 83.3998),
            createSalon("Glow Beauty Hub", "Railway Station Road, Rajam", 18.5935, 83.4010),
            createSalon("Classic Men's Parlour", "Opp RTC Bus Stand, Rajam", 18.5928, 83.3992),
            createSalon("Sri Venkateswara Beauty Parlour", "Old Bus Stand Road, Rajam", 18.5916, 83.3980)
        );

        salonRepository.saveAll(salons);
        System.out.println("Loaded " + salons.size() + " salons into the database.");
    }

    private Salon createSalon(String name, String address, double latitude, double longitude) {
        Salon salon = new Salon();
        salon.setName(name);
        salon.setAddress(address);
        salon.setCity("Rajam");
        salon.setLatitude(latitude);
        salon.setLongitude(longitude);
        return salon;
    }
}
