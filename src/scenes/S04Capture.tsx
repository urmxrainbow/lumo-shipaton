/**
 * 04 · NOT JUST A CHECKBOX — a small box checks… and becomes a photo.
 * The photo then opens into the real Photo Check-in window.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {CHECKBOX, HAIRLINE, RADIUS} from '../components/Screen';
import {MediaSlot, clipFrames} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Caption, Headline, Reveal} from '../components/type';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

export const PHOTO: Box = {x: 760, y: 250, w: 400, h: 500};
export const CHECKIN: Box = {x: 1100, y: 60, w: 460, h: 960};

export const S04Capture: React.FC = () => {
	const f = useCurrentFrame();

	// 1 · it checks
	const fill = ramp(f, b(2), b(2) + 12, ease.out);
	const tick = ramp(f, b(2) + 6, b(2) + 22, ease.out);

	// 2 · the check becomes a photo
	const toPhoto = ramp(f, b(10), b(12.5), ease.inOut);
	const photoIn = ramp(toPhoto, 0.25, 0.8);
	const tickOut = ramp(f, b(9.75), b(10.5));

	// 3 · the photo opens into the Photo Check-in recording
	const toSlot = ramp(f, b(14), b(16.5), ease.inOut);
	const slotIn = ramp(toSlot, 0.3, 0.9);
	const tTap = b(14.75);
	const tCapture = tTap + clipFrames('photoCheckin', 'tap');

	const r = mixBox(mixBox(CHECKBOX, PHOTO, toPhoto), CHECKIN, toSlot);
	const radius = mix(mix(18, 28, toPhoto), RADIUS, toSlot);

	const endOut = ramp(f, b(18.75), b(19.75), ease.in);

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					left: r.x,
					top: r.y,
					width: r.w,
					height: r.h,
					borderRadius: radius,
					overflow: 'hidden',
					boxShadow: toPhoto < 0.3 ? `inset 0 0 0 3px ${C.white}` : undefined,
				}}
			>
				{/* checkbox fill: #E3D290, grows from the centre */}
				<div
					style={{
						position: 'absolute',
						inset: 0,
						background: C.lumo,
						transform: `scale(${fill})`,
						borderRadius: radius,
						opacity: 1 - photoIn,
					}}
				/>
				{photoIn > 0 && (
					<div style={{position: 'absolute', inset: 0, opacity: photoIn * (1 - slotIn)}}>
						<Memory i={0} w={r.w} h={r.h} zoom={mix(1.12, 1, toPhoto)} />
					</div>
				)}
			</div>

			{/* the tick */}
			{tickOut < 1 && (
				<svg
					width={CHECKBOX.w}
					height={CHECKBOX.h}
					viewBox="0 0 72 72"
					style={{position: 'absolute', left: CHECKBOX.x, top: CHECKBOX.y, opacity: 1 - tickOut}}
				>
					<path
						d="M21 37.5 L31.5 48 L52 26"
						fill="none"
						stroke={C.black}
						strokeWidth={6}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeDasharray={50}
						strokeDashoffset={50 * (1 - tick)}
					/>
				</svg>
			)}

			{/* the recording takes over the same frame */}
			{slotIn > 0 && (
				<MediaSlot
					id="photoCheckin"
					clip={f < tCapture ? 'tap' : 'capture'}
					playhead={f < tCapture ? f - tTap : f - tCapture}
					{...r}
					radius={radius}
					style={{opacity: slotIn, boxShadow: HAIRLINE}}
				/>
			)}

			<Caption x={0} y={560} size={60} align="center" color={C.white} style={{...display(60, 500)}}>
				<Reveal p={ramp(f, b(3.5), b(5.5))} out={ramp(f, b(8.5), b(9.5), ease.in)}>
					Don’t just check it off.
				</Reveal>
			</Caption>

			<Headline x={200} y={440} size={112}>
				<Reveal p={ramp(f, b(15.5), b(18))} out={endOut}>
					Capture it.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
