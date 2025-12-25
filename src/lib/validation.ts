import { z } from 'zod';

/**
 * Validation schema for Contact Form
 * Ensures strict typing and sanitization for user inputs
 */
export const contactFormSchema = z.object({
    name: z.string()
        .min(2, { message: "Name must be at least 2 characters" })
        .max(50, { message: "Name must be less than 50 characters" })
        .regex(/^[\p{L}\s]+$/u, { message: "Name can only contain letters and spaces" }), // Unicode regex for Arabic name support

    email: z.string()
        .email({ message: "Invalid email address" }),

    subject: z.string()
        .min(3, { message: "Subject must be at least 3 characters" })
        .max(100, { message: "Subject must be less than 100 characters" }),

    message: z.string()
        .min(10, { message: "Message must be at least 10 characters" })
        .max(1000, { message: "Message must be less than 1000 characters" })
});

/**
 * Validation schema for Certificate ID
 * Format: STC-YYYY-NNN
 */
export const certificateIdSchema = z.string()
    .regex(/^STC-\d{4}-\d{3}$/i, { message: "Invalid certificate ID format (e.g. STC-2024-001)" });

export type ContactFormData = z.infer<typeof contactFormSchema>;
