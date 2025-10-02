import React, { useState, useEffect, useMemo } from 'react';
import { ICONS } from '../constants.tsx';
import Icon from './Icon.tsx';
import type { Equipment } from '../types.ts';
import { Status } from '../types.ts';

interface HeaderProps {
    theme: 'dark' | 'light';
    toggleTheme: () => void;
    selectedEquipment: Equipment | undefined;
    toggleSidebar: () => void;
    equipments: Equipment[];
}

const getOverallStatus = (equipments: Equipment[]): { status: Status, message: string } => {
    if (equipments.length === 0) {
        return { status: Status.Healthy, message: 'No Equipment' };
    }
    if (equipments.some(e => e.status === Status.Critical)) {
        return { status: Status.Critical, message: 'Critical Alert' };
    }
    if (equipments.some(e => e.status === Status.Warning)) {
        return { status: Status.Warning, message: 'Minor Warnings' };
    }
    return { status: Status.Healthy, message: 'All Systems Operational' };
};

const statusIndicatorColor = {
    [Status.Healthy]: 'bg-green-500',
    [Status.Warning]: 'bg-yellow-500',
    [Status.Critical]: 'bg-red-500',
};
const statusTextColor = {
    [Status.Healthy]: 'text-green-400',
    [Status.Warning]: 'text-yellow-400',
    [Status.Critical]: 'text-red-400',
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, selectedEquipment, toggleSidebar, equipments }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    const overallStatus = useMemo(() => getOverallStatus(equipments), [equipments]);

    return (
        <header className="flex-shrink-0 bg-white dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50 p-4 flex justify-between items-center">
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="md:hidden mr-4 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                    aria-label="Toggle sidebar"
                >
                    <Icon>{ICONS.MENU}</Icon>
                </button>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block truncate">
                    {selectedEquipment ? selectedEquipment.name : 'Dashboard'}
                </h1>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="hidden lg:flex items-center space-x-2">
                    <span className={`w-3 h-3 rounded-full ${statusIndicatorColor[overallStatus.status]}`}></span>
                    <span className={`text-sm font-semibold ${statusTextColor[overallStatus.status]}`}>{overallStatus.message}</span>
                </div>
                <div className="hidden sm:block font-mono text-lg text-slate-600 dark:text-slate-300">
                    {time.toLocaleTimeString()}
                </div>
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                    <Icon>{theme === 'dark' ? ICONS.SUN : ICONS.MOON}</Icon>
                </button>
                <img
                    src="https://picsum.photos/seed/user/40/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600"
                />
            </div>
        </header>
    );
};

export default Header;