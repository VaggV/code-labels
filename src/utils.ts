import * as vscode from 'vscode';

export function parseComments() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		return [];
	}

	const document = editor.document;
	const comments = [];
	//
	const commentRegex = /\/\/(.*)/g;

	let match;
	// Find comments and their line number
	while ((match = commentRegex.exec(document.getText()))) {
		// The labels are defined like this %% Label dsadas das %% and we want to get the Label
		// If it's not starting with 2 percent symbols and ending with 2 percent symbols, then it's not a label
		let comment = match[1].trim();
		if (comment.startsWith('%%') && comment.endsWith('%%')) {
			// Get the line number
			comment = comment.substring(2, comment.length - 2).trim();

			const line = document.positionAt(match.index).line;
			comments.push(new Comment(comment, line));
		}
	}
	return comments;
}

export function createTreeViewItems(comments: Comment[]) {
	return comments.map((comment) => ({
		label: comment.text,
		collapsibleState: vscode.TreeItemCollapsibleState.None,
		iconPath: new vscode.ThemeIcon('comment'),
		command: {
			title: 'Show Comment',
			command: 'extension.showComment',
			arguments: [comment]
		}
	}));
}
