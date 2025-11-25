import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Check, Pencil, Trash2, Calendar } from 'lucide-react';
import type { ItineraryItem } from '../../types';
import { cn } from '../../lib/utils';
import { LinkPreview } from '../Shared/LinkPreview';

interface ItineraryCardProps {
    item: ItineraryItem;
    onEdit: (item: ItineraryItem) => void;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string, isCompleted: boolean) => void;
}

const typeIcons: Record<ItineraryItem['type'], string> = {
    activity: '🎯',
    food: '🍽️',
    transport: '🚗',
    shopping: '🛍️',
    sightseeing: '🏛️',
    flight: '✈️',
    other: '📌',
};

const typeColors: Record<ItineraryItem['type'], string> = {
    activity: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    food: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    transport: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    shopping: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
    sightseeing: 'bg-green-500/20 text-green-400 border-green-500/30',
    flight: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
    other: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
};

export const ItineraryCard: React.FC<ItineraryCardProps> = ({ item, onEdit, onDelete, onToggleComplete }) => {
    // Extract URLs from description
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const links = item.description?.match(urlRegex) || [];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={cn(
                "glass rounded-xl p-4 border transition-all duration-300",
                item.isCompleted
                    ? "bg-white/5 border-white/10 opacity-60"
                    : "bg-white/10 border-white/20 hover:border-primary/50"
            )}
        >
            <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                    onClick={() => onToggleComplete(item.id!, !item.isCompleted)}
                    className={cn(
                        "mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                        item.isCompleted
                            ? "bg-primary border-primary"
                            : "border-white/30 hover:border-primary/50"
                    )}
                >
                    {item.isCompleted && <Check className="w-4 h-4 text-white" />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                            {/* Custom Icon or Type Icon */}
                            <span className="text-xl">
                                {item.icon || typeIcons[item.type]}
                            </span>
                            <h3 className={cn(
                                "font-semibold text-lg leading-tight",
                                item.isCompleted && "line-through text-gray-400"
                            )}>
                                {item.title}
                            </h3>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0">
                            <button
                                onClick={() => onEdit(item)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Pencil className="w-4 h-4 text-gray-400 hover:text-primary" />
                            </button>
                            <button
                                onClick={() => onDelete(item.id!)}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                            </button>
                        </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                        <div className={cn(
                            "text-sm text-gray-400 mb-3 leading-relaxed whitespace-pre-wrap",
                            item.isCompleted && "line-through"
                        )}>
                            {item.description}
                        </div>
                    )}

                    {/* Link Previews */}
                    {links.length > 0 && (
                        <div className="mb-3 space-y-2">
                            {links.map((link, index) => (
                                <LinkPreview key={index} url={link} />
                            ))}
                        </div>
                    )}

                    {/* Meta Information */}
                    <div className="flex flex-wrap gap-2 items-center text-xs text-gray-400">
                        {/* Type Badge */}
                        <span className={cn(
                            "px-2 py-1 rounded-full border flex items-center gap-1",
                            typeColors[item.type]
                        )}>
                            <span className="capitalize">{item.type}</span>
                        </span>

                        {/* Date */}
                        <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                            })}
                        </span>

                        {/* Time */}
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}
                        </span>

                        {/* Location */}
                        {item.location && (
                            <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {item.location}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
