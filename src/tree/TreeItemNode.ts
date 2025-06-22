import * as vscode from 'vscode';

export class TreeItemNode extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.None,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);
  }
}
