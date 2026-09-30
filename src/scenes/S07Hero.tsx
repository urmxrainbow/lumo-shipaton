/**
 * 08 · 30 DAYS → 30 MEMORIES — the payoff, locked to the track's break.
 *
 * BREAK: "30 days." — huge, alone. A #E3D290 circle appears inside the 0
 * and grows through the frame, ABOVE everything, so the screen is clean
 * #E3D290 exactly on the RE-ENTRY. Held. Then memories not seen before
 * (memoryManifest 'hero') grow out of the yellow until they ARE the frame;
 * the camera pulls back. With no unseen photo left, the real month of
 * photo check-ins (the calendar in progress.jpg) plays that part — no
 * photo is repeated. On the next phrase: "30 memories." — the type carries
 * the 30.
 */
import React from 'react';
import {AbsoluteFill, Easing, useCurrentFrame} from 'remotion';
import {HIT, beats as b} from '../beats';
import {Memory} from '../components/Memory';
import {Reveal} from '../components/type';
import {memoriesFor} from '../memoryManifest';
import {MediaSlot} from '../components/MediaSlot';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

const PUSH = Easing.bezier(0.6, 0, 0.9, 0.45);
const SIZE = 320;

// the row of real memories (same rhythm as the memory build)
const CW = 300; // with a single photo the card lands larger (see cw)
const CH = CW * (16 / 9);
const GAP = 30;
const cell = (k: number, n: number, cw: number, ch: number) => {
	const total = n * cw + (n - 1) * GAP;
	return {x: 960 - total / 2 + k * (cw + GAP), y: 540 - ch / 2};
};

/** The month of real check-ins inside progress.jpg — the calendar alone. */
const MONTH = {size: 780, crop: {x: 0.5, y: 0.675, zoom: 1.12}, radius: 28};

/** One tile of the reveal: an unseen memory, or (none left) the real month. */
const Tile: React.FC<{name?: string; w: number; h: number; radius: number}> = ({name, w, h, radius}) =>
	name ? (
		<Memory name={name} w={w} h={h} radius={radius} />
	) : (
		<MediaSlot id="progress" clip="shot" playhead={999} x={0} y={0} w={w} h={h} crop={MONTH.crop} radius={radius} />
	);

export const S07Hero: React.FC = () => {
	const f = useCurrentFrame();
	const photos = memoriesFor('hero');
	const month = photos.length === 0;
	const N = Math.max(1, photos.length);
	const cw = month ? MONTH.size : N === 1 ? 440 : CW;
	const ch = month ? MONTH.size : cw * (CH / CW);
	const w0 = 300; // the card that grows out of the yellow
	const h0 = w0 * (ch / cw);
	const reentry = at('hero', HIT.reentry);
	const land = at('hero', HIT.thirtyMemories);
	const end = at('hero', HIT.silence);

	// "30 days." and the portal in its 0
	const days = ramp(f, 0, 10);
	const seed = ramp(f, reentry - b(2), reentry - b(2) + 8, ease.out);
	const push = ramp(f, reentry - b(1.25), reentry, PUSH);
	const portalScale = seed * mix(1, 52, push);

	// the yellow boundary → the first tile grows out of it → the world
	const held = reentry + 12;
	const grow = ramp(f, held, held + 22, ease.inOut);
	const world = held + 22;
	const c0 = cell(0, N, cw, ch);
	const zFull = Math.max(1920 / cw, 1080 / ch);
	const pull = ramp(f, world, land - 8, ease.inOut);
	const fx = mix(c0.x + cw / 2, 960, pull);
	const fy = mix(c0.y + ch / 2, 540, pull);
	const scale = Math.exp(mix(Math.log(zFull), Math.log(1), pull)) * mix(1, 0.94, ramp(f, land, end, ease.inOut));
	const dim = mix(1, 0.22, ramp(f, land - 6, land + 10, ease.inOut));
	const out = ramp(f, end - 12, end, ease.in);

	return (
		<AbsoluteFill>
			{/* ——— the memory world ——— */}
			{f >= world && (
				<div style={{position: 'absolute', inset: 0, opacity: 1 - out}}>
					<div
						style={{
							position: 'absolute',
							inset: 0,
							transform: `translate(${960 - fx}px, ${540 - fy}px) scale(${scale})`,
							transformOrigin: `${fx}px ${fy}px`,
							opacity: dim,
						}}
					>
						{Array.from({length: N}, (_, k) => {
							const t = k === 0 ? world : mix(world + 30, land - 30, Math.pow((k - 1) / Math.max(1, N - 2), 0.8));
							if (f < t) return null;
							const p = k === 0 ? 1 : ramp(f, t, t + 16);
							const c = cell(k, N, cw, ch);
							return (
								<div
									key={k}
									style={{position: 'absolute', left: c.x, top: c.y, width: cw, height: ch, opacity: p, transform: `scale(${mix(0.95, 1, p)})`}}
								>
									<Tile name={photos[k]} w={cw} h={ch} radius={mix(0, month ? MONTH.radius : 16, pull)} />
								</div>
							);
						})}
					</div>
				</div>
			)}

			{/* ——— the yellow boundary, then the first tile grows out of it ——— */}
			{f >= reentry && f < world && (
				<AbsoluteFill style={{background: C.lumo}}>
					{grow > 0 && (
						<div
							style={{
								position: 'absolute',
								left: mix(960 - w0 / 2, 960 - (cw * zFull) / 2, grow),
								top: mix(540 - h0 / 2, 540 - (ch * zFull) / 2, grow),
								width: mix(w0, cw * zFull, grow),
								height: mix(h0, ch * zFull, grow),
								borderRadius: mix(16, 0, grow),
								overflow: 'hidden',
							}}
						>
							<Tile name={photos[0]} w={mix(w0, cw * zFull, grow)} h={mix(h0, ch * zFull, grow)} radius={0} />
						</div>
					)}
				</AbsoluteFill>
			)}

			{/* ——— 30 days. with a portal in the 0 (the portal paints above everything) ——— */}
			{f < reentry && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: C.white,
						...display(SIZE, 500),
						opacity: days,
						transform: `translateY(${(1 - days) * 30}px)`,
					}}
				>
					<span>3</span>
					<span style={{position: 'relative', display: 'inline-block'}}>
						0
						{seed > 0 && (
							<span
								style={{
									position: 'absolute',
									left: '50%',
									top: '52%',
									width: SIZE * 0.2,
									height: SIZE * 0.2,
									marginLeft: -SIZE * 0.1,
									marginTop: -SIZE * 0.1,
									borderRadius: '50%',
									background: C.lumo,
									transform: `scale(${portalScale})`,
									zIndex: 10,
								}}
							/>
						)}
					</span>
					<span style={{position: 'relative', zIndex: 1}}>&nbsp;days.</span>
				</div>
			)}

			{/* ——— 30 memories. — the payoff, a campaign frame ——— */}
			<div
				style={{
					position: 'absolute',
					inset: 0,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Reveal p={ramp(f, land, land + 12)} out={out} rise={40}>
					<div style={{...display(430, 600), lineHeight: 0.92, color: C.white, textAlign: 'center'}}>30</div>
				</Reveal>
				<Reveal p={ramp(f, land + 4, land + 16)} out={out} rise={40}>
					<div style={{...display(330, 600), lineHeight: 0.98, color: C.lumo, textAlign: 'center'}}>memories.</div>
				</Reveal>
			</div>
		</AbsoluteFill>
	);
};
