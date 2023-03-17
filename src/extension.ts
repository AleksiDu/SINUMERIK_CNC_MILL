// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { SinumerikCNCSyntaxColorizer } from "./language-features/colorizer";
import { SinumerikCNCSyntaxFormatter } from "./language-features/formatter";
import { SinumerikCNCStandardCycles } from "./language-features/standard-cycles";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Register the SinumerikCNCSyntaxColorizer
  context.subscriptions.push(
    vscode.languages.registerColorProvider(
      { language: SinumerikCNCSyntaxColorizer.languageId },
      new SinumerikCNCSyntaxColorizer()
    )
  );

  // Register the SinumerikCNCFormatter
  context.subscriptions.push(
    vscode.languages.registerDocumentFormattingEditProvider(
      { language: SinumerikCNCSyntaxFormatter.languageId },
      new SinumerikCNCSyntaxFormatter()
    )
  );

  // Register the SinumerikCNCStandardCycles
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { language: SinumerikCNCStandardCycles.languageId },
      new SinumerikCNCStandardCycles(),
      "CYCLE"
    )
  );

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "sinumerik-cnc-mill" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "sinumerik-cnc-mill.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage(
        "Hello World from SINUMERIK-CNC-MILL!"
      );
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
