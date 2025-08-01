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
const create_view_controller_1 = require("./commands/grouped/create_view_controller");
const create_entity_dto_mapper_1 = require("./commands/grouped/create_entity_dto_mapper");
const create_use_case_1 = require("./commands/standalone/create_use_case");
const create_test_1 = require("./commands/standalone/create_test");
const create_view_1 = require("./commands/standalone/create_view");
const create_controller_1 = require("./commands/standalone/create_controller");
const create_bindings_1 = require("./commands/standalone/create_bindings");
const create_widget_getx_1 = require("./commands/standalone/create_widget_getx");
const usecase_1 = require("./commands/menus/usecase");
const service_1 = require("./commands/menus/service");
const dto_1 = require("./commands/menus/dto");
function activate(context) {
    const treeDataProvider = new MyTreeDataProvider_1.MyTreeDataProvider(context);
    vscode.window.registerTreeDataProvider("myView", treeDataProvider);
    vscode.window.createTreeView("myView", { treeDataProvider });
    context.subscriptions.push(vscode.commands.registerCommand('xefi-flutter.runBuildRunner', async () => {
        const terminal = vscode.window.createTerminal('Build Runner');
        terminal.show();
        terminal.sendText('dart run build_runner build --delete-conflicting-outputs');
    }), vscode.commands.registerCommand("xefi-flutter.openAppleConnect", () => {
        vscode.env.openExternal(vscode.Uri.parse("https://appstoreconnect.apple.com/"));
    }), vscode.commands.registerCommand("xefi-flutter.openPlayStore", () => {
        vscode.env.openExternal(vscode.Uri.parse("https://play.google.com/console"));
    }), vscode.commands.registerCommand("xefi-flutter.openWiki", () => {
        vscode.env.openExternal(vscode.Uri.parse("https://gitlab.xefi.fr/xefi/xefi-interne/yottacity/yottacitymobile/-/wikis/home"));
    }), vscode.commands.registerCommand("xefi-flutter.createViewController", create_view_controller_1.createViewControllerPrompt), vscode.commands.registerCommand("xefi-flutter.createUseCase", create_use_case_1.fullUseCasePrompt), vscode.commands.registerCommand("xefi-flutter.createTest", create_test_1.createTestFile), vscode.commands.registerCommand("xefi-flutter.createEntityDtoMapper", create_entity_dto_mapper_1.createEntityDtoMapperPrompt), vscode.commands.registerCommand("xefi-flutter.createView", create_view_1.createView), vscode.commands.registerCommand("xefi-flutter.createController", create_controller_1.createController), vscode.commands.registerCommand("xefi-flutter.createBindings", create_bindings_1.createBindings), vscode.commands.registerCommand("xefi-flutter.createWidgetGetx", create_widget_getx_1.createWidgetGetx), 
    // explorer
    vscode.commands.registerCommand("xefi-flutter.createUseCaseFromExplorer", usecase_1.createUseCase), vscode.commands.registerCommand("xefi-flutter.createServiceFromExplorer", service_1.createService), vscode.commands.registerCommand("xefi-flutter.createDtoFromExplorer", dto_1.createDto));
}
function deactivate() { }
//# sourceMappingURL=extension.js.map