# Installation de Claude Code

> Guide complet d'installation basé sur la documentation officielle Anthropic

**Source officielle** : [code.claude.com/docs/en/setup](https://code.claude.com/docs/en/setup)

---

## 🎯 Vue d'Ensemble

**Claude Code** est un outil de codage agentique qui vit dans votre terminal, comprend votre codebase, et vous aide à coder plus rapidement en exécutant des tâches routinières, expliquant du code complexe, et gérant les workflows git—le tout via des commandes en langage naturel.

### Caractéristiques Clés

- ✨ Assistant de codage agentique basé terminal
- 🧠 Compréhension et analyse de codebase
- ⚡ Exécution de tâches routinières
- 📖 Explication de code complexe
- 🔀 Gestion de workflows Git
- 💬 Interface en langage naturel
- 🔧 Fonctionne dans terminal, IDE, ou via GitHub (@claude tagging)

---

## 📥 Installation

### Méthodes Recommandées (Officielles)

#### macOS / Linux

**Méthode 1 : Script d'installation (Recommandé)**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Méthode 2 : Homebrew**
```bash
brew install --cask claude-code
```

#### Windows

**Méthode 1 : Script PowerShell (Recommandé)**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Méthode 2 : WinGet**
```powershell
winget install Anthropic.ClaudeCode
```

#### Installation via NPM (Dépréciée)

```bash
npm install -g @anthropic-ai/claude-code
```

> ⚠️ **Note** : L'installation via npm est dépréciée. Utilisez l'une des méthodes recommandées ci-dessus.

---

## 🚀 Démarrage Rapide

### Première Utilisation

1. **Installer** Claude Code (voir méthodes ci-dessus)
2. **Naviguer** vers votre répertoire projet
   ```bash
   cd /path/to/your/project
   ```
3. **Lancer** Claude
   ```bash
   claude
   ```

### Vérification de l'Installation

```bash
# Vérifier version
claude --version

# Afficher aide
claude --help
```

---

## ⚙️ Configuration Système Requise

### Requirements Minimaux

| Composant | Requirement |
|-----------|-------------|
| **Node.js** | Version 18+ |
| **npm** | Version la plus récente |
| **OS** | macOS, Linux, Windows |
| **Terminal** | Bash, Zsh, PowerShell, CMD |

### Vérification Requirements

```bash
# Vérifier Node.js
node --version
# Devrait afficher v18.x.x ou supérieur

# Vérifier npm
npm --version
```

---

## 🔐 Configuration Sécurité

### Authentification

Claude Code utilise authentification OAuth via navigateur.

**Première authentification** :
```bash
claude
# Ouvre navigateur pour login
```

**Token stocké** dans `~/.claude/config.json` (crypté).

### Gestion des Secrets

**Règles critiques** :
1. ❌ **JAMAIS** committer `.env` files
2. ❌ **JAMAIS** stocker secrets dans code
3. ✅ **TOUJOURS** utiliser variables d'environnement
4. ✅ **TOUJOURS** gitignore `.env*`

---

## 🐛 Dépannage Installation

### Problèmes Courants

#### Erreur: "Node.js not found"

**Solution** :
```bash
# Installer Node.js
# macOS
brew install node

# Linux (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Windows
winget install OpenJS.NodeJS
```

#### Erreur: "Permission denied"

**Solution** :
```bash
# macOS / Linux
sudo curl -fsSL https://claude.ai/install.sh | bash

# Ou modifier permissions
sudo chown -R $(whoami) /usr/local/bin
```

#### Erreur: "Command not found: claude"

**Solution** :
```bash
# Vérifier PATH
echo $PATH

# Ajouter à PATH si nécessaire
# macOS / Linux (~/.zshrc ou ~/.bashrc)
export PATH="$PATH:$HOME/.claude/bin"

# Windows (PowerShell Profile)
$env:Path += ";$env:USERPROFILE\.claude\bin"
```

---

## 📚 Ressources Officielles

### Documentation

| Ressource | URL |
|-----------|-----|
| **Documentation Complète** | https://code.claude.com/docs/en/overview |
| **Guide d'Installation** | https://code.claude.com/docs/en/setup |
| **Usage et Commandes** | https://code.claude.com/docs/en/usage |
| **Best Practices** | https://code.claude.com/docs/en/best-practices |
| **Data & Privacy** | https://code.claude.com/docs/en/data-usage |

### Communauté et Support

| Plateforme | Lien |
|------------|------|
| **GitHub Repository** | https://github.com/anthropics/claude-code |
| **GitHub Issues** | https://github.com/anthropics/claude-code/issues |
| **Discord Developers** | https://anthropic.com/discord |
| **Bug Report (In-app)** | `/bug` command dans Claude |

---

## 🔒 Data Collection & Privacy

### Données Collectées

Lors de l'utilisation de Claude Code, les données suivantes sont collectées :

1. **Usage data** :
   - Acceptations/rejets de code
   - Patterns d'interaction
   - Commandes utilisées

2. **Conversation data** :
   - Associée à votre utilisation
   - Contexte des sessions

3. **User feedback** :
   - Soumis via `/bug` command
   - Retours utilisateurs

### Safeguards Privacy

✅ **Garanties** :
- Périodes de rétention limitées pour informations sensibles
- Accès restreint aux données de session utilisateur
- Politiques claires contre utilisation pour training modèle
- Conformité RGPD et réglementations privacy

**Politique détaillée** : https://code.claude.com/docs/en/data-usage

---

## ✅ Checklist Post-Installation

### Vérification Complète

- [ ] Claude Code installé et dans PATH
- [ ] `claude --version` fonctionne
- [ ] Authentication complétée
- [ ] Configuration `~/.claude/` créée
- [ ] Node.js 18+ installé
- [ ] npm à jour
- [ ] Git configuré correctement

### Prochaines Étapes

Après installation réussie :

1. **Tutoriel rapide** : [Utilisation](../utilisation/README.md)
2. **Configuration avancée** : [Configuration](../configuration/README.md)
3. **Best practices** : [50 Bonnes Pratiques](../bonnes-pratiques/README.md)

---

*Guide d'installation mis à jour : Février 2026*
*Basé sur la documentation officielle Anthropic*
