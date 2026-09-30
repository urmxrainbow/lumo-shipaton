/**
 * MUSIC TIMING — the master clock of the film.
 *
 * No music file has been supplied yet, so the film runs on a placeholder
 * grid of 120 BPM, 4/4 (1 beat = 15 frames, 1 bar = 60 frames).
 * When the real track lands in assets/audio/, analyse it and set BPM +
 * OFFSET here, then align the SECTION boundaries below to the track's
 * real phrase changes. Scenes are authored in bars and beats, so the
 * whole film re-times from this file.
 *
 * Cutting philosophy: musical SECTIONS drive major visual changes.
 * Not every beat gets a transition.
 */
import {FPS} from './theme';

export const BPM = 120;
/** Frames before bar 1, beat 1 (pickup / silence at the head of the track). */
export const OFFSET = 0;

export const BEAT = (60 / BPM) * FPS; // 15f at 120 BPM
export const BAR = BEAT * 4; // 60f

/** Frames for a number of beats (use inside scenes, relative to scene start). */
export const beats = (n: number) => Math.round(n * BEAT);
/** Absolute frame for a bar (0-indexed) + beat offset. */
export const barAt = (bar: number, beat = 0) => OFFSET + Math.round(bar * BAR + beat * BEAT);

/** Musical sections, in bars. QUIET → BUILD → PRODUCT → BUILD → HERO → CONNECTION → RESOLUTION. */
export const MUSIC = {
	quiet: 0, // the problem — near silence, space
	build: 4, // first light: Lumo appears
	product: 8, // create / capture / showing up / progress
	lift: 20, // progress beauty shot, tension into the hero
	hero: 24, // 30 DAYS → memories → 30 MEMORIES
	connection: 32, // together
	resolution: 37, // looking back
	end: 40, // identity
	cut: 43.5, // final hit → hard cut to black
} as const;
