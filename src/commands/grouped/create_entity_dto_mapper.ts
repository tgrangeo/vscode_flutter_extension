import * as vscode from 'vscode';
import { Input, MonoRepoChooseApp } from '../../utils/utils';
import {
  generateEntityFile,
  generateDtoFile,
  generateMapperFile,
} from '../../snippets/entity_dto_mapper';
import { isMono } from '../../utils/settings';

export async function createEntityDtoMapperPrompt() {

  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Aucun workspace ouvert.");
    return;
  }

  let baseUri: vscode.Uri;

  if (isMono()) {
    const appName = await MonoRepoChooseApp();
    if (!appName) return;
    baseUri = vscode.Uri.joinPath(workspace.uri, 'lib', appName);
  } else {
    baseUri = vscode.Uri.joinPath(workspace.uri, 'lib');
  }

  const className = await Input("Nom de l'entité (ex: Reservation)");
  if (!className) return;

  const domainUri = vscode.Uri.joinPath(baseUri, 'domain');
  const dataUri = vscode.Uri.joinPath(baseUri, 'data', 'dto');

  const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  const folderUri = vscode.Uri.joinPath(domainUri, snakeCase);
  const mapperUri = vscode.Uri.joinPath(folderUri, 'mapper');
  const dtoUri = vscode.Uri.joinPath(dataUri, `${snakeCase}_dto`);

  await vscode.workspace.fs.createDirectory(folderUri);
  await vscode.workspace.fs.createDirectory(mapperUri);
  await vscode.workspace.fs.createDirectory(dtoUri);

  const files = [
    {
      uri: vscode.Uri.joinPath(folderUri, `${snakeCase}.dart`),
      content: generateEntityFile(className),
    },
    {
      uri: vscode.Uri.joinPath(dtoUri, `${snakeCase}_dto.dart`),
      content: generateDtoFile(className),
    },
    {
      uri: vscode.Uri.joinPath(mapperUri, `${snakeCase}_mapper.dart`),
      content: generateMapperFile(className),
    },
  ];

  for (const file of files) {
    try {
      await vscode.workspace.fs.writeFile(file.uri, Buffer.from(file.content, 'utf8'));
    } catch (err) {
      vscode.window.showErrorMessage(`Erreur en créant ${file.uri.path} : ${err}`);
    }
  }

  vscode.window.showInformationMessage(`✅ Fichiers ${className} générés dans domain/data`);
}
