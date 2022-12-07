import * as vscode from "vscode";

import { Kangxi } from "./kangxi";

const KANGXI = new Kangxi();

const replaceSelections = (editor: vscode.TextEditor) => {
  editor.edit((editBuilder) => {
    editor.selections
      .filter((sel) => !sel.isEmpty)
      .forEach((sel) => {
        const text = editor.document.getText(sel);
        const newText = KANGXI.replaceToJapanese(text);
        if (text != newText) {
          editBuilder.replace(sel, newText);
        }
      });
  });
};

const selectAllKangxis = (editor: vscode.TextEditor) => {
  editor.selections = KANGXI.getRanges(editor).map((range) => {
    return new vscode.Selection(range.start, range.end);
  });
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("format-kangxi.selectAll", (editor: vscode.TextEditor) => {
      selectAllKangxis(editor);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("format-kangxi.replaceSelection", (editor: vscode.TextEditor) => {
      replaceSelections(editor);
    })
  );
}

export function deactivate() {}
