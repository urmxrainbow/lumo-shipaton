import React from 'react';
import {AbsoluteFill, Audio, Sequence} from 'remotion';
import {TIMELINE} from './timeline';
import {musicSrc} from './lib/media';
import {C} from './theme';
import './lib/fonts';
import {S01Opening} from './scenes/S01Opening';
import {S02Question} from './scenes/S02Question';
import {S03Transformation} from './scenes/S03Transformation';
import {S04LumoReveal} from './scenes/S04LumoReveal';
import {S05CoreLoop} from './scenes/S05CoreLoop';
import {S06ProgressBuild} from './scenes/S06ProgressBuild';
import {S07Hero} from './scenes/S07Hero';
import {S08Social} from './scenes/S08Social';
import {S09Montage} from './scenes/S09Montage';
import {S10Callback} from './scenes/S10Callback';
import {S11EndCard} from './scenes/S11EndCard';

const SCENES: [keyof typeof TIMELINE, React.FC][] = [
	['opening', S01Opening],
	['question', S02Question],
	['transformation', S03Transformation],
	['lumoReveal', S04LumoReveal],
	['coreLoop', S05CoreLoop],
	['progressBuild', S06ProgressBuild],
	['hero', S07Hero],
	['social', S08Social],
	['montage', S09Montage],
	['callback', S10Callback],
	['endCard', S11EndCard],
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
