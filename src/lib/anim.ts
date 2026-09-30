import {Easing, interpolate} from 'remotion';

export const ease = {
	/** Long, soft arrival — the house curve. */
	out: Easing.bezier(0.16, 1, 0.3, 1),
	/** Camera moves and morphs. */
	inOut: Easing.bezier(0.65, 0, 0.35, 1),
	/** Gentle departures. */
	in: Easing.bezier(0.55, 0, 0.75, 0.2),
};

/** 0→1 between frames a and b with easing, clamped. */
export const ramp = (f: number, a: number, b: number, e = ease.out) =>
	interpolate(f, [a, b], [0, 1], {easing: e, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** In at [a, a+d], out at [b, b+d]. Returns 0–1 visibility. */
export const vis = (f: number, a: number, b: number, dIn = 20, dOut = 14) =>
	Math.min(ramp(f, a, a + dIn), 1 - ramp(f, b, b + dOut, ease.in));

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

export type Box = {x: number; y: number; w: number; h: number};
export const mixBox = (a: Box, b: Box, t: number): Box => ({
	x: mix(a.x, b.x, t),
	y: mix(a.y, b.y, t),
	w: mix(a.w, b.w, t),
	h: mix(a.h, b.h, t),
});
