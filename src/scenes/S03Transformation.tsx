/**
 * S03 · THE FIRST TRANSFORMATION — the drop.
 * dot → circle mask → full-bleed memory → a line cuts it → it becomes
 * the first card of an editorial collage → THIS IS 30 DAYS.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Card, Enter} from '../components/Card';
import {Block, Corners, Dot, Label, Line} from '../components/geo';
import {Memory, dayOf} from '../components/Memory';
import {MaskLine} from '../components/type';
import {COLLAGE} from '../layouts';
import {ease, mix, ramp} from '../lib/anim';
import {C} from '../theme';

/** [collage index, beat, entrance] — accents, not every beat. */
export const S03_ENTRANCES: [number, number, Enter][] = [
	[1, 3, 'wipeD'],
	[3, 3.5, 'slideR'],
	[4, 4, 'punch'],
	[2, 5, 'circle'],
	[9, 5.5, 'pushU'],
	[5, 6, 'pop'],
	[6, 6.25, 'pop'],
	[7, 7, 'wipeL'],
	[8, 7.25, 'wipeL'],
	[10, 8, 'wipeD'],
	[11, 8.2, 'cut'],
	[12, 8.4, 'cut'],
	[13, 8.6, 'wipeR'],
];

const MASK_Y = 470;

export const S03Transformation: React.FC = () => {
	const f = useCurrentFrame();
	const DOT = {x: 960, y: 700};

	// 1 · dot → circle mask revealing memory 01 full-bleed
	const iris = ramp(f, 0, 12, ease.inOut);
	const irisR = mix(16, 1250, iris);

	// 2 · a line slices across; the photo snaps down into its collage card
	const slice = ramp(f, b(1.75), b(1.75) + 7, ease.snap);
	const shrink = ramp(f, b(2), b(2) + 9, ease.snap);
	const c0 = COLLAGE[0];
	const r0 = {
		x: mix(0, c0.x, shrink),
		y: mix(0, c0.y, shrink),
		w: mix(1920, c0.w, shrink),
		h: mix(1080, c0.h, shrink),
	};

	// 3 · THIS IS 30 DAYS — collage dims on the downbeat (hard, not faded)
	const title = b(12);
	const dim = f >= title ? 0.34 : 1;
	const t1 = ramp(f, title, title + 8);
	const t2 = ramp(f, title + 4, title + 13);

	// progress path through the collage gap
	const path = ramp(f, b(9), b(9) + 14, ease.inOut);

	return (
		<AbsoluteFill>
			{/* memory 01 */}
			<div
				style={{
					position: 'absolute',
					left: r0.x,
					top: r0.y,
					width: r0.w,
					height: r0.h,
					clipPath: f < 12 ? `circle(${irisR}px at ${DOT.x}px ${DOT.y}px)` : undefined,
					filter: dim < 1 ? `brightness(${dim})` : undefined,
					overflow: 'hidden',
				}}
			>
				<Memory i={0} w={r0.w} h={r0.h} zoom={mix(1.12, 1, ramp(f, 0, b(2)))} />
			</div>
			{f < 12 && <Dot x={DOT.x} y={DOT.y} r={irisR} ring={3} />}
			{f >= b(0.5) && f < b(2) && (
				<Label x={80} y={1000} size={22} color={C.lumo}>
					Day 01
				</Label>
			)}

			{/* the slicing line becomes the top edge of the collage row */}
			{f >= b(1.75) && f < b(3) && (
				<Line x1={0} y1={c0.y} x2={1920} y2={c0.y} p={slice} t={4} />
			)}

			{S03_ENTRANCES.map(([ci, beat, enter]) => (
				<Card key={ci} f={f} at={b(beat)} r={COLLAGE[ci]} i={ci} enter={enter} dim={dim} />
			))}

			{/* editorial marks */}
			{f >= b(2.5) && f < title && (
				<Corners x={c0.x} y={c0.y} w={c0.w} h={c0.h} gap={14} p={ramp(f, b(2.5), b(2.5) + 6)} />
			)}
			{f >= b(9) && f < title && (
				<>
					<Line x1={80} y1={740} x2={1840} y2={740} p={path} t={2} />
					{[0, 2, 9, 4].map((ci, k) => {
						const at = b(9) + 4 + k * 3;
						return f >= at ? (
							<React.Fragment key={ci}>
								<Dot x={COLLAGE[ci].x + 14} y={740} r={6} />
								<Label x={COLLAGE[ci].x + 28} y={750} size={15}>
									Day {dayOf([0, 3, 11, 22][k])}
								</Label>
							</React.Fragment>
						) : null;
					})}
				</>
			)}

			{/* THIS IS / 30 DAYS. — a black block masks the lower collage, its edge a Lumo line */}
			{f >= title && (
				<>
					<Block x={0} y={MASK_Y} w={1560} h={1080 - MASK_Y} p={ramp(f, title, title + 6, ease.snap)} color={C.black} />
					<Line x1={0} y1={MASK_Y} x2={1560} y2={MASK_Y} p={ramp(f, title, title + 6, ease.snap)} t={3} />
				</>
			)}
			{f >= title && (
				<div style={{position: 'absolute', left: 90, top: MASK_Y + 40}}>
					<MaskLine p={t1} size={120}>
						This is
					</MaskLine>
					<MaskLine p={t2} size={290} color={C.lumo} width={108}>
						30 days.
					</MaskLine>
				</div>
			)}
		</AbsoluteFill>
	);
};
