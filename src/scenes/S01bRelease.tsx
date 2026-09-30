/**
 * 02 · RELEASE — the tiny circle expands through the frame on the pickup
 * and the whole world is #E3D290 on the downbeat. "Yeah. Me too."
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {Reveal} from '../components/type';
import {at} from '../timeline';
import {Easing} from 'remotion';
import {mix, ramp} from '../lib/anim';
import {C, display} from '../theme';
import {TENSION_R} from './S01Problem';

// one controlled motion: a breath in, then a long accelerating push that
// reaches the frame edges exactly on the downbeat
const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);
const COVER = 1110; // radius that covers 1920×1080 from the centre

export const S01bRelease: React.FC = () => {
	const f = useCurrentFrame();
	const land = at('release', HIT.release);
	const grow = ramp(f, 0, land, PUSH);
	const r = mix(TENSION_R * 1.18, COVER, grow);
	const yeah = land;
	const meToo = land + b(1.5);
	const out = at('release', HIT.backToBlack) - 8;

	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					left: 960 - r,
					top: 540 - r,
					width: r * 2,
					height: r * 2,
					borderRadius: '50%',
					background: C.lumo,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.black,
					...display(150, 600),
					lineHeight: 1.06,
				}}
			>
				<Reveal p={ramp(f, yeah, yeah + 9)} out={ramp(f, out, out + 7)} rise={34}>
					Yeah.
				</Reveal>
				<Reveal p={ramp(f, meToo, meToo + 9)} out={ramp(f, out, out + 7)} rise={34}>
					Me too.
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
