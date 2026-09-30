"""
Build the film's ONE continuous master audio track from music.mp4.

Segments (source seconds, cut on downbeats chosen for musical similarity)
live in src/music-edit.json and are also what the picture is timed to.
Each join is an equal-power crossfade centred on the downbeat, so the
edit is seamless and the total length equals the sum of the segments.

    python3 scripts/build-music.py
"""
import json, os, shutil, subprocess, sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
cfg = json.load(open(os.path.join(root, 'src/music-edit.json')))
ff = os.environ.get('FFMPEG') or shutil.which('ffmpeg')
if not ff:
    try:
        import imageio_ffmpeg
        ff = imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        sys.exit('ffmpeg not found: install it or `pip install imageio-ffmpeg`')

d = cfg['crossfade']
segs = cfg['segments']
parts, labels = [], []
for i, (a, b) in enumerate(segs):
    # every segment except the last carries d extra seconds for the crossfade
    # (half before its cut, half after), so joins stay centred on the downbeat
    start = a - (d / 2 if i > 0 else 0)
    end = b + (d / 2 if i < len(segs) - 1 else 0)
    parts.append(f'[0:a]atrim=start={start:.4f}:end={end:.4f},asetpts=PTS-STARTPTS[s{i}]')
    labels.append(f's{i}')
chain, cur = [], labels[0]
for i in range(1, len(labels)):
    out = f'x{i}'
    chain.append(f'[{cur}][{labels[i]}]acrossfade=d={d}:c1=qsin:c2=qsin[{out}]')
    cur = out
graph = ';'.join(parts + chain)
out = os.path.join(root, cfg['output'])
os.makedirs(os.path.dirname(out), exist_ok=True)
subprocess.run([ff, '-v', 'error', '-y', '-i', os.path.join(root, cfg['source']), '-filter_complex', graph,
                '-map', f'[{cur}]', '-ar', '48000', '-ac', '2', out], check=True)
total = sum(b - a for a, b in segs)
print(f'wrote {cfg["output"]} ({total:.3f}s expected)')
