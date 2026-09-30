/**
 * S04 · LUMO REVEAL — the collage collapses into the real Progress UI.
 * The memories physically fly into the grid of the Progress window:
 * "these moments live inside Lumo".
 */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Block, Corners, Frame, Line} from '../components/geo';
import {MediaSlot} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {MaskLine} from '../components/type';
import {COLLAGE, Rect} from '../layouts';
import {brand} from '../lib/media';
import {ease, mix, pop, ramp} from '../lib/anim';
import {C, mono} from '../theme';

export const REVEAL_SLOT: Rect = {x: 1290, y: 70, w: 430, h: 940};

/** Where each collage card lands: a 3-column grid inside the window. */
const tile = (i: number): Rect => {
	const pad = 18;
	const gap = 8;
	const s = (REVEAL_SLOT.w - pad * 2 - gap * 2) / 3;
	const col = i % 3;
	const row = Math.floor(i / 3);
	return {x: REVEAL_SLOT.x + pad + col * (s + gap), y: REVEAL_SLOT.y + 240 + row * (s + gap), w: s, h: s};
};

export const S04LumoReveal: React.FC = () => {
	const f = useCurrentFrame();
	const S = REVEAL_SLOT;

	const open = ramp(f, 14, 24, ease.snap);
	const border = ramp(f, 8, 20, ease.inOut);

	const iconS = pop(f, b(1.5));
	const w1 = ramp(f, b(1.75), b(1.75) + 10);
	const tag = ramp(f, b(2.75), b(2.75) + 8);
	const under = ramp(f, b(3), b(3) + 12, ease.inOut);

	// exit: block wipes in from the right to hand over to the core loop
	const exit = ramp(f, b(7.25), b(8), ease.snap);

	return (
		<AbsoluteFill>
			{/* the Progress window opens top → bottom behind the arriving cards */}
			<MediaSlot
				id="progress"
				clip="hold"
				playhead={f - 14}
				{...S}
				radius={34}
				style={{clipPath: `inset(0 0 ${(1 - open) * 100}% 0 round 34px)`}}
			/>
			<Frame x={S.x - 12} y={S.y - 12} w={S.w + 24} h={S.h + 24} p={border} t={2} />
			{f >= 20 && <Corners x={S.x} y={S.y} w={S.w} h={S.h} gap={30} len={34} t={3} p={ramp(f, 20, 28)} />}

			{/* memories fly into the grid, then are absorbed by the UI */}
			{f < 26 &&
				COLLAGE.map((r, i) => {
					const t = ramp(f, i * 0.7, i * 0.7 + 13, ease.inOut);
					const to = tile(i);
					const rr = {x: mix(r.x, to.x, t), y: mix(r.y, to.y, t), w: mix(r.w, to.w, t), h: mix(r.h, to.h, t)};
					return (
						<div key={i} style={{position: 'absolute', left: rr.x, top: rr.y, width: rr.w, height: rr.h, opacity: f >= 22 ? 0 : 1}}>
							<Memory i={i} w={rr.w} h={rr.h} bare={t > 0.5} />
						</div>
					);
				})}

			{/* LUMO */}
			{f >= b(1.5) && (
				<Img
					src={brand.icon}
					style={{position: 'absolute', left: 104, top: 220, width: 132, height: 132, transform: `scale(${iconS})`, transformOrigin: '0% 100%'}}
				/>
			)}
			<div style={{position: 'absolute', left: 90, top: 380}}>
				<MaskLine p={w1} size={250} color={C.lumo} width={118}>
					Lumo
				</MaskLine>
			</div>
			<div
				style={{
					position: 'absolute',
					left: 104,
					top: 700,
					color: C.white,
					...mono(34, 500),
					letterSpacing: '0.3em',
					clipPath: `inset(0 ${(1 - tag) * 100}% 0 0)`,
				}}
			>
				A social habit tracker
			</div>
			<Line x1={104} y1={772} x2={1060} y2={772} p={under} t={3} />

			<Block x={1920 - exit * 1920} y={0} w={1920} h={1080} p={exit > 0 ? 1 : 0} />
		</AbsoluteFill>
	);
};
