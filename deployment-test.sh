#!/bin/sh
set -uex
rm -r -f sme-ui-v2
git clone https://fonradar:Cuma_2020@bitbucket.org/fonradar/sme-ui-v2.git
cd sme-ui-v2
docker stop smeui-test
docker rm smeui-test
docker image prune -a
docker-compose -f docker-compose.test.yml up -d