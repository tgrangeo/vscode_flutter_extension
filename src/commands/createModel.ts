// import * as vscode from 'vscode';
// import { generateModel } from '../snippets/model';

// export async function createModelPrompt() {
//   const widgetName = await vscode.window.showInputBox({
//     placeHolder: "Nom du Model (ex: MyModel)",
//     validateInput: (text) =>
//       /^[A-Z][A-Za-z0-9_]*$/.test(text) ? null : "Nom invalide (ex: MyModel)",
//   });

//   if (!widgetName) return;

//   const workspace = vscode.workspace.workspaceFolders?.[0];
//   if (!workspace) {
//     vscode.window.showErrorMessage("Aucun workspace ouvert.");
//     return;
//   }

//   let currentUri = vscode.Uri.joinPath(workspace.uri, 'lib');
//   try {
//     await vscode.workspace.fs.stat(currentUri);
//   } catch {
//     vscode.window.showErrorMessage("Dossier lib/ introuvable.");
//     return;
//   }

//   while (true) {
//     const entries = await vscode.workspace.fs.readDirectory(currentUri);
//     const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
//     const choices = folders.map(([name]) => name);
//     choices.unshift('[Créer ici]');
//     const picked = await vscode.window.showQuickPick(choices, {
//       placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(currentUri)}`
//     });

//     if (!picked) return;
//     if (picked === '[Créer ici]') break;

//     currentUri = vscode.Uri.joinPath(currentUri, picked);
//   }

//   const fileName = widgetName.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase() + ".dart";
//   const fileUri = vscode.Uri.joinPath(currentUri, fileName);
//   const content = generateModel(widgetName);

//   try {
//     await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, "utf8"));
//     const doc = await vscode.workspace.openTextDocument(fileUri);
//     await vscode.window.showTextDocument(doc);
//     vscode.window.showInformationMessage(`✅ ${fileName} créé dans ${vscode.workspace.asRelativePath(currentUri)}`);
//   } catch (err) {
//     vscode.window.showErrorMessage(`❌ Erreur : ${err}`);
//   }
// }
