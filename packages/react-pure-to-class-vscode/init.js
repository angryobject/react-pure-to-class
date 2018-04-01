'use strict';

const jscodeshift = require('jscodeshift');
const pureToClass = require('react-pure-to-class');

module.exports = vscode => ({
  activate(context) {
    const disposable = vscode.commands.registerCommand(
      'extension.reactPureToClass',
      () => {
        const editor = vscode.window.activeTextEditor;
        const config = vscode.workspace.getConfiguration('reactPureToClass');
        const supportedLangs = ['javascript', 'javascriptreact'].concat(
          config.typescript ? ['typescript', 'typescriptreact'] : []
        );

        if (!editor) {
          return;
        }

        const doc = editor.document;

        if (supportedLangs.indexOf(doc.languageId) === -1) {
          const msg = config.typescript
            ? 'Only available for javascript/typescript/react file types'
            : 'Only available for javascript/react file types. Check settings for typescript support';

          vscode.window.showInformationMessage(msg);
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
