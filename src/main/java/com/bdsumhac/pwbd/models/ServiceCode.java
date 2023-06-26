package com.bdsumhac.pwbd.models;

import com.bdsumhac.pwbd.utils.AbstractIdEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

/**
 * Contains the entity model connected to the ServiceCodes table. Stores data about a single
 * Service Code, and what the code means in the context of a {@link Facility}.
 */
@Entity
@Table(name = "service_codes")
public class ServiceCode extends AbstractIdEntity {

    @Column
    private String code;

    @Column
    private String name;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
