import React from 'react';
import { YourTrip } from '../components/Accommodation/YourTrip';
import { motion } from 'framer-motion';

export const AccommodationPage: React.FC = () => {
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
                    Homes
                </h1>
            </div>
            <YourTrip />
        </motion.div>
    );
};
