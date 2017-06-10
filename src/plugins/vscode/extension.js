'use strict';

const vscode = require('vscode');
const jscodeshift = require('jscodeshift');
const pureToClass = require('../../pure-to-class');

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    'extension.reactPureToClass',
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const doc = editor.document;

      if (['javascript', 'javascriptreact'].indexOf(doc.languageId) === -1) {
        return;
      }

      const selection = editor.selection;
      const text = doc.getText(selection);

      let output;

      try {
        output = pureToClass(
          { source: text },
          {
            jscodeshift,
            stats: () => {},
          },
          {}
        );
      } catch (e) {
        vscode.window.showInformationMessage('Bad selection');
        return;
      }

      if (output === text) {
        vscode.window.showInformationMessage('Nothing to transform');
        return;
      }

      editor.edit(function(builder) {
        builder.replace(selection, output);
      });
    }
  );

  context.subscriptions.push(disposable);
}

exports.activate = activate;
