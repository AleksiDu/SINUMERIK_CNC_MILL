import * as vscode from "vscode";

export class SinumerikCNCSyntaxColorizer {
  public static readonly languageId = "sinumerik-cnc";

  private readonly keywords = ["DEF", "S", "F", "MSG"];

  // Logic operators
  private readonly logicOperators = [
    "AND",
    "OR",
    "NOT",
    "XOR",
    "GOTOB",
    "GOTOF",
    "GOTO",
    "G",
  ];

  // Statements
  private readonly statements = [
    "IF",
    "ELSE",
    "ENDIF",
    "LOOP",
    "ENDLOOP",
    "FOR",
    "ENDFOR",
    "WHILE",
    "ENDWHILE",
    "REPEAT",
    "UNTIL",
    "M",
  ];

  // Variable types
  private readonly variableTypes = [
    "INT",
    "REAL",
    "BOOL",
    "CHAR",
    "STRING",
    "AXIS",
    "FRAME",
  ];

  // System variable types
  private readonly systemVariableTypes = [
    "$M", // Machine data
    "$S", // Setting data
    "$T", // Tool management data
    "$P", // Programmed values
    "$A", // Current values
    "$V", // Service data
  ];

  public provideDocumentColors(
    document: vscode.TextDocument
  ): vscode.ColorInformation[] {
    const text = document.getText();
    const colorInfos: vscode.ColorInformation[] = [];

    // Match keywords and add to color info array
    this.keywords.forEach((keyword) => {
      const regEx = new RegExp(`\\b${keyword}\\b`, "gi");
      let match;
      while ((match = regEx.exec(text))) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);
        colorInfos.push(
          new vscode.ColorInformation(range, new vscode.Color(0, 0, 255, 0))
        );
      }
    });

    return colorInfos;
  }

  public provideColorPresentations(
    color: vscode.Color,
    context: { document: vscode.TextDocument; range: vscode.Range }
  ): vscode.ColorPresentation[] {
    const colorString = color.toString();
    const presentation = new vscode.ColorPresentation(colorString);
    return [presentation];
  }
}
