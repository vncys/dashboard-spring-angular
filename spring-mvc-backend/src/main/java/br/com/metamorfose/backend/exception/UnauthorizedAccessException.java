/**
 * File: UnauthorizedAccessException.java
 * Description: Exceção customizada para acesso não autorizado no Metamorfose.
 * Utilizada quando usuários tentam acessar recursos sem permissão adequada.
 * 
 * Responsabilidades:
 * - Representar erro de acesso não autorizado
 * - Melhorar controle de segurança
 * - Facilitar auditoria de tentativas de acesso
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.exception;
 public class UnauthorizedAccessException extends RuntimeException {
    
    public UnauthorizedAccessException(String message) {
        super(message);
    }
    
    public UnauthorizedAccessException(String message, Throwable cause) {
        super(message, cause);
    }
 }
