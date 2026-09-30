/**
 * 05 · SHOWING UP — the captured moment becomes Day 01. One photo, then
 * another, then another: small moments accumulating, evenly spaced.
 * Then they are gathered into the Progress window.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {HAIRLINE, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory, dayOf} from '../components/Memory';
import {Reveal} from '../components/type';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, text} from '../theme';
import {CHECKIN} from './S04Capture';

/** Days shown, and which memory photo each uses. */
const DAYS = [1, 4, 9, 16, 23, 30];
export const PROGRESS_WINDOW: Box = {x: 1080, y: 50, w: 490, h: 980};

const card = (k: number): Box => ({x: 190 + k * 264, y: 360, w: 220, h: 290});
/** Landing tiles inside the Progress window (3 columns, from ~25% down). */
const tile = (k: number): Box => {
	const P = PROGRESS_WINDOW;
	const pad = 24;
	const gap = 10;
	const s = (P.w - pad * 2 - gap * 2) / 3;
	return {x: P.x + pad + (k % 3) * (s + gap), y: P.y + P.h * 0.25 + Math.floor(k / 3) * (s + gap), w: s, h: s};
};

const APPEAR = [0, b(2.25), b(3.5), b(4.5), b(5.25), b(5.75)];

export const S05ShowingUp: React.FC = () => {
	const f = useCurrentFrame();

	// the check-in window settles into Day 01
	const settle = ramp(f, 0, b(1.75), ease.inOut);
	const gather = ramp(f, b(8.5), b(10.5), ease.inOut);
	const windowIn = ramp(f, b(8.75), b(10.75), ease.out);

	return (
		<AbsoluteFill>
			{/* the Progress window arrives as the days are gathered */}
			{windowIn > 0 && (
				<MediaSlot
					id="progress"
					clip="scroll"
					playhead={0}
					{...PROGRESS_WINDOW}
					radius={RADIUS}
					style={{opacity: windowIn, transform: `translateY(${(1 - windowIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
			)}

			{DAYS.map((day, k) => {
				const at = APPEAR[k];
				if (f < at) return null;
				const p = k === 0 ? 1 : ramp(f, at, at + 22);
				let r = card(k);
				if (k === 0) r = mixBox(CHECKIN, r, settle);
				r = mixBox(r, tile(k), gather);
				const absorbed = 1 - ramp(gather, 0.7, 1);
				const cap = k === 0 ? ramp(f, b(1.5), b(2.5)) : ramp(f, at + 8, at + 28);
				return (
					<React.Fragment key={day}>
						<div
							style={{
								position: 'absolute',
								left: r.x,
								top: r.y,
								width: r.w,
								height: r.h,
								opacity: p * absorbed,
								transform: `translateY(${(1 - p) * 24}px)`,
								borderRadius: mix(k === 0 ? mix(RADIUS, 20, settle) : 20, 12, gather),
								overflow: 'hidden',
							}}
						>
							{k === 0 && settle < 1 && (
								<div style={{position: 'absolute', inset: 0, opacity: 1 - ramp(settle, 0.1, 0.6)}}>
									<MediaSlot id="photoCheckin" clip="capture" playhead={999} x={0} y={0} w={r.w} h={r.h} />
								</div>
							)}
							<div style={{opacity: k === 0 ? ramp(settle, 0.1, 0.6) : 1}}>
								<Memory i={day - 1} w={r.w} h={r.h} bare />
							</div>
						</div>
						<div
							style={{
								position: 'absolute',
								left: card(k).x,
								width: card(k).w,
								top: 680,
								textAlign: 'center',
								color: C.soft,
								...text(24, 500),
							}}
						>
							<Reveal p={cap} out={ramp(f, b(8.25), b(9.25), ease.in)} rise={12}>
								Day {dayOf(day - 1)}
							</Reveal>
						</div>
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};
