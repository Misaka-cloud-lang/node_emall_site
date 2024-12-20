package org.example.advertisement_system.controller;

import org.example.advertisement_system.entity.Advertisement;
import org.example.advertisement_system.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operating")
public class AdvertisementController {

    @Autowired
    private AdvertisementService advertisementService;

    @GetMapping("/advertisements")
    public List<Advertisement> getAdvertisementsByUsername(@RequestParam String username) {
        return advertisementService.getAdvertisementsByUsername(username);
    }

    @DeleteMapping("/by-title/{title}") // 新增删除广告的端点
    public ResponseEntity<Void> deleteAdvertisement(@PathVariable String title) {
        advertisementService.deleteAdvertisement(title);
        return ResponseEntity.noContent().build();
    }
}