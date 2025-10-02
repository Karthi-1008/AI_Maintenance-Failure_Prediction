import React from 'react';
import type { Equipment } from '../types.ts';
import SparePartInventory from './SparePartInventory.tsx';
import FailureSimulation from './FailureSimulation.tsx';
import PredictedFailureTimeline from './PredictedFailureTimeline.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';

interface DashboardProps {
    selectedEquipment: Equipment | undefined;
}

const FailurePredictionDashboard: React.FC<DashboardProps> = ({ selectedEquipment }) => {
     if (!selectedEquipment) {
        return (
            <div className="flex items-center justify-center h-full">
                 <div className="text-center">
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Select an asset from the sidebar</h3>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">Choose an equipment to view its failure prediction dashboard.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-full">
            <div className="lg:col-span-2">
                <ErrorBoundary>
                    <PredictedFailureTimeline equipment={selectedEquipment} />
                </ErrorBoundary>
            </div>
            <div className="flex flex-col gap-4 md:gap-6">
                <ErrorBoundary>
                    <FailureSimulation />
                </ErrorBoundary>
                <ErrorBoundary>
                    <SparePartInventory />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default FailurePredictionDashboard;