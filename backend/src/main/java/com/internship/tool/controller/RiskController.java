package com.internship.tool.controller;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.service.RiskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequestMapping("/api/risks")
@CrossOrigin(origins = "*")
public class RiskController {

    @Autowired
    private RiskService service;

    // ✅ GET ALL (Pagination)
    @GetMapping
    public Page<RiskItem> getAll(Pageable pageable) {
        return service.getAll(pageable);
    }

    // ✅ SEARCH
    @GetMapping("/search")
    public List<RiskItem> search(@RequestParam String q) {
        return service.search(q);
    }

    // ✅ CREATE
    @PostMapping
    public RiskItem create(@RequestBody RiskItem item) {
        return service.save(item);
    }

    // ✅ UPDATE
    @PutMapping("/{id}")
    public RiskItem update(@PathVariable Long id, @RequestBody RiskItem item) {
        return service.update(id, item);
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}