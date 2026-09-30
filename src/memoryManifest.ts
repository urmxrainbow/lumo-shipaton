/**
 * MEMORY MANIFEST — the one place that decides where each real memory
 * photo (assets/memories/) appears. Every photo has exactly ONE role, so no
 * photo is ever placed twice in the film. If there are fewer photos than a
 * sequence could hold, the sequence shows fewer — it never repeats one.
 *
 *   dayRow  — the memory build after Progress, each card labelled with its
 *             own day (Day 01, Day 02 …). One photo per label.
 *   (30 memories) — no photo: with 5 photos, all already have their place,
 *             so the hero is pure typography. The type carries "30".
 *   ending  — the strongest photos, held back for the resolution.
 *
 * The Photo Check-in uses only photo-checkin.MOV and Progress only the real
 * progress.jpg (its one and only appearance); neither places memory photos.
 */
import {memoryNames} from './lib/media';

const PLAN: Record<'dayRow' | 'ending', readonly string[]> = {
	// day30 is a capture of the camera screen (grid lines): fine as a card, weak full-frame
	dayRow: ['day01', 'day02', 'day30'],
	ending: ['day15', 'day16'],
};

export type MemoryRole = keyof typeof PLAN;

const listed = new Set<string>(Object.values(PLAN).flat());
{
	const all = Object.values(PLAN).flat();
	if (all.length !== listed.size) throw new Error(`memoryManifest: a photo is assigned twice (${all.join(', ')})`);
}

/** The photos (file stems) for a role, in order — only ones that exist. */
export const memoriesFor = (role: MemoryRole): string[] => {
	const have = memoryNames();
	return PLAN[role].filter((n) => have.includes(n));
};
