import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="container">
      <div class="register-container">
        <div class="register-card">
          <div class="register-header">
            <div class="logo">
              <span class="icon material-symbols-rounded">person_add</span>
            </div>
            <h2>Criar Conta</h2>
            <p>Registre-se para acessar o sistema Metamorfose</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="register-form">
            <div class="form-group">
              <label for="name">
                <span class="icon material-symbols-rounded">person</span>
                Nome Completo
              </label>
              <input 
                type="text" 
                id="name"
                name="name"
                [(ngModel)]="registerData.name"
                required
                minlength="3"
                placeholder="Seu nome completo"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="email">
                <span class="icon material-symbols-rounded">email</span>
                Email
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                [(ngModel)]="registerData.email"
                required
                email
                placeholder="seu@email.com"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="password">
                <span class="icon material-symbols-rounded">lock</span>
                Senha
              </label>
              <input 
                type="password"
                id="password"
                name="password"
                [(ngModel)]="registerData.password"
                required
                minlength="6"
                placeholder="Sua senha"
                class="form-control">
            </div>

            <div class="form-group">
              <label for="confirmPassword">
                <span class="icon material-symbols-rounded">lock_reset</span>
                Confirmar Senha
              </label>
              <input 
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                [(ngModel)]="confirmPassword"
                required
                placeholder="Confirme sua senha"
                class="form-control"
                [class.error]="passwordsMismatch">
              <small *ngIf="passwordsMismatch" class="error-message">
                As senhas não coincidem
              </small>
            </div>

            <div class="form-actions">
              <button 
                type="submit"
                [disabled]="loading || !registerForm.form.valid || passwordsMismatch"
                class="btn btn-primary">
                <span class="icon material-symbols-rounded">{{ loading ? 'hourglass_empty' : 'person_add' }}</span>
                {{ loading ? 'Criando conta...' : 'Criar Conta' }}
              </button>
            </div>
          </form>

          <div class="login-link">
            <p>
              Já tem uma conta? 
              <a routerLink="/login" class="link-primary">
                <span class="icon material-symbols-rounded">login</span>
                Faça login aqui
              </a>
            </p>
          </div>

          <div class="features">
            <h4>Por que se registrar?</h4>
            <ul>
              <li>
                <span class="icon material-symbols-rounded">analytics</span>
                Acesso completo ao dashboard
              </li>
              <li>
                <span class="icon material-symbols-rounded">timeline</span>
                Gestão avançada de processos
              </li>
              <li>
                <span class="icon material-symbols-rounded">insights</span>
                Relatórios e estatísticas detalhadas
              </li>
            </ul>
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
      min-height: 100vh;
      background: var(--bg-primary);
    }
    
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 4rem);
    }
    
    .register-card {
      max-width: 480px;
      width: 100%;
      background: var(--gradient-card);
      padding: 2.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      border: 2px solid var(--primary-color);
      backdrop-filter: blur(10px);
      color: var(--text-primary);
    }
    
    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo {
      margin-bottom: 1rem;
    }

    .logo .icon {
      font-size: 3rem;
      color: var(--primary-color);
      background: var(--gradient-primary);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .register-header h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 600;
    }
    
    .register-header p {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .register-form {
      margin-bottom: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .form-group label .icon {
      font-size: 1.2rem;
      color: var(--primary-color);
    }
    
    .form-control {
      width: 100%;
      padding: 0.875rem 1rem;
      background: var(--bg-card);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      color: var(--text-primary);
      font-size: 1rem;
      transition: all var(--transition-fast);
      backdrop-filter: blur(10px);
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

    .form-control.error {
      border-color: var(--error-color);
      box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2);
    }

    .error-message {
      display: block;
      margin-top: 0.25rem;
      color: var(--error-color);
      font-size: 0.8rem;
      font-weight: 500;
    }
    
    .form-actions {
      margin-top: 2rem;
    }
    
    .btn {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: var(--radius);
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition-normal);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }
    
    .btn-primary {
      background: var(--gradient-primary);
      color: white;
      border: 1px solid var(--primary-color);
    }
    
    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-lg);
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
    }
    
    .btn-primary:disabled {
      background: var(--bg-muted);
      color: var(--text-muted);
      cursor: not-allowed;
      transform: none;
      border-color: var(--border-primary);
    }

    .btn .icon {
      font-size: 1.25rem;
    }
    
    .login-link {
      text-align: center;
      padding: 1.5rem 0;
      border-top: 1px solid var(--border-primary);
      color: var(--text-secondary);
    }

    .login-link p {
      margin: 0;
      font-size: 0.9rem;
    }
    
    .link-primary {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: all var(--transition-fast);
    }
    
    .link-primary:hover {
      color: var(--accent-color);
      text-decoration: underline;
    }

    .link-primary .icon {
      font-size: 1rem;
    }

    .features {
      margin-top: 2rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border-primary);
    }

    .features h4 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-size: 1rem;
      font-weight: 600;
    }

    .features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .features li {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .features li .icon {
      color: var(--success-color);
      font-size: 1.1rem;
    }
    
    @media (max-width: 480px) {
      .container {
        padding: 1rem;
      }

      .register-card {
        margin: 0;
        padding: 2rem 1.5rem;
      }

      .register-header h2 {
        font-size: 1.75rem;
      }

      .logo .icon {
        font-size: 2.5rem;
      }
    }
  `]
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: ''
  };
  
  confirmPassword = '';
  loading = false;

  get passwordsMismatch(): boolean {
    return this.registerData.password !== this.confirmPassword && this.confirmPassword !== '';
  }

  onSubmit(): void {
    if (this.loading || this.passwordsMismatch) return;
    
    this.loading = true;
    
    // Simulação de registro
    setTimeout(() => {
      this.loading = false;
      alert('Conta criada com sucesso! Você pode fazer login agora.');
      // Aqui você redirecionaria para o login ou dashboard
    }, 2000);
  }
} 