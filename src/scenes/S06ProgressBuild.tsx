/**
 * S06 · BUILDING PROGRESS — time passes along a #E3D290 progress line.
 * Each tick is a day; memories pile up faster and faster until
 * DAY 30 = 30 MEMORIES. Then everything collapses to the centre.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Dot, Label, Line} from '../components/geo';
import {Memory} from '../components/Memory';
import {HERO_SLOT} from '../layouts';
import {ease, mix, pop, rand, ramp} from '../lib/anim';
import {C, display, mono} from '../theme';

const Y = 540;
const X0 = 100;
const X1 = 1820;
export const TICKS: {day: number; beat: number; n: number}[] = [
	{day: 1, beat: 0.5, n: 1},
	{day: 4, beat: 2, n: 2},
	{day: 8, beat: 3.5, n: 3},
	{day: 12, beat: 5, n: 4},
	{day: 17, beat: 6.25, n: 5},
	{day: 23, beat: 7.25, n: 6},
	{day: 30, beat: 8, n: 9}, // 1+2+3+4+5+6+9 = 30 memories by day 30
];
const xOf = (day: number) => X0 + ((day - 1) / 29) * (X1 - X0);

export const S06ProgressBuild: React.FC = () => {
	const f = useCurrentFrame();
	const grow = ramp(f, 0, 8, ease.out);
	const lineL = mix(960 - 860, X0, grow);
	const lineR = mix(960 + 860, X1, grow);

	// exit: collapse into the hero window's centre line
	const ex = ramp(f, b(10.5), b(11.75), ease.in);
	const exL = mix(X0, HERO_SLOT.x, ex);
	const exR = mix(X1, HERO_SLOT.x + HERO_SLOT.w, ex);

	let reached = -1;
	TICKS.forEach((t, k) => {
		if (f >= b(t.beat)) reached = k;
	});
	const fillX = reached >= 0 ? xOf(TICKS[reached].day) : X0;
	const count = TICKS.slice(0, reached + 1).reduce((s, t) => s + t.n, 0);

	let idx = 0;
	const cards: React.ReactNode[] = [];
	TICKS.forEach((t, k) => {
		const at = b(t.beat);
		const size = mix(190, 118, k / 6);
		for (let j = 0; j < t.n; j++) {
			const i = idx++;
			const cAt = at + j * 2;
			if (f < cAt) continue;
			const s = pop(f, cAt);
			const tx = xOf(t.day) - size / 2 + (j === 0 ? 0 : (rand(i * 7.1) - 0.5) * 70);
			const ty = Y - 30 - size - j * 44;
			// collapse toward centre
			const cx = mix(tx, 960 - size / 2, ex);
			const cy = mix(ty, Y - size / 2, ex);
			const sc = s * (1 - ex);
			cards.push(
				<div
					key={i}
					style={{
						position: 'absolute',
						left: cx,
						top: cy,
						width: size,
						height: size * 1.2,
						transform: `scale(${sc})`,
						transformOrigin: '50% 100%',
						boxShadow: `0 0 0 2px ${C.black}`,
					}}
				>
					<Memory i={i} w={size} h={size * 1.2} bare />
				</div>,
			);
		}
	});

	return (
		<AbsoluteFill>
			<Line x1={ex > 0 ? exL : lineL} y1={Y} x2={ex > 0 ? exR : lineR} y2={Y} t={2} />
			{ex === 0 && <Line x1={X0} y1={Y} x2={fillX} y2={Y} t={8} />}
			{TICKS.map((t, k) =>
				k <= reached && ex === 0 ? (
					<React.Fragment key={t.day}>
						<Dot x={xOf(t.day)} y={Y} r={9 * pop(f, b(t.beat))} />
						<Label x={xOf(t.day)} y={Y + 26} size={17} align="center">
							Day {String(t.day).padStart(2, '0')}
						</Label>
					</React.Fragment>
				) : null,
			)}
			{cards}
			{/* running counters: days and memories rise together */}
			{reached >= 0 && ex === 0 && (
				<>
					<div style={{position: 'absolute', left: X0, top: 640, color: C.white, ...mono(22)}}>Day</div>
					<div style={{position: 'absolute', left: X0 - 10, top: 680, color: C.lumo, ...display(900, 112), fontSize: 300}}>
						{String(TICKS[reached].day).padStart(2, '0')}
					</div>
					<div style={{position: 'absolute', right: 1920 - X1, top: 640, color: C.white, ...mono(22), textAlign: 'right'}}>
						Memories
					</div>
					<div style={{position: 'absolute', right: 1920 - X1 - 10, top: 680, color: C.white, ...display(900, 112), fontSize: 300, textAlign: 'right'}}>
						{String(count).padStart(2, '0')}
					</div>
				</>
			)}
		</AbsoluteFill>
	);
};
