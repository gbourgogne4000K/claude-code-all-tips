#!/usr/bin/env node

/**
 * Claude Configuration Generator
 * Interactive tool to generate CLAUDE.md and .clauderc files
 */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function multilineQuestion(query) {
  return new Promise(resolve => {
    console.log(query);
    console.log('(Enter an empty line when done)');
    const lines = [];
    const askLine = () => {
      rl.question('> ', answer => {
        if (answer === '') {
          resolve(lines.join('\n'));
        } else {
          lines.push(answer);
          askLine();
        }
      });
    };
    askLine();
  });
}

async function main() {
  console.log('🚀 Claude Configuration Generator\n');
  console.log('This tool will help you create optimized CLAUDE.md and .clauderc files for your project.\n');

  // Project info
  const projectName = await question('📦 Project name: ');
  const projectType = await question('🔧 Project type (web, mobile, cli, library, api, etc.): ');
  const techStack = await question('⚙️  Tech stack (comma-separated, e.g., TypeScript, React, Node.js): ');

  // Code conventions
  console.log('\n📝 Code Conventions');
  const indentStyle = await question('Indentation (spaces/tabs): ');
  const indentSize = indentStyle === 'spaces' ? await question('Indent size (2/4): ') : '';
  const lineLength = await question('Max line length (default: 100): ') || '100';
  const namingConvention = await question('Naming convention (camelCase, snake_case, PascalCase): ');

  // Architecture
  console.log('\n🏗️  Architecture');
  const architecture = await question('Architecture pattern (MVC, Clean, Hexagonal, Layered, etc.): ');
  const folderStructure = await multilineQuestion('📁 Describe your folder structure (one per line):');

  // Testing
  console.log('\n🧪 Testing');
  const testFramework = await question('Test framework (Jest, Vitest, Mocha, Pytest, etc.): ');
  const testCoverage = await question('Required test coverage (e.g., 80%): ');

  // Git workflow
  console.log('\n🔀 Git Workflow');
  const branchNaming = await question('Branch naming (feature/, bugfix/, hotfix/): ');
  const commitConvention = await question('Commit convention (conventional, none): ');

  // Constraints
  console.log('\n⚠️  Constraints and Rules');
  const doNots = await multilineQuestion('Things Claude should NEVER do:');
  const requirements = await multilineQuestion('Things Claude should ALWAYS do:');

  // Generate CLAUDE.md
  const claudeMd = generateClaudeMd({
    projectName,
    projectType,
    techStack,
    indentStyle,
    indentSize,
    lineLength,
    namingConvention,
    architecture,
    folderStructure,
    testFramework,
    testCoverage,
    branchNaming,
    commitConvention,
    doNots,
    requirements
  });

  // Generate .clauderc
  const clauderc = generateClauderc({
    projectType,
    testFramework
  });

  // Save files
  console.log('\n📄 Generating files...');

  const outputDir = await question('\n💾 Output directory (default: current directory): ') || '.';

  fs.writeFileSync(path.join(outputDir, 'CLAUDE.md'), claudeMd);
  console.log('✅ Created CLAUDE.md');

  fs.writeFileSync(path.join(outputDir, '.clauderc'), clauderc);
  console.log('✅ Created .clauderc');

  console.log('\n🎉 Configuration files generated successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Review and customize the generated files');
  console.log('2. Add them to your git repository: git add CLAUDE.md .clauderc');
  console.log('3. Commit: git commit -m "Add Claude configuration"');
  console.log('4. Start using Claude with your project-specific context!');

  rl.close();
}

function generateClaudeMd(config) {
  return `# ${config.projectName}

> Project-specific instructions for Claude Code

## 📋 Project Overview

**Type**: ${config.projectType}
**Tech Stack**: ${config.techStack}
**Architecture**: ${config.architecture}

## 🏗️ Project Structure

\`\`\`
${config.folderStructure}
\`\`\`

## 📝 Code Conventions

### Style Guide

- **Indentation**: ${config.indentStyle}${config.indentSize ? ` (${config.indentSize} spaces)` : ''}
- **Line length**: Max ${config.lineLength} characters
- **Naming**: ${config.namingConvention}

### Code Quality

- Write clean, maintainable code
- Follow SOLID principles
- Keep functions small and focused
- Add comments only when necessary (code should be self-documenting)
- Use meaningful variable and function names

## 🧪 Testing Requirements

- **Framework**: ${config.testFramework}
- **Coverage**: Maintain ${config.testCoverage} test coverage
- Write tests BEFORE implementing features (TDD)
- Test edge cases and error scenarios
- Use descriptive test names

## 🔀 Git Workflow

### Branch Naming

${config.branchNaming}[ticket-id]-short-description

Examples:
- \`feature/123-user-authentication\`
- \`bugfix/456-fix-login-error\`
- \`hotfix/789-critical-security-patch\`

### Commit Messages

${config.commitConvention === 'conventional' ? `Follow Conventional Commits:
- \`feat:\` New feature
- \`fix:\` Bug fix
- \`docs:\` Documentation changes
- \`refactor:\` Code refactoring
- \`test:\` Test updates
- \`chore:\` Build/tooling changes` : 'Use clear, descriptive commit messages'}

## ❌ DO NOT

${config.doNots.split('\n').map(item => `- ${item}`).join('\n')}

## ✅ ALWAYS

${config.requirements.split('\n').map(item => `- ${item}`).join('\n')}

## 🔧 Development Guidelines

### Before Starting a Task

1. Read and understand the requirements
2. Check existing code for similar patterns
3. Plan the approach (use /plan if complex)
4. Consider edge cases and error handling

### When Writing Code

1. Follow the established patterns in the codebase
2. Keep functions under 20 lines when possible
3. Limit function parameters to 3 or fewer
4. Avoid deep nesting (max 2-3 levels)
5. Write tests alongside implementation

### Before Committing

1. Run all tests: \`npm test\` (or equivalent)
2. Check code coverage
3. Run linter: \`npm run lint\`
4. Review changes with \`git diff\`
5. Ensure commit message follows conventions

## 📚 Resources

- [Project Documentation](./docs/)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [API Documentation](./docs/api/)

---

*Generated with Claude Config Generator*
*Last updated: ${new Date().toISOString().split('T')[0]}*
`;
}

function generateClauderc(config) {
  const hooks = {
    web: {
      'user-prompt-submit-hook': 'npm run type-check',
      'edit-hook': 'npm run lint:fix'
    },
    api: {
      'user-prompt-submit-hook': 'npm test',
      'edit-hook': 'npm run format'
    },
    cli: {
      'user-prompt-submit-hook': 'npm test',
      'edit-hook': 'npm run lint'
    },
    library: {
      'user-prompt-submit-hook': 'npm run build && npm test',
      'edit-hook': 'npm run format'
    }
  };

  const selectedHooks = hooks[config.projectType] || hooks.web;

  return JSON.stringify({
    "defaultModel": "sonnet",
    "contextWindow": 100000,
    "hooks": selectedHooks,
    "autoSave": true,
    "gitIntegration": true,
    "excludePatterns": [
      "node_modules/**",
      "dist/**",
      "build/**",
      "*.min.js",
      "*.map",
      ".git/**",
      "coverage/**"
    ],
    "alwaysInclude": [
      "CLAUDE.md",
      "package.json",
      "tsconfig.json",
      "README.md"
    ]
  }, null, 2);
}

main().catch(console.error);
