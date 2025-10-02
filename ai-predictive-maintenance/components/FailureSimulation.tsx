
import React from 'react';
import { RISKS } from '../constants.tsx';
import Card from './Card.tsx';

const probabilityMap = { 'Low': 1, 'Medium': 2, 'High': 3 };
const impactMap = { 'Low': 1, 'Medium': 2, 'High': 3 };

const getColor = (probability: 'Low' | 'Medium' | 'High', impact: 'Low' | 'Medium' | 'High') => {
    const score = probabilityMap[probability] * impactMap[impact];
    if (score <= 2) return 'bg-green-500/50 hover:bg-green-500/70';
    if (score <= 4) return 'bg-yellow-500/50 hover:bg-yellow-500/70';
    if (score <= 6) return 'bg-orange-500/50 hover:bg-orange-500/70';
    return 'bg-red-500/50 hover:bg-red-500/70';
};

const FailureSimulation: React.FC = () => {
    return (
        <Card title="Failure Simulation" className="h-full">
            <div className="flex flex-col h-full">
                <div className="grid grid-cols-[auto,1fr,1fr,1fr] gap-1 text-center text-xs font-bold text-slate-400">
                    <div className="[writing-mode:vertical-rl] rotate-180 row-span-2 flex items-center justify-center text-xs font-bold text-slate-400">Impact</div>
                    <div>Low</div>
                    <div>Medium</div>
                    <div>High</div>
                </div>
                <div className="grid grid-cols-[auto,1fr,1fr,1fr] grid-rows-3 flex-1 gap-1 mt-1">
                    <div className="flex flex-col justify-around text-xs font-bold text-slate-400 text-right pr-2">
                        <span>High</span>
                        <span>Medium</span>
                        <span>Low</span>
                    </div>
                    
                    {['High', 'Medium', 'Low'].map(impact => (
                        <React.Fragment key={impact}>
                            {['Low', 'Medium', 'High'].map(probability => (
                                <div
                                    key={`${impact}-${probability}`}
                                    className={`
                                        ${getColor(probability as any, impact as any)} 
                                        rounded-sm min-h-[60px] p-1 flex items-center justify-center
                                        transition-colors duration-200
                                    `}
                                >
                                    <div className="text-center">
                                    {RISKS.filter(r => r.impact === impact && r.probability === probability).map(risk => (
                                        <p key={risk.id} className="text-xs text-slate-900 dark:text-slate-100 font-medium">
                                            {risk.name}
                                        </p>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
                 <div className="text-center text-xs font-bold text-slate-400 mt-2 col-start-2 col-span-3">Probability</div>
            </div>
        </Card>
    );
};

export default FailureSimulation;