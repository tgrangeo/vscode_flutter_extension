import * as vscode from 'vscode';
import { generateControllerFile } from '../../snippets/view_controller_getx';
import { Input } from '../../utils/utils';
import { createTestFile } from '../standalone/create_test';

export async function createController(folderUri?: vscode.Uri, classNameArg?: string) {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) return;

  const className = classNameArg ?? await Input("Nom du Controller (ex: MyFeature)");
  if (!className) return;

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const uri = folderUri ?? await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    openLabel: 'Choisir le dossier où créer le controller',
  }).then(res => res?.[0]);

  if (!uri) return;

  const content = generateControllerFile(className);
  const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_controller.dart`);
  await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));

  vscode.window.showInformationMessage(`✅ Controller créé : ${fileUri.path}`);

  await createTestFile({ path: vscode.workspace.asRelativePath(uri), className: `${snakeCase}_controller` });
}
