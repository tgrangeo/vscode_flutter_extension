import * as vscode from 'vscode';
import { Input } from '../utils/utils';
import { generateBindingsFile, generateControllerFile, generateViewFile } from '../snippets/view_controller_getx';

export async function createViewControllerPrompt() {
  const className = await Input("Nom de la View (ex: MyFeature)");
  if (!className) return;

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Aucun workspace ouvert.");
    return;
  }

  let currentUri = vscode.Uri.joinPath(workspace.uri, 'lib');
  try {
    await vscode.workspace.fs.stat(currentUri);
  } catch {
    vscode.window.showErrorMessage("Dossier lib/ introuvable.");
    return;
  }

  while (true) {
    const entries = await vscode.workspace.fs.readDirectory(currentUri);
    const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
    const choices = folders.map(([name]) => name);
    choices.unshift('[Créer ici]');
    const picked = await vscode.window.showQuickPick(choices, {
      placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(currentUri)}`
    });

    if (!picked) return;
    if (picked === '[Créer ici]') break;

    currentUri = vscode.Uri.joinPath(currentUri, picked);
  }

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const folderUri = vscode.Uri.joinPath(currentUri, snakeCase);
  await vscode.workspace.fs.createDirectory(folderUri);

  const files = [
    {
      name: `${snakeCase}_view.dart`,
      content: generateViewFile(className),
    },
    {
      name: `${snakeCase}_controller.dart`,
      content: generateControllerFile(className),
    },
    {
      name: `${snakeCase}_bindings.dart`,
      content: generateBindingsFile(className),
    }
  ];

  for (const file of files) {
    const fileUri = vscode.Uri.joinPath(folderUri, file.name);
    try {
      await vscode.workspace.fs.writeFile(fileUri, Buffer.from(file.content, "utf8"));
    } catch (err) {
      vscode.window.showErrorMessage(`Erreur en créant ${file.name} : ${err}`);
    }
  }

  vscode.window.showInformationMessage(`✅ Fichiers ${className}View, Controller et Bindings créés dans ${vscode.workspace.asRelativePath(folderUri)}`);
}
