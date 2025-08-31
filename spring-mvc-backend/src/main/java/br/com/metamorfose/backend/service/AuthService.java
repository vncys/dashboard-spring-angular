/**
 * File: AuthService.java
 * Description: Serviço de autenticação do projeto Metamorfose.
 * Responsável por gerenciar login, registro e operações de autenticação de usuários.
 * 
 * Responsabilidades:
 * - Autenticar usuários no sistema
 * - Registrar novos usuários
 * - Gerenciar tokens de acesso
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.service;
 import br.com.metamorfose.backend.model.dto.CreateUserDTO;
 import br.com.metamorfose.backend.model.dto.UserDTO;
 import br.com.metamorfose.backend.model.entity.User;
 import br.com.metamorfose.backend.repository.UserRepository;
 import br.com.metamorfose.backend.security.JwtService;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.security.authentication.AuthenticationManager;
 import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
 import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.security.core.userdetails.UserDetailsService;
 import org.springframework.security.core.userdetails.UsernameNotFoundException;
 import org.springframework.security.crypto.password.PasswordEncoder;
 import org.springframework.stereotype.Service;
 import org.springframework.transaction.annotation.Transactional;
 @Service
 @Transactional
 public class AuthService implements UserDetailsService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    /**
     * Registra novo usuário no sistema
     */
    public UserDTO registerUser(CreateUserDTO createUserDTO) {
        // Verifica se usuário já existe
        if (userRepository.existsByEmail(createUserDTO.getEmail())) {
            throw new RuntimeException("Email já está em uso");
        }
        
        // Cria novo usuário
        User user = new User();
        user.setEmail(createUserDTO.getEmail());
        user.setName(createUserDTO.getName());
        user.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        user.setRole("USER");
        
        User savedUser = userRepository.save(user);
        
        // Converte para DTO
        return convertToDTO(savedUser);
    }
    
    /**
     * Autentica usuário e retorna token
     */
    public AuthResponse authenticate(LoginRequest request) {
        // Autentica usuário
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        // Busca usuário
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Gera token
        UserDetails userDetails = loadUserByUsername(user.getEmail());
        String token = jwtService.generateToken(userDetails);
        
        return new AuthResponse(token, convertToDTO(user));
    }
    
    /**
     * Implementação do UserDetailsService
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado: " + email));
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole())
                .build();
    }
    
    /**
     * Converte User para UserDTO
     */
    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getEmail(),
            user.getName(),
            user.getRole(),
            user.getCreatedAt()
        );
    }
    
    // Classes auxiliares para request/response
    public static class LoginRequest {
        private String email;
        private String password;
        
        // Constructors, getters and setters
        public LoginRequest() {}
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
    
    public static class AuthResponse {
        private String token;
        private UserDTO user;
        
        public AuthResponse(String token, UserDTO user) {
            this.token = token;
            this.user = user;
        }
        
        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        
        public UserDTO getUser() { return user; }
        public void setUser(UserDTO user) { this.user = user; }
    }
 }
