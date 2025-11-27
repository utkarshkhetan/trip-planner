import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Send, MessageSquareQuote } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { QuoteCard } from '../components/Quotes/QuoteCard';
import type { Quote } from '../types';

export const QuotesPage: React.FC = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newQuote, setNewQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const quotesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Quote[];
            setQuotes(quotesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuote.trim() || !author.trim()) return;

        try {
            await addDoc(collection(db, 'quotes'), {
                text: newQuote.trim(),
                author: author.trim(),
                createdAt: Date.now()
            });
            setNewQuote('');
            setAuthor('');
            setIsAdding(false);
        } catch (error) {
            console.error("Error adding quote: ", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Delete this quote?')) {
            try {
                await deleteDoc(doc(db, 'quotes', id));
            } catch (error) {
                console.error("Error deleting quote: ", error);
            }
        }
    };

    return (
        <motion.div
            className="pb-24 pt-6 px-4 max-w-md mx-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-8 mt-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Quotes List
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Memorable moments & sayings</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
                >
                    <Plus className={`w-6 h-6 transition-transform duration-300 ${isAdding ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {/* Add Quote Form */}
            <AnimatePresence>
                {isAdding && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-8 overflow-hidden"
                        onSubmit={handleSubmit}
                    >
                        <div className="glass p-4 rounded-2xl border border-white/10 space-y-4">
                            <textarea
                                placeholder="What was said?"
                                value={newQuote}
                                onChange={(e) => setNewQuote(e.target.value)}
                                className="w-full bg-black/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none h-24"
                                autoFocus
                            />
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Who said it?"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="flex-1 bg-black/20 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!newQuote.trim() || !author.trim()}
                                    className="bg-primary text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Quotes List */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading quotes...</div>
                ) : quotes.length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center gap-4 text-gray-500">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                            <MessageSquareQuote className="w-8 h-8 opacity-50" />
                        </div>
                        <p>No quotes yet. Be the first to add one!</p>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {quotes.map((quote) => (
                            <QuoteCard key={quote.id} quote={quote} onDelete={handleDelete} />
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
};
