const SITE_URL = 'https://www.tourdelorraine.ch';

export async function GET() {
	const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
			'Cache-Control': 'max-age=86400',
		},
	});
}