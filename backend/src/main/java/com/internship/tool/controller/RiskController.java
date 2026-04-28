package com.internship.tool.controller;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.service.RiskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
@CrossOrigin
public class RiskController {

    @Autowired
    private RiskService service;

    // GET all
    @GetMapping
    public List<RiskItem> getAll() {
        return service.getAll();
    }

    // SEARCH
    @GetMapping("/search")
    public List<RiskItem> search(@RequestParam String q) {
        return service.search(q);
    }

    // CREATE
    @PostMapping
    public RiskItem create(@RequestBody RiskItem item) {
        return service.save(item);
    }

    // UPDATE
    @PutMapping("/{id}")
    public RiskItem update(@PathVariable Long id, @RequestBody RiskItem item) {
        return service.update(id, item);
    }

    // DELETE (soft)
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.softDelete(id);
    }
}