/**
 * Compositional layouts shared across scenes. Keeping them here gives the
 * film its continuity: the same memories return in the same places.
 */
export type Rect = {x: number; y: number; w: number; h: number};

/** S03 — the first editorial collage (memory index = array index). */
export const COLLAGE: Rect[] = [
	{x: 80, y: 80, w: 520, h: 640},
	{x: 640, y: 80, w: 300, h: 300},
	{x: 640, y: 420, w: 300, h: 400},
	{x: 980, y: 80, w: 420, h: 280},
	{x: 1440, y: 80, w: 400, h: 520},
	{x: 980, y: 400, w: 200, h: 200},
	{x: 1220, y: 400, w: 180, h: 200},
	{x: 80, y: 760, w: 250, h: 240},
	{x: 370, y: 760, w: 230, h: 240},
	{x: 980, y: 640, w: 420, h: 360},
	{x: 1440, y: 640, w: 190, h: 360},
	{x: 1670, y: 640, w: 170, h: 170},
	{x: 1670, y: 850, w: 170, h: 150},
	{x: 640, y: 860, w: 300, h: 140},
];

/** The Progress window in the hero (S07) — centre stage. */
export const HERO_SLOT: Rect = {x: 745, y: 70, w: 430, h: 940};

/**
 * S07 — memories escaping the Progress UI. Coordinates are in stage
 * space (1920×1080 at camera scale 1). Ordered by emergence.
 */
export const HERO_RING: Rect[] = [
	{x: 1230, y: 150, w: 260, h: 330},
	{x: 440, y: 560, w: 250, h: 310},
	{x: 1230, y: 540, w: 210, h: 210},
	{x: 480, y: 170, w: 210, h: 270},
	{x: 1250, y: 800, w: 280, h: 200},
	{x: 1540, y: 330, w: 220, h: 280},
	{x: 150, y: 330, w: 250, h: 200},
	{x: 250, y: 740, w: 160, h: 200},
	{x: 1500, y: 660, w: 200, h: 250},
	{x: 1560, y: 40, w: 180, h: 230},
	{x: 180, y: 40, w: 240, h: 250},
	{x: 1780, y: 400, w: 190, h: 190},
	{x: -40, y: 590, w: 240, h: 300},
	{x: 1760, y: 700, w: 230, h: 300},
	{x: 530, y: 930, w: 180, h: 160},
	{x: 1500, y: 950, w: 230, h: 180},
	{x: -120, y: 200, w: 220, h: 300},
	{x: 1990, y: 120, w: 240, h: 260},
	{x: 850, y: -200, w: 220, h: 170},
	{x: 900, y: 1110, w: 230, h: 180},
	{x: 2000, y: 560, w: 200, h: 260},
	{x: -200, y: 950, w: 280, h: 220},
	{x: 1180, y: -210, w: 250, h: 180},
	{x: 450, y: -190, w: 230, h: 200},
	{x: 1880, y: 930, w: 220, h: 240},
	{x: 480, y: 1120, w: 260, h: 170},
	{x: 2010, y: -100, w: 200, h: 200},
	{x: -260, y: -60, w: 240, h: 230},
	{x: 1200, y: 1130, w: 200, h: 160},
	{x: 2050, y: 860, w: 220, h: 200},
];

/** S10 — memories returning around the callback number. [memory index, rect] */
export const CALLBACK_RING: [number, Rect][] = [
	[0, {x: 170, y: 150, w: 250, h: 310}],
	[4, {x: 1500, y: 130, w: 260, h: 320}],
	[9, {x: 1440, y: 620, w: 300, h: 250}],
	[3, {x: 230, y: 640, w: 300, h: 230}],
	[2, {x: 640, y: 830, w: 180, h: 200}],
	[1, {x: 1130, y: 810, w: 220, h: 210}],
	[5, {x: 700, y: 40, w: 170, h: 150}],
	[6, {x: 1150, y: 50, w: 160, h: 170}],
	[7, {x: 30, y: 500, w: 130, h: 160}],
	[10, {x: 1790, y: 480, w: 110, h: 150}],
];
