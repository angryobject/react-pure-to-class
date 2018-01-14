'use strict';

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'pure-to-class', null, 'regular-functions');
defineTest(__dirname, 'pure-to-class', null, 'arrow-functions');

const jscodeshift = require('jscodeshift');
const pureToClass = require('../pure-to-class');

const api = {
  jscodeshift,
  stats: () => {},
};

const transform = source => pureToClass({ source }, api, {});

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
