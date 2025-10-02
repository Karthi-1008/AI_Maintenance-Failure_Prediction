export enum Status {
  Healthy = 'Healthy',
  Warning = 'Warning',
  Critical = 'Critical',
}

export enum Industry {
    INDUSTRIAL = 'Industrial & Manufacturing',
    ENERGY = 'Energy & Utilities',
    TRANSPORT = 'Transport & Logistics',
    HEALTHCARE = 'Healthcare & Life Sciences',
    IT = 'IT & Telecom',
    AGRICULTURE = 'Agriculture & Food',
    PUBLIC_SERVICES = 'Public Services & Institutions',
}

export interface Equipment {
  id: string;
  name: string;
  status: Status;
  temperature: number[][];
  vibration: number[];
  uptime: number; // in hours
  lastMaintenance: string; // ISO date string
  oee: number; // Overall Equipment Effectiveness (0 to 1)
  mtbf: number; // Mean Time Between Failures (in hours)
  currentLoad: number; // as a percentage
  industry: Industry;
}

export enum TaskStatus {
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

export interface StatusHistoryEntry {
  status: TaskStatus;
  date: string; // ISO date string
}

export interface MaintenanceTask {
  id: string;
  title: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  equipmentId: string;
  status: TaskStatus;
  dueDate: string; // ISO date string
  description: string;
  statusHistory: StatusHistoryEntry[];
}

export interface SparePart {
  id: string;
  name: string;
  stock: number;
  capacity: number;
}

export interface RiskEvent {
  id: string;
  name: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
}

export interface PredictedFailure {
    id: string;
    equipmentId: string;
    component: string;
    predictedFailureDate: string; // ISO date string
    confidence: number; // 0 to 1
}