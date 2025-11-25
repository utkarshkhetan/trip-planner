import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from './firebase';
import type { ItineraryItem } from '../types';
import {
    cleanupDuplicateEvents,
    isItinerarySeeded,
    setItinerarySeededFlag
} from './cleanupItinerary';

const ITINERARY_COLLECTION = 'itinerary';

// Initial seed data with proper date formats
const seedEvents: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
    // Day 1: Nov 25
    {
        title: 'Arrival in Cleveland',
        date: '2024-11-25',
        time: '12:00',
        description: 'Everyone meets at the Airbnb',
        type: 'other',
        icon: '🏠',
        isCompleted: false
    },
    {
        title: 'Lunch at West Side Market',
        date: '2024-11-25',
        time: '13:30',
        description: 'Grab some food at the famous market\nhttp://westsidemarket.org/',
        type: 'food',
        icon: '🍽️',
        isCompleted: false
    },
    {
        title: 'Rock & Roll Hall of Fame',
        date: '2024-11-25',
        time: '15:00',
        description: 'Tour the museum\nhttps://www.rockhall.com/',
        type: 'sightseeing',
        icon: '🎸',
        isCompleted: false
    },
    // Day 2: Nov 26
    {
        title: 'Cleveland Museum of Art',
        date: '2024-11-26',
        time: '10:00',
        description: 'Explore the art museum',
        type: 'sightseeing',
        icon: '🎨',
        isCompleted: false
    },
    {
        title: 'Dinner at The Flats',
        date: '2024-11-26',
        time: '19:00',
        description: 'Dinner and drinks by the river',
        type: 'food',
        icon: '🍽️',
        isCompleted: false
    },
    // Day 3: Nov 27 (Thanksgiving)
    {
        title: 'Thanksgiving Dinner',
        date: '2024-11-27',
        time: '16:00',
        description: 'Traditional Thanksgiving feast at the Airbnb',
        type: 'food',
        icon: '🦃',
        isCompleted: false
    },
    // Day 4: Nov 28 (Toronto)
    {
        title: 'Road Trip to Toronto',
        date: '2024-11-28',
        time: '09:00',
        description: 'Drive to Toronto (approx 4.5 hours)',
        type: 'transport',
        icon: '🚗',
        isCompleted: false
    },
    {
        title: 'Check-in to Toronto Airbnb',
        date: '2024-11-28',
        time: '15:00',
        description: 'Settle in',
        type: 'other',
        icon: '🏠',
        isCompleted: false
    },
    // Day 5: Nov 29
    {
        title: 'CN Tower',
        date: '2024-11-29',
        time: '11:00',
        description: 'Visit the iconic tower',
        type: 'sightseeing',
        icon: '🗼',
        isCompleted: false
    },
    {
        title: 'Distillery District',
        date: '2024-11-29',
        time: '16:00',
        description: 'Explore the historic district',
        type: 'sightseeing',
        icon: '🏛️',
        isCompleted: false
    },
    // Day 6: Nov 30 (Toronto)
    {
        title: 'Explore Toronto',
        date: '2024-11-30',
        time: '10:00',
        description: 'Free day to explore the city',
        type: 'sightseeing',
        icon: '🌆',
        isCompleted: false
    },
    // Day 7: Dec 1 (Buffalo)
    {
        title: 'Road Trip to Buffalo',
        date: '2024-12-01',
        time: '10:00',
        description: 'Drive to Buffalo',
        type: 'transport',
        icon: '🚗',
        isCompleted: false
    },
    {
        title: 'Niagara Falls',
        date: '2024-12-01',
        time: '13:00',
        description: 'See the falls from the US side',
        type: 'sightseeing',
        icon: '💧',
        isCompleted: false
    },
    {
        title: 'Buffalo Bills Bar',
        date: '2024-12-01',
        time: '19:00',
        description: 'Watch the game/drinks',
        type: 'food',
        icon: '🍻',
        isCompleted: false
    },
    // Day 8: Dec 2
    {
        title: 'Fly Home',
        date: '2024-12-02',
        time: '12:00',
        description: 'Head to the airport',
        type: 'flight',
        icon: '✈️',
        isCompleted: false
    }
];

export const seedItinerary = async (): Promise<void> => {
    try {
        // First, cleanup any duplicates that may exist
        await cleanupDuplicateEvents();

        // Check if already seeded using flag document
        const alreadySeeded = await isItinerarySeeded();

        if (alreadySeeded) {
            console.log('Itinerary already seeded. Skipping.');
            return;
        }

        console.log('Seeding itinerary with initial events...');

        // Batch write all seed events
        const batch = writeBatch(db);
        const now = Date.now();

        seedEvents.forEach((event) => {
            const docRef = doc(collection(db, ITINERARY_COLLECTION));
            batch.set(docRef, {
                ...event,
                createdAt: now,
                updatedAt: now,
            });
        });

        await batch.commit();

        // Set the flag to prevent future seeding
        await setItinerarySeededFlag();

        console.log('Successfully seeded itinerary with initial events!');
    } catch (error) {
        console.error('Error seeding itinerary:', error);
        throw error;
    }
};
