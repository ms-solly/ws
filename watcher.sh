#!/bin/bash

while inotifywait -e create,modify,move ./imgs; do
    gcc add_image.c -o add_image
    ./add_image
    echo "Images updated. Reloading webpage..."
    curl -s -X POST http://localhost:8080 > /dev/null
done
