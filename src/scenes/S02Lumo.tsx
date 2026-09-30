/**
 * 03 · THE ANSWER — a black circle opens through the #E3D290 field,
 * "That's why I built Lumo." On the next downbeat Lumo itself appears:
 * a point of light becomes the icon, and the real product holds, beautifully.
 */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE, HOME_WINDOW, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Caption, Headline, Reveal} from '../components/type';
import {brand} from '../lib/media';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

export const HOME_CROP = {x: 0.5, y: 0.705, zoom: 1}; // full width, from "Today's habit" down

export const S02Lumo: React.FC = () => {
	const f = useCurrentFrame();

	// black opens through yellow
	const open = ramp(f, 0, 16, ease.inOut);
	const r = mix(0, 1110, open);

	// "That's why I built Lumo."
	const why = 16;
	const reveal = at('lumo', HIT.lumo);
	const whyOut = ramp(f, reveal - 10, reveal, ease.in);

	// the answer: light → icon → product
	const light = ramp(f, reveal, reveal + 8, ease.out);
	const bloom = ramp(f, reveal + 6, reveal + 20, ease.inOut);
	const glide = ramp(f, reveal + b(1.5), reveal + b(3), ease.inOut);
	const cx = mix(960, 292, glide);
	const cy = mix(470, 330, glide);
	const size = mix(190, 128, glide);
	const rise = ramp(f, reveal + b(1.75), reveal + b(3.5), ease.out);
	const end = at('lumo', HIT.product);
	const out = ramp(f, end - b(0.75), end, ease.in);

	return (
		<AbsoluteFill style={{background: open < 1 ? C.lumo : C.black}}>
			<div
				style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: C.black}}
			/>

			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.white,
					...display(130, 500),
					lineHeight: 1.08,
				}}
			>
				<Reveal p={ramp(f, why, why + 16)} out={whyOut} rise={26}>
					That’s why
				</Reveal>
				<Reveal p={ramp(f, why + 8, why + 24)} out={whyOut} rise={26}>
					I built <span style={{color: C.lumo}}>Lumo.</span>
				</Reveal>
			</div>

			{/* point of light → icon */}
			{f >= reveal && bloom < 1 && (
				<div
					style={{
						position: 'absolute',
						left: 954,
						top: 464,
						width: 12,
						height: 12,
						borderRadius: '50%',
						background: C.lumo,
						opacity: light * (1 - bloom),
						transform: `scale(${mix(0.3, 1, light) * mix(1, 7, bloom)})`,
						boxShadow: '0 0 50px 10px rgba(227,210,144,0.35)',
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
			<Headline x={216} y={430} size={150} weight={600}>
				<Reveal p={ramp(f, reveal + b(2), reveal + b(3.5))} out={out}>
					Lumo
				</Reveal>
			</Headline>
			<Caption x={222} y={615} size={34}>
				<Reveal p={ramp(f, reveal + b(2.75), reveal + b(4.25))} out={out}>
					A social habit tracker.
				</Reveal>
			</Caption>

			{/* the product beauty moment — nothing else moves */}
			<MediaSlot
				id="home"
				clip="still"
				playhead={0}
				{...HOME_WINDOW}
				crop={HOME_CROP}
				radius={RADIUS}
				style={{
					opacity: rise,
					transform: `translateY(${(1 - rise) * 60}px) scale(${mix(0.965, 1, rise)})`,
					boxShadow: HAIRLINE,
				}}
			/>
		</AbsoluteFill>
	);
};
