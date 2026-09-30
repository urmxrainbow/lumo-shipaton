import {Config} from '@remotion/cli/config';

// All film media lives in /assets — it is served as Remotion's public dir,
// so `staticFile('recordings/home.MP4')` resolves to assets/recordings/home.MP4.
Config.setPublicDir('./assets');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(4);

// Use the pre-installed headless Chromium when it is available (cloud sandbox).
const HEADLESS = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (require('fs').existsSync(HEADLESS)) {
	Config.setBrowserExecutable(HEADLESS);
}
