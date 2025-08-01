import { TreeItemNode } from './TreeItemNode';
import * as vscode from 'vscode';
import * as path from 'path';

interface InputTriggerParams {
  label: string;
  command: string;
  tooltip: string;
  desc: string;
  icon?: string;
  context: vscode.ExtensionContext;
}

export class InputTriggerItem extends TreeItemNode {
  constructor({ label, command, tooltip, desc, icon, context }: InputTriggerParams) {
    super(label, vscode.TreeItemCollapsibleState.None, {
      command,
      title: 'Prompt input',
      arguments: [label],
    });

    this.tooltip = tooltip;
    this.description = desc;

    if (icon) {
      if (icon.startsWith('media/')) {
        const fullPath = vscode.Uri.file(context.asAbsolutePath(icon));
        this.iconPath = fullPath;
      } else {
        this.iconPath = new vscode.ThemeIcon(icon);
      }
    }
  }
}
