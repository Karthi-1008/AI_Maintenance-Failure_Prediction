import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { EQUIPMENTS, INDUSTRIES } from './constants.tsx';
import type { Equipment } from './types.ts';
import { Industry } from './types.ts';
import Header from './components/Header.tsx';
import Sidebar from './components/Sidebar.tsx';
import MaintenanceDashboard from './components/MaintenanceDashboard.tsx';
import FailurePredictionDashboard from './components/FailurePredictionDashboard.tsx';
import TabButton from './components/TabButton.tsx';
import IndustryTabs from './components/IndustryTabs.tsx';

type Tab = 'maintenance' | 'prediction';

const App: React.FC = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [selectedIndustry, setSelectedIndustry] = useState<Industry>(INDUSTRIES[0].id);
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | undefined>(undefined);
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<Tab>('maintenance');

    const equipmentsForIndustry = useMemo(() => {
        return EQUIPMENTS.filter(eq => eq.industry === selectedIndustry);
    }, [selectedIndustry]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'dark' ? 'light' : 'dark');
        root.classList.add(theme);
    }, [theme]);
    
    useEffect(() => {
        // When industry changes, select the first equipment in that industry
        setSelectedEquipmentId(equipmentsForIndustry[0]?.id);
    }, [selectedIndustry]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const selectedEquipment = useMemo(() => {
        return EQUIPMENTS.find(eq => eq.id === selectedEquipmentId);
    }, [selectedEquipmentId]);

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 overflow-hidden">
            <Sidebar 
                equipments={equipmentsForIndustry} 
                selectedEquipmentId={selectedEquipmentId} 
                setSelectedEquipmentId={setSelectedEquipmentId}
                isOpen={isSidebarOpen}
                setIsOpen={setSidebarOpen}
            />
            <div className="flex-1 flex flex-col h-screen">
                <Header 
                    theme={theme} 
                    toggleTheme={toggleTheme} 
                    selectedEquipment={selectedEquipment} 
                    toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
                    equipments={equipmentsForIndustry}
                />
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 flex flex-col">
                    <div className="flex-shrink-0 mb-6">
                        <IndustryTabs 
                            selectedIndustry={selectedIndustry}
                            setSelectedIndustry={setSelectedIndustry}
                        />
                    </div>
                    <div className="border-b border-slate-200 dark:border-slate-700/50 mb-6">
                        <nav className="flex space-x-2">
                            <TabButton
                                label="AI Maintenance"
                                isActive={activeTab === 'maintenance'}
                                onClick={() => setActiveTab('maintenance')}
                            />
                            <TabButton
                                label="AI Failure Prediction"
                                isActive={activeTab === 'prediction'}
                                onClick={() => setActiveTab('prediction')}
                            />
                        </nav>
                    </div>
                    <div className="flex-1">
                        {activeTab === 'maintenance' && 
                            <MaintenanceDashboard 
                                selectedEquipment={selectedEquipment} 
                                equipments={equipmentsForIndustry} 
                            />
                        }
                        {activeTab === 'prediction' && 
                            <FailurePredictionDashboard 
                                selectedEquipment={selectedEquipment} 
                            />
                        }
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;