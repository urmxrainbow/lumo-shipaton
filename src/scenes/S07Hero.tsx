/**
 * 08 · 30 DAYS → 30 MEMORIES — the payoff, locked to the track's break.
 *
 * BREAK: "30 days." — huge, alone. A #E3D290 circle appears inside the 0
 * and grows through the frame, ABOVE everything, so the screen is clean
 * #E3D290 exactly on the RE-ENTRY. Held. Then Day 01 grows out of the
 * yellow until it IS the frame; the camera pulls back and the real
 * memories arrive beside it. On the next phrase: "30 memories."
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {Memory} from '../components/Memory';
import {Reveal} from '../components/type';
import {memoryCount} from '../lib/media';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);
const SIZE = 320;

// the row of real memories (same rhythm as the memory build)
const CW = 300;
const CH = CW * (16 / 9);
const GAP = 30;
const cell = (k: number, n: number) => {
	const total = n * CW + (n - 1) * GAP;
	return {x: 960 - total / 2 + k * (CW + GAP), y: 540 - CH / 2};
};

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();
	const N = Math.min(5, Math.max(1, memoryCount('a')));
	const reentry = at('hero', HIT.reentry);
	const land = at('hero', HIT.thirtyMemories);
	const end = at('hero', HIT.silence);

	// "30 days." and the portal in its 0
	const days = ramp(f, 0, 10);
	const seed = ramp(f, reentry - b(2), reentry - b(2) + 8, ease.out);
	const push = ramp(f, reentry - b(1.25), reentry, PUSH);
	const portalScale = seed * mix(1, 52, push);

	// the yellow boundary → Day 01 grows out of it → the memory world
	const held = reentry + 12;
	const grow = ramp(f, held, held + 22, ease.inOut);
	const world = held + 22;
	const c0 = cell(0, N);
	const zFull = Math.max(1920 / CW, 1080 / CH);
	const pull = ramp(f, world, land - 8, ease.inOut);
	const fx = mix(c0.x + CW / 2, 960, pull);
	const fy = mix(c0.y + CH / 2, 540, pull);
	const scale = Math.exp(mix(Math.log(zFull), Math.log(1), pull)) * mix(1, 0.94, ramp(f, land, end, ease.inOut));
	const dim = mix(1, 0.22, ramp(f, land - 6, land + 10, ease.inOut));
	const out = ramp(f, end - 12, end, ease.in);

	return (
		<AbsoluteFill>
			{/* ——— the memory world ——— */}
			{f >= world && (
				<div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							transform: `translate(${960 - fx}px, ${540 - fy}px) scale(${scale})`,
							transformOrigin: `${fx}px ${fy}px`,
							opacity: dim,
						}}
					>
						{Array.from({length: N}, (_, k) => {
							const t = k === 0 ? world : mix(world + 30, land - 30, Math.pow((k - 1) / Math.max(1, N - 2), 0.8));
							if (f < t) return null;
							const p = k === 0 ? 1 : ramp(f, t, t + 16);
							const c = cell(k, N);
							return (
								<div
									key={k}
									style={{position: 'absolute', left: c.x, top: c.y, width: CW, height: CH, opacity: p, transform: `scale(${mix(0.95, 1, p)})`}}
								>
									<Memory i={k} w={CW} h={CH} radius={mix(0, 16, pull)} />
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* ——— the yellow boundary, then Day 01 grows out of it ——— */}
			{f >= reentry && f < world && (
				<AbsoluteFill style={{background: C.lumo}}>
					{grow > 0 && (
						<div
							style={{
								position: 'absolute',
								left: mix(960 - 150, 960 - (CW * zFull) / 2, grow),
								top: mix(540 - 267, 540 - (CH * zFull) / 2, grow),
								width: mix(300, CW * zFull, grow),
								height: mix(534, CH * zFull, grow),
								borderRadius: mix(16, 0, grow),
								overflow: 'hidden',
							}}
						>
							<Memory i={0} w={mix(300, CW * zFull, grow)} h={mix(534, CH * zFull, grow)} />
						</div>
					)}
				</AbsoluteFill>
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
