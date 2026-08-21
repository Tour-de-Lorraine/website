/**
 * Script to generate sitemap.xml and robots.txt
 * Run this after building the site: node scripts/generate-sitemap.js
 * 
 * This fetches data from Directus and generates static sitemap.xml and robots.txt files
 * in the build directory.
 */

import {createDirectus, staticToken, graphql} from '@directus/sdk';
import {writeFileSync, readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SITE_URL = 'https://www.tourdelorraine.ch';

// Read .env file
function loadEnv() {
	try {
		const envPath = join(__dirname, '..', '.env');
		const envContent = readFileSync(envPath, 'utf-8');
		const env = {};
		for (const line of envContent.split('\n')) {
			const [key, ...valueParts] = line.split('=');
			if (key && valueParts.length > 0) {
				env[key.trim()] = valueParts.join('=').trim();
			}
		}
		return env;
	} catch (e) {
		return process.env;
	}
}

const env = loadEnv();
const DIRECTUS_URL = env.PUBLIC_DIRECTUS_URL || 'https://next.tourdelorraine.ch';
const DIRECTUS_TOKEN = env.PUBLIC_DIRECTUS_TOKEN || '';

const sitemapQuery = `#graphql
query($lang: String){
    pages(filter: {is_active: {_eq: true}}) {
        id
        isActive: is_active
        metaTranslations: meta_translations(filter: {languages_code: {code: {_starts_with: $lang}}}) {
            title
        }
    }
    editions(sort: "-year") {
        year
        translations(filter: {languages_code: {code: {_starts_with: $lang}}}) {
            title
        }
        events {
            id
            translations(filter: {languages_code: {code: {_starts_with: $lang}}}) {
                title
                slug
            }
        }
    }
}`;

async function generateSitemap() {
	console.log('🗺️  Generating sitemap.xml...');
	
	try {
		const data = await directusGraphql.query(sitemapQuery, {
			lang: 'de',
		});

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

		// Write to build directory
		const buildDir = join(__dirname, '..', 'build');
		writeFileSync(join(buildDir, 'sitemap.xml'), xml);
		
		console.log(`✅ Generated sitemap.xml with ${urls.length} URLs`);
		
	} catch (error) {
		console.error('❌ Error generating sitemap:', error.message);
		process.exit(1);
	}
}

function generateRobotsTxt() {
	const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
	
	const buildDir = join(__dirname, '..', 'build');
	writeFileSync(join(buildDir, 'robots.txt'), robotsTxt);
	console.log('✅ Generated robots.txt');
}

function escapeXml(str) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

// Main execution
if (!DIRECTUS_TOKEN) {
	console.warn('⚠️  PUBLIC_DIRECTUS_TOKEN not found. Skipping sitemap generation.');
	console.warn('   To generate a sitemap, ensure PUBLIC_DIRECTUS_TOKEN is set as an environment variable.');
	generateRobotsTxt();
	process.exit(0);
}

const directusGraphql = createDirectus(DIRECTUS_URL)
	.with(staticToken(DIRECTUS_TOKEN))
	.with(graphql());

await generateSitemap();
generateRobotsTxt();