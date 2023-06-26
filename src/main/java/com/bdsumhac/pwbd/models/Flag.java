package com.bdsumhac.pwbd.models;

import com.bdsumhac.pwbd.utils.AbstractIdEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "flags")
public class Flag extends AbstractIdEntity {

    @Column
    private String code;

    @Column
    private String description;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

}
