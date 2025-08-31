/**
 * File: CreateUserDTO.java
 * Description: DTO para criação de novos usuários no sistema Metamorfose.
 * Contém validações para garantir dados corretos na criação de usuários.
 * 
 * Responsabilidades:
 * - Receber dados para criação de usuário
 * - Validar dados de entrada
 * - Garantir formato correto dos dados
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.dto;
 import javax.validation.constraints.Email;
 import javax.validation.constraints.NotBlank;
 import javax.validation.constraints.Size;
 public class CreateUserDTO {
    
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;
    
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, max = 100, message = "Senha deve ter entre 6 e 100 caracteres")
    private String password;
    
    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 2, max = 100, message = "Nome deve ter entre 2 e 100 caracteres")
    private String name;
    
    // Constructors
    public CreateUserDTO() {}
    
    public CreateUserDTO(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
    
    // Getters and Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
 }
