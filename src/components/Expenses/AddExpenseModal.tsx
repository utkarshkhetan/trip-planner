import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AddExpenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (expense: any) => Promise<void>;
}

const USERS = ['Utkarsh', 'Adarsh', 'Anvita', 'Shubhika', 'Vashnav', 'Himanshu'];

export const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState('Utkarsh');
    const [splitBetween, setSplitBetween] = useState<string[]>(USERS);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!description || !amount) return;

        setIsSubmitting(true);
        try {
            await onAdd({
                description,
                amount: parseFloat(amount),
                paidBy,
                splitBetween,
                date: Date.now(),
                type: 'expense'
            });
            onClose();
            // Reset form
            setDescription('');
            setAmount('');
            setPaidBy('Utkarsh');
            setSplitBetween(USERS);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const toggleSplitUser = (user: string) => {
        if (splitBetween.includes(user)) {
            if (splitBetween.length > 1) {
                setSplitBetween(splitBetween.filter(u => u !== user));
            }
        } else {
            setSplitBetween([...splitBetween, user]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.95 }}
                        className="fixed inset-x-4 bottom-4 top-20 z-50 bg-[#1a1b26] rounded-2xl border border-white/10 overflow-hidden flex flex-col"
                    >
                        <div className="p-4 border-b border-white/10 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-white">Add Expense</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="e.g. Dinner at Tacos"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                        autoFocus
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-1">Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            step="0.01"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">Paid By</label>
                                    <div className="flex flex-wrap gap-2">
                                        {USERS.map(user => (
                                            <button
                                                key={user}
                                                type="button"
                                                onClick={() => setPaidBy(user)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border",
                                                    paidBy === user
                                                        ? "bg-primary border-primary text-white"
                                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                                )}
                                            >
                                                {user}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-gray-400 mb-2">Split Between</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {USERS.map(user => (
                                            <button
                                                key={user}
                                                type="button"
                                                onClick={() => toggleSplitUser(user)}
                                                className={cn(
                                                    "flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors border",
                                                    splitBetween.includes(user)
                                                        ? "bg-primary/20 border-primary/50 text-white"
                                                        : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                                )}
                                            >
                                                {user}
                                                {splitBetween.includes(user) && <Check size={14} className="text-primary" />}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 text-center">
                                        ${amount ? (parseFloat(amount) / splitBetween.length).toFixed(2) : '0.00'} / person
                                    </p>
                                </div>
                            </form>
                        </div>

                        <div className="p-4 border-t border-white/10 bg-[#1a1b26]">
                            <button
                                onClick={handleSubmit}
                                disabled={!description || !amount || isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Expense'}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
