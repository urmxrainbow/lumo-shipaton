import React from 'react';
import {AbsoluteFill, Audio, Sequence} from 'remotion';
import {TIMELINE} from './timeline';
import {musicSrc} from './lib/media';
import {C} from './theme';
import './lib/fonts';
import {S01Problem} from './scenes/S01Problem';
import {S02Lumo} from './scenes/S02Lumo';
import {S03CreateGoal} from './scenes/S03CreateGoal';
import {S04Capture} from './scenes/S04Capture';
import {S05ShowingUp} from './scenes/S05ShowingUp';
import {S06Progress} from './scenes/S06Progress';
import {S07Hero} from './scenes/S07Hero';
import {S08Social} from './scenes/S08Social';
import {S09Resolution} from './scenes/S09Resolution';
import {S10End} from './scenes/S10End';

const SCENES: [keyof typeof TIMELINE, React.FC][] = [
	['problem', S01Problem],
	['lumo', S02Lumo],
	['createGoal', S03CreateGoal],
	['capture', S04Capture],
	['showingUp', S05ShowingUp],
	['progress', S06Progress],
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
			{music && <Audio src={music} />}
		</AbsoluteFill>
	);
};
