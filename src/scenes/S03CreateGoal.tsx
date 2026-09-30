/**
 * 03 · CREATE A GOAL — the real Create Goal recording, large and
 * readable, with a slow push-in. The same window that held Home now
 * holds the flow; at the end it collapses into a single checkbox.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {CHECKBOX, HAIRLINE, HOME_WINDOW, PRODUCT_WIDE, RADIUS} from '../components/Screen';
import {Crop, MediaSlot, clipFrames, mixCrop, slotPoint} from '../components/MediaSlot';
import {Headline, Reveal} from '../components/type';
import {ease, mix, mixBox, ramp} from '../lib/anim';
import {C} from '../theme';

const CROP = {
	// Full-width crops (zoom ≈ 1) keep every line of the real UI intact;
	// the push-in comes from the window itself scaling slowly.
	form: {x: 0.5, y: 0.34, zoom: 1},
	field: {x: 0.5, y: 0.42, zoom: 1},
	fieldClose: {x: 0.5, y: 0.44, zoom: 1.06},
	button: {x: 0.5, y: 0.56, zoom: 1.04},
	added: {x: 0.5, y: 0.7, zoom: 1},
} satisfies Record<string, Crop>;

export const S03CreateGoal: React.FC = () => {
	const f = useCurrentFrame();

	// clip schedule (source clips live in media.config.ts)
	const T = {
		typing: 14,
		tap: 156,
		added: 178,
	};
	const typingEnd = T.typing + clipFrames('createGoal', 'typing');
	const clip = f < T.typing ? 'openForm' : f < T.tap ? 'typing' : f < T.added ? 'tapCreate' : 'added';
	const playhead = clip === 'openForm' ? f : clip === 'typing' ? f - T.typing : clip === 'tapCreate' ? f - T.tap : f - T.added;

	let crop = mixCrop(CROP.form, CROP.field, ramp(f, 8, 40, ease.inOut));
	crop = mixCrop(crop, CROP.fieldClose, ramp(f, 40, typingEnd + 60, ease.inOut));
	crop = mixCrop(crop, CROP.button, ramp(f, T.tap - 18, T.tap, ease.inOut));
	crop = mixCrop(crop, CROP.added, ramp(f, T.added - 6, T.added + 12, ease.inOut));

	// window: widens slightly on entry, collapses into the checkbox at the end
	const widen = ramp(f, 0, 36, ease.inOut);
	const collapseAt = b(14.75);
	const collapse = ramp(f, collapseAt, b(16), ease.inOut);
	const r = mixBox(mixBox(HOME_WINDOW, PRODUCT_WIDE, widen), CHECKBOX, collapse);
	const radius = mix(RADIUS, 18, collapse);
	// slow push-in across the scene (starts where the Home beauty shot ended)
	const scale = mix(1.02, 1, widen) * mix(1, 1.045, ramp(f, 36, collapseAt, ease.inOut)) * mix(1, 1 / 1.045, collapse);

	const tapAt = T.tap + 6;
	const tap = slotPoint('createGoal', r, crop, 0.5, 0.6);
	const tp = ramp(f, tapAt, tapAt + 16);

	const textOut = ramp(f, b(13.25), b(14.25), ease.in);

	return (
		<AbsoluteFill>
			<MediaSlot
				id="createGoal"
				clip={clip}
				playhead={playhead}
				{...r}
				crop={crop}
				radius={radius}
				style={{
					transform: `scale(${scale})`,
					boxShadow: HAIRLINE,
					opacity: 1 - ramp(collapse, 0.35, 0.8),
				}}
			/>
			{/* the checkbox the window becomes */}
			{collapse > 0.4 && (
				<div
					style={{
						position: 'absolute',
						left: r.x,
						top: r.y,
						width: r.w,
						height: r.h,
						borderRadius: radius,
						boxShadow: `inset 0 0 0 3px ${C.white}`,
						opacity: ramp(collapse, 0.4, 1),
					}}
				/>
			)}
			{/* a single, quiet tap */}
			{f >= tapAt && tp < 1 && (
				<div
					style={{
						position: 'absolute',
						left: tap.x - 60,
						top: tap.y - 60,
						width: 120,
						height: 120,
						borderRadius: '50%',
						border: `2px solid ${C.lumo}`,
						opacity: 0.8 * (1 - tp),
						transform: `scale(${mix(0.3, 1, tp)})`,
					}}
				/>
			)}
			<Headline x={200} y={400} size={112}>
				<Reveal p={ramp(f, 20, 56)} out={textOut}>
					Start with
				</Reveal>
				<Reveal p={ramp(f, 32, 68)} out={textOut}>
					a goal.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
