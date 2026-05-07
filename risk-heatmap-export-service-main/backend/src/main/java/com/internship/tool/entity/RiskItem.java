package com.internship.tool.entity;

import jakarta.persistence.*;

@Entity
public class RiskItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String severity;

    // REQUIRED empty constructor
    public RiskItem() {
    }

    // REQUIRED constructor (fixes your error)
    public RiskItem(Long id, String name, String description, String severity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.severity = severity;
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }
}