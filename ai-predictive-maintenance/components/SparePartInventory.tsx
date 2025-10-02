
import React from 'react';
import { INVENTORY } from '../constants.tsx';
import Card from './Card.tsx';

const getBarColor = (stock: number, capacity: number) => {
    const percentage = (stock / capacity);
    if (percentage < 0.25) return 'bg-red-500';
    if (percentage < 0.50) return 'bg-yellow-500';
    return 'bg-green-500';
};

const SparePartInventory: React.FC = () => {
    return (
        <Card title="Spare Part Inventory" className="h-full">
           <div className="space-y-4">
               {INVENTORY.map(part => {
                   const percentage = (part.stock / part.capacity) * 100;
                   return (
                       <div key={part.id}>
                           <div className="flex justify-between items-baseline mb-1">
                               <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{part.name}</span>
                               <div className="text-xs">
                                   <span className="font-bold text-slate-800 dark:text-slate-100">{part.stock}</span>
                                   <span className="text-slate-500 dark:text-slate-400"> / {part.capacity}</span>
                               </div>
                           </div>
                           <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                               <div 
                                   className={`${getBarColor(part.stock, part.capacity)} h-2.5 rounded-full transition-all duration-500`} 
                                   style={{ width: `${percentage}%` }}
                               ></div>
                           </div>
                           {percentage < 25 && (
                               <p className="text-right text-xs mt-1 text-red-500 font-semibold">Re-order</p>
                           )}
                       </div>
                   )
               })}
           </div>
        </Card>
    );
};

export default SparePartInventory;