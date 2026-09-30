/**
 * 04 · THE PRODUCT, ALIVE — one window, three bars of the groove:
 * SET A GOAL (real Create Goal) → SHOW UP (push into Check in, tap) →
 * CAPTURE IT (Photo Check-in). The captured photo then leaves the UI and
 * fills the frame on the edit's downbeat: we are inside the memory.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT} from '../beats';
import {HAIRLINE, HOME_WINDOW, PRODUCT_WIDE, RADIUS} from '../components/Screen';
import {Crop, MediaSlot, clipFrames, mixCrop, slotPoint} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C} from '../theme';
import {HOME_CROP} from './S02Lumo';

const CROP = {
	form: {x: 0.5, y: 0.34, zoom: 1},
	field: {x: 0.5, y: 0.43, zoom: 1.04},
	button: {x: 0.5, y: 0.56, zoom: 1.04},
	added: {x: 0.5, y: 0.7, zoom: 1},
	home: HOME_CROP,
	pill: {x: 0.32, y: 0.62, zoom: 2},
	full: {x: 0.5, y: 0.5, zoom: 1},
} satisfies Record<string, Crop>;

/** Where the captured photo sits inside the Photo Check-in UI (relative to the window). */
export const PHOTO_IN_UI = {x: 0.1, y: 0.13, w: 0.8, h: 0.6};

const W = PRODUCT_WIDE;

/** A tap: one thin #E3D290 ring. */
const Tap: React.FC<{f: number; at: number; x: number; y: number}> = ({f, at: t, x, y}) => {
	const p = ramp(f, t, t + 14);
	if (f < t || p >= 1) return null;
	return (
		<div
			style={{
				position: 'absolute',
				left: x - 60,
				top: y - 60,
				width: 120,
				height: 120,
				borderRadius: '50%',
				border: `2px solid ${C.lumo}`,
				opacity: 0.85 * (1 - p),
				transform: `scale(${mix(0.3, 1, p)})`,
			}}
		/>
	);
};

const Word: React.FC<{f: number; a: number; b: number; children: React.ReactNode}> = ({f, a, b, children}) => (
	<Headline x={200} y={430} size={128}>
		<Reveal p={ramp(f, a, a + 12)} out={ramp(f, b - 8, b, ease.in)} rise={36}>
			{children}
		</Reveal>
	</Headline>
);

export const S03Product: React.FC = () => {
	const f = useCurrentFrame();
	const showUp = at('product', HIT.showUp);
	const capture = at('product', HIT.capture);
	const end = at('product', HIT.intoMemory);

	// ——— which recording, which clip ———
	const T = {typing: 10, tap: 0, added: 0};
	T.tap = T.typing + clipFrames('createGoal', 'typing') + 8;
	T.added = T.tap + 14;
	const tapPill = showUp + 44;
	const camera = tapPill + 10;
	const shutterClip = capture;

	let slot: 'createGoal' | 'home' | 'photoCheckin' = 'createGoal';
	let clip = 'openForm';
	let playhead = f;
	let crop: Crop = CROP.form;
	if (f < showUp) {
		clip = f < T.typing ? 'openForm' : f < T.tap ? 'typing' : f < T.added ? 'tapCreate' : 'added';
		playhead = clip === 'openForm' ? f : clip === 'typing' ? f - T.typing : clip === 'tapCreate' ? f - T.tap : f - T.added;
		crop = mixCrop(CROP.form, CROP.field, ramp(f, 4, 16, ease.inOut));
		crop = mixCrop(crop, CROP.button, ramp(f, T.tap - 10, T.tap, ease.inOut));
		crop = mixCrop(crop, CROP.added, ramp(f, T.added - 4, T.added + 8, ease.inOut));
	} else if (f < camera) {
		slot = 'home';
		clip = 'still';
		playhead = 0;
		crop = mixCrop(CROP.home, CROP.pill, ramp(f, showUp + 4, tapPill - 4, ease.inOut));
	} else {
		slot = 'photoCheckin';
		clip = f < shutterClip ? 'tap' : 'capture';
		playhead = f < shutterClip ? f - camera : f - shutterClip;
		crop = CROP.full;
	}

	// ——— the window ———
	const widen = ramp(f, 0, 14, ease.inOut);
	const r: Box = mixBox(HOME_WINDOW, W, widen);

	// ——— the captured photo becomes the frame ———
	const shutter = capture + 22;
	const photoIn = ramp(f, shutter + 12, shutter + 20);
	const expand = ramp(f, end - 30, end, ease.inOut);
	const inUI: Box = {x: r.x + r.w * PHOTO_IN_UI.x, y: r.y + r.h * PHOTO_IN_UI.y, w: r.w * PHOTO_IN_UI.w, h: r.h * PHOTO_IN_UI.h};
	const photo = mixBox(inUI, {x: 0, y: 0, w: 1920, h: 1080}, expand);

	const tapCreate = slotPoint('createGoal', r, crop, 0.5, 0.6);
	const pill = slotPoint('home', r, crop, 0.255, 0.63);

	return (
		<AbsoluteFill>
			<MediaSlot
				id={slot}
				clip={clip}
				playhead={playhead}
				{...r}
				crop={crop}
				radius={RADIUS}
				style={{boxShadow: HAIRLINE, opacity: 1 - ramp(expand, 0.4, 0.9)}}
			/>
			{f < showUp && <Tap f={f} at={T.tap + 4} x={tapCreate.x} y={tapCreate.y} />}
			{f >= showUp && f < camera && <Tap f={f} at={tapPill - 4} x={pill.x} y={pill.y} />}
			{/* shutter */}
			{f >= shutter && f < shutter + 6 && (
				<div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: RADIUS, background: '#fff', opacity: 0.5 * (1 - ramp(f, shutter, shutter + 6))}} />
			)}

			<Word f={f} a={2} b={showUp}>
				Set a goal.
			</Word>
			<Word f={f} a={showUp} b={capture}>
				Show up.
			</Word>
			<Word f={f} a={capture} b={end - 26}>
				Capture it.
			</Word>

			{photoIn > 0 && (
				<div
					style={{
						position: 'absolute',
						left: photo.x,
						top: photo.y,
						width: photo.w,
						height: photo.h,
						opacity: photoIn,
						borderRadius: mix(24, 0, expand),
						overflow: 'hidden',
					}}
				>
					<Memory i={0} w={photo.w} h={photo.h} bare={expand < 0.5} />
				</div>
			)}
		</AbsoluteFill>
	);
};
