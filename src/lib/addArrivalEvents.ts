/**
 * Script to add arrival events for all travelers to the itinerary
 * 
 * Run this script to add arrival events:
 * 1. Open browser console
 * 2. Call addArrivalEvents()
 */

import { collection, writeBatch, doc, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { ItineraryItem } from '../types';
import { arrivalFlights } from '../data/flights';

const ITINERARY_COLLECTION = 'itinerary';

// Helper to convert 12h time to 24h
const convertTo24Hour = (timeStr: string) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':');
    let h = parseInt(hours, 10);

    if (modifier === 'PM' && h !== 12) {
        h += 12;
    }
    if (modifier === 'AM' && h === 12) {
        h = 0;
    }

    return `${h.toString().padStart(2, '0')}:${minutes}`;
};

export const addArrivalEvents = async (): Promise<void> => {
    try {
        // Check if we've already added arrival events
        const q = query(collection(db, ITINERARY_COLLECTION), where('type', '==', 'flight'));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
            console.log('Arrival events already exist, skipping...');
            return;
        }

        console.log('Adding arrival events...');

        const batch = writeBatch(db);
        const now = Date.now();

        // Generate arrival events from flight data
        const arrivalEvents: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>[] = arrivalFlights.map(traveler => {
            const lastSegment = traveler.segments[traveler.segments.length - 1];
            // Convert 2025 dates to 2024 to match itinerary
            const date2024 = lastSegment.date.replace('2025', '2024');
            return {
                title: `${traveler.name} Arrives!`,
                date: date2024,
                time: convertTo24Hour(lastSegment.arrivalTime),
                description: `Flight ${lastSegment.flightNumber} from ${lastSegment.departureCity}`,
                icon: '🛬',
                isCompleted: false,
                type: 'flight'
            };
        });

        arrivalEvents.forEach((event) => {
            const docRef = doc(collection(db, ITINERARY_COLLECTION));
            batch.set(docRef, {
                ...event,
                createdAt: now,
                updatedAt: now,
            });
        });

        await batch.commit();
        console.log(`✅ Successfully added ${arrivalEvents.length} arrival events!`);
    } catch (error) {
        console.error('❌ Error adding arrival events:', error);
        throw error;
    }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
    (window as any).addArrivalEvents = addArrivalEvents;
}
