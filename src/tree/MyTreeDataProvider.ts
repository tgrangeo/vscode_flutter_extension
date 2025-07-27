import * as vscode from 'vscode';
import { TreeItemNode } from './TreeItemNode';
import { InputTriggerItem } from './InputTriggerItem';

export class MyTreeDataProvider implements vscode.TreeDataProvider<TreeItemNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<TreeItemNode | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  getTreeItem(element: TreeItemNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItemNode): vscode.ProviderResult<TreeItemNode[]> {
    if (!element) {
      // Two root-level sections: "Snippet" and "Script"
      return [
        new TreeItemNode("Snippet", vscode.TreeItemCollapsibleState.Expanded),
        new TreeItemNode("Script", vscode.TreeItemCollapsibleState.Expanded),
      ];
    }

    if (element.label === "Snippet") {
      return [
        new InputTriggerItem("add a view controller", 'xefi-flutter.createViewController'),
      ];
    }

    if (element.label === "Script") {
      return [
        new InputTriggerItem("Run build_runner", 'xefi-flutter.runBuildRunner'),
      ];
    }

    return [];
  }
}
