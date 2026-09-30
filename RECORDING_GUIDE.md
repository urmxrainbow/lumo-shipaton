# Lumo film: recording guide

Every product window in the film is a fixed **MediaSlot**. Its position, size, crop, mask, motion and timing are already designed. You only supply the footage.

**The workflow**

1. Record the screen exactly as described below.
2. Name the file exactly as given (`.mp4` or `.mov`, any case). **Screenshots work too:** a `.png` / `.jpg` with the same name (e.g. `progress.png`) is used in the same window, with a slow push-in instead of motion. If both exist, the video wins.
3. Put it in `assets/recordings/`.
4. Render again. The placeholder becomes your footage automatically. Nothing else changes.

If a take's timing is slightly off, don't re-record. Adjust that clip's `in` / `out` seconds in `src/media.config.ts`. That changes which part of the take is shown, never the film.

Times like **0:30** refer to the current cut, which is locked to the music edit in `src/beats.ts`.

---

## General rules

- **Portrait iPhone screen recording**, the same device as the existing ones (1320 × 2868).
- **The top 6.5 % is always hidden** (status bar and recording pill), so ignore it.
- **Turn AssistiveTouch off.** The grey floating button is visible in both existing recordings. It's minor, but a clean take is better.
- **Do Not Disturb on. Keyboard set to English** before recording.
- **Use a real account with real photos.** Ideally use the same photos you put in `assets/memories/`.
- **Move slowly. Hold still before and after every action.** The film is calm; the footage should be too.
- **Most windows show the full width of the screen**, so nothing important gets cropped at the sides.

## Status

| Slot | File | Status |
|---|---|---|
| 01 HOME | `home.MP4` | ✅ Real footage in use |
| 02 CREATE GOAL | `create-goal.mov` | ✅ Real footage in use |
| 03 PHOTO CHECK-IN | `photo-checkin.mp4` | ⬜ **Record** |
| 04 PROGRESS | `progress.jpg` (Insights screenshot — used as a still beauty shot) | ✅ In use |
| 05A SHARED GOAL · PERSON A | `shared-goal-a.png` (screenshot) or `.mp4` | ⬜ **Add** |
| 05B SHARED GOAL · PERSON B | `shared-goal-b.png` (screenshot) or `.mp4` | ⬜ **Add** |
| Memory photos | `assets/memories/day01.jpg` … `day30.jpg` | ⬜ **Add** |
| Music | `assets/audio/lumo-music-edit.wav` | ✅ In use (one continuous master track) |
| SF Pro (optional) | `assets/fonts/sf-pro/*.otf` | ⬜ Inter stands in until added |

**How to read a placeholder in the preview:** each empty window is drawn at its real size and position. The faint lines with **10 %–90 %** labels show which part of the recording will be visible. The **soft ring** marks the point the crop is centred on.

---

## 03 · PHOTO CHECK-IN

| | |
|---|---|
| **1. Filename** | `assets/recordings/photo-checkin.mp4` |
| **2. Lumo screen** | Home → **Check in** on a habit → camera → captured photo |
| **3. Starting state** | Home, with a habit showing its yellow **Check in** pill. Ideally a workout habit. |
| **4. Action** | Hold → tap **Check in** → camera opens → frame a real workout moment → tap the shutter → the captured photo is shown → (confirm/post: record it, but it isn't used) |
| **5. Tap or scroll** | Taps only |
| **6. Scroll direction** | none |
| **7. Scroll speed** | none |
| **8. Still before the action** | **1.0 s** (tap Check in at 1.0 s) |
| **9. Still after the action** | Camera steady from **2.0 s**, shutter at about **2.9 s**, then **keep the captured photo on screen, untouched, until at least 3.6 s**. That exact frame becomes "Day 01". Then hold the final state for 2 s. |
| **10. Minimum raw length** | **8 s** |
| **11. What the film uses** | **The hero feature (0:30.4–0:39.5).** After "A check-in becomes a memory.", the full-screen memory returns into this window, which plays the capture (2.0–3.6 s at 1.2×) under "Photo check-in.". The shutter lands at ≈0:31.5. Then each new shutter flashes on the window (0:33.4–0:37) and a new memory flies out of the photo area into the person's history. |
| **12. Crop / zoom** | Window **720 × 960 px, 56 px corners, right side of frame**. Shows the **full width and the middle ~60 % of the height (about 20–80 % down)**. The film lifts the captured photo from the area **10–90 % across, 13–73 % down** of that window. |
| **13. Must stay visible** | The viewfinder, the shutter, and the **captured photo**, all in the **middle of the screen (20–80 % down)**. |

## 04 · PROGRESS

| | |
|---|---|
| **1. Filename** | `assets/recordings/progress.jpg` (screenshot; the slot is set to `media: 'image'`, so `progress.mp4` is ignored) |
| **2. Lumo screen** | The screen where a habit's **photo check-ins become visual progress / memories** |
| **3. Starting state** | That screen at the **top**, fully loaded, with **as many real photos visible as possible** |
| **4. Action** | Hold → one slow, continuous scroll → hold |
| **5. Tap or scroll** | Scroll only |
| **6. Scroll direction** | Swipe **up** (reveal further memories) |
| **7. Scroll speed** | **Slow and constant**: about **one screen height over 4 s**. Drag slowly; no flick, no bounce. |
| **8. Still before the action** | **1.0 s**. The frame at 1.0 s is used as a still, so the screen must look perfect then. |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **8 s** |
| **11. What the film uses** | **About 5 s total.** On "Look how far you've come." (0:39.5–0:42.5), the sixteen memories from the Photo Check-in sequence fly into this window. In the resolution (≈1:16–1:19) it rises again in the centre as the last memories return into it. A screenshot works well here: it gets a slow push-in. |
| **12. Crop / zoom** | Window **490 × 980 px, 56 px corners** (right side on "Look back.", centred in the resolution). Shows the **whole screen** (about 99 %). Nothing is drawn over it. |
| **13. Must stay visible** | The photo grid or timeline. The flying photos land in a **4-column grid (3-column at the end) starting about 25 % down the window**. If your layout differs, tell me and I'll re-aim them. |

## 05A · SHARED GOAL, PERSON A

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-a.png` (screenshot) or `.mp4` |
| **2. Lumo screen** | A **shared goal** seen from **Person A's** account, with both people's progress / check-ins |
| **3. Starting state** | The shared goal open and loaded, both participants visible |
| **4. Action** | Hold → optional gentle scroll up through recent check-ins → hold |
| **5. Tap or scroll** | Scroll (optional) |
| **6. Scroll direction** | Up |
| **7. Scroll speed** | Very slow: about **half a screen over 3 s** |
| **8. Still before the action** | **1.0 s** |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **7 s** |
| **11. What the film uses** | On the warm bridge of the track, this window rises **alone, centred** at about **0:58.7**, captioned "My progress". At about 1:01.5 it slides left as B joins. Two #E3D290 lines meet between the windows ("Our goal"), and at **1:09.8** that point expands into a full #E3D290 frame: "Grow together." |
| **12. Crop / zoom** | Window **420 × 800 px, 48 px corners**, first centred, then left of centre. Shows the **full width and about 94 % of the height** (a sliver trimmed top and bottom). |
| **13. Must stay visible** | Both people's names / avatars and photo check-ins in the **middle 90 %** of the screen |

## 05B · SHARED GOAL, PERSON B

Same as 05A, **recorded from Person B's account on the same shared goal**.

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-b.png` (screenshot) or `.mp4` |
| **11. What the film uses** | It glides in from the right at about **1:01.5**, captioned "Your progress". |
| **12. Crop / zoom** | Window **420 × 800 px, right of centre**, otherwise identical to A |
| **13. Must stay visible** | Ideally a check-in by B that also appears in A's view, so the two windows visibly belong to one goal |

---

## Already in use

### 01 · HOME: `home.MP4` ✅
The product beauty shot (0:13–0:15) beside "Lumo / A social habit tracker.", showing the **full width** of Home framed from **"Today's habit" down**. In "Show up." (0:18–0:21) the camera pushes 2× onto the **Check in** pill, and a thin #E3D290 ring marks the tap. The stats card at the top of Home is never shown. A re-take with AssistiveTouch off would remove the grey button at the bottom right.

### 02 · CREATE GOAL: `create-goal.mov` ✅
"Set a goal." (0:15.2–0:18.2). The Home window grows into this window, and the crop stays full width so every line of UI reads.

| Clip | Source | Use |
|---|---|---|
| `openForm` | 2.57–2.90 s | New habit sheet |
| `typing` | 5.35–7.45 s at 1.6× | "Workout" typed, suggested emoji |
| `tapCreate` | 9.70–10.10 s | **Create habit** tap, marked by a single thin #E3D290 ring |
| `added` | 11.58–13.00 s at 1.6× | The new habit on the path |
| *cut* | 1.80–2.55, 2.90–5.35, 10.66–11.58 s | Dead time and the keyboard switch |


---

## Memory photos

- **Folder:** `assets/memories/`, used in filename order (`day01.jpg` … `day30.jpg`).
- **30 photos** is ideal. With fewer, they repeat.
- Real photo check-ins from one habit (workouts work well), full colour, originals. At least **1600 px** on the long edge. Portrait or square.
- **Where they appear:**
  - `day01` is the photo the checkbox turns into, the full-screen memory behind "A check-in becomes a memory.", and the first memory in the history.
  - Days 01–16 are the history that grows with every shutter ("Every check-in means something.").
  - All 30 appear in the hero grid (Day 01 first, at the centre, revealed through the "0").
  - Days 01, 15 and 30 appear in "Progress you can look back on."
- `assets/memories-b/` (partner photos) is **not used** in the current cut. Not needed.

## Music

✅ In use: `assets/audio/lumo-music-edit.wav`, **one continuous master track** built from `music.mp4` by `python3 scripts/build-music.py`. The edit segments live in `src/music-edit.json` (joins on downbeats chosen for musical similarity, with seamless crossfades). Every scene is cut on named moments of the track (`HIT` in `src/beats.ts`).

## SF Pro (optional)

The film is designed for **SF Pro Display** (headlines) and **SF Pro Text** (small copy). The official files come only from **developer.apple.com/fonts**. Check that Apple's licence covers your use in a promotional film. Then put the `.otf` files in `assets/fonts/sf-pro/`, for example `SF-Pro-Display-Medium.otf`, `SF-Pro-Display-Semibold.otf` and `SF-Pro-Text-Regular.otf`. They're detected automatically. Until then, Inter stands in.
