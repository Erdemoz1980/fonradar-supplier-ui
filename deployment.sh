#!/bin/sh
set -uex
rm -r -f sme-ui
git clone https://fonradar:347\>eV4q@bitbucket.org/fonradar/sme-ui-v2.git
cd sme-ui
docker stop smeui
docker rm smeui
docker image prune -a
docker-compose up -d