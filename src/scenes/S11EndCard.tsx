/** S11 · END CARD — dot → Lumo icon → LUMO → YOUR PROGRESS HAS A STORY. Cut. */
import React from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';
import {Dot} from '../components/geo';
import {MaskLine} from '../components/type';
import {brand} from '../lib/media';
import {ease, mix, pop, ramp} from '../lib/anim';
import {C} from '../theme';

const ICON = {cx: 960, cy: 300, size: 230};

export const S11EndCard: React.FC = () => {
	const f = useCurrentFrame();
	const move = ramp(f, 0, 9, ease.inOut);
	const iconAt = 9;
	const s = pop(f, iconAt, {stiff: 420, damp: 24});

	return (
		<AbsoluteFill>
			{f < iconAt && <Dot x={960} y={mix(540, ICON.cy, move)} r={mix(16, ICON.size * 0.36, move)} />}
			{f >= iconAt && (
				<Img
					src={brand.icon}
					style={{
						position: 'absolute',
						left: ICON.cx - ICON.size / 2,
						top: ICON.cy - ICON.size / 2,
						width: ICON.size,
						height: ICON.size,
						transform: `scale(${mix(0.72, 1, s)})`,
					}}
				/>
			)}
			<div style={{position: 'absolute', left: 0, right: 0, top: 450, display: 'flex', justifyContent: 'center'}}>
				<MaskLine p={ramp(f, 16, 26)} size={200} color={C.lumo} width={118}>
					Lumo
				</MaskLine>
			</div>
			<div style={{position: 'absolute', left: 0, right: 0, top: 740, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
				<MaskLine p={ramp(f, 40, 49)} size={66} width={104}>
					Your progress
				</MaskLine>
				<MaskLine p={ramp(f, 44, 53)} size={66} width={104}>
					has a story.
				</MaskLine>
			</div>
		</AbsoluteFill>
	);
};
