/**
* File: MetamorfoseApplication.java
* Description: Classe principal da aplicação Spring Boot do projeto Metamorfose.
* Responsável por inicializar toda a aplicação backend e suas configurações.
* 
* Responsabilidades:
* - Inicialização da aplicação Spring Boot
* - Configuração de beans principais
* - Ponto de entrada da aplicação
* 
* Author: Ester Silva
* Created on: 16-08-2025
* 
* Version: 1.0.0
* Squad: Metamorfose
*/

package br.com.metamorfose.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MetamorfoseApplication {

	public static void main(String[] args) {
		SpringApplication.run(MetamorfoseApplication.class, args);
	}

}
