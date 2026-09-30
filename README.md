# Lumo: Shipaton product film

A premium, music-driven product film for **Lumo**, the social habit tracker where you can *see* your progress. Built with React + TypeScript + [Remotion](https://remotion.dev). 1920×1080, 30 fps.

**Have you ever set a goal and forgotten about it? → Lumo → capture it → 30 days → 30 memories → your progress has a story.**

## Run it

```bash
npm install
npm run studio          # live preview in Remotion Studio
npm run stills          # render review stills → out/stills/
npm run preview         # low-res draft → out/lumo-preview.mp4
```

## Adding footage (no code needed)

See **[RECORDING_GUIDE.md](RECORDING_GUIDE.md)**. Drop files into `assets/` with the names it gives, then render again. Missing media renders as a designed placeholder in the *same* window, so nothing moves when the real file arrives.

```
assets/
  recordings/   home.MP4 ✅  create-goal.mov ✅  photo-checkin  progress  shared-goal-a  shared-goal-b
  memories/     day01.jpg … day30.jpg        (Person A: the 30-day story)
  memories-b/   partner photos                (Person B)
  audio/        the music track
  branding/     app-icon.png ✅  logo.png ✅
```

## Structure

| File | Role |
|---|---|
| `src/beats.ts` | Music timing: BPM, offset, the beat map. The master clock. |
| `src/timeline.ts` | Every scene's position, in bars |
| `src/media.config.ts` | Every replaceable media slot, with clip in/out points |
| `src/components/Screen.tsx` | Shared product-window geometry, handed from scene to scene |
| `src/components/MediaSlot.tsx` | A fixed video window: real footage if present, placeholder if not |
| `src/components/type.tsx` | Typography (SF Pro when present in `assets/fonts/sf-pro/`, otherwise Inter) |
| `src/scenes/S01…S10` | The ten scenes |

**Visual system:** black `#000000` is the stage (85–90 % of the film). `#E3D290` is rare and valuable. Real photos stay full colour. Real Lumo UI is the hero.
