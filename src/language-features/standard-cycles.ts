import * as vscode from "vscode";

export class SinumerikCNCStandardCycles
  implements vscode.CompletionItemProvider
{
  public static readonly languageId = "sinumerik-cnc";

  private static readonly standardCycles = [
    { label: "CYCLE800", description: "Swivel cycle" },
  ];

  public provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList> {
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);
    if (!linePrefix.endsWith("CYCLE")) {
      return undefined;
    }

    return SinumerikCNCStandardCycles.standardCycles.map((cycle) => {
      const item = new vscode.CompletionItem(
        cycle.label,
        vscode.CompletionItemKind.Snippet
      );
      item.detail = cycle.description;
      item.insertText = new vscode.SnippetString(cycle.label + ";\n");
      return item;
    });
  }
}
