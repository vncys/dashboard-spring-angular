import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Bem-vindo ao Dashboard Metamorfose</h1>
        <p>Sistema de gerenciamento inteligente para o projeto Smart HAS</p>
      </div>

      <div class="features-grid">
        <div class="feature-card card animate-fade-in">
          <div class="feature-icon">
            <span class="icon material-symbols-rounded">dashboard</span>
          </div>
          <h3>Dashboard Intuitivo</h3>
          <p>Interface moderna e responsiva para gerenciar todos os processos do sistema.</p>
          <a routerLink="/dashboard" class="btn btn-primary">
            <span class="icon material-symbols-rounded">arrow_forward</span>
            Acessar Dashboard
          </a>
        </div>

        <div class="feature-card card animate-fade-in" style="animation-delay: 0.1s">
          <div class="feature-icon">
            <span class="icon material-symbols-rounded">settings</span>
          </div>
          <h3>Gestão de Processos</h3>
          <p>Crie, monitore e gerencie processos de transformação em tempo real.</p>
          <a routerLink="/processes" class="btn btn-success">
            <span class="icon material-symbols-rounded">arrow_forward</span>
            Ver Processos
          </a>
        </div>

        <div class="feature-card card animate-fade-in" style="animation-delay: 0.2s">
          <div class="feature-icon">
            <span class="icon material-symbols-rounded">analytics</span>
          </div>
          <h3>Análises e Estatísticas</h3>
          <p>Acompanhe métricas e performance dos seus processos com gráficos detalhados.</p>
          <a routerLink="/statistics" class="btn btn-warning">
            <span class="icon material-symbols-rounded">arrow_forward</span>
            Ver Estatísticas
          </a>
        </div>
      </div>

      <div class="cta-section">
        <h2>Comece Agora</h2>
        <p>Faça login ou crie uma conta para começar a usar o sistema</p>
        <div class="cta-buttons">
          <a routerLink="/login" class="btn btn-primary">Entrar</a>
          <a routerLink="/register" class="btn btn-accent">Criar Conta</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: var(--space-2xl);
      background: var(--bg-primary);
    }
    
    .header {
      text-align: center;
      margin-bottom: var(--space-2xl);
      padding: var(--space-2xl) 0;
    }
    
    .header h1 {
      font-size: 4rem;
      margin-bottom: var(--space-lg);
      font-weight: 800;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
    }
    
    .header p {
      font-size: 1.25rem;
      color: var(--text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: var(--space-2xl);
      margin-bottom: var(--space-2xl);
    }
    
    .feature-card {
      padding: var(--space-2xl);
      text-align: center;
      position: relative;
      overflow: hidden;
      animation-fill-mode: both;
    }
    
    .feature-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--gradient-primary);
    }
    
    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto var(--space-lg);
      background: var(--gradient-primary);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    
    .feature-icon::after {
      content: '';
      position: absolute;
      width: 90px;
      height: 90px;
      border: 2px solid var(--primary-color);
      border-radius: 50%;
      opacity: 0.3;
      animation: pulse 2s infinite;
    }
    
    .feature-icon .icon {
      font-size: 2.5rem;
      color: white;
    }
    
    .feature-card h3 {
      color: var(--text-primary);
      margin-bottom: var(--space-lg);
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .feature-card p {
      color: var(--text-secondary);
      margin-bottom: var(--space-xl);
      line-height: 1.6;
      font-size: 1rem;
    }
    
    .cta-section {
      text-align: center;
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      color: var(--text-primary);
      padding: var(--space-2xl);
      border-radius: var(--radius-xl);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
    }
    
    .cta-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--gradient-primary);
      opacity: 0.1;
      z-index: -1;
    }
    
    .cta-section h2 {
      font-size: 2.5rem;
      margin-bottom: var(--space-lg);
      font-weight: 700;
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .cta-section p {
      font-size: 1.1rem;
      margin-bottom: var(--space-xl);
      color: var(--text-secondary);
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .cta-buttons {
      display: flex;
      gap: var(--space-lg);
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .btn {
      position: relative;
      z-index: 1;
    }
    
    .btn .icon {
      font-size: 1.2rem;
      transition: transform var(--transition-fast);
    }
    
    .btn:hover .icon {
      transform: translateX(4px);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: var(--space-lg);
      }
      
      .header h1 {
        font-size: 2.5rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
        gap: var(--space-lg);
      }
      
      .feature-card {
        padding: var(--space-lg);
      }
      
      .feature-icon {
        width: 60px;
        height: 60px;
      }
      
      .feature-icon .icon {
        font-size: 2rem;
      }
      
      .cta-section {
        padding: var(--space-xl);
      }
      
      .cta-section h2 {
        font-size: 2rem;
      }
      
      .cta-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
    
    @media (max-width: 480px) {
      .header h1 {
        font-size: 2rem;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
      }
      
      .feature-card {
        padding: var(--space-md);
      }
    }
  `]
})
export class HomeComponent {} 