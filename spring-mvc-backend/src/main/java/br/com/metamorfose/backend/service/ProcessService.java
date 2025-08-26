/**
 * File: ProcessService.java
 * Description: Serviço principal para gerenciamento de processos no projeto Metamorfose.
 * Implementa lógica de negócio para criação, atualização e monitoramento de processos.
 * 
 * Responsabilidades:
 * - Gerenciar ciclo de vida dos processos
 * - Implementar lógica de negócio de transformação
 * - Controlar progresso e status dos processos
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.service;
 import br.com.metamorfose.backend.model.dto.CreateProcessDTO;
 import br.com.metamorfose.backend.model.dto.ProcessDTO;
 import br.com.metamorfose.backend.model.entity.Process;
 import br.com.metamorfose.backend.model.entity.ProcessLog;
 import br.com.metamorfose.backend.model.entity.User;
 import br.com.metamorfose.backend.repository.ProcessLogRepository;
 import br.com.metamorfose.backend.repository.ProcessRepository;
 import br.com.metamorfose.backend.repository.UserRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;
 import org.springframework.transaction.annotation.Transactional;
 import java.util.List;
 import java.util.stream.Collectors;
 @Service
 @Transactional
 public class ProcessService {
    
    @Autowired
    private ProcessRepository processRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProcessLogRepository processLogRepository;
    
    /**
     * Busca todos os processos do usuário
     */
    public List<ProcessDTO> getProcessesByUser(String userEmail) {
        List<Process> processes = processRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
        return processes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Busca processo por ID
     */
    public ProcessDTO getProcessById(Long processId, String userEmail) {
        Process process = processRepository.findByIdAndUserEmail(processId, userEmail)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
        
        return convertToDTO(process);
    }
    
    /**
     * Cria novo processo
     */
    public ProcessDTO createProcess(CreateProcessDTO createProcessDTO, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        // Valida tipo de processo
        validateProcessType(createProcessDTO.getType());
        
        Process process = new Process(
            createProcessDTO.getName(),
            createProcessDTO.getType(),
            createProcessDTO.getDescription(),
            user
        );
        
        Process savedProcess = processRepository.save(process);
        
        // Registra log de criação
        createProcessLog(savedProcess, "CREATED", "Processo criado com sucesso");
        
        return convertToDTO(savedProcess);
    }
    
    /**
     * Atualiza progresso do processo
     */
    public ProcessDTO updateProgress(Long processId, Integer progress, String userEmail) {
        Process process = processRepository.findByIdAndUserEmail(processId, userEmail)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
        
        // Valida progresso
        if (progress < 0 || progress > 100) {
            throw new RuntimeException("Progresso deve estar entre 0 e 100");
        }
        
        Integer oldProgress = process.getProgress();
        process.setProgress(progress);
        
        // Atualiza status baseado no progresso
        if (progress == 0) {
            process.setStatus("CREATED");
        } else if (progress == 100) {
            process.setStatus("COMPLETED");
        } else {
            process.setStatus("IN_PROGRESS");
        }
        
        Process savedProcess = processRepository.save(process);
        
        // Registra log de atualização
        createProcessLog(savedProcess, "PROGRESS_UPDATED", 
            String.format("Progresso atualizado de %d%% para %d%%", oldProgress, progress));
        
        return convertToDTO(savedProcess);
    }
    
    /**
     * Inicia execução do processo
     */
    public ProcessDTO startProcess(Long processId, String userEmail) {
        Process process = processRepository.findByIdAndUserEmail(processId, userEmail)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
        
        if (!"CREATED".equals(process.getStatus())) {
            throw new RuntimeException("Processo deve estar no status CREATED para ser iniciado");
        }
        
        process.setStatus("IN_PROGRESS");
        process.setProgress(1); // Inicia com 1% de progresso
        
        Process savedProcess = processRepository.save(process);
        
        // Registra log de início
        createProcessLog(savedProcess, "STARTED", "Processo iniciado");
        
        // Aqui você pode implementar lógica assíncrona para processar
        // processProcessAsync(savedProcess);
        
        return convertToDTO(savedProcess);
    }
    
    /**
     * Para execução do processo
     */
    public ProcessDTO stopProcess(Long processId, String userEmail) {
        Process process = processRepository.findByIdAndUserEmail(processId, userEmail)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
        
        if (!"IN_PROGRESS".equals(process.getStatus())) {
            throw new RuntimeException("Apenas processos em andamento podem ser parados");
        }
        
        process.setStatus("STOPPED");
        
        Process savedProcess = processRepository.save(process);
        
        // Registra log de parada
        createProcessLog(savedProcess, "STOPPED", "Processo parado pelo usuário");
        
        return convertToDTO(savedProcess);
    }
    
    /**
     * Deleta processo
     */
    public void deleteProcess(Long processId, String userEmail) {
        Process process = processRepository.findByIdAndUserEmail(processId, userEmail)
                .orElseThrow(() -> new RuntimeException("Processo não encontrado"));
        
        if ("IN_PROGRESS".equals(process.getStatus())) {
            throw new RuntimeException("Não é possível deletar processo em andamento");
        }
        
        processRepository.delete(process);
    }
    
    /**
     * Busca processos por tipo
     */
    public List<ProcessDTO> getProcessesByType(String userEmail, String type) {
        List<Process> processes = processRepository.findByUserEmailAndType(userEmail, type);
        return processes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Busca processos ativos
     */
    public List<ProcessDTO> getActiveProcesses(String userEmail) {
        List<Process> processes = processRepository.findActiveProcessesByUserEmail(userEmail);
        return processes.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    /**
     * Obtém estatísticas dos processos
     */
    public ProcessStats getProcessStats(String userEmail) {
        Long totalProcesses = processRepository.countByUserEmailAndStatus(userEmail, null);
        Long completedProcesses = processRepository.countByUserEmailAndStatus(userEmail, "COMPLETED");
        Long inProgressProcesses = processRepository.countByUserEmailAndStatus(userEmail, "IN_PROGRESS");
        Long failedProcesses = processRepository.countByUserEmailAndStatus(userEmail, "FAILED");
        
        return new ProcessStats(totalProcesses, completedProcesses, inProgressProcesses, failedProcesses);
    }
    
    /**
     * Valida tipo de processo
     */
    private void validateProcessType(String type) {
        List<String> validTypes = List.of(
            "TRANSFORMATION", "ANALYSIS", "MIGRATION", 
            "INTEGRATION", "VALIDATION", "EXPORT"
        );
        
        if (!validTypes.contains(type)) {
            throw new RuntimeException("Tipo de processo inválido: " + type);
        }
    }
    
    /**
     * Cria log do processo
     */
    private void createProcessLog(Process process, String action, String message) {
        ProcessLog log = new ProcessLog(process, action, message);
        processLogRepository.save(log);
    }
    
    /**
     * Converte Process para ProcessDTO
     */
    private ProcessDTO convertToDTO(Process process) {
        return new ProcessDTO(
            process.getId(),
            process.getName(),
            process.getType(),
            process.getStatus(),
            process.getDescription(),
            process.getProgress(),
            process.getCreatedAt(),
            process.getUpdatedAt()
        );
    }
    
    // Classe auxiliar para estatísticas
    public static class ProcessStats {
        private Long totalProcesses;
        private Long completedProcesses;
        private Long inProgressProcesses;
        private Long failedProcesses;
        
        public ProcessStats(Long totalProcesses, Long completedProcesses, 
                           Long inProgressProcesses, Long failedProcesses) {
            this.totalProcesses = totalProcesses;
            this.completedProcesses = completedProcesses;
            this.inProgressProcesses = inProgressProcesses;
            this.failedProcesses = failedProcesses;
        }
        
        // Getters and setters
        public Long getTotalProcesses() { return totalProcesses; }
        public void setTotalProcesses(Long totalProcesses) { this.totalProcesses = totalProcesses; }
        
        public Long getCompletedProcesses() { return completedProcesses; }
        public void setCompletedProcesses(Long completedProcesses) { this.completedProcesses = completedProcesses; }
        
        public Long getInProgressProcesses() { return inProgressProcesses; }
        public void setInProgressProcesses(Long inProgressProcesses) { this.inProgressProcesses = inProgressProcesses; }
        
        public Long getFailedProcesses() { return failedProcesses; }
        public void setFailedProcesses(Long failedProcesses) { this.failedProcesses = failedProcesses; }
    }
 }