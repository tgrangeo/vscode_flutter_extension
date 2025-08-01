import * as vscode from 'vscode';
import * as path from 'path';
import { MyTreeDataProvider } from './tree/MyTreeDataProvider';
import { createViewControllerPrompt } from './commands/grouped/create_view_controller';
import { createEntityDtoMapperPrompt } from './commands/grouped/create_entity_dto_mapper';
import { fullUseCasePrompt } from './commands/standalone/create_use_case';
import { createTestFile } from './commands/standalone/create_test';
import { createView } from './commands/standalone/create_view';
import { createController } from './commands/standalone/create_controller';
import { createBindings } from './commands/standalone/create_bindings';
import { createWidgetGetx } from './commands/standalone/create_widget_getx';
import { createUseCase } from './commands/menus/usecase';
import { createService } from './commands/menus/service';
import { createDto } from './commands/menus/dto';

export function activate(context: vscode.ExtensionContext) {
  const treeDataProvider = new MyTreeDataProvider(context);
  vscode.window.registerTreeDataProvider("myView", treeDataProvider);
  vscode.window.createTreeView("myView", { treeDataProvider });

  context.subscriptions.push(
    vscode.commands.registerCommand('xefi-flutter.runBuildRunner', async () => {
      const terminal = vscode.window.createTerminal('Build Runner');
      terminal.show();
      terminal.sendText('dart run build_runner build --delete-conflicting-outputs');
    }),
    vscode.commands.registerCommand("xefi-flutter.openAppleConnect", () => {
      vscode.env.openExternal(vscode.Uri.parse("https://appstoreconnect.apple.com/"));
    }),
    vscode.commands.registerCommand("xefi-flutter.openPlayStore", () => {
      vscode.env.openExternal(vscode.Uri.parse("https://play.google.com/console"));
    }),
    vscode.commands.registerCommand("xefi-flutter.openWiki", () => {
      vscode.env.openExternal(vscode.Uri.parse("https://gitlab.xefi.fr/xefi/xefi-interne/yottacity/yottacitymobile/-/wikis/home"));
    }),
    vscode.commands.registerCommand("xefi-flutter.createViewController", createViewControllerPrompt),
    vscode.commands.registerCommand("xefi-flutter.createUseCase", fullUseCasePrompt),
    vscode.commands.registerCommand("xefi-flutter.createTest", createTestFile),
    vscode.commands.registerCommand("xefi-flutter.createEntityDtoMapper", createEntityDtoMapperPrompt),
    vscode.commands.registerCommand("xefi-flutter.createView", createView),
    vscode.commands.registerCommand("xefi-flutter.createController", createController),
    vscode.commands.registerCommand("xefi-flutter.createBindings", createBindings),
    vscode.commands.registerCommand("xefi-flutter.createWidgetGetx", createWidgetGetx),
    // explorer
    vscode.commands.registerCommand("xefi-flutter.createUseCaseFromExplorer", createUseCase),
    vscode.commands.registerCommand("xefi-flutter.createServiceFromExplorer", createService),
    vscode.commands.registerCommand("xefi-flutter.createDtoFromExplorer", createDto),
  );
}

export function deactivate() { }
