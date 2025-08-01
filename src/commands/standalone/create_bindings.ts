import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { generateBindingsFile } from '../../snippets/view_controller_getx';

export async function createBindings(folderUri?: vscode.Uri, classNameArg?: string) {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) return;

  const className = classNameArg ?? await Input("Nom du Bindings (ex: MyFeature)");
  if (!className) return;

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

  const uri = folderUri ?? await vscode.window.showOpenDialog({
    canSelectFolders: true,
    canSelectFiles: false,
    openLabel: 'Choisir le dossier où créer le Bindings',
  }).then(res => res?.[0]);

  if (!uri) return;

  const content = generateBindingsFile(className);
  const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_bindings.dart`);

  try {
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
    vscode.window.showInformationMessage(`✅ Bindings créé : ${fileUri.path}`);
  } catch (err) {
    vscode.window.showErrorMessage(`Erreur en créant le Bindings : ${err}`);
  }
}
