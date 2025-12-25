import certificatesData from '@/data/certificates.json';
import { certificateIdSchema } from '@/lib/validation';

export interface Certificate {
    id: string;
    studentName: string;
    studentNameEn: string;
    courseName: string;
    courseNameEn: string;
    issueDate: string;
    status: 'valid' | 'invalid';
}

/**
 * CertificateService - Data layer for certificate verification
 * 
 * DEMO MODE: Currently uses local JSON data
 * PRODUCTION: Replace with API calls
 * 
 * Design pattern: Service layer isolates data source from UI
 * This allows easy API integration later without UI changes
 */
class CertificateService {
    /**
     * Verify certificate by ID
     * @param certificateId - The certificate ID to verify
     * @returns Certificate data if found, null otherwise
     * 
     * TODO for API integration:
     * Replace with: await fetch(`/api/certificates/verify/${certificateId}`)
     */
    async verifyCertificate(certificateId: string): Promise<Certificate | null> {
        // Simulate API delay for realistic UX
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Sanitize input
        const sanitizedId = certificateId.trim().toUpperCase();

        // Search in local data
        const certificate = certificatesData.find(
            (cert) => cert.id.toUpperCase() === sanitizedId
        );

        return certificate ? (certificate as Certificate) : null;
    }

    /**
     * Validate certificate ID format
     * Format: STC-YYYY-NNN (e.g., STC-2024-001)
     */
    validateFormat(certificateId: string): boolean {
        const result = certificateIdSchema.safeParse(certificateId.trim());
        return result.success;
    }
}

// Export singleton instance
export const certificateService = new CertificateService();
