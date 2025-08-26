import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProcessService, ProcessData } from '../../../services/process.service';

@Component({
  selector: 'app-process-edit',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>
          <span class="icon material-symbols-rounded">edit</span>
          Editar Processo
        </h1>
        <div class="header-actions">
          <a routerLink="/processes" class="btn btn-secondary">
            <span class="icon material-symbols-rounded">arrow_back</span>
            Voltar para Lista
          </a>
        </div>
      </div>

      <div *ngIf="!processFound" class="error-state">
        <div class="error-card">
          <span class="icon material-symbols-rounded">error</span>
          <h3>Processo não encontrado</h3>
          <p>O processo solicitado não foi encontrado ou não existe.</p>
          <a routerLink="/processes" class="btn btn-primary">
            <span class="icon material-symbols-rounded">list</span>
            Voltar para Lista
          </a>
        </div>
      </div>

      <div *ngIf="processFound" class="form-container">
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
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
                <option value="CRITICAL">Crítica</option>
              </select>
            </div>

            <div class="form-group">
              <label for="estimatedDuration">Duração Estimada (minutos)</label>
              <input 
                type="number" 
                id="estimatedDuration"
                name="estimatedDuration"
                [(ngModel)]="processData.estimatedDuration"
                min="1"
                max="1440"
                placeholder="60"
                class="form-control">
              <small class="form-hint">Tempo estimado para execução em minutos</small>
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
                  Iniciar automaticamente após salvar
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
              Restaurar Original
            </button>
            
            <button 
              type="submit"
              [disabled]="loading || !processForm.form.valid"
              class="btn btn-primary">
              <span class="icon material-symbols-rounded">{{ loading ? 'hourglass_empty' : 'save' }}</span>
              {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
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
              <div><strong>ID:</strong> {{ processId }}</div>
              <div><strong>Prioridade:</strong> {{ getPriorityText(processData.priority) }}</div>
              <div *ngIf="processData.estimatedDuration"><strong>Duração Estimada:</strong> {{ processData.estimatedDuration }} min</div>
              <div *ngIf="processData.timeout"><strong>Timeout:</strong> {{ processData.timeout }} min</div>
              <div><strong>Início automático:</strong> {{ processData.autoStart ? 'Sim' : 'Não' }}</div>
              <div><strong>Status Atual:</strong> {{ getStatusText(originalData.status) }}</div>
              <div><strong>Progresso:</strong> {{ originalData.progress }}%</div>
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
      background: var(--bg-primary);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      color: var(--primary-color);
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-weight: 700;
    }

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .error-state {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .error-card {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      padding: 3rem;
      text-align: center;
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
      max-width: 400px;
    }

    .error-card .icon {
      font-size: 3rem;
      color: var(--error-color);
      margin-bottom: 1rem;
    }

    .error-card h3 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .error-card p {
      color: var(--text-secondary);
      margin-bottom: 2rem;
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
      border-bottom: 1px solid var(--border-primary);
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
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

    .checkbox-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      cursor: pointer;
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
      border-top: 1px solid var(--border-primary);
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: var(--radius);
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      transition: all var(--transition-normal);
    }

    .btn-primary {
      background: var(--gradient-primary);
      color: white;
      border: 1px solid var(--primary-color);
    }

    .btn-secondary {
      background: var(--gradient-secondary);
      color: white;
      border: 1px solid var(--warning-color);
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn:disabled {
      background: var(--bg-muted);
      cursor: not-allowed;
      transform: none;
      opacity: 0.6;
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
      display: flex;
      align-items: center;
      gap: 0.5rem;
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
export class ProcessEditComponent implements OnInit {
  processId: string = '';
  processFound = false;
  loading = false;

  processData = {
    name: '',
    type: '',
    description: '',
    priority: 'MEDIUM',
    timeout: null as number | null,
    estimatedDuration: null as number | null,
    autoStart: false,
    sendNotifications: true,
    inputSource: '',
    outputTarget: '',
    parameters: ''
  };

  originalData: any = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private processService: ProcessService
  ) {}

  ngOnInit() {
    this.processId = this.route.snapshot.paramMap.get('id') || '';
    this.loadProcess();
  }

  loadProcess(): void {
    const process = this.processService.getProcessById(parseInt(this.processId));
    
    if (process) {
      this.processFound = true;
      this.originalData = { ...process };
      this.processData = {
        name: process.name,
        type: process.type,
        description: process.description,
        priority: process.priority,
        timeout: process.timeout,
        estimatedDuration: process.estimatedDuration,
        autoStart: process.autoStart,
        sendNotifications: process.sendNotifications,
        inputSource: process.inputSource,
        outputTarget: process.outputTarget,
        parameters: process.parameters
      };
    } else {
      this.processFound = false;
    }
  }

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    
    // Simulação de salvamento
    setTimeout(() => {
      const success = this.processService.updateProcess(parseInt(this.processId), this.processData);
      this.loading = false;
      
      if (success) {
        alert(`Processo "${this.processData.name}" foi atualizado com sucesso!`);
        this.router.navigate(['/processes']);
      } else {
        alert('Erro ao atualizar o processo. Tente novamente.');
      }
    }, 2000);
  }

  resetForm(): void {
    if (confirm('Tem certeza que deseja restaurar os valores originais? Todas as alterações serão perdidas.')) {
      this.loadProcess(); // Recarrega os dados originais
    }
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

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'RUNNING': 'Em Execução',
      'COMPLETED': 'Concluído',
      'STOPPED': 'Parado',
      'ERROR': 'Com Erro'
    };
    return statusMap[status] || status;
  }
} 