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
exports.Input = Input;
exports.selectFolderRecursively = selectFolderRecursively;
exports.MonoRepoChooseApp = MonoRepoChooseApp;
exports.toTestPath = toTestPath;
exports.capitalize = capitalize;
const vscode = __importStar(require("vscode"));
async function Input(name, isPascal = true) {
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
async function selectFolderRecursively(baseUri) {
    let currentUri = baseUri;
    while (true) {
        const entries = await vscode.workspace.fs.readDirectory(currentUri);
        const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
        const choices = folders.map(([name]) => name);
        choices.unshift('[Créer ici]');
        const picked = await vscode.window.showQuickPick(choices, {
            placeHolder: `Choisis un dossier dans ${vscode.workspace.asRelativePath(currentUri)}`,
        });
        if (!picked)
            return undefined;
        if (picked === '[Créer ici]')
            break;
        currentUri = vscode.Uri.joinPath(currentUri, picked);
    }
    return currentUri;
}
async function MonoRepoChooseApp() {
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
    if (!picked)
        return undefined;
    return picked;
}
function toTestPath(fullPath) {
    const parts = fullPath.split(/\/|\\/);
    const libIndex = parts.indexOf('lib');
    if (libIndex === -1 || libIndex === parts.length - 1) {
        return 'test';
    }
    const relativeParts = parts.slice(libIndex + 1);
    return vscode.Uri.joinPath(vscode.Uri.file('test'), ...relativeParts).path.slice(1);
}
function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
//# sourceMappingURL=utils.js.map