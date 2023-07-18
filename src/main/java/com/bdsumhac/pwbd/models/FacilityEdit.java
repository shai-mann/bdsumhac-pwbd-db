package com.bdsumhac.pwbd.models;

import com.bdsumhac.pwbd.utils.AbstractIdEntity;
import jakarta.persistence.*;
import java.time.OffsetDateTime;

/**
 * An {@link Entity} storing information about an edit made to the {@link Facility} table.
 * The
 */
@Entity
@Table(name = "facility_edits")
public class FacilityEdit extends AbstractIdEntity {

    @ManyToOne
    @JoinColumn(name = "facility")
    private Facility facility;

    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private OffsetDateTime time;

    @Column
    private String email;

    @Column
    private boolean pwbd;

    public Facility getFacility() {
        return facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public OffsetDateTime getTime() {
        return time;
    }

    public void setTime(OffsetDateTime time) {
        this.time = time;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isPwbd() {
        return pwbd;
    }

    public void setPwbd(boolean pwbd) {
        this.pwbd = pwbd;
    }

}
