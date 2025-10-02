import React, { useState, useMemo } from 'react';
import type { Equipment } from '../types.ts';
import { Status } from '../types.ts';

interface SidebarProps {
    equipments: Equipment[];
    selectedEquipmentId: string | undefined;
    setSelectedEquipmentId: (id: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const statusIndicatorColor = {
    [Status.Healthy]: 'bg-green-500',
    [Status.Warning]: 'bg-yellow-500',
    [Status.Critical]: 'bg-red-500',
};

const Sidebar: React.FC<SidebarProps> = ({ equipments, selectedEquipmentId, setSelectedEquipmentId, isOpen, setIsOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredEquipments = useMemo(() => {
        return equipments.filter(eq => eq.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [equipments, searchTerm]);
    
    const handleSelect = (id: string) => {
      setSelectedEquipmentId(id);
      if (window.innerWidth < 768) {
          setIsOpen(false);
      }
    };

    return (
        <>
            <div className={`
                fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden 
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `} onClick={() => setIsOpen(false)}></div>
            <aside className={`
                absolute md:relative z-40 flex-shrink-0 w-64 bg-white dark:bg-slate-800/50 
                border-r border-slate-200 dark:border-slate-700/50
                flex flex-col h-full transition-transform
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
            `}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                    <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-slate-100">
                        <span className="text-sky-500">AI</span>-Maintain
                    </h2>
                </div>
                 <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                    <input
                        type="text"
                        placeholder="Search equipment..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <h3 className="px-2 text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                        Equipment
                    </h3>
                    {filteredEquipments.length > 0 ? (
                        <ul>
                            {filteredEquipments.map(eq => (
                                <li key={eq.id}>
                                    <button
                                        onClick={() => handleSelect(eq.id)}
                                        className={`
                                            w-full text-left flex items-center px-3 py-2 rounded-md transition-colors
                                            ${selectedEquipmentId === eq.id
                                                ? 'bg-sky-500/10 text-sky-500 dark:text-sky-400 font-semibold'
                                                : 'hover:bg-slate-100 dark:hover:bg-slate-700/50'
                                            }
                                        `}
                                    >
                                        <span className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 ${statusIndicatorColor[eq.status]}`}></span>
                                        <div className="flex-1 truncate">
                                            <span className="text-sm">{eq.name}</span>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Uptime: {eq.uptime} hrs</p>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-3 py-2 text-sm text-center text-slate-500 dark:text-slate-400">
                            No equipment found for this industry.
                        </div>
                    )}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 text-center text-xs text-slate-500 dark:text-slate-400">
                    <p>&copy; 2024 AI-Maintain Corp.</p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;