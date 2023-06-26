package com.bdsumhac.pwbd.models;

import com.bdsumhac.pwbd.utils.AbstractIdEntity;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "facilities")
public class Facility extends AbstractIdEntity {

    @Column
    private String name1;

    @Column
    private String name2;

    @Column
    private String street1;

    @Column
    private String street2;

    @Column
    private String city;

    @Column
    private String state;

    @Column
    private int zip;

    @Column
    private int zip4;

    @Column
    private String county;

    @Column
    private String phone;

    @Column(name = "intake_prompt")
    private String intakePrompt;

    @Column
    private String intake1;

    @Column
    private String intake2;

    @Column
    private String website;

    @Column
    private float latitude;

    @Column
    private float longitude;

    @ManyToOne
    @JoinColumn(name = "type_facility")
    private ServiceCode code;

    @ManyToMany
    @JoinTable(
            name = "facility_flags",
            joinColumns = @JoinColumn(name = "facility"),
            inverseJoinColumns = @JoinColumn(name = "flag")
    )
    private Set<Flag> flags;

    public String getName1() {
        return name1;
    }

    public void setName1(String name1) {
        this.name1 = name1;
    }

    public String getName2() {
        return name2;
    }

    public void setName2(String name2) {
        this.name2 = name2;
    }

    public String getStreet1() {
        return street1;
    }

    public void setStreet1(String street1) {
        this.street1 = street1;
    }

    public String getStreet2() {
        return street2;
    }

    public void setStreet2(String street2) {
        this.street2 = street2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public int getZip() {
        return zip;
    }

    public void setZip(int zip) {
        this.zip = zip;
    }

    public int getZip4() {
        return zip4;
    }

    public void setZip4(int zip4) {
        this.zip4 = zip4;
    }

    public String getCounty() {
        return county;
    }

    public void setCounty(String county) {
        this.county = county;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getIntakePrompt() {
        return intakePrompt;
    }

    public void setIntakePrompt(String intakePrompt) {
        this.intakePrompt = intakePrompt;
    }

    public String getIntake1() {
        return intake1;
    }

    public void setIntake1(String intake1) {
        this.intake1 = intake1;
    }

    public String getIntake2() {
        return intake2;
    }

    public void setIntake2(String intake2) {
        this.intake2 = intake2;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public float getLatitude() {
        return latitude;
    }

    public void setLatitude(float latitude) {
        this.latitude = latitude;
    }

    public float getLongitude() {
        return longitude;
    }

    public void setLongitude(float longitude) {
        this.longitude = longitude;
    }

    public ServiceCode getCode() {
        return code;
    }

    public void setCode(ServiceCode code) {
        this.code = code;
    }

    public Set<Flag> getFlags() {
        return flags;
    }

    public void setFlags(Set<Flag> flags) {
        this.flags = flags;
    }

}
