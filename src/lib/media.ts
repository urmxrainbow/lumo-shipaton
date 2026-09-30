import {getStaticFiles, staticFile} from 'remotion';
import {MEDIA_SLOTS, MEMORIES, MUSIC_DIR, SlotId} from '../media.config';

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
 * screenshot (.png/.jpg/.webp) with the same name. Video wins if both exist.
 * null → render the placeholder.
 */
export const slotSrc = (id: SlotId): SlotMedia | null => {
	const want = `recordings/${MEDIA_SLOTS[id].file}`.toLowerCase();
	const find = (re: RegExp) => files().find((f) => re.test(f) && f.replace(re, '').toLowerCase() === want);
	const video = find(VIDEO);
	if (video) return {url: staticFile(video), kind: 'video'};
	const image = find(IMAGE);
	return image ? {url: staticFile(image), kind: 'image'} : null;
};

const inDir = (dir: string, re: RegExp) =>
	files()
		.filter((f) => f.startsWith(`${dir}/`) && re.test(f))
		.sort((x, y) => x.localeCompare(y, undefined, {numeric: true}));

/** Memory photo URL by index (wraps if fewer photos than slots), or null. */
export const memorySrc = (set: keyof typeof MEMORIES, i: number): string | null => {
	const list = inDir(MEMORIES[set].dir, IMAGE);
	if (!list.length) return null;
	return staticFile(list[i % list.length]);
};

/** File stem of a memory photo (e.g. "day15"), or null. */
export const memoryName = (set: keyof typeof MEMORIES, i: number): string | null => {
	const list = inDir(MEMORIES[set].dir, IMAGE);
	if (!list.length) return null;
	return (list[i % list.length].split('/').pop() ?? '').replace(IMAGE, '');
};

/** How many real memory photos exist. */
export const memoryCount = (set: keyof typeof MEMORIES) => inDir(MEMORIES[set].dir, IMAGE).length;

/** "Day 15" from a file named day15.jpg. */
export const memoryDay = (set: keyof typeof MEMORIES, i: number): string => {
	const m = memoryName(set, i)?.match(/(\d+)/);
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
