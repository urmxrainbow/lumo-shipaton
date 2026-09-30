/**
 * <MediaSlot /> — a fixed, replaceable VIDEO WINDOW.
 *
 * The window (position, size, mask, radius, motion) belongs to the scene.
 * Only its CONTENT changes: if assets/recordings/<file>.mp4|mov exists it
 * renders the real recording with the designed crop and clip timing;
 * otherwise it renders a production placeholder with the IDENTICAL crop
 * transform, so the intended framing is visible before the footage exists.
 */
import React from 'react';
import {Freeze, OffthreadVideo} from 'remotion';
import {MEDIA_SLOTS, SlotId} from '../media.config';
import {slotSrc} from '../lib/media';
import {C, FPS, display, mono} from '../theme';

export type Crop = {
	/** Focus point in normalised source coords (0–1). */
	x: number;
	y: number;
	/** 1 = cover-fit the window; >1 zooms in around the focus point. */
	zoom: number;
};

export const FULL: Crop = {x: 0.5, y: 0.5, zoom: 1};

export const mixCrop = (a: Crop, b: Crop, t: number): Crop => ({
	x: a.x + (b.x - a.x) * t,
	y: a.y + (b.y - a.y) * t,
	// zoom interpolated geometrically so it feels linear to the eye
	zoom: a.zoom * Math.pow(b.zoom / a.zoom, t),
});

type Props = {
	id: SlotId;
	clip: string;
	/** Frames since this clip started playing (<0 holds the first frame). */
	playhead: number;
	x: number;
	y: number;
	w: number;
	h: number;
	crop?: Crop;
	radius?: number;
	/** Hairline Lumo border on the window. */
	border?: boolean;
	style?: React.CSSProperties;
	children?: React.ReactNode;
};

export const clipFrames = (id: SlotId, clip: string) => {
	const c = (MEDIA_SLOTS[id].clips as Record<string, {in: number; out: number; rate?: number}>)[clip];
	return Math.round(((c.out - c.in) / (c.rate ?? 1)) * FPS);
};

/** Crop geometry — identical for real media and placeholder. */
export const cropGeom = (id: SlotId, w: number, h: number, crop: Crop) => {
	const {w: sw, h: sh} = MEDIA_SLOTS[id].source;
	const top0 = MEDIA_SLOTS[id].safeTop * sh;
	const base = Math.max(w / sw, h / (sh - top0));
	const s = base * crop.zoom;
	const cw = sw * s;
	const ch = sh * s;
	const left = Math.min(0, Math.max(w - cw, w / 2 - crop.x * cw));
	const top = Math.min(-top0 * s, Math.max(h - ch, h / 2 - crop.y * ch));
	return {left, top, cw, ch, s};
};

/** Screen position of a normalised source point inside a slot window (for tap rings etc). */
export const slotPoint = (
	id: SlotId,
	r: {x: number; y: number; w: number; h: number},
	crop: Crop,
	nx: number,
	ny: number,
) => {
	const g = cropGeom(id, r.w, r.h, crop);
	return {x: r.x + g.left + nx * g.cw, y: r.y + g.top + ny * g.ch};
};

export const MediaSlot: React.FC<Props> = ({
	id,
	clip,
	playhead,
	x,
	y,
	w,
	h,
	crop = FULL,
	radius = 0,
	border = false,
	style,
	children,
}) => {
	const slot = MEDIA_SLOTS[id];
	const c = (slot.clips as Record<string, {in: number; out: number; rate?: number}>)[clip];
	const src = slotSrc(id);

	// Source time: play in→out at `rate`, freeze on the last frame.
	const t = Math.min(c.out, Math.max(c.in, c.in + (playhead / FPS) * (c.rate ?? 1)));

	const {left, top, cw, ch} = cropGeom(id, w, h, crop);

	return (
		<div
			style={{
				position: 'absolute',
				left: x,
				top: y,
				width: w,
				height: h,
				overflow: 'hidden',
				borderRadius: radius,
				background: C.ui,
				...style,
			}}
		>
			<div style={{position: 'absolute', left, top, width: cw, height: ch}}>
				{src ? (
					<Freeze frame={Math.round(t * FPS)}>
						<OffthreadVideo src={src} muted style={{width: '100%', height: '100%', objectFit: 'fill'}} />
					</Freeze>
				) : (
					<PlaceholderCanvas crop={crop} />
				)}
			</div>
			{!src && <PlaceholderLabel id={id} clip={clip} w={w} h={h} />}
			{children}
			{border && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						borderRadius: radius,
						boxShadow: `inset 0 0 0 2px ${C.lumo}`,
						pointerEvents: 'none',
					}}
				/>
			)}
		</div>
	);
};

/** The virtual recording surface: shows where the crop is looking. */
const PlaceholderCanvas: React.FC<{crop: Crop}> = ({crop}) => {
	const lines = [];
	for (let i = 1; i < 10; i++) {
		lines.push(
			<div key={`h${i}`} style={{position: 'absolute', left: 0, right: 0, top: `${i * 10}%`, height: 1, background: 'rgba(227,210,144,0.14)'}} />,
			<div key={`v${i}`} style={{position: 'absolute', top: 0, bottom: 0, left: `${i * 10}%`, width: 1, background: 'rgba(227,210,144,0.08)'}} />,
		);
	}
	return (
		<div style={{position: 'absolute', inset: 0, background: '#050505'}}>
			{lines}
			{/* y-position ticks, so the guide can say "keep X at 40%" */}
			{Array.from({length: 9}, (_, i) => (
				<div
					key={`t${i}`}
					style={{
						position: 'absolute',
						left: '2%',
						top: `calc(${(i + 1) * 10}% + 6px)`,
						color: 'rgba(227,210,144,0.35)',
						...mono(22),
					}}
				>
					{(i + 1) * 10}
				</div>
			))}
			{/* focus crosshair: the designed crop centres here */}
			<div
				style={{
					position: 'absolute',
					left: `${crop.x * 100}%`,
					top: `${crop.y * 100}%`,
					width: 120,
					height: 120,
					marginLeft: -60,
					marginTop: -60,
					borderRadius: '50%',
					border: `3px solid rgba(227,210,144,0.5)`,
				}}
			/>
		</div>
	);
};

const PlaceholderLabel: React.FC<{id: SlotId; clip: string; w: number; h: number}> = ({id, clip, w, h}) => {
	const slot = MEDIA_SLOTS[id];
	const k = Math.max(0.42, Math.min(1.1, Math.min(w, h * 0.8) / 520));
	const compact = Math.min(w, h) < 260;
	const secs = (clipFrames(id, clip) / FPS).toFixed(1);
	const pad = 26 * k;
	return (
		<div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
			<div style={{position: 'absolute', left: pad, top: pad, color: C.lumo, ...mono(15 * k, 700)}}>
				● SLOT {slot.number}
			</div>
			<div
				style={{
					position: 'absolute',
					left: pad,
					right: pad,
					top: '50%',
					transform: 'translateY(-50%)',
				}}
			>
				<div
					style={{
						...display(900, 100),
						// never wider than the window
						fontSize: Math.min(64 * k, (w - pad * 2) / (slot.label.length * 0.62)),
						color: C.lumo,
						whiteSpace: 'nowrap',
						lineHeight: 0.9,
					}}
				>
					{slot.label}
				</div>
				{!compact && (
					<div style={{marginTop: 18 * k, color: 'rgba(247,245,238,0.7)', ...mono(14 * k), letterSpacing: '0.08em', lineHeight: 1.5, textTransform: 'none'}}>
						ADD assets/recordings/{slot.file}.mp4
					</div>
				)}
			</div>
			<div style={{position: 'absolute', left: pad, bottom: pad, color: C.lumo, ...mono(14 * k)}}>
				{clip} · {secs}s
			</div>
		</div>
	);
};
