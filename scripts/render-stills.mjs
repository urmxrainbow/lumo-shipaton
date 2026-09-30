// Render representative stills for review: node scripts/render-stills.mjs [frame ...]
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import fs from 'node:fs';
import path from 'node:path';

const HEADLESS = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = fs.existsSync(HEADLESS) ? HEADLESS : null;

// Default review frames (at the placeholder 120 BPM grid).
const DEFAULTS = {"01a-q1": 70, "01b-q2": 240, "01c-tension": 320, "02a-expanding": 352, "02b-yeah-me-too": 425, "03a-black-opens": 458, "03b-thats-why": 510, "03c-light": 552, "03d-beauty": 700, "04a-set-goal": 770, "04b-show-up": 855, "04c-capture": 935, "04d-into-memory": 985, "05a-inside-memory": 1008, "05b-two": 1070, "05c-eight": 1150, "05d-sixteen": 1200, "05e-look-back": 1310, "06a-30-days": 1390, "06b-seed": 1418, "06c-portal": 1447, "06d-open": 1460, "06e-pullback": 1520, "06f-pullback2": 1590, "06g-30-memories": 1680, "07a-better-together": 1880, "07b-my-progress": 1980, "07c-yours": 2100, "07d-our-goal": 2200, "07e-grow": 2310, "08a-memories": 2440, "08b-look-back-on": 2530, "08c-into-lumo": 2600, "09a-end": 2760, "09b-end-line": 2830};

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
