package com.bdsumhac.pwbd.repositories;

import com.bdsumhac.pwbd.models.FacilityEdit;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Handles querying the {@link FacilityEdit} table.
 */
@Repository
public interface FacilityEditsRepository extends CrudRepository<FacilityEdit, Integer> {}
