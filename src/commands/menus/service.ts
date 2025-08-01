import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { generateService } from '../../snippets/service';
import { createTestFile } from '../standalone/create_test';

export async function createService(uri: vscode.Uri) {

    const className = await Input("Nom du Service (ex: MyFeature)");
    if (!className) return;

    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_service.dart`);
    const fileContent = generateService(className);

    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
        return;
    }

    vscode.window.showInformationMessage(`✅ Use case ${className}Service créé dans ${uri}`);

    await createTestFile({ path: 'domain/user', className: 'CreateUser' });
    vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_use_case_test.dart créé dans test/${uri}`);
}
