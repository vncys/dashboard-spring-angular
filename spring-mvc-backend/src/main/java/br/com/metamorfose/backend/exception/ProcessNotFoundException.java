 /**
 * File: ProcessNotFoundException.java
 * Description: Exceção customizada para quando um processo não é encontrado no Metamorfose.
 * Utilizada quando operações são realizadas em processos inexistentes ou sem permissão.
 * 
 * Responsabilidades:
 * - Representar erro de processo não encontrado
 * - Facilitar tratamento específico de erros
 * - Melhorar logs e debugging
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.exception;
 public class ProcessNotFoundException extends RuntimeException {
    
    public ProcessNotFoundException(String message) {
        super(message);
    }
    
    public ProcessNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public ProcessNotFoundException(Long processId) {
        super("Processo não encontrado com ID: " + processId);
    }
 }
