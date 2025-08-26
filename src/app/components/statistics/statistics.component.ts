import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>
        <span class="icon material-symbols-rounded">analytics</span>
        Estatísticas e Análises
      </h1>
        <div class="header-actions">
          <select [(ngModel)]="selectedPeriod" (change)="updatePeriod()" class="period-select">
            <option value="7">Últimos 7 dias</option>
            <option value="30" selected>Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
            <option value="365">Último ano</option>
          </select>
                      <button (click)="exportData()" class="btn btn-primary">
              <span class="icon material-symbols-rounded">download</span>
              Exportar Dados
            </button>
        </div>
      </div>

      <!-- Métricas Principais -->
      <div class="metrics-grid">
        <div class="metric-card highlight">
          <div class="metric-icon">
            <span class="icon material-symbols-rounded">trending_up</span>
          </div>
          <div class="metric-content">
            <h3>Taxa de Sucesso</h3>
            <div class="metric-value">{{ successRate }}%</div>
            <div class="metric-change positive">
              <span class="icon material-symbols-rounded">north_east</span>
              +2.5% vs período anterior
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <span class="icon material-symbols-rounded">schedule</span>
          </div>
          <div class="metric-content">
            <h3>Tempo Médio</h3>
            <div class="metric-value">{{ avgTime }}min</div>
            <div class="metric-change negative">
              <span class="icon material-symbols-rounded">south_east</span>
              -8.2% vs período anterior
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <span class="icon material-symbols-rounded">sync</span>
          </div>
          <div class="metric-content">
            <h3>Total Processado</h3>
            <div class="metric-value">{{ totalProcessed }}</div>
            <div class="metric-change positive">
              <span class="icon material-symbols-rounded">north_east</span>
              +15.3% vs período anterior
            </div>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-icon">
            <span class="icon material-symbols-rounded">savings</span>
          </div>
          <div class="metric-content">
            <h3>Economia Estimada</h3>
            <div class="metric-value">R$ {{ estimatedSavings }}k</div>
            <div class="metric-change positive">
              <span class="icon material-symbols-rounded">north_east</span>
              +22.1% vs período anterior
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos e Análises -->
      <div class="charts-grid">
        <!-- Gráfico de Performance -->
        <div class="chart-card">
          <h3>
            <span class="icon material-symbols-rounded">bar_chart</span>
            Performance dos Processos
          </h3>
          <div class="chart-container">
            <div class="chart-placeholder">
              <div class="chart-bars">
                <div class="bar" style="height: 80%"><span>80%</span></div>
                <div class="bar" style="height: 95%"><span>95%</span></div>
                <div class="bar" style="height: 72%"><span>72%</span></div>
                <div class="bar" style="height: 88%"><span>88%</span></div>
                <div class="bar" style="height: 93%"><span>93%</span></div>
                <div class="bar" style="height: 76%"><span>76%</span></div>
                <div class="bar" style="height: 91%"><span>91%</span></div>
              </div>
              <div class="chart-labels">
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                <span>Dom</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Distribuição por Tipo -->
        <div class="chart-card">
          <h3>
            <span class="icon material-symbols-rounded">pie_chart</span>
            Distribuição por Tipo de Processo
          </h3>
          <div class="chart-container">
            <div class="pie-content">
              <div class="pie-chart-wrapper">
                <div class="pie-chart"></div>
                <div class="pie-center">
                  <div class="pie-total">100%</div>
                  <div class="pie-label">Processos</div>
                </div>
              </div>
              <div class="pie-legend">
                <div class="legend-item">
                  <div class="legend-color etl"></div>
                  <span>ETL (35%)</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color analysis"></div>
                  <span>Análise (28%)</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color transform"></div>
                  <span>Transformação (22%)</span>
                </div>
                <div class="legend-item">
                  <div class="legend-color report"></div>
                  <span>Relatório (15%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Status dos Processos -->
        <div class="chart-card">
          <h3>
            <span class="icon material-symbols-rounded">analytics</span>
            Status dos Processos
          </h3>
          <div class="chart-container">
            <div class="status-chart">
              <div class="status-item">
                <div class="status-indicator running">
                  <span class="icon material-symbols-rounded">play_circle</span>
                </div>
                <div class="status-info">
                  <div class="status-value">12</div>
                  <div class="status-label">Em Execução</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-indicator pending">
                  <span class="icon material-symbols-rounded">schedule</span>
                </div>
                <div class="status-info">
                  <div class="status-value">8</div>
                  <div class="status-label">Aguardando</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-indicator completed">
                  <span class="icon material-symbols-rounded">check_circle</span>
                </div>
                <div class="status-info">
                  <div class="status-value">245</div>
                  <div class="status-label">Concluídos</div>
                </div>
              </div>
              <div class="status-item">
                <div class="status-indicator error">
                  <span class="icon material-symbols-rounded">error</span>
                </div>
                <div class="status-info">
                  <div class="status-value">3</div>
                  <div class="status-label">Com Erro</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tendência Temporal -->
        <div class="chart-card full-width">
          <h3>
            <span class="icon material-symbols-rounded">timeline</span>
            Tendência de Execução ao Longo do Tempo
          </h3>
          <div class="chart-container line-chart-container">
            <div class="line-chart">
              <div class="line-chart-grid">
                <div class="grid-line" style="bottom: 0%"></div>
                <div class="grid-line" style="bottom: 20%"></div>
                <div class="grid-line" style="bottom: 40%"></div>
                <div class="grid-line" style="bottom: 60%"></div>
                <div class="grid-line" style="bottom: 80%"></div>
                <div class="grid-line" style="bottom: 100%"></div>
              </div>
              <svg class="line-chart-svg" viewBox="0 0 700 200">
                <polyline 
                  points="0,150 100,120 200,80 300,100 400,60 500,40 600,70 700,50"
                  fill="none" 
                  stroke="var(--primary-color)" 
                  stroke-width="3"/>
                <polyline 
                  points="0,180 100,160 200,140 300,130 400,110 500,90 600,100 700,80"
                  fill="none" 
                  stroke="var(--error-color)" 
                  stroke-width="3"/>
              </svg>
              <div class="line-chart-labels">
                <span>Jan</span>
                <span>Fev</span>
                <span>Mar</span>
                <span>Abr</span>
                <span>Mai</span>
                <span>Jun</span>
                <span>Jul</span>
              </div>
            </div>
            <div class="line-legend">
              <div class="legend-item">
                <div class="legend-line primary"></div>
                <span>Processos Concluídos</span>
              </div>
              <div class="legend-item">
                <div class="legend-line accent"></div>
                <span>Processos com Erro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Insights e Recomendações -->
      <div class="insights-section">
        <h3>
          <span class="icon material-symbols-rounded">lightbulb</span>
          Insights e Recomendações
        </h3>
        <div class="insights-grid">
          <div class="insight-card positive">
            <div class="insight-icon">
              <span class="icon material-symbols-rounded">check_circle</span>
            </div>
            <div class="insight-content">
              <h4>Excelente Performance</h4>
              <p>Taxa de sucesso de 95% está acima da meta de 90%. Continue com as práticas atuais.</p>
            </div>
          </div>

          <div class="insight-card warning">
            <div class="insight-icon">
              <span class="icon material-symbols-rounded">warning</span>
            </div>
            <div class="insight-content">
              <h4>Pico de Uso às Terças</h4>
              <p>Terças-feiras têm 40% mais processamentos. Consider balanceamento de carga.</p>
            </div>
          </div>

          <div class="insight-card info">
            <div class="insight-icon">
              <span class="icon material-symbols-rounded">insights</span>
            </div>
            <div class="insight-content">
              <h4>Otimização de ETL</h4>
              <p>Processos ETL estão consumindo 60% do tempo total. Revisar para otimização.</p>
            </div>
          </div>

          <div class="insight-card success">
            <div class="insight-icon">
              <span class="icon material-symbols-rounded">payments</span>
            </div>
            <div class="insight-content">
              <h4>ROI Positivo</h4>
              <p>Automação está gerando R$ 125k de economia mensal vs processos manuais.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Processos -->
      <div class="top-processes">
        <h3>
          <span class="icon material-symbols-rounded">trophy</span>
          Top Processos por Performance
        </h3>
        <div class="process-ranking">
          <div class="rank-item" *ngFor="let process of topProcesses; let i = index">
            <div class="rank-number">{{ i + 1 }}</div>
            <div class="rank-content">
              <h4>{{ process.name }}</h4>
              <div class="rank-metrics">
                <span class="metric">
                  <span class="icon material-symbols-rounded">schedule</span>
                  {{ process.avgTime }}min
                </span>
                <span class="metric">
                  <span class="icon material-symbols-rounded">check_circle</span>
                  {{ process.successRate }}%
                </span>
                <span class="metric">
                  <span class="icon material-symbols-rounded">refresh</span>
                  {{ process.executions }} exec.
                </span>
              </div>
            </div>
            <div class="rank-score">{{ process.score }}/100</div>
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
      align-items: center;
    }

    .period-select {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
    }

    .btn {
      padding: 0.5rem 1rem;
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

    .btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all var(--transition-normal);
      backdrop-filter: blur(10px);
    }

    .metric-card:hover {
      transform: translateY(-2px);
    }

    .metric-card.highlight {
      border-left: 4px solid #4caf50;
    }

    .metric-icon {
      font-size: 2rem;
      width: 3rem;
      text-align: center;
    }

    .metric-content h3 {
      margin: 0 0 0.5rem 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 500;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: bold;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .metric-change {
      font-size: 0.8rem;
      font-weight: 500;
    }

    .metric-change.positive {
      color: #4caf50;
    }

    .metric-change.negative {
      color: #f44336;
    }

    .charts-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .chart-card {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .chart-card.full-width {
      grid-column: 1 / -1;
    }

    .chart-card h3 {
      margin: 0 0 1rem 0;
      color: var(--text-primary);
      font-size: 1.1rem;
      font-weight: 600;
    }

    .chart-container {
      height: 200px;
      position: relative;
    }

    .line-chart-container {
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .pie-content {
      display: flex;
      align-items: center;
      gap: 2rem;
      height: 100%;
    }

    .chart-bars {
      display: flex;
      align-items: end;
      height: 150px;
      gap: 0.5rem;
      padding: 1rem 0;
    }

    .bar {
      flex: 1;
      background: linear-gradient(to top, #3f51b5, #2196f3);
      border-radius: 4px 4px 0 0;
      position: relative;
      min-height: 20px;
      display: flex;
      align-items: end;
      justify-content: center;
      color: white;
      font-size: 0.8rem;
      font-weight: bold;
      padding-bottom: 0.25rem;
    }

    .chart-labels {
      display: flex;
      justify-content: space-around;
      font-size: 0.8rem;
      color: #666;
      margin-top: 0.5rem;
    }

    .pie-chart-wrapper {
      position: relative;
      width: 180px;
      height: 180px;
      flex-shrink: 0;
    }

    .pie-chart {
      width: 100%;
      height: 100%;
      background: conic-gradient(
        var(--primary-color) 0% 35%,
        var(--info-color) 35% 63%,
        var(--warning-color) 63% 85%,
        var(--success-color) 85% 100%
      );
      border-radius: 50%;
      position: relative;
    }

    .pie-chart::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 60%;
      height: 60%;
      background: var(--bg-card);
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .pie-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 2;
    }

    .pie-total {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--text-primary);
      margin-bottom: 0.25rem;
    }

    .pie-center .pie-label {
      font-size: 0.8rem;
      color: var(--text-secondary);
      text-transform: uppercase;
    }

    .pie-legend {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      flex: 1;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      padding: 0.5rem;
      border-radius: var(--radius);
      background: rgba(255, 255, 255, 0.05);
      transition: background var(--transition-fast);
    }

    .legend-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .legend-color {
      width: 16px;
      height: 16px;
      border-radius: var(--radius);
      flex-shrink: 0;
    }

    .legend-color.etl { background: var(--primary-color); }
    .legend-color.analysis { background: var(--info-color); }
    .legend-color.transform { background: var(--warning-color); }
    .legend-color.report { background: var(--success-color); }

    .line-chart {
      position: relative;
      height: 180px;
      margin-bottom: 0.5rem;
    }

    .line-chart-grid {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .grid-line {
      position: absolute;
      width: 100%;
      height: 1px;
      background: var(--border-primary);
      opacity: 0.3;
    }

    .line-chart-svg {
      width: 100%;
      height: 100%;
    }

    .line-chart-labels {
      display: flex;
      justify-content: space-around;
      font-size: 0.8rem;
      color: var(--text-secondary);
      margin-top: 0.5rem;
      position: relative;
      z-index: 1;
    }

    .line-legend {
      display: flex;
      gap: 2rem;
      justify-content: center;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: var(--radius);
      border: 1px solid var(--border-primary);
      margin-top: 0;
    }

    .line-legend .legend-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.9rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .legend-line {
      width: 24px;
      height: 4px;
      border-radius: var(--radius);
      flex-shrink: 0;
    }

    .legend-line.primary { background: var(--primary-color); }
    .legend-line.accent { background: var(--error-color); }

    .status-chart {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      height: 100%;
    }

    .status-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: rgba(255, 255, 255, 0.02);
      border-radius: var(--radius);
      border: 1px solid var(--border-primary);
      transition: all var(--transition-fast);
    }

    .status-item:hover {
      background: rgba(255, 255, 255, 0.05);
      transform: translateY(-2px);
    }

    .status-indicator {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .status-indicator .icon {
      font-size: 1.5rem;
      color: white;
    }

    .status-indicator.running {
      background: linear-gradient(135deg, var(--primary-color), #4f46e5);
    }

    .status-indicator.pending {
      background: linear-gradient(135deg, var(--warning-color), #f59e0b);
    }

    .status-indicator.completed {
      background: linear-gradient(135deg, var(--success-color), #10b981);
    }

    .status-indicator.error {
      background: linear-gradient(135deg, var(--error-color), #dc2626);
    }

    .status-info {
      flex: 1;
      min-width: 0;
    }

    .status-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1;
      margin-bottom: 0.25rem;
    }

    .status-label {
      font-size: 0.85rem;
      color: var(--text-secondary);
      font-weight: 500;
    }

    .insights-section {
      margin-bottom: 2rem;
    }

    .insights-section h3 {
      color: var(--text-primary);
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1rem;
    }

    .insight-card {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      display: flex;
      gap: 1rem;
      border-left: 4px solid;
      backdrop-filter: blur(10px);
    }

    .insight-card.positive { border-left-color: #4caf50; }
    .insight-card.warning { border-left-color: #ff9800; }
    .insight-card.info { border-left-color: #2196f3; }
    .insight-card.success { border-left-color: #8bc34a; }

    .insight-icon {
      font-size: 1.5rem;
    }

    .insight-content h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
    }

    .insight-content p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .top-processes {
      background: var(--gradient-card);
      border: 1px solid var(--border-primary);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      backdrop-filter: blur(10px);
    }

    .top-processes h3 {
      margin: 0 0 1rem 0;
      color: var(--text-primary);
      font-weight: 600;
    }

    .process-ranking {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .rank-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-primary);
      border-radius: var(--radius);
      border-left: 3px solid var(--primary-color);
      transition: all var(--transition-fast);
    }

    .rank-item:hover {
      background: var(--bg-hover);
      border-color: var(--border-secondary);
    }

    .rank-number {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary-color);
      min-width: 2rem;
      text-align: center;
    }

    .rank-content {
      flex: 1;
    }

    .rank-content h4 {
      margin: 0 0 0.5rem 0;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
    }

    .rank-metrics {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .rank-metrics .metric {
      font-size: 0.8rem;
      color: var(--text-secondary);
      background: var(--bg-card);
      border: 1px solid var(--border-primary);
      padding: 0.25rem 0.5rem;
      border-radius: var(--radius);
    }

    .rank-score {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--accent-color);
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

      .metrics-grid {
        grid-template-columns: 1fr;
      }

      .charts-grid {
        grid-template-columns: 1fr;
      }

      .insights-grid {
        grid-template-columns: 1fr;
      }

      .pie-content {
        flex-direction: column;
        gap: 1rem;
      }

      .pie-chart-wrapper {
        width: 150px;
        height: 150px;
      }

      .pie-legend {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }

      .legend-item {
        font-size: 0.8rem;
        padding: 0.25rem;
      }

      .legend-color {
        width: 12px;
        height: 12px;
      }

      .line-legend {
        flex-direction: column;
        gap: 1rem;
        padding: 0.75rem;
      }

      .line-legend .legend-item {
        justify-content: center;
        font-size: 0.8rem;
      }

      .legend-line {
        width: 20px;
        height: 3px;
      }

      .status-chart {
        grid-template-columns: 1fr;
        gap: 0.75rem;
      }

      .status-item {
        padding: 0.75rem;
        gap: 0.75rem;
      }

      .status-indicator {
        width: 40px;
        height: 40px;
      }

      .status-indicator .icon {
        font-size: 1.25rem;
      }

      .status-value {
        font-size: 1.5rem;
      }

      .status-label {
        font-size: 0.8rem;
      }

      .rank-item {
        flex-direction: column;
        text-align: center;
      }

      .rank-metrics {
        justify-content: center;
      }
    }
  `]
})
export class StatisticsComponent {
  selectedPeriod = '30';
  successRate = 95;
  avgTime = 42;
  totalProcessed = 1847;
  estimatedSavings = 125;

  topProcesses = [
    {
      name: 'ETL Customer Analytics',
      avgTime: 15,
      successRate: 98,
      executions: 245,
      score: 96
    },
    {
      name: 'Daily Sales Report',
      avgTime: 8,
      successRate: 97,
      executions: 180,
      score: 94
    },
    {
      name: 'Data Validation Pipeline',
      avgTime: 25,
      successRate: 95,
      executions: 156,
      score: 91
    },
    {
      name: 'Log Processing ETL',
      avgTime: 35,
      successRate: 93,
      executions: 98,
      score: 88
    },
    {
      name: 'Financial Transform',
      avgTime: 45,
      successRate: 94,
      executions: 87,
      score: 85
    }
  ];

  updatePeriod(): void {
    // Simular atualização dos dados baseado no período
    console.log('Atualizando dados para período:', this.selectedPeriod);
  }

  exportData(): void {
    alert('Exportando dados estatísticos...\n\nFormato: CSV\nPeríodo: Últimos ' + this.selectedPeriod + ' dias');
  }
} 