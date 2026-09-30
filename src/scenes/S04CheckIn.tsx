/**
 * 05 · PHOTO CHECK-IN — the hero feature, shown with the REAL product.
 *
 *  bar 1  black. ✓ on the beat. "You showed up." → "You put in the work."
 *  bar 2  (edit join) the check becomes the real Photo Check-in window.
 *         photo-checkin.MOV plays at real speed: tap Check in → camera …
 *  bar 3  … the shutter lands on the downbeat → ✓ → Breakfast checked.
 *  bar 4  "Every check-in" → "means" → "something." — built, not shown:
 *         each part rises through its mask on the beat; the first lines
 *         make room as "something." lands largest.
 * Nothing is laid over the recording: the product is the visual.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {CHECKBOX, HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot, mixCrop, slotPoint} from '../components/MediaSlot';
import {Headline, MaskLine, Reveal, Stack, arrive, leave} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';
import {Tap} from './S03Product';

/** The Photo Check-in window: large, right of centre, the interaction fully readable. */
export const CHECKIN_WIN: Box = {x: 1040, y: 56, w: 620, h: 968};
// Two framings, eased between as the interaction moves (a controlled camera):
// Home — from "Today's habit" down; the snap sheet — from its title down.
const HOME: Crop = {x: 0.5, y: 0.695, zoom: 1}; // full width, 39–100 %: from "Today's habit" down
/** On Home the window is shorter (so it frames Home cleanly); it grows as the snap sheet rises. */
const HOME_WIN: Box = {x: 1040, y: 130, w: 620, h: 820};
const SHEET: Crop = {x: 0.5, y: 0.64, zoom: 1};
const RAD = 48;

// moments inside photo-checkin.MOV (seconds)
const SRC = {tapCheckIn: 0.45, shutter: 2.25, confirm: 2.9};

const Centre: React.FC<{size: number; weight?: 500 | 600; color?: string; children: React.ReactNode}> = ({
	size,
	weight = 600,
	color = C.white,
	children,
}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			color,
			...display(size, weight),
			lineHeight: 1.06,
		}}
	>
		{children}
	</div>
);

export const S04CheckIn: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const join = at('checkin', HIT.intoCheckin);
	const shutter = at('checkin', HIT.shutter);
	const line = at('checkin', HIT.everyLine);
	const end = at('checkin', HIT.progressShot);

	// ——— bar 1: the check ———
	const tickAt = b(1);
	const fill = ramp(f, tickAt, tickAt + 10, ease.out);
	const tick = ramp(f, tickAt + 3, tickAt + 16, ease.out);
	const showed = b(1.5);
	const work = b(2.6);

	// ——— bar 2: the check becomes the real Photo Check-in ———
	const grow = ramp(f, join, join + 20, ease.inOut);
	const radius = mix(24, RAD, grow);
	const videoIn = ramp(f, join + 6, join + 20);
	// the recording is timed so its shutter press lands on the downbeat
	const start = shutter - Math.round(SRC.shutter * 30);
	const playhead = f - start;
	const breathe = mix(1, 1.025, ramp(f, join + 20, line, ease.inOut));

	// ——— bar 4: the line ———
	const winOut = ramp(f, line - 6, line + 10, ease.inOut);
	const e1 = arrive(f, fps, line + 6, 16); // after the recording has cleared
	const e2 = arrive(f, fps, line + b(1) - 7, 16);
	const e3 = arrive(f, fps, line + b(2) - 8, 18);
	const sLand = arrive(f, fps, line + b(2) - 8, 20); // the first lines make room
	const x1 = leave(f, end - 12, 10);
	const x2 = leave(f, end - 11, 10);
	const x3 = leave(f, end - 10, 10);

	const at0 = (s: number) => start + Math.round(s * 30);
	// sheet rises at 0.5 s, closes at ~3.05 s in the recording
	const sheet = ramp(f, at0(0.45), at0(0.75), ease.inOut) * (1 - ramp(f, at0(2.95), at0(3.3), ease.inOut));
	const CROP = mixCrop(HOME, SHEET, sheet);
	const win = mixBox(HOME_WIN, CHECKIN_WIN, sheet);
	const box = mixBox(CHECKBOX, win, grow);
	const pCheck = slotPoint('photoCheckin', win, CROP, 0.25, 0.646);
	const pShutter = slotPoint('photoCheckin', win, CROP, 0.5, 0.878);
	const pConfirm = slotPoint('photoCheckin', win, CROP, 0.73, 0.885);

	return (
		<AbsoluteFill>
			{/* the check → the window */}
			{f < join + 20 && (
				<div
					style={{
						position: 'absolute',
						left: box.x,
						top: box.y,
						width: box.w,
						height: box.h,
						borderRadius: radius,
						overflow: 'hidden',
						boxShadow: `inset 0 0 0 ${mix(4, 1, grow)}px ${grow < 0.5 ? C.white : 'rgba(245,245,247,0.09)'}`,
					}}
				>
					<div style={{position: 'absolute', inset: 0, background: C.lumo, transform: `scale(${fill})`, opacity: 1 - ramp(f, join, join + 10)}} />
				</div>
			)}
			{f < join + 6 && (
				<svg
					width={CHECKBOX.w}
					height={CHECKBOX.h}
					viewBox="0 0 96 96"
					style={{position: 'absolute', left: CHECKBOX.x, top: CHECKBOX.y, opacity: 1 - ramp(f, join - 2, join + 4)}}
				>
					<path
						d="M28 50 L42 64 L69 34"
						fill="none"
						stroke={C.black}
						strokeWidth={8}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeDasharray={64}
						strokeDashoffset={64 * (1 - tick)}
					/>
				</svg>
			)}

			{/* the real Photo Check-in */}
			{videoIn > 0 && winOut < 1 && (
				<div style={{position: 'absolute', inset: 0, opacity: videoIn * (1 - winOut), transform: `translateX(${winOut * 120}px)`}}>
					<MediaSlot
						id="photoCheckin"
						clip="full"
						playhead={playhead}
						{...box}
						crop={CROP}
						radius={radius}
						style={{boxShadow: HAIRLINE, transform: `scale(${breathe})`}}
					/>
					<Tap f={f} at={at0(SRC.tapCheckIn) - 3} x={pCheck.x} y={pCheck.y} />
					<Tap f={f} at={at0(SRC.shutter) - 2} x={pShutter.x} y={pShutter.y} />
					<Tap f={f} at={at0(SRC.confirm) - 3} x={pConfirm.x} y={pConfirm.y} />
				</div>
			)}

			{/* words — never over the recording */}
			<Centre size={120} weight={600}>
				<Reveal p={ramp(f, showed, showed + 10)} out={ramp(f, work - 6, work, ease.in)} rise={30}>
					<div style={{marginTop: 300}}>You showed up.</div>
				</Reveal>
			</Centre>
			<Centre size={120} weight={600}>
				<Reveal p={ramp(f, work, work + 10)} out={ramp(f, join - 8, join, ease.in)} rise={30}>
					<div style={{marginTop: 300}}>
						You put in <span style={{color: C.lumo}}>the work.</span>
					</div>
				</Reveal>
			</Centre>
			<Headline x={200} y={430} size={104}>
				<Reveal p={ramp(f, join + 16, join + 30)} out={ramp(f, line - 10, line, ease.in)} rise={30}>
					Photo
				</Reveal>
				<Reveal p={ramp(f, join + 20, join + 34)} out={ramp(f, line - 10, line, ease.in)} rise={30}>
					check-in.
				</Reveal>
			</Headline>
			{/* the hero statement, built in three steps on the beat */}
			{f >= line && (
				<Stack style={{transform: `translateY(${mix(118, 0, sLand)}px)`}}>
					<MaskLine enter={e1} exit={x1} size={112} weight={500}>
						Every check-in
					</MaskLine>
					<MaskLine enter={e2} exit={x2} size={112} weight={500} color={C.soft}>
						means
					</MaskLine>
					<div style={{marginTop: 14}}>
						<MaskLine enter={e3} exit={x3} size={220} weight={600} color={C.lumo} travel={1.1}>
							something.
						</MaskLine>
					</div>
				</Stack>
			)}
		</AbsoluteFill>
	);
};
