package com.internship.tool.service;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.repository.RiskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Service
public class RiskService {

    @Autowired
    private RiskRepository repository;

    // ✅ GET ALL
    public Page<RiskItem> getAll(Pageable pageable) {
        return repository.findAll(pageable);
    }

    // ✅ SEARCH
    public List<RiskItem> search(String q) {
        return repository.findByNameContainingIgnoreCase(q);
    }

    // ✅ SAVE
    public RiskItem save(RiskItem item) {
        return repository.save(item);
    }

    // ✅ UPDATE
    public RiskItem update(Long id, RiskItem item) {
        RiskItem existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found with id " + id));

        existing.setName(item.getName());
        existing.setDescription(item.getDescription());

        return repository.save(existing);
    }

    // ✅ DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }
}