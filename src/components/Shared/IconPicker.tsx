import React, { useState, useRef, useEffect } from 'react';
import { Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface IconPickerProps {
    selectedIcon?: string;
    onSelect: (icon: string) => void;
}

const COMMON_ICONS = [
    '✈️', '🏨', '🍽️', '🚗', '🚆', '🚌', '🛳️',
    '🏛️', '🎭', '🎨', '🎪', '🎫',
    '🛍️', '🛒', '🎁',
    '🏖️', '🏔️', '🌲', '🌅',
    '📸', '🎥', '🎵',
    '☕', '🍻', '🍷', '🍹',
    '🏃', '🚶', '🏊', '🚴',
    '📍', '📌', '📅', '⏰'
];

export const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
                {selectedIcon ? (
                    <span className="text-xl">{selectedIcon}</span>
                ) : (
                    <Smile className="w-5 h-5 text-gray-400" />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full left-0 mt-2 p-3 bg-[#1a1a1a] border border-white/20 rounded-xl shadow-xl z-50 w-64"
                    >
                        <div className="grid grid-cols-6 gap-2">
                            {COMMON_ICONS.map((icon) => (
                                <button
                                    key={icon}
                                    type="button"
                                    onClick={() => {
                                        onSelect(icon);
                                        setIsOpen(false);
                                    }}
                                    className={`
                                        w-8 h-8 flex items-center justify-center rounded hover:bg-white/10 transition-colors text-lg
                                        ${selectedIcon === icon ? 'bg-primary/20 ring-1 ring-primary' : ''}
                                    `}
                                >
                                    {icon}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
