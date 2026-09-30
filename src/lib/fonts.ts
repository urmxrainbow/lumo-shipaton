import {continueRender, delayRender, staticFile} from 'remotion';

const faces: [string, string, FontFaceDescriptors][] = [
	['Archivo', 'fonts/archivo-wdth.woff2', {weight: '100 900', stretch: '62% 125%'}],
	['JetBrains Mono', 'fonts/jbmono-500.woff2', {weight: '500'}],
	['JetBrains Mono', 'fonts/jbmono-700.woff2', {weight: '700'}],
];

if (typeof document !== 'undefined') {
	const handle = delayRender('Loading fonts');
	Promise.all(
		faces.map(([family, file, desc]) => {
			const face = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, desc);
			return face.load().then((f) => document.fonts.add(f));
		}),
	)
		.then(() => continueRender(handle))
		.catch((e) => {
			console.error(e);
			continueRender(handle);
		});
}
