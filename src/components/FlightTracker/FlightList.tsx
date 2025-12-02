import React from 'react';
import { TravelerCard } from './TravelerCard';
import type { Traveler } from '../../types';

interface FlightListProps {
    flights: Traveler[];
}

export const FlightList: React.FC<FlightListProps> = ({ flights }) => {
    return (
        <div className="w-full max-w-md mx-auto space-y-6">
            {flights.map((traveler) => (
                <TravelerCard key={traveler.id} traveler={traveler} />
            ))}
        </div>
    );
};
