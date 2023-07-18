package com.bdsumhac.pwbd.repositories;

import com.bdsumhac.pwbd.models.Facility;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Handles querying the {@link Facility} table.
 */
@Repository
public interface FacilitiesRepository extends CrudRepository<Facility, Integer> {}
