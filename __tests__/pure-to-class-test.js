'use strict';

const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'src/pure-to-class', null, 'pure');
