
import React from 'react';

interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`
                px-4 py-2 -mb-px text-sm font-medium border-b-2
                transition-colors duration-200
                ${
                    isActive
                        ? 'border-sky-500 text-sky-500'
                        : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }
            `}
            aria-current={isActive ? 'page' : undefined}
        >
            {label}
        </button>
    );
};

export default TabButton;
