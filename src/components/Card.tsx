/**
 * <Card /> — a memory photo placed on the stage with one of several
 * entrance behaviours, so no two photos arrive the same way.
 */
import React from 'react';
import {Memory} from './Memory';
import {ease, mix, pop, ramp} from '../lib/anim';
import {Rect} from '../layouts';
import {MEMORIES} from '../media.config';
import {C} from '../theme';

export type Enter = 'cut' | 'wipeD' | 'wipeL' | 'wipeR' | 'slideR' | 'slideL' | 'pushU' | 'pop' | 'circle' | 'punch';

export const Card: React.FC<{
	f: number;
	at: number;
	r: Rect;
	i: number;
	set?: keyof typeof MEMORIES;
	enter?: Enter;
	dur?: number;
	border?: boolean;
	dim?: number;
	style?: React.CSSProperties;
}> = ({f, at, r, i, set = 'a', enter = 'cut', dur = 8, border, dim = 1, style}) => {
	if (f < at) return null;
	const p = ramp(f, at, at + dur, enter === 'circle' ? ease.inOut : ease.out);
	let clip: string | undefined;
	let tf = '';
	let zoom = 1;
	switch (enter) {
		case 'wipeD':
			clip = `inset(0 0 ${(1 - p) * 100}% 0)`;
			zoom = mix(1.25, 1, p);
			break;
		case 'wipeL':
			clip = `inset(0 ${(1 - p) * 100}% 0 0)`;
			break;
		case 'wipeR':
			clip = `inset(0 0 0 ${(1 - p) * 100}%)`;
			break;
		case 'slideR':
			tf = `translateX(${(1 - p) * (1920 - r.x + 40)}px)`;
			break;
		case 'slideL':
			tf = `translateX(${-(1 - p) * (r.x + r.w + 40)}px)`;
			break;
		case 'pushU':
			tf = `translateY(${(1 - p) * (1080 - r.y + 40)}px)`;
			break;
		case 'pop': {
			const s = pop(f, at);
			tf = `scale(${mix(0.55, 1, s)})`;
			break;
		}
		case 'punch':
			zoom = mix(1.35, 1, ramp(f, at, at + 10));
			break;
		case 'circle':
			clip = `circle(${p * 75}% at 50% 50%)`;
			break;
	}
	return (
		<div
			style={{
				position: 'absolute',
				left: r.x,
				top: r.y,
				width: r.w,
				height: r.h,
				clipPath: clip,
				transform: tf || undefined,
				filter: dim < 1 ? `brightness(${dim})` : undefined,
				...style,
			}}
		>
			<Memory set={set} i={i} w={r.w} h={r.h} zoom={zoom} />
			{border && <div style={{position: 'absolute', inset: 0, boxShadow: `inset 0 0 0 3px ${C.lumo}`}} />}
		</div>
	);
};
