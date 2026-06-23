#!/usr/bin/env bash
set -euo pipefail

FF="${FF:-ffmpeg}"
FP="${FP:-ffprobe}"
REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
FRAMES="$REPO/docs/video-frames"
CLIPS="$REPO/docs/video-clips"
OUT="$REPO/docs/video-master"
WORK="${WORK:-/tmp/fmbuild/work}"
SEG="$WORK/seg"
NAVY="0x0B1B2B"

rm -rf "$WORK"; mkdir -p "$SEG" "$OUT"

# Fonts: copy locally so drawtext doesn't fight Windows path escaping.
cp "C:/Windows/Fonts/arialbd.ttf" "$WORK/bold.ttf"
cp "C:/Windows/Fonts/arial.ttf" "$WORK/reg.ttf"
BOLD="$WORK/bold.ttf"; REG="$WORK/reg.ttf"

# Common encode params so every segment concatenates cleanly (-c copy safe).
enc=(-c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -r 30 -video_track_timescale 30000 -an)

# --- slate(out, dur, SHOT, subtitle, insertline, metaline) ----------------
slate() {
  local out="$1" dur="$2" shot="$3" sub="$4" ins="$5" meta="$6"
  "$FF" -y -hide_banner -loglevel error \
    -f lavfi -i "color=c=${NAVY}:s=1920x1080:d=${dur}:r=30" \
    -vf "
      drawbox=x=0:y=0:w=1920:h=10:color=0xE0A458:t=fill,
      drawtext=fontfile='${BOLD}':text='${shot}':fontcolor=white:fontsize=140:x=(w-text_w)/2:y=300,
      drawtext=fontfile='${REG}':text='${sub}':fontcolor=0xC9D6E3:fontsize=46:x=(w-text_w)/2:y=500,
      drawtext=fontfile='${BOLD}':text='${ins}':fontcolor=0xE0A458:fontsize=44:x=(w-text_w)/2:y=640,
      drawtext=fontfile='${REG}':text='${meta}':fontcolor=0x8FA3B3:fontsize=36:x=(w-text_w)/2:y=740,
      format=yuv420p" \
    "${enc[@]}" "$out"
  echo "  slate $out (${dur}s)"
}

# --- still_seg(out, dur, pngname) -----------------------------------------
still_seg() {
  local out="$1" dur="$2" png="$3"
  "$FF" -y -hide_banner -loglevel error -loop 1 -t "$dur" -i "$FRAMES/$png" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=${NAVY},setsar=1,format=yuv420p" \
    "${enc[@]}" "$out"
  echo "  still $out (${dur}s) <- $png"
}

# --- motion_seg(out, dur, clip): scale live capture into 1080p, freeze-fill to dur
motion_seg() {
  local out="$1" dur="$2" clip="$3"
  "$FF" -y -hide_banner -loglevel error -i "$CLIPS/$clip" \
    -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=${NAVY},setsar=1,fps=30,tpad=stop_mode=clone:stop_duration=45,format=yuv420p" \
    -t "$dur" "${enc[@]}" "$out"
  echo "  motion $out (${dur}s) <- $clip"
}

echo "== slates =="
slate "$SEG/s01.mp4"  8 "SHOT 1"  "Problem - cold open (title card / b-roll, no on-camera)" "INSERT PRODUCED OPENER"     "8s"
slate "$SEG/s02.mp4" 20 "SHOT 2"  "Problem - desaturated b-roll montage"                 "INSERT B-ROLL"                "20s"
slate "$SEG/s03.mp4" 18 "SHOT 3"  "Problem - cost icons to agency grid (mograph)"        "INSERT MOTION GRAPHIC"        "18s"
slate "$SEG/s17.mp4" 18 "SHOT 17" "TRL / SBIR Phase III badge (mograph)"                 "INSERT MOTION GRAPHIC"        "18s - FILL IN REAL TRL VALUE"
slate "$SEG/s19.mp4" 14 "SHOT 19" "CTA - Tradewinds Silver Aisle + QR (mograph)"         "INSERT MOTION GRAPHIC"        "14s - CONFIRM CONTACT / QR"
slate "$SEG/s20.mp4"  7 "SHOT 20" "Guidehouse logo lockup end card (mograph)"            "INSERT MOTION GRAPHIC"        "7s"

echo "== still segments (product shots) =="
still_seg "$SEG/p04.mp4" 15 shot04_overview_hero.png
still_seg "$SEG/p05.mp4" 14 shot05_overview_pipeline.png
still_seg "$SEG/p06.mp4" 14 shot06_recon_titlecard_idle.png
still_seg "$SEG/p07.mp4" 13 shot07_recon_progress.png
still_seg "$SEG/p08.mp4" 13 shot08_recon_exceptions.png
still_seg "$SEG/p09.mp4" 12 shot09_recon_auditready.png
still_seg "$SEG/p10.mp4" 12 shot10_pbc_titlecard.png
still_seg "$SEG/p11.mp4" 12 shot11_pbc_routed.png
still_seg "$SEG/p12.mp4" 16 shot12_pbc_provenance.png
still_seg "$SEG/p13.mp4" 16 shot13_pbc_package.png
still_seg "$SEG/p14.mp4" 10 shot14_lineage_fullchain.png
still_seg "$SEG/p15.mp4" 16 shot15-16-18_overview_strips.png
still_seg "$SEG/p16.mp4" 18 shot15-16-18_overview_strips.png
still_seg "$SEG/p18.mp4" 15 shot15-16-18_overview_strips.png

# ---- Deliverable 1: clean stills animatic (VO-sync master) ----
echo "== concat: stills animatic =="
ANI_LIST="$WORK/ani.txt"
{
  for s in s01 s02 s03 p04 p05 p06 p07 p08 p09 p10 p11 p12 p13 p14 p15 p16 s17 p18 s19 s20; do
    echo "file '$SEG/$s.mp4'"
  done
} > "$ANI_LIST"
"$FF" -y -hide_banner -loglevel error -f concat -safe 0 -i "$ANI_LIST" -c copy \
  "$OUT/FM-Future_VO-sync-master_1080p_silent.mp4"
echo "  -> FM-Future_VO-sync-master_1080p_silent.mp4"

# ---- Deliverable 2: motion rough-cut ----
# Motion where live captures genuinely map: overview-early (4-5), guided spine
# (6-13), lineage (14). Everything else reuses the animatic stills/slates.
echo "== motion blocks =="
motion_seg "$SEG/m0405.mp4" 29 pass1-overview.mp4        # shots 4+5 (15+14)
motion_seg "$SEG/m0613.mp4" 108 pass2-guided-spine.mp4   # shots 6-13 (14+13+13+12+12+12+16+16)
motion_seg "$SEG/m14.mp4"   10 pass3-lineage.mp4         # shot 14

echo "== concat: motion rough-cut =="
MO_LIST="$WORK/mo.txt"
{
  for s in s01 s02 s03 m0405 m0613 m14 p15 p16 s17 p18 s19 s20; do
    echo "file '$SEG/$s.mp4'"
  done
} > "$MO_LIST"
"$FF" -y -hide_banner -loglevel error -f concat -safe 0 -i "$MO_LIST" -c copy \
  "$OUT/FM-Future_motion-roughcut_1080p_silent.mp4"
echo "  -> FM-Future_motion-roughcut_1080p_silent.mp4"

echo "== verify =="
for f in "$OUT/FM-Future_VO-sync-master_1080p_silent.mp4" "$OUT/FM-Future_motion-roughcut_1080p_silent.mp4"; do
  d=$("$FP" -v error -show_entries format=duration -of csv=p=0 "$f")
  dim=$("$FP" -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames -of csv=p=0 "$f")
  na=$("$FP" -v error -select_streams a -show_entries stream=index -of csv=p=0 "$f" | wc -l)
  echo "$(basename "$f"): dur=${d}s  $dim  audio_streams=${na}"
done
echo "DONE"
