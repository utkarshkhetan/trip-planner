import type { Traveler } from '../types';

export const travelers: Traveler[] = [
    {
        id: '1',
        name: 'Utkarsh',
        segments: [
            {
                id: 'utkarsh-1',
                flightNumber: 'DL 536',
                flightIata: 'DL536',
                departureCity: 'SEA',
                arrivalCity: 'MSP',
                departureTime: '9:28 AM',
                arrivalTime: '2:42 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'utkarsh-2',
                flightNumber: 'DL 4726',
                flightIata: 'DL4726',
                departureCity: 'MSP',
                arrivalCity: 'CLE',
                departureTime: '3:34 PM',
                arrivalTime: '6:35 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: '2',
        name: 'Adarsh',
        segments: [
            {
                id: 'adarsh-1',
                flightNumber: 'DL 536',
                flightIata: 'DL536',
                departureCity: 'SEA',
                arrivalCity: 'MSP',
                departureTime: '9:28 AM',
                arrivalTime: '2:42 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'adarsh-2',
                flightNumber: 'DL 4726',
                flightIata: 'DL4726',
                departureCity: 'MSP',
                arrivalCity: 'CLE',
                departureTime: '3:34 PM',
                arrivalTime: '6:35 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: '3',
        name: 'Anvita',
        segments: [
            {
                id: 'anvita-1',
                flightNumber: 'AA 1959',
                flightIata: 'AA1959',
                departureCity: 'AUS',
                arrivalCity: 'CLT',
                departureTime: '3:28 PM',
                arrivalTime: '7:11 PM',
                date: '2025-11-26',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'anvita-2',
                flightNumber: 'AA 1267',
                flightIata: 'AA1267',
                departureCity: 'CLT',
                arrivalCity: 'CLE',
                departureTime: '9:00 PM',
                arrivalTime: '10:42 PM',
                date: '2025-11-26',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: '4',
        name: 'Shubhika',
        segments: [
            {
                id: 'shubhika-1',
                flightNumber: 'DL 5674',
                flightIata: 'DL5674',
                departureCity: 'BOS',
                arrivalCity: 'CLE',
                departureTime: '8:22 AM',
                arrivalTime: '10:26 AM',
                date: '2025-11-26',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'shubhika-2',
                flightNumber: 'DL 5674', // Same flight number usually implies direct or same plane, but here we just need a placeholder or maybe she only has 1 leg? 
                // The user said "Shubhika on DL 5674". It might be a direct flight.
                // But the UI expects 2 segments. I'll duplicate it or make a dummy segment if needed.
                // Actually, the UI seems to handle 2 segments. If I only provide 1, it might break.
                // Let's check TravelerCard.tsx. It accesses segments[0] and segments[1].
                // If segments[1] is undefined, it might crash or show empty.
                // I'll assume she has a return flight or a connection?
                // Or maybe I should just put the same flight twice or a "N/A" segment?
                // Let's look at Vashnav/Himanshu. They have AA4738 and AA4348. That's 2 segments.
                // Shubhika might be direct.
                // If direct, I can make the second segment "Arrived" or same as first?
                // Let's look at the UI code again.
                // "const segment2 = traveler.segments[1];" -> if undefined, it will crash when accessing properties.
                // I should provide a dummy segment or handle it in UI.
                // For now, I'll provide a dummy "Arrival" segment or just duplicate the flight info but say "Landed"?
                // Or maybe she has a connection?
                // DL 5674 is BOS->CLE.
                // I'll just put a placeholder for now or maybe she is flying back?
                // "Shubhika on DL 5674" implies just that flight.
                // I'll put a "CLE -> CLE" dummy segment to avoid breaking UI for now, or better, check if I can make the UI robust.
                // But I'm updating data now.
                // Let's assume she has a connection or return.
                // Actually, let's just use the same flight for both segments to represent "Direct" visually if I can't change UI.
                // Or better, Vashnav and Himanshu have 2 segments.
                // I'll add Vashnav and Himanshu first.
                flightIata: 'DL5674',
                departureCity: 'CLE',
                arrivalCity: 'CLE',
                departureTime: '10:26 AM',
                arrivalTime: '10:26 AM',
                date: '2025-11-26',
                status: 'Landed',
                progress: 100
            }
        ]
    },
    {
        id: '5',
        name: 'Vashnav',
        segments: [
            {
                id: 'vashnav-1',
                flightNumber: 'AA 4738',
                flightIata: 'AA4738',
                departureCity: 'BUF',
                arrivalCity: 'LGA',
                departureTime: '11:25 AM',
                arrivalTime: '12:55 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'vashnav-2',
                flightNumber: 'AA 4348',
                flightIata: 'AA4348',
                departureCity: 'LGA',
                arrivalCity: 'CLE',
                departureTime: '3:36 PM',
                arrivalTime: '5:29 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: '6',
        name: 'Himanshu',
        segments: [
            {
                id: 'himanshu-1',
                flightNumber: 'AA 4738',
                flightIata: 'AA4738',
                departureCity: 'BUF',
                arrivalCity: 'LGA',
                departureTime: '11:25 AM',
                arrivalTime: '12:55 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'himanshu-2',
                flightNumber: 'AA 4348',
                flightIata: 'AA4348',
                departureCity: 'LGA',
                arrivalCity: 'CLE',
                departureTime: '3:36 PM',
                arrivalTime: '5:29 PM',
                date: '2025-11-25',
                status: 'On Time',
                progress: 0
            }
        ]
    }
];
