/**
 * 01 · TENSION — one continuous question on pure black, then a tiny
 * #E3D290 circle that waits for the music.
 *
 *   "Have you ever / used a habit tracker…"   arrives on the first downbeat
 *   ↓ (the thought moves on: it lifts and compresses away, masked)
 *   "…and then"                               on the beat
 *   "forgot about it?"                        lands on the next downbeat
 *
 * Every line lives behind its own clipping boundary and travels up into
 * place on a critically-damped spring (weight, no overshoot); it leaves the
 * same way, upward, so the two halves read as ONE thought rolling forward.
 */
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {HIT, beats as b} from '../beats';
import {at} from '../timeline';
import {ease, mix, ramp} from '../lib/anim';
import {C, display} from '../theme';

export const TENSION_R = 10;

/** Arrival: fast acceleration, confident settle, no bounce. */
const ARRIVE = {damping: 200, stiffness: 140, mass: 0.8};
const EXIT = Easing.bezier(0.5, 0, 0.8, 0.25);

/**
 * One line behind a clipping boundary. `enter` 0→1 travels it up into place,
 * `exit` 0→1 carries it on upward, out through the top of its mask.
 */
const MaskLine: React.FC<{
	enter: number;
	exit: number;
	size: number;
	weight: 500 | 600;
	color?: string;
	children: React.ReactNode;
}> = ({enter, exit, size, weight, color = C.white, children}) => {
	const travel = size * 1.25;
	const y = (1 - enter) * travel - exit * travel;
	const opacity = interpolate(enter, [0, 0.55], [0, 1], {extrapolateRight: 'clamp'}) * (1 - interpolate(exit, [0.45, 1], [0, 1], {extrapolateLeft: 'clamp'}));
	return (
		// the mask: padded so no ascender/descender is ever cut while settled
		<div style={{overflow: 'hidden', padding: `${size * 0.06}px ${size * 0.2}px ${size * 0.14}px`, margin: `-${size * 0.06}px 0 -${size * 0.14}px`}}>
			<div style={{transform: `translateY(${y}px)`, opacity, color, ...display(size, weight), lineHeight: 1.08, whiteSpace: 'nowrap'}}>
				{children}
			</div>
		</div>
	);
};

const Stack: React.FC<{style?: React.CSSProperties; children: React.ReactNode}> = ({style, children}) => (
	<div
		style={{
			position: 'absolute',
			inset: 0,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			textAlign: 'center',
			...style,
		}}
	>
		{children}
	</div>
);

export const S01Problem: React.FC = () => {
	const f = useCurrentFrame();
	const {fps} = useVideoConfig();
	const q2 = at('problem', HIT.q2); // beat: "…and then"
	const forgot = at('problem', HIT.forgot); // downbeat: "forgot about it?"
	const dot = at('problem', HIT.tension);

	const arrive = (start: number, frames = 16) => spring({frame: f - start, fps, config: ARRIVE, durationInFrames: frames});
	const leave = (start: number, frames = 12) =>
		interpolate(f, [start, start + frames], [0, 1], {easing: EXIT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// ——— the first half: arrives within half a second ———
	const l1 = arrive(0);
	const l2 = arrive(5, 18);
	// the thought moves on: lifts, compresses slightly, masks away (upward)
	const turn = q2 - 13;
	const x1 = leave(turn, 10);
	const x2 = leave(turn + 2, 10);
	const lift = interpolate(f, [turn, turn + 14], [0, 1], {easing: EXIT, extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	// ——— the second half: enters out of that same upward movement ———
	const l3 = arrive(q2 - 2, 14);
	const l4 = arrive(forgot - 6, 16);
	const land = ramp(f, forgot - 6, forgot + 8, ease.out);
	// a short impact hold, then it clears for the circle
	const y1 = leave(dot - 12, 10);
	const y2 = leave(dot - 10, 10);
	const drift = ramp(f, q2 - 2, dot, ease.inOut);

	return (
		<AbsoluteFill>
			{x2 < 1 && (
				<Stack style={{transform: `translateY(${-lift * 70}px) scale(${mix(1, 0.94, lift)})`}}>
					<MaskLine enter={l1} exit={x1} size={112} weight={500} color={C.soft}>
						Have you ever
					</MaskLine>
					<MaskLine enter={l2} exit={x2} size={150} weight={500}>
						used a <span style={{fontWeight: 650}}>habit tracker</span>…
					</MaskLine>
				</Stack>
			)}
			{f >= q2 - 2 && y2 < 1 && (
				<Stack style={{transform: `translateY(${mix(24, -8, drift)}px)`}}>
					<MaskLine enter={l3} exit={y1} size={112} weight={500} color={C.soft}>
						…and then
					</MaskLine>
					<div style={{transform: `scale(${mix(1.035, 1, land)})`}}>
						<MaskLine enter={l4} exit={y2} size={196} weight={600}>
							forgot about it?
						</MaskLine>
					</div>
				</Stack>
			)}
			{/* tension: an almost insignificant point of #E3D290 */}
			{f >= dot && (
				<div
					style={{
						position: 'absolute',
						left: 960 - TENSION_R,
						top: 540 - TENSION_R,
						width: TENSION_R * 2,
						height: TENSION_R * 2,
						borderRadius: '50%',
						background: C.lumo,
						transform: `scale(${ramp(f, dot, dot + 8) * mix(1, 1.18, ramp(f, dot + 8, dot + b(1), ease.inOut))})`,
					}}
				/>
			)}
		</AbsoluteFill>
	);
};
