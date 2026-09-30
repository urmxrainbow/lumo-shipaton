/**
 * 09 · SHARED HABIT — "I was doing this alone. Now someone I care about is here too."
 *
 *  bar 26  ONE PERSON. One real Lumo view (shared-goal-a.mp4), large; the
 *          camera pushes toward the habit that carries the shared (👥) mark.
 *   beat 3 SHARE: one #E3D290 pulse from that exact habit node.
 *  bar 27  SOMEONE JOINS: the second person's Lumo (shared-goal-b.jpg) opens
 *          OUT OF that point through a circular mask, offset and in front;
 *          the camera hands emphasis from A to B. A small #E3D290 point now
 *          sits between them — the same habit, two people; it pulses once
 *          more on the beat (both showing up), then the camera pushes
 *          through it into black.
 *  bars    "Share a habit / with your" — and on each of the 8 crisp high
 *  28–29   accents ONLY the last word changes, huge, reel-style in one slot:
 *          friend. mom. dad. partner. sister. brother. best friend.
 *          someone / you love. (the last one holds, into the breath)
 *  breath  the quiet pre-drop bar: everything clears; a small #E3D290 circle.
 *  hit     it expands through the frame on the final lift: "Grow / together."
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot, mixCrop, slotPoint} from '../components/MediaSlot';
import {MaskLine, Stack, arrive, leave} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);

// ——— the real product ———
/** Person A's view: large, centred to begin with. */
const A0: Box = {x: 640, y: 40, w: 640, h: 1000};
/** …then it steps back and to the left as B arrives (depth, not a split screen). */
const A1: Box = {x: 330, y: 170, w: 500, h: 790};
/** Person B's view: in front, overlapping A — related in space, not a split screen. */
const B1: Box = {x: 760, y: 60, w: 600, h: 960};
// camera on A: from the habit path, pushing toward the shared habit
const CROP_A0: Crop = {x: 0.5, y: 0.6, zoom: 1};
const CROP_A1: Crop = {x: 0.62, y: 0.63, zoom: 1.42};
const CROP_B: Crop = {x: 0.5, y: 0.62, zoom: 1.08};
/** The shared habit in A (the node marked 👥) and B's first habit node, in source coords. */
const SHARED_A = {x: 0.752, y: 0.646};
const NODE_B = {x: 0.256, y: 0.548};
const RAD = 44;

// ——— WHO — one word per accent; the music decides how many (8) ———
const WHO = ['friend.', 'mom.', 'dad.', 'partner.', 'sister.', 'brother.', 'best friend.', 'someone\nyou love.'];
const PHRASE = 72; // "Share a habit / with your"
const SLOT = 380; // the word window: taller than the largest word, so words never overlap
const WORD_Y = 650; // centre of the word window
const wordSize = (w: string) => {
	const lines = w.split('\n');
	const longest = Math.max(...lines.map((l) => l.length));
	return Math.min(310, Math.floor(1700 / (longest * 0.53)), Math.floor((SLOT - 70) / lines.length));
};
const FAST = {damping: 200, stiffness: 380, mass: 0.5};

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const join = at('social', HIT.bridge); // bar 27: someone joins
	const T = HIT.tings.map((t) => at('social', t));
	const breath = at('social', HIT.dip);
	const grow = at('social', HIT.grow);
	const end = at('social', HIT.resolution);

	// ——— 1 · one person ———
	const aIn = arrive(f, fps, 0, 18);
	const cropA = mixCrop(CROP_A0, CROP_A1, ramp(f, 0, join, ease.inOut));
	// ——— 2 · share: one pulse from the shared habit ———
	const share = b(2);
	const pulse = ramp(f, share, share + 22, ease.out);
	// ——— 3 · someone joins: A steps back, B opens out of the point ———
	const step = arrive(f, fps, join - 8, 26, {damping: 200, stiffness: 90, mass: 1});
	const aBox: Box = {
		x: mix(A0.x, A1.x, step),
		y: mix(A0.y, A1.y, step) + (1 - aIn) * 60,
		w: mix(A0.w, A1.w, step),
		h: mix(A0.h, A1.h, step),
	};
	const anchor = slotPoint('sharedGoalA', aBox, cropA, SHARED_A.x, SHARED_A.y);
	const open = ramp(f, join, join + 24, Easing.bezier(0.55, 0, 0.25, 1));
	const bBox: Box = {...B1, x: B1.x + (1 - open) * -40};
	const bNode = slotPoint('sharedGoalB', bBox, CROP_B, NODE_B.x, NODE_B.y);
	// the point: born on A's shared habit, it settles between the two people
	const between = ramp(f, join + 10, join + 34, ease.inOut);
	const mid = {x: (anchor.x + bNode.x) / 2, y: (anchor.y + bNode.y) / 2};
	const pt = {x: mix(anchor.x, mid.x, between), y: mix(anchor.y, mid.y, between)};
	const dotR = f < share ? 0 : mix(0, 12, ramp(f, share, share + 6, ease.out));
	const pulse2 = ramp(f, join + b(2), join + b(2) + 22, ease.out); // both showing up
	// ——— 4 · push through the point into black ———
	const through = ramp(f, join + b(2.5), join + b(3.1), ease.in);
	// the camera hands emphasis from A to B (a slow pan while both are present)
	const pan = mix(0, -70, ramp(f, join, join + b(3), ease.inOut));

	// ——— the sentence + WHO ———
	const p1 = arrive(f, fps, join + b(3.25), 14);
	const p2 = arrive(f, fps, join + b(3.25) + 7, 14);
	const clear = leave(f, breath + 18, 10);

	// ——— the circle → Grow together ———
	const dotIn = ramp(f, breath + 30, breath + 38, ease.out);
	const breathe = mix(1, 1.18, ramp(f, breath + 38, grow - b(1.1), ease.inOut));
	const expand = ramp(f, grow - b(1.1), grow, PUSH);
	const circleR = mix(11 * breathe, 1180, expand);
	const g1 = arrive(f, fps, grow + 1, 20, {damping: 200, stiffness: 100, mass: 0.9});
	const g2 = arrive(f, fps, grow + 6, 22, {damping: 200, stiffness: 100, mass: 0.9});
	const liftUp = ramp(f, grow, grow + 40, ease.out);
	const back = ramp(f, end - 18, end - 2, ease.inOut);

	const ring = (p: number, x: number, y: number, max: number) =>
		p > 0 && p < 1 ? (
			<div
				style={{
					position: 'absolute',
					left: x - max * p,
					top: y - max * p,
					width: max * p * 2,
					height: max * p * 2,
					borderRadius: '50%',
					border: `3px solid ${C.lumo}`,
					opacity: 1 - p,
				}}
			/>
		) : null;

	return (
		<AbsoluteFill>
			{/* ——— the real product: one person → someone joins ——— */}
			{through < 1 && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						opacity: 1 - through,
						transform: `translateX(${pan}px) scale(${mix(1, 1.6, through)})`,
						transformOrigin: `${pt.x}px ${pt.y}px`,
					}}
				>
					<MediaSlot
						id="sharedGoalA"
						clip="view"
						playhead={f}
						{...aBox}
						crop={cropA}
						radius={RAD}
						style={{opacity: aIn * mix(1, 0.5, ramp(f, join + 6, join + 30, ease.inOut)), boxShadow: HAIRLINE}}
					/>
					{open > 0 && (
						<MediaSlot
							id="sharedGoalB"
							clip="view"
							playhead={0}
							{...bBox}
							crop={CROP_B}
							radius={RAD}
							style={{
								// B opens OUT OF the shared point: a circle centred there
								clipPath: `circle(${mix(0, 1400, open)}px at ${anchor.x - bBox.x}px ${anchor.y - bBox.y}px)`,
								boxShadow: `0 40px 90px rgba(0,0,0,0.65), ${HAIRLINE}`,
							}}
						/>
					)}
					{ring(pulse, anchor.x, anchor.y, 170)}
					{ring(pulse2, pt.x, pt.y, 140)}
					{dotR > 0 && (
						<div
							style={{
								position: 'absolute',
								left: pt.x - dotR,
								top: pt.y - dotR,
								width: dotR * 2,
								height: dotR * 2,
								borderRadius: '50%',
								background: C.lumo,
								boxShadow: '0 0 30px 6px rgba(227,210,144,0.35)',
							}}
						/>
					)}
				</div>
			)}

			{/* "Share a habit / with your" — stable; only the last word moves */}
			{f >= join + b(3.25) && clear < 1 && (
				<div style={{position: 'absolute', left: 0, right: 0, top: WORD_Y - SLOT / 2 - 190, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					<MaskLine enter={p1} exit={clear} size={PHRASE} weight={500} color={C.soft}>
						Share a habit
					</MaskLine>
					<MaskLine enter={p2} exit={clear} size={PHRASE} weight={500} color={C.soft}>
						with your
					</MaskLine>
				</div>
			)}

			{/* WHO — one slot window: on each accent the old word rolls up out of it
			    exactly as the new one rolls in from below (a reel, never overlapping) */}
			{f >= T[0] - 3 && clear < 1 && (
				<div style={{position: 'absolute', left: 0, right: 0, top: WORD_Y - SLOT / 2, height: SLOT, overflow: 'hidden'}}>
					{WHO.map((w, i) => {
						const swapIn = arrive(f, fps, T[i] - 3, i === 0 ? 8 : 7, FAST);
						const swapOut = i === WHO.length - 1 ? clear : arrive(f, fps, T[i + 1] - 3, 7, FAST);
						if (swapIn <= 0 || swapOut >= 1) return null;
						const size = wordSize(w);
						const y = (1 - swapIn) * SLOT - swapOut * SLOT;
						return (
							<div
								key={w}
								style={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center',
									transform: `translateY(${y}px)`,
									color: C.white,
									...display(size, 600),
									lineHeight: 0.98,
									whiteSpace: 'pre',
								}}
							>
								{w}
							</div>
						);
					})}
				</div>
			)}

			{/* the breath → a small #E3D290 circle → it becomes the whole frame on the hit */}
			{dotIn > 0 && f < grow + 2 && (
				<div
					style={{
						position: 'absolute',
						left: 960 - circleR,
						top: 540 - circleR,
						width: circleR * 2,
						height: circleR * 2,
						borderRadius: '50%',
						background: C.lumo,
						transform: `scale(${expand > 0 ? 1 : dotIn})`,
					}}
				/>
			)}
			{f >= grow && (
				<AbsoluteFill style={{background: C.lumo}}>
					{/* an emotional lift: longer travel, and the whole phrase rises as it lands */}
					<Stack style={{transform: `translateY(${mix(34, 0, liftUp)}px)`}}>
						<MaskLine enter={g1} size={190} weight={600} color={C.black} travel={1.45}>
							Grow
						</MaskLine>
						<MaskLine enter={g2} size={190} weight={600} color={C.black} travel={1.45}>
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
