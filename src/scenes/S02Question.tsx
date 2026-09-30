/** S02 · THE QUESTION — the number is "just a number"… then silence. */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Block, Dot, Line} from '../components/geo';
import {MaskLine} from '../components/type';
import {NUM} from '../components/NumberComposition';
import {C} from '../theme';
import {ease, mix, pop, ramp} from '../lib/anim';

const X = 120;
const SIZE = 190;
const LINE_H = SIZE * 0.92;
const TOP = 170;

export const S02Question: React.FC = () => {
	const f = useCurrentFrame();

	// 1 · the DAY STREAK rule stretches into a full-width baseline
	const stretch = ramp(f, 0, 6, ease.snap);
	const ruleL = mix(NUM.cx - NUM.ruleW / 2, X, stretch);
	const ruleR = mix(NUM.cx + NUM.ruleW / 2, 1920 - X, stretch);
	const ruleY = mix(NUM.ruleY, TOP + LINE_H * 3 + 30, stretch);

	// 2 · three lines rise off it
	const l1 = ramp(f, 4, 13);
	const l2 = ramp(f, 8, 17);
	const l3 = ramp(f, 12, 21);

	// 3 · highlight block wipes behind NUMBER. on the beat
	const hi = ramp(f, b(3), b(3) + 6, ease.snap);

	// 4 · the block takes over the frame, collapses to a line, to a dot
	const fill = ramp(f, b(5), b(5) + 8, ease.snap);
	const collapseY = ramp(f, b(6), b(6) + 7, ease.snap);
	const collapseX = ramp(f, b(6) + 7, b(6) + 15, ease.snap);
	const inQuestion = f >= b(6) + 15;

	// NUMBER. highlight geometry
	const hx = X - 20;
	const hy = TOP + LINE_H * 2 + 6;
	const hw = 1110;
	const hh = LINE_H - 4;

	if (f >= b(6)) {
		// collapse phase + question
		const bandH = mix(1080, 4, collapseY);
		const bandW = mix(1920, 0, collapseX);
		const qa = ramp(f, b(7.5), b(7.5) + 8);
		const qb = ramp(f, b(8), b(8) + 8);
		const qOut = f >= b(11.25);
		const dotR = f >= b(11.25) ? mix(6, 16, pop(f, b(11.25))) : pop(f, b(9.5)) * 6;
		return (
			<AbsoluteFill>
				{!inQuestion && <Block x={960 - bandW / 2} y={540 - bandH / 2} w={Math.max(bandW, 4)} h={bandH} />}
				{inQuestion && (
					<>
						{!qOut && (
							<div style={{position: 'absolute', left: 0, right: 0, top: 400, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
								<MaskLine p={qa} size={96}>But what did</MaskLine>
								<MaskLine p={qb} size={96}>
									it look like<span style={{color: C.lumo}}>?</span>
								</MaskLine>
							</div>
						)}
						<Dot x={960} y={700} r={dotR} />
					</>
				)}
			</AbsoluteFill>
		);
	}

	return (
		<AbsoluteFill>
			<div style={{position: 'absolute', left: X, top: TOP}}>
				<MaskLine p={l1} size={SIZE}>A streak</MaskLine>
				<MaskLine p={l2} size={SIZE}>is just a</MaskLine>
			</div>
			{/* highlight block behind NUMBER. */}
			<Block x={hx} y={hy} w={hw} h={hh} p={hi} dir="l" />
			<div style={{position: 'absolute', left: X, top: TOP + LINE_H * 2}}>
				<MaskLine p={l3} size={SIZE} color={hi > 0.5 ? C.black : C.white}>
					Number.
				</MaskLine>
			</div>
			<Line x1={ruleL} y1={ruleY} x2={ruleR} y2={ruleY} t={3} />
			{/* the highlight block expands to take the frame */}
			{fill > 0 && (
				<Block
					x={mix(hx, 0, fill)}
					y={mix(hy, 0, fill)}
					w={mix(hw, 1920, fill)}
					h={mix(hh, 1080, fill)}
				/>
			)}
		</AbsoluteFill>
	);
};
