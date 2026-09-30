/**
 * 08 · RESOLUTION — slower again. A few memories, large. "Progress you
 * can look back on." Then the memories return into Lumo: they fly into
 * the Progress window, where your progress lives.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE, PROGRESS_CENTER, RADIUS, progressTile} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PICKS = [0, 14, 29]; // Day 01, Day 15, Day 30
const CW = 460;
const CH = 575;
const GAP = 56;
const X0 = 960 - (PICKS.length * CW + (PICKS.length - 1) * GAP) / 2;
const Y = 80;
const card = (k: number): Box => ({x: X0 + k * (CW + GAP), y: Y, w: CW, h: CH});

export const S09Resolution: React.FC = () => {
	const f = useCurrentFrame();
	const end = at('resolution', HIT.endCard);
	const text = b(1.25);
	const fold = end - b(2.25);
	const gather = ramp(f, fold, fold + 26, ease.inOut);
	const winIn = ramp(f, fold - 4, fold + 20, ease.out);
	const out = ramp(f, end - 14, end, ease.in);

	return (
		<AbsoluteFill style={{opacity: 1 - out}}>
			{winIn > 0 && (
				<MediaSlot
					id="progress"
					clip="hold"
					playhead={0}
					{...PROGRESS_CENTER}
					radius={RADIUS}
					style={{opacity: winIn, transform: `translateY(${(1 - winIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
			)}
			{PICKS.map((i, k) => {
				const a = b(k * 0.6);
				const p = ramp(f, a, a + b(1));
				const r = mixBox(card(k), progressTile(PROGRESS_CENTER, k, 3), gather);
				return (
					<div
						key={i}
						style={{
							position: 'absolute',
							left: r.x,
							top: r.y,
							width: r.w,
							height: r.h,
							opacity: p * (1 - ramp(gather, 0.75, 1)),
							transform: `translateY(${(1 - p) * 24}px)`,
							borderRadius: mix(16, 10, gather),
							overflow: 'hidden',
						}}
					>
						<Memory i={i} w={r.w} h={r.h} zoom={mix(1.08, 1, ramp(f, a, fold, ease.out))} bare={gather > 0.2} />
					</div>
				);
			})}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 715,
					textAlign: 'center',
					color: C.white,
					...display(80, 500),
					lineHeight: 1.1,
				}}
			>
				<Reveal p={ramp(f, text, text + 22)} out={ramp(f, fold - 12, fold, ease.in)}>
					Progress you can
				</Reveal>
				<Reveal p={ramp(f, text + 10, text + 32)} out={ramp(f, fold - 12, fold, ease.in)}>
					look back on.
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
