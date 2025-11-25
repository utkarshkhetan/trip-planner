import React from 'react';
import { AccommodationCard } from './AccommodationCard';
import { accommodations } from '../../data/accommodations';

export const YourTrip: React.FC = () => {
    return (
        <div className="w-full max-w-md mx-auto p-4">
            <div className="space-y-4">
                {accommodations.map((acc, index) => (
                    <AccommodationCard key={acc.id} accommodation={acc} index={index} />
                ))}
            </div>
        </div>
    );
};
