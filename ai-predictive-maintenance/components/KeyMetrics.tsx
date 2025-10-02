
import React from 'react';
import type { Equipment } from '../types.ts';
import Card from './Card.tsx';

const RadialProgress: React.FC<{ progress: number }> = ({ progress }) => {
    const strokeWidth = 10;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    const getColor = (p: number) => {
        if (p < 0.7) return 'stroke-red-500';
        if (p < 0.85) return 'stroke-yellow-500';
        return 'stroke-green-500';
    };

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-slate-200 dark:text-slate-700"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`${getColor(progress)} transition-all duration-500`}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <span className="absolute text-2xl font-bold text-slate-800 dark:text-slate-100">
                {(progress * 100).toFixed(0)}%
            </span>
        </div>
    );
};

const KeyMetrics: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
    return (
        <Card title="Key Metrics" className="h-full">
            <div className="flex flex-col items-center justify-around h-full text-center">
                <div>
                    <h4 className="text-sm text-slate-500 dark:text-slate-400">OEE</h4>
                    <RadialProgress progress={equipment.oee} />
                </div>
                <div className="w-full pt-4 mt-4 border-t border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm text-slate-500 dark:text-slate-400">Current Load</h4>
                    <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                        {equipment.currentLoad}%
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default KeyMetrics;