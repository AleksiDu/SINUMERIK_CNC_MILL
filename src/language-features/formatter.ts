import * as vscode from "vscode";

export class SinumerikCNCSyntaxFormatter
  implements vscode.DocumentFormattingEditProvider
{
  public static readonly languageId = "sinumerik-cnc";

  public provideDocumentFormattingEdits(
    document: vscode.TextDocument
  ): vscode.TextEdit[] {
    const edits: vscode.TextEdit[] = [];

    // Get the entire document range
    const range = document.validateRange(
      new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
    );

    // Remove leading and trailing whitespace from each line
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i);
      const trimmedText = line.text.trim();
      const startPos = new vscode.Position(i, 0);
      const endPos = new vscode.Position(i, line.text.length);
      edits.push(
        vscode.TextEdit.replace(new vscode.Range(startPos, endPos), trimmedText)
      );
    }

    // Add a newline at the end of the document if one does not exist
    const lastLine = document.lineAt(document.lineCount - 1);
    if (lastLine.text.trim() !== "") {
      const endPos = new vscode.Position(
        document.lineCount - 1,
        lastLine.range.end.character
      );
      edits.push(vscode.TextEdit.insert(endPos, "\n"));
    }

    return edits;
  }
}
