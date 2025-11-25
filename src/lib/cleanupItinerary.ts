import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const ITINERARY_COLLECTION = 'itinerary';
const SEED_FLAG_COLLECTION = '_meta';
const SEED_FLAG_DOC = 'itinerary_seeded';

/**
 * Removes all duplicate events from Firestore, keeping only one of each unique event
 */
export const cleanupDuplicateEvents = async (): Promise<void> => {
    try {
        console.log('Starting cleanup of duplicate events...');

        const snapshot = await getDocs(collection(db, ITINERARY_COLLECTION));
        const events = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(`Found ${events.length} total events`);

        // Group by title + date + time to find duplicates
        const uniqueEvents = new Map<string, any>();
        const duplicateIds: string[] = [];

        events.forEach(event => {
            const key = `${event.title}-${event.date}-${event.time}`;

            if (!uniqueEvents.has(key)) {
                uniqueEvents.set(key, event);
            } else {
                // This is a duplicate
                duplicateIds.push(event.id);
            }
        });

        console.log(`Found ${duplicateIds.length} duplicate events to remove`);
        console.log(`Keeping ${uniqueEvents.size} unique events`);

        // Delete duplicates in batches
        for (const id of duplicateIds) {
            await deleteDoc(doc(db, ITINERARY_COLLECTION, id));
        }

        console.log('Cleanup complete!');
        console.log(`Removed ${duplicateIds.length} duplicates, ${uniqueEvents.size} events remain`);
    } catch (error) {
        console.error('Error cleaning up duplicates:', error);
        throw error;
    }
};

/**
 * Checks if the itinerary has already been seeded using a flag document
 */
export const isItinerarySeeded = async (): Promise<boolean> => {
    try {
        const flagDoc = await getDoc(doc(db, SEED_FLAG_COLLECTION, SEED_FLAG_DOC));
        return flagDoc.exists();
    } catch (error) {
        console.error('Error checking seed flag:', error);
        return false;
    }
};

/**
 * Sets the flag indicating itinerary has been seeded
 */
export const setItinerarySeededFlag = async (): Promise<void> => {
    try {
        await setDoc(doc(db, SEED_FLAG_COLLECTION, SEED_FLAG_DOC), {
            seeded: true,
            timestamp: Date.now()
        });
    } catch (error) {
        console.error('Error setting seed flag:', error);
        throw error;
    }
};
