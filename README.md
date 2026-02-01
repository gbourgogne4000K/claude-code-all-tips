# 🚀 The Ultimate Claude Code Guide

**The most comprehensive resource for mastering Claude Code - Anthropic's official CLI tool**

[🇫🇷 Version Française](#-version-française) | [🇬🇧 English Version](#-english-version)

---

## 📊 What's Inside

This guide contains **everything** you need to become a Claude Code expert:

- 📚 **6,500+ lines** of in-depth documentation
- 💻 **100+ code snippets** ready to use
- 🔧 **40+ bash scripts** for automation
- 🎯 **50 best practices** from real-world usage
- 🏗️ **53 specialized skills** by domain
- ⚡ **8 advanced patterns** for power users
- 🌍 **Fully bilingual** (French & English)

---

## 🎯 Quick Navigation

### 🇫🇷 Version Française

Bienvenue dans le guide complet de Claude Code, l'outil CLI officiel d'Anthropic pour interagir avec Claude.

#### 📑 Table des matières

1. **[Installation](docs/fr/installation/README.md)** 📥
   - Méthodes officielles (curl, Homebrew, PowerShell, WinGet)
   - Configuration système requise (Node.js 18+)
   - Authentification OAuth et sécurité
   - Dépannage complet

2. **[Utilisation](docs/fr/utilisation/README.md)** 🎮
   - Démarrage rapide et premiers pas
   - Commandes de base essentielles
   - Workflow typique quotidien
   - Gestion de sessions

3. **[Fonctionnalités](docs/fr/fonctionnalites/README.md)** ⚙️
   - 15+ outils disponibles (Bash, Read, Edit, Write, Grep, etc.)
   - Agents spécialisés (Explore, Plan, Bash, general-purpose)
   - Mode Plan pour architecture
   - Todo et gestion de tâches

4. **[Configuration](docs/fr/configuration/README.md)** 🔧
   - Fichiers de configuration (~/.claude/)
   - 25+ raccourcis clavier optimisés
   - Hooks personnalisés pour automation
   - MCP Servers et intégrations

5. **[Patterns Avancés](docs/fr/patterns-avances/README.md)** ⭐
   - **Système de logging d'erreurs** : /log_error avec 13 catégories
   - **Slash commands** : commit, investigate, test, security-audit
   - **Hooks pour la sécurité** : bash-safety.sh, write-safety.sh
   - **Hygiène du contexte** : courbe de dégradation et stratégies
   - **Contrôle des sous-agents** : agents personnalisés et orchestration
   - **Système de reprompting** : voice-to-XML workflow
   - **Tool Stack Lean** : Context7 MCP, Dev Browser
   - **Prompt Engineering amélioré** : techniques avancées

6. **[Astuces et Techniques](docs/fr/astuces-techniques/README.md)** 💡
   - Commandes essentielles (/usage, /stats, /copy, /chrome, /mcp)
   - 20+ aliases terminaux pour productivité maximale
   - Intégration voix (Superwhisper, MacWhisper, Super Voice Assistant)
   - Testing autonome avec tmux et sessions parallèles
   - Playwright MCP vs Chrome natif (tableau comparatif)
   - Recherche dans l'historique (grep, jq, scripts personnalisés)
   - Configuration avancée et status line customization
   - "The Milk Rule" : stratégie de contexte frais

7. **[Workflow et Bootstrap](docs/fr/workflow-bootstrap/README.md)** 🏗️
   - **Ralph Wiggum** : boucles itératives automatiques
   - **TDD strict** : RED→RUN→GREEN→RUN→VALIDATE (exemples complets)
   - **Commit hygiene** : système de couleurs (🟢 ≤200 🟡 201-400 🔴 >400 lignes)
   - **Multi-repo workspace** : TOPOLOGY.md, CONTRACTS.md, DEPENDENCY_GRAPH.md
   - **Code review obligatoire** : 4 niveaux de sévérité (🔴 Critical → 🟢 Low)
   - **Team coordination** : claiming, handoffs, state.md structure
   - **Code deduplication** : semantic search avec ChromaDB/LanceDB
   - **Sécurité** : gestion centralisée credentials (~/Documents/Access.txt)
   - **Complexity constraints** : 20 lignes/fonction, 3 params max, 2 nesting levels
   - **53 skills inclus** : organisation par domaine (core, testing, git, code-quality, security, etc.)

8. **[50 Bonnes Pratiques](docs/fr/bonnes-pratiques/README.md)** 💯
   - **Cadrage de tâches** : décomposition, prompt engineering, contexte
   - **Projets et Skills** : CLAUDE.md vs skills, token-efficiency
   - **Astuces méconnues** : git worktrees, plan mode, multi-agent parallèle
   - **Debugging** : /bug workflow, isolation d'erreurs, reproduction minimale
   - **Conseils finaux** : resources, communauté, continuous learning

9. **[Référence Rapide](docs/fr/reference-rapide/README.md)** 🚀
   - Raccourcis clavier essentiels (Ctrl+C, Ctrl+D, Ctrl+K, etc.)
   - Commandes slash critiques (/usage, /plan, /copy, /chrome)
   - Seuils de contexte (30K cautious, 100K danger, 150K critical)
   - Guide de sélection de modèle (Sonnet vs Opus vs Haiku)
   - Formules rapides et cheat sheet

10. **[Templates](docs/fr/templates/CLAUDE.md)** 📋
    - CLAUDE.md de projet (structure complète)
    - Configuration hooks (bash scripts)
    - Agents personnalisés (JSON configs)
    - Handoff documents templates

11. **[Exemples pratiques](docs/fr/exemples/README.md)** 🎯
    - Cas d'usage courants (debugging, refactoring, testing)
    - Exemples de code complets
    - Best practices en action

12. **[Dépannage](docs/fr/troubleshooting/README.md)** 🔧
    - Problèmes courants (Node.js, permissions, PATH)
    - Messages d'erreur décryptés
    - FAQ complète

---

### 🇬🇧 English Version

Welcome to the complete Claude Code guide, Anthropic's official CLI tool for interacting with Claude.

#### 📑 Table of Contents

1. **[Installation](docs/en/installation/README.md)** 📥
   - Official methods (curl, Homebrew, PowerShell, WinGet)
   - System requirements (Node.js 18+)
   - OAuth authentication and security
   - Complete troubleshooting

2. **[Usage](docs/en/utilisation/README.md)** 🎮
   - Quick start and first steps
   - Essential basic commands
   - Daily typical workflow
   - Session management

3. **[Features](docs/en/fonctionnalites/README.md)** ⚙️
   - 15+ available tools (Bash, Read, Edit, Write, Grep, etc.)
   - Specialized agents (Explore, Plan, Bash, general-purpose)
   - Plan Mode for architecture
   - Todo and task management

4. **[Configuration](docs/en/configuration/README.md)** 🔧
   - Configuration files (~/.claude/)
   - 25+ optimized keyboard shortcuts
   - Custom hooks for automation
   - MCP Servers and integrations

5. **[Advanced Patterns](docs/en/patterns-avances/README.md)** ⭐
   - **Error Logging System**: /log_error with 13 categories
   - **Slash Commands**: commit, investigate, test, security-audit
   - **Hooks for Safety**: bash-safety.sh, write-safety.sh
   - **Context Hygiene**: degradation curve and strategies
   - **Subagent Control**: custom agents and orchestration
   - **Reprompter System**: voice-to-XML workflow
   - **Lean Tool Stack**: Context7 MCP, Dev Browser
   - **Improved Prompt Engineering**: advanced techniques

6. **[Tips & Techniques](docs/en/astuces-techniques/README.md)** 💡
   - Essential commands (/usage, /stats, /copy, /chrome, /mcp)
   - 20+ terminal aliases for maximum productivity
   - Voice integration (Superwhisper, MacWhisper, Super Voice Assistant)
   - Autonomous testing with tmux and parallel sessions
   - Playwright MCP vs Native Chrome (comparison table)
   - History search (grep, jq, custom scripts)
   - Advanced configuration and status line customization
   - "The Milk Rule": fresh context strategy

7. **[Workflow & Bootstrap](docs/en/workflow-bootstrap/README.md)** 🏗️
   - **Ralph Wiggum**: automatic iterative loops
   - **Strict TDD**: RED→RUN→GREEN→RUN→VALIDATE (complete examples)
   - **Commit Hygiene**: color system (🟢 ≤200 🟡 201-400 🔴 >400 lines)
   - **Multi-repo workspace**: TOPOLOGY.md, CONTRACTS.md, DEPENDENCY_GRAPH.md
   - **Mandatory code review**: 4 severity levels (🔴 Critical → 🟢 Low)
   - **Team coordination**: claiming, handoffs, state.md structure
   - **Code deduplication**: semantic search with ChromaDB/LanceDB
   - **Security**: centralized credentials management (~/Documents/Access.txt)
   - **Complexity constraints**: 20 lines/function, 3 params max, 2 nesting levels
   - **53 included skills**: organized by domain (core, testing, git, code-quality, security, etc.)

8. **[50 Best Practices](docs/en/bonnes-pratiques/README.md)** 💯
   - **Task Framing**: decomposition, prompt engineering, context
   - **Projects & Skills**: CLAUDE.md vs skills, token-efficiency
   - **Underrated Tips**: git worktrees, plan mode, parallel multi-agent
   - **Debugging**: /bug workflow, error isolation, minimal reproduction
   - **Final Tips**: resources, community, continuous learning

9. **[Quick Reference](docs/en/reference-rapide/README.md)** 🚀
   - Essential keyboard shortcuts (Ctrl+C, Ctrl+D, Ctrl+K, etc.)
   - Critical slash commands (/usage, /plan, /copy, /chrome)
   - Context thresholds (30K cautious, 100K danger, 150K critical)
   - Model selection guide (Sonnet vs Opus vs Haiku)
   - Quick formulas and cheat sheet

10. **[Templates](docs/en/templates/CLAUDE.md)** 📋
    - Project CLAUDE.md (complete structure)
    - Hooks configuration (bash scripts)
    - Custom agents (JSON configs)
    - Handoff document templates

11. **[Practical Examples](docs/en/exemples/README.md)** 🎯
    - Common use cases (debugging, refactoring, testing)
    - Complete code examples
    - Best practices in action

12. **[Troubleshooting](docs/en/troubleshooting/README.md)** 🔧
    - Common issues (Node.js, permissions, PATH)
    - Error messages decoded
    - Complete FAQ

---

## 🌟 Highlights

### 🔥 Advanced Patterns

Master the 8 most powerful patterns for professional Claude Code usage:

- **Error Logging System** with standardized /log_error workflow
- **Slash Commands as Mini-Apps** for complex recurring tasks
- **Deterministic Safety Hooks** with bash validation scripts
- **Context Hygiene** to prevent "lost in the middle" phenomenon
- **Subagent Orchestration** for complex multi-step workflows
- **Voice-to-XML Reprompter** for natural language task definition
- **Lean Tool Stack** with Context7 MCP and Dev Browser
- **Advanced Prompt Engineering** techniques

### ⚡ Workflow Automation

Complete bootstrap system for teams and solo developers:

- **Ralph Wiggum Plugin**: automatic RED→GREEN iteration loops
- **Strict TDD Workflow**: never skip validation steps
- **Commit Hygiene Monitoring**: prevent PR bloat with color-coded alerts
- **Multi-Repo Workspace**: manage complex dependencies across repositories
- **Code Review Automation**: enforce quality with severity-based blocking
- **Semantic Code Search**: eliminate duplication with vector embeddings
- **Centralized Credentials**: secure, auditable access management

### 💡 Productivity Boosters

Practical tips that make a real difference:

- **20+ Terminal Aliases**: optimize common workflows
- **Voice Integration**: hands-free coding with Superwhisper/MacWhisper
- **Tmux Autonomous Testing**: parallel test execution
- **History Search Scripts**: find and reuse past solutions
- **Custom Status Line**: real-time context awareness
- **The Milk Rule**: know when to start fresh

### 🛡️ Security & Quality

Built-in safeguards and best practices:

- **Pre-commit Hook Validation**: prevent security vulnerabilities
- **Centralized Access Management**: no secrets in code
- **Code Complexity Constraints**: enforce maintainability
- **Mandatory Code Review**: catch issues before merge
- **GDPR Compliance**: data privacy guarantees

---

## 🚀 Quick Start

```bash
# Install Claude Code
curl -fsSL https://claude.ai/install.sh | bash  # macOS/Linux
# OR
irm https://claude.ai/install.ps1 | iex  # Windows

# Clone this guide
git clone https://github.com/gbourgogne4000K/claude-code-all-tips.git
cd claude-code-all-tips

# Start reading (choose your language)
# French: docs/fr/installation/README.md
# English: docs/en/installation/README.md
```

---

## 📊 Statistics

| Metric | Count |
|--------|-------|
| **Total Lines** | 6,500+ |
| **Code Snippets** | 100+ |
| **Bash Scripts** | 40+ |
| **Best Practices** | 50 |
| **Advanced Patterns** | 8 |
| **Included Skills** | 53 |
| **Languages** | 2 (FR/EN) |
| **Sections** | 12 |

---

## 🤝 Contributors

This comprehensive guide was created and maintained by:

- **[gbourgogne4000K](https://github.com/gbourgogne4000K)** - Research, compilation, and curation
- **Claude (Anthropic)** - Documentation, examples, and technical writing

---

## 📚 Official Resources

- **Claude Code Documentation**: https://code.claude.com/docs/en/overview
- **GitHub Repository**: https://github.com/anthropics/claude-code
- **Discord Community**: https://anthropic.com/discord
- **Bug Reports**: Use `/bug` command in Claude Code

---

## 🎯 Who Is This For?

### 👨‍💻 Solo Developers
- Automate routine coding tasks
- Learn advanced Claude Code patterns
- Optimize your development workflow
- Master voice-driven coding

### 👥 Development Teams
- Implement team coordination workflows
- Enforce code quality standards
- Manage multi-repo projects
- Standardize commit hygiene

### 🎓 Learners
- Understand agentic coding fundamentals
- Follow step-by-step tutorials
- Practice with real-world examples
- Build custom skills and hooks

### 🚀 Power Users
- Extend Claude Code with custom agents
- Implement advanced patterns
- Optimize context management
- Build automation pipelines

---

## 🗺️ Learning Path

### 🟢 Beginner Track (1-2 hours)
1. [Installation](docs/en/installation/README.md) - Get Claude Code running
2. [Quick Start](docs/en/utilisation/README.md) - Basic commands and workflow
3. [Features Overview](docs/en/fonctionnalites/README.md) - Available tools
4. [Quick Reference](docs/en/reference-rapide/README.md) - Essential shortcuts

### 🟡 Intermediate Track (3-5 hours)
5. [Configuration](docs/en/configuration/README.md) - Custom hooks and MCP
6. [Tips & Techniques](docs/en/astuces-techniques/README.md) - Productivity boosters
7. [50 Best Practices](docs/en/bonnes-pratiques/README.md) - Professional usage
8. [Practical Examples](docs/en/exemples/README.md) - Real-world scenarios

### 🔴 Advanced Track (5-10 hours)
9. [Advanced Patterns](docs/en/patterns-avances/README.md) - Power user techniques
10. [Workflow & Bootstrap](docs/en/workflow-bootstrap/README.md) - Team automation
11. [Templates](docs/en/templates/CLAUDE.md) - Custom agents and skills
12. [Troubleshooting](docs/en/troubleshooting/README.md) - Deep debugging

---

## 🔧 How to Use This Guide

### 📖 Reading Online
Browse directly on GitHub with full markdown rendering and syntax highlighting.

### 💻 Local Clone
```bash
git clone https://github.com/gbourgogne4000K/claude-code-all-tips.git
cd claude-code-all-tips
# Open in your favorite markdown editor
```

### 🔍 Search
Use GitHub's search or grep locally:
```bash
# Find specific topics
grep -r "context hygiene" docs/

# Search for code examples
grep -r "```bash" docs/ | wc -l
```

### 📋 Copy-Paste Ready
All code snippets are tested and ready to use:
- Bash scripts for automation
- JSON configs for MCP servers
- Markdown templates for projects
- Hook scripts for safety

---

## 🌍 Language Support

This guide is **fully bilingual**:

- 🇫🇷 **French**: All sections translated and culturally adapted
- 🇬🇧 **English**: Complete original documentation

Every section exists in both languages with identical structure and content.

---

## 📝 License

[To be defined]

---

## 🙏 Acknowledgments

Built with Claude Code - Anthropic's official CLI tool for agentic coding.

Special thanks to the Claude Code community for continuous feedback and improvements.

---

## 📞 Support

- 🐛 **Found a bug in the guide?** Open an issue on GitHub
- 💡 **Have a suggestion?** Create a pull request
- ❓ **Need help with Claude Code?** Use `/help` command or visit the official Discord

---

## 🔄 Updates

This guide is actively maintained and regularly updated with:
- New Claude Code features
- Community-discovered patterns
- Additional best practices
- More practical examples

**Last updated**: February 2026

---

**⭐ If this guide helped you, please star the repository!**

[🔝 Back to top](#-the-ultimate-claude-code-guide)
