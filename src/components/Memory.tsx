/**
 * <Memory /> — one real photo check-in. Full colour, never tinted.
 * If the photo file is missing it renders a quiet dark tile in the same
 * box (with its day), so compositions read correctly before photos exist.
 */
import React from 'react';
import {Img} from 'remotion';
import {MEMORIES, MEMORY_VIEW} from '../media.config';
import {memoryName, memorySrc} from '../lib/media';
import {C, text} from '../theme';

type Props = {
	set?: keyof typeof MEMORIES;
	i: number;
	w: number;
	h: number;
	/** Photo zoom inside its frame (slow push-ins). */
	zoom?: number;
	radius?: number;
	style?: React.CSSProperties;
	/** Hide placeholder text (for tiny thumbnails). */
	bare?: boolean;
};

export const dayOf = (i: number) => String(i + 1).padStart(2, '0');

export const Memory: React.FC<Props> = ({set = 'a', i, w, h, zoom = 1, radius = 0, style, bare}) => {
	const src = memorySrc(set, i);
	const box: React.CSSProperties = {position: 'relative', width: w, height: h, overflow: 'hidden', borderRadius: radius, ...style};
	if (src) {
		return (
			<div style={box}>
				<Img
					src={src}
					style={{
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						transform: `scale(${zoom})`,
						objectViewBox: MEMORY_VIEW[memoryName(set, i) ?? ''],
					}}
				/>
			</div>
		);
	}
	const m = Math.min(w, h);
	return (
		<div style={{...box, background: C.tile, boxShadow: 'inset 0 0 0 1px rgba(245,245,247,0.06)'}}>
			{!bare && m > 110 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: m * 0.03,
						color: C.faint,
					}}
				>
					<div style={{...text(Math.max(12, m * 0.07), 500)}}>
						{set === 'b' ? 'Partner · ' : ''}Day {dayOf(i)}
					</div>
					<div style={{...text(Math.max(9, m * 0.042)), opacity: 0.7}}>photo</div>
				</div>
			)}
		</div>
	);
};
