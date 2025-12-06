import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { Expense, Balance } from '../types';

export const useExpenses = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [balances, setBalances] = useState<Balance[]>([]);

    useEffect(() => {
        const q = query(collection(db, 'expenses'), orderBy('date', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const expensesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Expense[];

            setExpenses(expensesData);
            calculateBalances(expensesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const calculateBalances = (expensesList: Expense[]) => {
        const balanceMap: Record<string, number> = {};

        // Initialize balances for known users (optional, but good for completeness)
        // For now, we'll just build it dynamically

        expensesList.forEach(expense => {
            const { amount, paidBy, splitBetween } = expense;
            const splitAmount = amount / splitBetween.length;

            // Payer gets positive balance (they are owed money)
            balanceMap[paidBy] = (balanceMap[paidBy] || 0) + amount;

            // Each person in split subtracts their share (they owe money)
            splitBetween.forEach(person => {
                balanceMap[person] = (balanceMap[person] || 0) - splitAmount;
            });
        });

        const calculatedBalances: Balance[] = Object.entries(balanceMap)
            .map(([user, amount]) => ({ user, amount }))
            .filter(b => Math.abs(b.amount) > 0.01); // Filter out settled balances

        setBalances(calculatedBalances);
    };

    const addExpense = async (expense: Omit<Expense, 'id' | 'createdAt'>) => {
        try {
            await addDoc(collection(db, 'expenses'), {
                ...expense,
                createdAt: Date.now()
            });
        } catch (error) {
            console.error("Error adding expense: ", error);
            throw error;
        }
    };

    const settleUp = async (from: string, to: string, amount: number) => {
        try {
            await addDoc(collection(db, 'expenses'), {
                description: 'Settlement',
                amount,
                paidBy: from,
                splitBetween: [to],
                date: Date.now(),
                createdAt: Date.now(),
                type: 'settlement'
            });
        } catch (error) {
            console.error("Error settling up: ", error);
            throw error;
        }
    };

    return { expenses, balances, loading, addExpense, settleUp };
};
