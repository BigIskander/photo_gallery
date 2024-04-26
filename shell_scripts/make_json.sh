#!/bin/bash
images_folder="./images"
file_extensions='(.jpg|.jpeg)$'
images_folder_website="/images"
miniatures_folder_website="/output"
is_large=true
large_folder_wibsite="/output2"
is_name=true
# make JSON
output="const images = [\n"
    for f in $(ls $images_folder/* | grep -E -i $file_extensions); do
        file=$(basename $f)
        if $is_name; then name=$file; else name=""; fi
        if $is_large; then large=" large: \"$large_folder_wibsite/$file\","; else large=""; fi
        output=$output"\t{$large image: \"$images_folder_website/$file\", miniature: \"$miniatures_folder_website/$file\", name: \"$name\" },\n"
    done
output=${output%",\n"}
output=$output"\n]\n"
echo -e $output