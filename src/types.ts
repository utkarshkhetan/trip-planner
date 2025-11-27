export interface FlightSegment {
    id: string;
    flightNumber: string; // Display name e.g. "UA 1234"
    flightIata?: string; // API code e.g. "UA1234"
    departureCity: string;
    arrivalCity: string;
    departureTime: string;
    arrivalTime: string;
    status: 'On Time' | 'Delayed' | 'Boarding' | 'In Air' | 'Landed' | 'Checked In' | 'Not Boarded';
    progress: number; // 0 to 100
    date: string; // YYYY-MM-DD
    apiData?: any; // Store raw API data
}

export interface Traveler {
    id: string;
    name: string;
    segments: FlightSegment[];
}

export interface Accommodation {
    id: string;
    city: string;
    imageUrl: string;
    airbnbLink: string;
    dates: string;
}

export interface LinkPreviewData {
    url: string;
    title?: string;
    description?: string;
    image?: string;
    siteName?: string;
}

export interface TimelineEvent {
    id: string;
    title: string;
    date: string; // e.g., 'Nov 25'
    time: string; // e.g., '12:00 PM'
    description?: string;
    link?: string;
    type: 'food' | 'transport' | 'shopping' | 'sightseeing' | 'flight' | 'other';
    icon?: string;
}

export interface ItineraryItem {
    id?: string; // Firestore auto-generates this
    title: string;
    description?: string;
    date: string; // YYYY-MM-DD
    time: string; // HH:MM
    icon?: string; // Custom icon emoji
    linkPreviews?: LinkPreviewData[];
    isCompleted: boolean;
    createdAt: number; // timestamp
    updatedAt: number; // timestamp
}

export interface Quote {
    id?: string;
    text: string;
    author: string;
    createdAt: number;
    createdBy?: string;
}

