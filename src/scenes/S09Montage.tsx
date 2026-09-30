/**
 * S09 · PRODUCT FLEX — CREATE. CAPTURE. PROGRESS. SHARE. REMEMBER.
 * One shot per beat. Words and full-frame UI alternate; #E3D290 blocks
 * wipe between some of them. UI fills the frame — no centred phone.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {BEAT} from '../beats';
import {Block, Line} from '../components/geo';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {Big} from '../components/type';
import {ease, mix, pop, ramp} from '../lib/anim';
import {C} from '../theme';

const FULL = {x: 0, y: 0, w: 1920, h: 1080};

const Shot: React.FC<{k: number; f: number}> = ({k, f}) => {
	const slide = ramp(f, 0, 5, ease.out);
	switch (k) {
		case 0:
			return <Big x={mix(-900, -30, slide)} y={330} size={400} color={C.lumo} width={120}>Create.</Big>;
		case 1:
			return <MediaSlot id="createGoal" clip="typing" playhead={f + 12} {...FULL} crop={{x: 0.5, y: 0.44, zoom: 1.25}} />;
		case 2:
			return <Big x={mix(2800, 1960, slide)} y={330} size={400} align="right" width={120}>Capture.</Big>;
		case 3:
			return <MediaSlot id="photoCheckin" clip="capture" playhead={f + 10} {...FULL} />;
		case 4:
			return (
				<>
					<Block x={0} y={0} w={1920} h={1080} p={ramp(f, 0, 4, ease.snap)} dir="d" />
					<Big x={960} y={370} size={330} color={C.black} align="center" width={110} style={{transform: `translateX(-50%) scale(${mix(1.12, 1, pop(f, 2))})`}}>
						Progress.
					</Big>
				</>
			);
		case 5:
			return <MediaSlot id="progress" clip="scroll" playhead={f * 3} {...FULL} crop={{x: 0.5, y: 0.5, zoom: 1.15}} />;
		case 6:
			return <Big x={960} y={mix(-400, -60, slide)} size={560} color={C.lumo} align="center" width={125}>Share.</Big>;
		case 7:
			return (
				<>
					<MediaSlot id="sharedGoalA" clip="view" playhead={f} x={0} y={0} w={958} h={1080} />
					<MediaSlot id="sharedGoalB" clip="view" playhead={f} x={962} y={0} w={958} h={1080} />
					<Line x1={960} y1={0} x2={960} y2={1080} t={4} p={ramp(f, 0, 5)} />
				</>
			);
		case 8:
			return (
				<>
					<Big x={100} y={380} size={300} width={112}>Remember.</Big>
					<Line x1={110} y1={700} x2={1800} y2={700} t={6} p={ramp(f, 2, 10, ease.inOut)} />
				</>
			);
		default: {
			// the whole memory wall, snapping in
			const cols = 8;
			const rows = 4;
			const w = 1920 / cols;
			const h = 1080 / rows;
			return (
				<>
					{Array.from({length: cols * rows}, (_, i) => {
						const at = (i * 7) % 11;
						if (f < at * 0.8) return null;
						return (
							<div key={i} style={{position: 'absolute', left: (i % cols) * w, top: Math.floor(i / cols) * h, width: w - 4, height: h - 4}}>
								<Memory i={i % 30} w={w - 4} h={h - 4} bare />
							</div>
						);
					})}
				</>
			);
		}
	}
};

export const S09Montage: React.FC = () => {
	const f = useCurrentFrame();
	const k = Math.min(9, Math.floor(f / BEAT));
	const g = f - k * BEAT;
	// #E3D290 wipes on a few boundaries (alternating direction)
	const wipes: [number, 'l' | 'r'][] = [
		[2, 'l'],
		[6, 'r'],
		[8, 'l'],
	];
	return (
		<AbsoluteFill>
			<Shot k={k} f={g} />
			{wipes.map(([at, dir]) => {
				const t0 = at * BEAT;
				if (f < t0 - 4 || f >= t0 + 4) return null;
				const cover = f < t0;
				const p = cover ? ramp(f, t0 - 4, t0, ease.snap) : 1 - ramp(f, t0, t0 + 4, ease.snap);
				const d = cover ? dir : dir === 'l' ? 'r' : 'l';
				return <Block key={at} x={0} y={0} w={1920} h={1080} p={p} dir={d} />;
			})}
		</AbsoluteFill>
	);
};
