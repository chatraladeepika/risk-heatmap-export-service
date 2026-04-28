package com.internship.tool.service;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.repository.RiskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskService {

    @Autowired
    private RiskRepository repository;

    public List<RiskItem> getAll() {
        return repository.findByDeletedFalse();
    }

    public List<RiskItem> search(String q) {
        return repository.findByNameContainingIgnoreCaseAndDeletedFalse(q);
    }

    public RiskItem save(RiskItem item) {
        return repository.save(item);
    }

    public RiskItem update(Long id, RiskItem item) {
        item.setId(id);
        return repository.save(item);
    }

    public void softDelete(Long id) {
        RiskItem item = repository.findById(id).orElseThrow();
        item.setDeleted(true);
        repository.save(item);
    }
}