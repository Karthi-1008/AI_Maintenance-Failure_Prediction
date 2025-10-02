import React from 'react';
import { INDUSTRIES } from '../constants.tsx';
import type { Industry } from '../types.ts';
import Icon from './Icon.tsx';

interface IndustryTabsProps {
    selectedIndustry: Industry;
    setSelectedIndustry: (industry: Industry) => void;
}

const IndustryTabs: React.FC<IndustryTabsProps> = ({ selectedIndustry, setSelectedIndustry }) => {
    return (
        <nav className="border-b border-slate-200 dark:border-slate-700/50">
            <div className="flex space-x-1 overflow-x-auto pb-2 -mb-px">
                {INDUSTRIES.map(industry => (
                    <button
                        key={industry.id}
                        onClick={() => setSelectedIndustry(industry.id)}
                        className={`
                            flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md
                            transition-colors duration-200 whitespace-nowrap
                            ${
                                selectedIndustry === industry.id
                                    ? 'bg-sky-500/10 text-sky-500 dark:text-sky-400'
                                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }
                        `}
                        aria-current={selectedIndustry === industry.id ? 'page' : undefined}
                    >
                        <Icon className="w-5 h-5">{industry.icon}</Icon>
                        <span className="hidden sm:inline">{industry.name}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default IndustryTabs;
