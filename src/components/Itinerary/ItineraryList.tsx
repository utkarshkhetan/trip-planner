import React from 'react';
import { AnimatePresence } from 'framer-motion';
import type { ItineraryItem } from '../../types';
import { TimelineEvent } from './TimelineEvent';
import { ItineraryForm } from './ItineraryForm';

interface ItineraryListProps {
    items: ItineraryItem[];
    onEdit: (item: ItineraryItem) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string, isCompleted: boolean) => void;
}

export const ItineraryList: React.FC<ItineraryListProps> = ({ items, onEdit, onDelete, onToggleComplete }) => {
    // Group items by date
    const groupedItems = items.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {} as Record<string, ItineraryItem[]>);

    const sortedDates = Object.keys(groupedItems).sort();

    return (
        <div className="space-y-6">
            {sortedDates.map((date) => {
                const dateItems = groupedItems[date];
                const dateObj = new Date(date + 'T00:00:00'); // Ensure local timezone
                const formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                });

                // Count completed vs total
                const completedCount = dateItems.filter(p => p.isCompleted).length;
                const totalCount = dateItems.length;

                return (
                    <div key={date}>
                        {/* Date Header */}
                        <div className="flex items-center justify-between mb-3 px-1">
                            <h3 className="text-lg font-semibold text-white">
                                {formattedDate}
                            </h3>
                            <span className="text-sm text-gray-400">
                                {completedCount}/{totalCount} completed
                            </span>
                        </div>

                        {/* Items for this date */}
                        <div className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {dateItems.map((item) => (
                                    <TimelineEvent
                                        key={item.id}
                                        event={item}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onToggleComplete={onToggleComplete}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
