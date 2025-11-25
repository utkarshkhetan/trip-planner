import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock } from 'lucide-react';
import type { Traveler } from '../../types';
import { useSimulatedFlight } from '../../hooks/useSimulatedFlight';
import { cn } from '../../lib/utils';


export const TravelerCard: React.FC<{ traveler: Traveler }> = ({ traveler }) => {
    const segment1 = traveler.segments[0];
    const segment2 = traveler.segments[1];

    // Use simulated data
    const sim1 = useSimulatedFlight(segment1);
    const sim2 = useSimulatedFlight(segment2);

    // Calculate total progress (0-100 across both legs)
    // Leg 1: 0-45%, Layover: 45-55%, Leg 2: 55-100%
    const getTotalProgress = () => {
        let total = 0;

        // Leg 1 contribution (0-45)
        if (sim1.status === 'Landed') {
            total += 45;
        } else if (sim1.status === 'In Air') {
            total += (sim1.progress / 100) * 45;
        }

        // Layover contribution (45-55)
        // If Leg 1 landed but Leg 2 hasn't started boarding
        if (sim1.status === 'Landed' && sim2.status !== 'In Air' && sim2.status !== 'Landed') {
            // Simple time-based progress for layover could be added here, 
            // but for now let's just fill it if Leg 2 is close
            if (sim2.status === 'Boarding') total += 8; // Almost done with layover
            else total += 5; // In layover
        } else if (sim2.status === 'In Air' || sim2.status === 'Landed') {
            total += 10; // Layover done
        }

        // Leg 2 contribution (55-100)
        if (sim2.status === 'Landed') {
            total += 45;
        } else if (sim2.status === 'In Air') {
            total += (sim2.progress / 100) * 45;
        }

        return Math.min(100, total);
    };

    const totalProgress = getTotalProgress();

    // Determine overall traveler status
    const getOverallStatus = () => {
        if (sim1.status === 'In Air') return 'Leg 1: In Air';
        if (sim2.status === 'In Air') return 'Leg 2: In Air';
        if (sim1.status === 'Landed' && sim2.status === 'Not Boarded') return 'Layover';
        if (sim1.status === 'Landed' && sim2.status === 'Boarding') return 'Boarding Leg 2';
        if (sim1.status === 'Boarding') return 'Boarding Leg 1';
        if (sim2.status === 'Landed') return 'Arrived';
        if (sim1.status === 'Checked In') return 'Checked In';
        return 'Not Started';
    };

    const overallStatus = getOverallStatus();
    const isArrived = overallStatus === 'Arrived';

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Time': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Delayed': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'In Air': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'Landed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            case 'Boarding': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Checked In': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
            case 'Not Boarded': return 'bg-gray-700/50 text-gray-400 border-gray-600/50';
            case 'Not Started': return 'bg-gray-700/50 text-gray-400 border-gray-600/50';
            default: return 'bg-gray-800 text-gray-400 border-gray-700';
        }
    };

    // Calculate total journey duration string
    const getTotalJourneyTime = () => {
        // Hardcoded for simplicity as requested, or could calculate from dates
        if (segment1.flightIata === 'DL536') return '6h 7m';
        if (segment1.flightIata === 'AA1959') return '6h 14m';
        if (segment1.flightIata === 'AA4738') return '6h 4m';
        return '6h 10m';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "glass p-5 rounded-2xl border relative overflow-hidden group transition-all duration-300",
                isArrived
                    ? "border-green-500/50 bg-green-500/10 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                    : "border-white/10 hover:border-white/20"
            )}
        >
            {/* Background Glow */}
            <div className={cn(
                "absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity",
                isArrived ? "bg-green-500/20 opacity-100" : "bg-primary/10 opacity-0 group-hover:opacity-75"
            )} />

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div>
                    <h3 className={cn("text-xl font-bold mb-1", isArrived ? "text-green-100" : "text-white")}>
                        {traveler.name}
                    </h3>
                    <div className="text-xs text-gray-400 mb-1 font-medium">
                        {new Date(segment1.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className={cn("font-medium", isArrived ? "text-green-200/70" : "text-white/80")}>{segment1.flightNumber}</span>
                        <span className={cn("w-1 h-1 rounded-full", isArrived ? "bg-green-500/50" : "bg-gray-600")} />
                        <span className={cn("font-medium", isArrived ? "text-green-200/70" : "text-white/80")}>{segment2.flightNumber}</span>
                    </div>
                </div>
                <div className={cn(
                    "px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md uppercase tracking-wider shadow-lg transition-colors duration-300",
                    overallStatus.includes('In Air') ? "bg-blue-500 text-white border-blue-400 animate-pulse" :
                        overallStatus === 'Arrived' ? "bg-green-500 text-white border-green-400 shadow-green-500/20" :
                            "bg-white/10 text-white border-white/20"
                )}>
                    {overallStatus}
                </div>
            </div>

            {/* Route & Progress */}
            <div className="mb-6 relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    {/* Origin */}
                    <div className="text-center flex-shrink-0 w-12">
                        <div className={cn("text-xl font-bold", isArrived ? "text-green-100" : "text-white")}>{segment1.departureCity}</div>
                        <div className={cn("text-[10px]", isArrived ? "text-green-200/60" : "text-gray-400")}>{segment1.departureTime}</div>
                    </div>

                    {/* Continuous progress bar */}
                    <div className="flex-1 relative h-12 flex items-center">
                        <div className={cn("w-full h-1.5 rounded-full relative overflow-visible", isArrived ? "bg-green-900/40" : "bg-gray-800")}>
                            {/* Combined progress fill */}
                            <motion.div
                                className={cn("absolute top-0 left-0 h-full rounded-full", isArrived ? "bg-green-500" : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500")}
                                initial={{ width: 0 }}
                                animate={{ width: `${totalProgress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                            />

                            {/* Single Plane */}
                            <motion.div
                                className="absolute top-1/2 z-20"
                                initial={{ left: 0 }}
                                animate={{ left: `${totalProgress}%` }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                style={{ x: '-50%', y: '-50%' }}
                            >
                                <div className={cn(
                                    "p-1.5 rounded-full shadow-lg transform rotate-45 transition-colors duration-300",
                                    isArrived ? "bg-green-500 text-white shadow-green-500/40" :
                                        (overallStatus.includes('In Air') ? "bg-blue-500 text-white shadow-blue-500/40" : "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]")
                                )}>
                                    <Plane className="w-3.5 h-3.5" />
                                </div>
                            </motion.div>

                            {/* Layover marker */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
                                <div className={cn("w-2 h-2 rounded-full border-2 transition-colors duration-300",
                                    (sim1.status === 'Landed' || isArrived) ? "bg-green-500 border-green-600" : "bg-gray-700 border-gray-900"
                                )} />
                                <div className={cn(
                                    "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded backdrop-blur-sm transition-colors duration-300",
                                    (sim1.status === 'Landed' || isArrived) ? "text-green-300 bg-green-900/40" : "text-gray-500 bg-gray-900/80"
                                )}>
                                    {segment1.arrivalCity}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="text-center flex-shrink-0 w-12">
                        <div className={cn("text-xl font-bold", isArrived ? "text-green-100" : "text-white")}>{segment2.arrivalCity}</div>
                        <div className={cn("text-[10px]", isArrived ? "text-green-200/60" : "text-gray-400")}>{segment2.arrivalTime}</div>
                    </div>
                </div>
            </div>

            {/* Footer Status Pills & Total Time */}
            <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex gap-2">
                    <div className={cn("flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-colors duration-300", getStatusColor(sim1.status))}>
                        <span className="text-[10px] font-bold">Leg 1: {sim1.status}</span>
                    </div>
                    <div className={cn("flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-colors duration-300", getStatusColor(sim2.status))}>
                        <span className="text-[10px] font-bold">Leg 2: {sim2.status}</span>
                    </div>
                </div>

                {/* Integrated Total Time */}
                <div className={cn(
                    "flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border",
                    isArrived ? "bg-green-500/20 border-green-500/30 text-green-100" : "bg-white/5 border-white/10 text-gray-400"
                )}>
                    <Clock className="w-3 h-3" />
                    <span>{getTotalJourneyTime()}</span>
                </div>
            </div>
        </motion.div>
    );
};
