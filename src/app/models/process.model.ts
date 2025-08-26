export interface Process {
  id: number;
  name: string;
  type: string;
  status: string;
  description: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProcess {
  name: string;
  type: string;
  description: string;
}

export interface ProcessStats {
  totalProcesses: number;
  runningProcesses: number;
  completedProcesses: number;
  stoppedProcesses: number;
  errorProcesses: number;
}

export type ProcessStatus = 'CREATED' | 'RUNNING' | 'COMPLETED' | 'STOPPED' | 'ERROR';
export type ProcessType = 'TRANSFORMATION' | 'ANALYSIS' | 'EXTRACTION' | 'VALIDATION'; 