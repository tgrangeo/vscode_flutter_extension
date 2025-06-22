import * as vscode from 'vscode';

export async function Input(name:string) {
  return await vscode.window.showInputBox({
        placeHolder: "Nom du  " + name,
        validateInput: (text) =>
            /^[A-Z][A-Za-z0-9_]*$/.test(text) ? null : "Nom invalide (ex: MyModel)",
    });
}