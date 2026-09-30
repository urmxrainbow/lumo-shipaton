/**
 * The "30 / DAY STREAK" composition. Shared by the opening and the
 * callback so the two are pixel-identical.
 */
import React from 'react';
import {C, display, mono} from '../theme';
import {Line} from './geo';

export const NUM = {cx: 960, top: 250, size: 480, labelY: 700, ruleY: 752, ruleW: 200};

export const NumberComposition: React.FC<{num?: number; label?: number; rule?: number; numScale?: number}> = ({
	num = 1,
	label = 1,
	rule = 1,
	numScale = 1,
}) => (
	<>
		{num > 0 && (
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: NUM.top,
					textAlign: 'center',
					color: C.lumo,
					...display(900, 112),
					fontSize: NUM.size,
					transform: `scale(${numScale})`,
					transformOrigin: '50% 45%',
				}}
			>
				30
			</div>
		)}
		{label > 0 && (
			<div
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: NUM.labelY + (1 - label) * 14,
					textAlign: 'center',
					color: C.white,
					...mono(26, 500),
					letterSpacing: '0.42em',
					paddingLeft: '0.42em',
					clipPath: `inset(0 0 ${(1 - label) * 100}% 0)`,
				}}
			>
				Day streak
			</div>
		)}
		<Line x1={NUM.cx - NUM.ruleW / 2} y1={NUM.ruleY} x2={NUM.cx + NUM.ruleW / 2} y2={NUM.ruleY} p={rule} t={3} from="center" />
	</>
);
