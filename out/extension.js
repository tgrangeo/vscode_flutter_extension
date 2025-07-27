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
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const MyTreeDataProvider_1 = require("./tree/MyTreeDataProvider");
const create_view_controller_1 = require("./commands/create_view_controller");
// import { createWidgetPrompt } from './commands/createWidget';
// import { createModelPrompt } from './commands/createModel';
function activate(context) {
    const treeDataProvider = new MyTreeDataProvider_1.MyTreeDataProvider();
    vscode.window.registerTreeDataProvider("myView", treeDataProvider);
    vscode.window.createTreeView("myView", { treeDataProvider });
    context.subscriptions.push(vscode.commands.registerCommand("xefi-flutter.createViewController", create_view_controller_1.createViewControllerPrompt));
    vscode.commands.registerCommand('xefi-flutter.runBuildRunner', async () => {
        const terminal = vscode.window.createTerminal('Build Runner');
        terminal.show();
        terminal.sendText('dart run build_runner build --delete-conflicting-outputs');
    });
}
function deactivate() { }
//# sourceMappingURL=extension.js.map