import React from 'react';
import {Easing, interpolate, spring} from 'remotion';
import {C, display, text} from '../theme';

/**
 * Controlled entrance: a short rise, opacity and a whisper of blur.
 * p: 0 hidden → 1 settled. out: 0 → 1 leaves (drifts up slightly, fades).
 */
export const Reveal: React.FC<{
	p: number;
	out?: number;
	rise?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({p, out = 0, rise = 26, children, style}) => {
	const o = p * (1 - out);
	if (o <= 0.001) return null;
	return (
		<div
			style={{
				opacity: o,
				transform: `translateY(${(1 - p) * rise - out * rise * 0.5}px)`,
				filter: p < 1 || out > 0 ? `blur(${(1 - p) * 10 + out * 6}px)` : undefined,
				...style,
			}}
		>
			{children}
		</div>
	);
};

/** Headline block: one or more lines, positioned absolutely. */
export const Headline: React.FC<{
	x: number;
	y: number;
	size: number;
	weight?: 400 | 500 | 600;
	align?: 'left' | 'center' | 'right';
	width?: number;
	color?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({x, y, size, weight = 500, align = 'left', width, color = C.white, children, style}) => (
	<div
		style={{
			position: 'absolute',
			left: align === 'center' ? 0 : x,
			right: align === 'center' ? 0 : undefined,
			top: y,
			width: align === 'center' ? undefined : width,
			textAlign: align,
			color,
			whiteSpace: 'pre-line',
			...display(size, weight),
			...style,
		}}
	>
		{children}
	</div>
);

/** Small supporting copy. */
export const Caption: React.FC<{
	x: number;
	y: number;
	size?: number;
	align?: 'left' | 'center';
	color?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({x, y, size = 26, align = 'left', color = C.soft, children, style}) => (
	<div
		style={{
			position: 'absolute',
			left: align === 'center' ? 0 : x,
			right: align === 'center' ? 0 : undefined,
			top: y,
			textAlign: align,
			color,
			...text(size),
			...style,
		}}
	>
		{children}
	</div>
);

/*
 * ——— MASKED TYPOGRAPHY — the film's motion language for hero statements ———
 * A line lives behind its own clipping boundary and travels up into place on
 * a critically-damped spring (weight, no overshoot); it leaves the same way,
 * upward. Scenes vary the character (travel, spring stiffness, hierarchy,
 * what moves around the line) — never the direction or the bounce-free feel.
 * The opening (S01Problem) is the benchmark this generalises.
 */

/** High damping: confident arrival, no visible overshoot. */
export const SETTLE = {damping: 200, stiffness: 140, mass: 0.8};
/** A slower, calmer settle (resolution, emotional lines). */
export const CALM = {damping: 200, stiffness: 70, mass: 1};
const EXIT_EASE = Easing.bezier(0.5, 0, 0.8, 0.25);

/** Arrival progress 0→1 for a line that starts moving at `start`. */
export const arrive = (f: number, fps: number, start: number, frames = 16, config = SETTLE) =>
	spring({frame: f - start, fps, config, durationInFrames: frames});

/** Exit progress 0→1: smooth acceleration out. */
export const leave = (f: number, start: number, frames = 12) =>
	interpolate(f, [start, start + frames], [0, 1], {easing: EXIT_EASE, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/**
 * One line behind a clipping boundary. `enter` 0→1 travels it up into place,
 * `exit` 0→1 carries it on upward and out through the top of its mask.
 */
export const MaskLine: React.FC<{
	enter: number;
	exit?: number;
	size: number;
	weight?: 400 | 500 | 600;
	color?: string;
	/** How far below the mask it starts, in line heights. */
	travel?: number;
	style?: React.CSSProperties;
	children: React.ReactNode;
}> = ({enter, exit = 0, size, weight = 500, color = C.white, travel = 1.25, style, children}) => {
	const d = size * travel;
	const y = (1 - enter) * d - exit * d;
	const opacity =
		interpolate(enter, [0, 0.55], [0, 1], {extrapolateRight: 'clamp'}) *
		(1 - interpolate(exit, [0.45, 1], [0, 1], {extrapolateLeft: 'clamp'}));
	return (
		// the mask — padded (it keeps its space while hidden, so layouts never jump) so no ascender or descender is ever cut once settled
		<div style={{overflow: 'hidden', padding: `${size * 0.06}px ${size * 0.2}px ${size * 0.14}px`, margin: `-${size * 0.06}px 0 -${size * 0.14}px`}}>
			<div style={{transform: `translateY(${y}px)`, opacity, color, ...display(size, weight), lineHeight: 1.08, whiteSpace: 'nowrap', ...style}}>
				{children}
			</div>
		</div>
	);
};

/** A centred column of lines. */
export const Stack: React.FC<{style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			...style,
		}}
	>
		{children}
	</div>
);
