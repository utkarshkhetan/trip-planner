import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Calendar } from 'lucide-react';
import type { Accommodation } from '../../types';

interface AccommodationCardProps {
    accommodation: Accommodation;
    index: number;
}

export const AccommodationCard: React.FC<AccommodationCardProps> = ({ accommodation, index }) => {
    return (
        <motion.a
            href={accommodation.airbnbLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block relative h-64 rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={accommodation.imageUrl}
                    alt={accommodation.city}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="glass px-3 py-1 rounded-full flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="text-sm font-medium text-white">{accommodation.city}</span>
                    </div>
                    <div className="glass p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                </div>

                <div className="glass p-4 rounded-xl backdrop-blur-md bg-black/30 border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-1">{accommodation.city} Stay</h3>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{accommodation.dates}</span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};
