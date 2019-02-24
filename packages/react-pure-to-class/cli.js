#!/usr/bin/env node

const stdin = process.openStdin();
const jscodeshift = require('jscodeshift');
const getParser = require('jscodeshift/src/getParser');
const pureToClass = require('./pure-to-class');
const parser = getParser(process.argv[2] || 'babel');

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
      {
        parser,
      }
    );
  } finally {
    console.log(output || input); // eslint-disable-line no-console
  }
});
