package com.internship.tool.controller;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.repository.RiskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/risks")
public class RiskController {

    @Autowired
    private RiskRepository riskRepository;

    // ✅ GET ALL
    @GetMapping
    public List<RiskItem> getAll() {
        return riskRepository.findAll();
    }

    // ✅ GET BY ID (VERY IMPORTANT)
    @GetMapping("/{id}")
    public RiskItem getById(@PathVariable Long id) {
        return riskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found"));
    }

    // ✅ CREATE
    @PostMapping
    public RiskItem create(@RequestBody RiskItem risk) {

        System.out.println("Severity from request: " + risk.getSeverity()); // 👈 ADD THIS

        return riskRepository.save(risk);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public RiskItem update(@PathVariable Long id, @RequestBody RiskItem updated) {

        RiskItem risk = riskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found"));

        risk.setName(updated.getName());
        risk.setDescription(updated.getDescription());
        risk.setSeverity(updated.getSeverity()); // ✅ IMPORTANT

        return riskRepository.save(risk);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        riskRepository.deleteById(id);
    }
}