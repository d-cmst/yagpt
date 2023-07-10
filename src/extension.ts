import * as vscode from 'vscode';
import axios from 'axios';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.yagpt', async () => {
        const prompt = await vscode.window.showInputBox({ prompt: 'Enter your prompt here:' });
        
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
            prompt: prompt,
            max_tokens: 60
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPEN_AI_KEY`
            }
        });

        if (response.data.choices && response.data.choices.length > 0) {
            vscode.window.showInformationMessage(response.data.choices[0].text.trim());
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}