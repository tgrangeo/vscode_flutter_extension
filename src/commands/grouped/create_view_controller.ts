import * as vscode from 'vscode';
import { Input, MonoRepoChooseApp, selectFolderRecursively } from '../../utils/utils';
import { generateBindingsFile, generateControllerFile, generateViewFile } from '../../snippets/view_controller_getx';
import { isMono } from '../../utils/settings';
import { createTestFile } from '../standalone/create_test';

export async function createViewControllerPrompt() {

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Aucun workspace ouvert.");
    return;
  }

  let baseUri: vscode.Uri;

  if (isMono()) {
    const appName = await MonoRepoChooseApp();
    if (!appName) return;
    baseUri = vscode.Uri.joinPath(workspace.uri, 'lib', appName, 'view');
  } else {
    baseUri = vscode.Uri.joinPath(workspace.uri, 'lib/view');
  }

  try {
    await vscode.workspace.fs.stat(baseUri);
  } catch {
    await vscode.workspace.fs.createDirectory(baseUri);
    vscode.window.showInformationMessage(`📁 Dossier ${vscode.workspace.asRelativePath(baseUri)} créé automatiquement.`);
  }

  const selectedUri = await selectFolderRecursively(baseUri);
  if (!selectedUri) return;

  const className = await Input("Nom de la View (ex: MyFeature)");
  if (!className) return;

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const folderUri = vscode.Uri.joinPath(selectedUri, snakeCase);
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
    },
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

  await createTestFile({ path: baseUri.path, className: `${snakeCase}_controller` });
}

