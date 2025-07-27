import * as vscode from 'vscode';
import { MyTreeDataProvider } from './tree/MyTreeDataProvider';
import { createViewControllerPrompt } from './commands/create_view_controller';
// import { createWidgetPrompt } from './commands/createWidget';
// import { createModelPrompt } from './commands/createModel';

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new MyTreeDataProvider();
  vscode.window.registerTreeDataProvider("myView", treeDataProvider);
  vscode.window.createTreeView("myView", { treeDataProvider });

  context.subscriptions.push(
    vscode.commands.registerCommand("xefi-flutter.createViewController", createViewControllerPrompt),
  );

  vscode.commands.registerCommand('xefi-flutter.runBuildRunner', async () => {
  const terminal = vscode.window.createTerminal('Build Runner');
  terminal.show();
  terminal.sendText('dart run build_runner build --delete-conflicting-outputs');
});

}

export function deactivate() {}
