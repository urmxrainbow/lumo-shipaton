/**
 * MEMORY MANIFEST — the one place that decides where each real memory
 * photo (assets/memories/) appears. Every photo has exactly ONE role, so no
 * photo is ever placed twice in the film. If there are fewer photos than a
 * sequence could hold, the sequence shows fewer — it never repeats one.
 *
 *   dayRow  — the memory build after Progress, each card labelled with its
 *             own day (Day 01, Day 02 …). One photo per label.
 *   hero    — photos that grow out of the yellow on "30 days." Only
 *             photos not seen before. Any photo added to the folder later
 *             and not listed here joins the hero reveal (still unseen).
 *             With none left (5 photos today), the hero shows the real month
 *             of check-ins inside progress.jpg and the type carries "30".
 *   ending  — the strongest photos, held back for the resolution.
 *
 * The Photo Check-in uses only photo-checkin.MOV and Progress only the real
 * progress.jpg; neither places memory photos.
 */
import {memoryNames} from './lib/media';

const PLAN: Record<'dayRow' | 'hero' | 'ending', readonly string[]> = {
	// day30 is a capture of the camera screen (grid lines): fine as a card, weak full-frame
	dayRow: ['day01', 'day02', 'day30'],
	hero: [],
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
	const own = PLAN[role].filter((n) => have.includes(n));
	if (role !== 'hero') return own;
	// unlisted photos are, by definition, unseen: they belong to the hero reveal
	return [...own, ...have.filter((n) => !listed.has(n))].slice(0, 5);
};
