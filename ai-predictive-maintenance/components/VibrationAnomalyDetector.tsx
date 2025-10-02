import React, { useState, useEffect } from 'react';
import type { Equipment } from '../types.ts';
import { Status } from '../types.ts';
import Card from './Card.tsx';

const statusColors = {
    [Status.Healthy]: '#22c55e', // green-500
    [Status.Warning]: '#f59e0b', // amber-500
    [Status.Critical]: '#ef4444', // red-500
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-700 text-white p-2 border border-slate-600 rounded-md text-sm">
                <p>{`Time: ${label}`}</p>
                <p className="font-bold">{`Amplitude: ${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};

const VibrationAnomalyDetector: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
    const [chartStatus, setChartStatus] = useState<'loading' | 'ready' | 'error'>('loading');
    const [data, setData] = useState<{ time: number; amplitude: number }[]>([]);

    useEffect(() => {
        // Poll to check if Recharts is loaded from the CDN
        let attempts = 0;
        const maxAttempts = 50; // Wait for 5 seconds
        
        const interval = setInterval(() => {
            attempts++;
            if ((window as any).Recharts) {
                setChartStatus('ready');
                clearInterval(interval);
            } else if (attempts > maxAttempts) {
                console.error("Failed to load Recharts library from CDN after 5 seconds.");
                setChartStatus('error');
                clearInterval(interval);
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (chartStatus !== 'ready') return;

        const initialData = equipment.vibration.map((amp, i) => ({ time: i, amplitude: amp }));
        setData(initialData);

        const interval = setInterval(() => {
            setData(prevData => {
                const newData = prevData.slice(1);
                const lastPoint = newData[newData.length - 1] || { time: 0 };
                let newAmplitude;
                switch(equipment.status) {
                    case Status.Warning:
                        newAmplitude = Math.random() * 2 + 1;
                        break;
                    case Status.Critical:
                        newAmplitude = Math.random() * 4 + 2;
                        break;
                    default:
                        newAmplitude = Math.random() * 0.5 + 1;
                }
                newData.push({ time: lastPoint.time + 1, amplitude: newAmplitude });
                return newData;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [equipment, chartStatus]);

    const renderContent = () => {
        switch (chartStatus) {
            case 'loading':
                return (
                    <div className="w-full h-full p-4 flex flex-col justify-end animate-pulse" aria-label="Loading chart data">
                        <div className="flex items-end justify-between h-full space-x-2">
                           <div className="w-full h-1/4 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-2/4 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-1/3 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-3/4 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-1/2 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-2/3 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-1/4 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-1/2 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-3/5 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                           <div className="w-full h-2/5 bg-slate-200 dark:bg-slate-700 rounded-t-sm"></div>
                        </div>
                         <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-sm mt-2"></div>
                    </div>
                );
            case 'error':
                return (
                    <div className="flex items-center justify-center h-full text-red-400">
                        <p>Error: Chart could not be loaded.</p>
                    </div>
                );
            case 'ready':
                const { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } = (window as any).Recharts;
                return (
                    <ResponsiveContainer>
                        <LineChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                            <XAxis dataKey="time" tick={false} axisLine={false} />
                            <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Line
                                type="monotone"
                                dataKey="amplitude"
                                stroke={statusColors[equipment.status]}
                                strokeWidth={2}
                                dot={false}
                                isAnimationActive={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );
        }
    };

    return (
        <Card title="Vibration Anomaly Detector">
            <div style={{ width: '100%', height: 250 }}>
                {renderContent()}
            </div>
        </Card>
    );
};

export default VibrationAnomalyDetector;
