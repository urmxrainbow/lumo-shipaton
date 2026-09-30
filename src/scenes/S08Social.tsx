/**
 * S08 · SOCIAL — two people, one goal. A #E3D290 line connects two
 * Shared Goal windows; check-ins travel back and forth along it.
 * The line then becomes the underline of BETTER / GROW TOGETHER.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Card} from '../components/Card';
import {Dot, Label, Line} from '../components/geo';
import {MediaSlot} from '../components/MediaSlot';
import {MaskLine} from '../components/type';
import {Rect} from '../layouts';
import {ease, mix, ramp} from '../lib/anim';
import {C} from '../theme';

const WIN_A: Rect = {x: 250, y: 90, w: 400, h: 900};
const WIN_B: Rect = {x: 1270, y: 90, w: 400, h: 900};
const LY = 540;
const LA = WIN_A.x + WIN_A.w;
const LB = WIN_B.x;

/** Check-in exchange: [beat, from, memory set, index, rect]. */
const EXCHANGE: [number, 'a' | 'b', number, Rect][] = [
	[4, 'a', 11, {x: 700, y: 110, w: 220, h: 290}],
	[5, 'b', 0, {x: 1000, y: 640, w: 220, h: 290}],
	[6, 'a', 16, {x: 700, y: 640, w: 220, h: 290}],
	[7, 'b', 1, {x: 1000, y: 110, w: 220, h: 290}],
];

export const S08Social: React.FC = () => {
	const f = useCurrentFrame();
	const TITLE = b(8);
	const GROW = b(10);

	if (f >= TITLE) {
		const m = ramp(f, TITLE, TITLE + 8, ease.snap);
		const x1 = mix(LA, 120, m);
		const x2 = mix(LB, 1800, m);
		const y = mix(LY, 760, m);
		const swap = ramp(f, GROW, GROW + 7);
		return (
			<AbsoluteFill>
				<div style={{position: 'absolute', left: 110, top: 250}}>
					<div style={{position: 'relative', height: 230 * 0.92}}>
						<div style={{position: 'absolute', left: 0, top: 0}}>
							<MaskLine p={ramp(f, TITLE + 2, TITLE + 10)} out={swap} size={230}>
								Better
							</MaskLine>
						</div>
						<div style={{position: 'absolute', left: 0, top: 0}}>
							<MaskLine p={swap} size={230}>
								Grow
							</MaskLine>
						</div>
					</div>
					<MaskLine p={ramp(f, TITLE + 5, TITLE + 13)} size={230} color={C.lumo}>
						Together.
					</MaskLine>
				</div>
				<Line x1={x1} y1={y} x2={x2} y2={y} t={4} />
				<Dot x={x1} y={y} r={10} />
				<Dot x={x2} y={y} r={10} />
				{m >= 1 && (
					<>
						<Label x={120} y={y + 26} size={18}>
							A
						</Label>
						<Label x={1800} y={y + 26} size={18} align="right">
							B
						</Label>
					</>
				)}
			</AbsoluteFill>
		);
	}

	const openA = ramp(f, b(1), b(1) + 9, ease.snap);
	const link = ramp(f, b(2), b(2.75), ease.inOut);
	const openB = ramp(f, b(2.75), b(2.75) + 9, ease.snap);

	// the travelling dot: A → B on the link, then with each check-in
	let dotX: number | null = null;
	if (f >= b(2) && f < b(2.75)) dotX = mix(LA, LB, link);
	EXCHANGE.forEach(([beat, who]) => {
		const t = ramp(f, b(beat) - 6, b(beat), ease.inOut);
		if (f >= b(beat) - 6 && f < b(beat)) dotX = who === 'a' ? mix(LA, LB, t) : mix(LB, LA, t);
	});

	return (
		<AbsoluteFill>
			<Line x1={960} y1={0} x2={960} y2={1080} p={ramp(f, 0, 8, ease.snap)} t={2} color="rgba(227,210,144,0.5)" />
			<MediaSlot id="sharedGoalA" clip="view" playhead={f - b(1)} {...WIN_A} radius={30} style={{clipPath: `inset(${(1 - openA) * 100}% 0 0 0 round 30px)`}} />
			<MediaSlot id="sharedGoalB" clip="view" playhead={f - b(2.75)} {...WIN_B} radius={30} style={{clipPath: `inset(0 0 ${(1 - openB) * 100}% 0 round 30px)`}} />
			{f >= b(1) && <Label x={WIN_A.x} y={48} size={20}>Person A</Label>}
			{f >= b(2.75) && <Label x={WIN_B.x + WIN_B.w} y={48} size={20} align="right">Person B</Label>}
			<Line x1={LA} y1={LY} x2={LB} y2={LY} p={link} t={3} />
			{dotX !== null && <Dot x={dotX} y={LY} r={11} />}
			{EXCHANGE.map(([beat, who, i, r]) => (
				<React.Fragment key={beat}>
					<Card f={f} at={b(beat)} r={r} i={i} set={who} enter={who === 'a' ? 'wipeD' : 'wipeR'} dur={6} border />
					{f >= b(beat) + 4 && (
						<Label x={r.x} y={r.y + r.h + 12} size={15}>
							{who === 'a' ? 'A' : 'B'} — checked in
						</Label>
					)}
				</React.Fragment>
			))}
		</AbsoluteFill>
	);
};
