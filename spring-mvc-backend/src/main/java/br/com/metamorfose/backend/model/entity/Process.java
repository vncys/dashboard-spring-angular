/**
 * File: Process.java
 * Description: Entidade que representa um processo no sistema Metamorfose.
 * Mapeia a tabela 'processes' e gerencia o ciclo de vida dos processos de transformação.
 * 
 * Responsabilidades:
 * - Representar processos de transformação na aplicação
 * - Definir estados e tipos de processos
 * - Mapear relacionamentos com usuários e logs
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.entity;
 import javax.persistence.*;
 import org.hibernate.annotations.CreationTimestamp;
 import org.hibernate.annotations.UpdateTimestamp;
 import java.time.LocalDateTime;
 import java.util.List;
 @Entity
 @Table(name = "processes")
 public class Process {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String type; // TRANSFORMATION, ANALYSIS, MIGRATION, etc.
    
    @Column(nullable = false)
    private String status; // CREATED, IN_PROGRESS, COMPLETED, FAILED
    
    @Column(length = 1000)
    private String description;
    
    @Column
    private Integer progress = 0; // 0-100
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @OneToMany(mappedBy = "process", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ProcessLog> logs;
    
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Constructors
    public Process() {}
    
    public Process(String name, String type, String description, User user) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.user = user;
        this.status = "CREATED";
        this.progress = 0;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public List<ProcessLog> getLogs() { return logs; }
    public void setLogs(List<ProcessLog> logs) { this.logs = logs; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
 }
