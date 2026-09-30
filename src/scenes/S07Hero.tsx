/**
 * 08 · 30 DAYS → 30 MEMORIES — the payoff, locked to the track's break.
 *
 * BREAK: "30 days." — huge, alone. A #E3D290 circle appears inside the 0
 * and grows through the frame, ABOVE everything, so the screen is clean
 * #E3D290 exactly on the RE-ENTRY. One bar only: a clean yellow breath,
 * "Keep / showing up." rises through its masks (black on yellow), then the
 * yellow draws back in — an accelerating contraction to a single point that
 * clips the words away with it — and on the next downbeat "30 memories."
 * lands where it vanished.
 *
 * No photo here: every real memory already has its one place in the film
 * (memoryManifest) and progress.jpg appears only in the Progress scene. The
 * typography carries the 30. The groove keeps moving forward under it,
 * straight into the next phrase ("Better together").
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {MaskLine, Reveal, Stack, arrive} from '../components/type';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);
const SIZE = 320;
const COVER = 1110; // radius that covers 1920×1080 from the centre

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const reentry = at('hero', HIT.reentry);
	const land = at('hero', HIT.thirtyMemories);
	const end = at('hero', HIT.silence);

	// "30 days." and the portal in its 0
	const days = ramp(f, 0, 10);
	const seed = ramp(f, reentry - b(2), reentry - b(2) + 8, ease.out);
	const push = ramp(f, reentry - b(1.25), reentry, PUSH);
	const portalScale = seed * mix(1, 52, push);

	// one bar of yellow: breath → "Keep / showing up." → it draws back into one point
	const keep = arrive(f, fps, reentry + 5, 16);
	const showing = arrive(f, fps, reentry + 13, 18);
	const draw = ramp(f, reentry + b(2), land, Easing.bezier(0.45, 0, 0.75, 0.3));
	const r = Math.exp(mix(Math.log(COVER), Math.log(2), draw));
	const scale = mix(1, 0.94, ramp(f, land, end, ease.inOut));
	// a very short black breath before the next phrase
	const out = ramp(f, end - 16, end - 4, ease.in);

	return (
		<AbsoluteFill>
			{/* ——— the yellow frame, drawing back to a point ——— */}
			{f >= reentry && f < land + 2 && (
				<div
					style={{
						position: 'absolute',
						left: 960 - r,
						top: 540 - r,
						width: r * 2,
						height: r * 2,
						borderRadius: '50%',
						background: C.lumo,
						overflow: 'hidden',
						opacity: 1 - ramp(f, land - 2, land + 2),
					}}
				>
					{/* the words live inside the circle: as it draws back, it takes them with it */}
					<div style={{position: 'absolute', left: r - 960, top: r - 540, width: 1920, height: 1080}}>
						<Stack style={{transform: `translateY(${-draw * 60}px) scale(${mix(1, 0.9, draw)})`}}>
							<MaskLine enter={keep} size={120} weight={500} color={C.black}>
								Keep
							</MaskLine>
							<MaskLine enter={showing} size={176} weight={600} color={C.black}>
								showing up.
							</MaskLine>
						</Stack>
					</div>
				</div>
			)}

			{/* ——— 30 days. with a portal in the 0 (the portal paints above everything) ——— */}
			{f < reentry && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: C.white,
						...display(SIZE, 500),
						opacity: days,
						transform: `translateY(${(1 - days) * 30}px)`,
					}}
				>
					<span>3</span>
					<span style={{position: 'relative', display: 'inline-block'}}>
						0
						{seed > 0 && (
							<span
								style={{
									position: 'absolute',
									left: '50%',
									top: '52%',
									width: SIZE * 0.2,
									height: SIZE * 0.2,
									marginLeft: -SIZE * 0.1,
									marginTop: -SIZE * 0.1,
									borderRadius: '50%',
									background: C.lumo,
									transform: `scale(${portalScale})`,
									zIndex: 10,
								}}
							/>
						)}
					</span>
					<span style={{position: 'relative', zIndex: 1}}>&nbsp;days.</span>
				</div>
			)}

			{/* ——— 30 memories. — the payoff, a campaign frame ——— */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					transform: `scale(${scale})`,
				}}
			>
				<Reveal p={ramp(f, land, land + 12)} out={out} rise={40}>
					<div style={{...display(430, 600), lineHeight: 0.92, color: C.white, textAlign: 'center'}}>30</div>
				</Reveal>
				<Reveal p={ramp(f, land + 4, land + 16)} out={out} rise={40}>
					<div style={{...display(330, 600), lineHeight: 0.98, color: C.lumo, textAlign: 'center'}}>memories.</div>
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
