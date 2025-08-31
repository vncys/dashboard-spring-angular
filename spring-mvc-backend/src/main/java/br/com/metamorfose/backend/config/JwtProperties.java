/**
 * File: JwtProperties.java
 * Description: Configuração de propriedades JWT do projeto Metamorfose.
 * Gerencia configurações relacionadas à autenticação e autorização JWT.
 * 
 * Responsabilidades:
 * - Mapear propriedades JWT do application.yml
 * - Fornecer configurações de secret e expiração
 * - Centralizar configurações de segurança JWT
 * 
 * Author: Ester Silva
 * Created on: 17-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {
    
    private String secret;
    private long expiration;
    
    // Construtor padrão
    public JwtProperties() {}
    
    // Getters e Setters
    public String getSecret() {
        return secret;
    }
    
    public void setSecret(String secret) {
        this.secret = secret;
    }
    
    public long getExpiration() {
        return expiration;
    }
    
    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }
    
    // Método toString para debug
    @Override
    public String toString() {
        return "JwtProperties{" +
                "secret='[PROTECTED]'" +
                ", expiration=" + expiration +
                '}';
    }
}
