# Configuration

## Configuration Files

### Location
- `~/.claude/` - Main configuration folder
- `~/.claude/keybindings.json` - Custom keyboard shortcuts

## Keyboard Shortcuts

### Modifying Keybindings
To customize your shortcuts:
```bash
# Use the keybindings-help skill
/keybindings-help
```

### Default Shortcuts
[To document]

## Custom Hooks

### Hook Types
- `user-prompt-submit-hook` - Executed on prompt submission
- [Other hooks to document]

### Hook Configuration
```json
{
  "hooks": {
    "user-prompt-submit-hook": "shell-command"
  }
}
```

## MCP Servers

### What is an MCP Server?
[To be completed with your information]

### Configuration
[To be completed]

### Available Servers
[To document]

## Advanced Settings

### Available Models
- `sonnet` - Claude Sonnet (default)
- `opus` - Claude Opus
- `haiku` - Claude Haiku (for quick tasks)

### Model Configuration
[To document based on your findings]

## 💻 Visual Studio Code Integration

### Native VS Code Extension

Claude Code works as a native extension in Visual Studio Code, offering an integrated experience directly in your editor.

#### Installation

**Method 1: Via VS Code Marketplace**
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Claude Code"
4. Click "Install"

**Method 2: Command Line**
```bash
code --install-extension Anthropic.claude-code
```

#### Initial Setup

After installation:
1. Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Type "Claude: Sign In"
3. OAuth authentication in browser
4. Automatic return to VS Code

### Extension Features

#### 1. Integrated Chat Panel

**Access**:
- Shortcut: `Ctrl+Shift+/` (Windows/Linux) or `Cmd+Shift+/` (macOS)
- Command Palette: "Claude: Open Chat"
- Icon in sidebar

**Advantages**:
- Persistent chat while coding
- Conversation history
- Automatic code selection
- Modification preview

#### 2. Intelligent Code Selection

**Usage**:
```
1. Select code in editor
2. Right-click → "Ask Claude"
   OR
   Shortcut: Ctrl+Shift+L
3. Selected code is automatically included in context
```

**Example**:
```javascript
// Select this function
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Ask: "Add 20% VAT handling"
// Claude automatically understands the context
```

#### 3. Inline Edits

**How it works**:
1. Claude suggests code modifications
2. Preview diff directly in editor
3. Accept/Reject line by line
4. Full Undo/Redo

**Shortcuts**:
- `Ctrl+Enter`: Accept modification
- `Ctrl+Backspace`: Reject modification
- `Ctrl+Z`: Undo

#### 4. Terminal Integration

**VS Code Terminal**:
```bash
# VS Code terminal automatically recognizes Claude
claude

# You can also use native integration
# which displays results in chat panel
```

**Advantage**: Bash commands executed by Claude appear in integrated terminal.

### VS Code Keyboard Shortcuts

#### Essential Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| `Ctrl+Shift+/` | Open Claude Chat | Toggle chat panel |
| `Ctrl+Shift+L` | Ask Claude | Send selection to Claude |
| `Ctrl+Shift+P` → "Claude" | Command Palette | All Claude commands |
| `Ctrl+Enter` | Accept modification | Apply suggested change |
| `Ctrl+Backspace` | Reject modification | Refuse change |
| `Ctrl+K Ctrl+C` | Copy to Claude | Copy selection to chat |

#### Customizing Shortcuts

**File**: `.vscode/keybindings.json` or Settings → Keyboard Shortcuts

**Custom configuration example**:
```json
[
  {
    "key": "ctrl+alt+c",
    "command": "claude.openChat",
    "when": "editorTextFocus"
  },
  {
    "key": "ctrl+alt+a",
    "command": "claude.askAboutSelection",
    "when": "editorHasSelection"
  },
  {
    "key": "ctrl+alt+e",
    "command": "claude.explainCode",
    "when": "editorHasSelection"
  }
]
```

### VS Code Settings for Claude

#### Workspace Configuration

**File**: `.vscode/settings.json`

```json
{
  // Default model
  "claude.defaultModel": "sonnet",

  // Auto-save before asking Claude
  "claude.autoSaveBeforeAsk": true,

  // Show inline diffs
  "claude.showInlineDiffs": true,

  // Automatically include open files in context
  "claude.includeOpenFiles": true,

  // Maximum number of files in context
  "claude.maxContextFiles": 10,

  // Code output format
  "claude.codeOutputFormat": "diff",

  // Enable automatic suggestions
  "claude.enableSuggestions": true,

  // Git integration
  "claude.gitIntegration": true
}
```

#### User Configuration

**Access**: Settings → Extensions → Claude Code

**Important options**:
- **Model Selection**: Choose default sonnet/opus/haiku
- **Context Window**: Manage context size (30K, 100K, 150K)
- **Auto-Accept**: Automatically accept certain modification types
- **Telemetry**: Enable/disable data collection

### Optimal VS Code + Claude Workflow

#### Pattern 1: Iterative Development

```
1. Open file in VS Code
2. Select function to modify
3. Ctrl+Shift+L → Request modification
4. Preview inline diff
5. Accept/Reject line by line
6. Automatic tests (if hooks configured)
7. Commit if OK
```

#### Pattern 2: Assisted Refactoring

```
1. Select entire class/module
2. Ask: "Refactor this class following SOLID principles"
3. Claude suggests modifications
4. Review in diff view
5. Accept progressively
6. Continuous testing
```

#### Pattern 3: Interactive Debugging

```
1. Breakpoint on problematic line
2. Copy stack trace
3. Send to Claude: "Debug this error: [stack trace]"
4. Claude analyzes and suggests fix
5. Apply modification
6. Re-test
```

### Multi-Cursors and Claude

**Advanced technique**:
```
1. Select multiple occurrences (Ctrl+D)
2. Ctrl+Shift+L with active multi-cursors
3. Claude understands pattern and modifies all occurrences
```

**Example**:
```javascript
// Before (select all console.log with Ctrl+D)
console.log('debug 1');
console.log('debug 2');
console.log('debug 3');

// Ask: "Replace with leveled logger"

// After
logger.debug('debug 1');
logger.debug('debug 2');
logger.debug('debug 3');
```

### Recommended Complementary Extensions

#### Essential

1. **GitLens**: Advanced Git integration
   ```
   code --install-extension eamodio.gitlens
   ```

2. **Error Lens**: Inline error display
   ```
   code --install-extension usernamehw.errorlens
   ```

3. **Code Spell Checker**: Spell checking
   ```
   code --install-extension streetsidesoftware.code-spell-checker
   ```

#### Productivity

4. **Todo Tree**: TODO management in code
   ```
   code --install-extension Gruntfuggly.todo-tree
   ```

5. **Better Comments**: Colored comments
   ```
   code --install-extension aaron-bond.better-comments
   ```

### Multi-File Workspace

**Configuration**: `.vscode/claude.json`

```json
{
  "contextFiles": [
    "src/**/*.ts",
    "tests/**/*.spec.ts",
    "CLAUDE.md"
  ],
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "*.min.js"
  ],
  "alwaysInclude": [
    "CLAUDE.md",
    "package.json",
    "tsconfig.json"
  ]
}
```

### Extension Debugging

#### Extension Logs

**Access**:
1. Help → Toggle Developer Tools
2. Console tab
3. Filter by "Claude"

**Or via Output Panel**:
1. View → Output
2. Dropdown → "Claude Code"

#### Common Issues

**Extension won't start**:
```bash
# Reinstall extension
code --uninstall-extension Anthropic.claude-code
code --install-extension Anthropic.claude-code

# Check logs
cat ~/.vscode/extensions/anthropic.claude-code-*/logs/claude.log
```

**Chat not displaying**:
1. Ctrl+Shift+P → "Developer: Reload Window"
2. Check authentication: Ctrl+Shift+P → "Claude: Sign Out" then Sign In

**Code selection not working**:
- Verify you're in a text file (not binary)
- Selection must be > 0 characters
- Try reloading window

### Performance and Optimization

#### Reduce Memory Usage

**Settings**:
```json
{
  "claude.maxContextFiles": 5,
  "claude.includeOpenFiles": false,
  "claude.cacheEnabled": true
}
```

#### Accelerate Responses

1. **Use Haiku for simple tasks**:
   ```json
   {
     "claude.quickActionsModel": "haiku"
   }
   ```

2. **Limit context**:
   - Don't include all open files
   - Use `.claudeignore` to exclude files

3. **Smart cache**:
   - Extension caches frequent contexts
   - Reuses previous analyses

### VS Code Specific Tips

#### Tip 1: Zen Mode + Claude

```
1. View → Appearance → Zen Mode (Ctrl+K Z)
2. Open Claude Chat (Ctrl+Shift+/)
3. Code on left, Claude on right
4. Total focus on development
```

#### Tip 2: Claude-Aware Snippets

**File**: `.vscode/claude.code-snippets`

```json
{
  "Ask Claude to implement": {
    "prefix": "!claude",
    "body": [
      "// TODO: Ask Claude to implement ${1:functionality}",
      "// Context: ${2:description}",
      "$0"
    ],
    "description": "Mark to ask Claude to implement"
  }
}
```

#### Tip 3: Tasks Integration

**File**: `.vscode/tasks.json`

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Ask Claude to Review",
      "type": "shell",
      "command": "echo 'Review this file' | claude",
      "problemMatcher": []
    }
  ]
}
```

## Next Steps

Discover [practical examples](../exemples/README.md) using these configurations.
