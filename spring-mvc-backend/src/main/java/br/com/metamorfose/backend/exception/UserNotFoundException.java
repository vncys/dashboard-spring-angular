/**
 * File: UserNotFoundException.java
 * Description: Exceção lançada quando um usuário não é encontrado no sistema.
 * 
 * Responsabilidades:
 * - Representar erro de usuário não encontrado
 * - Fornecer mensagem de erro apropriada
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.exception;

public class UserNotFoundException extends RuntimeException {
    
    public UserNotFoundException(String message) {
        super(message);
    }
    
    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public UserNotFoundException(Long userId) {
        super("Usuário não encontrado com ID: " + userId);
    }
    
    public UserNotFoundException(String email, boolean isEmail) {
        super("Usuário não encontrado com email: " + email);
    }
}
