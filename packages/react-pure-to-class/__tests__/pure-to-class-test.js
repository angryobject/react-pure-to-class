'use strict';

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'pure-to-class', null, 'regular-functions');
defineTest(__dirname, 'pure-to-class', null, 'arrow-functions');
