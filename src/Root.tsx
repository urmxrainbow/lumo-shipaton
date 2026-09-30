import React from 'react';
import {Composition} from 'remotion';
import {Film} from './Film';
import {TOTAL} from './timeline';
import {FPS, H, W} from './theme';

export const RemotionRoot: React.FC = () => (
	<Composition id="LumoFilm" component={Film} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
