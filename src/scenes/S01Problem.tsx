/** 01 · THE PROBLEM — black, space, two quiet questions. */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Headline, Reveal} from '../components/type';
import {ease, ramp} from '../lib/anim';

const X = 220;
const Y = 400;
const SIZE = 104;

export const S01Problem: React.FC = () => {
	const f = useCurrentFrame();
	const q1 = b(1.5);
	const q1out = b(7.5);
	const q2 = b(9);
	const q2out = b(14);
	return (
		<AbsoluteFill>
			<Headline x={X} y={Y} size={SIZE}>
				<Reveal p={ramp(f, q1, q1 + 36)} out={ramp(f, q1out, q1out + 16, ease.in)}>
					Have you ever
				</Reveal>
				<Reveal p={ramp(f, q1 + 14, q1 + 50)} out={ramp(f, q1out, q1out + 16, ease.in)}>
					set a goal…
				</Reveal>
			</Headline>
			<Headline x={X} y={Y} size={SIZE}>
				<Reveal p={ramp(f, q2, q2 + 36)} out={ramp(f, q2out, q2out + 16, ease.in)}>
					and forgotten
				</Reveal>
				<Reveal p={ramp(f, q2 + 14, q2 + 50)} out={ramp(f, q2out, q2out + 16, ease.in)}>
					about it?
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
