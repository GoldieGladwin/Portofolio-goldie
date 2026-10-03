import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldi.my.id';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/admin', '/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
