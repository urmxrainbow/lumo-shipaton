/**
 * MUSIC — the master timeline.
 *
 * Source: assets/audio/music.m4a (audio of music.mp4), analysed with
 * librosa: 79.1 BPM, 4/4, downbeats every 3.034 s from 2.926 s.
 *
 *   0:00–0:11   quiet intro
 *   0:11.3      pickup → groove lands on the 0:12.03 downbeat
 *   0:25        full groove
 *   1:00.63     one-bar BREAK (near silence)       → 1:03.67 hard re-entry
 *   1:59.3      groove drops, near-silence 2:00.3–2:01.3
 *   2:01.3      warm, lighter bridge                → dips again 2:11.2
 *   2:13.45     loudest re-entry (final section)
 *   2:37.7      last downbeat; the track resolves by ~2:38.3
 *
 * The film uses a MUSIC EDIT of the track: four source segments joined on
 * downbeats of matching energy and harmony (see src/music-edit.json). Every visual moment below is expressed as
 * a SOURCE time in the track and mapped onto the film, so the picture is
 * locked to the music.
 */
import {FPS} from './theme';
import edit from './music-edit.json';

export const BPM = 79.1;
export const BEAT_S = 60 / BPM; // 0.7585 s
export const BEAT = BEAT_S * FPS; // 22.76 frames
export const BAR = BEAT * 4;

/** Frames for a number of beats (use inside scenes, relative to scene start). */
export const beats = (n: number) => Math.round(n * BEAT);

/**
 * The music edit: [sourceIn, sourceOut] segments, joined on downbeats chosen
 * for musical similarity. scripts/build-music.py renders them into ONE
 * continuous master track (assets/audio/lumo-music-edit.wav) with
 * equal-power crossfades centred on each join.
 */
export const EDIT = edit.segments as [number, number][];

/** Film seconds at which each edit segment starts. */
const SEG_START = EDIT.reduce<number[]>((acc, [a, b], i) => {
	acc.push(i === 0 ? 0 : acc[i - 1] + (EDIT[i - 1][1] - EDIT[i - 1][0]));
	return acc;
}, []);

/** Map a time in the ORIGINAL track to the film (frames). */
export const src = (t: number): number => {
	const i = EDIT.findIndex(([a, b]) => t >= a && t <= b);
	if (i < 0) throw new Error(`source time ${t}s is not in the music edit`);
	return Math.round((SEG_START[i] + (t - EDIT[i][0])) * FPS);
};

/**
 * Musical landmarks (source seconds in the original track).
 * Scenes are cut on these; fine timing inside a scene uses beats().
 */
export const HIT = {
	start: 5.968, // the film (and its music) begins on this downbeat
	q2: 8.243, // "And completely forgotten about it?"
	tension: 10.519, // the small circle appears
	pickup: 11.285, // the circle starts to expand
	release: 12.028, // downbeat: frame is #E3D290
	backToBlack: 15.047,
	lumo: 18.112, // Lumo, the answer
	product: 21.153, // Set a goal
	showUp: 24.172, // Show up — tap Check in
	checkbox: 27.214, // ☐ → ✓ "Most habit trackers stop here."
	intoMemory: 42.4, // edit join (downbeat): the checkbox becomes a photo
	checkinUI: 48.483, // Photo check-in UI
	everyCheckin: 51.525, // one check-in, one memory — accelerating
	lookBack: 57.609,
	breakDown: 60.627, // BREAK — "30 days."
	reentry: 63.669, // RE-ENTRY — the frame is #E3D290
	thirtyMemories: 69.753, // edit join: "30 memories."
	silence: 119.25, // near-silence — "But progress feels better together."
	bridge: 121.301, // warm bridge — shared goal
	dip: 131.17,
	grow: 133.445, // biggest hit — #E3D290 frame: "Grow together."
	resolution: 136.487,
	endCard: 151.626, // edit join
	finalHit: 157.68,
	resolved: 158.3, // music has resolved → cut to black
	tail: 159.6,
} as const;
