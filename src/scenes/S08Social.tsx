/**
 * 09 · SHARED HABIT — you don't have to grow alone.
 *
 *  bar 26  the real product, at once: two people's screens of one shared
 *          habit (shared-goal-a.mp4 · shared-goal-b.jpg) glide in and meet.
 *  bar 27  "Share a habit / with your" rises above them.
 *  bar 28  the screens step away; the sentence settles — and on each of the
 *  –29     8 crisp high accents of these two bars (22.7 frames apart) ONLY
 *          the last word changes, masked, in the same place:
 *          friend. mom. dad. partner. sister. brother. best friend.
 *          someone you love.
 *  breath  the quiet pre-drop bar: everything clears; a small #E3D290 circle.
 *  hit     it expands through the frame on the final lift: "Grow / together."
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot} from '../components/MediaSlot';
import {MaskLine, Stack, arrive, leave} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

// the two real screens, side by side — two people, one habit
const W = 460;
const H = 560;
const Y = 380;
const GAP = 48;
const A: Box = {x: 960 - GAP / 2 - W, y: Y, w: W, h: H};
const B: Box = {x: 960 + GAP / 2, y: Y, w: W, h: H};
// both framed from "Today's habit" down (their stats cards are never shown)
const CROP_A: Crop = {x: 0.5, y: 0.65, zoom: 1};
const CROP_B: Crop = {x: 0.5, y: 0.69, zoom: 1};
const RAD = 44;
const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);

/** WHO — one word per accent, the music decides how many (8). */
const WHO = ['friend.', 'mom.', 'dad.', 'partner.', 'sister.', 'brother.', 'best friend.', 'someone you love.'];
const PHRASE = 76; // "Share a habit / with your"
const WORD_Y = 640; // centre line of the changing word
const SLOT = 290; // the word window: taller than the largest word, so words never overlap
const wordSize = (w: string) => Math.min(230, Math.floor(1560 / (w.length * 0.53)));
const FAST = {damping: 200, stiffness: 380, mass: 0.5};

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const phrase = at('social', HIT.bridge);
	const T = HIT.tings.map((t) => at('social', t));
	const words = T[0] - b(1); // bar 28 downbeat: the screens step away
	const breath = at('social', HIT.dip);
	const grow = at('social', HIT.grow);
	const end = at('social', HIT.resolution);

	// ——— the real shared habit ———
	const aIn = arrive(f, fps, 0, 18);
	const bIn = arrive(f, fps, 6, 18);
	const uiOut = leave(f, words - 4, 12);
	const uiY = uiOut * 90;

	// ——— the sentence: above the screens, then settled where the words will change ———
	const p1 = arrive(f, fps, phrase - 3, 14);
	const p2 = arrive(f, fps, phrase + b(1) - 4, 14);
	const settle = arrive(f, fps, words - 2, 18);
	const phraseTop = mix(150, WORD_Y - 330, settle);
	const clear = leave(f, breath + 18, 10);

	// ——— the circle ———
	const dotIn = ramp(f, breath + 30, breath + 38, ease.out);
	const breathe = mix(1, 1.18, ramp(f, breath + 38, grow - b(1.1), ease.inOut));
	const expand = ramp(f, grow - b(1.1), grow, PUSH);
	const dotR = mix(11 * breathe, 1180, expand);
	const g1 = arrive(f, fps, grow + 1, 20, {damping: 200, stiffness: 100, mass: 0.9});
	const g2 = arrive(f, fps, grow + 6, 22, {damping: 200, stiffness: 100, mass: 0.9});
	const liftUp = ramp(f, grow, grow + 40, ease.out);
	// then black closes back in from the centre, ready for the resolution
	const back = ramp(f, end - 18, end - 2, ease.inOut);

	return (
		<AbsoluteFill>
			{/* the real product: two people's screens of the same habit */}
			{uiOut < 1 && (
				<div style={{position: 'absolute', inset: 0, opacity: 1 - uiOut, transform: `translateY(${uiY}px) scale(${mix(1, 0.95, uiOut)})`}}>
					<MediaSlot
						id="sharedGoalA"
						crop={CROP_A}
						clip="view"
						playhead={f}
						{...A}
						x={A.x - (1 - aIn) * 220}
						radius={RAD}
						style={{opacity: aIn, boxShadow: HAIRLINE}}
					/>
					<MediaSlot
						id="sharedGoalB"
						crop={CROP_B}
						clip="view"
						playhead={0}
						{...B}
						x={B.x + (1 - bIn) * 220}
						radius={RAD}
						style={{opacity: bIn, boxShadow: HAIRLINE}}
					/>
				</div>
			)}

			{/* "Share a habit / with your" — stable; only the last word will move */}
			{clear < 1 && (
				<div style={{position: 'absolute', left: 0, right: 0, top: phraseTop, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
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
						const swapIn = i === 0 ? arrive(f, fps, T[0] - 3, 8, FAST) : arrive(f, fps, T[i] - 3, 7, FAST);
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
									transform: `translateY(${y}px)`,
									color: C.white,
									...display(size, 600),
									lineHeight: 1,
									whiteSpace: 'nowrap',
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
						left: 960 - dotR,
						top: 540 - dotR,
						width: dotR * 2,
						height: dotR * 2,
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
