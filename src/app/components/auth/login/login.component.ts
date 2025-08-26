import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="login-container">
        <div class="login-card">
          <div class="login-header">
            <h2>Entrar no Sistema</h2>
            <p>Faça login para acessar o dashboard</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                [(ngModel)]="loginData.email"
                required
                email
                placeholder="seu@email.com">
            </div>

            <div class="form-group">
              <label for="password">Senha</label>
              <input 
                type="password"
                id="password"
                name="password"
                [(ngModel)]="loginData.password"
                required
                minlength="6"
                placeholder="Sua senha">
            </div>

            <div class="form-actions">
              <button 
                type="submit"
                [disabled]="loading || !loginForm.form.valid"
                class="btn btn-primary"
                [class.loading]="loading">
                <span *ngIf="!loading" class="icon material-symbols-rounded">login</span>
                <span *ngIf="loading" class="icon material-symbols-rounded rotating">hourglass_top</span>
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
            </div>
          </form>

          <div class="register-link">
            <p>
              Não tem uma conta? 
              <a routerLink="/register">Cadastre-se aqui</a>
            </p>
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
    
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    
    .login-card {
      max-width: 400px;
      width: 100%;
      background: var(--gradient-card);
      padding: 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      border: 1px solid var(--border-primary);
      backdrop-filter: blur(10px);
    }
    
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .login-header h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
    }
    
    .login-header p {
      color: var(--text-secondary);
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
    
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      font-size: 1rem;
      background: var(--gradient-card);
      color: var(--text-primary);
      backdrop-filter: blur(10px);
    }
    
    .form-group input:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.1);
    }
    
    .form-actions {
      margin-top: 2rem;
    }
    
    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: var(--radius);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
    }
    
    .btn-primary {
      background: var(--gradient-primary);
      color: white;
      border: 1px solid var(--primary-color);
      box-shadow: var(--shadow);
    }
    
    .btn-primary:hover:not(:disabled) {
      background: var(--gradient-primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .btn-primary:disabled {
      background: var(--gradient-secondary);
      cursor: not-allowed;
      opacity: 0.6;
    }

    .btn.loading {
      pointer-events: none;
    }

    .btn .icon {
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }

    .rotating {
      animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .register-link {
      text-align: center;
      margin-top: 2rem;
      color: var(--text-secondary);
    }
    
    .register-link a {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: color var(--transition-fast);
    }
    
    .register-link a:hover {
      color: var(--primary-color-dark);
      text-decoration: underline;
    }
    
    .register-link a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 480px) {
      .login-card {
        margin: 1rem;
        padding: 1.5rem;
      }
    }
  `]
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };
  
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit(): void {
    if (this.loading) return;
    
    this.loading = true;
    
    // Simulação de login
    setTimeout(() => {
      this.loading = false;
      
      // Usar o serviço de autenticação
      this.authService.login(this.loginData.email);
      
      // Redirecionar para dashboard
      this.router.navigate(['/dashboard']);
    }, 500);
  }
} 