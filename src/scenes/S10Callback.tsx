/**
 * S10 · THE CALLBACK — the exact opening composition. But now the
 * memories return around the number. Then the number leaves.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {beats as b} from '../beats';
import {Card, Enter} from '../components/Card';
import {Dot} from '../components/geo';
import {Memory} from '../components/Memory';
import {NUM, NumberComposition} from '../components/NumberComposition';
import {CALLBACK_RING} from '../layouts';
import {ease, mix, ramp} from '../lib/anim';

const BEATS = [1, 2, 2.5, 3, 3.5, 3.75, 4, 4.25, 4.5, 4.75];
const ENTERS: Enter[] = ['circle', 'wipeD', 'pop', 'wipeL', 'pop', 'pop', 'cut', 'cut', 'cut', 'cut'];

export const S10Callback: React.FC = () => {
	const f = useCurrentFrame();
	const drop = b(5.5);
	const collapse = ramp(f, drop, drop + 7, ease.in);
	const gather = ramp(f, b(6.5), b(7.75), ease.in);
	const cy = NUM.top + NUM.size * 0.43;

	return (
		<AbsoluteFill>
			{f < drop + 7 && (
				<NumberComposition numScale={1 - collapse} label={f < drop ? 1 : 0} rule={f < drop ? 1 : 0} />
			)}
			{f >= drop + 7 && f < b(6.25) && <Dot x={960} y={cy} r={14} />}

			{CALLBACK_RING.map(([i, r], k) => {
				if (gather > 0) {
					const rr = {
						x: mix(r.x, 960 - 10, gather),
						y: mix(r.y, 540 - 10, gather),
						w: mix(r.w, 20, gather),
						h: mix(r.h, 20, gather),
					};
					return (
						<div key={k} style={{position: 'absolute', left: rr.x, top: rr.y, width: rr.w, height: rr.h}}>
							<Memory i={i} w={rr.w} h={rr.h} bare />
						</div>
					);
				}
				return <Card key={k} f={f} at={b(BEATS[k])} r={r} i={i} enter={ENTERS[k]} />;
			})}
			{gather >= 1 && <Dot x={960} y={540} r={16} />}
		</AbsoluteFill>
	);
};
