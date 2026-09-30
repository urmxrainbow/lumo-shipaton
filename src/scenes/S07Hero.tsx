/**
 * S07 · THE SIGNATURE MOMENT.
 * BUILD: memories escape the Progress window, tethered by #E3D290 lines,
 *        while the camera pulls back to reveal the UI surrounded by life.
 * STOP:  everything freezes. 30 DAYS.
 * TURN:  a block wipes DAYS. → MEMORIES. Hold. PROGRESS YOU CAN ACTUALLY SEE.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Block, Corners, Label, Line} from '../components/geo';
import {MediaSlot} from '../components/MediaSlot';
import {Memory, dayOf} from '../components/Memory';
import {HERO_RING, HERO_SLOT, Rect} from '../layouts';
import {ease, mix, ramp} from '../lib/anim';
import {C, display, mono} from '../theme';

/** Emergence schedule: [beat, how many new memories]. Accelerates. */
const WAVES: [number, number][] = [
	[1, 1],
	[3, 2],
	[5, 2],
	[6, 3],
	[7, 4],
	[8, 4],
	[9, 5],
	[10, 4],
	[10.5, 3],
	[11, 2],
];
const STOP = b(12); // bar 23 — the break
const TURN = b(16); // bar 24 — DAYS → MEMORIES
const SUB = b(18);

const EMERGE: number[] = (() => {
	const out: number[] = [];
	WAVES.forEach(([beat, n]) => {
		for (let j = 0; j < n; j++) out.push(b(beat) + j * Math.max(1, 4 - Math.floor(beat / 3)));
	});
	return out;
})();

/** Launch point inside the Progress window (a tile of its grid). */
const launch = (i: number): Rect => {
	const S = HERO_SLOT;
	const col = i % 3;
	const row = Math.floor(i / 3) % 5;
	const s = 110;
	return {x: S.x + 30 + col * (s + 20), y: S.y + 250 + row * (s + 20), w: s, h: s};
};

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();
	const frozen = f >= STOP;
	const ff = Math.min(f, STOP - 1); // the build freezes at STOP

	// camera: starts pushed in on the UI, pulls back as memories pile up
	const cam = mix(1.42, 0.86, ramp(ff, 0, STOP - 4, ease.inOut));
	const S = HERO_SLOT;
	const ocx = S.x + S.w / 2;
	const ocy = S.y + S.h / 2;

	const open = ramp(f, 0, 10, ease.snap);
	const dim = frozen ? 0.26 : 1;

	const words = f >= TURN + 8 ? 'Memories.' : 'Days.';
	const wipeIn = ramp(f, TURN, TURN + 7, ease.snap);
	const wipeOut = ramp(f, TURN + 8, TURN + 15, ease.snap);

	return (
		<AbsoluteFill>
			{/* ——— stage (camera) ——— */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					transform: `scale(${cam})`,
					transformOrigin: `${ocx}px ${ocy}px`,
					filter: dim < 1 ? `brightness(${dim})` : undefined,
				}}
			>
				<MediaSlot
					id="progress"
					clip="scroll"
					playhead={ff}
					{...S}
					radius={36}
					style={{clipPath: `inset(${(1 - open) * 50}% 0 ${(1 - open) * 50}% 0 round 36px)`}}
				/>
				{!frozen && <Corners x={S.x} y={S.y} w={S.w} h={S.h} gap={26} len={40} t={3 / cam} p={ramp(f, 8, 16)} />}

				{HERO_RING.map((to, i) => {
					const at = EMERGE[i];
					if (at === undefined || ff < at) return null;
					const t = ramp(ff, at, at + 11, ease.out);
					const from = launch(i);
					const r = {x: mix(from.x, to.x, t), y: mix(from.y, to.y, t), w: mix(from.w, to.w, t), h: mix(from.h, to.h, t)};
					// tether from the window edge to the photo
					const ex = to.x + to.w / 2 < ocx ? S.x : S.x + S.w;
					const ey = Math.max(S.y + 60, Math.min(S.y + S.h - 60, r.y + r.h / 2));
					const px = to.x + to.w / 2 < ocx ? r.x + r.w : r.x;
					return (
						<React.Fragment key={i}>
							{!frozen && <Line x1={ex} y1={ey} x2={px} y2={r.y + r.h / 2} t={2 / cam} p={ramp(ff, at, at + 8)} />}
							<div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h}}>
								<Memory i={i} w={r.w} h={r.h} bare={i > 5} />
							</div>
							{i < 6 && t >= 1 && !frozen && (
								<Label x={r.x} y={r.y + r.h + 12} size={16 / cam}>
									Day {dayOf(i)}
								</Label>
							)}
						</React.Fragment>
					);
				})}
			</div>

			{/* ——— STOP ——— */}
			{frozen && (
				<>
					<div style={{position: 'absolute', left: 104, top: 96, color: C.lumo, ...display(900, 112), fontSize: 430}}>30</div>
					<div style={{position: 'absolute', left: 110, top: 488, overflow: 'hidden'}}>
						<div style={{color: C.lumo, ...display(900, 104), fontSize: 250, whiteSpace: 'nowrap'}}>{words}</div>
					</div>
					{/* the wipe that turns DAYS into MEMORIES */}
					{f >= TURN && f < TURN + 16 && (
						<Block
							x={96}
							y={500}
							w={1740}
							h={228}
							p={wipeOut > 0 ? 1 - wipeOut : wipeIn}
							dir={wipeOut > 0 ? 'r' : 'l'}
						/>
					)}
					{f >= SUB && (
						<>
							<div
								style={{
									position: 'absolute',
									left: 116,
									top: 800,
									color: C.white,
									...mono(30, 500),
									letterSpacing: '0.3em',
									clipPath: `inset(0 ${(1 - ramp(f, SUB, SUB + 10)) * 100}% 0 0)`,
								}}
							>
								Progress you can actually see.
							</div>
							<Line x1={116} y1={862} x2={1130} y2={862} p={ramp(f, SUB + 4, SUB + 20, ease.inOut)} t={3} />
						</>
					)}
					<Corners x={60} y={60} w={1800} h={960} len={40} t={3} p={1} />
				</>
			)}
		</AbsoluteFill>
	);
};
