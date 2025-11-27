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
                flightNumber: 'B6 641',
                flightIata: 'B6641',
                departureCity: 'BOS',
                arrivalCity: 'CLE',
                departureTime: '9:15 AM',
                arrivalTime: '11:25 AM',
                date: '2025-11-26',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: '5',
        name: 'Vashnav',
        segments: [
            {
                id: 'vashnav-1',
                flightNumber: 'AA 4348',
                flightIata: 'AA4348',
                departureCity: 'LGA', // NYC Departure
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
