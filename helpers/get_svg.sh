#!/bin/bash

TARG_DIR=~/dev/resume/public/svg-icons

if [ $# -lt 1 ]; then
    echo "Missing args"
    return
fi

FILE_NAME=$(echo $1 | sed 's/.svg//')

xsel -b >> $TARG_DIR/$FILE_NAME.svg

sed -i 's/viewBox.*\"/& xmlns=\"http:\/\/www\.w3\.org\/2000\/svg\" /' $TARG_DIR/$FILE_NAME.svg

