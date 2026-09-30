/**
 * 07 · HERO — the moments behind the number.
 * BLACK → "30 days." → one memory → the camera pulls back as memories
 * arrive one by one into a perfectly even grid → simplify →
 * "30 memories." The poster frame of the film.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Memory} from '../components/Memory';
import {Caption, Reveal} from '../components/type';
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

/** The first memory sits just left of centre; the rest arrive by distance from it. */
const START = 14;
const ORDER: number[] = (() => {
	const s = cell(START);
	return Array.from({length: COLS * ROWS}, (_, i) => i).sort((a, c) => {
		const A = cell(a);
		const B = cell(c);
		return Math.hypot(A.x - s.x, (A.y - s.y) * 1.2) - Math.hypot(B.x - s.x, (B.y - s.y) * 1.2);
	});
})();

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();

	// timing (beats)
	const daysIn = b(1.5);
	const daysOut = b(7);
	const first = b(8);
	const last = b(20);
	const simplify = b(22);
	const memIn = b(23);
	const subIn = b(26);

	// camera: from one memory filling the eye to the whole grid
	const pull = ramp(f, first, last + b(1), ease.inOut);
	const s = cell(START);
	const fx = mix(s.x + CW / 2, 960, pull);
	const fy = mix(s.y + CH / 2, 540, pull);
	const scale = mix(2.3, 0.74, pull) * mix(1, 0.97, ramp(f, simplify, b(32), ease.inOut));
	const dim = mix(1, 0.2, ramp(f, simplify, simplify + b(2.5), ease.inOut));

	return (
		<AbsoluteFill>
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
					const at = first + (last - first) * Math.pow(k / (ORDER.length - 1), 0.72);
					if (f < at) return null;
					const p = ramp(f, at, at + 20);
					const c = cell(ci);
					return (
						<div
							key={ci}
							style={{
								position: 'absolute',
								left: c.x,
								top: c.y,
								width: CW,
								height: CH,
								opacity: p,
								transform: `scale(${mix(0.97, 1, p)})`,
							}}
						>
							<Memory i={k} w={CW} h={CH} radius={10} />
						</div>
					);
				})}
			</div>

			{/* 30 days. */}
			<div style={{position: 'absolute', left: 0, right: 0, top: 420, textAlign: 'center', color: C.white, ...display(210, 500)}}>
				<Reveal p={ramp(f, daysIn, daysIn + 40)} out={ramp(f, daysOut, daysOut + 18, ease.in)} rise={30}>
					30 days.
				</Reveal>
			</div>

			{/* 30 memories. */}
			<div style={{position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center', color: C.white, ...display(210, 500)}}>
				<Reveal p={ramp(f, memIn, memIn + 44)} rise={30}>
					30 <span style={{color: C.lumo}}>memories.</span>
				</Reveal>
			</div>
			<Caption x={0} y={660} size={34} align="center">
				<Reveal p={ramp(f, subIn, subIn + 36)} rise={14}>
					Progress you can see.
				</Reveal>
			</Caption>
		</AbsoluteFill>
	);
};
