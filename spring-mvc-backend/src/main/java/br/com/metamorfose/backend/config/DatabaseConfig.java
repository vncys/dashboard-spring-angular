/**
* File: DatabaseConfig.java
* Description: Configuração de banco de dados do projeto Metamorfose.
* Gerencia configurações de conexão, pools e propriedades do JPA/Hibernate.
* 
* Responsabilidades:
* - Configurar pools de conexão
* - Definir propriedades do Hibernate
* - Gerenciar transações
* 
* Author: Ester Silva
* Created on: 16-08-2025
* 
* Version: 1.0.0
* Squad: Metamorfose
*/

package br.com.metamorfose.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class DatabaseConfig {
    // Configurações adicionais do banco de dados podem ser adicionadas aqui
    // Por exemplo: configuração de múltiplos datasources, configurações de cache,
    // etc.
}
