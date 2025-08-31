/**
 * File: UserDTO.java
 * Description: DTO para transferência de dados de usuário do projeto Metamorfose.
 * Usado para expor dados do usuário através da API sem expor campos sensíveis.
 * 
 * Responsabilidades:
 * - Transferir dados de usuário entre camadas
 * - Omitir campos sensíveis como senha
 * - Representar usuário nas respostas da API
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.dto;
 import java.time.LocalDateTime;
 public class UserDTO {
    
    private Long id;
    private String email;
    private String name;
    private String role;
    private LocalDateTime createdAt;
    
    // Constructors
    public UserDTO() {}
    
    public UserDTO(Long id, String email, String name, String role, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
  
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
 }
