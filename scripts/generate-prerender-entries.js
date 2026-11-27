import {createDirectus, staticToken, graphql} from '@directus/sdk';
import {writeFileSync, readFileSync} from 'fs';
import {fileURLToPath} from 'url';
import {dirname, join} from 'path';
import routesDef from '../src/config/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

const query = `#graphql
query($lang: String) {
    pages(filter: {is_active: {_eq: true}}) {
        id
    }
    editions(sort: "-year") {
        year
        events {
            translations(filter: {languages_code: {code: {_starts_with: $lang}}}) {
                slug
            }
        }
    }
}`;

async function generatePrerenderEntries() {
	console.log('📄 Generating prerender-entries.json...');

	const entries = [];
	entries.push('/', '/sitemap.xml', '/robots.txt');

	try {
		const data = await directusGraphql.query(query, {lang: 'de'});
		console.log('Got data, keys:', Object.keys(data || {}));

		const pages = data.pages || [];
		for (const page of pages) {
			const pageId = page.id;
			const route = routesDef[pageId];
			if (route?.translations?.de) {
				entries.push(`/${route.translations.de}`);
			}
		}

		const editions = data.editions || [];
		for (const edition of editions) {
			const year = edition.year;
			entries.push(`/archiv/${year}`);
			const events = edition.events || [];
			for (const event of events) {
				const translations = event.translations || [];
				const slug = translations[0]?.slug;
				if (slug) {
					entries.push(`/archiv/${year}/event/${slug}`);
				}
			}
		}

		// Fetch current edition separately using a simpler query
		try {
			const currentQuery = `#graphql
query($lang: String) {
    current_edition {
        edition {
            year
            events {
                translations(filter: {languages_code: {code: {_starts_with: $lang}}}) {
                    slug
                }
            }
        }
    }
}`;
			const currentData = await directusGraphql.query(currentQuery, {lang: 'de'});
			console.log('Current edition data:', JSON.stringify(currentData, null, 2));
			const currentEdition = currentData?.current_edition?.edition;
			if (currentEdition?.events) {
				for (const event of currentEdition.events) {
					const translations = event.translations || [];
					const slug = translations[0]?.slug;
					if (slug) {
						entries.push(`/programm/event/${slug}`);
					}
				}
			}
		} catch (e) {
			console.warn('Could not fetch current edition separately:', e.message);
		}

		const uniqueEntries = [...new Set(entries)].sort();
		writeFileSync(
			join(__dirname, '..', 'prerender-entries.json'),
			JSON.stringify(uniqueEntries, null, '\t')
		);
		console.log(`✅ Generated prerender-entries.json with ${uniqueEntries.length} URLs`);
	} catch (error) {
		console.error('❌ Error:', error);
		process.exit(1);
	}
}

const directusGraphql = createDirectus(DIRECTUS_URL)
	.with(staticToken(DIRECTUS_TOKEN))
	.with(graphql());

await generatePrerenderEntries();
