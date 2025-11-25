import React, { useState } from 'react';
import { TimelineEvent } from './TimelineEvent';
import { initialEvents } from '../../data/itinerary';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export const ItineraryView: React.FC = () => {
    const [currentDay, setCurrentDay] = useState(0);
    const days = ['Nov 25', 'Nov 26', 'Nov 27', 'Nov 28', 'Nov 29', 'Nov 30', 'Dec 1', 'Dec 2'];

    const nextDay = () => setCurrentDay((prev) => (prev + 1) % days.length);
    const prevDay = () => setCurrentDay((prev) => (prev - 1 + days.length) % days.length);

    return (
        <div className="w-full max-w-md mx-auto p-4">
            {/* Date Navigation */}
            <div className="flex items-center justify-between mb-8 glass p-2 rounded-full">
                <button
                    onClick={prevDay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <div className="text-center">
                    <span className="block text-sm text-gray-400">Day {currentDay + 1}</span>
                    <span className="text-lg font-bold text-white">{days[currentDay]}</span>
                </div>
                <button
                    onClick={nextDay}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
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
                        {initialEvents
                            .filter(event => event.date === days[currentDay])
                            .map((event, index, array) => (
                                <TimelineEvent
                                    key={event.id}
                                    event={event}
                                    index={index}
                                    isLast={index === array.length - 1}
                                />
                            ))}

                        {/* Add Event Button Placeholder */}
                        <motion.button
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
        </div>
    );
};
