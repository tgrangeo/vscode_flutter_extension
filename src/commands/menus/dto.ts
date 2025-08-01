import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { createTestFile } from '../standalone/create_test';
import { generateDtoFile } from '../../snippets/entity_dto_mapper';

export async function createDto(uri: vscode.Uri) {
    const className = await Input("Nom du Dto (ex: MyFeature)");
    if (!className) return;
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const dtoFolderUri = vscode.Uri.joinPath(uri, `${snakeCase}_dto`);
    await vscode.workspace.fs.createDirectory(dtoFolderUri);
    const fileUri = vscode.Uri.joinPath(dtoFolderUri, `${snakeCase}_dto.dart`);
    const fileContent = generateDtoFile(className);
    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
        return;
    }

    vscode.window.showInformationMessage(`✅ Dto ${className}Service créé dans ${uri}`);

    await createTestFile({ path: 'domain/user', className: 'CreateUser' });
    vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_dto_test.dart créé dans test/${uri}`);
}
