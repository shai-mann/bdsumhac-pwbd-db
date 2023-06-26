package com.bdsumhac.pwbd.utils;

import jakarta.persistence.Entity;

/**
 * Defines behavior categoristic of {@link Entity} classes that contain IDs.
 */
public interface IdEntity<T> {

    T getId();

    void setId(T id);

}
