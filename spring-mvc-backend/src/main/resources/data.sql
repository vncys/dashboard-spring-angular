-- Metamorfose Backend - Initial Data Script
-- Author: Ester Silva
-- Created on: 16-08-2025
-- Squad: Metamorfose

-- Inserir usuários de teste
INSERT INTO users (email, password, name, role, created_at, updated_at) VALUES
('admin@metamorfose.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdylxr3Gmb28W.t4OQhth89C6ae', 'Administrador', 'ADMIN', NOW(), NOW()),
('user@metamorfose.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdylxr3Gmb28W.t4OQhth89C6ae', 'Usuário Teste', 'USER', NOW(), NOW()),
('developer@metamorfose.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8imdylxr3Gmb28W.t4OQhth89C6ae', 'Desenvolvedor', 'USER', NOW(), NOW());

-- Inserir processos de exemplo
INSERT INTO processes (name, type, description, status, progress, user_id, created_at, updated_at) VALUES
('Migração de Dados Legados', 'MIGRATION', 'Processo de migração de sistema legado para nova plataforma', 'COMPLETED', 100, 1, NOW(), NOW()),
('Análise de Dados Financeiros', 'ANALYSIS', 'Análise completa dos dados financeiros do último trimestre', 'IN_PROGRESS', 65, 1, NOW(), NOW()),
('Transformação Digital HR', 'TRANSFORMATION', 'Digitalização dos processos de recursos humanos', 'CREATED', 0, 2, NOW(), NOW()),
('Validação de Integridade', 'VALIDATION', 'Validação da integridade dos dados migrados', 'COMPLETED', 100, 2, NOW(), NOW()),
('Exportação de Relatórios', 'EXPORT', 'Exportação automatizada de relatórios mensais', 'IN_PROGRESS', 30, 3, NOW(), NOW());

-- Inserir logs de processos
INSERT INTO process_logs (process_id, action, previous_value, new_value, message, timestamp) VALUES
(1, 'CREATED', null, 'CREATED', 'Processo de migração criado com sucesso', NOW()),
(1, 'STARTED', 'CREATED', 'IN_PROGRESS', 'Processo de migração iniciado', NOW()),
(1, 'PROGRESS_UPDATED', '0', '50', 'Progresso atualizado para 50%', NOW()),
(1, 'PROGRESS_UPDATED', '50', '100', 'Progresso atualizado para 100%', NOW()),
(1, 'STATUS_CHANGED', 'IN_PROGRESS', 'COMPLETED', 'Processo de migração finalizado com sucesso', NOW()),
(2, 'CREATED', null, 'CREATED', 'Processo de análise criado', NOW()),
(2, 'STARTED', 'CREATED', 'IN_PROGRESS', 'Análise de dados iniciada', NOW()),
(2, 'PROGRESS_UPDATED', '0', '65', 'Progresso da análise atualizado', NOW()),
(3, 'CREATED', null, 'CREATED', 'Processo de transformação digital criado', NOW()),
(4, 'CREATED', null, 'CREATED', 'Processo de validação criado', NOW()),
(4, 'STARTED', 'CREATED', 'IN_PROGRESS', 'Validação iniciada', NOW()),
(4, 'STATUS_CHANGED', 'IN_PROGRESS', 'COMPLETED', 'Validação concluída com sucesso', NOW()),
(5, 'CREATED', null, 'CREATED', 'Processo de exportação criado', NOW()),
(5, 'STARTED', 'CREATED', 'IN_PROGRESS', 'Exportação de relatórios iniciada', NOW());