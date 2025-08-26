/**
 * File: ProcessController.java
 * Description: Controller REST para gerenciamento de processos do projeto Metamorfose.
 * Expõe endpoints para CRUD e operações relacionadas aos processos de transformação.
 * 
* Responsabilidades:
 * - Expor endpoints REST para operações de processo
 * - Gerenciar ciclo de vida dos processos via API
 * - Controlar acesso e validações dos endpoints
 * 
 * Author: Ester Silva
 * Created on: 16-08-2025
 * 
 * Version: 1.0.0
 * Squad: Metamorfose
 */

 package br.com.metamorfose.backend.controller;
 import br.com.metamorfose.backend.model.dto.CreateProcessDTO;
 import br.com.metamorfose.backend.model.dto.ProcessDTO;
 import br.com.metamorfose.backend.service.ProcessService;
 import io.swagger.v3.oas.annotations.Operation;
 import io.swagger.v3.oas.annotations.Parameter;
 import io.swagger.v3.oas.annotations.responses.ApiResponse;
 import io.swagger.v3.oas.annotations.responses.ApiResponses;
 import io.swagger.v3.oas.annotations.security.SecurityRequirement;
 import io.swagger.v3.oas.annotations.tags.Tag;
 import jakarta.validation.Valid;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.http.HttpStatus;
 import org.springframework.http.ResponseEntity;
 import org.springframework.security.access.prepost.PreAuthorize;
 import org.springframework.security.core.Authentication;
 import org.springframework.web.bind.annotation.*;
 import java.util.List;
 @RestController
 @RequestMapping("/api/processes")
 @CrossOrigin(origins = "*")
 @Tag(name = "Processes", description = "Gerenciamento de processos de transformação")
 @SecurityRequirement(name = "bearerAuth")
 @PreAuthorize("hasRole('USER')")
 public class ProcessController {
    @Autowired
    private ProcessService processService;
    
    @Operation(
        summary = "Listar processos",
        description = "Retorna todos os processos do usuário autenticado"
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Lista de processos retornada com sucesso"),
        @ApiResponse(responseCode = "401", description = "Usuário não autenticado"),
        @ApiResponse(responseCode = "403", description = "Acesso negado")
    })
    @GetMapping
    public ResponseEntity<List<ProcessDTO>> getAllProcesses(Authentication auth) {
        List<ProcessDTO> processes = processService.getProcessesByUser(auth.getName());
        return ResponseEntity.ok(processes);
    }
    
    @Operation(
        summary = "Buscar processo por ID",
        description = "Retorna um processo específico pelo ID"
    )
    @GetMapping("/{id}")
    public ResponseEntity<ProcessDTO> getProcess(
            @Parameter(description = "ID do processo") @PathVariable Long id,
            Authentication auth) {
        try {
            ProcessDTO process = processService.getProcessById(id, auth.getName());
            return ResponseEntity.ok(process);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(
        summary = "Criar novo processo",
        description = "Cria um novo processo de transformação"
    )
    @PostMapping
    public ResponseEntity<ProcessDTO> createProcess(
            @Valid @RequestBody CreateProcessDTO request,
            Authentication auth) {
        try {
            ProcessDTO process = processService.createProcess(request, auth.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(process);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(
        summary = "Iniciar processo",
        description = "Inicia a execução de um processo"
    )
    @PutMapping("/{id}/start")
    public ResponseEntity<ProcessDTO> startProcess(
            @Parameter(description = "ID do processo") @PathVariable Long id,
            Authentication auth) {
        try {
            ProcessDTO process = processService.startProcess(id, auth.getName());
            return ResponseEntity.ok(process);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(
        summary = "Parar processo",
        description = "Para a execução de um processo em andamento"
    )
    @PutMapping("/{id}/stop")
    public ResponseEntity<ProcessDTO> stopProcess(
            @Parameter(description = "ID do processo") @PathVariable Long id,
            Authentication auth) {
        try {
            ProcessDTO process = processService.stopProcess(id, auth.getName());
            return ResponseEntity.ok(process);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(
        summary = "Atualizar progresso",
        description = "Atualiza o progresso de um processo"
    )
    @PutMapping("/{id}/progress")
    public ResponseEntity<ProcessDTO> updateProgress(
            @Parameter(description = "ID do processo") @PathVariable Long id,
            @RequestParam Integer progress,
            Authentication auth) {
        try {
            ProcessDTO process = processService.updateProgress(id, progress, auth.getName());
            return ResponseEntity.ok(process);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(
        summary = "Deletar processo",
        description = "Remove um processo do sistema"
    )
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProcess(
            @Parameter(description = "ID do processo") @PathVariable Long id,
            Authentication auth) {
        try {
            processService.deleteProcess(id, auth.getName());
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @Operation(
        summary = "Buscar processos por tipo",
        description = "Retorna processos filtrados por tipo"
    )
    @GetMapping("/type/{type}")
    public ResponseEntity<List<ProcessDTO>> getProcessesByType(
            @Parameter(description = "Tipo do processo") @PathVariable String type,
            Authentication auth) {
        List<ProcessDTO> processes = processService.getProcessesByType(auth.getName(), type);
        return ResponseEntity.ok(processes);
    }
    
    @Operation(
        summary = "Buscar processos ativos",
        description = "Retorna processos que estão em execução ou criados"
    )
    @GetMapping("/active")
    public ResponseEntity<List<ProcessDTO>> getActiveProcesses(Authentication auth) {
        List<ProcessDTO> processes = processService.getActiveProcesses(auth.getName());
        return ResponseEntity.ok(processes);
    }
    
    @Operation(
        summary = "Obter estatísticas",
        description = "Retorna estatísticas dos processos do usuário"
    )
@GetMapping("/stats")
 public ResponseEntity<ProcessService.ProcessStats> getProcessStats(Authentication auth) {
 ProcessService.ProcessStats stats = processService.getProcessStats(auth.getName());
 return ResponseEntity.ok(stats);
 }
 }