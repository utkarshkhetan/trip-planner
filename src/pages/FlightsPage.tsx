import React, { useState } from 'react';
import { FlightList } from '../components/FlightTracker/FlightList';
import { motion } from 'framer-motion';
import { arrivalFlights, departureFlights } from '../data/flights';
import { cn } from '../lib/utils';

export const FlightsPage: React.FC = () => {
    const [view, setView] = useState<'arrivals' | 'departures'>('arrivals');

    return (
        <motion.div
            className="pb-24 pt-6 px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header */}
            <div className="mb-6 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent text-center mt-4">
                    Flights
                </h1>

                {/* Toggle Switch */}
                <div className="bg-white/5 p-1 rounded-full flex relative w-64 border border-white/10">
                    {/* Sliding Background */}
                    <motion.div
                        className="absolute top-1 bottom-1 rounded-full bg-primary shadow-lg shadow-primary/25"
                        initial={false}
                        animate={{
                            x: view === 'arrivals' ? 0 : '100%',
                            width: '50%'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    <button
                        onClick={() => setView('arrivals')}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-full relative z-10 transition-colors duration-200",
                            view === 'arrivals' ? "text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Arriving
                    </button>
                    <button
                        onClick={() => setView('departures')}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-full relative z-10 transition-colors duration-200",
                            view === 'departures' ? "text-white" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Departing
                    </button>
                </div>
            </div>

            <FlightList flights={view === 'arrivals' ? arrivalFlights : departureFlights} />
        </motion.div>
    );
};
