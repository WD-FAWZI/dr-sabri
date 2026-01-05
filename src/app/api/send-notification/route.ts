import { NextResponse } from 'next/server';
import webPush from 'web-push';
import fs from 'fs';
import path from 'path';

// Configure web-push
if (
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY &&
    process.env.VAPID_PRIVATE_KEY &&
    process.env.VAPID_SUBJECT
) {
    webPush.setVapidDetails(
        process.env.VAPID_SUBJECT,
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
    );
} else {
    console.warn('VAPID keys are missing/incomplete in environment variables.');
}

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'subscriptions.json');

const getSubscriptions = () => {
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) return [];
        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return [];
    }
};

const saveSubscriptions = (subscriptions: any[]) => {
    try {
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(subscriptions, null, 2));
    } catch (error) {
        console.error('Error saving subscriptions:', error);
    }
};

export async function POST(request: Request) {
    try {
        // 1. Security Check
        const adminSecret = request.headers.get('x-admin-secret');
        if (adminSecret !== process.env.ADMIN_SECRET_KEY) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 2. Parse payload
        const body = await request.json();
        const { title, message, url, icon } = body;

        if (!title || !message) {
            return NextResponse.json({ error: 'Title and message are required' }, { status: 400 });
        }

        const payload = JSON.stringify({
            title,
            body: message,
            url: url || '/',
            icon: icon || '/images/icon-192.png',
        });

        // 3. Send Notifications
        const subscriptions = getSubscriptions();

        if (subscriptions.length === 0) {
            return NextResponse.json({ success: true, message: 'No subscriptions to send to.' });
        }

        const validSubscriptions: any[] = [];
        let sentCount = 0;
        let failCount = 0;

        const sendPromises = subscriptions.map(async (sub: any) => {
            try {
                await webPush.sendNotification(sub, payload);
                validSubscriptions.push(sub);
                sentCount++;
            } catch (error: any) {
                // If 410 Gone, the subscription is invalid
                if (error.statusCode === 410) {
                    console.log('Removing expired subscription:', sub.endpoint);
                } else {
                    console.error('Error sending notification:', error);
                    // Keep it if it's a temporary error, or remove? 
                    // For safety, let's keep unless strictly 410 or 404
                    validSubscriptions.push(sub);
                    failCount++;
                }
            }
        });

        await Promise.all(sendPromises);

        // 4. Cleanup invalid subscriptions
        if (subscriptions.length !== validSubscriptions.length) {
            saveSubscriptions(validSubscriptions);
        }

        return NextResponse.json({
            success: true,
            message: `Notifications sent: ${sentCount}, Failed: ${failCount}`,
            totalSubscribers: validSubscriptions.length,
        });

    } catch (error) {
        console.error('Error in /api/send-notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
