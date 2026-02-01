# Tools & Utilities

> Practical tools to optimize your Claude Code experience

---

## 🛠️ Claude Configuration Generator

Interactive tool to create optimized `CLAUDE.md` and `.clauderc` files for your project.

### 📦 What Is It?

The configuration generator helps you create customized configuration files that allow Claude Code to better understand and work with your project:

- **CLAUDE.md**: Project instructions, code conventions, architecture, constraints
- **.clauderc**: Technical configuration, hooks, context settings

### 🚀 Installation & Usage

#### Method 1: Node.js Script (Recommended)

```bash
# Download the script
curl -O https://raw.githubusercontent.com/gbourgogne4000K/claude-code-all-tips/main/tools/config-generator/generate-claude-config.js

# Make executable (macOS/Linux)
chmod +x generate-claude-config.js

# Run in your project
cd /path/to/your/project
node generate-claude-config.js
```

#### Method 2: Global NPM Installation

```bash
# Clone the repo
git clone https://github.com/gbourgogne4000K/claude-code-all-tips.git
cd claude-code-all-tips/tools/config-generator

# Install globally
npm install -g .

# Use anywhere
cd /path/to/your/project
generate-claude-config
```

#### Method 3: Claude Skill

```bash
# Copy skill to your Claude folder
curl -o ~/.claude/commands/generate-config.md \
  https://raw.githubusercontent.com/gbourgogne4000K/claude-code-all-tips/main/tools/config-generator/generate-config.skill.md

# In Claude, run:
/generate-config
```

### 📝 What the Tool Asks

The generator asks questions in 7 categories:

#### 1. Project Information
- Project name
- Type (web, api, cli, library, etc.)
- Tech stack
- Primary language

#### 2. Code Conventions
- Indentation style (spaces/tabs)
- Max line length
- Naming convention
- Quote style

#### 3. Architecture
- Architecture pattern (MVC, Clean, etc.)
- Folder structure

#### 4. Testing
- Test framework
- Required coverage
- Approach (TDD/BDD)

#### 5. Git Workflow
- Branch naming convention
- Commit message format
- PR requirements

#### 6. Constraints
- What Claude should NEVER do
- What Claude should ALWAYS do

#### 7. Location
- Where to save files

### 📄 Generated Files

#### CLAUDE.md Example

```markdown
# MyProject

> Project-specific instructions for Claude Code

## 📋 Overview

**Type**: web
**Stack**: TypeScript, React, Node.js
**Architecture**: Clean Architecture

## 📝 Code Conventions

- **Indentation**: 2 spaces
- **Line length**: Max 100 characters
- **Naming**: camelCase for variables, PascalCase for components

## 🧪 Testing Requirements

- **Framework**: Jest
- **Coverage**: 80%
- Write tests BEFORE implementation (TDD)

## ❌ DO NOT

- Use `any` type in TypeScript
- Skip tests
- Commit directly to main
- Ignore linter warnings

## ✅ ALWAYS

- Run tests before committing
- Update documentation
- Follow SOLID principles
- Use meaningful variable names
```

#### .clauderc Example

```json
{
  "defaultModel": "sonnet",
  "contextWindow": 100000,
  "hooks": {
    "user-prompt-submit-hook": "npm run type-check",
    "edit-hook": "npm run lint:fix"
  },
  "autoSave": true,
  "gitIntegration": true,
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

### 🎯 Use Cases

#### New Project

```bash
mkdir my-new-project
cd my-new-project
npm init -y
generate-claude-config
# Answer questions
git init
git add CLAUDE.md .clauderc
git commit -m "Initial Claude configuration"
```

#### Existing Project

```bash
cd existing-project
generate-claude-config
# Review generated files
# Customize based on existing patterns
git add CLAUDE.md .clauderc
git commit -m "Add Claude configuration"
```

#### Team Onboarding

```bash
# New team member clones repo
git clone repo-url
cd repo
# CLAUDE.md already there!
claude
# Claude reads CLAUDE.md automatically
```

### 💡 Best Practices

#### For Teams

1. **Generate once**, then refine together
2. **Commit to git** so everyone has same config
3. **Update regularly** as patterns evolve
4. **Review together** in team meetings

#### Recommendations

1. **Be specific**: "Max 20 lines per function" vs "Keep functions small"
2. **Use examples**: Show actual code patterns
3. **Explain why**: Not just rules, but reasoning
4. **Keep updated**: Reflect current practices
5. **Test hooks**: Ensure commands work

### 🔧 Customization

After generation, customize:

**CLAUDE.md**:
- Add project-specific examples
- Include API endpoint patterns
- Document common pitfalls
- Add team-specific guidelines

**.clauderc**:
- Adjust hook commands for your tools
- Add more exclude patterns
- Configure context window based on needs
- Setup project-specific MCP servers

### 🐛 Troubleshooting

#### Hooks Not Working

**Problem**: Hook commands fail
**Solution**:
- Verify commands work in terminal first
- Use full paths if needed
- Check npm scripts exist

#### Context Too Large

**Problem**: Claude says context is too big
**Solution**:
- Add more patterns to `excludePatterns`
- Remove large files from `alwaysInclude`
- Reduce `contextWindow` in .clauderc

#### Claude Ignores Rules

**Problem**: Claude doesn't follow CLAUDE.md
**Solution**:
- Make rules more specific with examples
- Use "NEVER" and "ALWAYS" clearly
- Put critical rules at top
- Reference CLAUDE.md in prompts

### 📚 Examples

See [/tools/config-generator/examples](../../../tools/config-generator/examples/) for:
- React application
- Express API
- CLI tool
- Python library
- Monorepo setup

### 🔗 Resources

- **Complete documentation**: [tools/config-generator/README.md](../../../tools/config-generator/README.md)
- **Source code**: [tools/config-generator/](../../../tools/config-generator/)
- **CLAUDE.md template**: [templates/CLAUDE.md](../templates/CLAUDE.md)

---

## 🚧 Upcoming Tools

### Configuration Analyzer
Tool to analyze your CLAUDE.md and suggest improvements.

### Hook Validator
Verify that your hooks work correctly.

### Template Manager
Manage CLAUDE.md templates for different project types.

---

*Tools Section - Claude Code Guide*
*Contribute your own tools!*
