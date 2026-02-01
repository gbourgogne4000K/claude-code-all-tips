# Outils et Utilitaires

> Outils pratiques pour optimiser votre expérience Claude Code

---

## 🛠️ Générateur de Configuration Claude

Outil interactif pour créer des fichiers `CLAUDE.md` et `.clauderc` optimisés pour votre projet.

### 📦 Qu'est-ce que c'est?

Le générateur de configuration vous aide à créer des fichiers de configuration personnalisés qui permettent à Claude Code de mieux comprendre et travailler avec votre projet:

- **CLAUDE.md**: Instructions projet, conventions de code, architecture, contraintes
- **.clauderc**: Configuration technique, hooks, paramètres de contexte

### 🚀 Installation et Utilisation

#### Méthode 1: Script Node.js (Recommandée)

```bash
# Télécharger le script
curl -O https://raw.githubusercontent.com/gbourgogne4000K/claude-code-all-tips/main/tools/config-generator/generate-claude-config.js

# Rendre exécutable (macOS/Linux)
chmod +x generate-claude-config.js

# Exécuter dans votre projet
cd /chemin/vers/votre/projet
node generate-claude-config.js
```

#### Méthode 2: Installation Globale NPM

```bash
# Cloner le repo
git clone https://github.com/gbourgogne4000K/claude-code-all-tips.git
cd claude-code-all-tips/tools/config-generator

# Installer globalement
npm install -g .

# Utiliser n'importe où
cd /chemin/vers/votre/projet
generate-claude-config
```

#### Méthode 3: Skill Claude

```bash
# Copier le skill dans votre dossier Claude
curl -o ~/.claude/commands/generate-config.md \
  https://raw.githubusercontent.com/gbourgogne4000K/claude-code-all-tips/main/tools/config-generator/generate-config.skill.md

# Dans Claude, exécuter:
/generate-config
```

### 📝 Ce Que l'Outil Demande

Le générateur pose des questions dans 7 catégories:

#### 1. Informations Projet
- Nom du projet
- Type (web, api, cli, library, etc.)
- Stack technique
- Langage principal

#### 2. Conventions de Code
- Style d'indentation (espaces/tabs)
- Longueur maximale de ligne
- Convention de nommage
- Style de quotes

#### 3. Architecture
- Pattern architectural (MVC, Clean, etc.)
- Structure des dossiers

#### 4. Tests
- Framework de test
- Couverture requise
- Approche (TDD/BDD)

#### 5. Workflow Git
- Convention de nommage des branches
- Format des commits
- Exigences pour les PR

#### 6. Contraintes
- Ce que Claude ne doit JAMAIS faire
- Ce que Claude doit TOUJOURS faire

#### 7. Localisation
- Où sauvegarder les fichiers

### 📄 Fichiers Générés

#### Exemple CLAUDE.md

```markdown
# MonProjet

> Instructions spécifiques au projet pour Claude Code

## 📋 Vue d'Ensemble

**Type**: web
**Stack**: TypeScript, React, Node.js
**Architecture**: Clean Architecture

## 📝 Conventions de Code

- **Indentation**: 2 espaces
- **Longueur ligne**: Max 100 caractères
- **Nommage**: camelCase pour variables, PascalCase pour composants

## 🧪 Exigences Tests

- **Framework**: Jest
- **Couverture**: 80%
- Écrire tests AVANT implémentation (TDD)

## ❌ NE JAMAIS

- Utiliser le type `any` en TypeScript
- Sauter les tests
- Commit direct sur main
- Ignorer les warnings du linter

## ✅ TOUJOURS

- Lancer les tests avant commit
- Mettre à jour la documentation
- Suivre les principes SOLID
- Utiliser des noms de variables significatifs
```

#### Exemple .clauderc

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

### 🎯 Cas d'Usage

#### Nouveau Projet

```bash
mkdir mon-nouveau-projet
cd mon-nouveau-projet
npm init -y
generate-claude-config
# Répondre aux questions
git init
git add CLAUDE.md .clauderc
git commit -m "Configuration initiale Claude"
```

#### Projet Existant

```bash
cd projet-existant
generate-claude-config
# Examiner les fichiers générés
# Personnaliser selon patterns existants
git add CLAUDE.md .clauderc
git commit -m "Ajout configuration Claude"
```

#### Onboarding Équipe

```bash
# Nouveau membre clone le repo
git clone repo-url
cd repo
# CLAUDE.md déjà présent!
claude
# Claude lit CLAUDE.md automatiquement
```

### 💡 Bonnes Pratiques

#### Pour les Équipes

1. **Générer une fois**, puis affiner ensemble
2. **Commit sur git** pour que tous aient la même config
3. **Mettre à jour régulièrement** quand les patterns évoluent
4. **Reviewer ensemble** en réunions d'équipe

#### Recommandations

1. **Être spécifique**: "Max 20 lignes par fonction" vs "Garder fonctions petites"
2. **Utiliser exemples**: Montrer des patterns de code réels
3. **Expliquer pourquoi**: Pas juste des règles, mais le raisonnement
4. **Garder à jour**: Refléter les pratiques actuelles
5. **Tester hooks**: S'assurer que les commandes fonctionnent

### 🔧 Personnalisation

Après génération, personnalisez:

**CLAUDE.md**:
- Ajouter exemples spécifiques projet
- Inclure patterns d'endpoints API
- Documenter pièges communs
- Ajouter guidelines équipe

**.clauderc**:
- Ajuster commandes hooks pour vos outils
- Ajouter plus de patterns d'exclusion
- Configurer context window selon besoins
- Setup serveurs MCP spécifiques projet

### 🐛 Dépannage

#### Hooks Ne Fonctionnent Pas

**Problème**: Les commandes hook échouent
**Solution**:
- Vérifier que commandes marchent en terminal d'abord
- Utiliser chemins complets si nécessaire
- Vérifier que scripts npm existent

#### Contexte Trop Large

**Problème**: Claude dit que le contexte est trop grand
**Solution**:
- Ajouter plus de patterns à `excludePatterns`
- Retirer gros fichiers de `alwaysInclude`
- Réduire `contextWindow` dans .clauderc

#### Claude Ignore Règles

**Problème**: Claude ne suit pas CLAUDE.md
**Solution**:
- Rendre règles plus spécifiques avec exemples
- Utiliser "JAMAIS" et "TOUJOURS" clairement
- Mettre règles critiques en haut
- Référencer CLAUDE.md dans prompts

### 📚 Exemples

Voir [/tools/config-generator/examples](../../../tools/config-generator/examples/) pour:
- Application React
- API Express
- Outil CLI
- Bibliothèque Python
- Setup Monorepo

### 🔗 Ressources

- **Documentation complète**: [tools/config-generator/README.md](../../../tools/config-generator/README.md)
- **Code source**: [tools/config-generator/](../../../tools/config-generator/)
- **Template CLAUDE.md**: [templates/CLAUDE.md](../templates/CLAUDE.md)

---

## 🚧 Outils à Venir

### Analyseur de Configuration
Outil pour analyser votre CLAUDE.md et suggérer des améliorations.

### Validateur de Hooks
Vérifier que vos hooks fonctionnent correctement.

### Template Manager
Gérer des templates CLAUDE.md pour différents types de projets.

---

*Section Outils - Guide Claude Code*
*Contribuez vos propres outils!*
