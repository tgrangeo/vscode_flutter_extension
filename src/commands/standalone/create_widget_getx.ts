import * as vscode from 'vscode';
import { capitalize, Input } from '../../utils/utils';
import { generateWidgetGetxFile } from '../../snippets/widget_getx';

export async function createWidgetGetx(folderUri?: vscode.Uri, classNameArg?: string) {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) return;

    const className = classNameArg ?? await Input("Nom du Widget (ex: InfoCard)");
    if (!className) return;

    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const featureName = await Input("Nom de la feature (ex: reservation, user...)");
    if (!featureName) return;

    const uri = folderUri ?? await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        openLabel: 'Choisir le dossier où créer le widget',
    }).then(res => res?.[0]);

    if (!uri) return;

    const controllerClass = `${capitalize(featureName)}Controller`;



    const content = generateWidgetGetxFile(className, controllerClass);


    const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_widget.dart`);

    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`🧩 Widget ${className}Widget créé dans ${fileUri.path}`);
    } catch (err) {
        vscode.window.showErrorMessage(`Erreur en créant le widget : ${err}`);
    }
}
