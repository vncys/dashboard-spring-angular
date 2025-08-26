import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService, AuthState } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-layout">
      <header class="header">
        <div class="header-content">
          <div class="logo">
            <span class="icon material-symbols-rounded">auto_awesome</span>
            <h1 class="text-gradient">Dashboard Metamorfose</h1>
          </div>
          <nav class="nav">
            <a routerLink="/home" routerLinkActive="active" class="nav-link">
              <span class="icon material-symbols-rounded">home</span>
              Home
            </a>
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">
              <span class="icon material-symbols-rounded">dashboard</span>
              Dashboard
            </a>
            <a routerLink="/processes" routerLinkActive="active" class="nav-link">
              <span class="icon material-symbols-rounded">settings</span>
              Processos
            </a>
            <a routerLink="/statistics" routerLinkActive="active" class="nav-link">
              <span class="icon material-symbols-rounded">analytics</span>
              Estatísticas
            </a>
            <a *ngIf="!isLoggedIn" routerLink="/login" routerLinkActive="active" class="nav-link auth-link">
              <span class="icon material-symbols-rounded">login</span>
              Login
            </a>
            <button *ngIf="isLoggedIn" (click)="logout()" class="nav-link auth-link logout-btn">
              <span class="icon material-symbols-rounded">logout</span>
              Sair ({{ userEmail }})
            </button>
          </nav>
        </div>
      </header>

      <main class="main-content animate-fade-in">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-layout {
      min-height: 100vh;
      background: var(--bg-primary);
    }
    
    .header {
      background: var(--gradient-card);
      border-bottom: 1px solid var(--border-primary);
      backdrop-filter: blur(20px);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    
    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 0 var(--space-lg);
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 70px;
    }
    
    .logo {
      display: flex;
      align-items: center;
      gap: var(--space-md);
    }
    
    .logo .icon {
      font-size: 2rem;
      color: var(--primary-color);
      animation: pulse 2s infinite;
    }
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .nav {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    
    .nav-link {
      display: flex;
      align-items: center;
      gap: var(--space-xs);
      padding: var(--space-sm) var(--space-md);
      color: var(--text-secondary);
      text-decoration: none;
      border-radius: var(--radius);
      font-weight: 500;
      font-size: 0.875rem;
      transition: all var(--transition-fast);
      position: relative;
      overflow: hidden;
    }
    
    .nav-link::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--gradient-primary);
      opacity: 0;
      transition: opacity var(--transition-fast);
      border-radius: var(--radius);
    }
    
    .nav-link:hover {
      color: var(--text-primary);
      transform: translateY(-2px);
    }
    
    .nav-link:hover::before {
      opacity: 0.1;
    }
    
    .nav-link.active {
      color: var(--primary-color);
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.2);
    }
    
    .nav-link.active .icon {
      color: var(--primary-color);
    }
    
    .nav-link .icon {
      font-size: 1.2rem;
      transition: transform var(--transition-fast);
    }
    
    .nav-link:hover .icon {
      transform: scale(1.1);
    }
    
    .auth-link {
      background: var(--gradient-primary);
      color: white !important;
      margin-left: var(--space-md);
      box-shadow: var(--shadow);
    }
    
    .auth-link:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .auth-link::before {
      background: rgba(255, 255, 255, 0.1);
    }

    .logout-btn {
      background: var(--gradient-secondary);
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-size: inherit;
    }

    .logout-btn:hover {
      background: linear-gradient(135deg, #e65100, #ff6f00);
    }
    
    .main-content {
      min-height: calc(100vh - 70px);
      background: var(--bg-primary);
    }
    
    @media (max-width: 768px) {
      .header-content {
        padding: 0 var(--space-md);
        height: 60px;
      }
      
      .logo h1 {
        font-size: 1.2rem;
      }
      
      .nav {
        gap: var(--space-xs);
      }
      
      .nav-link {
        padding: var(--space-xs) var(--space-sm);
        font-size: 0.8rem;
      }
      
      .nav-link span {
        display: none;
      }
      
      .auth-link {
        margin-left: var(--space-sm);
      }
      
      .main-content {
        min-height: calc(100vh - 60px);
      }
    }
    
    @media (max-width: 480px) {
      .logo .icon {
        font-size: 1.5rem;
      }
      
      .logo h1 {
        font-size: 1rem;
      }
      
      .nav-link {
        padding: var(--space-xs);
      }
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'metamorfose-dashboard';
  isLoggedIn = false;
  userEmail = '';
  private authSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.authSubscription = this.authService.authState$.subscribe((authState: AuthState) => {
      this.isLoggedIn = authState.isLoggedIn;
      this.userEmail = authState.userEmail;
    });
  }

  ngOnInit() {
    // O estado inicial já é carregado no construtor via subscription
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
} 