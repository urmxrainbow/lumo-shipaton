/**
 * The #E3D290 geometry kit — Lumo's motion language.
 * Dots, lines, blocks, frames, corner marks, labels. All stateless:
 * scenes drive them with explicit progress values.
 */
import React from 'react';
import {C, mono} from '../theme';

type Pos = {x: number; y: number};

export const Dot: React.FC<Pos & {r: number; color?: string; ring?: number; style?: React.CSSProperties}> = ({
	x,
	y,
	r,
	color = C.lumo,
	ring,
	style,
}) =>
	r <= 0 ? null : (
		<div
			style={{
				position: 'absolute',
				left: x - r,
				top: y - r,
				width: r * 2,
				height: r * 2,
				borderRadius: '50%',
				background: ring ? 'transparent' : color,
				border: ring ? `${ring}px solid ${color}` : undefined,
				boxSizing: 'border-box',
				...style,
			}}
		/>
	);

/** A line from (x1,y1) → (x2,y2), drawn to `p` (0–1). `from` = 'start' | 'end' | 'center'. */
export const Line: React.FC<{
	x1: number;
	y1: number;
	x2: number;
	y2: number;
	p?: number;
	t?: number;
	color?: string;
	from?: 'start' | 'end' | 'center';
	style?: React.CSSProperties;
}> = ({x1, y1, x2, y2, p = 1, t = 2, color = C.lumo, from = 'start', style}) => {
	if (p <= 0) return null;
	const len = Math.hypot(x2 - x1, y2 - y1);
	const ang = Math.atan2(y2 - y1, x2 - x1);
	const origin = from === 'start' ? '0% 50%' : from === 'end' ? '100% 50%' : '50% 50%';
	return (
		<div
			style={{
				position: 'absolute',
				left: x1,
				top: y1 - t / 2,
				width: len,
				height: t,
				background: color,
				transformOrigin: '0 50%',
				transform: `rotate(${ang}rad)`,
				...style,
			}}
		>
			<div style={{position: 'absolute', inset: 0, background: color, transform: `scaleX(${p})`, transformOrigin: origin}} />
		</div>
	);
};

/** Solid rectangle, optionally revealed from an edge by `p`. */
export const Block: React.FC<
	Pos & {w: number; h: number; p?: number; dir?: 'l' | 'r' | 'u' | 'd'; color?: string; style?: React.CSSProperties}
> = ({x, y, w, h, p = 1, dir = 'l', color = C.lumo, style}) => {
	if (p <= 0) return null;
	const horiz = dir === 'l' || dir === 'r';
	const origin = {l: '0% 50%', r: '100% 50%', u: '50% 0%', d: '50% 100%'}[dir];
	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: w,
				height: h,
				background: color,
				transformOrigin: origin,
				transform: horiz ? `scaleX(${p})` : `scaleY(${p})`,
				...style,
			}}
		/>
	);
};

/** Editorial corner marks around a rect. `p` draws them in, `gap` pushes them out. */
export const Corners: React.FC<
	Pos & {w: number; h: number; len?: number; t?: number; p?: number; gap?: number; color?: string}
> = ({x, y, w, h, len = 28, t = 2, p = 1, gap = 0, color = C.lumo}) => {
	if (p <= 0) return null;
	const L = len * p;
	const g = gap;
	const seg = (l: number, tp: number, ww: number, hh: number, k: string) => (
		<div key={k} style={{position: 'absolute', left: l, top: tp, width: ww, height: hh, background: color}} />
	);
	const X0 = x - g,
		Y0 = y - g,
		X1 = x + w + g,
		Y1 = y + h + g;
	return (
		<>
			{seg(X0, Y0, L, t, 'a')}
			{seg(X0, Y0, t, L, 'b')}
			{seg(X1 - L, Y0, L, t, 'c')}
			{seg(X1 - t, Y0, t, L, 'd')}
			{seg(X0, Y1 - t, L, t, 'e')}
			{seg(X0, Y1 - L, t, L, 'f')}
			{seg(X1 - L, Y1 - t, L, t, 'g')}
			{seg(X1 - t, Y1 - L, t, L, 'h')}
		</>
	);
};

/** Hairline frame drawn around its perimeter by `p`. */
export const Frame: React.FC<Pos & {w: number; h: number; p?: number; t?: number; color?: string}> = ({
	x,
	y,
	w,
	h,
	p = 1,
	t = 2,
	color = C.lumo,
}) => {
	if (p <= 0) return null;
	// Perimeter split into 4 sides, drawn clockwise from top-left.
	const per = 2 * (w + h);
	let rem = p * per;
	const take = (n: number) => {
		const v = Math.max(0, Math.min(n, rem));
		rem -= n;
		return v;
	};
	const top = take(w),
		right = take(h),
		bottom = take(w),
		left = take(h);
	const s = (st: React.CSSProperties, k: string) => <div key={k} style={{position: 'absolute', background: color, ...st}} />;
	return (
		<>
			{s({left: x, top: y, width: top, height: t}, 't')}
			{s({left: x + w - t, top: y, width: t, height: right}, 'r')}
			{s({left: x + w - bottom, top: y + h - t, width: bottom, height: t}, 'b')}
			{s({left: x, top: y + h - left, width: t, height: left}, 'l')}
		</>
	);
};

/** Small editorial label. */
export const Label: React.FC<
	Pos & {children: React.ReactNode; size?: number; color?: string; align?: 'left' | 'right' | 'center'; style?: React.CSSProperties}
> = ({x, y, children, size = 18, color = C.lumo, align = 'left', style}) => (
	<div
		style={{
			position: 'absolute',
			left: x,
			top: y,
			color,
			whiteSpace: 'nowrap',
			transform: align === 'center' ? 'translateX(-50%)' : align === 'right' ? 'translateX(-100%)' : undefined,
			...mono(size),
			...style,
		}}
	>
		{children}
	</div>
);
