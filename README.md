# Lumo: Shipaton product film

A music-driven motion-graphics film for **Lumo**, the social habit tracker where you can *see* your progress. Built with React + TypeScript + [Remotion](https://remotion.dev). 1920×1080, 30 fps.

**30 → 30 DAYS → 30 MEMORIES → YOUR STORY.**

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
| `src/layouts.ts` | Shared compositions (collage, hero ring, callback), which give the film its continuity |
| `src/components/MediaSlot.tsx` | A fixed video window: real footage if present, placeholder if not |
| `src/components/geo.tsx` | The #E3D290 motion language: dots, lines, blocks, frames, corner marks, labels |
| `src/scenes/S01…S11` | The eleven scenes |

**Visual system:** BLACK `#000000` is the stage. LUMO `#E3D290` is the motion language. Real photos stay full colour. Real Lumo UI is the product.
