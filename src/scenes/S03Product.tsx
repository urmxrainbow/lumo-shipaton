/**
 * 04 · THE PRODUCT, ALIVE — one window, two bars of the groove:
 * SET A GOAL (real Create Goal) → SHOW UP (push into the real Check in
 * button, tap). The tap collapses the window into a single checkbox —
 * which is where the Photo Check-in sequence begins.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {CHECKBOX, HAIRLINE, HOME_WINDOW, PRODUCT_WIDE, RADIUS} from '../components/Screen';
import {Crop, MediaSlot, clipFrames, mixCrop, slotPoint} from '../components/MediaSlot';
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
} satisfies Record<string, Crop>;

/** A tap: one thin #E3D290 ring. */
export const Tap: React.FC<{f: number; at: number; x: number; y: number}> = ({f, at: t, x, y}) => {
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

export const Word: React.FC<{f: number; a: number; b: number; children: React.ReactNode}> = ({f, a, b: out, children}) => (
	<Headline x={200} y={430} size={128}>
		<Reveal p={ramp(f, a, a + 12)} out={ramp(f, out - 8, out, ease.in)} rise={36}>
			{children}
		</Reveal>
	</Headline>
);

export const S03Product: React.FC = () => {
	const f = useCurrentFrame();
	const showUp = at('product', HIT.showUp);
	const end = at('product', HIT.checkbox);

	const T = {typing: 10, tap: 0, added: 0};
	T.tap = T.typing + clipFrames('createGoal', 'typing') + 8;
	T.added = T.tap + 14;
	const tapPill = showUp + b(1.75);

	let slot: 'createGoal' | 'home' = 'createGoal';
	let clip = 'openForm';
	let playhead = f;
	let crop: Crop = CROP.form;
	if (f < showUp) {
		clip = f < T.typing ? 'openForm' : f < T.tap ? 'typing' : f < T.added ? 'tapCreate' : 'added';
		playhead = clip === 'openForm' ? f : clip === 'typing' ? f - T.typing : clip === 'tapCreate' ? f - T.tap : f - T.added;
		crop = mixCrop(CROP.form, CROP.field, ramp(f, 4, 16, ease.inOut));
		crop = mixCrop(crop, CROP.button, ramp(f, T.tap - 10, T.tap, ease.inOut));
		crop = mixCrop(crop, CROP.added, ramp(f, T.added - 4, T.added + 8, ease.inOut));
	} else {
		slot = 'home';
		clip = 'still';
		playhead = 0;
		crop = mixCrop(CROP.home, CROP.pill, ramp(f, showUp + 4, tapPill - 4, ease.inOut));
	}

	// window: Home → Create Goal size; after the Check in tap it collapses into the checkbox
	const widen = ramp(f, 0, 14, ease.inOut);
	const collapse = ramp(f, tapPill + 8, end - 2, ease.inOut);
	const r: Box = mixBox(mixBox(HOME_WINDOW, PRODUCT_WIDE, widen), CHECKBOX, collapse);
	const radius = mix(RADIUS, 24, collapse);

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
				radius={radius}
				style={{boxShadow: HAIRLINE, opacity: 1 - ramp(collapse, 0.35, 0.8)}}
			/>
			{collapse > 0.4 && (
				<div
					style={{
						position: 'absolute',
						left: r.x,
						top: r.y,
						width: r.w,
						height: r.h,
						borderRadius: radius,
						boxShadow: `inset 0 0 0 4px ${C.white}`,
						opacity: ramp(collapse, 0.4, 1),
					}}
				/>
			)}
			{f < showUp && <Tap f={f} at={T.tap + 4} x={tapCreate.x} y={tapCreate.y} />}
			{f >= showUp && <Tap f={f} at={tapPill - 4} x={pill.x} y={pill.y} />}

			<Word f={f} a={2} b={showUp}>
				Set a goal.
			</Word>
			<Word f={f} a={showUp} b={tapPill + 10}>
				Show up.
			</Word>
		</AbsoluteFill>
	);
};
