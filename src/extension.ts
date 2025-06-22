import * as vscode from 'vscode';
import { MyTreeDataProvider } from './tree/MyTreeDataProvider';
import { createWidgetPrompt } from './commands/createWidget';
import { createModelPrompt } from './commands/createModel';

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new MyTreeDataProvider();
  vscode.window.registerTreeDataProvider("myView", treeDataProvider);
  vscode.window.createTreeView("myView", { treeDataProvider });

  context.subscriptions.push(
    vscode.commands.registerCommand("xefi-flutter.createWidget", createWidgetPrompt),
	vscode.commands.registerCommand("xefi-flutter.createModel", createModelPrompt)
  );
}

export function deactivate() {}
