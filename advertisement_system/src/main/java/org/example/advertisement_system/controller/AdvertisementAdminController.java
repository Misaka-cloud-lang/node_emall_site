package org.example.advertisement_system.controller;

import org.example.advertisement_system.entity.Advertisement;
import org.example.advertisement_system.service.AdvertisementAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/advertisements_admin")
public class AdvertisementAdminController {

    @Autowired
    private AdvertisementAdminService advertisementService;

    @GetMapping
    public List<Advertisement> getAdvertisements() {
        return advertisementService.getAllAdvertisements();
    }
}
