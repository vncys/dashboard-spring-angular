/**
 * File: CreateProcessDTO.java
 * Description: DTO para criação de novos processos no sistema Metamorfose.
 * Contém validações para garantir dados corretos na criação de processos.
 * 
 * Responsabilidades:
 * - Receber dados para criação de processo
 * - Validar dados de entrada
 * - Garantir tipos de processo válidos
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.dto;
 import jakarta.validation.constraints.NotBlank;
 import jakarta.validation.constraints.Size;
 public class CreateProcessDTO {
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String name;
    
    @NotBlank(message = "Tipo é obrigatório")
    private String type;
    
    @Size(max = 1000, message = "Descrição deve ter no máximo 1000 caracteres")
    private String description;
    
    // Constructors
    public CreateProcessDTO() {}
    
    public CreateProcessDTO(String name, String type, String description) {
        this.name = name;
        this.type = type;
        this.description = description;
    }
    
    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
 }