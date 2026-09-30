/**
 * S05 · HOW LUMO WORKS — CREATE A GOAL / CAPTURE IT / KEEP GOING / LOOK BACK.
 * Each phrase is one composition where type, #E3D290 geometry and a
 * video window share the frame. Every window hands off to the next.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Block, Corners, Dot, Label, Line} from '../components/geo';
import {Crop, MediaSlot, clipFrames, mixCrop, slotPoint} from '../components/MediaSlot';
import {Memory} from '../components/Memory';
import {MaskLine} from '../components/type';
import {Rect} from '../layouts';
import {ease, mix, pop, ramp} from '../lib/anim';
import {C} from '../theme';

const PART = b(6); // each phrase = 1.5 bars

/** Headline block: small label + two display lines, masked in and out. */
const Head: React.FC<{
	f: number;
	x: number;
	y: number;
	label: string;
	l1: string;
	l2: string;
	accent2?: boolean;
	out: number;
	size?: number;
}> = ({f, x, y, label, l1, l2, accent2, out, size = 172}) => (
	<>
		<Label x={x + 6} y={y - 60} size={20} style={{clipPath: `inset(0 ${(1 - ramp(f, 2, 10)) * 100}% 0 0)`}}>
			{label}
		</Label>
		<div style={{position: 'absolute', left: x, top: y}}>
			<MaskLine p={ramp(f, 3, 12)} out={out} size={size}>
				{l1}
			</MaskLine>
			<MaskLine p={ramp(f, 7, 16)} out={out} size={size} color={accent2 ? C.lumo : C.white}>
				{l2}
			</MaskLine>
		</div>
	</>
);

/** Expanding tap ring — marks a real tap in the footage. */
const Tap: React.FC<{f: number; at: number; x: number; y: number}> = ({f, at, x, y}) => {
	if (f < at || f > at + 12) return null;
	const t = ramp(f, at, at + 12);
	return <Dot x={x} y={y} r={mix(14, 110, t)} ring={Math.max(1, 6 * (1 - t))} />;
};

// ——— A · CREATE A GOAL (real: create-goal.mov) ———
const WA: Rect = {x: 1000, y: 0, w: 920, h: 1080};
const A_CROP = {
	form: {x: 0.5, y: 0.3, zoom: 1},
	field: {x: 0.5, y: 0.44, zoom: 1.6},
	button: {x: 0.5, y: 0.6, zoom: 1.75},
} satisfies Record<string, Crop>;

const PartA: React.FC<{f: number}> = ({f}) => {
	const tTyping = 10;
	const tTap = tTyping + clipFrames('createGoal', 'typing') + 2;
	const clip = f < tTyping ? 'openForm' : f < tTap ? 'typing' : 'tapCreate';
	const playhead = clip === 'openForm' ? f : clip === 'typing' ? f - tTyping : f - tTap;
	let crop = mixCrop(A_CROP.form, A_CROP.field, ramp(f, 6, 16, ease.inOut));
	crop = mixCrop(crop, A_CROP.button, ramp(f, tTap - 6, tTap + 4, ease.inOut));
	const tapAt = tTap + 7;
	const btn = slotPoint('createGoal', WA, crop, 0.5, 0.6);

	const reveal = ramp(f, 0, 9, ease.snap); // covering block retracts to the left
	const exit = ramp(f, b(5.25), b(6), ease.snap); // window folds into its left edge
	return (
		<>
			<MediaSlot
				id="createGoal"
				clip={clip}
				playhead={playhead}
				{...WA}
				style={{transform: `scaleX(${1 - exit})`, transformOrigin: '0% 50%'}}
			/>
			<Tap f={f} at={tapAt} x={btn.x} y={btn.y} />
			{f >= tapAt && f < b(5.25) && (
				<Corners x={btn.x - 330} y={btn.y - 70} w={660} h={140} gap={0} p={ramp(f, tapAt, tapAt + 5)} t={3} />
			)}
			<Line x1={WA.x} y1={0} x2={WA.x} y2={1080} p={ramp(f, 2, 12)} t={4} />
			<Head f={f} x={110} y={330} label="01 — Create" l1="Create" l2="a goal." out={ramp(f, b(5.25), b(5.75))} />
			<Line x1={116} y1={712} x2={760} y2={712} p={ramp(f, 16, 30, ease.inOut) * (1 - ramp(f, b(5.25), b(5.75)))} t={5} />
			<Block x={0} y={0} w={1920} h={1080} p={1 - reveal} dir="l" />
		</>
	);
};

// ——— B · CAPTURE IT (real: home.MP4 → slot: photo-checkin) ———
const WB: Rect = {x: 150, y: 60, w: 440, h: 960};
const B_HOME: Crop = {x: 0.3, y: 0.6, zoom: 1.7};
const CARD_B: Rect = {x: 1330, y: 590, w: 400, h: 400};
const THUMB = (k: number): Rect => ({x: 110 + k * 200, y: 690, w: 160, h: 160});

const PartB: React.FC<{f: number}> = ({f}) => {
	// the vertical edge line travels from A's window edge to B's
	const travel = ramp(f, 0, 7, ease.snap);
	const edgeX = mix(WA.x, WB.x, travel);
	const open = ramp(f, 5, 14, ease.snap);
	const tapAt = 16;
	const swap = 22; // tap → hard cut to the check-in recording
	const tCapture = swap + clipFrames('photoCheckin', 'tap');
	const shutter = tCapture + 22;
	const pill = slotPoint('home', WB, B_HOME, 0.255, 0.63);

	const out = ramp(f, b(5.25), b(5.75));
	const fly = ramp(f, shutter, shutter + 12, ease.out);
	const toThumb = ramp(f, b(5.25), b(6), ease.inOut);
	const c0 = {x: WB.x + WB.w / 2 - 60, y: WB.y + WB.h / 2 - 60, w: 120, h: 120};
	let card = {x: mix(c0.x, CARD_B.x, fly), y: mix(c0.y, CARD_B.y, fly), w: mix(c0.w, CARD_B.w, fly), h: mix(c0.h, CARD_B.h, fly)};
	const T0 = THUMB(0);
	card = {x: mix(card.x, T0.x, toThumb), y: mix(card.y, T0.y, toThumb), w: mix(card.w, T0.w, toThumb), h: mix(card.h, T0.h, toThumb)};
	const winExit = ramp(f, b(5.25), b(5.75), ease.snap);

	return (
		<>
			<div style={{position: 'absolute', inset: 0, transform: `translateY(${-winExit * 1100}px)`}}>
				{f < swap ? (
					<MediaSlot id="home" clip="still" playhead={0} {...WB} crop={B_HOME} radius={34} style={{clipPath: `inset(0 ${(1 - open) * 100}% 0 0 round 34px)`}} />
				) : (
					<MediaSlot
						id="photoCheckin"
						clip={f < tCapture ? 'tap' : 'capture'}
						playhead={f < tCapture ? f - swap : f - tCapture}
						{...WB}
						radius={34}
					/>
				)}
				<Tap f={f} at={tapAt} x={pill.x} y={pill.y} />
				{f >= shutter && f < shutter + 10 && (
					<Dot x={WB.x + WB.w / 2} y={WB.y + WB.h / 2} r={mix(30, 330, ramp(f, shutter, shutter + 10))} ring={mix(10, 1, ramp(f, shutter, shutter + 10))} />
				)}
			</div>
			{f < 12 && <Line x1={edgeX} y1={0} x2={edgeX} y2={1080} t={4} />}
			<Head f={f} x={700} y={250} label="02 — Capture" l1="Capture" l2="it." accent2 out={out} />
			{f >= shutter && (
				<>
					<div style={{position: 'absolute', left: card.x, top: card.y, width: card.w, height: card.h, boxShadow: `0 0 0 4px ${C.lumo}`}}>
						<Memory i={0} w={card.w} h={card.h} bare={toThumb > 0.3} />
					</div>
					{f < b(5.25) && (
						<Label x={CARD_B.x} y={CARD_B.y + CARD_B.h + 22} size={20} style={{opacity: fly >= 1 ? 1 : 0}}>
							Day 01 — captured
						</Label>
					)}
				</>
			)}
		</>
	);
};

// ——— C · KEEP GOING (real: create-goal.mov → new habit lands on the path) ———
const WC: Rect = {x: 1000, y: 0, w: 920, h: 1080};
const C_CROP: Crop = {x: 0.45, y: 0.64, zoom: 1.3};

const PartC: React.FC<{f: number}> = ({f}) => {
	const open = ramp(f, 0, 10, ease.snap);
	const out = ramp(f, b(5.25), b(5.75));
	const line = ramp(f, 4, 40, ease.inOut);
	const exit = ramp(f, b(5.25), b(5.75), ease.snap);
	return (
		<>
			<MediaSlot
				id="createGoal"
				clip="added"
				playhead={f - 6}
				{...WC}
				crop={C_CROP}
				style={{clipPath: `inset(${(1 - open) * 100}% 0 0 0)`, transform: `translateY(${exit * 1100}px)`}}
			/>
			<Head f={f} x={110} y={200} label="03 — Keep going" l1="Keep" l2="going." out={out} />
			<div style={{position: 'absolute', inset: 0, transform: `translateX(${-exit * 1000}px)`}}>
				<Line x1={110} y1={900} x2={900} y2={900} p={line} t={3} />
				{[0, 1, 2, 3].map((k) => {
					const at = k === 0 ? 0 : b(1 + k * 1.25);
					const r = THUMB(k);
					const s = k === 0 ? 1 : pop(f, at);
					return f >= at ? (
						<React.Fragment key={k}>
							<div style={{position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, transform: `scale(${s})`, transformOrigin: '50% 100%'}}>
								<Memory i={k} w={r.w} h={r.h} bare />
							</div>
							<Dot x={r.x + r.w / 2} y={900} r={7 * Math.min(1, s)} />
							<Label x={r.x + r.w / 2} y={930} size={16} align="center">
								Day {String(k + 1).padStart(2, '0')}
							</Label>
						</React.Fragment>
					) : null;
				})}
			</div>
		</>
	);
};

// ——— D · LOOK BACK (slot: progress) ———
const WD: Rect = {x: 960, y: 0, w: 960, h: 1080};

const PartD: React.FC<{f: number}> = ({f}) => {
	const draw = ramp(f, 0, 8, ease.snap);
	const open = ramp(f, 4, 14, ease.snap);
	const out = ramp(f, b(5), b(5.5));
	const fold = ramp(f, b(5), b(5.5), ease.snap); // window folds into the split line
	const rot = ramp(f, b(5.5), b(6), ease.inOut); // split line turns into the timeline
	const len = mix(1080, 1720, ramp(f, b(5.5), b(6), ease.inOut));
	const ang = mix(Math.PI / 2, 0, rot);
	const cx = mix(960, 960, rot);
	return (
		<>
			<MediaSlot
				id="progress"
				clip="scroll"
				playhead={f - 4}
				{...WD}
				style={{clipPath: `inset(0 ${(1 - open) * 100 + fold * 100}% 0 0)`}}
			/>
			{f >= 20 && f < b(5) && <Corners x={WD.x + 60} y={60} w={WD.w - 120} h={960} p={ramp(f, 20, 28)} t={3} />}
			{f < b(5.5) ? (
				<Line x1={960} y1={0} x2={960} y2={1080} p={draw} t={4} />
			) : (
				<Line
					x1={cx - (Math.cos(ang) * len) / 2}
					y1={540 - (Math.sin(ang) * len) / 2}
					x2={cx + (Math.cos(ang) * len) / 2}
					y2={540 + (Math.sin(ang) * len) / 2}
					t={4}
				/>
			)}
			<Head f={f} x={110} y={330} label="04 — Look back" l1="Look" l2="back." accent2 out={out} />
		</>
	);
};

export const S05CoreLoop: React.FC = () => {
	const f = useCurrentFrame();
	const part = Math.min(3, Math.floor(f / PART));
	const g = f - part * PART;
	return (
		<AbsoluteFill>
			{part === 0 && <PartA f={g} />}
			{part === 1 && <PartB f={g} />}
			{part === 2 && <PartC f={g} />}
			{part === 3 && <PartD f={g} />}
		</AbsoluteFill>
	);
};
