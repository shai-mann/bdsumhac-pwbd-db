package com.bdsumhac.pwbd.utils;

import jakarta.persistence.*;

/**
 * Abstracts the behaviour of standard ID-based entities in the codebase.
 * Since all of them use the same annotations and naming conventions,
 * the code behind ID-based entities is abstracted here.
 * @see IdEntity
 */
@MappedSuperclass
public class AbstractIdEntity implements IdEntity<Integer> {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Integer id;

    @Override
    public Integer getId() {
        return id;
    }

    @Override
    public void setId(Integer id) {
        this.id = id;
    }

}
