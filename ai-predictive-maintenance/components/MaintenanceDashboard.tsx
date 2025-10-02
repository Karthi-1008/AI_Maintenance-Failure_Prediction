import React from 'react';
import type { Equipment } from '../types.ts';
import EquipmentStatus from './EquipmentStatus.tsx';
import ThermalImageClassifier from './ThermalImageClassifier.tsx';
import MaintenanceScheduler from './MaintenanceScheduler.tsx';
import KeyMetrics from './KeyMetrics.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

interface DashboardProps {
    selectedEquipment: Equipment | undefined;
    equipments: Equipment[];
}

const MaintenanceDashboard: React.FC<DashboardProps> = ({ selectedEquipment, equipments }) => {
    if (!selectedEquipment) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
                        {equipments.length > 0 ? "Select an asset from the sidebar" : "No assets in this industry"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">
                        {equipments.length > 0 ? "Choose an equipment to view its maintenance dashboard." : "Please select another industry category."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            <div className="lg:col-span-3 xl:col-span-4">
                <EquipmentStatus equipments={equipments} />
            </div>
            
            <div className="lg:col-span-1 xl:col-span-2">
                <ErrorBoundary>
                    <KeyMetrics equipment={selectedEquipment} />
                </ErrorBoundary>
            </div>
            
            <div className="lg:col-span-2 xl:col-span-2">
                <ErrorBoundary>
                    <ThermalImageClassifier equipment={selectedEquipment} />
                </ErrorBoundary>
            </div>
            
            <div className="lg:col-span-3 xl:col-span-4">
                <ErrorBoundary>
                    <MaintenanceScheduler />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default MaintenanceDashboard;