// The whole visual system: BLACK is the stage, LUMO is the motion language.
export const C = {
	black: '#000000',
	lumo: '#E3D290',
	white: '#F7F5EE',
	dim: 'rgba(247,245,238,0.55)',
	// Real Lumo UI background, sampled from the recordings (#101012).
	ui: '#101012',
} as const;

export const FONT = {
	display: 'Archivo',
	mono: 'JetBrains Mono',
} as const;

// Archivo is variable: width 62–125, weight 100–900.
export const display = (weight = 900, width = 112): React.CSSProperties => ({
	fontFamily: FONT.display,
	fontWeight: weight,
	fontVariationSettings: `"wdth" ${width}`,
	letterSpacing: '-0.035em',
	lineHeight: 0.86,
	textTransform: 'uppercase',
});

export const mono = (size = 20, weight = 500): React.CSSProperties => ({
	fontFamily: FONT.mono,
	fontWeight: weight,
	fontSize: size,
	letterSpacing: '0.14em',
	textTransform: 'uppercase',
	lineHeight: 1,
});

export const W = 1920;
export const H = 1080;
export const FPS = 30;
