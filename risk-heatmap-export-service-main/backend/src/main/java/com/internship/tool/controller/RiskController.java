package com.internship.tool.controller;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.repository.RiskRepository;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.List;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.multipart.MultipartFile;
import java.io.BufferedReader;
import java.io.InputStreamReader;

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

    @GetMapping("/export")
    public void exportCSV(HttpServletResponse response) throws IOException {

        response.setContentType("text/csv");
        response.setHeader("Content-Disposition", "attachment; filename=risks.csv");

        List<RiskItem> risks = riskRepository.findAll();

        PrintWriter writer = response.getWriter();
        writer.println("ID,Name,Description,Severity");

        for (RiskItem r : risks) {
            writer.println(
                    r.getId() + "," +
                            r.getName() + "," +
                            r.getDescription() + "," +
                            r.getSeverity());
        }

        writer.flush();
        writer.close();
    }

    @PostMapping("/upload")
    public String uploadFile(@RequestParam("file") MultipartFile file) {

        // ❌ Check empty
        if (file.isEmpty()) {
            return "File is empty!";
        }

        // ❌ Check file type (only CSV)
        if (!file.getOriginalFilename().endsWith(".csv")) {
            return "Only CSV files are allowed!";
        }

        // ❌ Check file size (max 2MB)
        if (file.getSize() > 2 * 1024 * 1024) {
            return "File size must be less than 2MB!";
        }

        try {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream()));

            String line;
            boolean firstLine = true;

            while ((line = reader.readLine()) != null) {

                // Skip header
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                String[] data = line.split(",");

                RiskItem risk = new RiskItem();
                risk.setName(data[1]);
                risk.setDescription(data[2]);
                risk.setSeverity(data[3]);

                riskRepository.save(risk);
            }

            return "File uploaded successfully!";

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}