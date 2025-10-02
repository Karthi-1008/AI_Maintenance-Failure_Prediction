import React from 'react';
import { Equipment, MaintenanceTask, SparePart, RiskEvent, Status, TaskStatus, PredictedFailure, Industry } from './types.ts';

export const ICONS = {
    SUN: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>,
    MOON: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>,
    MENU: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    ALERT_TRIANGLE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    CALENDAR: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    INDUSTRIAL: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="3"/><path d="M12 9.5V6.73a2 2 0 0 1 1-1.73l2.5-1.44a2 2 0 0 1 2 1.73V11l-2 1.15"/><path d="m10.5 14.5-5 2.89a2 2 0 0 1-2-1.74V9.23a2 2 0 0 1 1-1.73l2.5-1.44a2 2 0 0 1 2 1.73V13l2 1.15"/><path d="M13.5 14.5 18 17.4a2 2 0 0 0 2-1.73v-3.8l-2-1.15"/></svg>,
    ENERGY: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    TRANSPORT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16.5 17.5 13H22v-2h-4.5l-3.5-3.5V6a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v2H6l-3 4v3h2.2"/><path d="M7 16.5 3.5 13H2"/><circle cx="18.5" cy="16.5" r="2.5"/><circle cx="5.5" cy="16.5" r="2.5"/></svg>,
    HEALTHCARE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
    IT: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="17" width="20" height="4" rx="2"/><path d="M2 12h20"/><path d="M6 12v-2h12v2"/><path d="M12 12V7"/><path d="m14 12-1-5h-2l-1 5"/></svg>,
    AGRICULTURE: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22v-2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"/><path d="M12 18c0-4.418-3.582-8-8-8 0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8z"/></svg>,
    PUBLIC_SERVICES: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V10"/><path d="m18 10 4 3.5V22H2v-8.5L6 10"/><path d="M2 10h20"/><path d="M12 2v3"/><path d="M20 5h-4"/><path d="M4 5h4"/></svg>,
    X: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,

};

export const INDUSTRIES = [
    { id: Industry.INDUSTRIAL, name: 'Industrial & Mfg.', icon: ICONS.INDUSTRIAL },
    { id: Industry.ENERGY, name: 'Energy & Utilities', icon: ICONS.ENERGY },
    { id: Industry.TRANSPORT, name: 'Transport & Logistics', icon: ICONS.TRANSPORT },
    { id: Industry.HEALTHCARE, name: 'Healthcare', icon: ICONS.HEALTHCARE },
    { id: Industry.IT, name: 'IT & Telecom', icon: ICONS.IT },
    { id: Industry.AGRICULTURE, name: 'Agriculture & Food', icon: ICONS.AGRICULTURE },
    { id: Industry.PUBLIC_SERVICES, name: 'Public Services', icon: ICONS.PUBLIC_SERVICES },
];

const now = new Date();

export const EQUIPMENTS: Equipment[] = [
  // 1. Industrial & Manufacturing
  {
    id: 'cnc-101', name: 'CNC Machine 101', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 15 + 55))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.5 + 1),
    uptime: 3200, lastMaintenance: '2023-09-10T08:00:00Z', oee: 0.78, mtbf: 2800, currentLoad: 95, industry: Industry.INDUSTRIAL
  },
  {
    id: 'conveyor-b2', name: 'Conveyor Belt B-2', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 40))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.5 + 1),
    uptime: 5600, lastMaintenance: '2023-11-01T10:00:00Z', oee: 0.93, mtbf: 7000, currentLoad: 80, industry: Industry.INDUSTRIAL
  },
  {
    id: 'robot-arm-7', name: 'Industrial Robot Arm 7', status: Status.Critical,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 20 + 70))), vibration: Array.from({ length: 100 }, () => Math.random() * 4 + 2),
    uptime: 8100, lastMaintenance: '2023-05-20T14:00:00Z', oee: 0.55, mtbf: 4000, currentLoad: 120, industry: Industry.INDUSTRIAL
  },
  // 2. Energy & Utilities
  {
    id: 'wind-turbine-t8', name: 'Wind Turbine T-8', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 20 + 45))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.5 + 1),
    uptime: 7500, lastMaintenance: '2023-08-10T12:00:00Z', oee: 0.82, mtbf: 6000, currentLoad: 85, industry: Industry.ENERGY
  },
  {
    id: 'transformer-s5', name: 'Substation Transformer S5', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 60))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.2 + 0.1),
    uptime: 25000, lastMaintenance: '2023-02-15T09:00:00Z', oee: 0.98, mtbf: 30000, currentLoad: 75, industry: Industry.ENERGY
  },
  {
    id: 'water-pump-wp3', name: 'Water Pump WP-3', status: Status.Critical,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 25 + 75))), vibration: Array.from({ length: 100 }, () => Math.random() * 3.5 + 2),
    uptime: 1200, lastMaintenance: '2023-10-05T11:00:00Z', oee: 0.68, mtbf: 1500, currentLoad: 100, industry: Industry.ENERGY
  },
  // 3. Transport & Logistics
  {
    id: 'loco-42', name: 'Locomotive #42', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 15 + 40))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.8 + 1),
    uptime: 15000, lastMaintenance: '2023-10-25T10:00:00Z', oee: 0.88, mtbf: 10000, currentLoad: 70, industry: Industry.TRANSPORT
  },
  {
    id: 'cargo-crane-cc1', name: 'Cargo Crane CC-1', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 50))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.8 + 1),
    uptime: 9500, lastMaintenance: '2023-07-30T13:00:00Z', oee: 0.79, mtbf: 8000, currentLoad: 90, industry: Industry.TRANSPORT
  },
  {
    id: 'reefer-truck-rt9', name: 'Refrigerated Truck RT-9', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + -15))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.9 + 1),
    uptime: 4300, lastMaintenance: '2023-11-12T16:00:00Z', oee: 0.91, mtbf: 5000, currentLoad: 65, industry: Industry.TRANSPORT
  },
  // 4. Healthcare & Life Sciences
  {
    id: 'mri-alpha', name: 'MRI Scanner Alpha', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + 18))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.2 + 0.1),
    uptime: 4500, lastMaintenance: '2023-09-15T09:00:00Z', oee: 0.91, mtbf: 8000, currentLoad: 50, industry: Industry.HEALTHCARE
  },
  {
    id: 'ventilator-v500', name: 'Ventilator V-500', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + 20))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.1 + 0.05),
    uptime: 11000, lastMaintenance: '2023-11-01T08:00:00Z', oee: 0.99, mtbf: 25000, currentLoad: 30, industry: Industry.HEALTHCARE
  },
  {
    id: 'pharma-reactor-r2', name: 'Pharmaceutical Reactor R2', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 85))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.7 + 1),
    uptime: 6200, lastMaintenance: '2023-08-22T15:00:00Z', oee: 0.94, mtbf: 9000, currentLoad: 88, industry: Industry.HEALTHCARE
  },
  // 5. IT & Telecom
  {
    id: 'server-db-01', name: 'Database Server 01', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 35))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.1 + 0.05),
    uptime: 8760, lastMaintenance: '2023-11-05T03:00:00Z', oee: 0.99, mtbf: 20000, currentLoad: 65, industry: Industry.IT
  },
  {
    id: 'hvac-dc-1', name: 'Data Center HVAC Unit', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + 22))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.6 + 1),
    uptime: 18000, lastMaintenance: '2023-06-18T11:00:00Z', oee: 0.85, mtbf: 15000, currentLoad: 92, industry: Industry.IT
  },
  {
    id: 'telecom-tower-n4', name: 'Telecom Tower N-4', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 25))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.3 + 0.1),
    uptime: 45000, lastMaintenance: '2022-12-10T10:00:00Z', oee: 0.97, mtbf: 50000, currentLoad: 55, industry: Industry.IT
  },
  // 6. Agriculture & Food
  {
    id: 'tractor-jd-7r', name: 'Tractor JD-7R', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 15 + 50))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.2 + 1),
    uptime: 2100, lastMaintenance: '2023-10-01T18:00:00Z', oee: 0.85, mtbf: 3000, currentLoad: 80, industry: Industry.AGRICULTURE
  },
  {
    id: 'irrigation-pump-ip2', name: 'Irrigation Pump IP-2', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 45))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.6 + 1),
    uptime: 3300, lastMaintenance: '2023-09-05T09:00:00Z', oee: 0.90, mtbf: 4000, currentLoad: 70, industry: Industry.AGRICULTURE
  },
  {
    id: 'cold-storage-cs1', name: 'Cold Storage Unit CS-1', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + -5))), vibration: Array.from({ length: 100 }, () => Math.random() * 1.3 + 1),
    uptime: 13500, lastMaintenance: '2023-07-15T14:00:00Z', oee: 0.81, mtbf: 10000, currentLoad: 85, industry: Industry.AGRICULTURE
  },
  // 7. Public Services & Institutions
  {
    id: 'atm-bofa-1138', name: 'ATM 1138', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 5 + 30))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.4 + 0.2),
    uptime: 19000, lastMaintenance: '2023-11-08T22:00:00Z', oee: 0.96, mtbf: 15000, currentLoad: 40, industry: Industry.PUBLIC_SERVICES
  },
  {
    id: 'backup-gen-h1', name: 'Hospital Backup Generator', status: Status.Healthy,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 25))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.5 + 1),
    uptime: 3500, lastMaintenance: '2023-11-01T09:00:00Z', oee: 0.95, mtbf: 4000, currentLoad: 5, industry: Industry.PUBLIC_SERVICES
  },
  {
    id: 'cctv-sys-p1', name: 'Surveillance System P1', status: Status.Warning,
    temperature: Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 10 + 45))), vibration: Array.from({ length: 100 }, () => Math.random() * 0.2 + 0.1),
    uptime: 22000, lastMaintenance: '2023-01-20T05:00:00Z', oee: 0.92, mtbf: 25000, currentLoad: 100, industry: Industry.PUBLIC_SERVICES
  },
];


export const TASKS: MaintenanceTask[] = [
  { 
    id: 't-1', title: 'Calibrate Robot Arm 7', assignedTo: 'Mike Ross', priority: 'High', equipmentId: 'robot-arm-7', status: TaskStatus.ToDo, 
    dueDate: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Perform full range-of-motion calibration for Robot Arm 7. Check for joint wear and ensure positioning accuracy is within 0.1mm tolerance. Refer to manufacturer specification sheet M-78B.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-2', title: 'Check CNC-101 Spindle', assignedTo: 'John Doe', priority: 'Medium', equipmentId: 'cnc-101', status: TaskStatus.InProgress, 
    dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Inspect spindle for signs of vibration or overheating. Run diagnostic cycle and record temperature and acoustic data. Top up lubrication if necessary.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.InProgress, date: new Date(now.getTime() - 30 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-3', title: 'Inspect Turbine T-8 Blades', assignedTo: 'Team A', priority: 'High', equipmentId: 'wind-turbine-t8', status: TaskStatus.ToDo, 
    dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Visual and ultrasonic inspection of all three blades on Turbine T-8 for micro-fractures or leading-edge erosion. Drone inspection authorized if weather permits.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-4', title: 'Test Transformer S5 Oil', assignedTo: 'Jane Smith', priority: 'Medium', equipmentId: 'transformer-s5', status: TaskStatus.Done, 
    dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Collect oil sample and send for Dissolved Gas Analysis (DGA). Results logged in system. All levels nominal.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.InProgress, date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.Done, date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-5', title: 'Service Reefer RT-9 Unit', assignedTo: 'Logistics Team', priority: 'High', equipmentId: 'reefer-truck-rt9', status: TaskStatus.InProgress, 
    dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Check refrigerant levels, clean condenser coils, and verify temperature holding capacity for Refrigerated Truck RT-9.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.InProgress, date: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-6', title: 'Calibrate MRI Alpha Coils', assignedTo: 'Dr. Evelyn Reed', priority: 'High', equipmentId: 'mri-alpha', status: TaskStatus.ToDo, 
    dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Perform quarterly calibration on the gradient coils of MRI Scanner Alpha. Use phantom model for image quality verification.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date().toISOString() }
    ]
  },
  { 
    id: 't-7', title: 'Replace HVAC-DC-1 Filter', assignedTo: 'Data Center Ops', priority: 'Medium', equipmentId: 'hvac-dc-1', status: TaskStatus.ToDo, 
    dueDate: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Replace primary air filter for the main data center HVAC unit. Clean housing and check for any obstructions.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-8', title: 'Grease Tractor JD-7R', assignedTo: 'Farm Hand', priority: 'Low', equipmentId: 'tractor-jd-7r', status: TaskStatus.Done, 
    dueDate: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Perform routine lubrication of all grease points on Tractor JD-7R. Logged in vehicle maintenance record.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date(now.getTime() - 11 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.InProgress, date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() },
      { status: TaskStatus.Done, date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString() }
    ]
  },
  { 
    id: 't-9', title: 'Test Backup Generator H1', assignedTo: 'Facilities', priority: 'High', equipmentId: 'backup-gen-h1', status: TaskStatus.ToDo, 
    dueDate: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Perform weekly load test on hospital backup generator. Ensure automatic transfer switch is functioning correctly and log fuel levels.',
    statusHistory: [
      { status: TaskStatus.ToDo, date: new Date().toISOString() }
    ]
  },
];

export const INVENTORY: SparePart[] = [
  { id: 'sp-1', name: 'CNC Spindle Bearing', stock: 8, capacity: 15 },
  { id: 'sp-2', name: 'Conveyor Belt (10m)', stock: 3, capacity: 5 },
  { id: 'sp-3', name: 'Robot Servo Motor', stock: 2, capacity: 8 },
  { id: 'sp-4', name: 'Turbine Gearbox Oil (50L)', stock: 12, capacity: 20 },
  { id: 'sp-5', name: 'Transformer Bushing', stock: 6, capacity: 10 },
  { id: 'sp-6', name: 'Locomotive Brake Pad', stock: 32, capacity: 100 },
  { id: 'sp-7', name: 'Refrigerant R404a', stock: 22, capacity: 50 },
  { id: 'sp-8', name: 'MRI Gradient Coil', stock: 2, capacity: 5 },
  { id: 'sp-9', name: 'Server HDD (4TB SAS)', stock: 15, capacity: 40 },
  { id: 'sp-10', name: 'Tractor Fuel Injector', stock: 7, capacity: 12 },
];

export const RISKS: RiskEvent[] = [
    { id: 'r-1', name: 'Motor Burnout', probability: 'Medium', impact: 'High' },
    { id: 'r-2', name: 'Hydraulic Leak', probability: 'High', impact: 'High' },
    { id: 'r-3', name: 'Bearing Failure', probability: 'Medium', impact: 'Medium' },
    { id: 'r-4', name: 'Sensor Malfunction', probability: 'Low', impact: 'Medium' },
    { id: 'r-5', name: 'Control System Fault', probability: 'Low', impact: 'Low' },
    { id: 'r-6', name: 'Drive Belt Failure', probability: 'High', impact: 'Medium' },
];

export const PREDICTED_FAILURES: PredictedFailure[] = [
    { 
        id: 'pf-1', 
        equipmentId: 'robot-arm-7', 
        component: 'Joint 3 Servo Motor', 
        predictedFailureDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.96,
    },
    { 
        id: 'pf-2', 
        equipmentId: 'cnc-101', 
        component: 'Spindle Bearing', 
        predictedFailureDate: new Date(now.getTime() + 8 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.85,
    },
    { 
        id: 'pf-3', 
        equipmentId: 'wind-turbine-t8', 
        component: 'Gearbox Bearing', 
        predictedFailureDate: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.76,
    },
    { 
        id: 'pf-4', 
        equipmentId: 'water-pump-wp3', 
        component: 'Impeller Seal',
        predictedFailureDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.92
    },
    { 
        id: 'pf-5', 
        equipmentId: 'mri-alpha', 
        component: 'Helium Compressor',
        predictedFailureDate: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.65
    },
    { 
        id: 'pf-6', 
        equipmentId: 'hvac-dc-1', 
        component: 'Fan Motor Bearing',
        predictedFailureDate: new Date(now.getTime() + 11 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.81
    },
    { 
        id: 'pf-7', 
        equipmentId: 'cold-storage-cs1', 
        component: 'Compressor Unit',
        predictedFailureDate: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000).toISOString(),
        confidence: 0.78
    },
];