/**
 * 08 · SOCIAL — My progress → Your progress → Our goal.
 * Two real Shared Goal views, calmly side by side, joined by one line.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {HAIRLINE} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Caption, Headline, Reveal} from '../components/type';
import {Box, ease, ramp} from '../lib/anim';
import {C} from '../theme';

const A: Box = {x: 470, y: 70, w: 420, h: 800};
const B: Box = {x: 1030, y: 70, w: 420, h: 800};
const RAD = 48;

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();

	const better = ramp(f, b(1), b(3.5));
	const betterOut = ramp(f, b(5), b(6), ease.in);
	const aIn = ramp(f, b(6), b(8.5));
	const bIn = ramp(f, b(8.25), b(10.75));
	const capsOut = ramp(f, b(11), b(11.75), ease.in);
	const link = ramp(f, b(11.5), b(13.25), ease.inOut);
	const ours = ramp(f, b(12.5), b(14.5));
	const groupOut = ramp(f, b(14.25), b(15.25), ease.in);
	const grow = ramp(f, b(15.5), b(18));

	const cx = (A.x + A.w / 2 + B.x + B.w / 2) / 2;
	const half = ((B.x + B.w / 2 - (A.x + A.w / 2)) / 2) * link;

	return (
		<AbsoluteFill>
			<Headline x={0} y={440} size={120} align="center">
				<Reveal p={better} out={betterOut}>
					Better together.
				</Reveal>
			</Headline>

			<div style={{position: 'absolute', inset: 0, opacity: 1 - groupOut}}>
				<MediaSlot
					id="sharedGoalA"
					clip="view"
					playhead={f - b(6)}
					{...A}
					radius={RAD}
					style={{opacity: aIn, transform: `translateY(${(1 - aIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
				<MediaSlot
					id="sharedGoalB"
					clip="view"
					playhead={f - b(8.25)}
					{...B}
					radius={RAD}
					style={{opacity: bIn, transform: `translateY(${(1 - bIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
				<div style={{position: 'absolute', left: A.x, width: A.w, top: 905, textAlign: 'center'}}>
					<Caption x={0} y={0} size={28} align="center">
						<Reveal p={ramp(f, b(7.5), b(9.5))} out={capsOut} rise={10}>
							My progress
						</Reveal>
					</Caption>
				</div>
				<div style={{position: 'absolute', left: B.x, width: B.w, top: 905, textAlign: 'center'}}>
					<Caption x={0} y={0} size={28} align="center">
						<Reveal p={ramp(f, b(9.75), b(11.75))} out={capsOut} rise={10}>
							Your progress
						</Reveal>
					</Caption>
				</div>
				{/* one meaningful line: two progress windows, one goal */}
				{link > 0 && (
					<div style={{position: 'absolute', left: cx - half, top: 922, width: half * 2, height: 2, background: C.lumo}} />
				)}
				<Caption x={0} y={950} size={28} align="center" color={C.lumo}>
					<Reveal p={ours} rise={10}>
						Our goal
					</Reveal>
				</Caption>
			</div>

			<Headline x={0} y={440} size={120} align="center">
				<Reveal p={grow}>Grow together.</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
