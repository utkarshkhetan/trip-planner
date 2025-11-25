import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LinkSectionProps {
    title: string;
    description: string;
    link: string;
    icon: LucideIcon;
    color: string;
    delay?: number;
}

export const LinkSection: React.FC<LinkSectionProps> = ({
    title,
    description,
    link,
    icon: Icon,
    color,
    delay = 0
}) => {
    return (
        <motion.a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block glass p-8 rounded-3xl hover:bg-white/5 transition-all group relative overflow-hidden min-h-[200px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Background glow */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl",
                color === 'green' && "bg-green-500/10",
                color === 'blue' && "bg-blue-500/10"
            )} />

            {/* Content */}
            <div className="relative z-10 flex items-center gap-6">
                <div className={cn(
                    "p-6 rounded-2xl backdrop-blur-sm transition-colors duration-300",
                    color === 'green' && "bg-green-500/10 text-green-400 group-hover:bg-green-500/20",
                    color === 'blue' && "bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20"
                )}>
                    <Icon className="w-12 h-12" />
                </div>

                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        {title}
                        <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-base text-gray-400">{description}</p>
                </div>
            </div>
        </motion.a>
    );
};
