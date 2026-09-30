/**
 * Shared product-window geometry. Scenes hand the SAME window from one
 * to the next (Home → Create Goal → checkbox), so the product feels
 * continuous rather than cut together.
 */
import {Box} from '../lib/anim';

/** The hero product window: Lumo UI floating on black. */
export const PRODUCT: Box = {x: 1060, y: 90, w: 600, h: 900};
/**
 * Home, full width, framed from "Today's habit" down (the stats card at
 * the top of Home is deliberately never shown). 600 px wide shows the
 * whole 1320 px source; 782 px tall shows its lower 59 %.
 */
export const HOME_WINDOW: Box = {x: 1060, y: 150, w: 600, h: 782};
export const PRODUCT_WIDE: Box = {x: 1000, y: 60, w: 720, h: 960};
export const RADIUS = 56;

/** A hairline that defines the UI edge on pure black (the UI is #101012). */
export const HAIRLINE = '0 0 0 1px rgba(245,245,247,0.09)';

/** The checkbox in scene 04 — the Create Goal window collapses into it. */
export const CHECKBOX: Box = {x: 960 - 36, y: 470 - 36, w: 72, h: 72};

/** The Progress window (right-hand hero placement). */
export const PROGRESS_WINDOW: Box = {x: 1080, y: 50, w: 490, h: 980};
/** The Progress window, centred — where memories return at the end. */
export const PROGRESS_CENTER: Box = {x: 960 - 245, y: 50, w: 490, h: 980};

/**
 * Landing tiles inside a Progress window: memories fly into these and are
 * absorbed by the UI. A grid starting ~25 % down the window.
 */
export const progressTile = (P: Box, k: number, cols = 4): Box => {
	const pad = 24;
	const gap = 10;
	const s = (P.w - pad * 2 - gap * (cols - 1)) / cols;
	return {x: P.x + pad + (k % cols) * (s + gap), y: P.y + P.h * 0.25 + Math.floor(k / cols) * (s + gap), w: s, h: s};
};

/** Circle reveal as a CSS clip-path (the film's transition motif). */
export const circleClip = (r: number, cx = '50%', cy = '50%') => `circle(${Math.max(0, r)}px at ${cx} ${cy})`;
