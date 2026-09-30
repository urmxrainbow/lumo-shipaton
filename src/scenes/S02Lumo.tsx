/**
 * 03 · THE ANSWER — a black circle opens through the #E3D290 field and the
 * reply builds on the beat: "That's why" → "I built" → "Lumo." (the largest,
 * strongest arrival). On the next downbeat the first lines lift away, a point
 * of light becomes the icon above the word, and "Lumo." itself travels,
 * settles and whitens into the "Lumo" title beside the icon — the payoff
 * becomes the product lockup; then the real product holds, beautifully.
 */
import React from 'react';
import {AbsoluteFill, Img, interpolateColors, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE, HOME_WINDOW, RADIUS} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Caption, MaskLine, Reveal, arrive, leave} from '../components/type';
import {brand} from '../lib/media';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C} from '../theme';

const LIGHT_Y = 400; // where the light blooms: above the word, where "I built" was
const WORD = {size: 150, big: 1.45, top0: 520, left1: 216 - 150 * 0.2, top1: 430}; // left1: minus the mask's side padding

export const HOME_CROP = {x: 0.5, y: 0.705, zoom: 1}; // full width, from "Today's habit" down

export const S02Lumo: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();

	// black opens through yellow
	const open = ramp(f, 0, 16, ease.inOut);
	const r = mix(0, 1110, open);

	// "That's why" → "I built" → "Lumo." on the beat
	const reveal = at('lumo', HIT.lumo);
	const e1 = arrive(f, fps, 12, 16);
	const e2 = arrive(f, fps, b(1) + 2, 16);
	const e3 = arrive(f, fps, b(2) - 5, 20);
	const x1 = leave(f, reveal - 8, 12);
	const x2 = leave(f, reveal - 6, 12);

	// the answer: light → icon → product
	const light = ramp(f, reveal, reveal + 8, ease.out);
	const bloom = ramp(f, reveal + 4, reveal + 16, ease.inOut);
	const glide = ramp(f, reveal + b(0.75), reveal + b(2), ease.inOut);
	const cx = mix(960, 292, glide);
	const cy = mix(LIGHT_Y, 330, glide);
	// "Lumo." travels with the icon into the lockup (same move, same timing)
	const m = glide;
	const size = mix(190, 128, glide);
	const rise = ramp(f, reveal + b(0.9), reveal + b(2.25), ease.out);
	const end = at('lumo', HIT.product);
	const out = ramp(f, end - b(0.5), end, ease.in);

	return (
		<AbsoluteFill style={{background: open < 1 ? C.lumo : C.black}}>
			<div
				style={{position: 'absolute', left: 960 - r, top: 540 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: C.black}}
			/>

			{/* "That's why" / "I built" — they lift away as the answer arrives */}
			<div style={{position: 'absolute', left: 0, right: 0, top: 262, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<MaskLine enter={e1} exit={x1} size={100} weight={500} color={C.soft}>
					That’s why
				</MaskLine>
				<div style={{height: 10}} />
				<MaskLine enter={e2} exit={x2} size={124} weight={500}>
					I built
				</MaskLine>
			</div>
			{/* "Lumo." — the payoff; it becomes the title */}
			<div
				style={{
					position: 'absolute',
					left: mix(960, WORD.left1, m),
					top: mix(WORD.top0, WORD.top1, m),
					transform: `translateX(${mix(-50, 0, m)}%) scale(${mix(WORD.big, 1, m)})`,
					transformOrigin: `${mix(50, 0, m)}% 0%`,
					opacity: 1 - out,
				}}
			>
				<MaskLine enter={e3} size={WORD.size} weight={600} color={interpolateColors(m, [0, 1], [C.lumo, C.white])} travel={1.1}>
					Lumo<span style={{opacity: 1 - m}}>.</span>
				</MaskLine>
			</div>

			{/* point of light → icon */}
			{f >= reveal && bloom < 1 && (
				<div
					style={{
						position: 'absolute',
						left: 954,
						top: LIGHT_Y - 6,
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
			<Caption x={222} y={615} size={34}>
				<Reveal p={ramp(f, reveal + b(1.5), reveal + b(2.5))} out={out}>
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
