import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { ProcessService } from '../../../services/process.service';
import { Process } from '../../../models/process.model';

@Component({
  selector: 'app-process-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSliderModule,
    FormsModule
  ],
  template: `
    <div class="process-detail-container">
      <div *ngIf="loading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Carregando processo...</p>
      </div>

      <div *ngIf="!loading && process" class="process-detail-content">
        <!-- Header com ações -->
        <mat-card class="process-header">
          <mat-card-header>
            <mat-card-title>{{ process.name }}</mat-card-title>
            <mat-card-subtitle>ID: {{ process.id }}</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-actions class="header-actions">
            <button 
              mat-raised-button 
              color="accent" 
              (click)="startProcess()"
              [disabled]="process.status !== 'CREATED'">
              <mat-icon>play_arrow</mat-icon>
              Iniciar
            </button>
            
            <button 
              mat-raised-button 
              color="warn" 
              (click)="stopProcess()"
              [disabled]="process.status !== 'RUNNING'">
              <mat-icon>stop</mat-icon>
              Parar
            </button>
            
            <button 
              mat-raised-button 
              color="primary" 
              (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              Voltar
            </button>
          </mat-card-actions>
        </mat-card>

        <!-- Informações do processo -->
        <div class="process-info-grid">
          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>Informações Básicas</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-item">
                <strong>Tipo:</strong>
                <span class="process-type">{{ process.type }}</span>
              </div>
              
              <div class="info-item">
                <strong>Status:</strong>
                <span class="status-chip status-{{ process.status.toLowerCase() }}">
                  {{ process.status }}
                </span>
              </div>
              
              <div class="info-item">
                <strong>Progresso:</strong>
                <div class="progress-container">
                  <mat-progress-bar 
                    [value]="process.progress" 
                    [color]="getProgressColor(process.progress)">
                  </mat-progress-bar>
                  <span class="progress-text">{{ process.progress }}%</span>
                </div>
              </div>
              
              <div class="info-item">
                <strong>Descrição:</strong>
                <p class="description">{{ process.description || 'Nenhuma descrição fornecida' }}</p>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="info-card">
            <mat-card-header>
              <mat-card-title>Timestamps</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="info-item">
                <strong>Criado em:</strong>
                <span>{{ formatDate(process.createdAt) }}</span>
              </div>
              
              <div class="info-item">
                <strong>Atualizado em:</strong>
                <span>{{ formatDate(process.updatedAt) }}</span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Controle de progresso -->
        <mat-card class="progress-control-card" *ngIf="process.status === 'RUNNING'">
          <mat-card-header>
            <mat-card-title>Controle de Progresso</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="progress-control">
              <label>Atualizar progresso: {{ progressSlider }}%</label>
              <mat-slider 
                [(ngModel)]="progressSlider"
                [min]="0"
                [max]="100"
                [step]="5"
                [discrete]="true">
                <input matSliderThumb>
              </mat-slider>
              
              <button 
                mat-raised-button 
                color="primary" 
                (click)="updateProgress()"
                [disabled]="updatingProgress">
                <mat-icon *ngIf="!updatingProgress">update</mat-icon>
                <mat-spinner *ngIf="updatingProgress" diameter="20"></mat-spinner>
                {{ updatingProgress ? 'Atualizando...' : 'Atualizar Progresso' }}
              </button>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Ações perigosas -->
        <mat-card class="danger-zone-card">
          <mat-card-header>
            <mat-card-title class="danger-title">Zona de Perigo</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Essas ações são irreversíveis. Use com cuidado.</p>
            <button 
              mat-raised-button 
              color="warn" 
              (click)="deleteProcess()">
              <mat-icon>delete_forever</mat-icon>
              Excluir Processo
            </button>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!loading && !process" class="not-found">
        <mat-icon>error</mat-icon>
        <h3>Processo não encontrado</h3>
        <p>O processo solicitado não foi encontrado ou foi removido.</p>
        <button mat-raised-button color="primary" (click)="goBack()">
          <mat-icon>arrow_back</mat-icon>
          Voltar à Lista
        </button>
      </div>
    </div>
  `,
  styles: [`
    .process-detail-container {
      padding: 16px;
    }
    
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
      color: var(--text-secondary);
    }
    
    .process-detail-content {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .process-header {
      margin-bottom: 24px;
    }
    
    .header-actions {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 16px;
    }
    
    .process-info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-bottom: 24px;
    }
    
    .info-card {
      height: fit-content;
    }
    
    .info-item {
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .info-item strong {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .process-type {
      background-color: var(--primary-color);
      color: white;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.9rem;
      font-weight: 500;
      display: inline-block;
      width: fit-content;
    }
    
    .status-chip {
      padding: 6px 12px;
      border-radius: 16px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      display: inline-block;
      width: fit-content;
    }
    
    .status-created { background-color: #e3f2fd; color: #1976d2; }
    .status-running { background-color: #e8f5e8; color: #388e3c; }
    .status-completed { background-color: #e8f5e8; color: #388e3c; }
    .status-stopped { background-color: #fff3e0; color: #f57c00; }
    .status-error { background-color: #ffebee; color: #d32f2f; }
    
    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .progress-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
      min-width: 50px;
    }
    
    .description {
      color: var(--text-secondary);
      line-height: 1.5;
      margin: 0;
    }
    
    .progress-control-card {
      margin-bottom: 24px;
    }
    
    .progress-control {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .progress-control label {
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .progress-control button {
      align-self: flex-start;
    }
    
    .danger-zone-card {
      border: 2px solid var(--warn-color);
      background-color: #fff5f5;
    }
    
    .danger-title {
      color: var(--warn-color);
    }
    
    .danger-zone-card p {
      color: var(--text-secondary);
      margin-bottom: 16px;
    }
    
    .not-found {
      text-align: center;
      padding: 40px;
      color: var(--text-secondary);
    }
    
    .not-found mat-icon {
      font-size: 4rem;
      width: 4rem;
      height: 4rem;
      margin-bottom: 16px;
      color: var(--warn-color);
    }
    
    .not-found h3 {
      margin-bottom: 8px;
      color: var(--text-primary);
    }
    
    .not-found p {
      margin-bottom: 24px;
    }
    
    @media (max-width: 768px) {
      .process-detail-container {
        padding: 8px;
      }
      
      .header-actions {
        flex-direction: column;
      }
      
      .process-info-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProcessDetailComponent implements OnInit {
  process: Process | null = null;
  loading = false;
  updatingProgress = false;
  progressSlider = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private processService: ProcessService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProcess();
  }

  loadProcess(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.loading = true;
    this.processService.getProcessById(+id).subscribe({
      next: (process) => {
        this.process = process;
        this.progressSlider = process.progress;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar processo:', error);
        this.loading = false;
        this.snackBar.open('Erro ao carregar processo', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  startProcess(): void {
    if (!this.process) return;

    this.processService.startProcess(this.process.id).subscribe({
      next: (updatedProcess) => {
        this.process = updatedProcess;
        this.snackBar.open('Processo iniciado com sucesso!', 'Fechar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Erro ao iniciar processo', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  stopProcess(): void {
    if (!this.process) return;

    this.processService.stopProcess(this.process.id).subscribe({
      next: (updatedProcess) => {
        this.process = updatedProcess;
        this.snackBar.open('Processo parado com sucesso!', 'Fechar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Erro ao parar processo', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  updateProgress(): void {
    if (!this.process) return;

    this.updatingProgress = true;
    this.processService.updateProgress(this.process.id, this.progressSlider).subscribe({
      next: (updatedProcess) => {
        this.process = updatedProcess;
        this.updatingProgress = false;
        this.snackBar.open('Progresso atualizado com sucesso!', 'Fechar', {
          duration: 3000
        });
      },
      error: (error) => {
        this.updatingProgress = false;
        this.snackBar.open('Erro ao atualizar progresso', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  deleteProcess(): void {
    if (!this.process) return;

    if (confirm(`Tem certeza que deseja excluir o processo "${this.process.name}"? Esta ação não pode ser desfeita.`)) {
      this.processService.deleteProcess(this.process.id).subscribe({
        next: () => {
          this.snackBar.open('Processo excluído com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/dashboard/processes']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao excluir processo', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/processes']);
  }

  getProgressColor(progress: number): string {
    if (progress < 30) return 'warn';
    if (progress < 70) return 'accent';
    return 'primary';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
} 