import * as vscode from 'vscode';

export function isMono(): boolean {
    const config = vscode.workspace.getConfiguration("Xefi Flutter Toolkit");
    return config.get<boolean>("isMonoRepo") ?? false;
}

export function packageName(): string {
    const config = vscode.workspace.getConfiguration("Xefi Flutter Toolkit");
    return config.get<string>("packageName") ?? "";
}

export function urlGitlab(): string {
    const config = vscode.workspace.getConfiguration("Xefi Flutter Toolkit");
    return config.get<string>("packageName") ?? "";
}
