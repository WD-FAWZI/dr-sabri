import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the localized JSON file for mocking DB
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'subscriptions.json');

// Helper to read subscriptions
const getSubscriptions = () => {
    try {
        if (!fs.existsSync(DATA_FILE_PATH)) {
            return [];
        }
        const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Error reading subscriptions:', error);
        return [];
    }
};

// Helper to write subscriptions
const saveSubscriptions = (subscriptions: any[]) => {
    try {
        // Ensure directory exists
        const dir = path.dirname(DATA_FILE_PATH);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(subscriptions, null, 2));
    } catch (error) {
        console.error('Error saving subscriptions:', error);
    }
};

export async function POST(request: Request) {
    try {
        const subscription = await request.json();

        if (!subscription || !subscription.endpoint) {
            return NextResponse.json({ error: 'Invalid subscription object' }, { status: 400 });
        }

        const currentSubscriptions = getSubscriptions();

        // Check for duplicates
        const isDuplicate = currentSubscriptions.some(
            (sub: any) => sub.endpoint === subscription.endpoint
        );

        if (!isDuplicate) {
            currentSubscriptions.push(subscription);
            saveSubscriptions(currentSubscriptions);
            console.log('New subscription added. Total:', currentSubscriptions.length);
        } else {
            console.log('Subscription already exists.');
        }

        return NextResponse.json({ success: true, message: 'Subscribed successfully' });
    } catch (error) {
        console.error('Error in /api/subscribe:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
