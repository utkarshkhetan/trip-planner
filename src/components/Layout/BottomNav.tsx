import React from 'react';
import { NavLink } from 'react-router-dom';
import { Plane, Home, Calendar, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const BottomNav: React.FC = () => {
    const navItems = [
        { icon: Plane, label: 'Flights', path: '/flights' },
        { icon: Home, label: 'Stay', path: '/accommodation' },
        { icon: Calendar, label: 'Itinerary', path: '/itinerary' },
        { icon: Share2, label: 'Shared', path: '/shared' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-6 pt-2">
            <div className="glass mx-auto max-w-md rounded-2xl backdrop-blur-xl bg-black/40 border-white/10 shadow-lg">
                <nav className="flex justify-around items-center h-16">
                    {navItems.map(({ icon: Icon, label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            className={({ isActive }) => cn(
                                "relative flex flex-col items-center justify-center w-full h-full gap-1 transition-colors duration-300",
                                isActive ? "text-primary" : "text-gray-500 hover:text-gray-300"
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute -top-2 w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <Icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]")} />
                                    <span className="text-[10px] font-medium">{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
};
