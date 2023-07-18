package com.bdsumhac.pwbd.services;

import com.bdsumhac.pwbd.controllers.FacilitiesController;
import com.bdsumhac.pwbd.models.Facility;
import com.bdsumhac.pwbd.models.FacilityEdit;
import com.bdsumhac.pwbd.repositories.FacilitiesRepository;
import com.bdsumhac.pwbd.repositories.FacilityEditsRepository;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Handles the business logic behind {@link FacilitiesController} endpoints.
 */
@Service
@Transactional
public class FacilitiesService {

    @Autowired
    private FacilitiesRepository repository;

    @Autowired
    private FacilityEditsRepository facilityEditsRepository;

    public List<Facility> getFacilities() {
        List<Facility> out = new ArrayList<>();
        repository.findAll().forEach(out::add);
        return out;
    }

    /**
     * Updates the value of the pwbd (person with bleeding disorder) column. Requires
     * a non-null email to be given, and requires a valid {@link Facility} id to be provided.
     * @param id the id of the {@link Facility} being edited.
     * @param pwbd the value to set in that column.
     * @param email the email of the person making the edit.
     */
    public void updateFacility(int id, boolean pwbd, String email) {
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("Must provide an email when updating the database.");
        }

        Facility f = repository.findById(id).orElseThrow(() -> {
            throw new IllegalArgumentException("Invalid Facility id given.");
        });

        f.setPwbd(pwbd);

        repository.save(f);

        FacilityEdit edit = new FacilityEdit();
        edit.setFacility(f);
        edit.setEmail(email);
        edit.setTime(OffsetDateTime.now());

        facilityEditsRepository.save(edit);
    }

}
