'use strict';

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'pure-to-class', null, 'regular-functions');
defineTest(__dirname, 'pure-to-class', null, 'arrow-functions');

const fs = require('fs');
const jscodeshift = require('jscodeshift');
const getParser = require('jscodeshift/src/getParser');
const pureToClass = require('../pure-to-class');

const api = {
  jscodeshift,
  stats: () => {},
};

const getFixture = name =>
  fs.readFileSync(__dirname + `/../__testfixtures__/${name}`, 'utf-8');

const transform = (source, options = {}) =>
  pureToClass({ source }, api, options);

test('invalid transforms', () => {
  expect(transform('function C(arg1, arg2) {return <span />}')).toBe(
    'function C(arg1, arg2) {return <span />}'
  );

  expect(transform('function C(arg1 = defaultArg) {return <span />}')).toBe(
    'function C(arg1 = defaultArg) {return <span />}'
  );

  expect(
    transform('const obj = {c(arg1 = defaultArg) {return <span />}}')
  ).toBe('const obj = {c(arg1 = defaultArg) {return <span />}}');

  expect(transform('class C { someFn(props) {return <span />}}')).toBe(
    'class C { someFn(props) {return <span />}}'
  );

  expect(transform('function someFn(a, b) {return (props) => <span />}')).toBe(
    'function someFn(a, b) {return (props) => <span />}'
  );
});

test('typescript transforms', () => {
  const inputTS = getFixture('typescript.input.tsx');
  const outputTS = getFixture('typescript.output.tsx');

  expect(transform(inputTS, { parser: getParser('tsx') })).toBe(outputTS);
});
