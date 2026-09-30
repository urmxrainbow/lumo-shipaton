import React from 'react';
import {C, display, text} from '../theme';

/**
 * Controlled entrance: a short rise, opacity and a whisper of blur.
 * p: 0 hidden → 1 settled. out: 0 → 1 leaves (drifts up slightly, fades).
 */
export const Reveal: React.FC<{
	p: number;
	out?: number;
	rise?: number;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({p, out = 0, rise = 26, children, style}) => {
	const o = p * (1 - out);
	if (o <= 0.001) return null;
	return (
		<div
			style={{
				opacity: o,
				transform: `translateY(${(1 - p) * rise - out * rise * 0.5}px)`,
				filter: p < 1 || out > 0 ? `blur(${(1 - p) * 10 + out * 6}px)` : undefined,
				...style,
			}}
		>
			{children}
		</div>
	);
};

/** Headline block: one or more lines, positioned absolutely. */
export const Headline: React.FC<{
	x: number;
	y: number;
	size: number;
	weight?: 400 | 500 | 600;
	align?: 'left' | 'center' | 'right';
	width?: number;
	color?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({x, y, size, weight = 500, align = 'left', width, color = C.white, children, style}) => (
	<div
		style={{
			position: 'absolute',
			left: align === 'center' ? 0 : x,
			right: align === 'center' ? 0 : undefined,
			top: y,
			width: align === 'center' ? undefined : width,
			textAlign: align,
			color,
			whiteSpace: 'pre-line',
			...display(size, weight),
			...style,
		}}
	>
		{children}
	</div>
);

/** Small supporting copy. */
export const Caption: React.FC<{
	x: number;
	y: number;
	size?: number;
	align?: 'left' | 'center';
	color?: string;
	children: React.ReactNode;
	style?: React.CSSProperties;
}> = ({x, y, size = 26, align = 'left', color = C.soft, children, style}) => (
	<div
		style={{
			position: 'absolute',
			left: align === 'center' ? 0 : x,
			right: align === 'center' ? 0 : undefined,
			top: y,
			textAlign: align,
			color,
			...text(size),
			...style,
		}}
	>
		{children}
	</div>
);
