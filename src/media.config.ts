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
		file: 'photo-checkin',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			tap: {in: 1.0, out: 1.6}, // tap Check in → camera opens
			capture: {in: 2.0, out: 3.6, rate: 1.2}, // framing → shutter at ~2.9 s → captured photo
		},
		needs: 'Check in → camera → capture → confirm.',
	},
	progress: {
		number: '04',
		label: 'Progress',
		file: 'progress',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			hold: {in: 1.0, out: 1.0}, // clean still of the photo grid
			scroll: {in: 1.0, out: 5.0}, // slow scroll up through memories
		},
		needs: 'Progress / memories grid, slow scroll.',
	},
	sharedGoalA: {
		number: '05A',
		label: 'Shared goal · Person A',
		file: 'shared-goal-a',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			view: {in: 1.0, out: 4.0},
		},
		needs: 'Shared goal from Person A’s account.',
	},
	sharedGoalB: {
		number: '05B',
		label: 'Shared goal · Person B',
		file: 'shared-goal-b',
		source: IPHONE,
		safeTop: 0.065,
		clips: {
			view: {in: 1.0, out: 4.0},
		},
		needs: 'Same shared goal from Person B’s account.',
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
	a: {dir: 'memories', count: 30},
	/** Person B — the shared-goal partner. */
	b: {dir: 'memories-b', count: 8},
} as const;

/** First audio file found here becomes the soundtrack. */
export const MUSIC_DIR = 'audio';
