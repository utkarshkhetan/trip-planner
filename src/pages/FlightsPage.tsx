import React from 'react';
import { FlightList } from '../components/FlightTracker/FlightList';
import { motion } from 'framer-motion';

export const FlightsPage: React.FC = () => {
    return (
        <motion.div
            className="pb-24 pt-6 px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent text-center mt-4">
                    Flights
                </h1>
            </div>
            <FlightList />
        </motion.div>
    );
};
