#!/usr/bin/env zsh

# brew install woff2

cd $(dirname $0)/../
woff2_compress data/RobotoMonoNerdFontMono-Regular.ttf
mv data/RobotoMonoNerdFontMono-Regular.woff2 static/fonts/
