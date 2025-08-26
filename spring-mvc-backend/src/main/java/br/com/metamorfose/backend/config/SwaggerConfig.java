/**
 * File: SwaggerConfig.java
 * Description: Configuração do Swagger/OpenAPI para documentação da API do projeto Metamorfose.
 * Implementa a documentação automática dos endpoints REST com autenticação JWT.
 * 
 * Responsabilidades:
 * - Configurar documentação OpenAPI 3.0
 * - Definir esquemas de segurança JWT
 * - Personalizar informações da API
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Metamorfose API")
                        .version("1.0.0")
                        .description("API para o Sistema de Transformação Digital Metamorfose")
                        .contact(new Contact()
                                .name("Metamorfose Team")
                                .email("contact@metamorfose.com")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth",
                                new SecurityScheme()
                                        .name("bearerAuth")
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}