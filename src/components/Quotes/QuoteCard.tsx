import React from 'react';
import { motion } from 'framer-motion';
import { Quote as QuoteIcon, Trash2 } from 'lucide-react';
import type { Quote } from '../../types';

interface QuoteCardProps {
    quote: Quote;
    onDelete?: (id: string) => void;
}

export const QuoteCard: React.FC<QuoteCardProps> = ({ quote, onDelete }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass p-6 rounded-2xl border border-white/10 relative group"
        >
            <QuoteIcon className="w-8 h-8 text-primary/20 absolute top-4 left-4" />

            <div className="relative z-10 pl-4">
                <p className="text-lg font-medium text-white/90 italic mb-4 leading-relaxed">
                    "{quote.text}"
                </p>

                <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className="text-primary font-bold text-sm">
                            — {quote.author}
                        </span>
                        <span className="text-xs text-gray-500 mt-1">
                            {new Date(quote.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric'
                            })}
                        </span>
                    </div>

                    {onDelete && (
                        <button
                            onClick={() => quote.id && onDelete(quote.id)}
                            className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
