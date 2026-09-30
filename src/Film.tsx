import React from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate} from 'remotion';
import {MUSIC_EDIT_FRAMES} from './beats';
import {TIMELINE} from './timeline';
import {musicSrc} from './lib/media';
import {C} from './theme';
import './lib/fonts';
import {S01Problem} from './scenes/S01Problem';
import {S01bRelease} from './scenes/S01bRelease';
import {S02Lumo} from './scenes/S02Lumo';
import {S03Product} from './scenes/S03Product';
import {S04Memories} from './scenes/S04Memories';
import {S07Hero} from './scenes/S07Hero';
import {S08Social} from './scenes/S08Social';
import {S09Resolution} from './scenes/S09Resolution';
import {S10End} from './scenes/S10End';

const SCENES: [keyof typeof TIMELINE, React.FC][] = [
	['problem', S01Problem],
	['release', S01bRelease],
	['lumo', S02Lumo],
	['product', S03Product],
	['memories', S04Memories],
	['hero', S07Hero],
	['social', S08Social],
	['resolution', S09Resolution],
	['endCard', S10End],
];

/** Tiny fades at each edit point so the downbeat cuts are click-free. */
const EDGE = 2;

export const Film: React.FC = () => {
	const music = musicSrc();
	const last = MUSIC_EDIT_FRAMES.length - 1;
	return (
		<AbsoluteFill style={{background: C.black, overflow: 'hidden'}}>
			{SCENES.map(([id, Scene]) => (
				<Sequence key={id} name={id} from={TIMELINE[id].from} durationInFrames={TIMELINE[id].duration}>
					<Scene />
				</Sequence>
			))}
			{music &&
				MUSIC_EDIT_FRAMES.map((seg, i) => (
					<Sequence key={`music-${i}`} name={`music ${i + 1}`} from={seg.from} durationInFrames={seg.duration}>
						<Audio
							src={music}
							trimBefore={seg.trimBefore}
							volume={(fr) =>
								Math.min(
									i === 0 ? 1 : interpolate(fr, [0, EDGE], [0, 1], {extrapolateRight: 'clamp'}),
									i === last ? 1 : interpolate(fr, [seg.duration - EDGE, seg.duration], [1, 0], {extrapolateLeft: 'clamp'}),
								)
							}
						/>
					</Sequence>
				))}
		</AbsoluteFill>
	);
};
