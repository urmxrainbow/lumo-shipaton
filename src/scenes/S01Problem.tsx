/**
 * 01 · TENSION — two large, centred questions on pure black, then a tiny
 * #E3D290 circle that waits for the music.
 * Q1 lands with the music's first downbeat; Q2 pushes it out one beat and
 * a half later — a fast hook.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {Reveal} from '../components/type';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

export const TENSION_R = 10;

const Center: React.FC<{children: React.ReactNode}> = ({children}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			color: C.white,
			...display(150, 500),
			lineHeight: 1.06,
		}}
	>
		{children}
	</div>
);

export const S01Problem: React.FC = () => {
	const f = useCurrentFrame();
	const q2 = at('problem', HIT.q2);
	const dot = at('problem', HIT.tension);
	// a hook, not a title sequence: Q1 is on screen within a quarter second,
	// Q2 pushes it up and out on the beat, then the frame empties for the dot
	const push = ramp(f, q2 - 3, q2 + 4, ease.in); // Q1 leaves upward…
	const q2out = ramp(f, dot - 9, dot - 1, ease.in);

	return (
		<AbsoluteFill>
			<Center>
				<Reveal p={ramp(f, 2, 12)} out={push} rise={90}>
					Have you ever
				</Reveal>
				<Reveal p={ramp(f, 5, 15)} out={push} rise={90}>
					set a goal…
				</Reveal>
			</Center>
			<Center>
				<Reveal p={ramp(f, q2 + 3, q2 + 12)} out={q2out} rise={70}>
					And completely
				</Reveal>
				<Reveal p={ramp(f, q2 + 6, q2 + 15)} out={q2out} rise={70}>
					forgotten about it?
				</Reveal>
			</Center>
			{/* tension: an almost insignificant point of #E3D290 */}
			{f >= dot && (
				<div
					style={{
						position: 'absolute',
						left: 960 - TENSION_R,
						top: 540 - TENSION_R,
						width: TENSION_R * 2,
						height: TENSION_R * 2,
						borderRadius: '50%',
						background: C.lumo,
						transform: `scale(${ramp(f, dot, dot + 8) * mix(1, 1.18, ramp(f, dot + 8, dot + b(1), ease.inOut))})`,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
