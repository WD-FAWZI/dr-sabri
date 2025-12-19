import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://dr-sabri.com'; // TODO: Replace with actual domain
    const locales = ['ar', 'en'];

    const routes = ['', '/verify'];

    const sitemap: MetadataRoute.Sitemap = [];

    // Generate URLs for each locale and route
    locales.forEach((locale) => {
        routes.forEach((route) => {
            sitemap.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: route === '' ? 1 : 0.8,
                alternates: {
                    languages: {
                        ar: `${baseUrl}/ar${route}`,
                        en: `${baseUrl}/en${route}`,
                    },
                },
            });
        });
    });

    return sitemap;
}
