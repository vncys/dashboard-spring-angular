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
            <h2>Criar Conta</h2>
            <p>Registre-se para acessar o sistema</p>
          </div>
          
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <div class="form-group">
              <label for="name">Nome Completo</label>
              <input 
                type="text" 
                id="name"
                name="name"
                [(ngModel)]="registerData.name"
                required
                minlength="3"
                placeholder="Seu nome completo">
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input 
                type="email" 
                id="email"
                name="email"
                [(ngModel)]="registerData.email"
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
                [(ngModel)]="registerData.password"
                required
                minlength="6"
                placeholder="Sua senha">
            </div>

            <div class="form-group">
              <label for="confirmPassword">Confirmar Senha</label>
              <input 
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                [(ngModel)]="confirmPassword"
                required
                placeholder="Confirme sua senha">
            </div>

            <div class="form-actions">
              <button 
                type="submit"
                [disabled]="loading || !registerForm.form.valid || passwordsMismatch"
                class="btn btn-primary">
                {{ loading ? 'Criando conta...' : 'Criar Conta' }}
              </button>
            </div>
          </form>

          <div class="login-link">
            <p>
              Já tem uma conta? 
              <a routerLink="/login">Faça login aqui</a>
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
    
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
    }
    
    .register-card {
      max-width: 400px;
      width: 100%;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .register-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .register-header h2 {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      color: #3f51b5;
    }
    
    .register-header p {
      color: #666;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }
    
    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }
    
    .form-group input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }
    
    .form-group input:focus {
      outline: none;
      border-color: #3f51b5;
      box-shadow: 0 0 0 2px rgba(63, 81, 181, 0.2);
    }
    
    .form-actions {
      margin-top: 2rem;
    }
    
    .btn {
      width: 100%;
      padding: 0.75rem;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .btn-primary {
      background: #3f51b5;
      color: white;
    }
    
    .btn-primary:hover:not(:disabled) {
      background: #303f9f;
    }
    
    .btn-primary:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .login-link {
      text-align: center;
      margin-top: 2rem;
      color: #666;
    }
    
    .login-link a {
      color: #3f51b5;
      text-decoration: none;
      font-weight: 500;
    }
    
    .login-link a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 480px) {
      .register-card {
        margin: 1rem;
        padding: 1.5rem;
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
      alert('Conta criada com sucesso!');
    }, 1000);
  }
} 