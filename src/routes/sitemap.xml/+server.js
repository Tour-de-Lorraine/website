import {directusGraphql} from '$lib/directus/index.js';
import safeFetch from '$lib/directus/safeFetch.js';
import sitemapQuery from '$lib/directus/queries/sitemap.js';

const SITE_URL = 'https://www.tourdelorraine.ch';

export async function GET() {
	const data = await safeFetch(async () => {
		return await directusGraphql.query(sitemapQuery, {
			lang: 'de',
		});
	});

	if (!data) {
		return new Response('Error generating sitemap', {status: 500});
	}

	const urls = [];

	// Home page
	urls.push({
		loc: `${SITE_URL}/`,
		priority: '1.0',
		changefreq: 'weekly',
	});

	// Static pages from Directus
	const staticPages = data.pages || [];
	for (const page of staticPages) {
		if (!page.isActive) continue;
		
		const pageId = page.id;
		// Skip archive page as it has its own entry
		if (pageId === 'archive') continue;
		
		urls.push({
			loc: `${SITE_URL}/${pageId}`,
			priority: '0.8',
			changefreq: 'weekly',
		});
	}

	// Archive page
	urls.push({
		loc: `${SITE_URL}/archiv`,
		priority: '0.7',
		changefreq: 'weekly',
	});

	// Edition years and their events
	const editions = data.editions || [];
	for (const edition of editions) {
		const year = edition.year;
		
		// Edition page
		urls.push({
			loc: `${SITE_URL}/archiv/${year}`,
			priority: '0.6',
			changefreq: 'monthly',
		});

		// Events for this edition
		const events = edition.events || [];
		for (const event of events) {
			const translations = event.translations || [];
			const translation = translations[0] || {};
			const slug = translation.slug;
			
			if (slug) {
				urls.push({
					loc: `${SITE_URL}/archiv/${year}/event/${slug}`,
					priority: '0.5',
					changefreq: 'monthly',
				});
			}
		}
	}

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <priority>${url.priority}</priority>
    <changefreq>${url.changefreq}</changefreq>
  </url>`).join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=3600',
		},
	});
}

function escapeXml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}