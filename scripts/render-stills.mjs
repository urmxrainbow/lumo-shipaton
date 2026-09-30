// Render representative stills for review: node scripts/render-stills.mjs [frame ...]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const HEADLESS = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = fs.existsSync(HEADLESS) ? HEADLESS : null;

// Default review frames (at the placeholder 120 BPM grid).
const DEFAULTS = {
	'01a-problem': 95,
	'01b-problem': 205,
	'02a-light': 285,
	'02b-lumo': 450,
	'03a-create-typing': 560,
	'03b-create-push': 640,
	'03c-collapse': 712,
	'04a-checkbox': 790,
	'04b-photo': 915,
	'04c-capture-it': 990,
	'05a-showing-up': 1130,
	'05b-gather': 1172,
	'06-progress': 1330,
	'07a-30-days': 1500,
	'07b-first-memory': 1575,
	'07c-pullback': 1700,
	'07d-30-memories': 1890,
	'08a-better': 1965,
	'08b-our-goal': 2130,
	'08c-grow': 2205,
	'09-look-back': 2370,
	'10-end': 2590,
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
