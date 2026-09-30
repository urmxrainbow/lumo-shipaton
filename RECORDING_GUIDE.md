# Lumo film: recording guide

Every product window in the film is a fixed **MediaSlot**. Its position, size, crop, mask, motion and timing are already designed. You only supply the footage.

**The workflow**

1. Record the screen exactly as described below.
2. Name the file exactly as given (`.mp4` or `.mov`, any case).
3. Put it in `assets/recordings/`.
4. Render again. The placeholder becomes your footage automatically. Nothing else changes.

If a take's timing is slightly off, don't re-record. Adjust that clip's `in` / `out` seconds in `src/media.config.ts`. That changes which part of the take is shown, never the film.

Times like **0:24** refer to the current preview (placeholder 120 BPM grid). They will shift slightly once the music is in, but the durations won't.

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
| Music | `assets/audio/<track>` | ⬜ **Add** |
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
| **11. What the film uses** | **About 2.5 s.** In "Capture it." (about 0:31–0:34), a photo opens into this window. It plays the tap (1.0–1.6 s), then the capture (2.0–3.6 s at 1.2×), and holds on the captured photo. At 0:34 that frame shrinks into the first "Day 01" card. |
| **12. Crop / zoom** | Window **460 × 960 px, portrait, 56 px corners, right side of frame**. Shows about **97 % of the width, the full height below the status bar**. No zoom. |
| **13. Must stay visible** | The Check in pill (start), the viewfinder, the shutter, and the **captured photo** (end). |

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
| **11. What the film uses** | **About 8 s total.** At the end of "Showing up" (0:38.5–0:40) the six day-photos fly into this window, showing the still at 1.0 s. In "Look how far you've come." (0:40–0:48) it plays the scroll from 1.0 s to 5.0 s at 1×, then holds on the 5.0 s frame. |
| **12. Crop / zoom** | Window **490 × 980 px, 56 px corners, right side**. Shows the **whole screen** (about 99 %). A very slow scale of 1.00 → 1.025. Nothing is drawn over it. |
| **13. Must stay visible** | The photo grid or timeline. The flying photos land in a **3-column grid starting about 25 % down the window**. If your layout differs, tell me and I'll re-aim them. |

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
| **11. What the film uses** | 1.0–4.0 s at 1×, holding on the last frame. In "Better together." this window rises at about **1:07** and stays until about **1:11.5**, captioned "My progress". |
| **12. Crop / zoom** | Window **420 × 800 px, 48 px corners, left of centre**. Shows the **full width and about 94 % of the height** (a sliver trimmed top and bottom). |
| **13. Must stay visible** | Both people's names / avatars and photo check-ins in the **middle 90 %** of the screen |

## 05B · SHARED GOAL, PERSON B

Same as 05A, **recorded from Person B's account on the same shared goal**.

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-b.mp4` |
| **11. What the film uses** | 1.0–4.0 s. It rises about **1 s after A**, captioned "Your progress". A single #E3D290 line then joins the two windows: "Our goal". |
| **12. Crop / zoom** | Window **420 × 800 px, right of centre**, otherwise identical to A |
| **13. Must stay visible** | Ideally a check-in by B that also appears in A's view, so the two windows visibly belong to one goal |

---

## Already in use

### 01 · HOME: `home.MP4` ✅
The product beauty shot (0:13–0:16) beside "Lumo / A social habit tracker." It shows the **full width** of Home, framed from **"Today's habit" down** (the lower 59 % of the screen). The stats card at the top of Home is never shown. A re-take with AssistiveTouch off would remove the grey button at the bottom right.

### 02 · CREATE GOAL: `create-goal.mov` ✅
"Start with a goal." (0:16–0:24). The Home window grows into this window, and the crop stays full width so every line of UI reads.

| Clip | Source | Use |
|---|---|---|
| `openForm` | 2.57–2.90 s | New habit sheet |
| `typing` | 5.35–7.45 s at 1.1× | "Workout" typed, suggested emoji |
| `tapCreate` | 9.70–10.10 s | **Create habit** tap, marked by a single thin #E3D290 ring |
| `added` | 11.58–13.00 s at 1× | The new habit on the path |
| *cut* | 1.80–2.55, 2.90–5.35, 10.66–11.58 s | Dead time and the keyboard switch |

At the end the window collapses into the checkbox of the next scene.

---

## Memory photos

- **Folder:** `assets/memories/`, used in filename order (`day01.jpg` … `day30.jpg`).
- **30 photos** is ideal. With fewer, they repeat.
- Real photo check-ins from one habit (workouts work well), full colour, originals. At least **1600 px** on the long edge. Portrait or square.
- **Where they appear:**
  - `day01` is the checkbox that becomes a photo, and the first "Day 01".
  - Days 01, 04, 09, 16, 23 and 30 form the "Showing up" row.
  - All 30 appear in the hero grid (Day 01 first, at the centre).
  - Days 01, 15 and 30 appear in "Progress you can look back on."
- `assets/memories-b/` (partner photos) is **not used** in the current cut. Not needed.

## Music

Put one licensed track in `assets/audio/`. I'll analyse it, set `BPM` / `OFFSET` in `src/beats.ts`, and align the seven sections (quiet → build → product → lift → hero → connection → resolution) to its real phrase changes.

## SF Pro (optional)

The film is designed for **SF Pro Display** (headlines) and **SF Pro Text** (small copy). The official files come only from **developer.apple.com/fonts**. Check that Apple's licence covers your use in a promotional film. Then put the `.otf` files in `assets/fonts/sf-pro/`, for example `SF-Pro-Display-Medium.otf`, `SF-Pro-Display-Semibold.otf` and `SF-Pro-Text-Regular.otf`. They're detected automatically. Until then, Inter stands in.
