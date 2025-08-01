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
const utils_1 = require("../../utils/utils");
const view_controller_getx_1 = require("../../snippets/view_controller_getx");
const settings_1 = require("../../utils/settings");
const create_test_1 = require("../standalone/create_test");
async function createViewControllerPrompt() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }
    let baseUri;
    if ((0, settings_1.isMono)()) {
        const appName = await (0, utils_1.MonoRepoChooseApp)();
        if (!appName)
            return;
        baseUri = vscode.Uri.joinPath(workspace.uri, 'lib', appName, 'view');
    }
    else {
        baseUri = vscode.Uri.joinPath(workspace.uri, 'lib/view');
    }
    try {
        await vscode.workspace.fs.stat(baseUri);
    }
    catch {
        await vscode.workspace.fs.createDirectory(baseUri);
        vscode.window.showInformationMessage(`📁 Dossier ${vscode.workspace.asRelativePath(baseUri)} créé automatiquement.`);
    }
    const selectedUri = await (0, utils_1.selectFolderRecursively)(baseUri);
    if (!selectedUri)
        return;
    const className = await (0, utils_1.Input)("Nom de la View (ex: MyFeature)");
    if (!className)
        return;
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const folderUri = vscode.Uri.joinPath(selectedUri, snakeCase);
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
        },
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
    await (0, create_test_1.createTestFile)({ path: baseUri.path, className: `${snakeCase}_controller` });
}
//# sourceMappingURL=create_view_controller.js.map