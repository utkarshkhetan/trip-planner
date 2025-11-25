import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import type { ItineraryItem } from '../../types';
import { cn } from '../../lib/utils';
import { IconPicker } from '../Shared/IconPicker';

interface ItineraryFormProps {
    item?: ItineraryItem | null;
    currentDate?: string; // YYYY-MM-DD format for prefilling
    onSave: (item: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onCancel: () => void;
}

export const ItineraryForm: React.FC<ItineraryFormProps> = ({ item, currentDate, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: currentDate || '',
        time: '',
        icon: '',
    });

    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title,
                description: item.description || '',
                date: item.date,
                time: item.time,
                icon: item.icon || '',
            });
        }
    }, [item]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.date || !formData.time) return;

        onSave({
            ...formData,
            isCompleted: item?.isCompleted || false,
        });

        // Reset form
        setFormData({
            title: '',
            description: '',
            date: currentDate || '',
            time: '',
            icon: '',
        });
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all";
    const labelClass = "block text-sm font-medium text-gray-300 mb-1.5";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
            onClick={onCancel}
        >
            <motion.div
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "100%", opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="glass w-full max-w-lg bg-[#0a0a0a]/95 border border-white/20 rounded-2xl p-6 pb-24 max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">
                        {item ? 'Edit Event' : 'New Event'}
                    </h2>
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title & Icon */}
                    <div className="flex gap-3">
                        <div className="flex-shrink-0">
                            <label className={labelClass}>Icon</label>
                            <IconPicker
                                selectedIcon={formData.icon}
                                onSelect={(icon) => setFormData({ ...formData, icon })}
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="title" className={labelClass}>
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className={inputClass}
                                placeholder="e.g., Visit Eiffel Tower"
                                required
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className={labelClass}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className={cn(inputClass, "min-h-[80px] resize-none")}
                            placeholder="Add details... Links will be previewed automatically."
                            rows={3}
                        />
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="date" className={labelClass}>
                                Date <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="date"
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className={inputClass}
                                min="2024-11-25"
                                max="2024-12-02"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="time" className={labelClass}>
                                Time <span className="text-red-400">*</span>
                            </label>
                            <input
                                id="time"
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className={inputClass}
                                step="900"
                                required
                            />
                        </div>
                    </div>



                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!formData.title || !formData.date || !formData.time}
                            className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                        >
                            <Save className="w-4 h-4" />
                            {item ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};
