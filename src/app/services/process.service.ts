import { Injectable } from '@angular/core';

export interface ProcessData {
  id: number;
  name: string;
  type: string;
  status: string;
  description: string;
  progress: number;
  priority: string;
  estimatedDuration: number;
  timeout?: number | null;
  autoStart: boolean;
  sendNotifications: boolean;
  inputSource: string;
  outputTarget: string;
  parameters: string;
  createdAt: Date;
  updatedAt: Date;
  startTime?: Date;
  endTime?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  private processes: ProcessData[] = [
    {
      id: 1,
      name: 'Análise de Dados de Vendas',
      type: 'ANALYSIS',
      status: 'RUNNING',
      description: 'Processamento e análise dos dados de vendas do último trimestre',
      progress: 75,
      priority: 'HIGH',
      estimatedDuration: 120,
      timeout: 180,
      autoStart: false,
      sendNotifications: true,
      inputSource: 'database://localhost:5432/vendas',
      outputTarget: 's3://bucket/analytics/',
      parameters: '{"batchSize": 1000, "retryCount": 3}',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      startTime: new Date(Date.now() - 90 * 60000)
    },
    {
      id: 2,
      name: 'ETL Customer Data',
      type: 'ETL',
      status: 'COMPLETED',
      description: 'Extração, transformação e carregamento dos dados de clientes',
      progress: 100,
      priority: 'MEDIUM',
      estimatedDuration: 60,
      timeout: 90,
      autoStart: true,
      sendNotifications: true,
      inputSource: 'database://localhost:5432/customers',
      outputTarget: 'warehouse://data/customers',
      parameters: '{"chunkSize": 500}',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-12'),
      startTime: new Date('2024-01-12T08:00:00'),
      endTime: new Date('2024-01-12T09:00:00')
    },
    {
      id: 3,
      name: 'Relatório Financeiro',
      type: 'REPORT',
      status: 'STOPPED',
      description: 'Geração do relatório financeiro mensal',
      progress: 30,
      priority: 'CRITICAL',
      estimatedDuration: 45,
      timeout: 60,
      autoStart: false,
      sendNotifications: true,
      inputSource: 'database://localhost:5432/financials',
      outputTarget: 'file://reports/monthly/',
      parameters: '{"format": "PDF", "template": "standard"}',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date(),
      startTime: new Date(Date.now() - 15 * 60000)
    },
    {
      id: 4,
      name: 'Transformação de Logs',
      type: 'TRANSFORM',
      status: 'ERROR',
      description: 'Processamento e limpeza dos logs do sistema',
      progress: 45,
      priority: 'LOW',
      estimatedDuration: 90,
      timeout: 120,
      autoStart: false,
      sendNotifications: false,
      inputSource: 'file://logs/raw/',
      outputTarget: 'file://logs/processed/',
      parameters: '{"filterLevel": "INFO", "compress": true}',
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date(),
      startTime: new Date(Date.now() - 40 * 60000)
    },
    {
      id: 5,
      name: 'Pipeline ML Training',
      type: 'ANALYSIS',
      status: 'RUNNING',
      description: 'Treinamento do modelo de machine learning',
      progress: 60,
      priority: 'HIGH',
      estimatedDuration: 180,
      timeout: 240,
      autoStart: true,
      sendNotifications: true,
      inputSource: 'database://localhost:5432/ml_data',
      outputTarget: 's3://models/trained/',
      parameters: '{"algorithm": "RandomForest", "maxDepth": 10}',
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date(),
      startTime: new Date(Date.now() - 108 * 60000)
    }
  ];

  getAllProcesses(): ProcessData[] {
    return [...this.processes];
  }

  getProcessById(id: number): ProcessData | undefined {
    return this.processes.find(p => p.id === id);
  }

  updateProcess(id: number, updatedData: Partial<ProcessData>): boolean {
    const index = this.processes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.processes[index] = {
        ...this.processes[index],
        ...updatedData,
        updatedAt: new Date()
      };
      return true;
    }
    return false;
  }

  deleteProcess(id: number): boolean {
    const index = this.processes.findIndex(p => p.id === id);
    if (index !== -1) {
      this.processes.splice(index, 1);
      return true;
    }
    return false;
  }

  createProcess(processData: Omit<ProcessData, 'id' | 'createdAt' | 'updatedAt'>): ProcessData {
    const newId = Math.max(...this.processes.map(p => p.id)) + 1;
    const newProcess: ProcessData = {
      ...processData,
      id: newId,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.processes.push(newProcess);
    return newProcess;
  }

  updateProcessStatus(id: number, status: string): boolean {
    const process = this.processes.find(p => p.id === id);
    if (process) {
      process.status = status;
      process.updatedAt = new Date();
      
      if (status === 'RUNNING' && !process.startTime) {
        process.startTime = new Date();
      }
      
      if (status === 'COMPLETED' && !process.endTime) {
        process.endTime = new Date();
        process.progress = 100;
      }
      
      return true;
    }
    return false;
  }
} 