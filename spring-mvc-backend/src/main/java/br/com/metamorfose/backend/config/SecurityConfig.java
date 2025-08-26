/**
 * File: SecurityConfig.java
 * Description: Configuração de segurança do Spring Security para o projeto Metamorfose.
 * Implementa as regras de autenticação e autorização da API REST.
 * 
 * Responsabilidades:
 * - Configurar endpoints públicos e protegidos
 * - Liberar acesso ao Swagger e documentação
 * - Configurar filtros JWT de autenticação
 * - Prover bean PasswordEncoder para criptografia de senhas
 * 
 * Author: Ester Silva
 * Created on: 19-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * Configura o encoder de senhas utilizando BCrypt
     * 
     * @return BCryptPasswordEncoder para criptografia de senhas
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura o AuthenticationManager para gerenciar autenticação
     * 
     * @param config Configuração de autenticação do Spring
     * @return AuthenticationManager configurado
     */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Configura a cadeia de filtros de segurança
     * 
     * @param http Configuração de segurança HTTP
     * @return SecurityFilterChain configurado
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // ===== SWAGGER E DOCUMENTAÇÃO =====
                        .requestMatchers("/v3/api-docs/**").permitAll()
                        .requestMatchers("/swagger-ui/**").permitAll()
                        .requestMatchers("/swagger-ui.html").permitAll()
                        .requestMatchers("/api/v3/api-docs/**").permitAll() // Com context path
                        .requestMatchers("/api/swagger-ui/**").permitAll() // Com context path
                        .requestMatchers("/api/swagger-ui.html").permitAll() // Com context path

                        // ===== ACTUATOR E MONITORAMENTO =====
                        .requestMatchers("/actuator/**").permitAll()

                        // ===== H2 CONSOLE (APENAS DESENVOLVIMENTO) =====
                        .requestMatchers("/h2-console/**").permitAll()

                        // ===== ENDPOINTS DE TESTE =====
                        .requestMatchers("/test/**").permitAll()

                        // ===== ENDPOINTS PÚBLICOS DA API =====
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/public/**").permitAll()

                        // ===== TODAS AS OUTRAS REQUISIÇÕES PRECISAM DE AUTENTICAÇÃO =====
                        .anyRequest().authenticated())
                // Necessário para o H2 Console funcionar (permite frames)
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.disable()));

        return http.build();
    }
}
