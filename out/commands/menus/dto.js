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
exports.createDto = createDto;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../../utils/utils");
const create_test_1 = require("../standalone/create_test");
const entity_dto_mapper_1 = require("../../snippets/entity_dto_mapper");
async function createDto(uri) {
    const className = await (0, utils_1.Input)("Nom du Dto (ex: MyFeature)");
    if (!className)
        return;
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const dtoFolderUri = vscode.Uri.joinPath(uri, `${snakeCase}_dto`);
    await vscode.workspace.fs.createDirectory(dtoFolderUri);
    const fileUri = vscode.Uri.joinPath(dtoFolderUri, `${snakeCase}_dto.dart`);
    const fileContent = (0, entity_dto_mapper_1.generateDtoFile)(className);
    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(fileContent, 'utf8'));
    }
    catch (err) {
        vscode.window.showErrorMessage(`Erreur écriture fichier : ${err}`);
        return;
    }
    vscode.window.showInformationMessage(`✅ Dto ${className}Service créé dans ${uri}`);
    await (0, create_test_1.createTestFile)({ path: 'domain/user', className: 'CreateUser' });
    vscode.window.showInformationMessage(`🧪 Test ${snakeCase}_dto_test.dart créé dans test/${uri}`);
}
//# sourceMappingURL=dto.js.map