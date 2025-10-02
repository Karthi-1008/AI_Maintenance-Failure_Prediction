

import React from 'react';
import type { Equipment } from '../types.ts';
import EquipmentStatus from './EquipmentStatus.tsx';
import VibrationAnomalyDetector from './VibrationAnomalyDetector.tsx';
import ThermalImageClassifier from './ThermalImageClassifier.tsx';
import MaintenanceScheduler from './MaintenanceScheduler.tsx';
import SparePartInventory from './SparePartInventory.tsx';
import FailureSimulation from './FailureSimulation.tsx';

interface DashboardProps {
    selectedEquipment: Equipment;
    // FIX: Add equipments prop to be passed to EquipmentStatus component.
    equipments: Equipment[];
}

const Dashboard: React.FC<DashboardProps> = ({ selectedEquipment, equipments }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-3 xl:col-span-4">
                {/* FIX: Pass 'equipments' prop to EquipmentStatus to fix missing property error. */}
                <EquipmentStatus equipments={equipments} />
            </div>
            <div className="lg:col-span-2 xl:col-span-2">
                <VibrationAnomalyDetector equipment={selectedEquipment} />
            </div>
            <div className="lg:col-span-1 xl:col-span-2">
                <ThermalImageClassifier equipment={selectedEquipment} />
            </div>
            <div className="lg:col-span-3 xl:col-span-2">
                <MaintenanceScheduler />
            </div>
            <div className="lg:col-span-2 xl:col-span-1">
                 <SparePartInventory />
            </div>
             <div className="lg:col-span-1 xl:col-span-1">
                <FailureSimulation />
            </div>
        </div>
    );
};

export default Dashboard;