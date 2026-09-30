/**
 * 07 · CONNECTION — the track drops to near-silence: "But progress feels
 * better together." The warm bridge carries one person's progress, then
 * another's joins; two lines grow toward each other and meet in a single
 * #E3D290 point. On the biggest hit of the track: "Grow together."
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Caption, Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

const W = 420;
const H = 800;
const Y = 90;
const SOLO: Box = {x: 960 - W / 2, y: Y, w: W, h: H};
const A: Box = {x: 470, y: Y, w: W, h: H};
const B: Box = {x: 1030, y: Y, w: W, h: H};
const RAD = 48;
const LINE_Y = Y + H / 2;

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();
	const bridge = at('social', HIT.bridge);
	const dip = at('social', HIT.dip);
	const grow = at('social', HIT.grow);
	const end = at('social', HIT.resolution);

	// words in the silence
	const line = ramp(f, 2, 16);
	const lineOut = ramp(f, bridge + b(1), bridge + b(1) + 10, ease.in);

	// person A, then B joins
	const aIn = ramp(f, bridge + b(1.25), bridge + b(2.75), ease.out);
	const join = ramp(f, bridge + b(5), bridge + b(6.5), ease.inOut);
	const aBox = mixBox(SOLO, A, join);
	const bIn = ramp(f, bridge + b(5.25), bridge + b(6.75), ease.out);
	const bBox = {...B, x: mix(B.x + 220, B.x, bIn)};

	// they connect
	const reach = ramp(f, bridge + b(8.5), bridge + b(10.5), ease.inOut);
	const meet = ramp(f, bridge + b(10.25), bridge + b(10.25) + 10, ease.out);
	const capsOut = ramp(f, bridge + b(8), bridge + b(8.5), ease.in);

	// into the hit
	const part = ramp(f, grow - b(1.25), grow - b(0.25), ease.inOut);
	const dotY = mix(LINE_Y, 360, part);
	const growIn = ramp(f, grow, grow + 12);
	const out = ramp(f, end - 10, end, ease.in);

	const leftEdge = A.x + A.w;
	const rightEdge = B.x;
	const half = (rightEdge - leftEdge) / 2;

	return (
		<AbsoluteFill style={{opacity: 1 - out}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.white,
					...display(120, 500),
					lineHeight: 1.08,
				}}
			>
				<Reveal p={line} out={lineOut} rise={24}>
					But progress
				</Reveal>
				<Reveal p={ramp(f, 10, 24)} out={lineOut} rise={24}>
					feels better together.
				</Reveal>
			</div>

			<div style={{position: 'absolute', inset: 0, opacity: 1 - part, transform: `scale(${mix(1, 0.96, part)})`}}>
				<MediaSlot
					id="sharedGoalA"
					clip="view"
					playhead={f - bridge - b(1.25)}
					{...aBox}
					radius={RAD}
					style={{opacity: aIn, transform: `translateY(${(1 - aIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
				{bIn > 0 && (
					<MediaSlot
						id="sharedGoalB"
						clip="view"
						playhead={f - bridge - b(5.25)}
						{...bBox}
						radius={RAD}
						style={{opacity: bIn, boxShadow: HAIRLINE}}
					/>
				)}
				<div style={{position: 'absolute', left: aBox.x, width: aBox.w, top: Y + H + 30}}>
					<Caption x={0} y={0} size={28} align="center">
						<Reveal p={ramp(f, bridge + b(2), bridge + b(3))} out={capsOut} rise={10}>
							My progress
						</Reveal>
					</Caption>
				</div>
				<div style={{position: 'absolute', left: bBox.x, width: bBox.w, top: Y + H + 30}}>
					<Caption x={0} y={0} size={28} align="center">
						<Reveal p={ramp(f, bridge + b(6), bridge + b(7))} out={capsOut} rise={10}>
							Your progress
						</Reveal>
					</Caption>
				</div>
				{/* two lines reach for each other and meet */}
				{reach > 0 && (
					<>
						<div style={{position: 'absolute', left: leftEdge, top: LINE_Y - 1, width: half * reach, height: 2, background: C.lumo}} />
						<div style={{position: 'absolute', left: rightEdge - half * reach, top: LINE_Y - 1, width: half * reach, height: 2, background: C.lumo}} />
					</>
				)}
				<Caption x={0} y={Y + H + 30} size={28} align="center" color={C.lumo}>
					<Reveal p={ramp(f, bridge + b(10.5), bridge + b(11.5))} rise={10}>
						Our goal
					</Reveal>
				</Caption>
			</div>

			{/* the meeting point — one #E3D290 dot that carries into the hit */}
			{meet > 0 && (
				<div
					style={{
						position: 'absolute',
						left: 960 - 11,
						top: dotY - 11,
						width: 22,
						height: 22,
						borderRadius: '50%',
						background: C.lumo,
						transform: `scale(${meet * mix(1, 1.35, ramp(f, grow, grow + 6)) * mix(1, 1 / 1.35, ramp(f, grow + 6, grow + 20))})`,
					}}
				/>
			)}
			<div
				style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', color: C.white, ...display(140, 500)}}
			>
				<Reveal p={growIn} rise={30}>
					Grow together.
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
