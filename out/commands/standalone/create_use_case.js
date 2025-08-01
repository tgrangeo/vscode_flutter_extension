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
exports.fullUseCasePrompt = fullUseCasePrompt;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../../utils/utils");
const use_case_1 = require("../../snippets/use_case");
const create_test_1 = require("./create_test");
;
async function fullUseCasePrompt() {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }
    const domainUri = vscode.Uri.joinPath(workspace.uri, 'lib', 'domain');
    // Récupère les dossiers dans lib/domain
    let entries;
    try {
        entries = await vscode.workspace.fs.readDirectory(domainUri);
    }
    catch {
        vscode.window.showErrorMessage("Dossier lib/domain/ introuvable.");
        return;
    }
    const folders = entries.filter(([_, type]) => type === vscode.FileType.Directory);
    const choices = folders.map(([name]) => name);
    const picked = await vscode.window.showQuickPick(choices, {
        placeHolder: `Choisissez le domain où ajouter votre use case`,
    });
    if (!picked)
        return;
    const className = await (0, utils_1.Input)("Nom du Use Case en PascalCase (ex: CreateUser)");
    if (!className)
        return;
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    // === Créer le fichier UseCase dans lib/ ===
    const folderUri = vscode.Uri.joinPath(domainUri, picked, 'use_case');
    await vscode.workspace.fs.createDirectory(folderUri);
    const fileUri = vscode.Uri.joinPath(folderUri, `${snakeCase}_use_case.dart`);
    const fileContent = (0, use_case_1.generateUseCaseFile)(className, snakeCase);
    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
    }
    catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
        return;
    }
    vscode.window.showInformationMessage(`✅ Use case ${className}UseCase créé dans lib/domain/${picked}/use_case`);
    await (0, create_test_1.createTestFile)({ path: 'domain/user', className: 'CreateUser' });
    vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_use_case_test.dart créé dans test/domain/${picked}/use_case`);
}
//# sourceMappingURL=create_use_case.js.map