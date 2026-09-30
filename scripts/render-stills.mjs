// Render representative stills for review: node scripts/render-stills.mjs [frame ...]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const HEADLESS = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = fs.existsSync(HEADLESS) ? HEADLESS : null;

// Default review frames (at the placeholder 120 BPM grid).
const DEFAULTS = {
	'01-opening': 100,
	'02-question-a': 170,
	'02-question-b': 270,
	'03-transformation-build': 425,
	'03-this-is-30-days': 520,
	'04-lumo-reveal': 600,
	'05a-create-goal': 700,
	'05b-capture': 815,
	'05c-keep-going': 920,
	'05d-look-back': 1000,
	'06-progress-build': 1175,
	'07-hero-build': 1360,
	'07-hero-30-days': 1420,
	'07-hero-30-memories': 1520,
	'08-social': 1665,
	'08-together': 1720,
	'09-montage': 1790,
	'10-callback': 1960,
	'11-end-card': 2100,
};

const args = process.argv.slice(2);
const targets = args.length ? Object.fromEntries(args.map((a) => [`f${a}`, Number(a)])) : DEFAULTS;
const outDir = path.resolve('out/stills');
fs.mkdirSync(outDir, {recursive: true});

const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('assets')});
const composition = await selectComposition({serveUrl, id: 'LumoFilm', browserExecutable});
for (const [name, frame] of Object.entries(targets)) {
	const output = path.join(outDir, `${name}.png`);
	await renderStill({composition, serveUrl, frame, output, browserExecutable, scale: 0.5});
	console.log('✓', name, frame);
}
