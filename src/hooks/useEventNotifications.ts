import { useEffect, useRef } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { ItineraryItem } from '../types';

const ITINERARY_COLLECTION = 'itinerary';

export const useEventNotifications = (isEnabled: boolean) => {
    const notifiedEventsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        if (!isEnabled || !('Notification' in window) || Notification.permission !== 'granted') {
            return;
        }

        const checkEvents = async () => {
            try {
                const now = new Date();
                const currentMonth = now.getMonth() + 1; // 1-indexed
                const currentDay = now.getDate();
                const currentHour = now.getHours();
                const currentMinute = now.getMinutes();

                // Fetch all events
                const eventsQuery = query(collection(db, ITINERARY_COLLECTION));
                const snapshot = await getDocs(eventsQuery);

                snapshot.docs.forEach((doc) => {
                    const event = { id: doc.id, ...doc.data() } as ItineraryItem & { id: string };

                    // Parse event date and time
                    const [, month, day] = event.date.split('-').map(Number);
                    const [hours, minutes] = event.time.split(':').map(Number);

                    // Check if event matches current time (ignoring year)
                    const isEventNow =
                        month === currentMonth &&
                        day === currentDay &&
                        hours === currentHour &&
                        minutes === currentMinute;

                    // Trigger notification if event matches and hasn't been notified
                    if (isEventNow && !notifiedEventsRef.current.has(event.id)) {
                        showNotification(event);
                        notifiedEventsRef.current.add(event.id);
                    }
                });
            } catch (error) {
                console.error('Error checking events for notifications:', error);
            }
        };

        // Check every minute
        const interval = setInterval(checkEvents, 60000);

        // Check immediately on mount
        checkEvents();

        return () => clearInterval(interval);
    }, [isEnabled]);
};

const showNotification = (event: ItineraryItem) => {
    const options: NotificationOptions = {
        body: event.description || 'It\'s time!',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: event.title, // Prevent duplicate notifications
        requireInteraction: false
    };

    const notification = new Notification(`${event.icon} ${event.title}`, options);

    notification.onclick = () => {
        window.focus();
        window.location.href = '/itinerary';
        notification.close();
    };
};
