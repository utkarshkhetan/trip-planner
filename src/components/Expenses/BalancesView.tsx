import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Balance } from '../../types';
import { cn } from '../../lib/utils';

interface BalancesViewProps {
    balances: Balance[];
    onSettleUp: (from: string, to: string, amount: number) => void;
}

export const BalancesView: React.FC<BalancesViewProps> = ({ balances, onSettleUp }) => {
    const [settleModalOpen, setSettleModalOpen] = useState(false);
    const [selectedDebtor, setSelectedDebtor] = useState<string | null>(null);
    const [selectedCreditor, setSelectedCreditor] = useState<string | null>(null);

    const owedMoney = balances.filter(b => b.amount > 0).sort((a, b) => b.amount - a.amount);
    const owesMoney = balances.filter(b => b.amount < 0).sort((a, b) => a.amount - b.amount);

    const handleSettleClick = (debtor: string) => {
        setSelectedDebtor(debtor);
        // Default to top creditor
        if (owedMoney.length > 0) {
            setSelectedCreditor(owedMoney[0].user);
        }
        setSettleModalOpen(true);
    };

    const confirmSettle = () => {
        if (selectedDebtor && selectedCreditor) {
            // Find amount
            const debtorBalance = balances.find(b => b.user === selectedDebtor);
            const amount = debtorBalance ? Math.abs(debtorBalance.amount) : 0;

            // Allow partial? For now, just full settle of what they owe (or what creditor is owed, whichever is less)
            // But to keep it simple, let's just settle $10 or something? No, let's settle the full debt amount.
            onSettleUp(selectedDebtor, selectedCreditor, amount);
            setSettleModalOpen(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                    <h3 className="text-green-400 text-sm font-medium mb-2">Owed Money</h3>
                    {owedMoney.length === 0 ? (
                        <p className="text-gray-500 text-xs">No one is owed money.</p>
                    ) : (
                        <div className="space-y-2">
                            {owedMoney.map(b => (
                                <div key={b.user} className="flex justify-between items-center">
                                    <span className="text-white text-sm">{b.user}</span>
                                    <span className="text-green-400 font-bold text-sm">+${b.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                    <h3 className="text-red-400 text-sm font-medium mb-2">Owes Money</h3>
                    {owesMoney.length === 0 ? (
                        <p className="text-gray-500 text-xs">No one owes money.</p>
                    ) : (
                        <div className="space-y-2">
                            {owesMoney.map(b => (
                                <div key={b.user} className="flex justify-between items-center">
                                    <span className="text-white text-sm">{b.user}</span>
                                    <span className="text-red-400 font-bold text-sm">${b.amount.toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Suggested Settlements */}
            {owesMoney.length > 0 && owedMoney.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <h3 className="text-white font-medium mb-4">Suggested Settlements</h3>
                    <div className="space-y-3">
                        {owesMoney.map(debtor => (
                            <div key={debtor.user} className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-300 font-medium">{debtor.user}</span>
                                    <span className="text-gray-500 text-xs">owes</span>
                                    <span className="text-white font-bold">${Math.abs(debtor.amount).toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => handleSettleClick(debtor.user)}
                                    className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 text-xs font-bold rounded-lg transition-colors"
                                >
                                    Settle
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Simple Settle Modal */}
            <AnimatePresence>
                {settleModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSettleModalOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[#1a1b26] p-6 rounded-2xl border border-white/10 w-80"
                        >
                            <h3 className="text-lg font-bold text-white mb-4">Settle Up</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {selectedDebtor} pays {selectedCreditor}
                            </p>

                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-400 mb-2">Pay To</label>
                                <div className="flex flex-wrap gap-2">
                                    {owedMoney.map(creditor => (
                                        <button
                                            key={creditor.user}
                                            onClick={() => setSelectedCreditor(creditor.user)}
                                            className={cn(
                                                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border",
                                                selectedCreditor === creditor.user
                                                    ? "bg-green-500/20 border-green-500 text-green-400"
                                                    : "bg-white/5 border-white/10 text-gray-400"
                                            )}
                                        >
                                            {creditor.user}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setSettleModalOpen(false)}
                                    className="flex-1 py-2 rounded-xl bg-white/5 text-gray-400 font-medium hover:bg-white/10"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSettle}
                                    className="flex-1 py-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};
