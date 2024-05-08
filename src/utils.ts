/***********************************************************************************************************
 *
 *   ____  _    _            _ _                                  _     _______          _
 *  / __ \| |  | |     /\   | (_)                                | |   |__   __|        | |
 * | |  | | |__| |    /  \  | |_  __ _ _ __  _ __ ___   ___ _ __ | |_     | | ___   ___ | |
 * | |  | |  __  |   / /\ \ | | |/ _` | '_ \| '_ ` _ \ / _ \ '_ \| __|    | |/ _ \ / _ \| |
 * | |__| | |  | |  / ____ \| | | (_| | | | | | | | | |  __/ | | | |_     | | (_) | (_) | |
 *  \____/|_|  |_| /_/    \_\_|_|\__, |_| |_|_| |_| |_|\___|_| |_|\__|    |_|\___/ \___/|_|
 *                                __/ |
 *                               |___/
 *
 * @todo Complete Header description and tags.
 * @author Max Beckenbauer
 *
 * Credits to Mark Hilbush and his openHAB Formatter extension.
 *
 **********************************************************************************************************/

/**----------------------------------------------------------------------------------------------------------
 * HEADER SECTION
 *---------------------------------------------------------------------------------------------------------*/
import * as vscode from "vscode";

/**
 * Count the amount of whitespace starting at startPos
 *
 * @param doc
 * @param startPos
 */
export function countWhitespace(doc: vscode.TextDocument, startPos: vscode.Position): number {
	let whitespaceRange = doc.getWordRangeAtPosition(startPos, /[ \t@]+/);
	if (whitespaceRange && whitespaceRange.isSingleLine) {
		return doc.getText(whitespaceRange).length;
	}
	return 0;
}

/**
 * Calculate the number of tabs to separate each part item to fit the widest column
 *
 * @param str
 * @param finalLength
 */
export function fillColumns(str: string, finalLength: number): string {
	let editor = vscode.window.activeTextEditor;
	let tabSize = 0;
	let gapLength = 0;
	let strLength = 0;
	let tab = "";

	// Check it item is empty
	if (finalLength === 0) {
		return "";
	}
	// Only execute if there's an active text editor
	if (!editor) {
		return "";
	}

	// Get the tab size setting of the current editor
	if (editor.options.tabSize !== undefined) {
		tabSize = +editor.options.tabSize;
	}

	if (editor.options.insertSpaces) {
		// Extend str with spaces, until the length of finalLength, plus one tab's worth of spaces.
		// We need to subtract finalLegth % tabSize to align with the use of the tab key 
		for (let e = 0; e < tabSize - finalLength % tabSize + finalLength - str.length; e++) {
			tab += " ";
		}
		str += tab;
	} else {
		tab = "\t";

		// Calculate the width of the column gap
		strLength = Math.floor(str.length / tabSize);
		gapLength = finalLength - strLength;

		// Add tabs to string
		for (let i = 0; i < gapLength; i++) {
			str += tab;
		}
	}

	return str;
}

/**
 * Calculate the number of tabs to separate each part item to fit the widest column
 *
 * @param str
 * @param finalLength
 */
export function fillMultiLines(str: string, indentAmount: number, leadingWhiteSpace: number): string {
	let editor = vscode.window.activeTextEditor;
	let gap = "";
	let indent = "";
	let tabSize = 0;

	// Only execute if there's an active text editor
	if (!editor) {
		return "";
	}

	if (str === "") {
		return "";
	}

	// Get the tab size setting of the current editor
	if (editor.options.tabSize !== undefined) {
		tabSize = +editor.options.tabSize;
	}

	if (editor.options.insertSpaces) {
		for (let e = 0; e < indentAmount; e++) {
			gap += " ";
		}
	} else {
		// Add tabs to string
		for (let i = 0; i < indentAmount; i++) {
			gap += "\t";
		}
	}

	// Add tabs to string
	for (let i = 0; i < leadingWhiteSpace; i++) {
		indent += editor.options.insertSpaces ? " " : "\t";
	}

	str = "\n" + indent + gap + str;

	return str;
}

/**
 *
 * @param spaces
 */
export function generateTabFromSpaces(spaces: number): number {
	let editor = vscode.window.activeTextEditor;
	let tabSize = 0;
	let tabs = "";

	// Only execute if there's an active text editor
	if (!editor) {
		return 0;
	}

	if (spaces === 0) {
		return 0;
	}

	// Get the tab size setting of the current editor
	if (editor.options.tabSize !== undefined) {
		tabSize = +editor.options.tabSize;
	}

	// Add one space if spaces / size of tab is an even number
	spaces = (spaces / tabSize) % 1 === 0 ? spaces + 1 : spaces;

	return Math.ceil(spaces / tabSize);
}
