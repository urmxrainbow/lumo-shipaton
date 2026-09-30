/**
 * 02 · LUMO — a point of #E3D290 light becomes the icon; the icon settles
 * beside the name; the real product rises beside it and simply holds.
 */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {HAIRLINE, HOME_WINDOW, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Caption, Headline, Reveal} from '../components/type';
import {brand} from '../lib/media';
import {ease, mix, ramp} from '../lib/anim';
import {C} from '../theme';

export const HOME_CROP = {x: 0.5, y: 0.705, zoom: 1}; // full width, from "Today's habit" down

export const S02Lumo: React.FC = () => {
	const f = useCurrentFrame();

	// light → icon
	const light = ramp(f, b(1), b(3), ease.out);
	const bloom = ramp(f, b(3.25), b(5), ease.inOut);
	const glide = ramp(f, b(8), b(10.5), ease.inOut); // icon moves to the identity column
	const cx = mix(960, 292, glide);
	const cy = mix(470, 330, glide);
	const size = mix(190, 128, glide);

	// product rises
	const rise = ramp(f, b(9), b(12), ease.out);
	const breathe = ramp(f, b(12), b(16), ease.inOut);

	const out = ramp(f, b(14.5), b(15.75), ease.in);

	return (
		<AbsoluteFill>
			{/* point of light */}
			{bloom < 1 && (
				<div
					style={{
						position: 'absolute',
						left: 960 - 6,
						top: 470 - 6,
						width: 12,
						height: 12,
						borderRadius: '50%',
						background: C.lumo,
						opacity: light * (1 - bloom),
						transform: `scale(${mix(0.2, 1, light) * mix(1, 6, bloom)})`,
						boxShadow: `0 0 ${mix(10, 60, light)}px ${mix(2, 12, light)}px rgba(227,210,144,0.35)`,
					}}
				/>
			)}
			{bloom > 0 && (
				<Img
					src={brand.icon}
					style={{
						position: 'absolute',
						left: cx - size / 2,
						top: cy - size / 2,
						width: size,
						height: size,
						opacity: bloom * (1 - out),
						transform: `scale(${mix(0.86, 1, bloom)})`,
						filter: bloom < 1 ? `blur(${(1 - bloom) * 12}px)` : undefined,
					}}
				/>
			)}

			{/* identity */}
			<Headline x={216} y={430} size={150} weight={600}>
				<Reveal p={ramp(f, b(9.5), b(12))} out={out}>
					Lumo
				</Reveal>
			</Headline>
			<Caption x={222} y={615} size={34}>
				<Reveal p={ramp(f, b(10.5), b(13))} out={out}>
					A social habit tracker.
				</Reveal>
			</Caption>

			{/* the product, floating on black — nothing else happens here */}
			<MediaSlot
				id="home"
				clip="still"
				playhead={0}
				{...HOME_WINDOW}
				crop={HOME_CROP}
				radius={RADIUS}
				style={{
					opacity: rise,
					transform: `translateY(${(1 - rise) * 60}px) scale(${mix(0.965, 1, rise) * mix(1, 1.02, breathe)})`,
					boxShadow: HAIRLINE,
				}}
			/>
		</AbsoluteFill>
	);
};
