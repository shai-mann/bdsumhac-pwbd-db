package com.bdsumhac.pwbd.controllers;

import com.bdsumhac.pwbd.models.Facility;
import com.bdsumhac.pwbd.services.FacilitiesService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Handles exposing API endpoints related to the {@link Facility} table.
 */
@RestController
@RequestMapping("/facilities")
public class FacilitiesController {

    @Autowired
    private FacilitiesService service;

    @GetMapping("/get")
    @ResponseBody
    public List<Facility> getFacilities() {
        return service.getFacilities();
    }

    @PostMapping("/update")
    @ResponseBody
    public void updateFacility(@RequestParam("id") int id,
                                  @RequestParam("pwbd") boolean pwbd,
                                  @RequestParam("email") String email) {
        service.updateFacility(id, pwbd, email);
    }

}
