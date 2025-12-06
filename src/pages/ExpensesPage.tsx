import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ExpensesList } from '../components/Expenses/ExpensesList';
import { BalancesView } from '../components/Expenses/BalancesView';
import { AddExpenseModal } from '../components/Expenses/AddExpenseModal';
import { useExpenses } from '../hooks/useExpenses';
import { cn } from '../lib/utils';

export const ExpensesPage: React.FC = () => {
    const [view, setView] = useState<'expenses' | 'balances'>('expenses');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const { expenses, balances, loading, addExpense, settleUp } = useExpenses();

    return (
        <motion.div
            className="pt-6 px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="mb-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent text-center mt-4">
                    Splitwise
                </h1>

                {/* Toggle Switch */}
                <div className="bg-white/5 p-1 rounded-full flex relative w-64 border border-white/10 mb-6">
                    <motion.div
                        className="absolute top-1 bottom-1 rounded-full bg-primary shadow-lg shadow-primary/25"
                        initial={false}
                        animate={{
                            x: view === 'expenses' ? 0 : '100%',
                            width: '50%'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    <button
                        onClick={() => setView('expenses')}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-full relative z-10 transition-colors duration-200",
                            view === 'expenses' ? "text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Expenses
                    </button>
                    <button
                        onClick={() => setView('balances')}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-full relative z-10 transition-colors duration-200",
                            view === 'balances' ? "text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Balances
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-center text-gray-400 py-10">Loading...</div>
            ) : (
                <>
                    {view === 'expenses' ? (
                        <ExpensesList expenses={expenses} />
                    ) : (
                        <BalancesView balances={balances} onSettleUp={settleUp} />
                    )}
                </>
            )}

            {/* Floating Add Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddModalOpen(true)}
                className="fixed bottom-32 right-6 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/25 z-40"
            >
                <Plus size={28} className="text-white" />
            </motion.button>

            <AddExpenseModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={addExpense}
            />
        </motion.div>
    );
};
