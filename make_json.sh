#!/bin/bash
output="{ \"images\": [\n"
    cd ./images
        for f in *.jpg; do
            output=$output"\t{ \"image\": \"./images/$f\", \"miniature\": \"./output/$f\", \"name\": \"$f\" },\n"
        done
    cd ..
output=${output%",\n"}
output=$output"\n]}\n"
echo -e $output