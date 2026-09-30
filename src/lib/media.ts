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

/** Resolved URL of a slot's recording, or null → render placeholder. */
export const slotSrc = (id: SlotId): string | null => {
	const want = `recordings/${MEDIA_SLOTS[id].file}`.toLowerCase();
	const hit = files().find((f) => VIDEO.test(f) && f.replace(VIDEO, '').toLowerCase() === want);
	return hit ? staticFile(hit) : null;
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

export const musicSrc = (): string | null => {
	const hit = inDir(MUSIC_DIR, AUDIO)[0];
	return hit ? staticFile(hit) : null;
};

export const brand = {
	icon: staticFile('branding/app-icon.png'),
	mark: staticFile('branding/logo.png'),
};
