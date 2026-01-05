export class PushNotificationManager {
    public static async requestPermission(): Promise<NotificationPermission> {
        if (!('Notification' in window)) {
            throw new Error('Notifications not supported');
        }
        return await Notification.requestPermission();
    }

    public static async registerSubscription(): Promise<PushSubscription | null> {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service Workers not supported');
        }

        const registration = await navigator.serviceWorker.ready;

        // Check if already subscribed
        const existingSubscription = await registration.pushManager.getSubscription();
        if (existingSubscription) {
            return existingSubscription;
        }

        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
        if (!vapidPublicKey) {
            throw new Error('VAPID Public Key not found');
        }

        const convertedVapidKey = this.urlBase64ToUint8Array(vapidPublicKey);

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: convertedVapidKey.buffer as ArrayBuffer
        });

        // Send to backend
        await this.saveSubscriptionToBackend(subscription);

        return subscription;
    }

    public static async saveSubscriptionToBackend(subscription: PushSubscription) {
        const response = await fetch('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(subscription),
        });

        if (!response.ok) {
            throw new Error('Failed to save subscription to backend');
        }
    }

    // iOS Detection Helper
    public static isIOS(): boolean {
        if (typeof window === 'undefined') return false;

        const userAgent = window.navigator.userAgent.toLowerCase();
        return /iphone|ipad|ipod/.test(userAgent);
    }

    public static isStandalone(): boolean {
        if (typeof window === 'undefined') return false;
        return ('standalone' in window.navigator) && (window.navigator as any).standalone;
    }

    private static urlBase64ToUint8Array(base64String: string): Uint8Array {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }
}
