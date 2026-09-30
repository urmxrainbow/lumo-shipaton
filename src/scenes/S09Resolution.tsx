/**
 * 08 · RESOLUTION — slower again. The strongest memories, held back until
 * now (memoryManifest 'ending'), large. "Progress you can look back on."
 * They breathe, then the frame empties into the end card. (progress.jpg is
 * not shown here: it appears only once, in the Progress scene.)
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {memoriesFor} from '../memoryManifest';
import {Memory} from '../components/Memory';
import {Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PICKS = memoriesFor('ending').slice(0, 3);
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
	const out = ramp(f, end - 14, end, ease.in);

	return (
		<AbsoluteFill style={{opacity: 1 - out}}>
			{PICKS.map((name, k) => {
				const a = b(k * 0.6);
				const p = ramp(f, a, a + b(1));
				const r = card(k);
				return (
					<div
						key={name}
						style={{
							position: 'absolute',
							left: r.x,
							top: r.y,
							width: r.w,
							height: r.h,
							opacity: p,
							transform: `translateY(${(1 - p) * 24}px)`,
							borderRadius: 16,
							overflow: 'hidden',
						}}
					>
						<Memory name={name} w={r.w} h={r.h} zoom={mix(1.08, 1, ramp(f, a, end, ease.out))} />
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
				<Reveal p={ramp(f, text, text + 22)} out={out}>
					Progress you can
				</Reveal>
				<Reveal p={ramp(f, text + 10, text + 32)} out={out}>
					look back on.
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
