/**
 * File: ProcessLog.java
 * Description: Entidade que representa logs de auditoria dos processos no sistema Metamorfose.
 * Registra todas as mudanças e eventos que ocorrem durante a execução de processos.
 * 
 * Responsabilidades:
 * - Registrar mudanças de estado dos processos
 * - Manter histórico de auditoria
 * - Mapear logs na tabela process_logs
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.model.entity;
 import javax.persistence.*;
 import org.hibernate.annotations.CreationTimestamp;
 import java.time.LocalDateTime;
 @Entity
 @Table(name = "process_logs")
 public class ProcessLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "process_id", nullable = false)
    private Process process;
    
    @Column(nullable = false)
    private String action; // CREATED, STATUS_CHANGED, PROGRESS_UPDATED, COMPLETED, etc.
    
    @Column
    private String previousValue;
    
    @Column
    private String newValue;
    
    @Column(length = 500)
    private String message;
    
    @CreationTimestamp
    private LocalDateTime timestamp;
    
    // Constructors
    public ProcessLog() {}
    
    public ProcessLog(Process process, String action, String message) {
        this.process = process;
        this.action = action;
        this.message = message;
    }
    
    public ProcessLog(Process process, String action, String previousValue, String newValue, String message) {
        this.process = process;
        this.action = action;
        this.previousValue = previousValue;
        this.newValue = newValue;
        this.message = message;
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Process getProcess() { return process; }
    public void setProcess(Process process) { this.process = process; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getPreviousValue() { return previousValue; }
    public void setPreviousValue(String previousValue) { this.previousValue = previousValue; }
    
    public String getNewValue() { return newValue; }
    public void setNewValue(String newValue) { this.newValue = newValue; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
 }
