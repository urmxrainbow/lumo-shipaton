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
	opening: span(MUSIC.intro, MUSIC.build),
	question: span(MUSIC.build, MUSIC.drop),
	transformation: span(MUSIC.drop, MUSIC.verse),
	lumoReveal: span(MUSIC.verse, 11),
	coreLoop: span(11, MUSIC.accumulate),
	progressBuild: span(MUSIC.accumulate, MUSIC.heroBuild),
	hero: span(MUSIC.heroBuild, MUSIC.social),
	social: span(MUSIC.social, MUSIC.montage),
	montage: span(MUSIC.montage, MUSIC.callback),
	callback: span(MUSIC.callback, MUSIC.end),
	endCard: span(MUSIC.end, MUSIC.cut),
} as const;

export type SceneId = keyof typeof TIMELINE;

// A few black frames after the final hit: hard cut, no fade.
export const TAIL = 6;
export const TOTAL = barAt(MUSIC.cut) + TAIL;
