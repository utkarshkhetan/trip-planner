import { useState, useEffect } from 'react';

export type NotificationPermissionState = 'default' | 'granted' | 'denied';

export const useNotificationPermission = () => {
    const [permission, setPermission] = useState<NotificationPermissionState>('default');

    useEffect(() => {
        // Check if notifications are supported
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return;
        }

        // Set initial permission state
        setPermission(Notification.permission);
    }, []);

    const requestPermission = async () => {
        if (!('Notification' in window)) {
            console.warn('This browser does not support notifications');
            return 'denied';
        }

        try {
            const result = await Notification.requestPermission();
            setPermission(result);
            return result;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return 'denied';
        }
    };

    return {
        permission,
        requestPermission,
        isGranted: permission === 'granted',
        isDenied: permission === 'denied',
        isDefault: permission === 'default'
    };
};
