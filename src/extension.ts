import * as vscode from "vscode";

import { Kangxi } from "./kangxi";

const KANGXI = new Kangxi();

const replaceSelections = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }
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

const selectAllKangxis = () => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.selections = KANGXI.getRanges(editor).map((range) => {
      return new vscode.Selection(range.start, range.end);
    });
  }
};

export function activate(context: vscode.ExtensionContext) {

  context.subscriptions.push(
    vscode.commands.registerCommand("format-kangxi.selectAll", selectAllKangxis)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("format-kangxi.replaceSelection", replaceSelections)
  );

}

export function deactivate() {}
