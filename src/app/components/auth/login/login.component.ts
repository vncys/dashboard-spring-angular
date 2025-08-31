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
            <div class="logo">
              <span class="icon material-symbols-rounded">shield_person</span>
            </div>
            <h2>Bem-vindo de volta!</h2>
            <p>Faça login para acessar o sistema Metamorfose</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm" class="login-form">
            <div class="form-group">
              <label for="email">
                <span class="icon material-symbols-rounded">email</span>
                Email
              </label>
              <input 
                type="email" 
                id="email"
                name="email"
                [(ngModel)]="loginData.email"
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
              <div class="password-input-wrapper">
                <input 
                  [type]="showPassword ? 'text' : 'password'"
                  id="password"
                  name="password"
                  [(ngModel)]="loginData.password"
                  required
                  minlength="6"
                  placeholder="Sua senha"
                  class="form-control">
                <button 
                  type="button"
                  class="password-toggle"
                  (click)="togglePassword()">
                  <span class="icon material-symbols-rounded">
                    {{ showPassword ? 'visibility_off' : 'visibility' }}
                  </span>
                </button>
              </div>
            </div>

            <div class="form-options">
              <label class="remember-me">
                <input type="checkbox" [(ngModel)]="rememberMe" name="rememberMe">
                <span class="checkmark"></span>
                Lembrar de mim
              </label>
              <a href="#" class="forgot-password" (click)="forgotPassword($event)">
                Esqueci minha senha
              </a>
            </div>

            <div class="form-actions">
              <button 
                type="submit"
                [disabled]="loading || !loginForm.form.valid"
                class="btn btn-primary"
                [class.loading]="loading">
                <span class="icon material-symbols-rounded">{{ loading ? 'hourglass_empty' : 'login' }}</span>
                {{ loading ? 'Entrando...' : 'Entrar no Sistema' }}
              </button>
            </div>
          </form>

          <div class="divider">
            <span>ou</span>
          </div>

          <div class="social-login">
            <button type="button" class="btn btn-secondary" (click)="loginWithGoogle()">
              <span class="icon material-symbols-rounded">account_circle</span>
              Entrar com Google
            </button>
          </div>

          <div class="register-link">
            <p>
              Não tem uma conta? 
              <a routerLink="/register" class="link-primary">
                <span class="icon material-symbols-rounded">person_add</span>
                Cadastre-se aqui
              </a>
            </p>
          </div>

          <div class="features">
            <h4>Sistema Metamorfose</h4>
            <ul>
              <li>
                <span class="icon material-symbols-rounded">security</span>
                Login seguro e criptografado
              </li>
              <li>
                <span class="icon material-symbols-rounded">speed</span>
                Acesso rápido ao dashboard
              </li>
              <li>
                <span class="icon material-symbols-rounded">cloud_sync</span>
                Sincronização em tempo real
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
    
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 4rem);
    }
    
    .login-card {
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
    
    .login-header {
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
    
    .login-header h2 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
      color: var(--text-primary);
      font-weight: 600;
    }
    
    .login-header p {
      color: var(--text-secondary);
      font-size: 1rem;
    }

    .login-form {
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

    .password-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
    }

    .password-toggle {
      position: absolute;
      right: 0.75rem;
      background: none;
      border: none;
      color: var(--text-secondary);
      cursor: pointer;
      padding: 0.25rem;
      border-radius: var(--radius);
      transition: all var(--transition-fast);
    }

    .password-toggle:hover {
      color: var(--primary-color);
      background: rgba(99, 102, 241, 0.1);
    }

    .password-toggle .icon {
      font-size: 1.1rem;
    }

    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--text-secondary);
      cursor: pointer;
      user-select: none;
    }

    .remember-me input[type="checkbox"] {
      display: none;
    }

    .checkmark {
      width: 18px;
      height: 18px;
      border: 2px solid var(--border-primary);
      border-radius: var(--radius);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-fast);
    }

    .remember-me input[type="checkbox"]:checked + .checkmark {
      background: var(--gradient-primary);
      border-color: var(--primary-color);
    }

    .remember-me input[type="checkbox"]:checked + .checkmark::after {
      content: '✓';
      color: white;
      font-size: 0.8rem;
      font-weight: bold;
    }

    .forgot-password {
      color: var(--primary-color);
      text-decoration: none;
      font-weight: 500;
      transition: all var(--transition-fast);
    }

    .forgot-password:hover {
      color: var(--accent-color);
      text-decoration: underline;
    }
    
    .form-actions {
      margin-bottom: 2rem;
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

    .btn-secondary {
      background: var(--bg-card);
      color: var(--text-primary);
      border: 1px solid var(--border-primary);
      margin-bottom: 1rem;
    }

    .btn-secondary:hover {
      background: var(--bg-hover);
      transform: translateY(-1px);
      box-shadow: var(--shadow);
    }

    .btn .icon {
      font-size: 1.25rem;
    }

    .divider {
      text-align: center;
      margin: 1.5rem 0;
      position: relative;
    }

    .divider::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--border-primary);
    }

    .divider span {
      background: var(--gradient-card);
      padding: 0 1rem;
      color: var(--text-secondary);
      font-size: 0.9rem;
    }

    .social-login {
      margin-bottom: 2rem;
    }
    
    .register-link {
      text-align: center;
      padding: 1.5rem 0;
      border-top: 1px solid var(--border-primary);
      color: var(--text-secondary);
    }

    .register-link p {
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

      .login-card {
        margin: 0;
        padding: 2rem 1.5rem;
      }

      .login-header h2 {
        font-size: 1.75rem;
      }

      .logo .icon {
        font-size: 2.5rem;
      }

      .form-options {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
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
  showPassword = false;
  rememberMe = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  forgotPassword(event: Event): void {
    event.preventDefault();
    alert('Funcionalidade de recuperação de senha será implementada em breve!');
  }

  loginWithGoogle(): void {
    alert('Login com Google será implementado em breve!');
  }

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
    }, 1500);
  }
} 