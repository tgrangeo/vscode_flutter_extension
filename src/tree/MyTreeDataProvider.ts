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
      return [new TreeItemNode("Snippet", vscode.TreeItemCollapsibleState.Expanded)];
    }

    if (element.label === "Snippet") {
      return [new InputTriggerItem("add a widget", 'xefi-flutter.createWidget'),new InputTriggerItem("add a model", 'xefi-flutter.createModel')];
    }

    return [];
  }
}
