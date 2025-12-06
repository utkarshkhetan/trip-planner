import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { AnimatePresence } from 'framer-motion';

export const Layout: React.FC = () => {
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background text-white relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-md mx-auto min-h-screen bg-black/20 shadow-2xl border-x border-white/5 pb-32">
                <AnimatePresence mode="wait">
                    <Outlet key={location.pathname} />
                </AnimatePresence>
            </div>

            <BottomNav />
        </div>
    );
};
