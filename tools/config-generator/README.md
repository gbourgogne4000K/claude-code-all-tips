# Claude Configuration Generator

Interactive tool to generate optimized `CLAUDE.md` and `.clauderc` files for your project.

## 🎯 What It Does

This tool helps you create project-specific configuration files that make Claude Code work better with your codebase:

- **CLAUDE.md**: Project instructions, conventions, architecture, and constraints
- **.clauderc**: Technical configuration, hooks, and context settings

## 🚀 Usage

### Option 1: Node.js Script (Recommended)

```bash
# Navigate to your project directory
cd /path/to/your/project

# Run the generator
node /path/to/generate-claude-config.js

# Or make it executable
chmod +x generate-claude-config.js
./generate-claude-config.js
```

### Option 2: Claude Skill

```bash
# Copy the skill to your .claude/commands/ directory
cp generate-config.skill.md ~/.claude/commands/generate-config.md

# In Claude, run:
/generate-config
```

### Option 3: Install Globally

```bash
# Install globally
npm install -g /path/to/config-generator

# Run from anywhere
generate-claude-config
```

## 📋 What It Asks

The generator asks questions in 7 categories:

### 1. Project Information
- Project name
- Project type (web, api, cli, etc.)
- Tech stack
- Primary language

### 2. Code Conventions
- Indentation style (spaces/tabs)
- Max line length
- Naming conventions
- Quote style

### 3. Architecture
- Architecture pattern (MVC, Clean, etc.)
- Folder structure

### 4. Testing
- Test framework
- Required coverage
- Testing approach (TDD/BDD)

### 5. Git Workflow
- Branch naming convention
- Commit message format
- PR requirements

### 6. Constraints
- Things Claude should NEVER do
- Things Claude should ALWAYS do

### 7. Output Location
- Where to save the files

## 📄 Generated Files

### CLAUDE.md Example

```markdown
# MyProject

> Project-specific instructions for Claude Code

## 📋 Project Overview

**Type**: web
**Tech Stack**: TypeScript, React, Node.js
**Architecture**: Clean Architecture

## 📝 Code Conventions

- **Indentation**: 2 spaces
- **Line length**: Max 100 characters
- **Naming**: camelCase for variables, PascalCase for components

## 🧪 Testing Requirements

- **Framework**: Jest
- **Coverage**: 80%
- Write tests BEFORE implementing (TDD)

## ❌ DO NOT

- Use `any` type in TypeScript
- Skip writing tests
- Commit directly to main
- Ignore linter warnings

## ✅ ALWAYS

- Run tests before committing
- Update documentation
- Follow SOLID principles
- Use meaningful variable names

[... full file content ...]
```

### .clauderc Example

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

## 🔧 Customization

After generation, customize the files:

### CLAUDE.md
- Add project-specific examples
- Include API endpoint patterns
- Document common pitfalls
- Add team-specific guidelines

### .clauderc
- Adjust hook commands for your build tools
- Add more exclude patterns
- Configure context window based on needs
- Set up project-specific MCP servers

## 💡 Tips

### For Teams

1. **Generate once**, then refine together
2. **Commit to git** so everyone has the same config
3. **Update regularly** as patterns evolve
4. **Review together** in team meetings

### Best Practices

1. **Be specific**: "Max 20 lines per function" vs "Keep functions small"
2. **Use examples**: Show actual code patterns
3. **Explain why**: Not just rules, but reasoning
4. **Keep updated**: Reflect current practices
5. **Test hooks**: Ensure commands work in your environment

## 🎯 Use Cases

### New Project Bootstrap

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

### Existing Project

```bash
cd existing-project
generate-claude-config
# Review generated files
# Customize based on existing patterns
git add CLAUDE.md .clauderc
git commit -m "Add Claude configuration"
```

### Team Onboarding

```bash
# New team member clones repo
git clone repo-url
cd repo
# CLAUDE.md already there!
claude
# Claude reads CLAUDE.md automatically
```

## 🔄 Updating Configuration

When your project evolves:

1. **Manual Update**: Edit CLAUDE.md directly
2. **Re-generate**: Run tool again and merge changes
3. **Incremental**: Add new sections as needed

## 🐛 Troubleshooting

### Hooks Not Working

**Problem**: Hook commands fail
**Solution**:
- Verify commands work in terminal first
- Use full paths if needed
- Check npm scripts exist

### Context Too Large

**Problem**: Claude says context is too big
**Solution**:
- Add more patterns to `excludePatterns`
- Remove large files from `alwaysInclude`
- Reduce `contextWindow` in .clauderc

### Claude Ignores Rules

**Problem**: Claude doesn't follow CLAUDE.md
**Solution**:
- Make rules more specific with examples
- Use "NEVER" and "ALWAYS" clearly
- Put critical rules at the top
- Reference CLAUDE.md in prompts

## 📚 Examples

See the `/examples` directory for:
- React application
- Express API
- CLI tool
- Python library
- Monorepo setup

## 🤝 Contributing

Improvements welcome!

1. Fork the repo
2. Create a feature branch
3. Add your enhancement
4. Submit a PR

## 📝 License

MIT License - feel free to use and modify

---

**Questions?** Open an issue or ask Claude!
