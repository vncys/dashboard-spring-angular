/**
 * File: ProcessDTO.java
 * Description: DTO para transferência de dados de processo do projeto Metamorfose.
 * Representa processos de transformação nas respostas da API.
 * 
 * Responsabilidades:
 * - Transferir dados de processo entre camadas
 * - Representar processo nas respostas da API
 * - Incluir informações de progresso e status
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.dto;
 import java.time.LocalDateTime;
 public class ProcessDTO {
    
    private Long id;
    private String name;
    private String type;
    private String status;
    private String description;
    private Integer progress;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public ProcessDTO() {}
    
    public ProcessDTO(Long id, String name, String type, String status, String description, 
                     Integer progress, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.status = status;
        this.description = description;
        this.progress = progress;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
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
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
 }
