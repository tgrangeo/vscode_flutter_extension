import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { generateViewFile } from '../../snippets/view_controller_getx';

export async function createView(uri: vscode.Uri) {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const className = await Input("Nom de la View (ex: MyFeature)");
    if (!className) return;

    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

    if (!uri) return;

    const content = generateViewFile(className);
    const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_view.dart`);

    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`✅ View créée : ${fileUri.path}`);
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur en créant la View : ${err}`);
    }
}
