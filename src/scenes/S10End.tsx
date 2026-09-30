/** 10 · END — black, the icon, the name, one line. Hold. Hard cut. */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Headline, Reveal} from '../components/type';
import {brand} from '../lib/media';
import {ease, mix, ramp} from '../lib/anim';
import {C} from '../theme';

const ICON = {cx: 960, cy: 340, size: 190};

export const S10End: React.FC = () => {
	const f = useCurrentFrame();
	const icon = ramp(f, b(1), b(3.5), ease.out);
	const glow = ramp(f, b(1), b(5), ease.inOut);
	return (
		<AbsoluteFill>
			{/* a very quiet #E3D290 presence behind the icon */}
			<div
				style={{
					position: 'absolute',
					left: ICON.cx - 260,
					top: ICON.cy - 260,
					width: 520,
					height: 520,
					borderRadius: '50%',
					background: `radial-gradient(circle, rgba(227,210,144,0.16) 0%, rgba(227,210,144,0) 62%)`,
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
				<Reveal p={ramp(f, b(3), b(5.5))}>Lumo</Reveal>
			</Headline>
			<Headline x={0} y={690} size={54} align="center" color={C.soft}>
				<Reveal p={ramp(f, b(5.5), b(8))}>Your progress</Reveal>
				<Reveal p={ramp(f, b(6), b(8.5))}>has a story.</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
