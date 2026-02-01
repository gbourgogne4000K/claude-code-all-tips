# Workflow et Bootstrap de Projet

> Approche structurée pour l'initialisation et la gestion de projets avec Claude Code

**Source** : Basé sur [claude-bootstrap](https://github.com/alinaqi/claude-bootstrap) par Ali Naqi

---

## 🎯 Philosophie Fondamentale

### Le Nouveau Goulot d'Étranglement

> "Le goulot d'étranglement s'est déplacé de la génération de code vers la compréhension du code"

L'IA génère du code rapidement, mais sans structure et contraintes, cela mène à :
- Duplication sémantique (même PURPOSE, implémentation différente)
- Complexité incontrôlée
- Dette technique rapide
- Code difficile à maintenir

**Solution** : Système opinionné avec guardrails, TDD strict, et itération automatique.

### Principes Clés

#### 1. Boucles Itératives par Défaut
Ne pas invoquer manuellement des commandes. Décrire les requirements naturellement et laisser Claude itérer **automatiquement** jusqu'au succès.

#### 2. Tests d'Abord, Toujours
- **Features** : RED → RUN → GREEN → RUN → VALIDATE
- **Bugs** : Identifier gap de test → écrire test qui échoue → corriger → valider

#### 3. Simplicité Non-Négociable
Contraintes mesurables strictes :
- **20 lignes maximum** par fonction
- **3 paramètres maximum** par fonction
- **2 niveaux** de nesting maximum
- **200 lignes maximum** par fichier
- **80% minimum** de couverture de tests

#### 4. Sécurité par Défaut
- Aucun secret dans le code
- Aucun secret dans variables d'environnement client
- Scanning de dépendances
- Hooks pre-commit obligatoires
- Enforcement CI/CD

#### 5. Code Review Obligatoire
Tous les commits nécessitent une review avant push, avec blocage selon sévérité.

---

## 🚀 Installation Rapide

### Installation du Toolkit

```bash
# Cloner le repo bootstrap
git clone https://github.com/alinaqi/claude-bootstrap.git ~/.claude-bootstrap

# Installer
cd ~/.claude-bootstrap && ./install.sh
```

### Initialiser un Nouveau Projet

```bash
# Dans le répertoire de votre projet
claude

# Puis dans Claude
/initialize-project
```

**Claude va** :
1. ✅ Valider l'outillage disponible
2. 🔧 Poser questions de configuration
3. 📁 Créer structure de repo
4. 📋 Établir specs pour premières features

---

## 🔄 Ralph Wiggum : Boucles Itératives Automatiques

### Concept

**Ralph Wiggum** est un plugin qui gère automatiquement les boucles d'itération. Nommé d'après le personnage des Simpsons, il incarne **"itération > perfection"**.

### Installation

```bash
/plugin install ralph-loop@claude-plugins-official
```

Si erreur de path, créer symlink pour résoudre incompatibilité nommage marketplace.

### Comportement Automatique

| Scénario | Comportement de Ralph |
|----------|----------------------|
| "Ajoute l'authentification utilisateur" | Boucle jusqu'à ce que les tests auth passent |
| "Corrige le bug de login" | Trouve gap de test → écrit test → boucle jusqu'à correction |
| "Construis API REST pour todos" | Boucle jusqu'à ce que tous les tests d'endpoints passent |
| "Refactorise le module auth" | Boucle avec tests comme filet de sécurité |

### Opt-Out

Pour désactiver l'itération automatique, utiliser phrases explicites :
- "Juste explique..."
- "Quick fix sans boucle..."
- "Ne boucle pas..."

### Avantages

- **Autonomie complète** : Claude itère seul jusqu'au succès
- **Zéro gestion manuelle** : Pas besoin de dire "continue" ou "corrige ça"
- **Safety net** : Tests garantissent la qualité à chaque itération
- **Flow state** : Focalisez sur les requirements, pas l'exécution

---

## 📊 Commit Hygiene & Gestion Taille PR

### Monitoring Automatique

Claude surveille automatiquement les changements et recommande commits selon seuils :

| État | Seuil | Action |
|------|-------|--------|
| 🟢 **Vert** | ≤5 fichiers, ≤200 lignes | Taille optimale de commit |
| 🟡 **Jaune** | 6-10 fichiers, 201-400 lignes | Considérer commit bientôt |
| 🔴 **Rouge** | >10 fichiers, >400 lignes | Committer IMMÉDIATEMENT |

### Recherche sur Taille PR

Études montrent augmentation dramatique du taux de défauts avec taille PR :

| Taille PR | Taux de Défauts | Raison |
|-----------|----------------|---------|
| ≤200 lignes | ~15% | Review minutieuse possible |
| 201-400 lignes | ~25% | Attention commence à baisser |
| >400 lignes | ~40%+ | Review inadéquate garantie |

### Principe du Commit Atomique

> "Si vous avez besoin du mot 'et' pour décrire votre commit, splittez-le"

**Exemples** :

❌ Mauvais :
```
"Ajoute feature auth et corrige bug panier et refactorise utils"
```

✅ Bon :
```
Commit 1: "feat: Ajoute authentification JWT"
Commit 2: "fix: Corrige calcul total panier"
Commit 3: "refactor: Extrait fonctions utils communes"
```

---

## 🏗️ Multi-Repo Workspace Awareness

### Concept

Pour projets avec multiples repos (microservices, monorepos, etc.), Claude doit comprendre la topologie complète.

### Commande d'Analyse

```bash
/analyze-workspace
```

### Artefacts Générés

| Artefact | Purpose |
|----------|---------|
| `TOPOLOGY.md` | Rôles des modules et stacks techniques |
| `CONTRACTS.md` | Endpoints API et types partagés |
| `DEPENDENCY_GRAPH.md` | Hiérarchie d'appels cross-module |
| `KEY_FILES.md` | Recommandations de chargement contexte |
| `CROSS_REPO_INDEX.md` | Capacités de recherche cross-repo |

### Vérification de Fraîcheur

Checks automatiques des contracts :
- **Session start** : ~5s
- **Post-commit** : ~15s
- **Pre-push** : ~10s

### Structure Workspace

```
workspace/
├── backend-api/
│   ├── .claude/
│   │   └── workspace.md          # Config workspace
│   ├── TOPOLOGY.md
│   └── CONTRACTS.md
├── frontend-web/
│   ├── .claude/
│   │   └── workspace.md
│   └── CONTRACTS.md (consumer)
├── mobile-app/
│   └── CONTRACTS.md (consumer)
└── shared-types/
    └── index.ts                   # Types partagés
```

### Bénéfices

- **Cohérence API** : Contrats synchronisés automatiquement
- **Détection breaking changes** : Pré-push checks
- **Context loading optimisé** : KEY_FILES.md guide Claude
- **Navigation cross-repo** : CROSS_REPO_INDEX.md permet recherche

---

## 🔍 Code Review Obligatoire

### Commande

```bash
/code-review
```

**Exécution automatique** : Chaque push nécessite review.

### Système de Sévérité

| Niveau | Icône | Blocage Push | Exemples |
|--------|-------|--------------|----------|
| **Critical** | 🔴 | OUI | Injection SQL, credentials en dur |
| **High** | 🟠 | OUI | XSS, secrets exposés, N+1 queries |
| **Medium** | 🟡 | NON (advisory) | Complexité cyclomatique élevée |
| **Low** | 🟢 | NON (advisory) | Style inconsistant, nommage |

### Installation Hooks Pre-Push

```bash
~/.claude/install-hooks.sh
```

Le hook bloque automatiquement les pushs avec findings Critical/High.

### Catégories de Review

#### 1. Sécurité
- Injection SQL
- XSS (Cross-Site Scripting)
- CSRF
- Secrets exposés
- Validation d'input manquante
- Désérialisation non sécurisée

#### 2. Performance
- N+1 queries
- Boucles inefficientes
- Chargement inutile de données
- Manque d'indexation
- Memory leaks potentiels

#### 3. Architecture
- Violations de patterns établis
- Couplage fort
- Responsabilités mal définies
- Abstractions manquantes
- Duplication de logique

#### 4. Qualité de Code
- Complexité excessive (>20 lignes/fonction)
- Trop de paramètres (>3)
- Nesting profond (>2 niveaux)
- Manque de tests
- Coverage <80%

### Workflow avec Review

```
1. Faire changements code
   ↓
2. Claude monitore (commit hygiene)
   ↓
3. Suggère commit (taille optimale)
   ↓
4. Vous committez
   ↓
5. Prêt à push
   ↓
6. /code-review automatique
   ↓
7a. Critical/High trouvé → BLOQUÉ
7b. Seulement Medium/Low → Advisory, peut push
   ↓
8. Corriger si bloqué, re-review
   ↓
9. Push autorisé
```

---

## 👥 Team Coordination

### Détection Multi-Personnes

```bash
/check-contributors
```

Claude détecte scope du projet et établit gestion d'état partagé si nécessaire.

### Structure Créée

```
_project_specs/team/
├── state.md              # Contributeurs actifs, todos claimed, conflits
├── contributors.md       # Membres équipe, ownership, focus areas
└── handoffs/
    ├── alice-to-bob.md   # Contexte passation
    └── bob-to-carol.md
```

### Features de Coordination

#### 1. Claiming de Todos

**Avant de travailler** :
```bash
/claim-todo "Implémenter auth JWT"
```

**Claude met à jour** `state.md` :
```markdown
## Active Work

- **alice** : Implémenter auth JWT (claimed 2024-02-01 14:30)
- **bob** : Corriger bug panier (claimed 2024-02-01 15:00)
```

**Bénéfice** : Prévient travail dupliqué.

#### 2. Visibilité Sessions Actives

`state.md` montre qui travaille sur quoi en temps réel.

#### 3. Warnings de Conflits

Si deux personnes modifient même zone :
```
⚠️ WARNING: bob is also working on auth module.
Consider coordinating before continuing.
```

#### 4. Handoff Notes

**Avant de finir session** :
```bash
/create-handoff "alice" "bob"
```

**Génère** `handoffs/alice-to-bob.md` :
```markdown
# Handoff: alice → bob

**Date** : 2024-02-01

## Ce que j'ai fait
- Implémenté JWT token generation
- Tests passent pour login flow

## Ce qui reste
- Refresh token logic
- Token expiration handling

## Décisions importantes
- Utilisé RS256 (pas HS256) pour meilleure sécurité
- Tokens valides 15 minutes

## Gotchas
- Secret key DOIT être en .env, pas en code
- Tests nécessitent MOCK_AUTH_SECRET en env
```

#### 5. Shared Decision Tracking

`contributors.md` track décisions majeures :
```markdown
## Architectural Decisions

1. **Auth Strategy** : JWT avec RS256 (alice, 2024-02-01)
2. **Database** : PostgreSQL (bob, 2024-01-28)
3. **API Pattern** : REST pas GraphQL (team discussion, 2024-01-25)
```

---

## 🔄 Code Deduplication

### Le Problème

**L'IA réimplémente** plutôt que copier, créant **duplicate de PURPOSE** malgré implémentations uniques.

**Exemple** :
```javascript
// Fichier A - par Alice
function validateUserEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Fichier B - par Claude (plus tard)
function checkEmailFormat(emailAddress) {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return emailRegex.test(emailAddress);
}
```

**Même PURPOSE** : valider email. **Implémentations différentes**.

### Prévention

#### 1. Vérifier CODE_INDEX.md Avant d'Écrire

**Workflow** :
```
Claude veut créer fonction → Check CODE_INDEX.md → Fonction similaire existe ?
   ↓ OUI                                           ↓ NON
   Étendre existante                               Créer nouvelle
```

#### 2. Recherche Codebase

Avant création, rechercher implémentations similaires :
```bash
# Chercher validation email
grep -r "email.*valid" src/
grep -r "validate.*email" src/
```

#### 3. Extend vs Create

**Préférer** : Étendre fonction existante avec paramètres additionnels

**Plutôt que** : Créer nouvelle fonction avec comportement similaire

### Maintenance du Code Index

#### Régénération

```bash
/update-code-index
```

**Fréquence recommandée** :
- Après ajout de features majeures
- Weekly dans projets actifs
- Post-refactor

#### Audit de Duplicates

```bash
/audit-duplicates
```

**Output** :
```
🔍 Duplicate Functions Found:

1. validateUserEmail (utils/validation.ts:12)
   checkEmailFormat (helpers/email.ts:45)
   → Similarity: 95% (same purpose: email validation)
   → Recommendation: Merge into utils/validation.ts

2. formatCurrency (utils/money.ts:8)
   displayPrice (components/Price.tsx:23)
   → Similarity: 90% (same purpose: currency formatting)
   → Recommendation: Extract to shared utils
```

### Semantic Search (Grandes Codebases)

Pour projets >100 fichiers, intégrer vector database :

**Options** :
- **ChromaDB** (Python-friendly)
- **LanceDB** (TypeScript-friendly)

**Setup** :
```bash
/setup-semantic-search chromadb
```

**Usage** :
```bash
# Recherche sémantique
/search-similar "validate email address"

# Retourne fonctions avec PURPOSE similaire
```

---

## 📁 Structure de Projet Créée

### Arborescence Complète

```
your-project/
├── .claude/
│   └── skills/                    # Coding guardrails
│       ├── base.md                # Patterns universels
│       ├── security.md            # Requirements sécurité
│       ├── typescript.md          # Spécifique TypeScript
│       ├── react-web.md           # Spécifique React
│       └── [framework].md         # Autres frameworks
│
├── .github/
│   └── workflows/
│       ├── quality.yml            # Lint, type-check, tests (80% coverage)
│       └── security.yml           # Secret scanning, dependency audit
│
├── _project_specs/
│   ├── overview.md                # Vision projet
│   ├── features/
│   │   ├── auth.md                # Spec feature auth
│   │   └── payments.md            # Spec feature payments
│   ├── todos/
│   │   ├── todo-001.md            # Todo atomique avec test cases
│   │   └── todo-002.md
│   └── team/                      # Si multi-personnes
│       ├── state.md
│       ├── contributors.md
│       └── handoffs/
│
├── docs/
│   ├── architecture.md            # Décisions architecturales
│   ├── api.md                     # Documentation API
│   └── deployment.md              # Guide déploiement
│
├── scripts/
│   ├── verify-tooling.sh          # Validation CLI
│   ├── security-check.sh          # Pre-commit security
│   └── setup-dev.sh               # Setup environnement dev
│
├── src/
│   ├── [code source]
│   └── tests/
│       └── [tests avec 80% coverage]
│
├── .env.example                   # Template variables d'environnement
├── .gitignore                     # Inclut .env
├── CLAUDE.md                      # Instructions pour Claude
├── CODE_INDEX.md                  # Index des capacités
├── TOPOLOGY.md                    # Si multi-repo
├── CONTRACTS.md                   # Si multi-repo
└── README.md                      # Documentation projet
```

### Fichiers Clés

#### CLAUDE.md

```markdown
# Project Instructions

## Stack
- TypeScript + Node.js
- React frontend
- PostgreSQL database

## Coding Standards
- Max 20 lines per function
- Max 3 parameters per function
- 80% test coverage minimum

## Security
- NO secrets in code
- ALL API keys in .env
- Pre-commit security checks enforced

## Workflow
- TDD: RED → RUN → GREEN → RUN → VALIDATE
- Atomic commits (use commit hygiene)
- Code review before push

## DO NOT
- Skip tests
- Commit without review
- Use any, ignore TypeScript errors
- Disable linters
```

#### CODE_INDEX.md

```markdown
# Code Capabilities Index

## Authentication
- `validateJWT(token)` - src/auth/jwt.ts:12
- `generateToken(userId)` - src/auth/jwt.ts:45
- `refreshToken(oldToken)` - src/auth/jwt.ts:78

## Validation
- `validateEmail(email)` - src/utils/validation.ts:5
- `validatePassword(pwd)` - src/utils/validation.ts:18
- `validateURL(url)` - src/utils/validation.ts:31

## Database
- `connectDB()` - src/db/connection.ts:8
- `executeQuery(sql, params)` - src/db/query.ts:15
- `transaction(callback)` - src/db/transaction.ts:22

[Auto-generated by /update-code-index]
Last updated: 2024-02-01
```

---

## 🧪 TDD Development Workflow

### Workflow Features

#### Phase Structure

```
1. RED    : Écrire tests depuis critères d'acceptance
2. RUN    : Exécuter tests — TOUS DOIVENT ÉCHOUER
3. GREEN  : Implémenter code minimum pour passer tests
4. RUN    : Exécuter tests — TOUS DOIVENT PASSER
5. VALIDATE : Lint + TypeCheck + Coverage ≥80%
```

**Critique** : Les tests DOIVENT échouer d'abord pour prouver qu'ils valident vraiment les requirements.

#### Workflow Bugs

```
1. Identifier gap de test
2. Écrire test qui échoue reproduisant bug
3. Exécuter test — DOIT ÉCHOUER
4. Corriger bug
5. Exécuter test — DOIT PASSER
6. Full test suite + Lint + TypeCheck
```

### Exemple Complet

**Feature** : Ajouter validation email

#### Phase RED

```typescript
// tests/validation.test.ts
describe('validateEmail', () => {
    it('should accept valid email', () => {
        expect(validateEmail('user@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
    });

    it('should reject empty string', () => {
        expect(validateEmail('')).toBe(false);
    });
});
```

#### Phase RUN (doit échouer)

```bash
npm test

FAIL  tests/validation.test.ts
  validateEmail
    ✗ should accept valid email (5 ms)
    ✗ should reject invalid email (2 ms)
    ✗ should reject empty string (1 ms)

Error: validateEmail is not defined
```

✅ **BON** : Tests échouent comme attendu.

#### Phase GREEN

```typescript
// src/utils/validation.ts
export function validateEmail(email: string): boolean {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

#### Phase RUN (doit passer)

```bash
npm test

PASS  tests/validation.test.ts
  validateEmail
    ✓ should accept valid email (3 ms)
    ✓ should reject invalid email (2 ms)
    ✓ should reject empty string (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Coverage:    100%
```

✅ **BON** : Tous les tests passent.

#### Phase VALIDATE

```bash
npm run lint && npm run type-check && npm test -- --coverage

✓ Lint passed
✓ Type-check passed
✓ Tests passed (coverage: 100%)
```

✅ **COMPLET** : Feature validée.

### Ralph Wiggum + TDD

Avec Ralph, ce workflow est **automatique** :

```
Vous: "Ajoute validation email avec tests"
   ↓
Ralph:
   1. Génère tests (RED)
   2. Vérifie qu'ils échouent (RUN)
   3. Implémente fonction (GREEN)
   4. Vérifie qu'ils passent (RUN)
   5. Lance lint/type-check (VALIDATE)
   6. Si échec, retour à step approprié
   ↓
Done: Feature complète avec tests passants
```

**Vous n'avez rien à faire** après la requête initiale.

---

## 🔐 Sécurité : Gestion Centralisée des Credentials

### Le Problème

Credentials éparpillés partout :
- Fichiers de config multiples
- Copier-coller entre projets
- Oublier de gitignore
- Secrets exposés accidentellement

### La Solution : Single Source of Truth

**Fichier unique** : `~/Documents/Access.txt` (ou autre emplacement personnel)

```
# API Keys
OpenAI API: sk-proj-abc123xyz
Claude API: sk-ant-def456uvw
Stripe Test: sk_test_ghi789rst
Stripe Live: sk_live_jkl012mno

# Database
Supabase URL: https://abc123.supabase.co
Supabase Anon Key: eyJhbGci...
PostgreSQL: postgres://user:pass@host:5432/db

# Third-party Services
SendGrid API Key: SG.abc123
Twilio SID: AC123abc
Twilio Token: def456xyz

# OAuth
GitHub Client ID: Iv1.abc123
GitHub Secret: def456ghi789
Google Client ID: 123-abc.apps.googleusercontent.com
Google Secret: GOCSPX-xyz789
```

### Détection Automatique

Claude détecte clés par **patterns** :

| Service | Pattern | Détection |
|---------|---------|-----------|
| OpenAI | `sk-proj-*` | ✅ Auto |
| Claude | `sk-ant-*` | ✅ Auto |
| Stripe | `sk_test_*` ou `sk_live_*` | ✅ Auto |
| Supabase | URL + key JWT | ✅ Auto |
| PostgreSQL | Connection string | ✅ Auto |
| Generic | Labels explicites | ✅ Auto |

### Workflow Automatisé

#### 1. Nouveau Projet Nécessite Credentials

```
Claude: "J'ai besoin d'une clé OpenAI pour ce projet"
   ↓
Claude lit ~/Documents/Access.txt
   ↓
Claude trouve: OpenAI API: sk-proj-abc123xyz
   ↓
Claude crée .env:
OPENAI_API_KEY=sk-proj-abc123xyz
   ↓
Claude vérifie .gitignore inclut .env
```

**Vous n'intervenez jamais**.

#### 2. Validation des Clés

```
Claude détecte clé → Teste validité → Confirme ou alerte
```

**Exemples** :
```bash
# OpenAI
curl https://api.openai.com/v1/models -H "Authorization: Bearer $KEY"

# Stripe
curl https://api.stripe.com/v1/charges -u $KEY:
```

Si clé invalide : **Alert immédiate**.

#### 3. Création .env Automatique

**Template détecté** depuis projet :
```bash
# .env.example
OPENAI_API_KEY=
STRIPE_KEY=
DATABASE_URL=
```

**Claude remplit** depuis Access.txt :
```bash
# .env (généré)
OPENAI_API_KEY=sk-proj-abc123xyz
STRIPE_KEY=sk_test_ghi789rst
DATABASE_URL=postgres://user:pass@host:5432/db
```

### Règles Non-Négociables

#### ❌ JAMAIS

1. **Secrets dans le code**
   ```typescript
   // ❌ WRONG
   const apiKey = 'sk-proj-abc123xyz';
   ```

2. **Secrets dans variables client**
   ```typescript
   // ❌ WRONG
   const apiKey = process.env.VITE_OPENAI_KEY;    // Exposé au client!
   const key = process.env.NEXT_PUBLIC_API_KEY;   // Exposé au client!
   ```

3. **Secrets en version control**
   ```bash
   # ❌ WRONG
   git add .env
   ```

#### ✅ TOUJOURS

1. **Secrets dans .env**
   ```typescript
   // ✅ CORRECT (backend seulement)
   const apiKey = process.env.OPENAI_API_KEY;
   ```

2. **.env dans .gitignore**
   ```
   # .gitignore
   .env
   .env.local
   .env.*.local
   ```

3. **Validation pre-commit**
   ```bash
   # scripts/security-check.sh
   # Cherche patterns de secrets
   ```

### Pre-commit Hook de Sécurité

**Installation** :
```bash
~/.claude/install-hooks.sh
```

**Hook script** : `.git/hooks/pre-commit`
```bash
#!/bin/bash

echo "🔐 Running security checks..."

# Cherche patterns de secrets
if git diff --cached | grep -E "(sk-proj-|sk-ant-|sk_test_|sk_live_)"; then
    echo "❌ ERROR: API key detected in staged changes"
    echo "Remove secrets before committing"
    exit 1
fi

# Vérifie .env pas stagé
if git diff --cached --name-only | grep -E "^\.env"; then
    echo "❌ ERROR: .env file is staged"
    echo "Never commit .env files"
    exit 1
fi

echo "✅ Security checks passed"
exit 0
```

---

## 📋 Skills & Commands Inclus (53 Total)

### Core Skills (14)

| Skill | Description |
|-------|-------------|
| `base` | Patterns universels (20 lignes/fonction, 3 params max) |
| `iterative-development` | TDD workflow strict |
| `code-review` | Review automatique avec sévérité |
| `codex-review` | Review via Codex (alternative) |
| `gemini-review` | Review via Gemini (alternative) |
| `workspace` | Multi-repo awareness |
| `commit-hygiene` | Monitoring taille commits |
| `code-deduplication` | Prévention duplicates |
| `team-coordination` | État partagé équipe |
| `security` | Règles sécurité strictes |
| `credentials` | Gestion centralisée secrets |
| `session-management` | Handoffs et continuité |
| `project-tooling` | Validation outillage |
| `existing-repo` | Integration repo existant |

### Language Skills (8)

- `python` - Best practices Python
- `typescript` - TypeScript strict mode
- `nodejs-backend` - Node.js backend patterns
- `react-web` - React web apps
- `react-native` - React Native mobile
- `android-java` - Android Java patterns
- `android-kotlin` - Android Kotlin patterns
- `flutter` - Flutter cross-platform

### UI Skills (6)

- `ui-web` - Web UI patterns
- `ui-mobile` - Mobile UI patterns
- `ui-testing` - UI test automation
- `playwright-testing` - Playwright E2E
- `user-journeys` - User flow testing
- `pwa-development` - Progressive Web Apps

### AI Skills (3)

- `agentic-development` - Building AI agents
- `llm-patterns` - LLM integration patterns
- `ai-models` - Model selection & usage

### Database & Backend Skills

Architecture-specific patterns pour divers stacks (20+ skills).

### Loading Skills

```bash
# Dans votre projet
/load-skill typescript react-web playwright-testing
```

Claude charge skills pertinents automatiquement lors de `/initialize-project`.

---

## 🎯 Contraintes de Complexité

### Limites Strictes

| Contrainte | Limite | Rationale |
|-----------|--------|-----------|
| **Lignes par fonction** | 20 max | Lisibilité, testabilité |
| **Paramètres par fonction** | 3 max | Complexité cognitive |
| **Nesting depth** | 2 niveaux max | Éviter callback hell |
| **Lignes par fichier** | 200 max | Responsabilité unique |
| **Couverture de tests** | 80% minimum | Confiance dans code |

### Enforcement Automatique

#### 1. Linting Rules

```json
// .eslintrc.json
{
    "rules": {
        "max-lines-per-function": ["error", { "max": 20 }],
        "max-params": ["error", 3],
        "max-depth": ["error", 2],
        "max-lines": ["error", { "max": 200 }]
    }
}
```

#### 2. Pre-commit Validation

```bash
# .git/hooks/pre-commit
npm run lint || exit 1
npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}' || exit 1
```

#### 3. CI/CD Gates

```yaml
# .github/workflows/quality.yml
- name: Check complexity
  run: |
    npm run lint
    npm test -- --coverage
    if [ $(cat coverage/coverage-summary.json | jq '.total.lines.pct') -lt 80 ]; then
      echo "Coverage below 80%"
      exit 1
    fi
```

### Philosophie

> "Si l'entier système ne peut être compris en une session de développement, il est devenu trop complexe"

**Implication** :
- Refactorer agressivement
- Extraire fonctions/modules tôt
- Privilégier composition sur complexité

---

## 🚀 Innovations Uniques

### 1. Agentic Ad Optimization

Service background tournant toutes les 4-6h pour campagnes Reddit automatisées.

**Cycle** :
```
1. Analyser métriques performance
   ↓
2. Identifier ads sous-performantes
   ↓
3. Exécuter actions optimisation :
   - Pause ads faibles CTR
   - Scale ads fortes ROI
   - Ajuster bids
   - Rotation creatives
   ↓
4. Logger décisions
   ↓
5. Répéter cycle
```

**Sans intervention humaine**.

### 2. Ralph Wiggum Philosophy

> "Iteration > Perfection"

Nommé d'après personnage Simpsons, framework permet à Claude de :
- Itérer **autonomously** jusqu'à requirements satisfaits
- Pas besoin prompts "continue" ou "corrige ça"
- Flow state pour développeur

### 3. Visual Testing Integration

Via `playwright-testing` skill, catch problèmes invisibles :
- Boutons invisibles (couleur texte == couleur background)
- Layouts cassés
- Problèmes contraste
- Responsive issues

**Tests automatiques** avec screenshots comparaison.

### 4. Pre-push Hook Integration

Review gates sécurité bloquant automatiquement Critical/High findings.

**Workflow** :
```
git push
   ↓
Pre-push hook triggered
   ↓
/code-review automatically
   ↓
Critical found? → BLOCKED
   ↓
Dev doit corriger avant push
```

---

## 📊 Récapitulatif par Impact

### 🔥 Maximum Impact

1. **Ralph Wiggum loops** - Développement autonome
2. **Commit hygiene** - PRs petits et reviewables
3. **Code review gates** - Qualité garantie
4. **TDD strict** - Confiance dans code
5. **Constraints enforcement** - Complexité contrôlée

### ⚡ High Impact

1. **Multi-repo awareness** - Cohérence cross-modules
2. **Team coordination** - Collaboration fluide
3. **Deduplication system** - DRY maintenu
4. **Centralized credentials** - Sécurité simplifiée
5. **Visual testing** - UI quality assurance

### 💎 Innovation Territory

1. **Agentic optimization** - Self-managing systems
2. **Semantic search** - Find by purpose, not name
3. **Contract freshness** - Always-synced APIs
4. **Atomic todo system** - Perfect granularity

---

## 🎓 Checklist de Setup

### Initial Setup

- [ ] Cloner claude-bootstrap repo
- [ ] Installer avec `./install.sh`
- [ ] Installer Ralph Wiggum plugin
- [ ] Configurer Access.txt avec credentials
- [ ] Créer template projet personnel

### Nouveau Projet

- [ ] `/initialize-project` dans répertoire projet
- [ ] Valider outillage (node, git, etc.)
- [ ] Répondre questions configuration
- [ ] Vérifier structure créée
- [ ] Load skills pertinents
- [ ] Créer première feature spec
- [ ] Écrire premiers tests (RED)

### Team Setup (si applicable)

- [ ] `/check-contributors` pour init team mode
- [ ] Documenter ownership dans contributors.md
- [ ] Établir workflow de claiming todos
- [ ] Configurer notifications handoffs
- [ ] Définir decision-making process

### Security Hardening

- [ ] Installer pre-commit hooks
- [ ] Configurer CI/CD security scans
- [ ] Valider .env dans .gitignore
- [ ] Tester pre-push review gate
- [ ] Audit initial avec `/code-review`

### Multi-Repo (si applicable)

- [ ] `/analyze-workspace` dans chaque repo
- [ ] Créer TOPOLOGY.md
- [ ] Définir CONTRACTS.md
- [ ] Setup contract freshness checks
- [ ] Documenter KEY_FILES.md

---

## 🔗 Ressources

### Repo Principal

- **claude-bootstrap** : https://github.com/alinaqi/claude-bootstrap

### Documentation Complémentaire

- [Patterns Avancés](../patterns-avances/README.md) - Context engineering
- [50 Bonnes Pratiques](../bonnes-pratiques/README.md) - Conseils experts
- [Astuces et Techniques](../astuces-techniques/README.md) - Tips communauté
- [Configuration](../configuration/README.md) - Setup hooks et settings

### Research & Philosophy

- **PR Size vs Defects** : Studies from Google, Microsoft engineering blogs
- **TDD Effectiveness** : "Test-Driven Development by Example" - Kent Beck
- **Complexity Metrics** : Cyclomatic complexity research

---

*Guide workflow & bootstrap mis à jour : Février 2026*
