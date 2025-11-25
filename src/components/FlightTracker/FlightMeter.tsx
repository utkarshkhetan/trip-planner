import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, AlertTriangle } from 'lucide-react';
import type { FlightSegment } from '../../types';
import { cn } from '../../lib/utils';
import { useFlightStatus } from '../../hooks/useFlightStatus';

interface FlightMeterProps {
    segment: FlightSegment;
}

export const FlightMeter: React.FC<FlightMeterProps> = ({ segment }) => {
    const { data: liveData } = useFlightStatus(segment.flightIata);

    const displayData = useMemo(() => {
        if (!liveData) return segment;

        // Calculate progress based on live data
        let progress = 0;
        let status: FlightSegment['status'] = 'On Time';

        if (liveData.status === 'en-route') {
            status = 'In Air';
            const totalDuration = liveData.arr_time_ts - liveData.dep_time_ts;
            const elapsed = Date.now() / 1000 - liveData.dep_time_ts;
            progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        } else if (liveData.status === 'landed') {
            status = 'Landed';
            progress = 100;
        } else if (liveData.status === 'scheduled') {
            status = 'On Time';
            progress = 0;
        }

        // Check for delays
        if (liveData.dep_delayed || liveData.arr_delayed) {
            status = 'Delayed';
        }

        return {
            ...segment,
            status,
            progress,
            departureTime: new Date(liveData.dep_time_ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrivalTime: new Date(liveData.arr_time_ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    }, [segment, liveData]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Time': return 'text-green-400 bg-green-400/10 border-green-400/20';
            case 'Delayed': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'Landed': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'In Air': return 'text-primary bg-primary/10 border-primary/20';
            default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
        }
    };

    return (
        <div className="glass p-4 rounded-2xl mb-4 relative group">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{displayData.flightNumber}</h3>
                        {liveData && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                                LIVE
                            </span>
                        )}
                    </div>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-md", getStatusColor(displayData.status))}>
                    {displayData.status}
                </div>
            </div>

            {/* Route */}
            <div className="flex justify-between items-center mb-6 relative z-10">
                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{displayData.departureCity}</div>
                    <div className="text-xs text-gray-400">{displayData.departureTime}</div>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 mx-4 relative h-1 bg-gray-800 rounded-full">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${displayData.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />

                    {/* Plane Icon */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 z-20"
                        initial={{ left: 0 }}
                        animate={{ left: `${displayData.progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ x: '-50%' }}
                    >
                        <div className="bg-black p-1.5 rounded-full border border-gray-700 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            <Plane className="w-4 h-4 text-white rotate-45" />
                        </div>
                    </motion.div>
                </div>

                <div className="text-center">
                    <div className="text-2xl font-bold text-white">{displayData.arrivalCity}</div>
                    <div className="text-xs text-gray-400">{displayData.arrivalTime}</div>
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center text-xs text-gray-500 relative z-10">
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Duration: 4h 30m</span>
                </div>
                {displayData.status === 'Delayed' && (
                    <div className="flex items-center gap-1 text-red-400">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Delayed</span>
                    </div>
                )}
            </div>
        </div>
    );
};
