"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createViewControllerPrompt = createViewControllerPrompt;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils/utils");
const view_controller_getx_1 = require("../snippets/view_controller_getx");
async function createViewControllerPrompt() {
    const className = await (0, utils_1.Input)("Nom de la View (ex: MyFeature)");
    if (!className)
        return;
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }
    let currentUri = vscode.Uri.joinPath(workspace.uri, 'lib');
    try {
        await vscode.workspace.fs.stat(currentUri);
    }
    catch {
        vscode.window.showErrorMessage("Dossier lib/ introuvable.");
        return;
    }
    while (true) {
        const entries = await vscode.workspace.fs.readDirectory(currentUri);
        const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
        const choices = folders.map(([name]) => name);
        choices.unshift('[Créer ici]');
        const picked = await vscode.window.showQuickPick(choices, {
            placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(currentUri)}`
        });
        if (!picked)
            return;
        if (picked === '[Créer ici]')
            break;
        currentUri = vscode.Uri.joinPath(currentUri, picked);
    }
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const folderUri = vscode.Uri.joinPath(currentUri, snakeCase);
    await vscode.workspace.fs.createDirectory(folderUri);
    const files = [
        {
            name: `${snakeCase}_view.dart`,
            content: (0, view_controller_getx_1.generateViewFile)(className),
        },
        {
            name: `${snakeCase}_controller.dart`,
            content: (0, view_controller_getx_1.generateControllerFile)(className),
        },
        {
            name: `${snakeCase}_bindings.dart`,
            content: (0, view_controller_getx_1.generateBindingsFile)(className),
        }
    ];
    for (const file of files) {
        const fileUri = vscode.Uri.joinPath(folderUri, file.name);
        try {
            await vscode.workspace.fs.writeFile(fileUri, Buffer.from(file.content, "utf8"));
        }
        catch (err) {
            vscode.window.showErrorMessage(`Erreur en créant ${file.name} : ${err}`);
        }
    }
    vscode.window.showInformationMessage(`✅ Fichiers ${className}View, Controller et Bindings créés dans ${vscode.workspace.asRelativePath(folderUri)}`);
}
//# sourceMappingURL=create_view_controller.js.map