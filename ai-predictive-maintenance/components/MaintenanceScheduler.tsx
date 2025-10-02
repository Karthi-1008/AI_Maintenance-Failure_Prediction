
import React, { useState } from 'react';
import { TASKS, ICONS } from '../constants.tsx';
import { TaskStatus, MaintenanceTask } from '../types.ts';
import Card from './Card.tsx';
import Icon from './Icon.tsx';
import TaskDetailModal from './TaskDetailModal.tsx';

const priorityStyles = {
    High: 'border-l-red-500',
    Medium: 'border-l-yellow-500',
    Low: 'border-l-blue-500',
};

const columnStyles = {
    [TaskStatus.ToDo]: 'bg-blue-500/10',
    [TaskStatus.InProgress]: 'bg-yellow-500/10',
    [TaskStatus.Done]: 'bg-green-500/10',
};

const MaintenanceScheduler: React.FC = () => {
    const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);

    const columns = Object.values(TaskStatus).map(status => ({
        status,
        tasks: TASKS.filter(task => task.status === status),
    }));

    return (
        <Card title="Maintenance Scheduler">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
                {columns.map(({ status, tasks }) => (
                    <div key={status} className={`p-3 rounded-lg ${columnStyles[status]}`}>
                        <h4 className="font-semibold mb-3 text-slate-700 dark:text-slate-200">{status}</h4>
                        <div className="space-y-3">
                            {tasks.map(task => (
                                <button 
                                    key={task.id}
                                    onClick={() => setSelectedTask(task)}
                                    className={`
                                        w-full text-left bg-white dark:bg-slate-800 
                                        p-3 rounded-md shadow-sm border border-slate-200 dark:border-slate-700
                                        border-l-4 ${priorityStyles[task.priority]}
                                        transition-all duration-200 hover:shadow-md hover:scale-[1.03] cursor-pointer
                                    `}
                                >
                                    <p className="font-medium text-sm text-slate-800 dark:text-slate-100">{task.title}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{task.assignedTo}</p>
                                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-2">
                                       <Icon className="w-4 h-4 mr-1 flex-shrink-0">{ICONS.CALENDAR}</Icon>
                                       <span className="truncate min-w-0">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedTask && (
                <TaskDetailModal 
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}
        </Card>
    );
};

export default MaintenanceScheduler;