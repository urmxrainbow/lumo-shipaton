import React from 'react';
import {C, display} from '../theme';

/**
 * A line of display type revealed through a mask (rises from below its
 * own baseline). p: 0 hidden → 1 in place. out: 0 → 1 exits upward.
 */
export const MaskLine: React.FC<{
	children: React.ReactNode;
	p: number;
	out?: number;
	size: number;
	color?: string;
	weight?: number;
	width?: number;
	style?: React.CSSProperties;
}> = ({children, p, out = 0, size, color = C.white, weight = 900, width = 112, style}) => (
	<div style={{overflow: 'hidden', paddingTop: size * 0.06, paddingBottom: size * 0.02, ...style}}>
		<div
			style={{
				...display(weight, width),
				fontSize: size,
				color,
				whiteSpace: 'nowrap',
				transform: `translateY(${(1 - p) * 105 - out * 105}%)`,
			}}
		>
			{children}
		</div>
	</div>
);

/** Plain positioned display text. */
export const Big: React.FC<{
	x: number;
	y: number;
	size: number;
	children: React.ReactNode;
	color?: string;
	weight?: number;
	width?: number;
	align?: 'left' | 'center' | 'right';
	style?: React.CSSProperties;
}> = ({x, y, size, children, color = C.white, weight = 900, width = 112, align = 'left', style}) => (
	<div
		style={{
			position: 'absolute',
			left: x,
			top: y,
			...display(weight, width),
			fontSize: size,
			color,
			whiteSpace: 'nowrap',
			transform: align === 'center' ? 'translateX(-50%)' : align === 'right' ? 'translateX(-100%)' : undefined,
			...style,
		}}
	>
		{children}
	</div>
);
