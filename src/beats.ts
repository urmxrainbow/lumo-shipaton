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
 *   2:01.3      lighter bridge — it re-plays the INTRO's material (chroma
 *               match to bars 0–2), so it sounds like the song restarting.
 *               The film never uses it.            → dips again 2:10.4
 *   2:13.45     loudest re-entry (final section)
 *   2:37.7      last downbeat; the track resolves by ~2:38.3
 *
 * The film uses a MUSIC EDIT of the track: four source segments, always
 * moving FORWARD through the song, joined on downbeats of matching energy
 * and harmony (see src/music-edit.json):
 *   0:05.97–0:30.26 · 0:42.40–1:09.75 · 1:21.90–1:34.04 · 2:10.43–2:22.52
 *   · 2:31.63–2:39.6
 *   After "30 memories" (bar 21) the song continues at bar 26 — the same
 *   place in its 4-bar loop (best match in the groove) — so the shared-habit
 *   section starts at once and reaches the bright run of bars 28–29, whose
 *   8 crisp high accents (every beat, 22.7 frames apart) carry the rapid
 *   relationship words. It then joins on a downbeat into the quiet pre-drop
 *   bar (the breath) and the final lift ("Grow together").
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
	q2: 8.243, // beat: "…and then"
	forgot: 9.009, // downbeat: "forgot about it?" lands
	tension: 10.519, // the small circle appears
	pickup: 11.285, // the circle starts to expand
	release: 12.028, // downbeat: frame is #E3D290
	backToBlack: 15.047,
	lumo: 18.112, // Lumo, the answer
	product: 21.153, // Build a habit
	showUp: 24.172, // Show up — tap Check in
	checkbox: 27.214, // downbeat: ✓ lands  → "You showed up." / "You put in the work."
	intoCheckin: 42.4, // edit join (downbeat): the check becomes the real Photo Check-in
	shutter: 45.441, // downbeat: the shutter press in photo-checkin.MOV lands here
	everyLine: 48.483, // "Every check-in means something."
	progressShot: 51.525, // progress.jpg: one check-in opens into Insights — "See how far you’ve come."
	memoriesBuild: 55.325, // real memories: 1 → 2 → 4 → 5
	breakDown: 60.627, // BREAK — "30 days."
	reentry: 63.669, // RE-ENTRY — the frame is #E3D290: "Keep showing up."
	thirtyMemories: 66.711, // next downbeat: "30 memories." (one bar, then the cut)
	silence: 81.897, // edit join (bar 26 downbeat): the real shared habit, right away
	bridge: 84.939, // bar 27: "Share a habit / with your"
	/** The 8 crisp high accents of bars 28–29 — one relationship word each. */
	tings: [88.68, 89.437, 90.195, 90.953, 91.71, 92.468, 93.225, 93.983],
	dip: 130.426, // edit join: the quiet pre-drop bar — the breath, the small circle
	grow: 133.445, // biggest hit — #E3D290 frame: "Grow together."
	resolution: 136.487,
	endCard: 151.626, // edit join
	finalHit: 157.68,
	resolved: 158.3, // music has resolved → cut to black
	tail: 159.6,
} as const;
