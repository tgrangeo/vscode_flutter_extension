import * as vscode from 'vscode';
import { Input } from '../../utils/utils';
import { generateUseCaseFile } from '../../snippets/use_case';
import { createTestFile } from '../standalone/create_test';

export async function createUseCase(uri: vscode.Uri) {

  const className = await Input("Nom du Use Case (ex: MyFeature)");
  if (!className) return;

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_use_case.dart`);
  const fileContent = generateUseCaseFile(className, snakeCase);

  try {
    await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
  } catch (err) {
    vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
    return;
  }

  vscode.window.showInformationMessage(`✅ Use case ${className}UseCase créé dans ${uri}`);

  await createTestFile({ path: 'domain/user', className: 'CreateUser' });
  vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_use_case_test.dart créé dans test/${uri}`);
}
