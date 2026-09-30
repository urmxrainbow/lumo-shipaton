/**
 * MUSIC TIMING — the master clock of the film.
 *
 * No music file has been supplied yet, so the film runs on a placeholder
 * grid of 120 BPM, 4/4 (1 beat = 15 frames, 1 bar = 60 frames).
 * When the real track lands in assets/audio/, analyse it and set BPM +
 * OFFSET here: every scene is authored in bars/beats, so the whole film
 * re-times from these two numbers. Individual accents can be nudged in
 * ACCENTS without touching scene code.
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

/** Named musical landmarks (in bars) — the beat map. */
export const MUSIC = {
	intro: 0, // sparse intro: dot + number
	build: 2, // question section, tension
	drop: 5, // first big entrance → memory explosion
	verse: 9, // product reveal + core loop groove
	accumulate: 17, // momentum build
	heroBuild: 20,
	heroStop: 23, // THE break — everything freezes
	heroTurn: 24, // DAYS → MEMORIES
	social: 26,
	montage: 29, // fastest section
	callback: 31.5,
	end: 33.5,
	cut: 36, // final hit → black
} as const;
