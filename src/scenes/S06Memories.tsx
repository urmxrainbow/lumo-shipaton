/**
 * 07 · THE MOMENTS — the Progress shot steps back and the real memory
 * photos arrive one at a time (the Day row of memoryManifest: each day its
 * own photo, never repeated). A clean row, precise spacing, each labelled
 * with its day. Fewer photos → a shorter row; nothing is duplicated.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {at} from '../timeline';
import {HAIRLINE} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {memoryDay} from '../lib/media';
import {memoriesFor} from '../memoryManifest';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, text} from '../theme';
import {PROGRESS_CROP, PROGRESS_RAD, PROGRESS_SHOT} from './S05Progress';

const ASPECT = 16 / 9; // the photos are portrait
type Row = {w: number; gap: number};
const ROWS: Record<number, Row> = {1: {w: 360, gap: 0}, 2: {w: 330, gap: 36}, 3: {w: 310, gap: 32}, 4: {w: 290, gap: 30}, 5: {w: 282, gap: 28}};
export const ROW_Y = 470;
export const rowCell = (n: number, k: number): Box => {
	const R = ROWS[n] ?? ROWS[5];
	const h = R.w * ASPECT;
	const total = n * R.w + (n - 1) * R.gap;
	return {x: 960 - total / 2 + k * (R.w + R.gap), y: ROW_Y - h / 2, w: R.w, h};
};

export const S06Memories: React.FC = () => {
	const f = useCurrentFrame();
	const photos = memoriesFor('dayRow').slice(0, 5);
	const N = photos.length;
	const steps = [1, 2, 4, 5].filter((n) => n <= N);
	if (N && steps[steps.length - 1] !== N) steps.push(N);
	const PH: [number, number][] = steps.map((n, i) => [n, b(i * 1.5)]);

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

	// the Progress shot steps back; the first memory rises in its place in the row
	const winOut = ramp(f, 0, 20, ease.in);
	const end = at('memories', HIT.breakDown);
	const exit = ramp(f, end - 14, end - 1, ease.in);

	return (
		<AbsoluteFill style={{opacity: 1 - exit}}>
			{winOut < 1 && (
				<MediaSlot
					id="progress"
					clip="shot"
					playhead={999}
					{...PROGRESS_SHOT}
					crop={PROGRESS_CROP}
					radius={PROGRESS_RAD}
					style={{opacity: 1 - winOut, boxShadow: HAIRLINE, transform: `scale(${mix(1, 0.96, winOut)})`}}
				/>
			)}
			{winOut < 1 && (
				<Headline x={200} y={400} size={120}>
					<Reveal p={1} out={winOut} rise={30}>
						See how far
					</Reveal>
					<Reveal p={1} out={winOut} rise={30}>
						you’ve come.
					</Reveal>
				</Headline>
			)}
			{Array.from({length: N ? cur : 0}, (_, k) => {
				const arrived = PH.find(([n]) => k < n)!;
				const idx = PH.indexOf(arrived);
				// new moments wait until the row has made room for them
				const delay = arrived[1] + 12 + (k - (PH[idx - 1]?.[0] ?? 0)) * 3;
				const appear = k === 0 ? ramp(f, 18, 34, ease.out) : ramp(f, delay, delay + 14);
				let r = k < prev ? mixBox(rowCell(prev, k), rowCell(cur, k), t) : rowCell(cur, k);
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
							<Memory name={photos[k]} w={r.w} h={r.h} />
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
								opacity: appear * ramp(f, 26, 36),
							}}
						>
							{memoryDay(photos[k])}
						</div>
					</React.Fragment>
				);
			})}
		</AbsoluteFill>
	);
};
