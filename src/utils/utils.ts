import * as vscode from 'vscode';

export async function Input(name: string, isPascal = true): Promise<string | undefined> {
  return await vscode.window.showInputBox({
    placeHolder: `Nom du ${name} ${isPascal ? '(ex: MyModel)' : ''}`,
    validateInput: (text) => {
      if (isPascal && !/^[A-Z][A-Za-z0-9_]*$/.test(text)) {
        return "Nom invalide (ex: MyModel en PascalCase)";
      }
      return null;
    },
  });
}

export async function selectFolderRecursively(baseUri: vscode.Uri): Promise<vscode.Uri | undefined> {
  let currentUri = baseUri;

  while (true) {
    const entries = await vscode.workspace.fs.readDirectory(currentUri);
    const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
    const choices = folders.map(([name]) => name);
    choices.unshift('[Créer ici]');

    const picked = await vscode.window.showQuickPick(choices, {
      placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(currentUri)}`,
    });

    if (!picked) return undefined;
    if (picked === '[Créer ici]') break;

    currentUri = vscode.Uri.joinPath(currentUri, picked);
  }

  return currentUri;
}

export async function MonoRepoChooseApp(): Promise<string | undefined> {
  const workspace = vscode.workspace.workspaceFolders?.[0];
  if (!workspace) {
    vscode.window.showErrorMessage("Aucun workspace ouvert.");
    return;
  }
  var baseUri = vscode.Uri.joinPath(workspace.uri, 'lib/');
  const entries = await vscode.workspace.fs.readDirectory(baseUri);
  const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
  const choices = folders.map(([name]) => name);
  const picked = await vscode.window.showQuickPick(choices, {
    placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(baseUri)}`,
  });
  if (!picked) return undefined;
  return picked
}

export function toTestPath(fullPath: string): string {
  const parts = fullPath.split(/\/|\\/); 
  const libIndex = parts.indexOf('lib');
  if (libIndex === -1 || libIndex === parts.length - 1) {
    return 'test';
  }

  const relativeParts = parts.slice(libIndex + 1); 
  return vscode.Uri.joinPath(vscode.Uri.file('test'), ...relativeParts).path.slice(1);
}

export function capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

