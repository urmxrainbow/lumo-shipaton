/**
 * 07 · THE MOMENTS — the real memory photos come out of the photo
 * calendar, one at a time: 1 → 2 → 4 → all five. A clean row, precise
 * spacing, each labelled with its day. No flashing, no collage.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {at} from '../timeline';
import {HAIRLINE} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {memoryCount, memoryDay} from '../lib/media';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, text} from '../theme';
import {PROGRESS_RAD, PROGRESS_SHOT, progressCrop} from './S05Progress';

const ASPECT = 16 / 9; // the photos are portrait
type Row = {w: number; gap: number};
const ROWS: Record<number, Row> = {1: {w: 360, gap: 0}, 2: {w: 330, gap: 36}, 4: {w: 290, gap: 30}, 5: {w: 282, gap: 28}};
export const ROW_Y = 470;
export const rowCell = (n: number, k: number): Box => {
	const R = ROWS[n] ?? ROWS[5];
	const h = R.w * ASPECT;
	const total = n * R.w + (n - 1) * R.gap;
	return {x: 960 - total / 2 + k * (R.w + R.gap), y: ROW_Y - h / 2, w: R.w, h};
};

export const S06Memories: React.FC = () => {
	const f = useCurrentFrame();
	const N = Math.min(5, Math.max(1, memoryCount('a')));
	const PH: [number, number][] = ([
		[1, 0],
		[2, b(1.5)],
		[4, b(3)],
		[5, b(4.5)],
	] as [number, number][]).filter(([n]) => n <= N);

	let cur = 1;
	let prev = 1;
	let t = 1;
	PH.forEach(([n, at], i) => {
		if (f >= at) {
			prev = i > 0 ? PH[i - 1][0] : 1;
			cur = n;
			t = ramp(f, at, at + 16, ease.inOut);
		}
	});

	// the first memory comes out of the photo calendar
	const out = ramp(f, 0, 22, ease.inOut);
	const winOut = ramp(f, 6, 24, ease.in);
	const from: Box = {x: PROGRESS_SHOT.x + 190, y: PROGRESS_SHOT.y + 420, w: 110, h: 110 * ASPECT};
	const end = at('memories', HIT.breakDown);
	const exit = ramp(f, end - 14, end - 1, ease.in);

	return (
		<AbsoluteFill style={{opacity: 1 - exit}}>
			{winOut < 1 && (
				<MediaSlot
					id="progress"
					clip="hold"
					playhead={0}
					{...PROGRESS_SHOT}
					crop={progressCrop(999)}
					radius={PROGRESS_RAD}
					style={{opacity: 1 - winOut, boxShadow: HAIRLINE, transform: `scale(${mix(1, 0.96, winOut)})`}}
				/>
			)}
			{winOut < 1 && (
				<Headline x={200} y={420} size={120}>
					<Reveal p={1} out={winOut} rise={30}>
						Look back.
					</Reveal>
				</Headline>
			)}
			{Array.from({length: cur}, (_, k) => {
				const arrived = PH.find(([n]) => k < n)!;
				const idx = PH.indexOf(arrived);
				// new moments wait until the row has made room for them
				const delay = arrived[1] + 12 + (k - (PH[idx - 1]?.[0] ?? 0)) * 3;
				const appear = k === 0 ? 1 : ramp(f, delay, delay + 14);
				let r = k < prev ? mixBox(rowCell(prev, k), rowCell(cur, k), t) : rowCell(cur, k);
				if (k === 0 && out < 1) r = mixBox(from, rowCell(1, 0), out);
				return (
					<React.Fragment key={k}>
						<div
							style={{
								position: 'absolute',
								left: r.x,
								top: r.y,
								width: r.w,
								height: r.h,
								borderRadius: 16,
								overflow: 'hidden',
								opacity: appear,
								transform: `translateY(${(1 - appear) * 18}px)`,
							}}
						>
							<Memory i={k} w={r.w} h={r.h} />
						</div>
						<div
							style={{
								position: 'absolute',
								left: r.x,
								width: r.w,
								top: r.y + r.h + 18,
								textAlign: 'center',
								color: C.soft,
								...text(24, 500),
								opacity: appear * ramp(f, 16, 26),
							}}
						>
							{memoryDay('a', k)}
						</div>
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};
