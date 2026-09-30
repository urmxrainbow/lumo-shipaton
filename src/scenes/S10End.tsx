/**
 * 09 · END — black, the icon, the name; the line lands on the last bar's
 * downbeat, holds through the final hit, and cuts to black the moment the
 * music resolves.
 */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {CALM, Headline, MaskLine, Reveal, arrive} from '../components/type';
import {brand} from '../lib/media';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, text} from '../theme';

const ICON = {cx: 960, cy: 340, size: 190};

export const S10End: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const lastBar = at('endCard', HIT.finalHit) - b(4);
	const cut = at('endCard', HIT.resolved);
	if (f >= cut) return null; // hard cut to black

	const icon = ramp(f, 4, 28, ease.out);
	const glow = ramp(f, 4, 60, ease.inOut);
	return (
		<AbsoluteFill>
			<div
				style={{
					position: 'absolute',
					left: ICON.cx - 260,
					top: ICON.cy - 260,
					width: 520,
					height: 520,
					borderRadius: '50%',
					background: 'radial-gradient(circle, rgba(227,210,144,0.16) 0%, rgba(227,210,144,0) 62%)',
					opacity: glow,
				}}
			/>
			<Img
				src={brand.icon}
				style={{
					position: 'absolute',
					left: ICON.cx - ICON.size / 2,
					top: ICON.cy - ICON.size / 2,
					width: ICON.size,
					height: ICON.size,
					opacity: icon,
					transform: `scale(${mix(0.94, 1, icon)})`,
					filter: icon < 1 ? `blur(${(1 - icon) * 10}px)` : undefined,
				}}
			/>
			<Headline x={0} y={478} size={112} weight={600} align="center">
				<Reveal p={ramp(f, 18, 40)}>Lumo</Reveal>
			</Headline>
			<div style={{position: 'absolute', left: 0, right: 0, top: 612, textAlign: 'center', color: C.faint, ...text(30, 500), letterSpacing: '0.04em'}}>
				<Reveal p={ramp(f, 30, 50)}>Social habit tracker</Reveal>
			</div>
			{/* calm resolution: a slow, short settle — nothing else moves */}
			<div style={{position: 'absolute', left: 0, right: 0, top: 720, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<MaskLine enter={arrive(f, fps, lastBar, 30, CALM)} size={60} travel={0.9}>
					Your progress
				</MaskLine>
				<MaskLine enter={arrive(f, fps, lastBar + 7, 30, CALM)} size={60} travel={0.9}>
					has a story.
				</MaskLine>
			</div>
		</AbsoluteFill>
	);
};
