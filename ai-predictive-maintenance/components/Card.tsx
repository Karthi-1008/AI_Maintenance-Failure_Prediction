
import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
    return (
        <div className={`
            bg-white dark:bg-slate-800/50 
            border border-slate-200 dark:border-slate-700/50
            rounded-lg shadow-sm 
            flex flex-col
            ${className}
        `}>
            <div className="p-4 border-b border-slate-200 dark:border-slate-700/50">
                <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{title}</h3>
            </div>
            <div className="p-4 flex-1">
                {children}
            </div>
        </div>
    );
};

export default Card;
