import { useState, useEffect } from 'react';
import type { ItineraryItem } from '../types';
import {
    subscribeToItinerary,
    createItineraryItem,
    updateItineraryItem,
    deleteItineraryItem,
} from '../lib/itineraryService';


const CACHE_KEY = 'itinerary_cache';
const CACHE_TIMESTAMP_KEY = 'itinerary_cache_timestamp';
const CACHE_EXPIRY = 1000 * 60 * 60 * 24; // 24 hours

interface UseItineraryReturn {
    items: ItineraryItem[];
    loading: boolean;
    syncing: boolean;
    error: string | null;
    createItem: (item: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateItem: (id: string, updates: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
}

// Load from cache
const loadFromCache = (): ItineraryItem[] | null => {
    try {
        const cached = localStorage.getItem(CACHE_KEY);
        const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);

        if (!cached || !timestamp) return null;

        const cacheAge = Date.now() - parseInt(timestamp, 10);
        if (cacheAge > CACHE_EXPIRY) {
            // Cache expired
            localStorage.removeItem(CACHE_KEY);
            localStorage.removeItem(CACHE_TIMESTAMP_KEY);
            return null;
        }

        return JSON.parse(cached);
    } catch (error) {
        console.error('Error loading from cache:', error);
        return null;
    }
};

// Save to cache
const saveToCache = (items: ItineraryItem[]): void => {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(items));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
        console.error('Error saving to cache:', error);
    }
};

export const useItinerary = (): UseItineraryReturn => {
    const [items, setItems] = useState<ItineraryItem[]>(() => {
        // Initialize with cached data if available
        return loadFromCache() || [];
    });
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const initializeItinerary = async () => {
            try {
                // Subscribe to real-time updates
                const unsubscribe = subscribeToItinerary(
                    (updatedItems) => {
                        setItems(updatedItems);
                        saveToCache(updatedItems);
                        setLoading(false);
                        setSyncing(false);
                        setError(null);
                    },
                    (err) => {
                        console.error('Subscription error:', err);
                        setError('Unable to fetch updates');
                        setLoading(false);
                        setSyncing(false);
                    }
                );

                return unsubscribe;
            } catch (error) {
                console.error('Error initializing itinerary:', error);
                setError('Unable to initialize itinerary');
                setLoading(false);
                setSyncing(false);
            }
        };

        const unsubscribePromise = initializeItinerary();

        // If we have cached data, we're not really "loading"
        if (items.length > 0) {
            setLoading(false);
        }

        return () => {
            unsubscribePromise.then((unsubscribe) => {
                if (unsubscribe) unsubscribe();
            });
        };
    }, []);

    const createItem = async (itemData: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
        setSyncing(true);
        setError(null);
        try {
            await createItineraryItem(itemData);
        } catch (err) {
            console.error('Create item error:', err);
            setError('Failed to create event');
        } finally {
            setSyncing(false);
        }
    };

    const updateItem = async (id: string, updates: Omit<ItineraryItem, 'id' | 'createdAt' | 'updatedAt'>) => {
        setSyncing(true);
        setError(null);
        try {
            await updateItineraryItem(id, updates);
        } catch (err) {
            console.error('Update item error:', err);
            setError('Failed to update event');
        } finally {
            setSyncing(false);
        }
    };

    const deleteItem = async (id: string) => {
        setSyncing(true);
        setError(null);
        try {
            await deleteItineraryItem(id);
        } catch (err) {
            console.error('Delete item error:', err);
            setError('Failed to delete event');
        } finally {
            setSyncing(false);
        }
    };

    return {
        items,
        loading,
        syncing,
        error,
        createItem,
        updateItem,
        deleteItem,
    };
};
