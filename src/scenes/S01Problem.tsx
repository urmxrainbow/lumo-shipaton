/**
 * 01 · TENSION — two large, centred questions on pure black, then a tiny
 * #E3D290 circle that waits for the music.
 * Intro of the track: Q1 on the first beat, Q2 on the next downbeat.
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
	const q1 = at('problem', HIT.firstBeat);
	const q2 = at('problem', HIT.q2);
	const dot = at('problem', HIT.tension);
	const q1out = q2 - 12;
	const q2out = dot - 14;

	return (
		<AbsoluteFill>
			<Center>
				<Reveal p={ramp(f, q1, q1 + 26)} out={ramp(f, q1out, q1out + 10, ease.in)} rise={30}>
					Have you ever
				</Reveal>
				<Reveal p={ramp(f, q1 + 8, q1 + 34)} out={ramp(f, q1out, q1out + 10, ease.in)} rise={30}>
					set a goal…
				</Reveal>
			</Center>
			{/* the second question lands harder: shorter, firmer, on the downbeat */}
			<Center>
				<Reveal p={ramp(f, q2, q2 + 11)} out={ramp(f, q2out, q2out + 8, ease.in)} rise={48}>
					And completely
				</Reveal>
				<Reveal p={ramp(f, q2 + b(0.5), q2 + b(0.5) + 11)} out={ramp(f, q2out, q2out + 8, ease.in)} rise={48}>
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
						transform: `scale(${ramp(f, dot, dot + 10) * mix(1, 1.18, ramp(f, dot + 10, dot + b(2), ease.inOut))})`,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
