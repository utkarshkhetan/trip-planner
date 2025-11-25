import { useState, useEffect } from 'react';
import type { FlightSegment } from '../types';

export interface SimulatedFlightStatus {
    status: FlightSegment['status'];
    progress: number; // 0-100
    timeToDeparture: number; // minutes
    timeToArrival: number; // minutes
}

export const useSimulatedFlight = (segment: FlightSegment) => {
    const [status, setStatus] = useState<SimulatedFlightStatus>({
        status: 'Not Boarded',
        progress: 0,
        timeToDeparture: 0,
        timeToArrival: 0
    });

    useEffect(() => {
        const calculateStatus = () => {
            const now = new Date();

            // Parse times
            const parseDateTime = (dateStr: string, timeStr: string) => {
                const [time, period] = timeStr.split(' ');
                const [hours, minutes] = time.split(':');
                let h = parseInt(hours);
                if (period === 'PM' && h !== 12) h += 12;
                if (period === 'AM' && h === 12) h = 0;

                const [year, month, day] = dateStr.split('-').map(Number);
                // Create date in local timezone
                return new Date(year, month - 1, day, h, parseInt(minutes));
            };

            const depTime = parseDateTime(segment.date, segment.departureTime);
            const arrTime = parseDateTime(segment.date, segment.arrivalTime);

            // Handle overnight flights
            if (arrTime < depTime) {
                arrTime.setDate(arrTime.getDate() + 1);
            }

            const totalDuration = arrTime.getTime() - depTime.getTime();
            const timeToDep = (depTime.getTime() - now.getTime()) / (1000 * 60); // minutes
            const timeToArr = (arrTime.getTime() - now.getTime()) / (1000 * 60); // minutes

            let currentStatus: FlightSegment['status'] = 'Not Boarded';
            let progress = 0;

            if (now > arrTime) {
                currentStatus = 'Landed';
                progress = 100;
            } else if (now >= depTime) {
                currentStatus = 'In Air';
                const elapsed = now.getTime() - depTime.getTime();
                progress = Math.min(100, (elapsed / totalDuration) * 100);
            } else if (timeToDep <= 30) {
                currentStatus = 'Boarding';
                progress = 0;
            } else if (timeToDep <= 120) {
                currentStatus = 'Checked In';
                progress = 0;
            } else {
                currentStatus = 'Not Boarded';
                progress = 0;
            }

            setStatus({
                status: currentStatus,
                progress,
                timeToDeparture: timeToDep,
                timeToArrival: timeToArr
            });
        };

        calculateStatus();
        const interval = setInterval(calculateStatus, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [segment]);

    return status;
};
