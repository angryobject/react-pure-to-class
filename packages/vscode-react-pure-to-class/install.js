#!/usr/bin/env node
/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const { execSync } = require('child_process');
const { DESTINATION } = require('./conf');

if (fs.existsSync(DESTINATION)) {
  console.log(`File ${DESTINATION} already exists`);
  return;
}

try {
  execSync(`ln -s ${__dirname} ${DESTINATION}`);
  console.log(`Created a symlink in ${DESTINATION}`);
} catch (e) {
  console.log(
    `Something went wrong. Couldn't create a symlink in ${DESTINATION}`
  );
}
