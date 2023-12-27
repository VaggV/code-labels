// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LabelTreeProvider } from './classes/LabelTree';
import { Comment } from './classes/Comment';

const labelTreeProvider = new LabelTreeProvider();

// %% This method is called when your extension is activated %%
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	try{
		const disposable = vscode.commands.registerCommand('extension.showComment', (comment: Comment) => {

			// Nagivate to the comment and also move cursor to the comment
			if (vscode.window.activeTextEditor) {
				vscode.window.activeTextEditor.revealRange(new vscode.Range(new vscode.Position(comment.line, 0), new vscode.Position(comment.line, 0)));
				vscode.window.activeTextEditor.selection = new vscode.Selection(new vscode.Position(comment.line, 0), new vscode.Position(comment.line, 0));
	
				// Move focus to the editor
				vscode.window.showTextDocument(vscode.window.activeTextEditor.document, vscode.ViewColumn.One);
			}
			
		});
	
		context.subscriptions.push(disposable);
	
		vscode.window.createTreeView('labelTreeView', { treeDataProvider: labelTreeProvider });
	
		vscode.window.onDidChangeActiveTextEditor(() => {
			labelTreeProvider.refresh();
		});
	
		// On text change
		vscode.workspace.onDidChangeTextDocument(() => {
			labelTreeProvider.refresh();
		});
	} catch (error) {
		console.log("ERROR");
		console.log(error);
	}
	
}


