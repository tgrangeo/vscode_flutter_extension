import * as vscode from 'vscode';
import { TreeItemNode } from './TreeItemNode';
import { InputTriggerItem } from './InputTriggerItem';

export class MyTreeDataProvider implements vscode.TreeDataProvider<TreeItemNode> {
  private _onDidChangeTreeData = new vscode.EventEmitter<TreeItemNode | undefined>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  // Conserve le context
  constructor(private context: vscode.ExtensionContext) { }

  // Nœuds parents : Actions et Snippets
  private linksRoot = new TreeItemNode("Quick Links", vscode.TreeItemCollapsibleState.Collapsed);
  private scriptsRoot = new TreeItemNode("Scripts", vscode.TreeItemCollapsibleState.Collapsed);
  private snippetsStandaloneRoot = new TreeItemNode("Snippets Standalone", vscode.TreeItemCollapsibleState.Collapsed);
  private snippetsGroupedRoot = new TreeItemNode("Snippets Grouped", vscode.TreeItemCollapsibleState.Collapsed);

  getTreeItem(element: TreeItemNode): vscode.TreeItem {
    return element;
  }

  getChildren(element?: TreeItemNode): vscode.ProviderResult<TreeItemNode[]> {
    if (!element) {
      return [this.linksRoot, this.scriptsRoot, this.snippetsGroupedRoot, this.snippetsStandaloneRoot];
    }

    // 🧭 ========== QUICK LINKS ==========
    if (element.label === "Quick Links") {
      return [
        new InputTriggerItem({
          label: "Open Wiki",
          command: "xefi-flutter.openWiki",
          tooltip: "Ouvrir le Wiki GitLab",
          desc: "Ouvre le Wiki du repo",
          icon: "book",
          context: this.context,
        }),
        new InputTriggerItem({
          label: "App Store Connect",
          command: "xefi-flutter.openAppleConnect",
          tooltip: "Aller sur App Store Connect",
          desc: "Déploiement iOS",
          icon: "media/apple.svg",
          context: this.context,
        }),
        new InputTriggerItem({
          label: "Google Play Console",
          command: "xefi-flutter.openPlayStore",
          tooltip: "Aller sur Google Play Console",
          desc: "Déploiement Android",
          icon: "media/android.svg",
          context: this.context,
        }),
      ]
    }

    // ⚙️ ========== SCRIPTS ==========
    if (element.label === "Scripts") {
      return [
        new InputTriggerItem({
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
        new InputTriggerItem({
          label: "Add a ViewController",
          command: "xefi-flutter.createViewController",
          tooltip: "Créer un ViewController Flutter",
          desc: "Snippet Flutter",
          icon: "symbol-method",
          context: this.context,
        }),
        new InputTriggerItem({
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
        new InputTriggerItem({
          label: "Add a Use Case",
          command: "xefi-flutter.createUseCase",
          tooltip: "Créer un use case",
          desc: "",
          icon: "symbol-method",
          context: this.context,
        }),
        new InputTriggerItem({
          label: "Add a Test File",
          command: "xefi-flutter.createTest",
          tooltip: "Créer un fichier de test",
          desc: "",
          icon: "symbol-method",
          context: this.context,
        }),
        new InputTriggerItem({
          label: "Add a View",
          command: "xefi-flutter.createView",
          tooltip: "Créer une view",
          desc: "",
          icon: "symbol-method",
          context: this.context,
        }),
        new InputTriggerItem({
          label: "Add a Controller",
          command: "xefi-flutter.createController",
          tooltip: "Créer un Controller",
          desc: "",
          icon: "symbol-method",
          context: this.context,
        }),
           new InputTriggerItem({
          label: "Add a Bindings",
          command: "xefi-flutter.createBindings",
          tooltip: "Créer un Bindings",
          desc: "",
          icon: "symbol-method",
          context: this.context,
        }),
           new InputTriggerItem({
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
