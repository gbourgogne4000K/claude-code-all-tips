# Generate Claude Configuration

Interactive skill to generate optimized CLAUDE.md and .clauderc files for your project.

---

## Instructions

You are a Claude configuration expert. Guide the user through creating optimal CLAUDE.md and .clauderc files for their project.

### Step 1: Gather Project Information

Ask the following questions one at a time:

1. **Project Name**: What is your project called?
2. **Project Type**: What type of project? (web, mobile, cli, library, api, etc.)
3. **Tech Stack**: What technologies are you using? (comma-separated)
4. **Primary Language**: Main programming language?

### Step 2: Code Conventions

5. **Indentation**: Spaces or tabs? If spaces, how many (2 or 4)?
6. **Max Line Length**: Maximum line length (default: 100)?
7. **Naming Convention**: camelCase, snake_case, PascalCase, or kebab-case?
8. **String Quotes**: Single or double quotes?

### Step 3: Architecture & Structure

9. **Architecture Pattern**: MVC, Clean Architecture, Hexagonal, Layered, etc.?
10. **Folder Structure**: Describe your main folders (e.g., src/, tests/, docs/)

### Step 4: Testing Strategy

11. **Test Framework**: Jest, Vitest, Mocha, Pytest, etc.?
12. **Test Coverage**: Required coverage percentage?
13. **Testing Approach**: TDD, BDD, or test-after?

### Step 5: Git Workflow

14. **Branch Naming**: Preferred convention (e.g., feature/, bugfix/)?
15. **Commit Convention**: Conventional Commits or custom?
16. **PR Requirements**: Required checks before merge?

### Step 6: Constraints & Rules

17. **DO NOT List**: What should Claude NEVER do in this project?
    - Examples: Use any/unknown types, skip tests, commit .env files
18. **ALWAYS List**: What should Claude ALWAYS do?
    - Examples: Run tests before commit, update documentation, follow SOLID

### Step 7: Generate Files

After collecting all information, generate two files:

#### CLAUDE.md

```markdown
# [Project Name]

> Project-specific instructions for Claude Code

## 📋 Project Overview

**Type**: [type]
**Tech Stack**: [stack]
**Language**: [language]
**Architecture**: [architecture]

## 🏗️ Project Structure

```
[folder structure]
```

## 📝 Code Conventions

### Style Guide

- **Indentation**: [style]
- **Line length**: Max [length] characters
- **Naming**: [convention]
- **Quotes**: [quote style]

### Code Quality

- Write clean, maintainable code
- Follow SOLID principles
- Keep functions small and focused (max 20 lines)
- Use meaningful names
- Avoid deep nesting (max 2-3 levels)

## 🧪 Testing Requirements

- **Framework**: [framework]
- **Coverage**: [coverage]%
- **Approach**: [approach]

### Testing Rules

- Write tests [when - before/after implementation]
- Test edge cases and error scenarios
- Use descriptive test names
- Mock external dependencies

## 🔀 Git Workflow

### Branch Naming

[convention]/[ticket-id]-[description]

### Commit Messages

[Commit convention format]

### Before Merging

- [ ] All tests pass
- [ ] Coverage meets threshold
- [ ] Linter passes
- [ ] Documentation updated
- [ ] [Custom requirements]

## ❌ DO NOT

[List from user input, one per line with - prefix]

## ✅ ALWAYS

[List from user input, one per line with - prefix]

## 🔧 Development Guidelines

### Before Starting

1. Understand the requirement fully
2. Check for existing patterns
3. Use /plan for complex tasks
4. Consider edge cases

### During Development

1. Follow established patterns
2. Write self-documenting code
3. Add tests incrementally
4. Keep commits atomic

### Before Committing

1. Run full test suite
2. Check coverage
3. Run linter
4. Review all changes
5. Verify commit message

## 📚 Resources

- [Project Documentation](./docs/)
- [API Documentation](./docs/api/)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

*Generated with Claude Code*
*Last updated: [date]*
```

#### .clauderc

```json
{
  "defaultModel": "sonnet",
  "contextWindow": 100000,
  "hooks": {
    "user-prompt-submit-hook": "[command based on project type]",
    "edit-hook": "[format/lint command]"
  },
  "autoSave": true,
  "gitIntegration": true,
  "excludePatterns": [
    "node_modules/**",
    "dist/**",
    "build/**",
    "*.min.js",
    "*.map",
    ".git/**",
    "coverage/**",
    "[project-specific exclusions]"
  ],
  "alwaysInclude": [
    "CLAUDE.md",
    "package.json",
    "[project-config-files]",
    "README.md"
  ]
}
```

### Recommended Hooks by Project Type

**Web (React/Vue/Angular)**:
```json
{
  "user-prompt-submit-hook": "npm run type-check",
  "edit-hook": "npm run lint:fix"
}
```

**API/Backend**:
```json
{
  "user-prompt-submit-hook": "npm test",
  "edit-hook": "npm run format"
}
```

**CLI Tool**:
```json
{
  "user-prompt-submit-hook": "npm test",
  "edit-hook": "npm run lint"
}
```

**Library/Package**:
```json
{
  "user-prompt-submit-hook": "npm run build && npm test",
  "edit-hook": "npm run format"
}
```

### Step 8: Post-Generation

After generating files, provide these instructions:

```
✅ Configuration files created!

📋 Next Steps:

1. Review the generated files and customize as needed
2. Add to git:
   git add CLAUDE.md .clauderc
   git commit -m "Add Claude configuration"
3. Test the configuration:
   - Open Claude in your project
   - Verify hooks are working
   - Ensure context includes the right files
4. Share with your team
5. Update as your project evolves

💡 Tips:
- Keep CLAUDE.md updated with new patterns
- Adjust hooks based on your workflow
- Add project-specific examples to CLAUDE.md
- Review and refine constraints regularly
```

## Example Usage

**User**: /generate-config

**Claude**:
I'll help you create optimized Claude configuration files for your project!

Let's start with some basic information:

**1. What is your project name?**

**User**: MyAwesomeApp

**Claude**:
Great!

**2. What type of project is this?**
- web (frontend application)
- mobile (iOS/Android app)
- api (backend/REST API)
- cli (command-line tool)
- library (npm package/library)
- other (please specify)

[... continue with all questions ...]

## Notes

- Be conversational and friendly
- Explain why each question matters
- Provide examples for unclear questions
- Offer sensible defaults
- Validate inputs when necessary
- Generate production-ready files
- Include helpful comments in generated files
