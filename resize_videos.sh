#!/usr/bin/env bash
# save as: resize_videos.sh
# usage:   ./resize_videos.sh           # reads urls.txt
#          ./resize_videos.sh myurls.txt

set -euo pipefail

LIST=${1:-urls.txt}       # file with one Azure Blob URL per line
DL_DIR="downloaded"
OUT_DIR="compressed"

# Encoding params (tweak if you like)
HEIGHT=1280               # portrait-friendly target height (≈720p equivalent)
CRF=22                    # 18–23 sweet spot; lower = better quality, larger file
PRESET="slow"             # medium|slow|slower (slower = smaller file, longer encode)
AUDIO_BR="128k"

# Help ffmpeg parse “odd” MP4s over HTTP
PROBESIZE="100M"
ANALYZE="100M"

mkdir -p "$DL_DIR" "$OUT_DIR"

while IFS= read -r url; do
  [[ -z "$url" || "$url" =~ ^# ]] && continue

  # trim query string so the filename is clean
  fname="$(basename "${url%%\?*}")"
  in="$DL_DIR/$fname"
  out="$OUT_DIR/${fname%.*}-${HEIGHT}h.mp4"

  echo "↓ Downloading $url"
  curl -L \
    --fail \
    --retry 5 --retry-connrefused --retry-delay 2 \
    --continue-at - \
    -o "$in" "$url"

  echo "→ Transcoding $fname → $out"
  ffmpeg -y -nostdin \
    -analyzeduration $ANALYZE -probesize $PROBESIZE \
    -i "$in" \
    -c:v libx264 -preset "$PRESET" -crf "$CRF" \
    -vf "scale=-2:${HEIGHT}" \
    -movflags +faststart \
    -c:a aac -b:a "$AUDIO_BR" \
    "$out"

  echo "✅ Done: $out"
done < "$LIST"

echo "🎉 All videos processed. Check: $OUT_DIR/"
