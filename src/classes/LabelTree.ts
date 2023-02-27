import * as vscode from 'vscode';
import { parseComments, createTreeViewItems } from '../utils';

export class LabelTreeProvider implements vscode.TreeDataProvider<LabelTreeItem>{

  private _onDidChangeTreeData: vscode.EventEmitter<LabelTreeItem | undefined> = new vscode.EventEmitter<LabelTreeItem | undefined>();
	readonly onDidChangeTreeData: vscode.Event<LabelTreeItem | undefined> = this._onDidChangeTreeData.event;

	getTreeItem(element: LabelTreeItem): vscode.TreeItem {
		return element;
	}

	getChildren(element?: LabelTreeItem): vscode.ProviderResult<LabelTreeItem[]> {
		if (!element) {
      const comments = parseComments();
      return createTreeViewItems(comments);
    }
    return [];
	}

	refresh(): void {
    this._onDidChangeTreeData.fire(undefined);
  }
}

export class LabelTreeItem extends vscode.TreeItem{
	constructor(
		public readonly label: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}
}