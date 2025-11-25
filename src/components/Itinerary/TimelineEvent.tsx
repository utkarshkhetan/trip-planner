import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import type { ItineraryItem } from '../../types';

interface TimelineEventProps {
    event: ItineraryItem;
    index?: number;
    isLast?: boolean;
    onEdit?: (event: ItineraryItem) => void;
    onDelete?: (id: string) => void;
    onToggleComplete?: (id: string, isCompleted: boolean) => void;
}

export const TimelineEvent: React.FC<TimelineEventProps> = ({
    event,
    index,
    isLast,
    onEdit,
    onDelete
}) => {
    // Format time to AM/PM
    const formatTime = (timeStr: string) => {
        if (!timeStr) return '';
        const [hours, minutes] = timeStr.split(':');
        const h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        const h12 = h % 12 || 12;
        return `${h12}:${minutes} ${ampm}`;
    };

    // Helper to render description with clickable links
    const renderDescription = (text: string) => {
        if (!text) return null;

        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={i}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline break-all relative z-20"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    return (
        <motion.div
            className="flex gap-4 relative group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Timeline Line */}
            {!isLast && (
                <div className="absolute left-[19px] top-10 bottom-[-20px] w-0.5 bg-gray-800" />
            )}

            {/* Icon Bubble */}
            <div className="relative z-10">
                <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                    {event.icon ? (
                        <span className="text-xl">{event.icon}</span>
                    ) : (
                        <span className="text-xl">📌</span>
                    )}
                </div>
            </div>

            {/* Content Card */}
            <div className="flex-1 pb-8">
                <div className="glass-card hover:bg-white/5 transition-colors duration-300 relative group/card">
                    {/* Edit/Delete buttons */}
                    {(onEdit || onDelete) && (
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover/card:opacity-100 transition-opacity z-20 bg-black/60 backdrop-blur-sm rounded-lg p-1 border border-white/10">
                            {onEdit && (
                                <button
                                    onClick={() => onEdit(event)}
                                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                                    aria-label="Edit event"
                                >
                                    <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                                </button>
                            )}
                            {onDelete && event.id && (
                                <button
                                    onClick={() => onDelete(event.id!)}
                                    className="p-1.5 hover:bg-white/20 rounded-md transition-colors"
                                    aria-label="Delete event"
                                >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-white pr-4">{event.title}</h3>
                        <div className="flex items-center gap-1 text-sm text-accent whitespace-nowrap flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(event.time)}</span>
                        </div>
                    </div>

                    {event.description && (
                        <p className="text-gray-400 text-sm whitespace-pre-wrap">
                            {renderDescription(event.description)}
                        </p>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
