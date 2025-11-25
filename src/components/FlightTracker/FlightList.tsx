import React from 'react';
import { TravelerCard } from './TravelerCard';
import { travelers } from '../../data/flights';

export const FlightList: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            {travelers.map((traveler) => (
                <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
        </div>
    );
};
