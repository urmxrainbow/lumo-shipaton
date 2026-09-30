import {getStaticFiles, staticFile} from 'remotion';
import {MEDIA_SLOTS, MEMORIES, MUSIC_DIR, SlotConfig, SlotId} from '../media.config';

const VIDEO = /\.(mp4|mov|m4v|webm)$/i;
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;
const AUDIO = /\.(mp3|wav|m4a|aac|ogg|flac)$/i;

let cache: string[] | null = null;
const files = (): string[] => {
	if (!cache) {
		try {
			cache = getStaticFiles().map((f) => f.name.replace(/\\/g, '/'));
		} catch {
			cache = [];
		}
	}
	return cache;
};

export type SlotMedia = {url: string; kind: 'video' | 'image'};

/**
 * A slot's media in assets/recordings/: a screen recording (.mp4/.mov) or a
 * screenshot (.png/.jpg/.webp) with the same name. Video wins if both exist,
 * unless the slot sets `media: 'image'`.
 * null → render the placeholder.
 */
export const slotSrc = (id: SlotId): SlotMedia | null => {
	const want = `recordings/${MEDIA_SLOTS[id].file}`.toLowerCase();
	const find = (re: RegExp) => files().find((f) => re.test(f) && f.replace(re, '').toLowerCase() === want);
	const video = (MEDIA_SLOTS[id] as SlotConfig).media === 'image' ? undefined : find(VIDEO);
	if (video) return {url: staticFile(video), kind: 'video'};
	const image = find(IMAGE);
	return image ? {url: staticFile(image), kind: 'image'} : null;
};

const inDir = (dir: string, re: RegExp) =>
	files()
		.filter((f) => f.startsWith(`${dir}/`) && re.test(f))
		.sort((x, y) => x.localeCompare(y, undefined, {numeric: true}));

/** File stems of all real memory photos (e.g. "day15"), in filename order. */
export const memoryNames = (set: keyof typeof MEMORIES = 'a'): string[] =>
	inDir(MEMORIES[set].dir, IMAGE).map((f) => (f.split('/').pop() ?? '').replace(IMAGE, ''));

/** A memory photo's URL by file stem, or null. Never wraps or substitutes. */
export const memorySrc = (name: string, set: keyof typeof MEMORIES = 'a'): string | null => {
	const hit = inDir(MEMORIES[set].dir, IMAGE).find((f) => (f.split('/').pop() ?? '').replace(IMAGE, '') === name);
	return hit ? staticFile(hit) : null;
};

/** "Day 15" from a photo named day15. */
export const memoryDay = (name: string): string => {
	const m = name.match(/(\d+)/);
	return m ? `Day ${m[1].padStart(2, '0')}` : '';
};

export const musicSrc = (): string | null => {
	const hit = inDir(MUSIC_DIR, AUDIO)[0];
	return hit ? staticFile(hit) : null;
};

export const brand = {
	icon: staticFile('branding/app-icon.png'),
	mark: staticFile('branding/logo.png'),
};
