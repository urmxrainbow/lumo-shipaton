#!/bin/bash
# Tile out/stills/*.png into 2x2 review sheets in out/sheets/
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
mkdir -p out/sheets; rm -f out/sheets/*.png
files=(out/stills/*.png); n=0
for ((i=0;i<${#files[@]};i+=4)); do
  n=$((n+1)); set -- "${files[@]:i:4}"
  while [ $# -lt 4 ]; do set -- "$@" "${files[0]}"; done
  $FF -v error -i "$1" -i "$2" -i "$3" -i "$4" -filter_complex "[0][1][2][3]xstack=inputs=4:layout=0_0|w0_0|0_h0|w0_h0:fill=gray" -y out/sheets/sheet$n.png
done
ls out/sheets
