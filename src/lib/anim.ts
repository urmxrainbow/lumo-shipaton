import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../theme';

export const ease = {
	out: Easing.bezier(0.16, 1, 0.3, 1), // expo-out: fast arrival, dead stop
	inOut: Easing.bezier(0.65, 0, 0.35, 1),
	in: Easing.bezier(0.7, 0, 0.84, 0),
	snap: Easing.bezier(0.85, 0, 0.15, 1), // hard in-out for wipes
};

/** 0→1 between frames a and b with easing, clamped. */
export const ramp = (f: number, a: number, b: number, e = ease.out) =>
	interpolate(f, [a, b], [0, 1], {easing: e, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** POP → STOP. A short spring with a tiny overshoot that settles fast. */
export const pop = (f: number, at: number, cfg: {stiff?: number; damp?: number} = {}) =>
	spring({frame: f - at, fps: FPS, config: {stiffness: cfg.stiff ?? 380, damping: cfg.damp ?? 26, mass: 0.7}});

/** Harder spring with no overshoot (for geometry). */
export const snap = (f: number, at: number) =>
	spring({frame: f - at, fps: FPS, config: {stiffness: 520, damping: 60, mass: 0.6}});

export const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Visible only within [a, b). Hard cuts, no fades. */
export const on = (f: number, a: number, b = Infinity) => f >= a && f < b;

/** Deterministic pseudo-random in [0,1) from a seed. */
export const rand = (seed: number) => {
	const x = Math.sin(seed * 9301 + 49297) * 233280;
	return x - Math.floor(x);
};
