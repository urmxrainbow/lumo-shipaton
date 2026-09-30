/**
 * Font loading.
 *
 * SF Pro: drop the official Apple files (developer.apple.com/fonts) into
 * assets/fonts/sf-pro/ — e.g. SF-Pro-Display-Medium.otf,
 * SF-Pro-Text-Regular.otf — and they are picked up automatically as
 * "SF Pro Display" / "SF Pro Text". No code changes.
 *
 * Stand-in until then: Inter (SIL OFL), variable with an optical-size axis.
 */
import {continueRender, delayRender, getStaticFiles, staticFile} from 'remotion';

const WEIGHTS: [RegExp, string][] = [
	[/ultralight/i, '100'],
	[/thin/i, '200'],
	[/semibold/i, '600'],
	[/light/i, '300'],
	[/medium/i, '500'],
	[/heavy/i, '800'],
	[/black/i, '900'],
	[/bold/i, '700'],
	[/regular/i, '400'],
];

type Face = [family: string, file: string, desc: FontFaceDescriptors];

const sfProFaces = (): Face[] => {
	let files: string[] = [];
	try {
		files = getStaticFiles().map((f) => f.name.replace(/\\/g, '/'));
	} catch {
		files = [];
	}
	return files
		.filter((f) => f.startsWith('fonts/sf-pro/') && /\.(otf|ttf|woff2?)$/i.test(f) && !/italic/i.test(f))
		.flatMap((f): Face[] => {
			const name = f.split('/').pop() ?? '';
			const family = /text/i.test(name) ? 'SF Pro Text' : /display/i.test(name) ? 'SF Pro Display' : null;
			if (!family) return [];
			const weight = WEIGHTS.find(([re]) => re.test(name))?.[1] ?? '400';
			return [[family, f, {weight}]];
		});
};

export const SF_PRO_LOADED = sfProFaces().length > 0;

if (typeof document !== 'undefined') {
	const faces: Face[] = [
		['Inter', 'fonts/inter-var.woff2', {weight: '100 900'}],
		...sfProFaces(),
	];
	const handle = delayRender('Loading fonts');
	Promise.all(
		faces.map(([family, file, desc]) => {
			const face = new FontFace(family, `url(${staticFile(file)})`, desc);
			return face.load().then((f) => document.fonts.add(f));
		}),
	)
		.then(() => continueRender(handle))
		.catch((e) => {
			console.error(e);
			continueRender(handle);
		});
}
