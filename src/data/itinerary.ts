import type { TimelineEvent } from '../types';

export const initialEvents: TimelineEvent[] = [
    // Day 1: Nov 25
    {
        id: '1',
        title: 'Arrival in Cleveland',
        date: 'Nov 25',
        time: '12:00 PM',
        description: 'Everyone meets at the Airbnb',
        type: 'other',
        icon: '🏠'
    },
    {
        id: '2',
        title: 'Lunch at West Side Market',
        date: 'Nov 25',
        time: '01:30 PM',
        description: 'Grab some food at the famous market',
        link: 'http://westsidemarket.org/',
        type: 'food',
        icon: '🍽️'
    },
    {
        id: '3',
        title: 'Rock & Roll Hall of Fame',
        date: 'Nov 25',
        time: '03:00 PM',
        description: 'Tour the museum',
        link: 'https://www.rockhall.com/',
        type: 'sightseeing',
        icon: '🎸'
    },
    // Day 2: Nov 26
    {
        id: '4',
        title: 'Cleveland Museum of Art',
        date: 'Nov 26',
        time: '10:00 AM',
        description: 'Explore the art museum',
        type: 'sightseeing',
        icon: '🎨'
    },
    {
        id: '5',
        title: 'Dinner at The Flats',
        date: 'Nov 26',
        time: '07:00 PM',
        description: 'Dinner and drinks by the river',
        type: 'food',
        icon: '🍽️'
    },
    // Day 3: Nov 27 (Thanksgiving)
    {
        id: '6',
        title: 'Thanksgiving Dinner',
        date: 'Nov 27',
        time: '04:00 PM',
        description: 'Traditional Thanksgiving feast at the Airbnb',
        type: 'food',
        icon: '🦃'
    },
    // Day 4: Nov 28 (Toronto)
    {
        id: '7',
        title: 'Road Trip to Toronto',
        date: 'Nov 28',
        time: '09:00 AM',
        description: 'Drive to Toronto (approx 4.5 hours)',
        type: 'transport',
        icon: '🚗'
    },
    {
        id: '8',
        title: 'Check-in to Toronto Airbnb',
        date: 'Nov 28',
        time: '03:00 PM',
        description: 'Settle in',
        type: 'other',
        icon: '🏠'
    },
    // Day 5: Nov 29
    {
        id: '9',
        title: 'CN Tower',
        date: 'Nov 29',
        time: '11:00 AM',
        description: 'Visit the iconic tower',
        type: 'sightseeing',
        icon: '🗼'
    },
    {
        id: '10',
        title: 'Distillery District',
        date: 'Nov 29',
        time: '04:00 PM',
        description: 'Explore the historic district',
        type: 'sightseeing',
        icon: '🏛️'
    },
    // Day 6: Nov 30 (Toronto)
    {
        id: '11',
        title: 'Explore Toronto',
        date: 'Nov 30',
        time: '10:00 AM',
        description: 'Free day to explore the city',
        type: 'sightseeing',
        icon: '🌆'
    },
    // Day 7: Dec 1 (Buffalo)
    {
        id: '12',
        title: 'Road Trip to Buffalo',
        date: 'Dec 1',
        time: '10:00 AM',
        description: 'Drive to Buffalo',
        type: 'transport',
        icon: '🚗'
    },
    {
        id: '13',
        title: 'Niagara Falls',
        date: 'Dec 1',
        time: '01:00 PM',
        description: 'See the falls from the US side',
        type: 'sightseeing',
        icon: '💧'
    },
    {
        id: '14',
        title: 'Buffalo Bills Bar',
        date: 'Dec 1',
        time: '07:00 PM',
        description: 'Watch the game/drinks',
        type: 'food',
        icon: '🍻'
    },
    // Day 8: Dec 2
    {
        id: '15',
        title: 'Fly Home',
        date: 'Dec 2',
        time: '12:00 PM',
        description: 'Head to the airport',
        type: 'flight',
        icon: '✈️'
    }
];
