# Configuration

## Fichiers de configuration

### Emplacement
- `~/.claude/` - Dossier principal de configuration
- `~/.claude/keybindings.json` - Raccourcis clavier personnalisés

## Raccourcis clavier

### Modification des keybindings
Pour personnaliser vos raccourcis :
```bash
# Utiliser le skill keybindings-help
/keybindings-help
```

### Raccourcis par défaut
[À documenter]

## Hooks personnalisés

### Types de hooks
- `user-prompt-submit-hook` - Exécuté lors de la soumission de prompt
- [Autres hooks à documenter]

### Configuration des hooks
```json
{
  "hooks": {
    "user-prompt-submit-hook": "commande-shell"
  }
}
```

## MCP Servers

### Qu'est-ce qu'un MCP Server ?
[À compléter avec vos informations]

### Configuration
[À compléter]

### Servers disponibles
[À documenter]

## Settings avancés

### Modèles disponibles
- `sonnet` - Claude Sonnet (par défaut)
- `opus` - Claude Opus
- `haiku` - Claude Haiku (pour tâches rapides)

### Configuration du modèle
[À documenter selon vos découvertes]

## 💻 Intégration Visual Studio Code

### Extension VS Code Native

Claude Code fonctionne comme extension native dans Visual Studio Code, offrant une expérience intégrée directement dans votre éditeur.

#### Installation

**Méthode 1 : Via VS Code Marketplace**
1. Ouvrir VS Code
2. Aller dans Extensions (Ctrl+Shift+X)
3. Rechercher "Claude Code"
4. Cliquer sur "Install"

**Méthode 2 : Ligne de commande**
```bash
code --install-extension Anthropic.claude-code
```

#### Première Configuration

Après installation :
1. Ouvrir la Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
2. Taper "Claude: Sign In"
3. Authentification OAuth dans le navigateur
4. Retour automatique à VS Code

### Fonctionnalités de l'Extension

#### 1. Chat Panel Intégré

**Accès** :
- Raccourci : `Ctrl+Shift+/` (Windows/Linux) ou `Cmd+Shift+/` (macOS)
- Command Palette : "Claude: Open Chat"
- Icône dans la barre latérale

**Avantages** :
- Chat persistant pendant que vous codez
- Historique des conversations
- Sélection de code automatique
- Preview des modifications

#### 2. Sélection de Code Intelligente

**Utilisation** :
```
1. Sélectionner du code dans l'éditeur
2. Clic droit → "Ask Claude"
   OU
   Raccourci : Ctrl+Shift+L
3. Le code sélectionné est automatiquement inclus dans le contexte
```

**Exemple** :
```javascript
// Sélectionnez cette fonction
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Demandez : "Ajoute la gestion de la TVA à 20%"
// Claude comprend automatiquement le contexte
```

#### 3. Inline Edits (Modifications en Ligne)

**Comment ça marche** :
1. Claude propose des modifications de code
2. Preview diff directement dans l'éditeur
3. Accepter/Rejeter ligne par ligne
4. Undo/Redo complet

**Raccourcis** :
- `Ctrl+Enter` : Accepter la modification
- `Ctrl+Backspace` : Rejeter la modification
- `Ctrl+Z` : Annuler

#### 4. Intégration Terminal

**Terminal VS Code** :
```bash
# Le terminal VS Code reconnaît automatiquement Claude
claude

# Vous pouvez aussi utiliser l'intégration native
# qui affiche les résultats dans le chat panel
```

**Avantage** : Les commandes bash exécutées par Claude s'affichent dans le terminal intégré.

### Raccourcis Clavier VS Code

#### Raccourcis Essentiels

| Raccourci | Action | Description |
|-----------|--------|-------------|
| `Ctrl+Shift+/` | Ouvrir Chat Claude | Toggle le panel de chat |
| `Ctrl+Shift+L` | Ask Claude | Envoyer la sélection à Claude |
| `Ctrl+Shift+P` → "Claude" | Command Palette | Toutes les commandes Claude |
| `Ctrl+Enter` | Accepter modification | Applique le changement suggéré |
| `Ctrl+Backspace` | Rejeter modification | Refuse le changement |
| `Ctrl+K Ctrl+C` | Copy to Claude | Copie sélection vers chat |

#### Personnalisation des Raccourcis

**Fichier** : `.vscode/keybindings.json` ou Settings → Keyboard Shortcuts

**Exemple de configuration personnalisée** :
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

### Settings VS Code pour Claude

#### Configuration Workspace

**Fichier** : `.vscode/settings.json`

```json
{
  // Modèle par défaut
  "claude.defaultModel": "sonnet",

  // Auto-save avant de demander à Claude
  "claude.autoSaveBeforeAsk": true,

  // Afficher les diffs inline
  "claude.showInlineDiffs": true,

  // Inclure automatiquement les fichiers ouverts dans le contexte
  "claude.includeOpenFiles": true,

  // Nombre maximum de fichiers dans le contexte
  "claude.maxContextFiles": 10,

  // Format de sortie du code
  "claude.codeOutputFormat": "diff",

  // Activer les suggestions automatiques
  "claude.enableSuggestions": true,

  // Intégration avec Git
  "claude.gitIntegration": true
}
```

#### Configuration Utilisateur

**Accès** : Settings → Extensions → Claude Code

**Options importantes** :
- **Model Selection** : Choisir sonnet/opus/haiku par défaut
- **Context Window** : Gérer la taille du contexte (30K, 100K, 150K)
- **Auto-Accept** : Accepter automatiquement certains types de modifications
- **Telemetry** : Activer/désactiver la collecte de données

### Workflow Optimal VS Code + Claude

#### Pattern 1 : Développement Itératif

```
1. Ouvrir fichier dans VS Code
2. Sélectionner fonction à modifier
3. Ctrl+Shift+L → Demander modification
4. Preview diff inline
5. Accepter/Rejeter ligne par ligne
6. Tests automatiques (si hooks configurés)
7. Commit si OK
```

#### Pattern 2 : Refactoring Assisté

```
1. Sélectionner classe/module entier
2. Demander : "Refactor cette classe en suivant SOLID principles"
3. Claude propose modifications
4. Review dans diff view
5. Accepter progressivement
6. Tests en continu
```

#### Pattern 3 : Debugging Interactif

```
1. Breakpoint sur ligne problématique
2. Copier stack trace
3. Envoyer à Claude : "Debug cette erreur : [stack trace]"
4. Claude analyse et suggère fix
5. Appliquer modification
6. Re-tester
```

### Multi-Curseurs et Claude

**Technique avancée** :
```
1. Sélectionner plusieurs occurrences (Ctrl+D)
2. Ctrl+Shift+L avec multi-curseurs actifs
3. Claude comprend le pattern et modifie toutes les occurrences
```

**Exemple** :
```javascript
// Avant (sélectionner tous les console.log avec Ctrl+D)
console.log('debug 1');
console.log('debug 2');
console.log('debug 3');

// Demander : "Remplace par un logger avec niveaux"

// Après
logger.debug('debug 1');
logger.debug('debug 2');
logger.debug('debug 3');
```

### Extensions Complémentaires Recommandées

#### Essentielles

1. **GitLens** : Intégration Git avancée
   ```
   code --install-extension eamodio.gitlens
   ```

2. **Error Lens** : Affichage inline des erreurs
   ```
   code --install-extension usernamehw.errorlens
   ```

3. **Code Spell Checker** : Vérification orthographe
   ```
   code --install-extension streetsidesoftware.code-spell-checker
   ```

#### Productivité

4. **Todo Tree** : Gestion des TODO dans le code
   ```
   code --install-extension Gruntfuggly.todo-tree
   ```

5. **Better Comments** : Commentaires colorés
   ```
   code --install-extension aaron-bond.better-comments
   ```

### Workspace Multi-Fichiers

**Configuration** : `.vscode/claude.json`

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

### Débogage de l'Extension

#### Logs de l'Extension

**Accès** :
1. Help → Toggle Developer Tools
2. Onglet Console
3. Filtrer par "Claude"

**Ou via Output Panel** :
1. View → Output
2. Dropdown → "Claude Code"

#### Problèmes Courants

**Extension ne démarre pas** :
```bash
# Réinstaller l'extension
code --uninstall-extension Anthropic.claude-code
code --install-extension Anthropic.claude-code

# Vérifier les logs
cat ~/.vscode/extensions/anthropic.claude-code-*/logs/claude.log
```

**Chat ne s'affiche pas** :
1. Ctrl+Shift+P → "Developer: Reload Window"
2. Vérifier authentication : Ctrl+Shift+P → "Claude: Sign Out" puis Sign In

**Sélection de code ne fonctionne pas** :
- Vérifier que vous êtes dans un fichier texte (pas binaire)
- La sélection doit être > 0 caractères
- Essayer de recharger la fenêtre

### Performance et Optimisation

#### Réduire l'Utilisation Mémoire

**Settings** :
```json
{
  "claude.maxContextFiles": 5,
  "claude.includeOpenFiles": false,
  "claude.cacheEnabled": true
}
```

#### Accélérer les Réponses

1. **Utiliser Haiku pour tâches simples** :
   ```json
   {
     "claude.quickActionsModel": "haiku"
   }
   ```

2. **Limiter le contexte** :
   - Ne pas inclure tous les fichiers ouverts
   - Utiliser `.claudeignore` pour exclure fichiers

3. **Cache intelligent** :
   - L'extension cache les contextes fréquents
   - Réutilise les analyses précédentes

### Tips VS Code Spécifiques

#### Tip 1 : Zen Mode + Claude

```
1. View → Appearance → Zen Mode (Ctrl+K Z)
2. Ouvrir Claude Chat (Ctrl+Shift+/)
3. Code à gauche, Claude à droite
4. Focus total sur le développement
```

#### Tip 2 : Snippets Claude-Aware

**Fichier** : `.vscode/claude.code-snippets`

```json
{
  "Ask Claude to implement": {
    "prefix": "!claude",
    "body": [
      "// TODO: Ask Claude to implement ${1:functionality}",
      "// Context: ${2:description}",
      "$0"
    ],
    "description": "Marque pour demander à Claude d'implémenter"
  }
}
```

#### Tip 3 : Tasks Integration

**Fichier** : `.vscode/tasks.json`

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

## Prochaines étapes

Découvrez les [exemples pratiques](../exemples/README.md) utilisant ces configurations.
