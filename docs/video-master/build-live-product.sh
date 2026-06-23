#!/usr/bin/env bash
set -euo pipefail

FF="${FF:-ffmpeg}"
FP="${FP:-ffprobe}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
CAPS="${CAPS:-/tmp/fmbuild/caps}"
OUT="$REPO/docs/video-master"
WORK="${WORK:-/tmp/fmbuild/work2}"
SEG="$WORK/seg"
NAVY="0x0B1B2B"

rm -rf "$WORK"; mkdir -p "$SEG" "$OUT"
cp "C:/Windows/Fonts/arialbd.ttf" "$WORK/bold.ttf"
cp "C:/Windows/Fonts/arial.ttf" "$WORK/reg.ttf"
BOLD="$WORK/bold.ttf"; REG="$WORK/reg.ttf"

enc=(-c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 -video_track_timescale 30000 -an)

slate() {
  local out="$1" dur="$2" shot="$3" sub="$4" ins="$5" meta="$6"
  "$FF" -y -hide_banner -loglevel error \
    -f lavfi -i "color=c=${NAVY}:s=1920x1080:d=${dur}:r=30" \
    -vf "drawbox=x=0:y=0:w=1920:h=10:color=0xE0A458:t=fill,
      drawtext=fontfile='${BOLD}':text='${shot}':fontcolor=white:fontsize=140:x=(w-text_w)/2:y=300,
      drawtext=fontfile='${REG}':text='${sub}':fontcolor=0xC9D6E3:fontsize=46:x=(w-text_w)/2:y=500,
      drawtext=fontfile='${BOLD}':text='${ins}':fontcolor=0xE0A458:fontsize=44:x=(w-text_w)/2:y=640,
      drawtext=fontfile='${REG}':text='${meta}':fontcolor=0x8FA3B3:fontsize=36:x=(w-text_w)/2:y=740,
      format=yuv420p" \
    "${enc[@]}" "$out"; echo "  slate $out (${dur}s)"
}

# cutshot(id, dur): take the LAST <dur>s of the capture (front-trim the load/scroll lead-in).
cutshot() {
  local id="$1"
  local dur="$2"
  local src="$CAPS/$id.webm"
  local total ss
  total=$("$FP" -v error -show_entries format=duration -of csv=p=0 "$src")
  ss=$(awk "BEGIN{s=$total-$dur; if(s<0)s=0; print s}")
  "$FF" -y -hide_banner -loglevel error -ss "$ss" -i "$src" -t "$dur" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=${NAVY},setsar=1,fps=30,format=yuv420p" \
    "${enc[@]}" "$SEG/$id.mp4"; echo "  cut $id (${dur}s) from ${total}s"
}

echo "== slates (6 external shots) =="
slate "$SEG/s01.mp4"  8 "SHOT 1"  "Problem - on camera (Joe to camera, GH lower-third)" "INSERT ON-CAMERA FOOTAGE"  "8s"
slate "$SEG/s02.mp4" 20 "SHOT 2"  "Problem - desaturated b-roll montage"                "INSERT B-ROLL"             "20s"
slate "$SEG/s03.mp4" 18 "SHOT 3"  "Problem - cost icons to agency grid (mograph)"       "INSERT MOTION GRAPHIC"     "18s"
slate "$SEG/s17.mp4" 18 "SHOT 17" "TRL / SBIR Phase III badge (mograph)"                "INSERT MOTION GRAPHIC"     "18s - FILL IN REAL TRL VALUE"
slate "$SEG/s19.mp4" 14 "SHOT 19" "CTA - Tradewinds Silver Aisle + QR (mograph)"        "INSERT MOTION GRAPHIC"     "14s - CONFIRM CONTACT / QR"
slate "$SEG/s20.mp4"  7 "SHOT 20" "Guidehouse logo lockup end card (mograph)"           "INSERT MOTION GRAPHIC"     "7s"

echo "== cut 14 live product shots =="
cutshot p04 15; cutshot p05 14; cutshot p06 14; cutshot p07 13; cutshot p08 13; cutshot p09 12
cutshot p10 12; cutshot p11 12; cutshot p12 16; cutshot p13 16; cutshot p14 10
cutshot p15 16; cutshot p16 18; cutshot p18 15

echo "== concat: live product master =="
LIST="$WORK/list.txt"; : > "$LIST"
for s in s01 s02 s03 p04 p05 p06 p07 p08 p09 p10 p11 p12 p13 p14 p15 p16 s17 p18 s19 s20; do
  echo "file '$SEG/$s.mp4'" >> "$LIST"
done
"$FF" -y -hide_banner -loglevel error -f concat -safe 0 -i "$LIST" -c copy \
  "$OUT/FM-Future_live-product_1080p_silent.mp4"

echo "== verify =="
f="$OUT/FM-Future_live-product_1080p_silent.mp4"
d=$("$FP" -v error -show_entries format=duration -of csv=p=0 "$f")
dim=$("$FP" -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of csv=p=0 "$f")
na=$("$FP" -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f" | wc -l)
sz=$(du -h "$f" | cut -f1)
echo "$(basename "$f"): dur=${d}s  $dim  audio=${na}  size=${sz}"
echo "DONE"
