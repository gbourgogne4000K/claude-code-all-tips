# Claude Code Installation

> Complete installation guide based on official Anthropic documentation

**Official source**: [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)

---

## 🎯 Overview

**Claude Code** is an agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows—all through natural language commands.

### Key Features

- ✨ Terminal-based agentic coding assistant
- 🧠 Codebase understanding and analysis
- ⚡ Routine task execution
- 📖 Complex code explanation
- 🔀 Git workflow handling
- 💬 Natural language interface
- 🔧 Works in terminal, IDE, or via GitHub (@claude tagging)

---

## 📥 Installation

### Recommended Methods (Official)

#### macOS / Linux

**Method 1: Installation Script (Recommended)**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Method 2: Homebrew**
```bash
brew install --cask claude-code
```

#### Windows

**Method 1: PowerShell Script (Recommended)**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Method 2: WinGet**
```powershell
winget install Anthropic.ClaudeCode
```

#### NPM Installation (Deprecated)

```bash
npm install -g @anthropic-ai/claude-code
```

> ⚠️ **Note**: Installation via npm is deprecated. Use one of the recommended methods above.

---

## 🚀 Quick Start

### First Use

1. **Install** Claude Code (see methods above)
2. **Navigate** to your project directory
   ```bash
   cd /path/to/your/project
   ```
3. **Launch** Claude
   ```bash
   claude
   ```

### Verify Installation

```bash
# Check version
claude --version

# Display help
claude --help
```

---

## ⚙️ System Requirements

### Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **Node.js** | Version 18+ |
| **npm** | Latest version |
| **OS** | macOS, Linux, Windows |
| **Terminal** | Bash, Zsh, PowerShell, CMD |

### Verify Requirements

```bash
# Check Node.js
node --version
# Should display v18.x.x or higher

# Check npm
npm --version
```

---

## 🔐 Security Configuration

### Authentication

Claude Code uses OAuth authentication via browser.

**First authentication**:
```bash
claude
# Opens browser for login
```

**Token stored** in `~/.claude/config.json` (encrypted).

### Secrets Management

**Critical rules**:
1. ❌ **NEVER** commit `.env` files
2. ❌ **NEVER** store secrets in code
3. ✅ **ALWAYS** use environment variables
4. ✅ **ALWAYS** gitignore `.env*`

---

## 🐛 Installation Troubleshooting

### Common Issues

#### Error: "Node.js not found"

**Solution**:
```bash
# Install Node.js
# macOS
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
winget install OpenJS.NodeJS
```

#### Error: "Permission denied"

**Solution**:
```bash
# macOS / Linux
sudo curl -fsSL https://claude.ai/install.sh | bash

# Or modify permissions
sudo chown -R $(whoami) /usr/local/bin
```

#### Error: "Command not found: claude"

**Solution**:
```bash
# Check PATH
echo $PATH

# Add to PATH if needed
# macOS / Linux (~/.zshrc or ~/.bashrc)
export PATH="$PATH:$HOME/.claude/bin"

# Windows (PowerShell Profile)
$env:Path += ";$env:USERPROFILE\.claude\bin"
```

---

## 📚 Official Resources

### Documentation

| Resource | URL |
|----------|-----|
| **Complete Documentation** | https://code.claude.com/docs/en/overview |
| **Installation Guide** | https://code.claude.com/docs/en/setup |
| **Usage & Commands** | https://code.claude.com/docs/en/usage |
| **Best Practices** | https://code.claude.com/docs/en/best-practices |
| **Data & Privacy** | https://code.claude.com/docs/en/data-usage |

### Community and Support

| Platform | Link |
|----------|------|
| **GitHub Repository** | https://github.com/anthropics/claude-code |
| **GitHub Issues** | https://github.com/anthropics/claude-code/issues |
| **Discord Developers** | https://anthropic.com/discord |
| **Bug Report (In-app)** | `/bug` command in Claude |

---

## 🔒 Data Collection & Privacy

### Data Collected

When using Claude Code, the following data is collected:

1. **Usage data**:
   - Code acceptances/rejections
   - Interaction patterns
   - Commands used

2. **Conversation data**:
   - Associated with your usage
   - Session context

3. **User feedback**:
   - Submitted via `/bug` command
   - User feedback

### Privacy Safeguards

✅ **Guarantees**:
- Limited retention periods for sensitive information
- Restricted access to user session data
- Clear policies against using for model training
- GDPR compliance and privacy regulations

**Detailed policy**: https://code.claude.com/docs/en/data-usage

---

## ✅ Post-Installation Checklist

### Complete Verification

- [ ] Claude Code installed and in PATH
- [ ] `claude --version` works
- [ ] Authentication completed
- [ ] Configuration `~/.claude/` created
- [ ] Node.js 18+ installed
- [ ] npm up to date
- [ ] Git configured correctly

### Next Steps

After successful installation:

1. **Quick tutorial**: [Usage](../utilisation/README.md)
2. **Advanced configuration**: [Configuration](../configuration/README.md)
3. **Best practices**: [50 Best Practices](../bonnes-pratiques/README.md)

---

*Installation guide updated: February 2026*
*Based on official Anthropic documentation*
