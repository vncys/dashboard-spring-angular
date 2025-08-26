import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProcessService, ProcessData } from '../../../services/process.service';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gerenciamento de Processos</h1>
        <a routerLink="/processes/new" class="btn btn-primary">
          ➕ Novo Processo
        </a>
      </div>

      <div class="filters">
        <select [(ngModel)]="selectedStatus" (change)="filterProcesses()" class="filter-select">
          <option value="">Todos os Status</option>
          <option value="RUNNING">Em Execução</option>
          <option value="COMPLETED">Concluído</option>
          <option value="STOPPED">Parado</option>
          <option value="ERROR">Com Erro</option>
        </select>

        <select [(ngModel)]="selectedType" (change)="filterProcesses()" class="filter-select">
          <option value="">Todos os Tipos</option>
          <option value="ETL">ETL</option>
          <option value="ANALYSIS">Análise</option>
          <option value="TRANSFORM">Transformação</option>
          <option value="REPORT">Relatório</option>
        </select>

        <div class="search-wrapper">
          <span class="search-icon material-symbols-rounded">search</span>
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            (input)="filterProcesses()"
            placeholder="Buscar processos..."
            class="search-input">
        </div>
      </div>

      <div class="process-grid">
        <div *ngFor="let process of filteredProcesses" class="process-card">
          <div class="process-header">
            <h3>{{ process.name }}</h3>
            <span class="status-badge" [class]="'status-' + process.status.toLowerCase()">
              {{ getStatusText(process.status) }}
            </span>
          </div>

          <div class="process-info">
            <div class="info-item">
              <strong>Tipo:</strong> {{ getTypeText(process.type) }}
            </div>
            <div class="info-item">
              <strong>Criado:</strong> {{ formatDate(process.createdAt) }}
            </div>
            <div class="info-item" *ngIf="process.status === 'RUNNING' || process.status === 'STOPPED'">
              <strong>Timer:</strong>
              <div class="timer-info">
                <span class="icon material-symbols-rounded">schedule</span>
                {{ getTimerDisplay(process) }}
              </div>
            </div>
            <div class="info-item">
              <strong>Progresso:</strong>
              <div class="progress-bar">
                <div class="progress-fill" [style.width.%]="process.progress"></div>
              </div>
              <span class="progress-text">{{ process.progress }}%</span>
            </div>
          </div>

          <div class="process-description">
            <p>{{ process.description }}</p>
          </div>

          <div class="process-actions">
            <button 
              *ngIf="process.status === 'STOPPED'" 
              (click)="startProcess(process.id)"
              class="btn btn-success btn-sm">
              <span class="icon material-symbols-rounded">play_arrow</span>
              Iniciar
            </button>
            
            <button 
              *ngIf="process.status === 'RUNNING'" 
              (click)="stopProcess(process.id)"
              class="btn btn-warning btn-sm">
              <span class="icon material-symbols-rounded">pause</span>
              Pausar
            </button>

            <button 
              (click)="editProcess(process.id)"
              class="btn btn-primary btn-sm">
              <span class="icon material-symbols-rounded">edit</span>
              Editar
            </button>

            <button 
              (click)="viewDetails(process.id)"
              class="btn btn-info btn-sm">
              <span class="icon material-symbols-rounded">visibility</span>
              Detalhes
            </button>

            <button 
              (click)="deleteProcess(process.id)"
              class="btn btn-danger btn-sm">
              <span class="icon material-symbols-rounded">delete</span>
              Excluir
            </button>
          </div>
        </div>
      </div>

      <div *ngIf="filteredProcesses.length === 0" class="empty-state">
        <h3>
          <span class="icon material-symbols-rounded">search_off</span>
          Nenhum processo encontrado
        </h3>
        <p>Tente ajustar os filtros ou criar um novo processo.</p>
        <a routerLink="/processes/new" class="btn btn-primary">Criar Primeiro Processo</a>
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

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-select,
    .search-input {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    .search-wrapper {
      position: relative;
      flex: 1;
      min-width: 300px;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-secondary);
      font-size: 1.25rem;
      pointer-events: none;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      padding-left: 3rem;
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      color: var(--text-primary);
      backdrop-filter: blur(10px);
    }

    .search-input::placeholder {
      color: var(--text-secondary);
    }

    .search-input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .process-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 1.5rem;
    }

    .process-card {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      border-left: 4px solid var(--primary-color);
      transition: all var(--transition-normal);
      backdrop-filter: blur(10px);
    }

    .process-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--border-secondary);
    }

    .process-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .process-header h3 {
      margin: 0;
      color: var(--text-primary);
      font-size: 1.2rem;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-running {
      background: rgba(33, 150, 243, 0.2);
      color: #64b5f6;
      border: 1px solid rgba(33, 150, 243, 0.3);
    }

    .status-completed {
      background: rgba(76, 175, 80, 0.2);
      color: #81c784;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .status-stopped {
      background: rgba(255, 152, 0, 0.2);
      color: #ffb74d;
      border: 1px solid rgba(255, 152, 0, 0.3);
    }

    .status-error {
      background: rgba(244, 67, 54, 0.2);
      color: #e57373;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .process-info {
      margin-bottom: 1rem;
    }

    .info-item {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
      gap: 0.5rem;
      color: var(--text-secondary);
    }

    .info-item strong {
      color: var(--text-primary);
    }

    .timer-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--info-color);
      font-weight: 500;
    }

    .timer-info .icon {
      font-size: 1rem;
      color: var(--info-color);
    }

    .progress-bar {
      flex: 1;
      height: 8px;
      background: var(--bg-secondary);
      border-radius: var(--radius);
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: var(--gradient-primary);
      transition: width var(--transition-normal);
    }

    .progress-text {
      font-size: 0.8rem;
      color: var(--text-secondary);
      min-width: 35px;
      font-weight: 500;
    }

    .process-description {
      margin-bottom: 1rem;
    }

    .process-description p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.4;
      margin: 0;
    }

    .process-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .btn {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8rem;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: var(--gradient-primary);
      color: white;
      border: 1px solid var(--primary-color);
    }

    .btn-success {
      background: var(--gradient-accent);
      color: white;
      border: 1px solid var(--accent-color);
    }

    .btn-warning {
      background: var(--gradient-secondary);
      color: white;
      border: 1px solid var(--warning-color);
    }

    .btn-info {
      background: linear-gradient(135deg, var(--info-color), #2563eb);
      color: white;
      border: 1px solid var(--info-color);
    }

    .btn-danger {
      background: linear-gradient(135deg, var(--error-color), #dc2626);
      color: white;
      border: 1px solid var(--error-color);
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary);
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
    }

    .empty-state h3 {
      margin-bottom: 1rem;
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

      .filters {
        flex-direction: column;
      }

      .search-input {
        min-width: auto;
      }

      .process-grid {
        grid-template-columns: 1fr;
      }

      .process-actions {
        justify-content: center;
      }
    }
  `]
})
export class ProcessListComponent implements OnInit {
  
  constructor(
    private router: Router,
    private processService: ProcessService
  ) {}

  ngOnInit() {
    this.loadProcesses();
  }

  processes: ProcessData[] = [];
  filteredProcesses: ProcessData[] = [];

  loadProcesses(): void {
    this.processes = this.processService.getAllProcesses();
    this.filteredProcesses = [...this.processes];
  }
  selectedStatus = '';
  selectedType = '';
  searchTerm = '';

  filterProcesses(): void {
    this.filteredProcesses = this.processes.filter(process => {
      const matchesStatus = !this.selectedStatus || process.status === this.selectedStatus;
      const matchesType = !this.selectedType || process.type === this.selectedType;
      const matchesSearch = !this.searchTerm || 
        process.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        process.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesStatus && matchesType && matchesSearch;
    });
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

  getTypeText(type: string): string {
    const typeMap: { [key: string]: string } = {
      'ETL': 'ETL',
      'ANALYSIS': 'Análise',
      'TRANSFORM': 'Transformação',
      'REPORT': 'Relatório'
    };
    return typeMap[type] || type;
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  startProcess(id: number): void {
    const process = this.processes.find(p => p.id === id);
    if (process && this.processService.updateProcessStatus(id, 'RUNNING')) {
      alert(`Processo "${process.name}" foi iniciado!`);
      this.loadProcesses();
      this.filterProcesses();
    }
  }

  stopProcess(id: number): void {
    const process = this.processes.find(p => p.id === id);
    if (process && this.processService.updateProcessStatus(id, 'STOPPED')) {
      alert(`Processo "${process.name}" foi pausado!`);
      this.loadProcesses();
      this.filterProcesses();
    }
  }

  viewDetails(id: number): void {
    const process = this.processes.find(p => p.id === id);
    if (process) {
      alert(`Detalhes do processo "${process.name}":\n\nTipo: ${this.getTypeText(process.type)}\nStatus: ${this.getStatusText(process.status)}\nProgresso: ${process.progress}%\nDescrição: ${process.description}`);
    }
  }

  editProcess(id: number): void {
    this.router.navigate(['/processes/edit', id]);
  }

  deleteProcess(id: number): void {
    if (confirm('Tem certeza que deseja excluir este processo?')) {
      const process = this.processes.find(p => p.id === id);
      if (process && this.processService.deleteProcess(id)) {
        alert(`Processo "${process.name}" foi excluído!`);
        this.loadProcesses();
        this.filterProcesses();
      }
    }
  }

  getTimerDisplay(process: any): string {
    if (!process.startTime || !process.estimatedDuration) {
      return 'N/A';
    }

    const now = new Date();
    const elapsedMs = now.getTime() - process.startTime.getTime();
    const elapsedMinutes = Math.floor(elapsedMs / 60000);
    const totalMinutes = process.estimatedDuration;

    if (process.status === 'COMPLETED' && process.endTime) {
      const totalElapsed = Math.floor((process.endTime.getTime() - process.startTime.getTime()) / 60000);
      return `${totalElapsed}/${totalMinutes} min (Concluído)`;
    }

    if (process.status === 'RUNNING') {
      const remainingMinutes = Math.max(0, totalMinutes - elapsedMinutes);
      return `${elapsedMinutes}/${totalMinutes} min (${remainingMinutes} min restantes)`;
    }

    if (process.status === 'STOPPED') {
      return `${elapsedMinutes}/${totalMinutes} min (Pausado)`;
    }

    return `${elapsedMinutes}/${totalMinutes} min`;
  }
} 