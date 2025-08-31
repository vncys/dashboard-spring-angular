import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProcessService } from '../../../services/process.service';

@Component({
  selector: 'app-process-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Criar Novo Processo</h1>
        <a routerLink="/processes" class="btn btn-secondary">
          ← Voltar para Lista
        </a>
      </div>

      <div class="form-container">
        <form (ngSubmit)="onSubmit()" #processForm="ngForm" class="process-form">
                      <div class="form-section">
            <h3>
              <span class="icon material-symbols-rounded">description</span>
              Informações Básicas
            </h3>
            
            <div class="form-group">
              <label for="name">Nome do Processo *</label>
              <input 
                type="text" 
                id="name"
                name="name"
                [(ngModel)]="processData.name"
                required
                minlength="3"
                placeholder="Ex: Análise de Dados de Vendas"
                class="form-control">
              <small class="form-hint">Escolha um nome descritivo para o processo</small>
            </div>

            <div class="form-group">
              <label for="type">Tipo de Processo *</label>
              <select 
                id="type"
                name="type"
                [(ngModel)]="processData.type"
                required
                class="form-control">
                <option value="">Selecione o tipo</option>
                <option value="ETL">ETL (Extract, Transform, Load)</option>
                <option value="ANALYSIS">Análise de Dados</option>
                <option value="TRANSFORM">Transformação</option>
                <option value="REPORT">Geração de Relatório</option>
              </select>
              <small class="form-hint">Escolha o tipo que melhor descreve seu processo</small>
            </div>

            <div class="form-group">
              <label for="description">Descrição *</label>
              <textarea 
                id="description"
                name="description"
                [(ngModel)]="processData.description"
                required
                minlength="10"
                rows="4"
                placeholder="Descreva detalhadamente o que este processo fará..."
                class="form-control"></textarea>
              <small class="form-hint">Forneça uma descrição clara do objetivo do processo</small>
            </div>
          </div>

          <div class="form-section">
            <h3>
              <span class="icon material-symbols-rounded">settings</span>
              Configurações
            </h3>
            
            <div class="form-group">
              <label for="priority">Prioridade</label>
              <select 
                id="priority"
                name="priority"
                [(ngModel)]="processData.priority"
                class="form-control">
                <option value="LOW">Baixa</option>
                <option value="MEDIUM" selected>Média</option>
                <option value="HIGH">Alta</option>
                <option value="CRITICAL">Crítica</option>
              </select>
            </div>

            <div class="form-group">
              <label for="timeout">Timeout (minutos)</label>
              <input 
                type="number" 
                id="timeout"
                name="timeout"
                [(ngModel)]="processData.timeout"
                min="1"
                max="1440"
                placeholder="60"
                class="form-control">
              <small class="form-hint">Tempo limite para execução (deixe vazio para sem limite)</small>
            </div>

            <div class="form-group">
              <div class="checkbox-group">
                <input 
                  type="checkbox" 
                  id="autoStart"
                  name="autoStart"
                  [(ngModel)]="processData.autoStart"
                  class="form-checkbox">
                <label for="autoStart">
                  <span class="icon material-symbols-rounded">rocket_launch</span>
                  Iniciar automaticamente após criação
                </label>
              </div>
            </div>

            <div class="form-group">
              <div class="checkbox-group">
                <input 
                  type="checkbox" 
                  id="sendNotifications"
                  name="sendNotifications"
                  [(ngModel)]="processData.sendNotifications"
                  class="form-checkbox">
                <label for="sendNotifications">
                  <span class="icon material-symbols-rounded">email</span>
                  Enviar notificações por email
                </label>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>
              <span class="icon material-symbols-rounded">data_object</span>
              Parâmetros do Processo
            </h3>
            
            <div class="form-group">
              <label for="inputSource">Fonte de Dados</label>
              <input 
                type="text" 
                id="inputSource"
                name="inputSource"
                [(ngModel)]="processData.inputSource"
                placeholder="Ex: database://localhost:5432/vendas"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="outputTarget">Destino dos Dados</label>
              <input 
                type="text" 
                id="outputTarget"
                name="outputTarget"
                [(ngModel)]="processData.outputTarget"
                placeholder="Ex: s3://bucket/output/"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="parameters">Parâmetros Adicionais (JSON)</label>
              <textarea 
                id="parameters"
                name="parameters"
                [(ngModel)]="processData.parameters"
                rows="3"
                placeholder='{"batchSize": 1000, "retryCount": 3}'
                class="form-control"></textarea>
              <small class="form-hint">Parâmetros específicos do processo em formato JSON</small>
            </div>
          </div>

          <div class="form-actions">
            <button 
              type="button"
              (click)="resetForm()"
              class="btn btn-secondary">
              <span class="icon material-symbols-rounded">refresh</span>
              Limpar Formulário
            </button>
            
            <button 
              type="submit"
              [disabled]="loading || !processForm.form.valid"
              class="btn btn-primary">
              <span class="icon material-symbols-rounded">{{ loading ? 'hourglass_empty' : 'add_task' }}</span>
              {{ loading ? 'Criando...' : 'Criar Processo' }}
            </button>
          </div>
        </form>

        <div class="preview-section">
          <h3>
            <span class="icon material-symbols-rounded">preview</span>
            Pré-visualização
          </h3>
          <div class="preview-card">
            <div class="preview-header">
              <h4>{{ processData.name || 'Nome do Processo' }}</h4>
              <span class="preview-type">{{ getTypeText(processData.type) }}</span>
            </div>
            <p class="preview-description">
              {{ processData.description || 'Descrição do processo aparecerá aqui...' }}
            </p>
            <div class="preview-details">
              <div><strong>Prioridade:</strong> {{ getPriorityText(processData.priority) }}</div>
              <div *ngIf="processData.timeout"><strong>Timeout:</strong> {{ processData.timeout }} min</div>
              <div><strong>Início automático:</strong> {{ processData.autoStart ? 'Sim' : 'Não' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: #3f51b5;
      margin: 0;
    }

    .form-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }

    .process-form {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .form-section {
      margin-bottom: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid #eee;
    }

    .form-section:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }

    .form-section h3 {
      color: var(--primary-color);
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      background: var(--bg-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      color: var(--text-primary);
      font-size: 1rem;
      transition: all var(--transition-fast);
    }

    .form-control::placeholder {
      color: var(--text-muted);
    }

    .form-control:focus {
      outline: none;
      border-color: var(--border-focus);
      background: var(--surface-3);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }

    .form-hint {
      display: block;
      margin-top: 0.25rem;
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .form-checkbox {
      width: auto;
      margin: 0;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      padding-top: 2rem;
      border-top: 1px solid #eee;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3f51b5;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    .preview-section {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      height: fit-content;
      position: sticky;
      top: 2rem;
      backdrop-filter: blur(10px);
    }

    .preview-section h3 {
      color: var(--primary-color);
      margin-bottom: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .preview-card {
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      padding: 1rem;
      background: var(--bg-secondary);
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .preview-header h4 {
      margin: 0;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
    }

    .preview-type {
      background: var(--gradient-primary);
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
      font-size: 0.8rem;
      font-weight: 500;
    }

    .preview-description {
      color: var(--text-secondary);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }

    .preview-details {
      font-size: 0.85rem;
    }

    .preview-details div {
      margin-bottom: 0.25rem;
      color: var(--text-secondary);
    }

    .preview-details strong {
      color: var(--text-primary);
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }

      .form-container {
        grid-template-columns: 1fr;
      }

      .preview-section {
        position: static;
        order: -1;
      }

      .process-form {
        padding: 1.5rem;
      }

      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProcessFormComponent {
  processData = {
    name: '',
    type: '',
    description: '',
    priority: 'MEDIUM',
    timeout: null,
    autoStart: false,
    sendNotifications: true,
    inputSource: '',
    outputTarget: '',
    parameters: ''
  };

  loading = false;

  constructor(
    private processService: ProcessService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    
    try {
      // Criando o processo usando o ProcessService
      const newProcess = this.processService.createProcess({
        name: this.processData.name,
        type: this.processData.type,
        description: this.processData.description,
        priority: this.processData.priority,
        timeout: this.processData.timeout,
        autoStart: this.processData.autoStart,
        sendNotifications: this.processData.sendNotifications,
        inputSource: this.processData.inputSource,
        outputTarget: this.processData.outputTarget,
        parameters: this.processData.parameters,
        status: this.processData.autoStart ? 'RUNNING' : 'STOPPED',
        progress: 0,
        estimatedDuration: this.processData.timeout || 60
      });

      this.loading = false;
      alert(`Processo "${newProcess.name}" foi criado com sucesso!`);
      
      // Redirecionar para a lista de processos
      this.router.navigate(['/processes']);
      
    } catch (error) {
      this.loading = false;
      alert('Erro ao criar processo. Tente novamente.');
      console.error('Erro ao criar processo:', error);
    }
  }

  resetForm(): void {
    this.processData = {
      name: '',
      type: '',
      description: '',
      priority: 'MEDIUM',
      timeout: null,
      autoStart: false,
      sendNotifications: true,
      inputSource: '',
      outputTarget: '',
      parameters: ''
    };
  }

  getTypeText(type: string): string {
    const typeMap: { [key: string]: string } = {
      'ETL': 'ETL',
      'ANALYSIS': 'Análise',
      'TRANSFORM': 'Transformação',
      'REPORT': 'Relatório'
    };
    return typeMap[type] || 'Não definido';
  }

  getPriorityText(priority: string): string {
    const priorityMap: { [key: string]: string } = {
      'LOW': 'Baixa',
      'MEDIUM': 'Média',
      'HIGH': 'Alta',
      'CRITICAL': 'Crítica'
    };
    return priorityMap[priority] || priority;
  }
} 