# Lumo film: recording guide

Every video window in the film is a fixed **MediaSlot**. Its position, size, crop, mask, motion and timing are already designed. You only need to supply the footage.

**The workflow**

1. Record the screen exactly as described below.
2. Name the file exactly as given (`.mp4` or `.mov`, any case).
3. Put it in `assets/recordings/`.
4. Render again. The placeholder becomes your footage automatically. Nothing else changes.

If a take's timing is slightly off, don't re-record. Adjust the `in` / `out` seconds for that clip in `src/media.config.ts`. That changes which part of your take is shown, never the film's timing.

---

## General rules for every recording

- **Device:** the same iPhone as the existing recordings, a portrait screen recording (1320 × 2868). Other iPhone sizes work too.
- **Status bar:** the top **6.5 %** of every recording is always cropped away. The red recording pill and the clock never appear, so you don't need to hide them.
- **Do Not Disturb on.** No notification banners.
- **Keyboard set to English** before recording. (`create-goal.mov` spends 2.4 s switching from the Thai keyboard; that part is cut.)
- **Use a real account with real photos.** Ideally use the same check-in photos you put in `assets/memories/`, so the Progress UI and the flying memories match.
- **Move slowly and deliberately.** Hold still before and after every action. The edit removes dead time; it can't recover a rushed tap.
- **Touches aren't recorded by iOS.** The film draws a #E3D290 tap ring over each tap, timed to the moment in the guide.
- **Leave extra.** Every raw take below is longer than what's used. That's intentional.

---

## Status of each slot

| Slot | File | Status |
|---|---|---|
| 01 HOME | `home.MP4` | ✅ **Real footage in use** |
| 02 CREATE GOAL | `create-goal.mov` | ✅ **Real footage in use** |
| 03 PHOTO CHECK-IN | `photo-checkin.mp4` | ⬜ Placeholder, **record this** |
| 04 PROGRESS | `progress.mp4` | ⬜ Placeholder, **record this** (most important) |
| 05A SHARED GOAL · PERSON A | `shared-goal-a.mp4` | ⬜ Placeholder, **record this** |
| 05B SHARED GOAL · PERSON B | `shared-goal-b.mp4` | ⬜ Placeholder, **record this** |
| Memory photos | `assets/memories/day01.jpg` … `day30.jpg` | ⬜ Placeholder tiles, **add these** |
| Partner photos | `assets/memories-b/*.jpg` | ⬜ Placeholder tiles, **add these** |
| Music | `assets/audio/<track>.mp3` or `.wav` | ⬜ Silent, **add this** |

**How to read the placeholders in the preview:** each empty window shows a faint grid of the full recording with **y-position numbers (10–90 % down the screen)**, cropped exactly as your footage will be. The **circle** marks the point the crop is centred on: the key UI element must sit there. The bottom-left label shows which clip is playing and how long it is.

---

## 03 · PHOTO CHECK-IN

| | |
|---|---|
| **1. Filename** | `assets/recordings/photo-checkin.mp4` |
| **2. Lumo screen** | Home → Check in on a habit → camera → captured photo |
| **3. Starting state** | Home, with an **unchecked habit showing its yellow "Check in" pill** (like "Breakfast" in `home.MP4`). |
| **4. Action** | Hold still → tap **Check in** → camera opens → frame the subject → tap the **shutter** → the captured photo appears → (confirm/post, not used) |
| **5. Tap or scroll** | Taps only. No scrolling. |
| **6. Scroll direction** | none |
| **7. Scroll speed** | none |
| **8. Still before the action** | **1.0 s** on Home before tapping Check in (the tap lands at **1.0 s**). |
| **9. Still after the action** | Keep the camera steady **2.0–2.9 s** and press the shutter at about **2.9 s**. Hold the captured photo still on screen for at least **1 s** (to about 3.6 s). Then confirm and hold the final state for **2 s**. |
| **10. Minimum raw length** | **8 s** |
| **11. What the film uses** | **About 2.4 s total.** Scene "CAPTURE IT." (0:25–0:28): the `tap` clip (1.0–1.6 s at 1×), then the `capture` clip (2.0–3.6 s at 1.2×). A #E3D290 shutter ring fires on the frame where your shutter press lands, and the captured photo flies out of the window as a memory card. Montage (0:59.5): 0.5 s of the `capture` clip, around 2.4–3.0 s. |
| **12. Crop / zoom** | Scene window: **440 × 960 px, portrait, rounded 34 px**, full-screen crop (the edges lose about 3.5 % each side). Montage: **full-frame 1920 × 1080**, which shows only the **middle band of the screen, about 37 %–63 % down**. |
| **13. Must stay visible** | The **Check in pill** at the start. The **camera viewfinder and shutter**, with the **viewfinder filling the middle of the screen (37–63 %)** so the montage crop lands on it. The **captured photo** after the shutter. |

## 04 · PROGRESS (the most important recording)

This window hosts the Lumo reveal and the hero "30 DAYS → 30 MEMORIES" sequence.

| | |
|---|---|
| **1. Filename** | `assets/recordings/progress.mp4` |
| **2. Lumo screen** | The screen where a habit's **photo check-ins build up as visual progress / memories** (a photo grid or timeline). |
| **3. Starting state** | That screen open at the **top**, fully loaded, with **as many real photo check-ins visible as possible**. Ideally use the same habit and photos as `assets/memories/`. |
| **4. Action** | Hold still → one slow, continuous **scroll through the memories** → hold still. |
| **5. Tap or scroll** | Scroll only. No taps. |
| **6. Scroll direction** | Swipe **up** (content moves up, revealing older / further memories). |
| **7. Scroll speed** | **Slow and constant**: about **one screen height over 4 seconds**. Drag slowly with a steady finger rather than flicking. No momentum bounce at the end. |
| **8. Still before the action** | **1.0 s**. The frame at 1.0 s is used as a **still**, so the screen must look perfect then. |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **8 s** (1 s still + 4 s scroll + 2 s still + spare) |
| **11. What the film uses** | **Lumo reveal (0:18–0:22):** the still at 1.0 s. The collage's memories fly into this window's grid. **LOOK BACK (0:31–0:34):** scroll 1.0–3.4 s. **Hero (0:40–0:52):** scroll 1.0–5.0 s at 1×, then frozen on the 5.0 s frame through "30 DAYS / 30 MEMORIES". **Montage (1:00.5):** 1.0–2.5 s at 3× speed. |
| **12. Crop / zoom** | **Reveal and hero window: 430 × 940 px portrait, rounded 34–36 px**, full-screen crop. In the hero a virtual camera starts **zoomed in 1.4×** on this window and pulls back to 0.86×, while memories fly out of it on #E3D290 tethers. **LOOK BACK: right half of the frame (960 × 1080)**, showing about the **middle 52 % of the screen (24–76 % down)**. **Montage: full frame**, middle band only. |
| **13. Must stay visible** | **The photo grid.** In the reveal, the memories fly into a 3-column grid that starts **about 25 % down the window**. If your grid starts at a different height or uses different columns, tell me and I'll re-aim the landing tiles. Keep photos in the **middle 24–76 %** during the scroll. |

## 05A · SHARED GOAL, PERSON A

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-a.mp4` |
| **2. Lumo screen** | A **shared goal** as seen from **Person A's account**, showing both people's check-ins / progress. |
| **3. Starting state** | The shared goal screen open, loaded, both participants visible. |
| **4. Action** | Hold still → gentle scroll **up** through both people's recent check-ins (or no scroll if everything fits) → hold still. |
| **5. Tap or scroll** | Scroll (optional). No taps. |
| **6. Scroll direction** | Up, if you scroll. |
| **7. Scroll speed** | Very slow: about **half a screen over 3 s**. |
| **8. Still before the action** | **1.0 s** |
| **9. Still after the action** | **2 s** |
| **10. Minimum raw length** | **7 s** |
| **11. What the film uses** | **Social scene (0:52–0:58):** the `view` clip, 1.0–4.0 s at 1× (3.5 s on screen, frozen on its last frame). **Montage (1:01.5):** 0.5 s, left half of a split screen. |
| **12. Crop / zoom** | Social: **400 × 900 px portrait window on the LEFT**, rounded 30 px, full-screen crop. It opens with a wipe from the bottom. Montage: **left half, 958 × 1080**, middle band (about 24–76 % down). |
| **13. Must stay visible** | Person A's and Person B's **names / avatars and photo check-ins**, in the **middle half of the screen**. |

## 05B · SHARED GOAL, PERSON B

Same as 05A, but recorded **from Person B's account**, on the **same shared goal**.

| | |
|---|---|
| **1. Filename** | `assets/recordings/shared-goal-b.mp4` |
| **2–10** | Same as 05A. |
| **11. What the film uses** | **Social scene:** 1.0–4.0 s, starting half a bar after A. **Montage:** right half of the split screen. |
| **12. Crop / zoom** | **400 × 900 px portrait window on the RIGHT**, rounded 30 px. It opens with a wipe from the top. Montage: **right half, 958 × 1080**. |
| **13. Must stay visible** | Same as 05A. Ideally a check-in by B that A can see in 05A, so the two windows visibly talk to each other. |

---

## Already in use (optional re-records)

### 01 · HOME: `home.MP4` ✅
Used as a still (0.3 s). **CAPTURE IT.** zooms 1.7× onto the **Check in** pill (about 25 % across, 63 % down), and a #E3D290 tap ring marks the tap. The "63 days" stat card at the top of Home is **deliberately never shown**, so the film makes no claim about streaks.

### 02 · CREATE GOAL: `create-goal.mov` ✅
Edited from the existing 13.06 s take:

| Clip | Source | Use |
|---|---|---|
| `openForm` | 2.57–2.90 s | New habit sheet slides up |
| `typing` | 5.35–7.45 s at 1.6× | "W… Workout" and suggested emoji. Crop zooms 1.6× onto the name field. |
| `tapCreate` | 9.70–10.10 s | Crop moves 1.75× onto **Create habit**, with a tap ring and corner marks |
| `added` | 11.58–13.00 s at 1.4× | **KEEP GOING.** The path scrolls to the new "Workout" node |
| *cut* | 1.80–2.55, 2.90–5.35, 10.66–11.58 s | Dead time and the keyboard switch |

A cleaner re-take (English keyboard, no pause before typing) would buy about 1 s of breathing room, but it isn't required.

---

## Memory photos (the heart of the film)

- **Folder:** `assets/memories/`, in filename order, e.g. `day01.jpg` … `day30.jpg`. Tile *n* in the film is labelled DAY *n*.
- **How many:** **30** is ideal (DAY 30 = 30 MEMORIES). With fewer, they repeat in order.
- **What:** real photo check-ins from one habit over time, full colour, uncropped originals.
- **Format:** JPG, PNG or WebP. At least **1600 px** on the long edge.
- **Orientation:** portrait or square works best, since most frames in the film are portrait or square. Photos are centre-cropped.
- **Placement:** `day01` is the first full-screen memory at the drop (0:10). Memories 1–14 build the first collage. All 30 fill the DAY 01 → DAY 30 timeline and the hero.
- **Partner (Person B):** 4–8 photos in `assets/memories-b/`, used in the shared-goal exchange.

## Music

- Put **one** licensed track in `assets/audio/` (`.mp3` / `.wav` / `.m4a`). It's picked up automatically.
- The film currently runs on a **placeholder 120 BPM grid**. Once the track is in, I analyse it and set `BPM` + `OFFSET` (and any accent nudges) in `src/beats.ts`. Every scene is authored in bars and beats, so the whole film re-times from there.
