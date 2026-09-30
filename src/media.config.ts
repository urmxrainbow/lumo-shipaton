/**
 * MEDIA CONFIG — every replaceable piece of media in the film.
 *
 * Replacement workflow (no React editing):
 *   1. Record the screen as described in RECORDING_GUIDE.md.
 *   2. Name it exactly as `file` below (any of .mp4 / .mov, any case).
 *   3. Drop it into assets/recordings/.
 *   4. Render again. The slot switches from placeholder → real footage
 *      automatically; position, crop, mask, motion and timing are unchanged.
 *
 * Times in `clips` are SOURCE seconds inside the recording. If your take is
 * timed a little differently from the guide, adjust `in` / `out` here —
 * the film's timing does not move, only which part of the take is shown.
 *
 * Crops are authored by the scenes in normalised source coordinates
 * (0–1 across the full recording). `focus` notes tell you where the key
 * UI element must sit in the frame for the designed crop to land on it.
 */

export type Clip = {
	/** Source seconds. */
	in: number;
	out: number;
	/** Playback speed (1 = real time). */
	rate?: number;
};

export type SlotConfig = {
	number: string;
	label: string;
	/** Filename without extension, inside assets/recordings/. */
	file: string;
	/** Expected source dimensions (iPhone screen recording). */
	source: {w: number; h: number};
	/** Fraction of the source height hidden at the top (status bar / recording pill). */
	safeTop: number;
	clips: Record<string, Clip>;
	/** Shown on the placeholder so you know what to record. */
	needs: string;
};

const IPHONE = {w: 1320, h: 2868};

export const MEDIA_SLOTS = {
	home: {
		number: '01',
		label: 'Home',
		file: 'home',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			// home.MP4 is a 0.65 s grab — used as a designed still.
			still: {in: 0.3, out: 0.3},
		},
		needs: 'Home, habit path + Check in pill. 3 s still.',
	},
	createGoal: {
		number: '02',
		label: 'Create goal',
		file: 'create-goal',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			// Timestamps measured from create-goal.mov (13.06 s).
			createSheet: {in: 0.3, out: 1.7}, // "Add new habit / Post on the feed"
			openForm: {in: 2.57, out: 2.9}, // New habit sheet slides up
			typing: {in: 5.35, out: 7.45, rate: 1.6}, // W… Workout + suggested emoji
			tapCreate: {in: 9.7, out: 10.1}, // Create habit button tap
			invite: {in: 9.2, out: 9.2}, // Reminder + Invite friends (still)
			added: {in: 11.58, out: 13.0, rate: 1.6}, // path scrolls to new "Workout" node
		},
		needs: 'Create habit flow, name typed, Create tapped.',
	},
	photoCheckin: {
		number: '03',
		label: 'Photo check-in',
		file: 'photo-checkin', // assets/recordings/photo-checkin.MOV
		source: {w: 886, h: 1920},
		safeTop: 0.065,
		clips: {
			// Measured from photo-checkin.MOV (4.4 s):
			// 0.45 tap Check in · 0.9 camera live · 2.25 shutter · 2.9 ✓ · 3.2 Breakfast checked
			full: {in: 0, out: 4.4},
		},
		needs: 'Check in → camera → capture → confirm.',
	},
	progress: {
		number: '04',
		label: 'Progress',
		file: 'progress', // assets/recordings/progress.mp4 (Insights)
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			// 4.6 All habits · 5.4 Breakfast expands · 5.6–6.2 photo calendar
			calendar: {in: 4.6, out: 6.2},
			hold: {in: 6.0, out: 6.0}, // the September photo calendar
		},
		needs: 'Progress / photo calendar.',
	},
	sharedGoalA: {
		number: '05A',
		label: 'Shared habit · Person A',
		file: 'shared-goal-a', // assets/recordings/shared-goal-a.mp4
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			view: {in: 0, out: 3.1, rate: 0.5}, // the path glowing through the shared habit
		},
		needs: 'Shared habit from Person A’s account.',
	},
	sharedGoalB: {
		number: '05B',
		label: 'Shared habit · Person B',
		file: 'shared-goal-b', // assets/recordings/shared-goal-b.jpg (screenshot)
		source: {w: 1320, h: 2302},
		safeTop: 0,
		clips: {
			view: {in: 0, out: 0},
		},
		needs: 'Same shared habit from Person B’s account.',
	},
} satisfies Record<string, SlotConfig>;

export type SlotId = keyof typeof MEDIA_SLOTS;

/**
 * MEMORY PHOTOS — real check-in photos, full colour, never tinted.
 * Files in each folder are used in filename order (name them day01.jpg,
 * day02.jpg …). Missing photos render as designed Lumo memory tiles.
 */
export const MEMORIES = {
	/** Person A — the 30-day story. */
	a: {dir: 'memories', count: 5},
	/** Person B — the shared-goal partner. */
	b: {dir: 'memories-b', count: 8},
} as const;

/** First audio file found here becomes the soundtrack. */
export const MUSIC_DIR = 'audio';

/**
 * Per-photo framing inside a memory tile (CSS object-view-box). day30 is a
 * capture of the iPhone camera screen: frame only its viewfinder.
 */
export const MEMORY_VIEW: Record<string, string> = {
	day30: 'inset(6% 0 24% 0)',
};
