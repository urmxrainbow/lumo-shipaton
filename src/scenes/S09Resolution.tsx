/** 09 · RESOLUTION — a few memories, slower now. Pride, not pressure. */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Memory} from '../components/Memory';
import {Headline, Reveal} from '../components/type';
import {ease, mix, ramp} from '../lib/anim';

const PICKS = [0, 14, 29]; // Day 01, Day 15, Day 30
const W = 380;
const H = 480;
const GAP = 56;
const X0 = 960 - (PICKS.length * W + (PICKS.length - 1) * GAP) / 2;
const Y = 130;

export const S09Resolution: React.FC = () => {
	const f = useCurrentFrame();
	const out = ramp(f, b(10.75), b(11.9), ease.in);
	return (
		<AbsoluteFill style={{opacity: 1 - out}}>
			{PICKS.map((i, k) => {
				const at = b(0.5 + k * 1.75);
				const p = ramp(f, at, at + b(2.25));
				return (
					<div
						key={i}
						style={{position: 'absolute', left: X0 + k * (W + GAP), top: Y, opacity: p, transform: `translateY(${(1 - p) * 20}px)`}}
					>
						<Memory i={i} w={W} h={H} radius={14} zoom={mix(1.08, 1, ramp(f, at, b(12), ease.out))} />
					</div>
				);
			})}
			<Headline x={0} y={690} size={72} align="center">
				<Reveal p={ramp(f, b(5.5), b(7.5))}>Progress you can</Reveal>
				<Reveal p={ramp(f, b(6), b(8))}>look back on.</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
