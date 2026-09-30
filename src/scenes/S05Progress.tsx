/**
 * 06 · LOOK BACK — progress.mp4 as a product beauty shot: All habits →
 * Breakfast opens → the month of photo check-ins. A slow push-in settles
 * on the photo calendar. Nothing covers the UI.
 */
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {HAIRLINE} from '../components/Screen';
import {Crop, MediaSlot, mixCrop} from '../components/MediaSlot';
import {Headline, Reveal} from '../components/type';
import {Box, ease, ramp} from '../lib/anim';

export const PROGRESS_SHOT: Box = {x: 960, y: 90, w: 700, h: 900};
export const PROGRESS_RAD = 48;
const LIST: Crop = {x: 0.5, y: 0.7, zoom: 1};
export const CALENDAR: Crop = {x: 0.5, y: 0.76, zoom: 1.28}; // the photo calendar fills the window

export const progressCrop = (f: number): Crop => mixCrop(LIST, CALENDAR, ramp(f, 40, 104, ease.inOut));

export const S05Progress: React.FC = () => {
	const f = useCurrentFrame();
	const rise = ramp(f, 0, 18, ease.out);
	return (
		<AbsoluteFill>
			<MediaSlot
				id="progress"
				clip="calendar"
				playhead={f - 8}
				{...PROGRESS_SHOT}
				crop={progressCrop(f)}
				radius={PROGRESS_RAD}
				style={{opacity: rise, transform: `translateY(${(1 - rise) * 40}px)`, boxShadow: HAIRLINE}}
			/>
			<Headline x={200} y={420} size={120}>
				<Reveal p={ramp(f, 6, 20)} rise={30}>
					Look back.
				</Reveal>
			</Headline>
		</AbsoluteFill>
	);
};
