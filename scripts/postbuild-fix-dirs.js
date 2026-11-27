import {readdirSync, statSync, mkdirSync, renameSync, existsSync} from 'fs';
import {join} from 'path';

function processDirectory(dir) {
	const items = readdirSync(dir, {withFileTypes: true});

	for (const dirent of items) {
		if (!dirent.isFile() || !dirent.name.endsWith('.html')) continue;
		if (dirent.name === 'index.html') continue;

		const nameWithoutExt = dirent.name.slice(0, -5);
		const src = join(dir, dirent.name);
		const destDir = join(dir, nameWithoutExt);

		// Only convert if a directory with same name exists
		if (existsSync(destDir) && statSync(destDir).isDirectory()) {
			const dest = join(destDir, 'index.html');
			if (!existsSync(dest)) {
				console.log(`Converting ${src} → ${dest}`);
				renameSync(src, dest);
			}
		}
	}

	// Recurse into subdirectories
	for (const dirent of items) {
		if (dirent.isDirectory()) {
			processDirectory(join(dir, dirent.name));
		}
	}
}

const buildDir = join(process.cwd(), 'build');
console.log('Converting conflicting .html files to directory/index.html...');
processDirectory(buildDir);
console.log('Done.');
