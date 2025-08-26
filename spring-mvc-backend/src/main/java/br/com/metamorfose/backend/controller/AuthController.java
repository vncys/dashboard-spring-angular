/**
 * File: AuthController.java
 * Description: Controller REST para operações de autenticação do projeto Metamorfose.
 * Gerencia endpoints de login, registro e operações relacionadas à autenticação.
 * 
 * Responsabilidades:
 * - Expor endpoints de autenticação via REST
 * - Gerenciar login e registro de usuários
 * - Retornar tokens de acesso JWT
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.controller;
 import br.com.metamorfose.backend.model.dto.CreateUserDTO;
 import br.com.metamorfose.backend.model.dto.UserDTO;
 import br.com.metamorfose.backend.service.AuthService;
 import io.swagger.v3.oas.annotations.Operation;
 import io.swagger.v3.oas.annotations.responses.ApiResponse;
 import io.swagger.v3.oas.annotations.responses.ApiResponses;
 import io.swagger.v3.oas.annotations.tags.Tag;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.web.bind.annotation.*;
 @RestController
 @RequestMapping("/api/auth")
 @CrossOrigin(origins = "*")
 @Tag(name = "Authentication", description = "Operações de autenticação e autorização")
 public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @Operation(
        summary = "Login de usuário",
        description = "Autentica usuário no sistema e retorna token JWT"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login realizado com sucesso"),
        @ApiResponse(responseCode = "401", description = "Credenciais inválidas"),
        @ApiResponse(responseCode = "400", description = "Dados de entrada inválidos")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthService.AuthResponse> login(@Valid @RequestBody AuthService.LoginRequest request) {
        try {
            AuthService.AuthResponse response = authService.authenticate(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
    
    @Operation(
        summary = "Registro de usuário",
        description = "Registra novo usuário no sistema"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Usuário criado com sucesso"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos ou email já existe"),
        @ApiResponse(responseCode = "409", description = "Email já está em uso")
    })
    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody CreateUserDTO request) {
        try {
            UserDTO user = authService.registerUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(user);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
    
    @Operation(
        summary = "Verificar status do usuário",
        description = "Verifica se o token JWT é válido e retorna dados do usuário"
    )
    @GetMapping("/me")
    public ResponseEntity<String> getCurrentUser() {
        return ResponseEntity.ok("Token válido");
    }
 }