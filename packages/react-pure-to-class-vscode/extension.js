'use strict';

const vscode = require('vscode');
const { createExtension } = require('./bundle');

module.exports = createExtension(vscode);
