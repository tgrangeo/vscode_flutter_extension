import { TreeItemNode } from './TreeItemNode';
import * as vscode from 'vscode';

export class InputTriggerItem extends TreeItemNode {
  constructor(label: string, command: string) {
    super(label, vscode.TreeItemCollapsibleState.None, {
      command: command,
      title: 'Prompt input',
      arguments: [label],
    });

    this.tooltip = 'Ajouter un widget';
    this.description = 'Clique ici';

    // Ajoute une icône VSCode intégrée, ex : 'add' ou 'symbol-event' ou autre
    this.iconPath = new vscode.ThemeIcon('add');
  }
}
