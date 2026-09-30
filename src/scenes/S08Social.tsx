/**
 * 07 · CONNECTION — the track drops to near-silence: "But progress feels
 * better together." The warm bridge carries one person's progress, then
 * another's joins; two lines grow toward each other and meet in a single
 * #E3D290 point. On the biggest hit of the track: "Grow together."
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot} from '../components/MediaSlot';
import {Caption, Reveal, MaskLine, Stack, arrive, leave} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

const W = 520;
const H = 560;
const Y = 200;
const SOLO: Box = {x: 960 - W / 2, y: Y, w: W, h: H};
const A: Box = {x: 380, y: Y, w: W, h: H};
const B: Box = {x: 1020, y: Y, w: W, h: H};
// both real screens framed from "Today's habit" down (their stats cards are never shown)
const CROP_A: Crop = {x: 0.5, y: 0.65, zoom: 1}; // full width, 40–90 %
const CROP_B: Crop = {x: 0.5, y: 0.69, zoom: 1}; // full width, 38–100 %
const RAD = 48;
const LINE_Y = Y + H / 2;
const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const bridge = at('social', HIT.bridge);
	const dip = at('social', HIT.dip);
	const grow = at('social', HIT.grow);
	const end = at('social', HIT.resolution);

	// "And there's more": the line rises in and opens up (tracking widens as it settles)
	const l1 = arrive(f, fps, 2, 16);
	const l2 = arrive(f, fps, 9, 18);
	const lineOut = leave(f, bridge + b(1), 11);
	const track = (e: number) => `${mix(-0.06, -0.035, e)}em`;

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

	// into the hit: the meeting point expands through the frame, ABOVE all
	// outgoing content, and the frame is solid #E3D290 exactly on the hit
	const expand = ramp(f, grow - b(1.1), grow, PUSH);
	const dotR = mix(11, 1180, expand);
	const g1 = arrive(f, fps, grow + 1, 20, {damping: 200, stiffness: 100, mass: 0.9});
	const g2 = arrive(f, fps, grow + 6, 22, {damping: 200, stiffness: 100, mass: 0.9});
	const liftUp = ramp(f, grow, grow + 40, ease.out);
	// then black closes back in from the centre, ready for the resolution
	const back = ramp(f, end - 18, end - 2, ease.inOut);

	const leftEdge = A.x + A.w;
	const rightEdge = B.x;
	const half = (rightEdge - leftEdge) / 2;

	return (
		<AbsoluteFill>
			<Stack>
				<MaskLine enter={l1} exit={lineOut} size={120} style={{letterSpacing: track(l1)}}>
					But progress
				</MaskLine>
				<MaskLine enter={l2} exit={lineOut} size={120} style={{letterSpacing: track(l2)}}>
					feels better together.
				</MaskLine>
			</Stack>

			<div style={{position: 'absolute', inset: 0}}>
				<MediaSlot
					id="sharedGoalA"
					crop={CROP_A}
					clip="view"
					playhead={f - bridge - b(1.25)}
					{...aBox}
					radius={RAD}
					style={{opacity: aIn, transform: `translateY(${(1 - aIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
				{bIn > 0 && (
					<MediaSlot
						id="sharedGoalB"
						crop={CROP_B}
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
						Shared habit
					</Reveal>
				</Caption>
			</div>

			{/* the meeting point — it becomes the whole frame on the hit */}
			{meet > 0 && f < grow + 2 && (
				<div
					style={{
						position: 'absolute',
						left: 960 - dotR,
						top: LINE_Y - dotR,
						width: dotR * 2,
						height: dotR * 2,
						borderRadius: '50%',
						background: C.lumo,
						transform: `scale(${expand > 0 ? 1 : meet})`,
					}}
				/>
			)}
			{f >= grow && (
				<AbsoluteFill style={{background: C.lumo}}>
					{/* an emotional lift: longer travel, and the whole phrase rises as it lands */}
					<Stack style={{transform: `translateY(${mix(34, 0, liftUp)}px)`}}>
						<MaskLine enter={g1} size={170} weight={600} color={C.black} travel={1.45}>
							Grow
						</MaskLine>
						<MaskLine enter={g2} size={170} weight={600} color={C.black} travel={1.45}>
							together.
						</MaskLine>
					</Stack>
					<div
						style={{position: 'absolute', left: 960 - back * 1110, top: 540 - back * 1110, width: back * 2220, height: back * 2220, borderRadius: '50%', background: C.black}}
					/>
				</AbsoluteFill>
			)}
		</AbsoluteFill>
	);
};
