/**
 * 06 · 30 DAYS → 30 MEMORIES — the payoff, locked to the track's break.
 *
 * BREAK (near silence): "30 days." — huge, alone.
 * A #E3D290 circle appears inside the 0, then grows through the frame so
 * the screen is #E3D290 exactly on the RE-ENTRY. A circle opens from the
 * centre onto Day 01 full-frame; the camera pulls back as memories arrive
 * faster and faster into an even grid; on the next phrase: "30 memories."
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {Memory} from '../components/Memory';
import {Reveal} from '../components/type';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const COLS = 6;
const ROWS = 5;
const CW = 200;
const CH = 250;
const GAP = 22;
const GW = COLS * CW + (COLS - 1) * GAP;
const GH = ROWS * CH + (ROWS - 1) * GAP;
const G0 = {x: 960 - GW / 2, y: 540 - GH / 2};
const cell = (i: number) => ({x: G0.x + (i % COLS) * (CW + GAP), y: G0.y + Math.floor(i / COLS) * (CH + GAP)});

const START = 14;
const ORDER: number[] = (() => {
	const s = cell(START);
	return Array.from({length: COLS * ROWS}, (_, i) => i).sort((a, c) => {
		const A = cell(a);
		const B = cell(c);
		return Math.hypot(A.x - s.x, (A.y - s.y) * 1.2) - Math.hypot(B.x - s.x, (B.y - s.y) * 1.2);
	});
})();

const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);
const SIZE = 300;

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();
	const reentry = at('hero', HIT.reentry);
	const land = at('hero', HIT.thirtyMemories);
	const end = at('hero', HIT.silence);

	// "30 days." and the portal in its 0
	const days = ramp(f, 0, 10);
	const seed = ramp(f, reentry - b(2), reentry - b(2) + 8, ease.out);
	const push = ramp(f, reentry - b(1.25), reentry, PUSH);
	const portalScale = seed * mix(1, 48, push);

	// the re-entry: a clean, full #E3D290 frame is the boundary. Then Day 01
	// grows out of it as a card until it IS the frame (no black, no leftovers).
	const held = reentry + 12;
	const grow = ramp(f, held, held + 22, ease.inOut);
	const world = held + 22; // the memory world takes over from the card here
	const pull = ramp(f, world, land - 6, ease.inOut);
	const s = cell(START);
	const fx = mix(s.x + CW / 2, 960, pull);
	const fy = mix(s.y + CH / 2, 540, pull);
	// log-space zoom: from one memory filling the frame to the whole grid
	const zFull = Math.max(1920 / CW, 1080 / CH);
	const scale = Math.exp(mix(Math.log(zFull), Math.log(0.74), pull)) * mix(1, 0.97, ramp(f, land, end, ease.inOut));
	const first = world + 6;
	const last = land - 16;
	const dim = mix(1, 0.14, ramp(f, land - 6, land + 10, ease.inOut));
	const out = ramp(f, end - 12, end, ease.in);

	return (
		<AbsoluteFill>
			{/* ——— the memory world (after the yellow boundary) ——— */}
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
						{ORDER.map((ci, k) => {
							const t = k === 0 ? world : first + (last - first) * Math.pow(k / (ORDER.length - 1), 0.62);
							if (f < t) return null;
							const p = k === 0 ? 1 : ramp(f, t, t + 12);
							const c = cell(ci);
							return (
								<div
									key={ci}
									style={{position: 'absolute', left: c.x, top: c.y, width: CW, height: CH, opacity: p, transform: `scale(${mix(0.95, 1, p)})`}}
								>
									<Memory i={k} w={CW} h={CH} radius={pull > 0.2 ? 10 : 0} bare={pull > 0.2} />
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* ——— 30 days. with a portal in the 0 ——— */}
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
									zIndex: 2,
								}}
							/>
						)}
					</span>
					<span>&nbsp;days.</span>
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
								top: mix(540 - 187.5, 540 - (CH * zFull) / 2, grow),
								width: mix(300, CW * zFull, grow),
								height: mix(375, CH * zFull, grow),
								borderRadius: mix(20, 0, grow),
								overflow: 'hidden',
							}}
						>
							<Memory i={0} w={mix(300, CW * zFull, grow)} h={mix(375, CH * zFull, grow)} bare={grow < 0.6} />
						</div>
					)}
				</AbsoluteFill>
			)}

			{/* ——— 30 memories. — the payoff ——— */}
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					color: C.white,
					...display(290, 600),
				}}
			>
				<Reveal p={ramp(f, land, land + 12)} out={out} rise={40}>
					30 <span style={{color: C.lumo}}>memories.</span>
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
