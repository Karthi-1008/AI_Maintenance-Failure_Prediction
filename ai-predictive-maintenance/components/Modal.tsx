import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { ICONS } from '../constants.tsx';
import Icon from './Icon.tsx';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div 
                className="bg-slate-50 dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-lg m-4 border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
                <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                    <h2 id="modal-title" className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        aria-label="Close modal"
                    >
                        <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400">{ICONS.X}</Icon>
                    </button>
                </header>
                <main className="p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>,
        document.body
    );
};

export default Modal;