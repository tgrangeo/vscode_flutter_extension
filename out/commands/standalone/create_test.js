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
exports.createTestFile = createTestFile;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../../utils/utils");
const test_1 = require("../../snippets/test/test");
async function createTestFile(options) {
    const workspace = options?.workspace ?? vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }
    // === Résoudre le chemin relatif depuis lib/
    let relativeLibPath = (0, utils_1.toTestPath)(options?.path ?? "");
    if (!relativeLibPath) {
        const pickedUris = await vscode.window.showOpenDialog({
            canSelectFolders: true,
            canSelectFiles: false,
            openLabel: 'Choisir un dossier dans lib/',
            defaultUri: vscode.Uri.joinPath(workspace.uri, 'lib'),
        });
        if (!pickedUris || pickedUris.length === 0)
            return;
        const pickedUri = pickedUris[0];
        const libUri = vscode.Uri.joinPath(workspace.uri, 'lib');
        relativeLibPath = pickedUri.path.replace(libUri.path + '/', '');
    }
    // === Nom de la classe
    let className = options?.className;
    if (!className) {
        className = await (0, utils_1.Input)("Nom du test en PascalCase (ex: CreateUser)", true);
        if (!className)
            return;
    }
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    // === Appliquer le même chemin dans test/
    const testDir = vscode.Uri.joinPath(workspace.uri, relativeLibPath);
    await vscode.workspace.fs.createDirectory(testDir);
    const testFileUri = vscode.Uri.joinPath(testDir, `${snakeCase}_test.dart`);
    const content = (0, test_1.generateTestFile)(className);
    try {
        await vscode.workspace.fs.writeFile(testFileUri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`🧪 Test créé : test/${relativeLibPath}/${snakeCase}_test.dart`);
    }
    catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture test : ${err}`);
    }
}
//# sourceMappingURL=create_test.js.map