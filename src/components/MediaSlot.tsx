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
import {C, FPS, display, text} from '../theme';

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

/**
 * The virtual recording surface — quiet by design. A faint grid with
 * y-position marks shows exactly how the crop frames the recording; the
 * soft ring marks the point the crop is centred on.
 */
const PlaceholderCanvas: React.FC<{crop: Crop}> = ({crop}) => (
	<div style={{position: 'absolute', inset: 0, background: '#0B0B0C'}}>
		{Array.from({length: 9}, (_, i) => (
			<React.Fragment key={i}>
				<div style={{position: 'absolute', left: 0, right: 0, top: `${(i + 1) * 10}%`, height: 1, background: 'rgba(245,245,247,0.045)'}} />
				<div style={{position: 'absolute', left: '3%', top: `calc(${(i + 1) * 10}% + 10px)`, color: 'rgba(245,245,247,0.18)', ...text(26)}}>
					{(i + 1) * 10}%
				</div>
			</React.Fragment>
		))}
		<div
			style={{
				position: 'absolute',
				left: `${crop.x * 100}%`,
				top: `${crop.y * 100}%`,
				width: 140,
				height: 140,
				marginLeft: -70,
				marginTop: -70,
				borderRadius: '50%',
				border: '2px solid rgba(227,210,144,0.28)',
			}}
		/>
	</div>
);

const PlaceholderLabel: React.FC<{id: SlotId; clip: string; w: number; h: number}> = ({id, clip, w, h}) => {
	const slot = MEDIA_SLOTS[id];
	const k = Math.max(0.5, Math.min(1.2, Math.min(w, h * 0.8) / 520));
	const compact = Math.min(w, h) < 260;
	const secs = (clipFrames(id, clip) / FPS).toFixed(1);
	return (
		<div
			style={{
				position: 'absolute',
				inset: 0,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				pointerEvents: 'none',
				gap: 12 * k,
			}}
		>
			<div style={{color: C.faint, ...text(15 * k, 500), letterSpacing: '0.12em'}}>SLOT {slot.number}</div>
			<div style={{color: C.white, whiteSpace: 'nowrap', ...display(Math.min(46 * k, (w * 0.84) / (slot.label.length * 0.52)), 500)}}>
				{slot.label}
			</div>
			{!compact && (
				<div style={{color: C.faint, ...text(15 * k)}}>
					assets/recordings/{slot.file}.mp4 · {clip} {secs}s
				</div>
			)}
		</div>
	);
};
