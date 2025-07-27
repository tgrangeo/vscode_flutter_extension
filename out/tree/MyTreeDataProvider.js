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
    _onDidChangeTreeData = new vscode.EventEmitter();
    onDidChangeTreeData = this._onDidChangeTreeData.event;
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        if (!element) {
            // Two root-level sections: "Snippet" and "Script"
            return [
                new TreeItemNode_1.TreeItemNode("Snippet", vscode.TreeItemCollapsibleState.Expanded),
                new TreeItemNode_1.TreeItemNode("Script", vscode.TreeItemCollapsibleState.Expanded),
            ];
        }
        if (element.label === "Snippet") {
            return [
                new InputTriggerItem_1.InputTriggerItem("add a view controller", 'xefi-flutter.createViewController'),
            ];
        }
        if (element.label === "Script") {
            return [
                new InputTriggerItem_1.InputTriggerItem("Run build_runner", 'xefi-flutter.runBuildRunner'),
            ];
        }
        return [];
    }
}
exports.MyTreeDataProvider = MyTreeDataProvider;
//# sourceMappingURL=MyTreeDataProvider.js.map