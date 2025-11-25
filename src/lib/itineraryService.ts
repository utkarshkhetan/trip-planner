import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    getDocs,
    onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import type { ItineraryItem } from '../types';

const ITINERARY_COLLECTION = 'itinerary';

// Create a new itinerary item
export const createItineraryItem = async (item: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
    const now = Date.now();
    const itemData = {
        ...item,
        isCompleted: false,
        createdAt: now,
        updatedAt: now,
    };

    const docRef = await addDoc(collection(db, ITINERARY_COLLECTION), itemData);
    return docRef.id;
};

// Update an existing itinerary item
export const updateItineraryItem = async (id: string, updates: Partial<ItineraryItem>): Promise<void> => {
    const itemRef = doc(db, ITINERARY_COLLECTION, id);
    await updateDoc(itemRef, {
        ...updates,
        updatedAt: Date.now(),
    });
};

// Delete an itinerary item
export const deleteItineraryItem = async (id: string): Promise<void> => {
    const itemRef = doc(db, ITINERARY_COLLECTION, id);
    await deleteDoc(itemRef);
};

// Get all itinerary items (one-time read)
export const getAllItineraryItems = async (): Promise<ItineraryItem[]> => {
    const querySnapshot = await getDocs(collection(db, ITINERARY_COLLECTION));

    const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as ItineraryItem[];

    // Sort by date and time in-memory
    items.sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.time.localeCompare(b.time);
    });

    return items;
};

// Subscribe to itinerary items (real-time updates)
export const subscribeToItinerary = (
    callback: (items: ItineraryItem[]) => void,
    onError?: (error: Error) => void
): (() => void) => {
    // Simple query without ordering to avoid index requirements
    // Sorting will be done in-memory by the hook
    const q = collection(db, ITINERARY_COLLECTION);

    const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as ItineraryItem[];

            // Sort by date and time in-memory
            items.sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date);
                if (dateCompare !== 0) return dateCompare;
                return a.time.localeCompare(b.time);
            });

            callback(items);
        },
        (error) => {
            console.error('Error subscribing to itinerary:', error);
            // DO NOT clear the events on error - just log it
            if (onError) {
                onError(error as Error);
            }
        }
    );

    return unsubscribe;
};

// Toggle item completion status
export const toggleItineraryItemCompletion = async (id: string, isCompleted: boolean): Promise<void> => {
    await updateItineraryItem(id, { isCompleted });
};
