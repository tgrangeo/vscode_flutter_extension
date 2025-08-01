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
exports.createWidgetGetx = createWidgetGetx;
const vscode = __importStar(require("vscode"));
const utils_1 = require("../../utils/utils");
const widget_getx_1 = require("../../snippets/widget_getx");
async function createWidgetGetx(folderUri, classNameArg) {
    const workspace = vscode.workspace.workspaceFolders?.[0];
    if (!workspace)
        return;
    const className = classNameArg ?? await (0, utils_1.Input)("Nom du Widget (ex: InfoCard)");
    if (!className)
        return;
    const snakeCase = className.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    const featureName = await (0, utils_1.Input)("Nom de la feature (ex: reservation, user...)");
    if (!featureName)
        return;
    const uri = folderUri ?? await vscode.window.showOpenDialog({
        canSelectFolders: true,
        canSelectFiles: false,
        openLabel: 'Choisir le dossier où créer le widget',
    }).then(res => res?.[0]);
    if (!uri)
        return;
    const controllerClass = `${(0, utils_1.capitalize)(featureName)}Controller`;
    const content = (0, widget_getx_1.generateWidgetGetxFile)(className, controllerClass);
    const fileUri = vscode.Uri.joinPath(uri, `${snakeCase}_widget.dart`);
    try {
        await vscode.workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
        vscode.window.showInformationMessage(`🧩 Widget ${className}Widget créé dans ${fileUri.path}`);
    }
    catch (err) {
        vscode.window.showErrorMessage(`Erreur en créant le widget : ${err}`);
    }
}
//# sourceMappingURL=create_widget_getx.js.map