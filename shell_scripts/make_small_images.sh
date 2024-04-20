#!/bin/bash
images_folder="./images"
file_extensions='(.jpg|.jpeg)$'
miniatures_folder="./output"
square_size=150
# make miniatures
for f in $(ls $images_folder/* | grep -E -i $file_extensions); do
    file=$(basename $f)
    ffmpeg -i $f -vf scale=w=$square_size:h=$square_size:force_original_aspect_ratio=decrease $miniatures_folder/$file
done