/**
 * File: UserRepository.java
 * Description: Repository para operações de banco de dados relacionadas aos usuários do Metamorfose.
 * Extende JpaRepository para operações CRUD e define queries personalizadas.
 * 
 * Responsabilidades:
 * - Realizar operações CRUD na entidade User
 * - Implementar consultas personalizadas
 * - Gerenciar persistência de usuários
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.repository;
 import br.com.metamorfose.backend.model.entity.User;
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.stereotype.Repository;
 import java.util.Optional;
 @Repository
 public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Busca usuário pelo email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Verifica se existe usuário com o email
     */
    boolean existsByEmail(String email);
 }
