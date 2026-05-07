package com.internship.tool;

import com.internship.tool.entity.RiskItem;
import com.internship.tool.repository.RiskRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(RiskRepository repository) {
        return args -> {

            if (repository.count() == 0) {

                repository.save(new RiskItem(null, "Server Crash", "Production server down", "High"));
                repository.save(new RiskItem(null, "Data Leak", "Sensitive data exposed", "Critical"));
                repository.save(new RiskItem(null, "UI Bug", "Button not working", "Low"));
                repository.save(new RiskItem(null, "Slow API", "Response delay", "Medium"));
                repository.save(new RiskItem(null, "Memory Leak", "App consuming RAM", "High"));
                repository.save(new RiskItem(null, "Login Failure", "Users cannot login", "Critical"));
                repository.save(new RiskItem(null, "DB Error", "Database connection failed", "High"));
                repository.save(new RiskItem(null, "Security Issue", "Vulnerability found", "Critical"));
                repository.save(new RiskItem(null, "Cache Issue", "Cache not updating", "Medium"));
                repository.save(new RiskItem(null, "Timeout Error", "Request timeout", "Medium"));
                repository.save(new RiskItem(null, "Validation Bug", "Form validation missing", "Low"));
                repository.save(new RiskItem(null, "API Crash", "Service crashing", "High"));
                repository.save(new RiskItem(null, "Network Issue", "Connectivity problem", "Medium"));
                repository.save(new RiskItem(null, "File Upload Error", "Upload failed", "Low"));
                repository.save(new RiskItem(null, "Permission Issue", "Unauthorized access", "Critical"));

                System.out.println("15 Demo Records Inserted");
            }
        };
    }
}