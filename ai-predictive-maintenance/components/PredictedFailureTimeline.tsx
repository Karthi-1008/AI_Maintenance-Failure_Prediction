
import React from 'react';
import { PREDICTED_FAILURES, ICONS } from '../constants.tsx';
import type { Equipment } from '../types.ts';
import Card from './Card.tsx';
import Icon from './Icon.tsx';

const PredictedFailureTimeline: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
    const relevantFailures = PREDICTED_FAILURES
        .filter(f => f.equipmentId === equipment.id)
        .sort((a, b) => new Date(a.predictedFailureDate).getTime() - new Date(b.predictedFailureDate).getTime());

    const getConfidenceColor = (confidence: number) => {
        if (confidence > 0.9) return 'bg-red-500';
        if (confidence > 0.75) return 'bg-orange-500';
        return 'bg-yellow-500';
    };
    
    const timeUntil = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 3600 * 24));
        if (diffDays <= 0) return { text: 'Imminent', days: 0 };
        return { text: `in ${diffDays} day(s)`, days: diffDays };
    };

    const getSeverityIcon = (days: number, confidence: number) => {
        if (days < 5 && confidence > 0.9) return <Icon className="w-5 h-5 text-red-500">{ICONS.ALERT_TRIANGLE}</Icon>;
        if (days < 10 && confidence > 0.75) return <Icon className="w-5 h-5 text-orange-500">{ICONS.ALERT_TRIANGLE}</Icon>;
        return <Icon className="w-5 h-5 text-yellow-500">{ICONS.ALERT_TRIANGLE}</Icon>;
    }

    return (
        <Card title="Predicted Failure Timeline" className="h-full">
            {relevantFailures.length > 0 ? (
                 <div className="space-y-4">
                    {relevantFailures.map(failure => {
                        const { text, days } = timeUntil(failure.predictedFailureDate);
                        return (
                            <div key={failure.id} className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    {getSeverityIcon(days, failure.confidence)}
                                </div>
                               <div className="flex-1">
                                    <div className="flex justify-between items-baseline">
                                         <p className="font-semibold text-slate-800 dark:text-slate-100">{failure.component}</p>
                                          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
                                            {new Date(failure.predictedFailureDate).toLocaleDateString()}
                                            <span className="font-sans font-bold text-amber-500 ml-2">({text})</span>
                                          </p>
                                    </div>
                                    <div className="mt-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                                        <div 
                                            className={`${getConfidenceColor(failure.confidence)} h-2.5 rounded-full`} 
                                            style={{ width: `${failure.confidence * 100}%` }}
                                            title={`Confidence: ${Math.round(failure.confidence * 100)}%`}
                                        ></div>
                                    </div>
                                    <p className="text-right text-xs mt-1 text-slate-500 dark:text-slate-400">
                                        Confidence: <span className="font-bold">{Math.round(failure.confidence * 100)}%</span>
                                    </p>
                               </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
                    <p>No predicted failures for this equipment.</p>
                </div>
            )}
        </Card>
    );
};

export default PredictedFailureTimeline;