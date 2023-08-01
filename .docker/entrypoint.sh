#!/bin/bash

npm install
npx prisma generate
tail -f /dev/null