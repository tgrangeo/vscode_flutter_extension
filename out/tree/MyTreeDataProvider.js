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
exports.MyTreeDataProvider = void 0;
const vscode = __importStar(require("vscode"));
const TreeItemNode_1 = require("./TreeItemNode");
const InputTriggerItem_1 = require("./InputTriggerItem");
class MyTreeDataProvider {
    context;
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    // Conserve le context
    constructor(context) {
        this.context = context;
    }
    // Nœuds parents : Actions et Snippets
    linksRoot = new TreeItemNode_1.TreeItemNode("Quick Links", vscode.TreeItemCollapsibleState.Collapsed);
    scriptsRoot = new TreeItemNode_1.TreeItemNode("Scripts", vscode.TreeItemCollapsibleState.Collapsed);
    snippetsStandaloneRoot = new TreeItemNode_1.TreeItemNode("Snippets Standalone", vscode.TreeItemCollapsibleState.Collapsed);
    snippetsGroupedRoot = new TreeItemNode_1.TreeItemNode("Snippets Grouped", vscode.TreeItemCollapsibleState.Collapsed);
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            return [this.linksRoot, this.scriptsRoot, this.snippetsGroupedRoot, this.snippetsStandaloneRoot];
        }
        // 🧭 ========== QUICK LINKS ==========
        if (element.label === "Quick Links") {
            return [
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Open Wiki",
                    command: "xefi-flutter.openWiki",
                    tooltip: "Ouvrir le Wiki GitLab",
                    desc: "Ouvre le Wiki du repo",
                    icon: "book",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "App Store Connect",
                    command: "xefi-flutter.openAppleConnect",
                    tooltip: "Aller sur App Store Connect",
                    desc: "Déploiement iOS",
                    icon: "media/apple.svg",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Google Play Console",
                    command: "xefi-flutter.openPlayStore",
                    tooltip: "Aller sur Google Play Console",
                    desc: "Déploiement Android",
                    icon: "media/android.svg",
                    context: this.context,
                }),
            ];
        }
        // ⚙️ ========== SCRIPTS ==========
        if (element.label === "Scripts") {
            return [
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Run build_runner",
                    command: "xefi-flutter.runBuildRunner",
                    tooltip: "Exécuter build_runner",
                    desc: "Génération automatique",
                    icon: "gear",
                    context: this.context,
                }),
            ];
        }
        // ✂️ ========== SNIPPETS GROUPED ==========
        if (element.label === "Snippets Grouped") {
            return [
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a ViewController",
                    command: "xefi-flutter.createViewController",
                    tooltip: "Créer un ViewController Flutter",
                    desc: "Snippet Flutter",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add an Entity",
                    command: "xefi-flutter.createEntityDtoMapper",
                    tooltip: "Créer un contrôleur GetX",
                    desc: "Dto + Entity + Mapper",
                    icon: "symbol-method",
                    context: this.context,
                }),
            ];
        }
        // 🧪 ========== SNIPPETS STANDALONE ==========
        if (element.label === "Snippets Standalone") {
            return [
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a Use Case",
                    command: "xefi-flutter.createUseCase",
                    tooltip: "Créer un use case",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a Test File",
                    command: "xefi-flutter.createTest",
                    tooltip: "Créer un fichier de test",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a View",
                    command: "xefi-flutter.createView",
                    tooltip: "Créer une view",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a Controller",
                    command: "xefi-flutter.createController",
                    tooltip: "Créer un Controller",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a Bindings",
                    command: "xefi-flutter.createBindings",
                    tooltip: "Créer un Bindings",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
                new InputTriggerItem_1.InputTriggerItem({
                    label: "Add a WidgetGetX",
                    command: "xefi-flutter.createWidgetGetx",
                    tooltip: "Créer un WidgetGetX",
                    desc: "",
                    icon: "symbol-method",
                    context: this.context,
                }),
            ];
        }
        return [];
    }
}
exports.MyTreeDataProvider = MyTreeDataProvider;
//# sourceMappingURL=MyTreeDataProvider.js.map