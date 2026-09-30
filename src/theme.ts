// Visual system: BLACK is the stage. #E3D290 is rare and valuable.
// Real photos stay full colour. Real Lumo UI is the product.
export const C = {
	black: '#000000',
	lumo: '#E3D290',
	white: '#F5F5F7',
	soft: 'rgba(245,245,247,0.62)',
	faint: 'rgba(245,245,247,0.38)',
	// Real Lumo UI background, sampled from the recordings (#101012).
	ui: '#101012',
	tile: '#111112',
} as const;

/**
 * Typography: SF Pro Display for headlines, SF Pro Text for small copy.
 * SF Pro loads automatically from assets/fonts/sf-pro/ when the official
 * files are placed there (see src/lib/fonts.ts). Until then Inter's
 * optical-size axis stands in (Display cut ≈ opsz 32, Text cut ≈ opsz 14).
 */
export const FONT = {
	display: "'SF Pro Display', 'Inter', sans-serif",
	text: "'SF Pro Text', 'Inter', sans-serif",
} as const;

/** Headline type — confident through scale and space, not weight. */
export const display = (size: number, weight: 400 | 500 | 600 = 500): React.CSSProperties => ({
	fontFamily: FONT.display,
	fontWeight: weight,
	fontSize: size,
	fontVariationSettings: '"opsz" 32',
	letterSpacing: size >= 120 ? '-0.035em' : size >= 60 ? '-0.025em' : '-0.015em',
	lineHeight: 1.04,
});

/** Supporting type. */
export const text = (size: number, weight: 400 | 500 | 600 = 400): React.CSSProperties => ({
	fontFamily: FONT.text,
	fontWeight: weight,
	fontSize: size,
	fontVariationSettings: '"opsz" 14',
	letterSpacing: '0.005em',
	lineHeight: 1.3,
});

export const W = 1920;
export const H = 1080;
export const FPS = 30;
