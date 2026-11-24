#!/usr/bin/env bash
# Copies the latest screenshots, videos and compositions of the app into public/media/, resized
# and compressed for the web. Run it after regenerating them in the app repository
# (`npm run screenshots`, `npm run videos`, `npm run screenshots:creative`):
#
#   npm run media                      # reads ../jeannot-app
#   npm run media -- /path/to/app      # or another checkout
#
# Needs ffmpeg and cwebp (`brew install ffmpeg webp`).
set -euo pipefail

APP="${1:-$(dirname "$0")/../../jeannot-app}"
OUT="$(dirname "$0")/../public/media"
LANGS=(en fr)
PHONE="iphone-17-pro"
TABLET="ipad-pro-13"

[ -d "$APP/screenshots" ] || { echo "No screenshots in $APP: pass the app repository path" >&2; exit 1; }

webp() { # webp <source> <target> <width> [quality]
  cwebp -quiet -resize "$3" 0 -q "${4:-80}" -alpha_q 90 "$1" -o "$2"
}

video() { # video <source> <target> <width>
  ffmpeg -v error -y -i "$1" -an -vf "scale=$3:-2,fps=30" -c:v libx264 -preset slow -crf 30 \
    -pix_fmt yuv420p -movflags +faststart "$2"
}

mkdir -p "$OUT/brand"

# The engravings of the app, on a transparent background.
ILLUS="$APP/public/assets/illus"
webp "$ILLUS/jeannot-banner-illus2.webp" "$OUT/brand/gardener.webp" 640 82
webp "$ILLUS/fruit-illus.png" "$OUT/brand/tomatoes.webp" 640 60
webp "$ILLUS/leaf-illus.png" "$OUT/brand/cabbage.webp" 560 60
webp "$ILLUS/flower-illus.png" "$OUT/brand/flowers.webp" 560 60
webp "$ILLUS/root-illus.png" "$OUT/brand/root.webp" 560 60
webp "$ILLUS/moon.png" "$OUT/brand/moon.webp" 480 60

for lang in "${LANGS[@]}"; do
  mkdir -p "$OUT/$lang"
  shots="$APP/screenshots/$lang/$PHONE"

  # Phone screens, shown in a drawn frame.
  for page in 01-today 02-my-garden 04-plant-detail 05-garden-map 06-garden-map-bed 08-journal \
    09-guilds 11-calendar 12-encyclopedia 13-species-detail 15-ask-jeannot; do
    webp "$shots/$page.png" "$OUT/$lang/${page#*-}.webp" 660 80
  done

  # Pieces of interface, floated next to the phones.
  for snippet in guild-card journal-entry plant-stage species-row todo-task; do
    webp "$shots/snippets/$snippet.png" "$OUT/$lang/snippet-$snippet.webp" 640 82
  done

  # The garden plan on a large screen: the top of the tablet screenshot, as a 16:10 window.
  tmp="$(mktemp -t jeannot-web).png"
  ffmpeg -v error -y -i "$APP/screenshots/$lang/$TABLET/05-garden-map.png" \
    -vf "crop=iw:iw*0.625:0:0" -frames:v 1 -update 1 "$tmp"
  webp "$tmp" "$OUT/$lang/web-garden-plan.webp" 1600 80
  rm -f "$tmp"

  # The tour of the app in the hero, and plant identification in the assistant section.
  video "$APP/videos/$lang/app-preview/iphone-886x1920.mp4" "$OUT/$lang/tour.mp4" 480
  video "$APP/videos/$lang/iphone/11-identify-plant.mp4" "$OUT/$lang/identify-plant.mp4" 440
  ffmpeg -v error -y -ss 17 -i "$APP/videos/$lang/iphone/11-identify-plant.mp4" -frames:v 1 \
    -update 1 "$tmp"
  webp "$tmp" "$OUT/$lang/identify-plant.webp" 660 80
  rm -f "$tmp"

  # The share card (Open Graph, 1200×630), cut from the centre of the 16:9 composition.
  ffmpeg -v error -y -i "$APP/screenshots-creative/$lang/header-universal-16x9.png" \
    -vf "crop=iw:iw*0.525,scale=1200:630" -frames:v 1 -update 1 -q:v 3 "$OUT/$lang/og-image.jpg"
done

du -sh "$OUT"
