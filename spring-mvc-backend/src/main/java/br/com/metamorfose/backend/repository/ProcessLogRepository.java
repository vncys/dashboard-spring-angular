/**
 * File: ProcessLogRepository.java
 * Description: Repository para operações de banco de dados relacionadas aos logs de processo do Metamorfose.
 * Gerencia histórico e auditoria dos processos de transformação.
 * 
 * Responsabilidades:
 * - Realizar operações CRUD na entidade ProcessLog
 * - Implementar consultas de histórico e auditoria
 * - Gerenciar logs de processo
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

package br.com.metamorfose.backend.repository;

import br.com.metamorfose.backend.model.entity.ProcessLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProcessLogRepository extends JpaRepository<ProcessLog, Long> {
    
    /**
     * Busca logs por ID do processo ordenados por timestamp desc
     */
    List<ProcessLog> findByProcessIdOrderByTimestampDesc(Long processId);
    
    /**
     * Busca logs de um usuário específico
     */
    @Query("SELECT pl FROM ProcessLog pl WHERE pl.process.user.email = :userEmail ORDER BY pl.timestamp DESC")
    List<ProcessLog> findByUserEmailOrderByTimestampDesc(@Param("userEmail") String userEmail);
    
    /**
     * Busca logs por ação
     */
    List<ProcessLog> findByActionOrderByTimestampDesc(String action);
    
    /**
     * Busca logs em período específico
     */
    @Query("SELECT pl FROM ProcessLog pl WHERE pl.timestamp BETWEEN :startDate AND :endDate ORDER BY pl.timestamp DESC")
    List<ProcessLog> findLogsBetweenDates(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    /**
     * Busca últimos logs de um processo
     */
    List<ProcessLog> findTop10ByProcessIdOrderByTimestampDesc(Long processId);
}
