#!/bin/bash
images_folder="./images"
file_extensions='(.jpg|.jpeg)$'
images_folder_website="/images"
miniatures_folder_website="/output"
is_name=true
# make JSON
output="{ \"images\": [\n"
    for f in $(ls $images_folder/* | grep -E -i $file_extensions); do
        file=$(basename $f)
        if $is_name; then name=$file; else name=""; fi
        output=$output"\t{ \"image\": \"$images_folder_website/$file\", \"miniature\": \"$miniatures_folder_website/$file\", \"name\": \"$name\" },\n"
    done
output=${output%",\n"}
output=$output"\n]}\n"
echo -e $output