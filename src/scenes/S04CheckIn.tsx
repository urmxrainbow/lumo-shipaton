/**
 * 05 · PHOTO CHECK-IN — the hero feature.
 *
 *  bar 1  ☐ → ✓ on the beat.   "Most habit trackers stop here."
 *  bar 2  (edit join) the checkbox compresses, becomes a photo, and the
 *         photo expands to fill the frame — we are inside the memory.
 *  bar 3  "A check-in becomes a memory."  (large, over the memory)
 *  bar 4  the memory returns into the real Photo Check-in UI: "Photo check-in."
 *  bar 5–6 every shutter in the UI adds one more memory to the person's
 *         history, faster and faster → "Every check-in means something."
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {CHECKBOX, HAIRLINE, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

/** The Photo Check-in window and where the photo sits inside its UI. */
export const CHECKIN_WIN: Box = {x: 1060, y: 60, w: 680, h: 960};
export const PHOTO_IN_UI = {x: 0.1, y: 0.13, w: 0.8, h: 0.6};
const inUI = (): Box => ({
	x: CHECKIN_WIN.x + CHECKIN_WIN.w * PHOTO_IN_UI.x,
	y: CHECKIN_WIN.y + CHECKIN_WIN.h * PHOTO_IN_UI.y,
	w: CHECKIN_WIN.w * PHOTO_IN_UI.w,
	h: CHECKIN_WIN.h * PHOTO_IN_UI.h,
});

const THUMB: Box = {x: 960 - 180, y: 470 - 225, w: 360, h: 450};
const FULL: Box = {x: 0, y: 0, w: 1920, h: 1080};

/** The person's history: a clean 4 × 4 grid (left while capturing, then centred). */
export const HIST = {cols: 4, w: 150, h: 188, gap: 14, y: 143};
export const histCell = (k: number, centred: number): Box => {
	const gw = HIST.cols * HIST.w + (HIST.cols - 1) * HIST.gap;
	const x0 = mix(150, 960 - gw / 2, centred);
	return {x: x0 + (k % HIST.cols) * (HIST.w + HIST.gap), y: HIST.y + Math.floor(k / HIST.cols) * (HIST.h + HIST.gap), w: HIST.w, h: HIST.h};
};
export const HISTORY = 16;

export const S04CheckIn: React.FC = () => {
	const f = useCurrentFrame();
	const join = at('checkin', HIT.intoMemory);
	const ui = at('checkin', HIT.checkinUI);
	const every = at('checkin', HIT.everyCheckin);

	// ——— bar 1: the checkbox ———
	const tickAt = b(1);
	const fill = ramp(f, tickAt, tickAt + 10, ease.out);
	const tick = ramp(f, tickAt + 3, tickAt + 16, ease.out);

	// ——— bar 2: checkbox → photo → full frame ———
	const squeeze = ramp(f, join, join + 6, ease.inOut) * (1 - ramp(f, join + 6, join + 12, ease.inOut));
	const toThumb = ramp(f, join + 6, join + 26, ease.inOut);
	const photoIn = ramp(f, join + 8, join + 24);
	const toFull = ramp(f, join + 40, join + 64, ease.inOut);
	const lineIn = join + 68;
	const lineOut = ui - 12;
	const dim = mix(1, 0.5, ramp(f, lineIn - 4, lineIn + 8)) / mix(1, 0.5, ramp(f, lineOut, ui));

	// ——— bar 4: back into the real Photo Check-in UI ———
	const intoUI = ramp(f, ui, ui + 24, ease.inOut);
	const winIn = ramp(f, ui + 2, ui + 22, ease.out);
	const photoGone = ramp(f, ui + 22, ui + 32);
	const capture = ui + 14;

	// ——— bars 5–6: one check-in, one memory ———
	const shots = Array.from({length: HISTORY}, (_, k) => Math.round(every + (b(4.75) * Math.pow(k / (HISTORY - 1), 0.78))));
	const winOut = ramp(f, every + b(4.9), every + b(5.6), ease.in);
	const centre = ramp(f, every + b(4.9), every + b(5.8), ease.inOut);
	const histDim = mix(1, 0.32, centre);

	// the photo box through bars 1–4
	let box = mixBox(CHECKBOX, THUMB, toThumb);
	box = mixBox(box, FULL, toFull);
	box = mixBox(box, inUI(), intoUI);
	const s = 1 - 0.18 * squeeze;
	const radius = f < join + 40 ? mix(24, 20, toThumb) : mix(mix(20, 0, toFull), 16, intoUI);

	const flash = shots.some((t) => f >= t && f < t + 3) || (f >= capture + 22 && f < capture + 25);

	return (
		<AbsoluteFill>
			{/* the real Photo Check-in UI */}
			{winIn > 0 && winOut < 1 && (
				<div style={{position: 'absolute', inset: 0, opacity: winIn * (1 - winOut), transform: `translateX(${winOut * 160}px)`}}>
					<MediaSlot
						id="photoCheckin"
						clip="capture"
						playhead={f - capture}
						{...CHECKIN_WIN}
						radius={RADIUS}
						style={{boxShadow: HAIRLINE, transform: `scale(${mix(0.96, 1, winIn)})`}}
					/>
					{flash && (
						<div style={{position: 'absolute', left: CHECKIN_WIN.x, top: CHECKIN_WIN.y, width: CHECKIN_WIN.w, height: CHECKIN_WIN.h, borderRadius: RADIUS, background: '#fff', opacity: 0.18}} />
					)}
				</div>
			)}

			{/* checkbox → photo → memory → back into the UI */}
			{photoGone < 1 && (
				<div
					style={{
						position: 'absolute',
						left: box.x,
						top: box.y,
						width: box.w,
						height: box.h,
						borderRadius: radius,
						overflow: 'hidden',
						transform: `scale(${s})`,
						boxShadow: photoIn < 1 ? `inset 0 0 0 4px ${C.white}` : undefined,
						opacity: 1 - photoGone,
					}}
				>
					<div style={{position: 'absolute', inset: 0, background: C.lumo, transform: `scale(${fill})`, borderRadius: radius, opacity: 1 - photoIn}} />
					{photoIn > 0 && (
						<div style={{position: 'absolute', inset: 0, opacity: photoIn, filter: dim < 1 ? `brightness(${dim})` : undefined}}>
							<Memory i={0} w={box.w} h={box.h} zoom={mix(1.1, 1, ramp(f, join + 40, ui, ease.out))} bare={toFull < 0.5 || intoUI > 0} />
						</div>
					)}
				</div>
			)}
			{/* the tick */}
			{f < join + 8 && (
				<svg
					width={CHECKBOX.w}
					height={CHECKBOX.h}
					viewBox="0 0 96 96"
					style={{position: 'absolute', left: CHECKBOX.x, top: CHECKBOX.y, opacity: 1 - ramp(f, join, join + 6)}}
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

			{/* the person's history grows with every shutter */}
			{shots.map((t, k) => {
				if (f < t) return null;
				const fly = ramp(f, t, t + 14, ease.out);
				const r = mixBox(mixBox(inUI(), histCell(k, 0), fly), histCell(k, 1), centre);
				return (
					<div
						key={k}
						style={{
							position: 'absolute',
							left: r.x,
							top: r.y,
							width: r.w,
							height: r.h,
							borderRadius: 12,
							overflow: 'hidden',
							opacity: histDim,
						}}
					>
						<Memory i={k} w={r.w} h={r.h} bare />
					</div>
				);
			})}

			{/* ——— words ——— */}
			<div style={{position: 'absolute', left: 0, right: 0, top: 570, textAlign: 'center', color: C.soft, ...display(64, 500), lineHeight: 1.12}}>
				<Reveal p={ramp(f, b(2), b(2) + 12)} out={ramp(f, join - 10, join - 2, ease.in)} rise={18}>
					Most habit trackers
				</Reveal>
				<Reveal p={ramp(f, b(2) + 4, b(2) + 16)} out={ramp(f, join - 10, join - 2, ease.in)} rise={18}>
					stop here.
				</Reveal>
			</div>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.white,
					...display(150, 600),
					lineHeight: 1.06,
				}}
			>
				<Reveal p={ramp(f, lineIn, lineIn + 12)} out={ramp(f, lineOut, lineOut + 8, ease.in)} rise={34}>
					A check-in
				</Reveal>
				<Reveal p={ramp(f, lineIn + 5, lineIn + 17)} out={ramp(f, lineOut, lineOut + 8, ease.in)} rise={34}>
					becomes a <span style={{color: C.lumo}}>memory.</span>
				</Reveal>
			</div>
			<Headline x={200} y={430} size={120}>
				<Reveal p={ramp(f, ui + 10, ui + 24)} out={ramp(f, every - 8, every, ease.in)} rise={30}>
					Photo check-in.
				</Reveal>
			</Headline>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.white,
					...display(130, 600),
					lineHeight: 1.06,
				}}
			>
				<Reveal p={ramp(f, every + b(5.2), every + b(5.2) + 12)} rise={30}>
					Every check-in
				</Reveal>
				<Reveal p={ramp(f, every + b(5.2) + 5, every + b(5.2) + 17)} rise={30}>
					means something.
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
