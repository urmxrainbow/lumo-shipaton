/**
 * CENTRAL TIMELINE — every scene is cut on a musical landmark (beats.ts).
 * Scenes never know absolute frames; they receive their own local clock,
 * and use `at(scene, sourceTime)` for musical hits inside them.
 */
import {HIT, src} from './beats';

type Span = {from: number; duration: number};
const span = (a: number, b: number): Span => ({from: src(a), duration: src(b) - src(a)});

export const TIMELINE = {
	problem: span(HIT.start, HIT.pickup),
	release: span(HIT.pickup, HIT.backToBlack),
	lumo: span(HIT.backToBlack, HIT.product),
	product: span(HIT.product, HIT.checkbox),
	checkin: span(HIT.checkbox, HIT.lookBack), // HERO FEATURE: a check-in becomes a memory
	lookBack: span(HIT.lookBack, HIT.breakDown),
	hero: span(HIT.breakDown, HIT.silence),
	social: span(HIT.silence, HIT.resolution),
	resolution: span(HIT.resolution, HIT.endCard),
	endCard: span(HIT.endCard, HIT.tail),
} as const;

export type SceneId = keyof typeof TIMELINE;

/** Local frame (inside `scene`) of a moment in the original track. */
export const at = (scene: SceneId, sourceTime: number) => src(sourceTime) - TIMELINE[scene].from;

export const TOTAL = src(HIT.tail);
