CREATE TABLE audit_log (
    id SERIAL PRIMARY KEY,

    action VARCHAR(100) NOT NULL,
    entity_name VARCHAR(100),
    entity_id INT,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_entity ON audit_log(entity_name);