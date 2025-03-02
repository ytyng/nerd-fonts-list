#!/usr/bin/env zsh

cd $(dirname $0)/../

curl "https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json" > data/glyphnames.json
