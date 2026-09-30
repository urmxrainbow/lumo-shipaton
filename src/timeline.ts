/**
 * CENTRAL TIMELINE — every scene's position, in bars, derived from beats.ts.
 * Scenes never know absolute frames; they receive their own local clock.
 */
import {barAt, MUSIC} from './beats';

type Span = {from: number; duration: number};
const span = (startBar: number, endBar: number): Span => ({
	from: barAt(startBar),
	duration: barAt(endBar) - barAt(startBar),
});

export const TIMELINE = {
	problem: span(MUSIC.quiet, MUSIC.build),
	lumo: span(MUSIC.build, MUSIC.product),
	createGoal: span(MUSIC.product, 12),
	capture: span(12, 17),
	showingUp: span(17, MUSIC.lift),
	progress: span(MUSIC.lift, MUSIC.hero),
	hero: span(MUSIC.hero, MUSIC.connection),
	social: span(MUSIC.connection, MUSIC.resolution),
	resolution: span(MUSIC.resolution, MUSIC.end),
	endCard: span(MUSIC.end, MUSIC.cut),
} as const;

export type SceneId = keyof typeof TIMELINE;

// A few black frames after the final hit: hard cut, no fade.
export const TAIL = 6;
export const TOTAL = barAt(MUSIC.cut) + TAIL;
