/**
 * File: ProcessRepository.java
 * Description: Repository para operações de banco de dados relacionadas aos processos do Metamorfose.
 * Gerencia persistência e consultas dos processos de transformação.
 * 
 * Responsabilidades:
 * - Realizar operações CRUD na entidade Process
 * - Implementar consultas por usuário, tipo e status
 * - Gerenciar persistência de processos
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.repository;
 import br.com.metamorfose.backend.model.entity.Process;
 import org.springframework.data.jpa.repository.JpaRepository;
 import org.springframework.data.jpa.repository.Query;
 import org.springframework.data.repository.query.Param;
 import org.springframework.stereotype.Repository;
 import java.util.List;
 import java.util.Optional;
 @Repository
 public interface ProcessRepository extends JpaRepository<Process, Long> {
    
    /**
     * Busca processos por email do usuário
     */
    List<Process> findByUserEmailOrderByCreatedAtDesc(String userEmail);
    
    /**
     * Busca processo por ID e email do usuário
     */
    Optional<Process> findByIdAndUserEmail(Long id, String userEmail);
    
    /**
     * Busca processos por tipo e usuário
     */
    List<Process> findByUserEmailAndType(String userEmail, String type);
    
    /**
     * Busca processos por status e usuário
     */
    List<Process> findByUserEmailAndStatus(String userEmail, String status);
    
    /**
     * Conta processos por status e usuário
     */
    @Query("SELECT COUNT(p) FROM Process p WHERE p.user.email = :userEmail AND p.status = :status")
    Long countByUserEmailAndStatus(@Param("userEmail") String userEmail, @Param("status") String status);
    
    /**
     * Busca processos em andamento
     */
    @Query("SELECT p FROM Process p WHERE p.user.email = :userEmail AND p.status IN ('IN_PROGRESS', 'CREATED')")
    List<Process> findActiveProcessesByUserEmail(@Param("userEmail") String userEmail);
 }
