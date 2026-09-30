/**
 * 05 · MEMORIES BUILD — we start INSIDE the memory (full frame), it steps
 * back into a clean grid, and memories arrive faster as the groove builds:
 * 1 → 2 → 4 → 8 → 16. "Keep showing up." Then on the last downbeat before
 * the break they're gathered into the Progress window: "Look back."
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {HAIRLINE, PROGRESS_WINDOW, RADIUS, progressTile} from '../components/Screen';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Caption, Headline, Reveal} from '../components/type';
import {at} from '../timeline';
import {Box, ease, mix, mixBox, ramp} from '../lib/anim';
import {C, display} from '../theme';

type Layout = {cols: number; rows: number; w: number; h: number; gap: number};
const LAYOUTS: Record<number, Layout> = {
	1: {cols: 1, rows: 1, w: 440, h: 550, gap: 0},
	2: {cols: 2, rows: 1, w: 400, h: 500, gap: 40},
	4: {cols: 4, rows: 1, w: 320, h: 400, gap: 32},
	8: {cols: 4, rows: 2, w: 230, h: 288, gap: 24},
	16: {cols: 8, rows: 2, w: 188, h: 235, gap: 18},
};
const CY = 470;

const cell = (n: number, k: number): Box => {
	const L = LAYOUTS[n];
	const gw = L.cols * L.w + (L.cols - 1) * L.gap;
	const gh = L.rows * L.h + (L.rows - 1) * L.gap;
	return {x: 960 - gw / 2 + (k % L.cols) * (L.w + L.gap), y: CY - gh / 2 + Math.floor(k / L.cols) * (L.h + L.gap), w: L.w, h: L.h};
};

export const S04Memories: React.FC = () => {
	const f = useCurrentFrame();
	const look = at('memories', HIT.lookBack);
	const end = at('memories', HIT.breakDown);

	// phases, accelerating with the groove (beats from the downbeat we land on)
	const PH: [number, number][] = [
		[1, b(0.75)],
		[2, b(2.5)],
		[4, b(4)],
		[8, b(6)],
		[16, b(7.25)],
	];
	const layoutAt = (fr: number) => {
		let cur = 1;
		let prev = 1;
		let t = 1;
		for (let i = 0; i < PH.length; i++) {
			if (fr >= PH[i][1]) {
				prev = i > 0 ? PH[i - 1][0] : 1;
				cur = PH[i][0];
				t = ramp(fr, PH[i][1], PH[i][1] + 14, ease.inOut);
			}
		}
		return {cur, prev, t};
	};
	const {cur, prev, t} = layoutAt(f);

	// full-bleed → first card
	const step = ramp(f, b(0.75), b(0.75) + 16, ease.inOut);
	const gather = ramp(f, look, look + 22, ease.inOut);
	const winIn = ramp(f, look + 4, look + 24, ease.out);
	const exit = ramp(f, end - 10, end, ease.in);

	const tiles: React.ReactNode[] = [];
	for (let k = 0; k < cur; k++) {
		// when did this memory arrive?
		const arrivedIn = PH.find(([n]) => k < n)!;
		const appear = k === 0 ? 1 : ramp(f, arrivedIn[1] + (k - (PH[PH.indexOf(arrivedIn) - 1]?.[0] ?? 0)) * 2, arrivedIn[1] + (k - (PH[PH.indexOf(arrivedIn) - 1]?.[0] ?? 0)) * 2 + 12);
		let r: Box = k < prev ? mixBox(cell(prev, k), cell(cur, k), t) : cell(cur, k);
		if (k === 0 && step < 1) r = mixBox({x: 0, y: 0, w: 1920, h: 1080}, cell(1, 0), step);
		r = mixBox(r, progressTile(PROGRESS_WINDOW, k), gather);
		const absorbed = 1 - ramp(gather, 0.75, 1);
		tiles.push(
			<div
				key={k}
				style={{
					position: 'absolute',
					left: r.x,
					top: r.y,
					width: r.w,
					height: r.h,
					opacity: appear * absorbed,
					transform: `scale(${mix(0.94, 1, appear)})`,
					borderRadius: k === 0 ? mix(0, 14, step) : 14,
					overflow: 'hidden',
				}}
			>
				<Memory i={k} w={r.w} h={r.h} bare={!(k === 0 && step < 0.5)} zoom={k === 0 ? mix(1.06, 1, ramp(f, 0, b(1))) : 1} />
			</div>,
		);
	}

	return (
		<AbsoluteFill style={{opacity: 1 - exit}}>
			{winIn > 0 && (
				<MediaSlot
					id="progress"
					clip="scroll"
					playhead={f - look - 16}
					{...PROGRESS_WINDOW}
					radius={RADIUS}
					style={{opacity: winIn, transform: `translateY(${(1 - winIn) * 40}px)`, boxShadow: HAIRLINE}}
				/>
			)}
			{tiles}
			{/* inside the memory: its day, quietly */}
			<Caption x={80} y={990} size={26} color={C.white}>
				<Reveal p={ramp(f, 2, 14)} out={ramp(f, b(0.5), b(0.75))} rise={10}>
					Day 01
				</Reveal>
			</Caption>
			<div style={{position: 'absolute', left: 0, right: 0, top: 800, textAlign: 'center', color: C.white, ...display(80, 500)}}>
				<Reveal p={ramp(f, b(2.5), b(2.5) + 14)} out={ramp(f, look - 10, look, ease.in)} rise={24}>
					Keep showing up.
				</Reveal>
			</div>
			<Headline x={200} y={440} size={128}>
				<Reveal p={ramp(f, look + 6, look + 20)} rise={36}>
					Look back.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
