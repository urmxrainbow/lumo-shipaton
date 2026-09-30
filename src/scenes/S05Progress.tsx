/**
 * 06 · SEE HOW FAR YOU'VE COME — progress.jpg as a product beauty shot.
 *
 * One check-in becomes part of your visual progress: the shot opens on a
 * single photo check-in (today's, ringed in the real calendar) at the centre
 * of the frame, where "Every check-in means something." just was. It flies
 * home into the calendar while the mask opens around it to the whole
 * Insights screen. Then a slow push (1.00 → 1.04). Nothing covers the UI.
 *
 * This is the ONLY appearance of progress.jpg in the film: it enters and
 * leaves inside this scene and is never shown again.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot, cropGeom} from '../components/MediaSlot';
import {Headline, Reveal} from '../components/type';
import {Box, ease, mix, ramp} from '../lib/anim';

// the window matches the screenshot's width; it frames the header through the calendar
export const PROGRESS_SHOT: Box = {x: 1000, y: 49, w: 600, h: 982};
export const PROGRESS_RAD = 48;
export const PROGRESS_CROP: Crop = {x: 0.5, y: 0.47, zoom: 1};

/** Calendar cells in progress.jpg (normalised source coords). */
export const CELL = {
	today: {x0: 0.447, x1: 0.555, y0: 0.795, y1: 0.862}, // 27 · ringed in the UI
};
type Cell = (typeof CELL)[keyof typeof CELL];

/** A calendar cell's box on screen, for a Progress window at `win`. */
export const cellBox = (win: Box, c: Cell): Box => {
	const g = cropGeom('progress', win.w, win.h, PROGRESS_CROP);
	return {x: win.x + g.left + c.x0 * g.cw, y: win.y + g.top + c.y0 * g.ch, w: (c.x1 - c.x0) * g.cw, h: (c.y1 - c.y0) * g.ch};
};

const OPEN = {from: 12, to: 40};

export const S05Progress: React.FC = () => {
	const f = useCurrentFrame();
	const {durationInFrames: dur} = useVideoConfig();
	// it leaves at the end of this scene — used once, then the film moves on
	const exit = ramp(f, dur - 16, dur - 1, ease.in);

	// the single check-in, then the mask opens around it
	const cell = cellBox({...PROGRESS_SHOT, x: 0, y: 0}, CELL.today);
	const appear = ramp(f, 0, 8, ease.out);
	const open = ramp(f, OPEN.from, OPEN.to, ease.inOut);
	const S = 3.4; // the cell starts large, centred
	const cx = PROGRESS_SHOT.x + cell.x + cell.w / 2;
	const cy = PROGRESS_SHOT.y + cell.y + cell.h / 2;
	const s = mix(S, 1, open);
	const dx = mix(960 - cx, 0, open);
	const dy = mix(540 - cy, 0, open);
	const W = PROGRESS_SHOT.w;
	const H = PROGRESS_SHOT.h;
	const inset = [cell.y, W - cell.x - cell.w, H - cell.y - cell.h, cell.x].map((v) => mix(v, 0, open));
	const round = mix(14, PROGRESS_RAD, open);

	return (
		<AbsoluteFill>
			<div style={{position: 'absolute', inset: 0, opacity: 1 - exit, transform: `scale(${mix(1, 0.96, exit)})`, transformOrigin: '1300px 540px'}}>
			<div
				style={{
					position: 'absolute',
					inset: 0,
					opacity: appear,
					transform: `translate(${dx}px, ${dy}px) scale(${s * mix(0.94, 1, appear)})`,
					transformOrigin: `${cx}px ${cy}px`,
				}}
			>
				<MediaSlot
					id="progress"
					clip="shot"
					playhead={f}
					{...PROGRESS_SHOT}
					crop={PROGRESS_CROP}
					radius={PROGRESS_RAD}
					style={{
						clipPath: `inset(${inset.map((v) => `${v}px`).join(' ')} round ${round}px)`,
						boxShadow: open > 0.9 ? HAIRLINE : undefined,
					}}
				/>
			</div>
			</div>
			<Headline x={200} y={400} size={120}>
				<Reveal p={ramp(f, OPEN.to - 8, OPEN.to + 6)} out={exit} rise={30}>
					See how far
				</Reveal>
				<Reveal p={ramp(f, OPEN.to - 4, OPEN.to + 10)} out={exit} rise={30}>
					you’ve come.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
