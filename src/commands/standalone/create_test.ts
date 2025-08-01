import * as vscode from 'vscode';
import { Input, toTestPath } from '../../utils/utils';
import { generateTestFile } from '../../snippets/test/test';

export async function createTestFile(options?: {
    workspace?: vscode.WorkspaceFolder,
    path?: string,
    className?: string,
}) {
    const workspace = options?.workspace ?? vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }

    // === Résoudre le chemin relatif depuis lib/
    let relativeLibPath = toTestPath(options?.path ?? "");
    if (!relativeLibPath) {
        const pickedUris = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            openLabel: 'Choisir un dossier dans lib/',
            defaultUri: vscode.Uri.joinPath(workspace.uri, 'lib'),
        });

        if (!pickedUris || pickedUris.length === 0) return;

        const pickedUri = pickedUris[0];
        const libUri = vscode.Uri.joinPath(workspace.uri, 'lib');

        relativeLibPath = pickedUri.path.replace(libUri.path + '/', '');
    }

    // === Nom de la classe
    let className = options?.className;
    if (!className) {
        className = await Input("Nom du test en PascalCase (ex: CreateUser)", true);
        if (!className) return;
    }

    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

    // === Appliquer le même chemin dans test/
    const testDir = vscode.Uri.joinPath(workspace.uri, relativeLibPath);
    await vscode.workspace.fs.createDirectory(testDir);

    const testFileUri = vscode.Uri.joinPath(testDir, `${snakeCase}_test.dart`);
    const content = generateTestFile(className);

    try {
        await vscode.workspace.fs.writeFile(testFileUri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`🧪 Test créé : test/${relativeLibPath}/${snakeCase}_test.dart`);
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture test : ${err}`);
    }
}
