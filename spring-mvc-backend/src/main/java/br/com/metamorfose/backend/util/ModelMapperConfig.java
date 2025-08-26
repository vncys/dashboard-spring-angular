/**
* File: ModelMapperConfig.java
* Description: Configuração do ModelMapper para conversão entre entidades e DTOs do Metamorfose.
* Facilita a conversão automática entre objetos de domínio e objetos de transferência.
* 
* Responsabilidades:
* - Configurar bean do ModelMapper
* - Definir mapeamentos personalizados
* - Otimizar conversões entre objetos
* 
* Author: Ester Silva
* Created on: 16-08-2025
* 
* Version: 1.0.0
* Squad: Metamorfose
*/

package br.com.metamorfose.backend.util;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();

        // Configurações personalizadas do mapper
        mapper.getConfiguration()
                .setFieldMatchingEnabled(true)
                .setFieldAccessLevel(org.modelmapper.config.Configuration.AccessLevel.PRIVATE);

        return mapper;
    }
}