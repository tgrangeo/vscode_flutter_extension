"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MyDashboardProvider {
    context;
    constructor(context) {
        this.context = context;
    }
    resolveWebviewView(webviewView, context, _token) {
        webviewView.webview.options = {
            enableScripts: true
        };
        webviewView.webview.html = this.getHtml();
        webviewView.webview.onDidReceiveMessage(message => {
            // handle actions
        });
    }
    getHtml() {
        return `
      <!DOCTYPE html>
      <html>
      <body>
        <h2>🚀 Sidebar WebView</h2>
        <button onclick="vscode.postMessage({ type: 'open' })">Go</button>
        <script>
          const vscode = acquireVsCodeApi();
        </script>
      </body>
      </html>
    `;
    }
}
//# sourceMappingURL=dashboard.js.map