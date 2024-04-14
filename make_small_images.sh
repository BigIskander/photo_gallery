#!/bin/bash
cd ./images
for f in *.jpg; do
    echo ../output/$f
    ffmpeg -i $f -vf scale=w=150:h=150:force_original_aspect_ratio=decrease ../output/$f
done
cd ..