#!/bin/bash
watermark_image="../watermark_small.png"
images_folder="../images"
file_extensions='(.jpg|.jpeg)$'
miniatures_folder="../output3"
# make miniatures
for f in $(ls $images_folder/* | grep -E -i $file_extensions); do
    file=$(basename $f)
    ffmpeg -i $f -i $watermark_image -filter_complex "overlay=W-w-5:H-h-5" $miniatures_folder/$file
done