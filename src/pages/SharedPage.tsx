import React from 'react';
import { LinkSection } from '../components/Shared/LinkSection';
import { DollarSign, Image } from 'lucide-react';
import { motion } from 'framer-motion';

export const SharedPage: React.FC = () => {
    return (
        <motion.div
            className="pb-24 pt-6 px-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
        >
            <h2 className="text-3xl font-bold text-white mb-8 text-center mt-4">Shared Resources</h2>
            <div className="space-y-6">
                <LinkSection
                    title="Splitwise Group"
                    description="Track and split expenses"
                    link="https://www.splitwise.com/join/vDXVfobm1Rs+3n3bj?v=e"
                    icon={DollarSign}
                    color="green"
                    delay={0}
                />
                <LinkSection
                    title="iCloud Photos"
                    description="Shared Album"
                    link="https://www.icloud.com/sharedalbum/#B2A5ejO17JIfKN2"
                    icon={Image}
                    color="blue"
                    delay={0.2}
                />
                <LinkSection
                    title="Google Photos"
                    description="Shared Album"
                    link="https://photos.app.goo.gl/Z2S8xrX7nJWLtsWe6"
                    icon={Image}
                    color="yellow"
                    delay={0.4}
                />
            </div>
        </motion.div>
    );
};
