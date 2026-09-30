/**
 * 06 · LOOK BACK — the person's history (from the Photo Check-in sequence)
 * flies into the real Progress window: this is where the memories live.
 * One bar, then the frame empties into the track's break.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HAIRLINE, PROGRESS_WINDOW, RADIUS, progressTile} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';
import {HISTORY, histCell} from './S04CheckIn';

export const S05LookBack: React.FC = () => {
	const f = useCurrentFrame();
	const gather = ramp(f, 4, 30, ease.inOut);
	const winIn = ramp(f, 8, 30, ease.out);
	const bright = mix(0.32, 1, ramp(f, 0, 10));
	const out = ramp(f, 80, 90, ease.in);

	return (
		<AbsoluteFill style={{opacity: 1 - out}}>
			<MediaSlot
				id="progress"
				clip="scroll"
				playhead={f - 20}
				{...PROGRESS_WINDOW}
				radius={RADIUS}
				style={{opacity: winIn, transform: `translateY(${(1 - winIn) * 40}px)`, boxShadow: HAIRLINE}}
			/>
			{Array.from({length: HISTORY}, (_, k) => {
				const r = mixBox(histCell(k, 1), progressTile(PROGRESS_WINDOW, k), ramp(f, 4 + k * 0.6, 30 + k * 0.6, ease.inOut));
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
							opacity: bright * (1 - ramp(gather, 0.8, 1)),
						}}
					>
						<Memory i={k} w={r.w} h={r.h} bare />
					</div>
				);
			})}
			{/* "Every check-in means something." carries over and leaves */}
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
				<Reveal p={1} out={ramp(f, 0, 8, ease.in)} rise={30}>
					Every check-in
				</Reveal>
				<Reveal p={1} out={ramp(f, 0, 8, ease.in)} rise={30}>
					means something.
				</Reveal>
			</div>
			<Headline x={200} y={380} size={112}>
				<Reveal p={ramp(f, 14, 28)} rise={30}>
					Look how far
				</Reveal>
				<Reveal p={ramp(f, 18, 32)} rise={30}>
					you’ve come.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
