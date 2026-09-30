/**
 * 06 · VISUAL PROGRESS — one of the largest product shots. The UI is the
 * design: nothing covers it.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {HAIRLINE, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Headline, Reveal} from '../components/type';
import {ease, mix, ramp} from '../lib/anim';
import {PROGRESS_WINDOW} from './S05ShowingUp';

export const S06Progress: React.FC = () => {
	const f = useCurrentFrame();
	const drift = ramp(f, 0, b(16), ease.inOut);
	const textOut = ramp(f, b(12.5), b(13.5), ease.in);
	const out = ramp(f, b(14), b(15.75), ease.in);
	return (
		<AbsoluteFill>
			<MediaSlot
				id="progress"
				clip="scroll"
				playhead={f - 8}
				{...PROGRESS_WINDOW}
				radius={RADIUS}
				style={{opacity: 1 - out, transform: `scale(${mix(1, 1.025, drift)})`, boxShadow: HAIRLINE}}
			/>
			<Headline x={200} y={360} size={104}>
				<Reveal p={ramp(f, b(1.5), b(4))} out={textOut}>
					Look how far
				</Reveal>
				<Reveal p={ramp(f, b(2.25), b(4.75))} out={textOut}>
					you’ve come.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
