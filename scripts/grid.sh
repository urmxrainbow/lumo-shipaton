#!/bin/bash
# Tile frames into a 3x3 review grid: scripts/grid.sh out.png f1 f2 ... (up to 9, from out/stills/f<N>.png)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
out=$1; shift
args=(); n=0
for fr in "$@"; do args+=(-i "out/stills/f$fr.png"); n=$((n+1)); done
while [ $n -lt 9 ]; do args+=(-i "out/stills/f$1.png"); n=$((n+1)); done
lay="0_0|w0_0|w0+w1_0|0_h0|w0_h0|w0+w1_h0|0_h0+h1|w0_h0+h1|w0+w1_h0+h1"
$FF -v error "${args[@]}" -filter_complex "xstack=inputs=9:layout=$lay:fill=gray,drawbox=c=gray:t=2" -y "$out"
