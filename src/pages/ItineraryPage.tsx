import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Loader2 } from 'lucide-react';
import type { ItineraryItem } from '../types';
import { TimelineEvent } from '../components/Itinerary/TimelineEvent';
import { ItineraryForm } from '../components/Itinerary/ItineraryForm';
import { useItinerary } from '../hooks/useItinerary';

export const ItineraryPage: React.FC = () => {
    const { items, loading, syncing, error, createItem, updateItem, deleteItem } = useItinerary();
    const [currentDay, setCurrentDay] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);

    const days = [
        { date: '2024-11-25', label: 'Nov 25' },
        { date: '2024-11-26', label: 'Nov 26' },
        { date: '2024-11-27', label: 'Nov 27' },
        { date: '2024-11-28', label: 'Nov 28' },
        { date: '2024-11-29', label: 'Nov 29' },
        { date: '2024-11-30', label: 'Nov 30' },
        { date: '2024-12-01', label: 'Dec 1' },
        { date: '2024-12-02', label: 'Dec 2' },
    ];



    const nextDay = () => setCurrentDay((prev) => (prev + 1) % days.length);
    const prevDay = () => setCurrentDay((prev) => (prev - 1 + days.length) % days.length);

    // Get events for current day
    const currentDayEvents = items.filter(
        (event) => event.date === days[currentDay].date
    );

    const handleCreateItem = async (itemData: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
        try {
            await createItem(itemData);
            setShowForm(false);
        } catch (err) {
            console.error('Error creating itinerary item:', err);
        }
    };

    const handleUpdateItem = async (itemData: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingItem?.id) return;

        try {
            await updateItem(editingItem.id, itemData);
            setShowForm(false);
            setEditingItem(null);
        } catch (err) {
            console.error('Error updating itinerary item:', err);
        }
    };

    const handleDeleteItem = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            await deleteItem(id);
        } catch (err) {
            console.error('Error deleting itinerary item:', err);
        }
    };

    const handleEdit = (item: ItineraryItem) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen pb-24 px-4 pt-6"
        >
            {/* Header with Sync Indicator */}
            <div className="mb-6 relative">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Itinerary
                </h1>
                <p className="text-gray-400 text-sm">
                    Your daily travel schedule
                </p>

                {/* Sync Status / Error Indicator */}
                <div className="absolute top-2 right-2 flex items-center gap-2 text-xs">
                    {syncing && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center gap-2 text-gray-400"
                        >
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Updating...
                        </motion.div>
                    )}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-red-400 bg-red-400/10 px-2 py-1 rounded"
                        >
                            {error}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            )}

            {!loading && (
                <>
                    {/* Date Navigation */}
                    <div className="flex items-center justify-between mb-8 glass p-3 rounded-full">
                        <button
                            onClick={prevDay}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Previous day"
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>
                        <div className="text-center">
                            <span className="block text-sm text-gray-400">Day {currentDay + 1}</span>
                            <span className="text-lg font-bold text-white">{days[currentDay].label}</span>
                        </div>
                        <button
                            onClick={nextDay}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Next day"
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Events List */}
                    <div className="relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentDay}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {currentDayEvents.map((event, index, array) => (
                                    <TimelineEvent
                                        key={event.id}
                                        event={event}
                                        index={index}
                                        isLast={index === array.length - 1}
                                        onEdit={handleEdit}
                                        onDelete={handleDeleteItem}
                                    />
                                ))}

                                {/* Add Event Button */}
                                <motion.button
                                    onClick={() => setShowForm(true)}
                                    className="w-full py-3 mt-4 border border-dashed border-gray-700 rounded-xl text-gray-500 hover:text-white hover:border-gray-500 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Event
                                </motion.button>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </>
            )}

            {/* Form Modal */}
            <AnimatePresence>
                {showForm && (
                    <ItineraryForm
                        item={editingItem}
                        currentDate={days[currentDay].date}
                        onSave={editingItem ? handleUpdateItem : handleCreateItem}
                        onCancel={handleCancelForm}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};
