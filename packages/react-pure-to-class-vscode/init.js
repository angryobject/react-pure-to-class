'use strict';

const jscodeshift = require('jscodeshift');
const getParser = require('jscodeshift/src/getParser');
const pureToClass = require('react-pure-to-class');

const tsFiles = ['typescript', 'typescriptreact'];
const supportedFiles = ['javascript', 'javascriptreact', ...tsFiles];

module.exports = vscode => ({
  activate(context) {
    const disposable = vscode.commands.registerCommand(
      'extension.reactPureToClass',
      () => {
        const editor = vscode.window.activeTextEditor;
        const config = vscode.workspace.getConfiguration('reactPureToClass');

        if (!editor) {
          return;
        }

        const doc = editor.document;

        if (!supportedFiles.includes(doc.languageId)) {
          vscode.window.showInformationMessage(
            'Only available for javascript/typescript/react file types'
          );
          return;
        }

        const parser = tsFiles.includes(doc.languageId) ? 'tsx' : 'babel';

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
            {
              parser: getParser(parser),
              reactComponent: config.reactComponent,
            }
          );
        } catch (e) {
          vscode.window.showInformationMessage(
            'Something went wrong (probably bad selection)'
          );
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
  },
});
