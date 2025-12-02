import type { Traveler } from '../types';

export const arrivalFlights: Traveler[] = [
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

export const departureFlights: Traveler[] = [
    {
        id: 'd1',
        name: 'Shubhika',
        segments: [
            {
                id: 'shubhika-dep',
                flightNumber: 'B6 716',
                flightIata: 'B6716',
                departureCity: 'BUF',
                arrivalCity: 'BOS',
                departureTime: '11:48 AM',
                arrivalTime: '1:12 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: 'd2',
        name: 'Vashnav',
        segments: [
            {
                id: 'vashnav-dep',
                flightNumber: 'B6 206',
                flightIata: 'B6206',
                departureCity: 'BUF',
                arrivalCity: 'LGA',
                departureTime: '11:20 AM',
                arrivalTime: '12:45 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: 'd3',
        name: 'Himanshu',
        segments: [
            {
                id: 'himanshu-dep',
                flightNumber: 'B6 206',
                flightIata: 'B6206',
                departureCity: 'BUF',
                arrivalCity: 'LGA',
                departureTime: '11:20 AM',
                arrivalTime: '12:45 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: 'd4',
        name: 'Adarsh',
        segments: [
            {
                id: 'adarsh-dep',
                flightNumber: 'B6 2901',
                flightIata: 'B62901',
                departureCity: 'BUF',
                arrivalCity: 'JFK',
                departureTime: '12:18 PM',
                arrivalTime: '1:43 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: 'd5',
        name: 'Utkarsh',
        segments: [
            {
                id: 'utkarsh-dep',
                flightNumber: 'B6 2901',
                flightIata: 'B62901',
                departureCity: 'BUF',
                arrivalCity: 'JFK',
                departureTime: '12:18 PM',
                arrivalTime: '1:43 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    },
    {
        id: 'd6',
        name: 'Anvita',
        segments: [
            {
                id: 'anvita-dep-1',
                flightNumber: 'AA 1545',
                flightIata: 'AA1545',
                departureCity: 'BUF',
                arrivalCity: 'CLT',
                departureTime: '12:22 PM',
                arrivalTime: '2:25 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            },
            {
                id: 'anvita-dep-2',
                flightNumber: 'AA 2824',
                flightIata: 'AA2824',
                departureCity: 'CLT',
                arrivalCity: 'AUS',
                departureTime: '4:30 PM',
                arrivalTime: '6:45 PM',
                date: '2025-12-02',
                status: 'On Time',
                progress: 0
            }
        ]
    }
];
