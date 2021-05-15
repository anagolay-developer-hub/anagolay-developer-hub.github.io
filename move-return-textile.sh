#!/usr/bin/env bash

ROOT_DIR="$(git rev-parse --show-toplevel)"

echo $ROOT_DIR

if [ $1 == "move" ]; then
    echo "Moving the .textile from public to root..."
    mkdir -p $ROOT_DIR/.tmp
    mv $ROOT_DIR/public/.textile $ROOT_DIR/.tmp/
    mv $ROOT_DIR/public/.textileseed $ROOT_DIR/.tmp/
fi

if [ $1 == "restore" ]; then
    echo "Restoring the .textile to public"
    mv $ROOT_DIR/.tmp/.textile $ROOT_DIR/public/
    mv $ROOT_DIR/.tmp/.textileseed $ROOT_DIR/public/
fi
