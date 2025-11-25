/**
 * ONE-TIME SCRIPT to populate Firestore with initial itinerary events
 * 
 * Run this script once to seed your database:
 * 1. Open browser console
 * 2. Import this function
 * 3. Call seedDatabase()
 * 
 * Or create a temporary button in the app to call this function
 */

import { collection, writeBatch, doc, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import type { ItineraryItem } from '../types';

const ITINERARY_COLLECTION = 'itinerary';

const initialEvents: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
    // ... (keep existing events)
    // Day 1: Nov 25
    {
        title: 'Arrival in Cleveland',
        date: '2025-11-25',
        time: '12:00',
        description: 'Everyone meets at the Airbnb',
        icon: '🏠',
        isCompleted: false
    },
    {
        title: 'Lunch at West Side Market',
        date: '2025-11-25',
        time: '13:30',
        description: 'Grab some food at the famous market\nhttp://westsidemarket.org/',
        icon: '🍽️',
        isCompleted: false
    },
    {
        title: 'Rock & Roll Hall of Fame',
        date: '2025-11-25',
        time: '15:00',
        description: 'Tour the museum\nhttps://www.rockhall.com/',
        icon: '🎸',
        isCompleted: false
    },
    // Day 2: Nov 26
    {
        title: 'Cleveland Museum of Art',
        date: '2025-11-26',
        time: '10:00',
        description: 'Explore the art museum',
        icon: '🎨',
        isCompleted: false
    },
    {
        title: 'Dinner at The Flats',
        date: '2025-11-26',
        time: '19:00',
        description: 'Dinner and drinks by the river',
        icon: '🍽️',
        isCompleted: false
    },
    // Day 3: Nov 27 (Thanksgiving)
    {
        title: 'Thanksgiving Dinner',
        date: '2025-11-27',
        time: '16:00',
        description: 'Traditional Thanksgiving feast at the Airbnb',
        icon: '🦃',
        isCompleted: false
    },
    // Day 4: Nov 28 (Toronto)
    {
        title: 'Road Trip to Toronto',
        date: '2025-11-28',
        time: '09:00',
        description: 'Drive to Toronto (approx 4.5 hours)',
        icon: '🚗',
        isCompleted: false
    },
    {
        title: 'Check-in to Toronto Airbnb',
        date: '2025-11-28',
        time: '15:00',
        description: 'Settle in',
        icon: '🏠',
        isCompleted: false
    },
    // Day 5: Nov 29
    {
        title: 'CN Tower',
        date: '2025-11-29',
        time: '11:00',
        description: 'Visit the iconic tower',
        icon: '🗼',
        isCompleted: false
    },
    {
        title: 'Distillery District',
        date: '2025-11-29',
        time: '16:00',
        description: 'Explore the historic district',
        icon: '🏛️',
        isCompleted: false
    },
    // Day 6: Nov 30 (Toronto)
    {
        title: 'Explore Toronto',
        date: '2025-11-30',
        time: '10:00',
        description: 'Free day to explore the city',
        icon: '🌆',
        isCompleted: false
    },
    // Day 7: Dec 1 (Buffalo)
    {
        title: 'Road Trip to Buffalo',
        date: '2025-12-01',
        time: '10:00',
        description: 'Drive to Buffalo',
        icon: '🚗',
        isCompleted: false
    },
    {
        title: 'Niagara Falls',
        date: '2025-12-01',
        time: '13:00',
        description: 'See the falls from the US side',
        icon: '💧',
        isCompleted: false
    },
    {
        title: 'Buffalo Bills Bar',
        date: '2025-12-01',
        time: '19:00',
        description: 'Watch the game/drinks',
        icon: '🍻',
        isCompleted: false
    },
    // Day 8: Dec 2
    {
        title: 'Fly Home',
        date: '2025-12-02',
        time: '12:00',
        description: 'Head to the airport',
        icon: '✈️',
        isCompleted: false
    }
];

export const seedDatabase = async (): Promise<void> => {
    try {
        console.log('Starting database seed...');

        // 1. Delete existing events
        console.log('Clearing existing events...');
        const snapshot = await getDocs(collection(db, ITINERARY_COLLECTION));
        const deleteBatch = writeBatch(db);
        snapshot.docs.forEach((doc) => {
            deleteBatch.delete(doc.ref);
        });
        await deleteBatch.commit();
        console.log('✓ Cleared existing events');

        // 2. Add new events
        const batch = writeBatch(db);
        const now = Date.now();

        initialEvents.forEach((event) => {
            const docRef = doc(collection(db, ITINERARY_COLLECTION));
            batch.set(docRef, {
                ...event,
                createdAt: now,
                updatedAt: now,
            });
        });

        await batch.commit();
        console.log(`✅ Successfully seeded ${initialEvents.length} events!`);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

// Make it available globally for console access
if (typeof window !== 'undefined') {
    (window as any).seedDatabase = seedDatabase;
}
