import React from 'react';
import type { MaintenanceTask } from '../types.ts';
import { TaskStatus } from '../types.ts';
import Modal from './Modal.tsx';
import Icon from './Icon.tsx';
import { ICONS } from '../constants.tsx';

interface TaskDetailModalProps {
    task: MaintenanceTask;
    onClose: () => void;
}

const priorityStyles = {
    High: 'bg-red-500/10 text-red-500 border border-red-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
    Low: 'bg-blue-500/10 text-blue-500 border border-blue-500/20',
};

const statusDotStyles = {
    [TaskStatus.ToDo]: 'bg-blue-500',
    [TaskStatus.InProgress]: 'bg-yellow-500',
    [TaskStatus.Done]: 'bg-green-500',
};

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ task, onClose }) => {
    return (
        <Modal isOpen={true} onClose={onClose} title={task.title}>
            <div className="space-y-6">
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 mr-2">Priority:</span>
                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${priorityStyles[task.priority]}`}>
                            {task.priority}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 mr-2">Assigned To:</span>
                        <span className="text-slate-800 dark:text-slate-100">{task.assignedTo}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="font-semibold text-slate-600 dark:text-slate-300 mr-2">Due Date:</span>
                        <span className="text-slate-800 dark:text-slate-100">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-2">Description</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{task.description}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-slate-700 dark:text-slate-200 mb-3">Status History</h3>
                    <div className="space-y-4">
                        {task.statusHistory.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((history, index) => (
                            <div key={index} className="flex items-center">
                                <div className="flex flex-col items-center mr-4">
                                    <span className={`w-3 h-3 rounded-full ${statusDotStyles[history.status]}`}></span>
                                    {index < task.statusHistory.length - 1 && <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>}
                                </div>
                                <div className="flex items-baseline gap-3">
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{history.status}</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">
                                        {new Date(history.date).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default TaskDetailModal;