#!/usr/bin/env node

const stdin = process.openStdin();
const jscodeshift = require('jscodeshift');
const pureToClass = require('./pure-to-class');

let input = '';

stdin.on('data', function(chunk) {
  input += chunk;
});

stdin.on('end', function() {
  let output;

  try {
    output = pureToClass(
      { source: input },
      {
        jscodeshift,
        stats: () => {},
      },
      {}
    );
  } finally {
    console.log(output || input); // eslint-disable-line no-console
  }
});
