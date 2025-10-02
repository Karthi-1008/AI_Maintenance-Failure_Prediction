import React from 'react';
import type { Equipment } from '../types.ts';
import { Status } from '../types.ts';
import Card from './Card.tsx';

interface EquipmentStatusProps {
    equipments: Equipment[];
}

const statusStyles: { [key in Status]: { bg: string; text: string; dot: string } } = {
    [Status.Healthy]: { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-500' },
    [Status.Warning]: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-500' },
    [Status.Critical]: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500' },
};

const EquipmentStatus: React.FC<EquipmentStatusProps> = ({ equipments }) => {
    return (
        <Card title="Overall Equipment Status">
            {equipments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {equipments.map((equipment) => {
                        const styles = statusStyles[equipment.status];
                        return (
                            <div key={equipment.id} className={`${styles.bg} p-4 rounded-lg border border-slate-200/20 dark:border-slate-700/50 flex flex-col justify-between`}>
                                <div>
                                    <h4 className="font-semibold text-slate-700 dark:text-slate-200 truncate">{equipment.name}</h4>
                                    <div className="flex items-center mt-2">
                                        <span className={`w-3 h-3 rounded-full ${styles.dot} mr-2`}></span>
                                        <span className={`font-semibold ${styles.text}`}>{equipment.status}</span>
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 mt-4 space-y-1">
                                    <div className="flex justify-between">
                                        <span>Uptime:</span>
                                        <span className="font-medium text-slate-600 dark:text-slate-300">{equipment.uptime} hrs</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>OEE:</span>
                                        <span className="font-medium text-slate-600 dark:text-slate-300">{(equipment.oee * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>MTBF:</span>
                                        <span className="font-medium text-slate-600 dark:text-slate-300">{equipment.mtbf} hrs</span>
                                    </div>
                                    <div className="flex justify-between pt-1 border-t border-slate-200/20 dark:border-slate-700/50 mt-2">
                                        <span>Last Check:</span>
                                        <span className="font-medium text-slate-600 dark:text-slate-300">{new Date(equipment.lastMaintenance).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                 <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400 py-10">
                    <p>No equipment to display for this industry.</p>
                </div>
            )}
        </Card>
    );
};

export default EquipmentStatus;