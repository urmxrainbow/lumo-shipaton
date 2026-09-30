/** S01 · THE NUMBER — black, one dot, one number. Almost too simple. */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Dot} from '../components/geo';
import {NUM, NumberComposition} from '../components/NumberComposition';
import {ease, mix, pop, ramp} from '../lib/anim';

export const S01Opening: React.FC = () => {
	const f = useCurrentFrame();
	const cy = NUM.top + NUM.size * 0.43;

	// dot: appear (tiny) → snap larger → swell into a disc → becomes the 30
	const appear = pop(f, b(0.5));
	const grow = pop(f, b(2));
	const swell = ramp(f, b(3), b(3) + 7, ease.in);
	const turn = b(3) + 7; // the disc becomes the number here
	const r = mix(mix(0, 7, appear), 24, grow) + swell * 230;

	const numPop = pop(f, turn, {stiff: 420, damp: 22});
	const numScale = mix(1.08, 1, numPop);

	return (
		<AbsoluteFill>
			{f < turn && <Dot x={NUM.cx} y={cy} r={r} />}
			{f >= turn && (
				<NumberComposition
					numScale={numScale}
					label={ramp(f, b(4.25), b(4.25) + 8)}
					rule={ramp(f, b(4.5), b(4.5) + 12)}
				/>
			)}
		</AbsoluteFill>
	);
};
