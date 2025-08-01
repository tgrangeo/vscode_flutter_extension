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
exports.createEntityDtoMapperPrompt = createEntityDtoMapperPrompt;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../utils/utils");
const entity_dto_mapper_1 = require("../snippets/entity_dto_mapper");
async function createEntityDtoMapperPrompt() {
    const className = await (0, utils_1.Input)("Nom de l'entité (ex: Reservation)");
    if (!className)
        return;
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace) {
        vscode.window.showErrorMessage("Aucun workspace ouvert.");
        return;
    }
    const domainUri = vscode.Uri.joinPath(workspace.uri, 'lib', 'domain');
    const dataUri = vscode.Uri.joinPath(workspace.uri, 'lib', 'data', 'dto');
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
            content: (0, entity_dto_mapper_1.generateEntityFile)(className),
        },
        {
            uri: vscode.Uri.joinPath(dtoUri, `${snakeCase}_dto.dart`),
            content: (0, entity_dto_mapper_1.generateDtoFile)(className),
        },
        {
            uri: vscode.Uri.joinPath(mapperUri, `${snakeCase}_mapper.dart`),
            content: (0, entity_dto_mapper_1.generateMapperFile)(className),
        },
    ];
    for (const file of files) {
        try {
            await vscode.workspace.fs.writeFile(file.uri, Buffer.from(file.content, 'utf8'));
        }
        catch (err) {
            vscode.window.showErrorMessage(`Erreur en créant ${file.uri.path} : ${err}`);
        }
    }
    vscode.window.showInformationMessage(`✅ Fichiers ${className} générés dans domain/data`);
}
//# sourceMappingURL=create_entity_dto_mapper.js.map