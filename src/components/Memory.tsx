/**
 * <Memory /> — one real photo check-in. Full colour, never tinted.
 * If the photo file is missing it renders a designed Lumo memory tile
 * (alternating solid / outline) with the day number, in the same box.
 */
import React from 'react';
import {Img} from 'remotion';
import {MEMORIES} from '../media.config';
import {memorySrc} from '../lib/media';
import {C, display, mono} from '../theme';

type Props = {
	set?: keyof typeof MEMORIES;
	i: number;
	w: number;
	h: number;
	/** Photo zoom inside its frame (for crop punches). */
	zoom?: number;
	style?: React.CSSProperties;
	/** Hide tile typography (for tiny thumbnails). */
	bare?: boolean;
};

export const dayOf = (i: number) => String(i + 1).padStart(2, '0');

export const Memory: React.FC<Props> = ({set = 'a', i, w, h, zoom = 1, style, bare}) => {
	const src = memorySrc(set, i);
	const box: React.CSSProperties = {position: 'relative', width: w, height: h, overflow: 'hidden', ...style};
	if (src) {
		return (
			<div style={box}>
				<Img
					src={src}
					style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`}}
				/>
			</div>
		);
	}
	const solid = (i + (set === 'b' ? 1 : 0)) % 2 === 0;
	const fg = solid ? C.black : C.lumo;
	const m = Math.min(w, h);
	return (
		<div
			style={{
				...box,
				background: solid ? C.lumo : C.black,
				boxShadow: solid ? undefined : `inset 0 0 0 ${Math.max(1.5, m / 120)}px ${C.lumo}`,
			}}
		>
			{!bare && m > 90 && (
				<>
					<div style={{position: 'absolute', left: m * 0.07, top: m * 0.07, color: fg, ...mono(Math.max(9, m * 0.055), 700)}}>
						{set === 'b' ? 'B' : 'A'} · MEMORY
					</div>
					<div
						style={{
							position: 'absolute',
							left: m * 0.06,
							bottom: m * 0.02,
							color: fg,
							...display(900, 100),
							fontSize: m * 0.42,
							transform: `scale(${zoom})`,
							transformOrigin: '0% 100%',
						}}
					>
						{dayOf(i)}
					</div>
				</>
			)}
		</div>
	);
};
