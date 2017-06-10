#!/usr/bin/env node
/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const { execSync } = require('child_process');
const { DESTINATION } = require('./conf');

if (!fs.existsSync(DESTINATION)) {
  console.log(`Nothing to remove. ${DESTINATION} doesn't exist`);
  return;
}

const stat = fs.lstatSync(DESTINATION);

if (!stat.isSymbolicLink()) {
  console.log(
    `File ${DESTINATION} doesn't appear to be a symlink. Probably, it wasn't created by us. Check manually`
  );
  return;
}

if (fs.readlinkSync(DESTINATION) !== __dirname) {
  console.log(
    `Symlink ${DESTINATION} points to a different folder. Probably, it wasn't created by us. Check manually`
  );
  return;
}

try {
  execSync(`rm ${DESTINATION}`);
  console.log(`Removed symlink ${DESTINATION}`);
} catch (e) {
  console.log(`Something went wrong. Couldn't remove symlink ${DESTINATION}`);
}
