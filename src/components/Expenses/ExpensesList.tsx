import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Receipt, ArrowRightLeft } from 'lucide-react';
import type { Expense } from '../../types';
import { cn } from '../../lib/utils';

interface ExpensesListProps {
    expenses: Expense[];
}

export const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
    if (expenses.length === 0) {
        return (
            <div className="text-center text-gray-400 py-10">
                <p>No expenses yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {expenses.map((expense, index) => (
                <motion.div
                    key={expense.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center",
                            expense.type === 'settlement' ? "bg-green-500/20 text-green-400" : "bg-blue-500/20 text-blue-400"
                        )}>
                            {expense.type === 'settlement' ? <ArrowRightLeft size={20} /> : <Receipt size={20} />}
                        </div>
                        <div>
                            <h3 className="font-medium text-white">{expense.description}</h3>
                            <p className="text-xs text-gray-400">
                                {expense.type === 'settlement'
                                    ? `${expense.paidBy} paid ${expense.splitBetween[0]}`
                                    : `${expense.paidBy} paid for ${expense.splitBetween.length} people`
                                }
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className={cn(
                            "font-bold",
                            expense.type === 'settlement' ? "text-green-400" : "text-white"
                        )}>
                            ${expense.amount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-500">
                            {format(expense.date, 'MMM d')}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
