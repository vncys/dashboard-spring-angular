import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>
        <span class="icon material-symbols-rounded">settings</span>
        Configurações do Sistema
      </h1>
        <div class="header-actions">
          <button (click)="saveSettings()" class="btn btn-primary" [disabled]="saving">
            <span class="icon material-symbols-rounded">{{ saving ? 'hourglass_top' : 'save' }}</span>
            {{ saving ? 'Salvando...' : 'Salvar Configurações' }}
          </button>
                      <button (click)="resetSettings()" class="btn btn-secondary">
              <span class="icon material-symbols-rounded">restart_alt</span>
              Restaurar Padrões
            </button>
        </div>
      </div>

      <div class="settings-grid">
        <!-- Configurações Gerais -->
        <div class="settings-section">
          <h3>🏠 Configurações Gerais</h3>
          
          <div class="setting-item">
            <label for="systemName">Nome do Sistema</label>
            <input 
              type="text" 
              id="systemName"
              [(ngModel)]="settings.systemName"
              class="form-control"
              placeholder="Dashboard Metamorfose">
          </div>

          <div class="setting-item">
            <label for="language">Idioma</label>
            <select id="language" [(ngModel)]="settings.language" class="form-control">
              <option value="pt-BR">🇧🇷 Português (Brasil)</option>
              <option value="en-US">🇺🇸 English (US)</option>
              <option value="es-ES">🇪🇸 Español</option>
            </select>
          </div>

          <div class="setting-item">
            <label for="timezone">Fuso Horário</label>
            <select id="timezone" [(ngModel)]="settings.timezone" class="form-control">
              <option value="America/Sao_Paulo">🇧🇷 São Paulo (UTC-3)</option>
              <option value="America/New_York">🇺🇸 New York (UTC-5)</option>
              <option value="Europe/London">🇬🇧 London (UTC+0)</option>
              <option value="Asia/Tokyo">🇯🇵 Tokyo (UTC+9)</option>
            </select>
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="darkMode"
                [(ngModel)]="settings.darkMode"
                class="form-checkbox">
              <label for="darkMode">🌙 Modo Escuro</label>
            </div>
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="autoSave"
                [(ngModel)]="settings.autoSave"
                class="form-checkbox">
              <label for="autoSave">
                <span class="icon material-symbols-rounded">auto_save</span>
                Salvamento Automático
              </label>
            </div>
          </div>
        </div>

        <!-- Configurações de Performance -->
        <div class="settings-section">
                      <h3>
              <span class="icon material-symbols-rounded">speed</span>
              Performance
            </h3>
          
          <div class="setting-item">
            <label for="maxConcurrentProcesses">Processos Simultâneos Máximos</label>
            <input 
              type="number" 
              id="maxConcurrentProcesses"
              [(ngModel)]="settings.maxConcurrentProcesses"
              min="1" 
              max="50"
              class="form-control">
            <small class="form-hint">Recomendado: 5-10 para sistemas pequenos, 10-20 para sistemas médios</small>
          </div>

          <div class="setting-item">
            <label for="defaultTimeout">Timeout Padrão (minutos)</label>
            <input 
              type="number" 
              id="defaultTimeout"
              [(ngModel)]="settings.defaultTimeout"
              min="1" 
              max="1440"
              class="form-control">
          </div>

          <div class="setting-item">
            <label for="retryAttempts">Tentativas de Retry</label>
            <input 
              type="number" 
              id="retryAttempts"
              [(ngModel)]="settings.retryAttempts"
              min="0" 
              max="10"
              class="form-control">
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="enableCaching"
                [(ngModel)]="settings.enableCaching"
                class="form-checkbox">
              <label for="enableCaching">
                <span class="icon material-symbols-rounded">storage</span>
                Habilitar Cache
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="enableCompression"
                [(ngModel)]="settings.enableCompression"
                class="form-checkbox">
              <label for="enableCompression">📦 Compressão de Dados</label>
            </div>
          </div>
        </div>

        <!-- Configurações de Notificações -->
        <div class="settings-section">
          <h3>📧 Notificações</h3>
          
          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="emailNotifications"
                [(ngModel)]="settings.emailNotifications"
                class="form-checkbox">
              <label for="emailNotifications">📨 Notificações por Email</label>
            </div>
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="slackNotifications"
                [(ngModel)]="settings.slackNotifications"
                class="form-checkbox">
              <label for="slackNotifications">💬 Integração com Slack</label>
            </div>
          </div>

          <div class="setting-item">
            <label for="emailRecipients">Destinatários de Email</label>
            <textarea 
              id="emailRecipients"
              [(ngModel)]="settings.emailRecipients"
              rows="3"
              placeholder="admin@empresa.com, operacao@empresa.com"
              class="form-control"></textarea>
            <small class="form-hint">Separe múltiplos emails por vírgula</small>
          </div>

          <div class="setting-item">
            <label for="notificationLevel">Nível de Notificação</label>
            <select id="notificationLevel" [(ngModel)]="settings.notificationLevel" class="form-control">
              <option value="ALL">Todas as Notificações</option>
              <option value="ERROR_ONLY">Apenas Erros</option>
              <option value="CRITICAL_ONLY">Apenas Críticas</option>
              <option value="NONE">Nenhuma</option>
            </select>
          </div>
        </div>

        <!-- Configurações de Segurança -->
        <div class="settings-section">
          <h3>🔒 Segurança</h3>
          
          <div class="setting-item">
            <label for="sessionTimeout">Timeout de Sessão (minutos)</label>
            <input 
              type="number" 
              id="sessionTimeout"
              [(ngModel)]="settings.sessionTimeout"
              min="5" 
              max="480"
              class="form-control">
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="twoFactorAuth"
                [(ngModel)]="settings.twoFactorAuth"
                class="form-checkbox">
              <label for="twoFactorAuth">
                <span class="icon material-symbols-rounded">security</span>
                Autenticação de Dois Fatores
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="auditLog"
                [(ngModel)]="settings.auditLog"
                class="form-checkbox">
              <label for="auditLog">
                <span class="icon material-symbols-rounded">description</span>
                Log de Auditoria
              </label>
            </div>
          </div>

          <div class="setting-item">
            <label for="passwordPolicy">Política de Senhas</label>
            <select id="passwordPolicy" [(ngModel)]="settings.passwordPolicy" class="form-control">
              <option value="BASIC">🔹 Básica (6+ caracteres)</option>
              <option value="STANDARD">🔸 Padrão (8+ com números)</option>
              <option value="STRONG">🔶 Forte (12+ com símbolos)</option>
              <option value="ENTERPRISE">🔺 Empresarial (16+ complexa)</option>
            </select>
          </div>
        </div>

        <!-- Configurações de Backup -->
        <div class="settings-section">
          <h3>
            <span class="icon material-symbols-rounded">backup_table</span>
            Backup
          </h3>
          
          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="automaticBackup"
                [(ngModel)]="settings.automaticBackup"
                class="form-checkbox">
              <label for="automaticBackup">
                <span class="icon material-symbols-rounded">backup</span>
                Backup Automático
              </label>
            </div>
          </div>

          <div class="setting-item">
            <label for="backupFrequency">Frequência de Backup</label>
            <select id="backupFrequency" [(ngModel)]="settings.backupFrequency" class="form-control">
              <option value="HOURLY">A cada hora</option>
              <option value="DAILY">Diário</option>
              <option value="WEEKLY">Semanal</option>
              <option value="MONTHLY">Mensal</option>
            </select>
          </div>

          <div class="setting-item">
            <label for="backupRetention">Retenção de Backup (dias)</label>
            <input 
              type="number" 
              id="backupRetention"
              [(ngModel)]="settings.backupRetention"
              min="1" 
              max="365"
              class="form-control">
          </div>

          <div class="setting-item">
            <label for="backupLocation">Local de Backup</label>
            <input 
              type="text" 
              id="backupLocation"
              [(ngModel)]="settings.backupLocation"
              placeholder="s3://bucket/backups/"
              class="form-control">
          </div>
        </div>

        <!-- Configurações de API -->
        <div class="settings-section">
          <h3>🔌 API & Integrações</h3>
          
          <div class="setting-item">
            <label for="apiRateLimit">Rate Limit (req/min)</label>
            <input 
              type="number" 
              id="apiRateLimit"
              [(ngModel)]="settings.apiRateLimit"
              min="10" 
              max="10000"
              class="form-control">
          </div>

          <div class="setting-item">
            <div class="checkbox-group">
              <input 
                type="checkbox" 
                id="enableApiLogging"
                [(ngModel)]="settings.enableApiLogging"
                class="form-checkbox">
              <label for="enableApiLogging">
                <span class="icon material-symbols-rounded">api</span>
                Log de API
              </label>
            </div>
          </div>

          <div class="setting-item">
            <label for="webhookUrl">Webhook URL</label>
            <input 
              type="url" 
              id="webhookUrl"
              [(ngModel)]="settings.webhookUrl"
              placeholder="https://api.empresa.com/webhook"
              class="form-control">
          </div>

          <div class="setting-item">
            <label for="apiKey">Chave da API Externa</label>
            <input 
              type="password" 
              id="apiKey"
              [(ngModel)]="settings.apiKey"
              placeholder="••••••••••••••••"
              class="form-control">
          </div>
        </div>
      </div>

      <!-- Status do Sistema -->
      <div class="system-status">
                  <h3>
            <span class="icon material-symbols-rounded">monitor_heart</span>
            Status do Sistema
          </h3>
        <div class="status-grid">
          <div class="status-item">
            <div class="status-icon green">
              <span class="icon material-symbols-rounded">check_circle</span>
            </div>
            <div class="status-content">
              <h4>Serviços Ativos</h4>
              <p>Todos os serviços estão funcionando normalmente</p>
            </div>
          </div>

          <div class="status-item">
            <div class="status-icon blue">
              <span class="icon material-symbols-rounded">save</span>
            </div>
            <div class="status-content">
              <h4>Último Backup</h4>
              <p>Realizado em {{ lastBackup }}</p>
            </div>
          </div>

          <div class="status-item">
            <div class="status-icon orange">
              <span class="icon material-symbols-rounded">bolt</span>
            </div>
            <div class="status-content">
              <h4>Performance</h4>
              <p>CPU: 45%, RAM: 62%, Disco: 78%</p>
            </div>
          </div>

          <div class="status-item">
            <div class="status-icon green">
              <span class="icon material-symbols-rounded">refresh</span>
            </div>
            <div class="status-content">
              <h4>Processos Ativos</h4>
              <p>{{ activeProcesses }} processos em execução</p>
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

    .header-actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      transition: all 0.3s ease;
    }

    .btn-primary {
      background: #3f51b5;
      color: white;
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .btn:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }

    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .settings-section {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .settings-section h3 {
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
      font-size: 1.2rem;
      font-weight: 600;
      border-bottom: 2px solid var(--border-primary);
      padding-bottom: 0.5rem;
    }

    .setting-item {
      margin-bottom: 1.5rem;
    }

    .setting-item:last-child {
      margin-bottom: 0;
    }

    .setting-item label {
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

    .form-checkbox {
      width: auto;
      margin: 0;
    }

    .checkbox-group label {
      margin: 0;
      cursor: pointer;
    }

    .system-status {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .system-status h3 {
      color: var(--primary-color);
      margin: 0 0 1.5rem 0;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .status-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      border-left: 3px solid;
      transition: all var(--transition-fast);
    }

    .status-item:hover {
      background: var(--bg-hover);
      border-color: var(--border-secondary);
    }

    .status-item:nth-child(1) { border-left-color: var(--success-color); }
    .status-item:nth-child(2) { border-left-color: var(--info-color); }
    .status-item:nth-child(3) { border-left-color: var(--warning-color); }
    .status-item:nth-child(4) { border-left-color: var(--accent-color); }

    .status-icon {
      font-size: 1.5rem;
      width: 2rem;
      text-align: center;
    }

    .status-content h4 {
      margin: 0 0 0.25rem 0;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
    }

    .status-content p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
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

      .header-actions {
        justify-content: space-between;
      }

      .settings-grid {
        grid-template-columns: 1fr;
      }

      .status-grid {
        grid-template-columns: 1fr;
      }

      .settings-section {
        padding: 1rem;
      }
    }
  `]
})
export class SettingsComponent {
  saving = false;
  lastBackup = '2024-01-25 14:30:00';
  activeProcesses = 4;

  settings = {
    // Gerais
    systemName: 'Dashboard Metamorfose',
    language: 'pt-BR',
    timezone: 'America/Sao_Paulo',
    darkMode: false,
    autoSave: true,

    // Performance
    maxConcurrentProcesses: 10,
    defaultTimeout: 60,
    retryAttempts: 3,
    enableCaching: true,
    enableCompression: true,

    // Notificações
    emailNotifications: true,
    slackNotifications: false,
    emailRecipients: 'admin@metamorfose.com, ops@metamorfose.com',
    notificationLevel: 'ERROR_ONLY',

    // Segurança
    sessionTimeout: 30,
    twoFactorAuth: false,
    auditLog: true,
    passwordPolicy: 'STANDARD',

    // Backup
    automaticBackup: true,
    backupFrequency: 'DAILY',
    backupRetention: 30,
    backupLocation: 's3://metamorfose-backups/',

    // API
    apiRateLimit: 1000,
    enableApiLogging: true,
    webhookUrl: '',
    apiKey: ''
  };

  saveSettings(): void {
    this.saving = true;
    
    // Simulação de salvamento
    setTimeout(() => {
      this.saving = false;
      alert('Configurações salvas com sucesso!\n\nAs alterações serão aplicadas nos próximos processos.');
    }, 2000);
  }

  resetSettings(): void {
    if (confirm('Tem certeza que deseja restaurar todas as configurações para os valores padrão?\n\nEsta ação não pode ser desfeita.')) {
      // Resetar para valores padrão
      this.settings = {
        systemName: 'Dashboard Metamorfose',
        language: 'pt-BR',
        timezone: 'America/Sao_Paulo',
        darkMode: false,
        autoSave: true,
        maxConcurrentProcesses: 5,
        defaultTimeout: 60,
        retryAttempts: 3,
        enableCaching: true,
        enableCompression: false,
        emailNotifications: true,
        slackNotifications: false,
        emailRecipients: '',
        notificationLevel: 'ALL',
        sessionTimeout: 30,
        twoFactorAuth: false,
        auditLog: true,
        passwordPolicy: 'BASIC',
        automaticBackup: true,
        backupFrequency: 'DAILY',
        backupRetention: 7,
        backupLocation: '',
        apiRateLimit: 100,
        enableApiLogging: false,
        webhookUrl: '',
        apiKey: ''
      };
      
      alert('Configurações restauradas para os valores padrão!');
    }
  }
} 