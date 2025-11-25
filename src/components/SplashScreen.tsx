import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 2500); // Reduced to 2.5 seconds
        return () => clearTimeout(timer);
    }, [onComplete]);

    const cities = ['Cleveland', 'Toronto', 'Buffalo'];

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Cool Neon Background */}
            <div className="absolute inset-0">
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-black/40 z-10 backdrop-blur-[1px]" />

                {/* Moving Neon Blobs - Faster and more vibrant */}
                <motion.div
                    className="absolute -top-[20%] -left-[20%] w-[70%] h-[70%] rounded-full bg-blue-500/40 blur-[80px]"
                    animate={{
                        x: [0, 150, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.3, 1],
                        rotate: [0, 90, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-purple-500/40 blur-[80px]"
                    animate={{
                        x: [0, -80, 0],
                        y: [0, 120, 0],
                        scale: [1, 1.4, 1],
                        rotate: [0, -60, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-pink-500/40 blur-[80px]"
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -80, 0],
                        scale: [1, 1.2, 1],
                        rotate: [0, 45, 0],
                    }}
                    transition={{
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center px-6 w-full max-w-md">
                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2 tracking-tighter">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                            Thanksgiving
                        </span>
                    </h1>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        Trip
                    </h2>
                </motion.div>

                {/* Cities */}
                <motion.div
                    className="flex flex-col gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {cities.map((city, index) => (
                        <motion.div
                            key={city}
                            className="bg-gray-900/40 border border-white/10 px-6 py-4 rounded-xl backdrop-blur-md shadow-2xl w-full group"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.15, duration: 0.5, type: "spring" }}
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(17, 24, 39, 0.6)" }}
                        >
                            <div className="flex items-center justify-center gap-4">
                                <MapPin className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                <span className="text-white font-bold text-xl tracking-wide group-hover:text-cyan-100 transition-colors">{city}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};
