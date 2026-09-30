import React from 'react';
import {AbsoluteFill, Audio, Sequence} from 'remotion';
import {TIMELINE} from './timeline';
import {musicSrc} from './lib/media';
import {C} from './theme';
import './lib/fonts';
import {S01Problem} from './scenes/S01Problem';
import {S01bRelease} from './scenes/S01bRelease';
import {S02Lumo} from './scenes/S02Lumo';
import {S03Product} from './scenes/S03Product';
import {S04CheckIn} from './scenes/S04CheckIn';
import {S05Progress} from './scenes/S05Progress';
import {S06Memories} from './scenes/S06Memories';
import {S07Hero} from './scenes/S07Hero';
import {S08Social} from './scenes/S08Social';
import {S09Resolution} from './scenes/S09Resolution';
import {S10End} from './scenes/S10End';

const SCENES: [keyof typeof TIMELINE, React.FC][] = [
	['problem', S01Problem],
	['release', S01bRelease],
	['lumo', S02Lumo],
	['product', S03Product],
	['checkin', S04CheckIn],
	['progress', S05Progress],
	['memories', S06Memories],
	['hero', S07Hero],
	['social', S08Social],
	['resolution', S09Resolution],
	['endCard', S10End],
];

export const Film: React.FC = () => {
	const music = musicSrc();
	return (
		<AbsoluteFill style={{background: C.black, overflow: 'hidden'}}>
			{SCENES.map(([id, Scene]) => (
				<Sequence key={id} name={id} from={TIMELINE[id].from} durationInFrames={TIMELINE[id].duration}>
					<Scene />
				</Sequence>
			))}
			{/* ONE continuous master track for the whole film (built by scripts/build-music.py) */}
			{music && <Audio src={music} />}
		</AbsoluteFill>
	);
};
