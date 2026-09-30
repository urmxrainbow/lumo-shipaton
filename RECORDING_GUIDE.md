# Lumo film: recording guide

Every product window in the film is a fixed **MediaSlot**. Its position, size, crop, mask, motion and timing are already designed. You only supply the footage.

**The workflow**

1. Record the screen exactly as described below.
2. Name the file exactly as given (`.mp4` or `.mov`, any case).
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
| 04 PROGRESS | `progress.mp4` | ⬜ **Record** (one of the largest shots in the film) |
| 05A SHARED GOAL · PERSON A | `shared-goal-a.mp4` | ⬜ **Record** |
| 05B SHARED GOAL · PERSON B | `shared-goal-b.mp4` | ⬜ **Record** |
| Memory photos | `assets/memories/day01.jpg` … `day30.jpg` | ⬜ **Add** |
| Music | `assets/audio/music.m4a` | ✅ In use (music edit in `src/beats.ts`) |
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
| **11. What the film uses** | **About 2.5 s.** After "Show up." taps **Check in** on Home (≈0:29), this window plays the tap (1.0–1.6 s). On "Capture it." (0:30.3) it plays the capture (2.0–3.6 s at 1.2×), with the shutter at ≈0:31. The captured photo then lifts out of the UI and fills the whole frame on the 0:33.3 downbeat. |
| **12. Crop / zoom** | Window **720 × 960 px, 56 px corners, right side of frame**. Shows the **full width and the middle ~60 % of the height (about 20–80 % down)**. The film lifts the captured photo from the area **10–90 % across, 13–73 % down** of that window. |
| **13. Must stay visible** | The viewfinder, the shutter, and the **captured photo**, all in the **middle of the screen (20–80 % down)**. |

## 04 · PROGRESS

| | |
|---|---|
| **1. Filename** | `assets/recordings/progress.mp4` |
| **2. Lumo screen** | The screen where a habit's **photo check-ins become visual progress / memories** |
| **3. Starting state** | That screen at the **top**, fully loaded, with **as many real photos visible as possible** |
| **4. Action** | Hold → one slow, continuous scroll → hold |
| **5. Tap or scroll** | Scroll only |
| **6. Scroll direction** | Swipe **up** (reveal further memories) |
| **7. Scroll speed** | **Slow and constant**: about **one screen height over 4 s**. Drag slowly; no flick, no bounce. |
| **8. Still before the action** | **1.0 s**. The frame at 1.0 s is used as a still, so the screen must look perfect then. |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **8 s** |
| **11. What the film uses** | **About 6 s total.** On "Look back." (0:42.4–0:45.4) sixteen memories fly into this window, and it plays the scroll from 1.0 s. In the resolution (≈1:24–1:28) the window rises again in the centre, showing the still at 1.0 s, as the last memories return into it. |
| **12. Crop / zoom** | Window **490 × 980 px, 56 px corners** (right side on "Look back.", centred in the resolution). Shows the **whole screen** (about 99 %). Nothing is drawn over it. |
| **13. Must stay visible** | The photo grid or timeline. The flying photos land in a **4-column grid (3-column at the end) starting about 25 % down the window**. If your layout differs, tell me and I'll re-aim them. |

## 05A · SHARED GOAL, PERSON A

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-a.mp4` |
| **2. Lumo screen** | A **shared goal** seen from **Person A's** account, with both people's progress / check-ins |
| **3. Starting state** | The shared goal open and loaded, both participants visible |
| **4. Action** | Hold → optional gentle scroll up through recent check-ins → hold |
| **5. Tap or scroll** | Scroll (optional) |
| **6. Scroll direction** | Up |
| **7. Scroll speed** | Very slow: about **half a screen over 3 s** |
| **8. Still before the action** | **1.0 s** |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **7 s** |
| **11. What the film uses** | 1.0–4.0 s at 1×, holding on the last frame. On the warm bridge of the track, this window rises **alone, centred** at about **1:04.6**, captioned "My progress". At about 1:07.6 it slides left as B joins. It stays until about **1:15**. |
| **12. Crop / zoom** | Window **420 × 800 px, 48 px corners**, first centred, then left of centre. Shows the **full width and about 94 % of the height** (a sliver trimmed top and bottom). |
| **13. Must stay visible** | Both people's names / avatars and photo check-ins in the **middle 90 %** of the screen |

## 05B · SHARED GOAL, PERSON B

Same as 05A, **recorded from Person B's account on the same shared goal**.

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-b.mp4` |
| **11. What the film uses** | 1.0–4.0 s. It glides in from the right at about **1:07.6**, captioned "Your progress". Two #E3D290 lines then reach from both windows and meet in one point: "Our goal" (≈1:11). |
| **12. Crop / zoom** | Window **420 × 800 px, right of centre**, otherwise identical to A |
| **13. Must stay visible** | Ideally a check-in by B that also appears in A's view, so the two windows visibly belong to one goal |

---

## Already in use

### 01 · HOME: `home.MP4` ✅
The product beauty shot (0:19–0:24) beside "Lumo / A social habit tracker.", showing the **full width** of Home framed from **"Today's habit" down**. In "Show up." (0:27–0:29) the camera pushes 2× onto the **Check in** pill, and a thin #E3D290 ring marks the tap. The stats card at the top of Home is never shown. A re-take with AssistiveTouch off would remove the grey button at the bottom right.

### 02 · CREATE GOAL: `create-goal.mov` ✅
"Set a goal." (0:24.2–0:27.2). The Home window grows into this window, and the crop stays full width so every line of UI reads.

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
  - `day01` is the photo captured in "Capture it." that fills the frame, and the first memory.
  - Days 01–16 build up in "Keep showing up." (1 → 2 → 4 → 8 → 16).
  - All 30 appear in the hero grid (Day 01 first, at the centre, revealed through the "0").
  - Days 01, 15 and 30 appear in "Progress you can look back on."
- `assets/memories-b/` (partner photos) is **not used** in the current cut. Not needed.

## Music

✅ In use: `assets/audio/music.m4a` (the audio of `music.mp4`, 79.1 BPM). The film plays a four-segment **music edit** cut on downbeats (`EDIT` in `src/beats.ts`), and every scene is cut on named moments of the track (`HIT`).

## SF Pro (optional)

The film is designed for **SF Pro Display** (headlines) and **SF Pro Text** (small copy). The official files come only from **developer.apple.com/fonts**. Check that Apple's licence covers your use in a promotional film. Then put the `.otf` files in `assets/fonts/sf-pro/`, for example `SF-Pro-Display-Medium.otf`, `SF-Pro-Display-Semibold.otf` and `SF-Pro-Text-Regular.otf`. They're detected automatically. Until then, Inter stands in.
