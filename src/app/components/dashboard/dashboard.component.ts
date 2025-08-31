import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="dashboard-header">
        <h1>Dashboard Metamorfose</h1>
        <p>Sistema de gerenciamento inteligente para o projeto Smart HAS</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">
            <span class="icon material-symbols-rounded">analytics</span>
          </div>
          <h3>Total de Processos</h3>
          <div class="stat-value">12</div>
          <p class="stat-description">Processos ativos no sistema</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <span class="icon material-symbols-rounded">play_circle</span>
          </div>
          <h3>Em Execução</h3>
          <div class="stat-value">4</div>
          <p class="stat-description">Processos sendo executados</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <span class="icon material-symbols-rounded">check_circle</span>
          </div>
          <h3>Concluídos</h3>
          <div class="stat-value">8</div>
          <p class="stat-description">Processos finalizados</p>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <span class="icon material-symbols-rounded">trending_up</span>
          </div>
          <h3>Taxa de Sucesso</h3>
          <div class="stat-value">95%</div>
          <p class="stat-description">Eficiência do sistema</p>
        </div>
      </div>

      <div class="actions-section">
        <h2>Ações Rápidas</h2>
        <div class="actions-grid">
          <a routerLink="/processes" class="action-card">
            <div class="action-icon">
              <span class="icon material-symbols-rounded">settings</span>
            </div>
            <h3>Gerenciar Processos</h3>
            <p>Visualize e gerencie todos os processos do sistema</p>
          </a>

          <a routerLink="/processes/new" class="action-card">
            <div class="action-icon">
              <span class="icon material-symbols-rounded">add_circle</span>
            </div>
            <h3>Novo Processo</h3>
            <p>Criar um novo processo de transformação</p>
          </a>

          <a routerLink="/statistics" class="action-card">
            <div class="action-icon">
              <span class="icon material-symbols-rounded">bar_chart</span>
            </div>
            <h3>Relatórios</h3>
            <p>Visualize estatísticas detalhadas</p>
          </a>

          <a routerLink="/settings" class="action-card">
            <div class="action-icon">
              <span class="icon material-symbols-rounded">tune</span>
            </div>
            <h3>Configurações</h3>
            <p>Ajuste as configurações do sistema</p>
          </a>
        </div>
      </div>

      <div class="recent-activity">
        <h2>Atividade Recente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <div class="activity-icon success">
              <span class="icon material-symbols-rounded">check_circle</span>
            </div>
            <div class="activity-content">
              <h4>Processo "Análise de Dados" concluído</h4>
              <p>Há 2 horas</p>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon running">
              <span class="icon material-symbols-rounded">sync</span>
            </div>
            <div class="activity-content">
              <h4>Processo "Transformação ETL" iniciado</h4>
              <p>Há 4 horas</p>
            </div>
          </div>

          <div class="activity-item">
            <div class="activity-icon info">
              <span class="icon material-symbols-rounded">insert_chart</span>
            </div>
            <div class="activity-content">
              <h4>Relatório mensal gerado</h4>
              <p>Há 1 dia</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      background: var(--bg-primary);
    }

    .dashboard-header {
      text-align: center;
      margin-bottom: 2rem;
      padding: var(--space-2xl) 0;
    }

    .dashboard-header h1 {
      color: var(--primary-color);
      margin-bottom: 0.5rem;
      font-size: 2.5rem;
      font-weight: 700;
    }

    .dashboard-header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: #212121;
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      text-align: center;
      border-left: 4px solid var(--primary-color);
      backdrop-filter: blur(10px);
      transition: all var(--transition-normal);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }

    .stat-icon {
      width: 3rem;
      height: 3rem;
      background: rgba(99, 102, 241, 0.1);
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-icon .icon {
      font-size: 1.5rem;
      color: var(--primary-color);
    }

    .stat-card h3 {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
      text-transform: uppercase;
      font-weight: 500;
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: bold;
      color: var(--text-primary);
      margin: 0;
    }

    .stat-description {
      color: var(--text-muted);
      font-size: 0.9rem;
      margin: 0;
    }

    .actions-section {
      margin-bottom: 2rem;
    }

    .actions-section h2 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .actions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .action-card {
      background: #212121;
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      text-decoration: none;
      color: inherit;
      transition: all var(--transition-normal);
      border-left: 4px solid var(--accent-color);
      backdrop-filter: blur(10px);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }

    .action-card:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
      border-color: var(--border-secondary);
    }

    .action-icon {
      width: 2.5rem;
      height: 2.5rem;
      background: rgba(76, 175, 80, 0.1);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-icon .icon {
      font-size: 1.2rem;
      color: var(--accent-color);
    }

    .action-card h3 {
      margin: 0;
      color: var(--text-primary);
      font-weight: 600;
    }

    .action-card p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .recent-activity h2 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .activity-list {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      padding: 1rem;
      backdrop-filter: blur(10px);
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-bottom: 1px solid var(--border-primary);
      transition: background var(--transition-fast);
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-item:hover {
      background: var(--bg-hover);
      border-radius: var(--radius);
    }

    .activity-icon {
      width: 2.5rem;
      height: 2.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius);
    }

    .activity-icon.success {
      background: rgba(76, 175, 80, 0.1);
    }

    .activity-icon.success .icon {
      color: var(--success-color);
    }

    .activity-icon.running {
      background: rgba(33, 150, 243, 0.1);
    }

    .activity-icon.running .icon {
      color: var(--info-color);
    }

    .activity-icon.info {
      background: rgba(255, 152, 0, 0.1);
    }

    .activity-icon.info .icon {
      color: var(--warning-color);
    }

    .activity-content h4 {
      margin: 0 0 0.25rem 0;
      color: var(--text-primary);
      font-weight: 600;
    }

    .activity-content p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }

      .dashboard-header h1 {
        font-size: 2rem;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .actions-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {}