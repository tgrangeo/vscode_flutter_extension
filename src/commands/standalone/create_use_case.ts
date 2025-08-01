import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { generateUseCaseFile } from '../../snippets/use_case';
import { createTestFile } from './create_test';;

export async function fullUseCasePrompt() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }

    const domainUri = vscode.Uri.joinPath(workspace.uri, 'lib', 'domain');

    // Récupère les dossiers dans lib/domain
    let entries: [string, vscode.FileType][];
    try {
        entries = await vscode.workspace.fs.readDirectory(domainUri);
    } catch {
        vscode.window.showErrorMessage("Dossier lib/domain/ introuvable.");
        return;
    }

    const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
    const choices = folders.map(([name]) => name);
    const picked = await vscode.window.showQuickPick(choices, {
        placeHolder: `Choisissez le domain où ajouter votre use case`,
    });

    if (!picked) return;

    const className = await Input("Nom du Use Case en PascalCase (ex: CreateUser)");
    if (!className) return;

    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

    // === Créer le fichier UseCase dans lib/ ===
    const folderUri = vscode.Uri.joinPath(domainUri, picked, 'use_case');
    await vscode.workspace.fs.createDirectory(folderUri);

    const fileUri = vscode.Uri.joinPath(folderUri, `${snakeCase}_use_case.dart`);
    const fileContent = generateUseCaseFile(className, snakeCase);

    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
        return;
    }

    vscode.window.showInformationMessage(`✅ Use case ${className}UseCase créé dans lib/domain/${picked}/use_case`);

    await createTestFile({ path: 'domain/user', className: 'CreateUser' });
    vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_use_case_test.dart créé dans test/domain/${picked}/use_case`);
}
