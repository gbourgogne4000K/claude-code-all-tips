# Patterns Avancés d'Utilisation de Claude Code

> **Source** : Basé sur 2000 heures de codage avec des LLMs en 2025

## Philosophie Fondamentale

> "Le codage assisté par LLM est une compétence incroyablement difficile à maîtriser. Elle combine les fondamentaux de l'ingénierie logicielle avec les nuances du harnais agentique et de l'ingénierie de contexte." - Après 2000+ heures de pratique

**Principe de base** : Toute erreur dans le code généré par un LLM est uniquement due à VOUS. Les erreurs sont traçables à :
- **Un prompting incorrect** : Instructions vagues, contraintes manquantes, critères de succès flous
- **Une ingénierie de contexte inadéquate** : Mauvais fichiers chargés, contexte obsolète, connaissance architecturale manquante
- **Gestion de harnais défaillante** : Mauvais type d'agent, guardrails manquants, validation absente

**Problème central** : La dégradation du contexte (context rot) et le problème du "lost in the middle" impactent lourdement la qualité des outputs, et ce très rapidement.

### Le Défi de l'Apprentissage

L'apprentissage fonctionne mieux quand la boucle entre input et output est **serrée et claire**. Le codage agentique a l'une des boucles les plus convoluées :

1. **Output qualitatif** : Pas binaire comme "le tir rentre ou pas". C'est "j'aime cet output ?", "y a-t-il un bug ?", "le modèle a-t-il halluciné ?"
2. **Boîte noire au milieu** : Vous entrez un prompt, des choses se passent, un output apparaît. Impossible de voir les états intermédiaires. Impossible de tracer la causalité.
3. **Non-déterminisme** : Vous pouvez ajouter l'assignation de rôle à vos prompts et ça peut avoir exactement le même comportement que sans. Pas de différence vérifiable sans tests à grande échelle.

**Solution** : Les patterns qui suivent reconstruisent cette boucle input-output.

---

## 1. Système de Logging d'Erreurs

### Principe
Reconstruire la boucle input-output que le codage agentique vous cache.

### Implémentation
```markdown
## Structure du log d'erreur

### Date : [Date]
### Prompt déclencheur :
[Prompt exact qui a causé l'erreur]

### Erreur rencontrée :
[Description de l'erreur]

### Catégorie :
- [ ] Context rot
- [ ] Prompt ambigu
- [ ] Contexte insuffisant
- [ ] Mauvaise utilisation d'outil
- [ ] Autre : _______

### Analyse :
Qu'ai-je fait de mal ?
[Votre analyse]

### Pattern identifié :
[Si un pattern émerge]
```

### Ce qui Déclenche un Log d'Erreur

**À chaque fois que** :
- Claude hallucine quelque chose qui n'existe pas
- Claude fait quelque chose que vous n'avez pas aimé
- Claude construit quelque chose que vous n'avez pas demandé
- Un anti-pattern apparaît
- Un bug apparaît dans ce que Claude a construit
- Une instruction est ignorée ou mal interprétée
- Le contexte est perdu
- Claude tourne en boucle

**En résumé** : Tout ce qui pourrait être attribué à une mauvaise utilisation du contexte, du prompting, ou du harnais.

### Le Workflow Complet

1. **Quelque chose se passe mal** (hallucination, mauvaise construction, instruction ignorée, anti-pattern)
2. **Invoquer `/log_error`** - cela fork la conversation
3. **Claude vous interviewe** avec des questions spécifiques
4. **Il capture** :
   - Le prompt déclencheur exact (verbatim - critique)
   - La catégorie d'échec (type hallucination, instruction ignorée, contexte perdu, etc.)
   - L'analyse de cause racine (cause surface ET cause profonde)
   - La stratégie de prévention
   - Ce qui a été ajouté au CLAUDE.md (si applicable)
   - Si ce pattern a déjà été vu
   - L'impact (temps perdu, impact qualité, effets en cascade)
5. **Enregistrement** dans une base de données interrogeable
6. **Double-escape** pour rembobiner la conversation principale et continuer à travailler

### Les Questions d'Interview

La commande `/log_error` fait poser à Claude 5-8 questions clarifiantes qui sont **SPÉCIFIQUES** à ce qui s'est réellement passé. Pas génériques.

**Exemples** :
- "J'ai suggéré d'utiliser localStorage pour le token. Qu'est-ce qui vous a fait identifier cela comme un problème de sécurité ?"
- "La boucle que j'ai écrite a tourné 47 fois avant que vous ne l'arrêtiez. Quelle aurait dû être la condition de sortie ?"
- "J'ai raté ce cas limite avec les tableaux vides. Était-ce quelque chose dans les requis que j'aurais dû inférer ?"

### Le Log Capture

- **Votre prompt exact** - les mots exacts qui ont mené à l'échec
- **Ce qui s'est mal passé** - spécifique, pas générique
- **Comment le prévenir** - changement actionnable

**Analyse au fil du temps** : Claude (ou vous) peut analyser les logs et détecter les patterns d'échec communs.

### Logger les Succès Aussi !

Quand quelque chose fonctionne exceptionnellement bien, loggez-le aussi avec `/log_success` !
- Très efficace pour tester des tips trouvés en ligne
- Noter s'ils fonctionnent vraiment bien
- Rappel pour les intégrer dans les workflows quotidiens

**Voir Appendice** pour les commandes complètes `/log_error` et `/log_success`.

### Bénéfices
- Les patterns d'erreurs émergent naturellement
- Vous apprenez à identifier vos erreurs de prompting
- Amélioration continue de vos compétences
- Boucle d'apprentissage reconstituée
- Feedback concret et actionnable

### Catégories d'Erreurs et Solutions

| Mode d'Échec | Causes Communes | Corrections Standard |
|--------------|-----------------|----------------------|
| **Wrong Output** | Prompt vague, contraintes manquantes | Ajouter contraintes explicites, exemples |
| **Hallucination** | Question sur du code non vu | @-mentionner les fichiers spécifiques d'abord |
| **Refusal** | Sécurité déclenchée, requête ambiguë | Reformuler, fournir plus de contexte |
| **Infinite Loop** | Critères de succès flous | Définir explicitement les conditions de sortie |
| **Context Rot** | >70% contexte, informations obsolètes | /clear, redémarrer avec contexte frais |
| **Regression** | Correction qui casse autre chose | Exiger des tests avant implémentation |

### Exemple de Log Réel

```markdown
## 2025-01-03 | Context Rot dans Refactor Auth

**Prompt**: "Maintenant refactorise le module auth avec le nouveau pattern"

**Context %**: 78%

**Fichiers Chargés**: 12 fichiers de src/auth/, 3 fichiers config, conversation précédente

**Mode d'Échec**: wrong-output

**Ce que Claude a fait**: Utilisé l'ancien pattern malgré le nouveau montré 30 messages plus tôt

**Ce que j'attendais**: Appliquer le nouveau pattern auth du message #4

**Cause Racine**: context - le nouveau pattern était dans la zone "lost middle"

**Correction Appliquée**: /clear → ré-affirmation du pattern → pointage vers fichier spécifique

**Pattern Identifié**: TOUJOURS ré-affirmer les patterns critiques avant implémentation si >50% contexte utilisé
```

---

## 2. Slash Commands comme Mini-Applications

### Concept
Les slash commands sont secrètement l'une des fonctionnalités les plus puissantes de Claude Code.

### Philosophie
Pensez-y comme **"Claude as a Service"** :
- Workflows avec la puissance d'un SaaS
- Beaucoup plus rapide à construire
- Totalement personnalisables

### Cas d'usage
#### Créer un command personnalisé
```bash
# Exemple: Command pour setup de projet
/setup-project [type] [nom]

# Ce que fait le command:
1. Crée la structure de dossiers
2. Initialise git
3. Configure les hooks pre-commit
4. Installe les dépendances
5. Crée le fichier README
```

#### Avantages
- Réutilisabilité instantanée
- Workflows standardisés
- Économie de temps considérable

### Architecture des Commands

```
~/.claude/commands/          # Commands personnels (disponibles partout)
├── quick/                   # Commands rapides et simples
│   ├── commit.md
│   ├── pr.md
│   └── review.md
├── research/                # Commands d'investigation
│   ├── deep-dive.md
│   ├── compare.md
│   └── audit.md
└── workflows/               # Processus multi-étapes
    ├── feature.md
    ├── debug.md
    └── refactor.md

.claude/commands/            # Commands de projet (partagés équipe)
├── test.md
├── deploy.md
└── docs.md
```

### Collection de Slash Commands Essentiels

#### 1. Smart Commit (`~/.claude/commands/commit.md`)

```markdown
---
description: Créer un commit sémantique avec format conventionnel
allowed-tools: Bash(git diff:*), Bash(git status:*), Bash(git add:*), Bash(git commit:*)
model: claude-3-5-haiku-20241022
---

Analyse mes changements stagés et crée un commit :

1. Lance `git diff --cached` pour voir les changements stagés
2. Lance `git status` pour comprendre la portée
3. Génère un message de commit suivant Conventional Commits :
   - feat: nouvelle fonctionnalité
   - fix: correction de bug
   - refactor: restructuration du code
   - docs: documentation
   - test: ajout de tests
   - chore: maintenance

4. Format : `type(scope): brève description`
   - Maximum 72 caractères
   - Utilise l'impératif ("add" pas "added")

5. Demande-moi confirmation, puis commit

Si aucun changement n'est stagé, aide-moi à stager les fichiers pertinents d'abord.
```

#### 2. Investigation Profonde (`~/.claude/commands/investigate.md`)

```markdown
---
description: Plongée profonde dans un bug ou comportement
allowed-tools: Read, Grep, Glob, Bash(git log:*), Bash(git blame:*)
argument-hint: [description-problème]
---

Investiguer : $ARGUMENTS

Suis ce processus systématique :

## Phase 1 : Comprendre
- Quel est le comportement attendu ?
- Quel est le comportement réel ?
- Quand cela a-t-il commencé ? (vérifier git log si pertinent)

## Phase 2 : Localiser
- Chercher le code pertinent avec Grep
- Tracer le chemin du code depuis le point d'entrée
- Identifier tous les fichiers impliqués

## Phase 3 : Analyser
- Utiliser git blame pour comprendre l'historique
- Chercher les changements récents qui pourraient avoir causé ceci
- Vérifier les problèmes/patterns similaires ailleurs

## Phase 4 : Rapport
Fournir un rapport structuré :
1. **Cause Racine** : [une phrase]
2. **Fichiers Affectés** : [liste]
3. **Correction Recommandée** : [approche]
4. **Évaluation du Risque** : [ce qui pourrait casser]
5. **Plan de Test** : [comment vérifier]

NE FAIS AUCUN CHANGEMENT. Investigation seulement.
```

#### 3. Générateur de Tests (`~/.claude/commands/test.md`)

```markdown
---
description: Générer des tests complets pour un fichier ou fonction
allowed-tools: Read, Write, Bash(npm test:*), Bash(pytest:*)
argument-hint: [fichier-ou-fonction]
---

Génère des tests pour : $ARGUMENTS

## Processus :

1. **Lire le code cible** - comprendre tous les chemins et cas limites
2. **Identifier le framework de test** - vérifier tests existants, package.json, pytest.ini
3. **Générer des tests couvrant** :
   - Chemin heureux (utilisation normale)
   - Cas limites (vide, null, valeurs frontières)
   - Cas d'erreur (entrée invalide, exceptions)
   - Points d'intégration (mocks pour dépendances externes)

4. **Suivre les patterns existants** - correspondre au style des tests existants
5. **Lancer les tests** - s'assurer qu'ils passent
6. **Rapporter les gaps de couverture** - qu'est-ce qui n'est pas encore testé ?

Format de sortie : Créer fichier(s) de test suivant les conventions du projet.
```

#### 4. Audit de Sécurité (`~/.claude/commands/security-audit.md`)

```markdown
---
description: Revue de code axée sécurité
allowed-tools: Read, Grep, Glob
argument-hint: [fichier-ou-répertoire]
---

Effectue un audit de sécurité sur : $ARGUMENTS

## Vérifier :

### Validation d'Entrée
- [ ] Vulnérabilités d'injection SQL
- [ ] XSS (Cross-Site Scripting)
- [ ] Injection de commandes
- [ ] Traversée de chemin

### Authentification & Autorisation
- [ ] Credentials en dur
- [ ] Gestion de session faible
- [ ] Vérifications d'auth manquantes
- [ ] Chemins d'escalade de privilèges

### Gestion des Données
- [ ] Données sensibles dans les logs
- [ ] Secrets non chiffrés
- [ ] Exposition de PII
- [ ] Désérialisation non sécurisée

### Dépendances
- [ ] Packages vulnérables connus
- [ ] Dépendances obsolètes
- [ ] Dépendances inutilisées

## Format de Sortie :
Pour chaque découverte :
- **Sévérité** : Critique / Haute / Moyenne / Basse
- **Localisation** : fichier:ligne
- **Problème** : description
- **Recommandation** : comment corriger
- **Référence** : lien CWE ou OWASP si applicable
```

---

## 3. Hooks pour la Sécurité Déterministe

### La Formule Magique
```
dangerously-skip-permissions + hooks qui préviennent les actions dangereuses = flow state sans peur
```

### Configuration Recommandée

#### Dans `~/.claude/settings.json`
```json
{
  "dangerously-skip-permissions": true,
  "hooks": {
    "pre-bash": "~/scripts/claude-safety-check.sh",
    "pre-write": "~/scripts/check-protected-files.sh"
  }
}
```

#### Exemple de hook de sécurité
```bash
#!/bin/bash
# claude-safety-check.sh

# Liste des commandes interdites
FORBIDDEN_CMDS=("rm -rf /" "dd if=" "mkfs" ":(){ :|:& };:")

for cmd in "${FORBIDDEN_CMDS[@]}"; do
    if [[ "$1" == *"$cmd"* ]]; then
        echo "❌ Commande dangereuse bloquée: $cmd"
        exit 1
    fi
done

exit 0
```

### Configuration Complète des Hooks de Sécurité

#### Fichier de configuration (`~/.claude/settings.json`)

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/bash-safety.sh"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/write-safety.sh"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write(*.py)",
        "hooks": [
          {
            "type": "command",
            "command": "python -m black \"$CLAUDE_FILE_PATHS\""
          }
        ]
      },
      {
        "matcher": "Write(*.ts)",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATHS\""
          }
        ]
      },
      {
        "matcher": "Write(*.tsx)",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$CLAUDE_FILE_PATHS\" && npx tsc --noEmit \"$CLAUDE_FILE_PATHS\" 2>&1 || echo '⚠️ TypeScript errors'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "*",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/session-summary.sh"
          }
        ]
      }
    ]
  }
}
```

#### Hook de Sécurité Bash Complet (`~/.claude/hooks/bash-safety.sh`)

```bash
#!/bin/bash

# Lire l'entrée de l'outil depuis stdin
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# Définir les patterns dangereux
DANGEROUS_PATTERNS=(
    "rm -rf /"
    "rm -rf ~"
    "rm -rf \$HOME"
    "rm -rf \*"
    "> /dev/sd"
    "mkfs"
    "dd if="
    ":(){:|:&};:"         # Fork bomb
    "chmod -R 777 /"
    "chown -R"
    "curl.*| bash"
    "wget.*| bash"
    "curl.*| sh"
    "wget.*| sh"
    "git push.*--force"
    "git push.*-f"
    "DROP TABLE"
    "DROP DATABASE"
    "DELETE FROM.*WHERE 1"
    "npm publish"
    "pip upload"
)

# Vérifier chaque pattern
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if echo "$COMMAND" | grep -qE "$pattern"; then
        echo '{"decision": "block", "reason": "Commande dangereuse bloquée: '"$pattern"'"}'
        exit 0
    fi
done

# Bloquer les opérations hors du répertoire projet (optionnel)
PROJECT_DIR=$(pwd)
if echo "$COMMAND" | grep -qE "cd\s+[^.]|cd\s+/(?!home)" ; then
    echo '{"decision": "ask", "reason": "La commande navigue hors du répertoire projet"}'
    exit 0
fi

# Autoriser la commande
exit 0
```

#### Hook de Protection Write (`~/.claude/hooks/write-safety.sh`)

```bash
#!/bin/bash

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Chemins protégés
PROTECTED_PATTERNS=(
    "^/etc/"
    "^/usr/"
    "^/bin/"
    "^/sbin/"
    "^\\.env$"
    "^\\.env\\."
    "^.*\\.pem$"
    "^.*\\.key$"
    "^.*_rsa$"
    "^package-lock\\.json$"
    "^yarn\\.lock$"
    "^pnpm-lock\\.yaml$"
)

for pattern in "${PROTECTED_PATTERNS[@]}"; do
    if echo "$FILE_PATH" | grep -qE "$pattern"; then
        echo '{"decision": "ask", "reason": "Fichier protégé: '"$FILE_PATH"'"}'
        exit 0
    fi
done

exit 0
```

#### Hook de Résumé de Session (`~/.claude/hooks/session-summary.sh`)

```bash
#!/bin/bash

# Logger la fin de session avec résumé
TIMESTAMP=$(date +%Y-%m-%d_%H:%M:%S)
LOG_FILE="$HOME/.claude/session-logs/$TIMESTAMP.log"

mkdir -p "$HOME/.claude/session-logs"

# Obtenir git diff si dans un repo
if git rev-parse --git-dir > /dev/null 2>&1; then
    echo "=== Fin de Session: $TIMESTAMP ===" >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
    echo "=== Fichiers Modifiés ===" >> "$LOG_FILE"
    git diff --name-only >> "$LOG_FILE"
    echo "" >> "$LOG_FILE"
    echo "=== Résumé Diff ===" >> "$LOG_FILE"
    git diff --stat >> "$LOG_FILE"
fi

exit 0
```

#### Rendre les Hooks Exécutables

```bash
chmod +x ~/.claude/hooks/*.sh
```

### L'Alias "Safe YOLO"

Ajoutez à votre config shell (`~/.bashrc` ou `~/.zshrc`) :

```bash
# Mode Safe YOLO - permissions ignorées mais hooks vous protègent
alias claude-yolo="claude --dangerously-skip-permissions"

# Extra sûr - aussi lancé dans Docker
alias claude-sandbox="docker run -it -v $(pwd):/workspace anthropic/claude-code --dangerously-skip-permissions"
```

### Bénéfices
- Travail en flow state sans interruptions
- Protection contre les actions accidentellement destructives
- Confiance totale dans l'automatisation

---

## 4. Hygiène du Contexte

### Problème
L'auto-compaction cache la gestion du contexte et peut supprimer des informations cruciales.

### Solution

#### 1. Désactiver l'auto-compaction
```json
{
  "auto-compact": false
}
```

#### 2. Ajouter une status line
```json
{
  "status-line": "Context: {{context_usage}}% | Tokens: {{tokens_used}}/{{tokens_max}}"
}
```

#### 3. Compaction manuelle stratégique
Vous décidez **quand** et **comment** compacter :
- Avant une tâche critique
- Après avoir terminé une section
- Quand le contexte atteint 70-80%

### Feature Cachée : Double-Escape Time Travel

#### Qu'est-ce que c'est ?
La possibilité de revenir en arrière dans la conversation de manière précise.

#### Utilisation
```
User: @@back 5  # Retour de 5 messages
User: @@snapshot save point-critique
User: @@snapshot restore point-critique
```

### Comprendre la Dégradation du Contexte

Le contexte ne concerne pas seulement le manque de tokens—la qualité se dégrade bien avant d'atteindre les limites :

| Context % | Qualité | Recommandation |
|-----------|---------|----------------|
| 0-40% | Excellente | Attention complète, rappel excellent |
| 40-60% | Bonne | Commencer à être sélectif sur le nouveau contexte |
| 60-80% | Dégradée | Effets "Lost in the middle" commencent |
| 80-95% | Pauvre | Erreurs fréquentes, instructions oubliées |
| 95-100% | Critique | Auto-compact se déclenche, contexte perdu |

### La Courbe de Qualité du Contexte

```
Qualité de Sortie
     │
 100%├────────╮
     │        │╲
  80%│        │ ╲
     │        │  ╲ ← "Lost in the Middle" commence
  60%│        │   ╲
     │        │    ╲____
  40%│        │         ╲___
     │        │              ╲___
  20%│        │                   ╲
     └────────┴───────────────────────► Usage Contexte %
           20%   40%   60%   80%  100%
```

**Insight clé** : La qualité se dégrade de manière non-linéaire. Les derniers 20% du contexte sont du poison.

### Workflow de Gestion du Contexte

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   1. Départ Frais: /clear                                   │
│      └── Commencer avec contexte propre                     │
│                                                             │
│   2. Phase de Travail: Écrire code, itérer                  │
│      └── Surveiller: "quel est mon usage de contexte ?"     │
│                                                             │
│   3. Checkpoint (à 50%): Documenter l'état                  │
│      └── Sauvegarder décisions importantes dans CLAUDE.md   │
│                                                             │
│   4. Continuer ou Clear (à 70%):                            │
│      ├── Option A: /compact avec instructions spécifiques   │
│      └── Option B: /clear + restaurer depuis notes          │
│                                                             │
│   5. Urgence: Double-Escape                                 │
│      └── Rembobiner vers n'importe quel état précédent      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Command de Compaction Intelligente

Créez `~/.claude/commands/smart-compact.md` :

```markdown
---
description: Compacter le contexte avec règles de préservation explicites
---

Effectue une compaction intelligente :

## DOIT PRÉSERVER (ne jamais résumer) :
1. Tâche/objectif actuel
2. Tous les chemins de fichiers mentionnés dans les 10 derniers messages
3. Toute décision ou contrainte explicite que j'ai énoncée
4. Messages d'erreur et leurs solutions
5. Le plan/checklist actuel s'il existe

## PEUT RÉSUMER :
1. Exploration qui a mené à des impasses
2. Sortie verbeuse de commandes (garder juste la conclusion)
3. Contenus de fichiers qui n'ont pas été modifiés
4. Discussion générale qui a mené aux décisions (garder juste décisions)

## FORMAT :
Après compaction, commence ton prochain message avec :

📦 Contexte compacté. Préservé :
- [élément clé 1]
- [élément clé 2]
- [objectif actuel]

Maintenant effectue /compact avec ces règles en tête.
```

### Bénéfices
- Contrôle total sur le contexte
- Pas de perte d'informations critiques
- Optimisation de la qualité des outputs

---

## 5. Contrôle des Sous-Agents

### Observation
Claude Code spawne constamment des sous-agents Sonnet/Haiku même pour des tâches de connaissance.

### Optimisation

#### Ajouter au CLAUDE.md global
```markdown
# Agent Configuration

## Subagent Policy
- Always launch Opus subagents for complex reasoning tasks
- Use Haiku for simple, quick operations only
- Prefer subagent delegation for large projects
```

#### Pattern Recommandé
```
Orchestrator (Claude Code) + Subagents >> Claude Code vanilla
```

### Quand utiliser des sous-agents

#### Utilisez plus de sous-agents que vous ne le pensez
- Tâches parallélisables
- Projets complexes multi-fichiers
- Recherches approfondies
- Analyses de code importantes

#### Configuration optimale
```markdown
# Dans votre prompt
Use Task tool with subagent for:
1. Code exploration (Explore agent)
2. Complex planning (Plan agent)
3. Parallel operations (multiple agents)
```

### Collection de Sous-Agents Personnalisés

Créez des sous-agents spécialisés dans `~/.claude/agents/` :

#### Code Reviewer (`~/.claude/agents/code-reviewer.md`)

```markdown
---
name: code-reviewer
description: Expert en revue de code - bugs, sécurité, maintenabilité
tools: Read, Grep, Glob
model: opus
---

Tu es un senior code reviewer avec expertise en :
- Vulnérabilités de sécurité
- Problèmes de performance
- Maintenabilité du code
- Gaps de tests

Lors de la revue de code :

1. **Premier Passage - Problèmes Critiques**
   - Vulnérabilités de sécurité (injection, auth, exposition de données)
   - Erreurs logiques pouvant causer des bugs
   - Conditions de course ou problèmes de concurrence

2. **Second Passage - Problèmes de Qualité**
   - Duplication de code
   - Fonctions complexes nécessitant refactoring
   - Gestion d'erreur manquante
   - Nommage peu clair

3. **Troisième Passage - Suggestions**
   - Améliorations de performance
   - Meilleurs patterns/abstractions
   - Besoins en documentation

Format de sortie :

## Critique 🔴
- [fichier:ligne] Description du problème

## Important 🟡
- [fichier:ligne] Description du problème

## Suggestions 🟢
- [fichier:ligne] Suggestion

Sois spécifique. Inclus numéros de ligne. Suggère des corrections.
```

#### Test Writer (`~/.claude/agents/test-writer.md`)

```markdown
---
name: test-writer
description: Écrit des tests complets avec couverture des cas limites
tools: Read, Write, Bash
model: opus
---

Tu es un expert en tests. Lors de l'écriture de tests :

## Principes
1. **Tester le comportement, pas l'implémentation**
2. **Une assertion par test** (quand pratique)
3. **Noms de tests descriptifs** : "devrait_retourner_tableau_vide_quand_entree_nulle"
4. **Structure Arrange-Act-Assert**
5. **Couvrir systématiquement les cas limites**

## Checklist des Cas Limites
- [ ] Entrées null/undefined
- [ ] Chaînes/tableaux/objets vides
- [ ] Valeurs frontières (0, -1, MAX_INT)
- [ ] Types invalides
- [ ] Caractères Unicode/spéciaux
- [ ] Accès concurrent (si applicable)
- [ ] Conditions d'erreur

## Structure de Test
describe('[Unité Sous Test]', () => {
  describe('[Méthode/Fonction]', () => {
    describe('quand [condition]', () => {
      it('devrait [comportement attendu]', () => {
        // Arrange
        // Act
        // Assert
      });
    });
  });
});

Correspond aux patterns de test existants dans la codebase.
```

#### Architecture Analyst (`~/.claude/agents/architect.md`)

```markdown
---
name: architect
description: Analyse l'architecture de la codebase et suggère améliorations
tools: Read, Grep, Glob
model: opus
---

Tu es un architecte logiciel. Lors de l'analyse du code :

## Framework d'Analyse

### 1. Analyse des Dépendances
- Cartographier les dépendances de modules
- Identifier les dépendances circulaires
- Trouver les composants fortement couplés
- Localiser les god objects/modules

### 2. Reconnaissance de Patterns
- Quels patterns architecturaux sont utilisés ?
- Sont-ils appliqués de manière cohérente ?
- Quels patterns manquants aideraient ?

### 3. Évaluation de Scalabilité
- Identification des goulots d'étranglement
- Préparation au scaling horizontal
- Patterns base de données/stockage

### 4. Score de Maintenabilité
Noter 1-10 avec justification :
- Organisation du code
- Séparation des préoccupations
- Couverture de tests
- Documentation

## Format de Sortie
# Analyse d'Architecture : [Composant/Système]

## État Actuel
[Diagramme ou description]

## Forces
-

## Préoccupations
-

## Recommandations
1. [Priorité] Description
2. [Priorité] Description

## Feuille de Route de Refactoring Suggérée
Phase 1 : [Quick wins]
Phase 2 : [Effort moyen]
Phase 3 : [Refactoring majeur]
```

### Pattern Orchestrateur

Pour les tâches complexes, utilisez un agent principal + sous-agents spécialisés :

```
┌─────────────────────────────────────────────────────────────┐
│                     Agent Principal (Opus)                  │
│                     - Planification de tâches               │
│                     - Prise de décisions                    │
│                     - Synthèse des résultats                │
└─────────────────────────────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ▼                  ▼                  ▼
    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
    │code-reviewer│    │ test-writer │    │  architect  │
    │   (Opus)    │    │   (Opus)    │    │   (Opus)    │
    └─────────────┘    └─────────────┘    └─────────────┘
```

### Bénéfices
- Meilleure qualité pour les tâches complexes
- Parallélisation efficace
- Contexte dédié par tâche

---

## 6. Le Système de Reprompting

### Problème
Écrire des prompts de haute qualité prend du temps et brise le flow.

### Solution : Pipeline Voice-to-Structured-Prompt

#### Étape 1 : Dictée vocale
```
Utilisez un outil de voice-to-text pour capturer votre intention
```

#### Étape 2 : Questions clarifiantes
Claude pose automatiquement des questions pour clarifier :
- L'objectif exact
- Les contraintes
- Les préférences
- Le contexte manquant

#### Étape 3 : Prompt structuré avec XML
Claude génère un prompt structuré :

```xml
<task>
  <objective>
    Implémenter un système d'authentification JWT
  </objective>

  <constraints>
    <constraint>Utiliser Express.js</constraint>
    <constraint>Pas de bibliothèque externe sauf jsonwebtoken</constraint>
    <constraint>Support du refresh token</constraint>
  </constraints>

  <context>
    <existing-code>
      - API REST déjà en place
      - Base de données PostgreSQL
      - Modèle User existant
    </existing-code>
  </context>

  <preferences>
    <preference>Code commenté en français</preference>
    <preference>Tests unitaires inclus</preference>
  </preferences>
</task>
```

### Workflow complet
```
1. Parlez votre intention (30 secondes)
   ↓
2. Claude pose 2-3 questions clarifiantes (1 minute)
   ↓
3. Claude génère le prompt structuré (10 secondes)
   ↓
4. Vous validez ou ajustez (20 secondes)
   ↓
5. Exécution avec contexte parfait
```

### Bénéfices
- Prompting de haute qualité sans friction
- Réduction drastique des aller-retours
- Capture complète de l'intention
- Gain de temps massif

---

## 7. Stack d'Outils Lean

### Philosophie

Le contexte est **sacré**. Chaque token de contexte doit se battre pour sa place dans les agents de codage. Par conséquent, n'utilisez des MCPs que s'ils sont essentiels.

### MCPs Essentiels Recommandés

#### Context7 MCP ⭐

**Problème** : Les données d'entraînement des LLMs sont toujours en retard de quelques mois.

**Solution** : Context7 MCP donne accès à de la documentation à jour et stable.

**Avantages** :
- Documentation à jour de pratiquement n'importe quel projet ou framework
- Le modèle comprend les dernières API et conventions
- Essentiel pour quiconque code avec des LLMs

**Installation** :
```bash
# Installer Context7 MCP
npm install -g context7-mcp
```

#### Dev Browser / Playwright MCP ⭐

**Utilité** : Automatisation du navigateur pour Claude Code.

**Capacités** :
- Contrôler votre navigateur web facilement
- Chercher des erreurs de console dans les UIs pour débugging
- Prendre des captures d'écran pour utiliser la multimodalité
- Comprendre les designs visuellement

**Recommandation** : Préférez **dev-browser** (plus rapide et plus efficient en contexte que Playwright MCP).

**Installation** :
```bash
# Dev Browser (recommandé)
npm install -g dev-browser-mcp

# Ou Playwright MCP
npm install -g playwright-mcp
```

### Éviter la Surcharge de MCPs

**Anti-pattern** : Installer 10+ MCPs "au cas où".

**Best practice** :
- Commencez avec Context7 + Dev Browser uniquement
- Ajoutez d'autres MCPs seulement quand **vraiment nécessaire**
- Chaque MCP ajoute du contexte - soyez sélectif

---

## 8. Prompt Engineering Amélioré

### Le Problème du Typing

Deux observations après 2000+ heures :
1. **Le bottleneck est la vitesse de frappe** - Le codage agentique est rapide, vous êtes lent
2. **Le prompt engineering est automatisable** - XML tags, structuration, assignation de rôle

### Le Système Reprompter

**Workflow complet** :

```
1. Appuyez sur un raccourci clavier
   ↓
2. Dictez ce que vous voulez (parler, pas taper)
   ↓
3. Le système pose des questions clarifiantes basées sur votre dictée
   ↓
4. Vous répondez aux questions (toujours à la voix)
   ↓
5. Il génère un prompt complet avec XML tags, assignation de rôle,
   et utilise toute la littérature sur le bon prompting
   ↓
6. Prompt de haute qualité sans friction de typing
```

**Résultat** : Prompter à haute qualité, rapidement, sans la friction d'écrire des structures XML et de se souvenir des best practices de prompting à chaque fois.

### Faire Interviewer le Modèle

**Si vous ne voulez pas un reprompter complet**, au minimum :

**Actionnable** : Faites interviewer les modèles **beaucoup plus** que vous ne le faites maintenant.

**Problème** : Même les quelques questions en Plan Mode sont souvent insuffisantes pour vraiment extraire ce que vous voulez.

**Solution** :
```markdown
"Avant de commencer cette implémentation, interviewe-moi avec au moins 5 questions
pour comprendre exactement ce que je veux. Pose UNE question à la fois et attends
ma réponse avant la suivante."
```

**Bénéfices** :
- Extraction complète de l'intention
- Clarification des contraintes
- Identification des cas limites
- Meilleure première tentative

### Exemple de Transformation

**Dictée brute (30 secondes)** :
```
"Je veux refactorer le système d'auth pour utiliser le nouveau pattern
qu'on a discuté, celui avec le middleware"
```

**Questions clarifiantes de Claude (1 minute)** :
```
1. Quel fichier contient le nouveau pattern ?
2. Remplacement complet ou migration progressive ?
3. Quels composants spécifiques sont affectés ?
4. Comment gérer les sessions existantes ?
```

**Prompt structuré généré (10 secondes)** :
```xml
<task>
  <role>Expert en sécurité web et architecture auth</role>

  <goal>
    Refactorer le système d'authentification pour utiliser le pattern
    défini dans docs/auth-v2.md
  </goal>

  <context>
    <files>docs/auth-v2.md, src/auth/**, src/middleware/**</files>
    <current-state>Système auth avec JWT basique</current-state>
    <target-state>Pattern middleware documenté dans auth-v2.md</target-state>
  </context>

  <constraints>
    <must>Suivre exactement les patterns dans auth-v2.md</must>
    <must>Maintenir toutes les routes protégées existantes</must>
    <must>Inclure migration pour sessions utilisateurs existantes</must>
    <must_not>Laisser du code auth déprécié actif</must_not>
  </constraints>

  <output>
    <format>Fichiers modifiés avec nouvelle implémentation auth</format>
    <verification>
      - Tous les tests existants passent
      - Nouveaux tests auth ajoutés
      - Documenté dans CHANGELOG
    </verification>
  </output>
</task>
```

**Total** : ~2 minutes pour un prompt de qualité expert vs 10+ minutes de typing.

---

## Résumé des Patterns

| Pattern | Impact | Difficulté | ROI |
|---------|--------|------------|-----|
| Error Logging | 🔥🔥🔥 | Faible | Très élevé |
| Slash Commands | 🔥🔥🔥🔥 | Moyenne | Extrêmement élevé |
| Hooks Safety | 🔥🔥🔥🔥🔥 | Moyenne | Critique |
| Context Hygiene | 🔥🔥🔥🔥 | Faible | Très élevé |
| Subagent Control | 🔥🔥🔥 | Élevée | Élevé |
| Tool Stack Lean | 🔥🔥 | Faible | Élevé |
| Prompt Engineering+ | 🔥🔥🔥🔥 | Moyenne | Très élevé |

## Référence Rapide par Situation

| Situation | Action |
|-----------|--------|
| Claude fait quelque chose de mal | `/log_error` → fork → interview → capturer prompt verbatim → rewind |
| Quelque chose a exceptionnellement bien fonctionné | `/log_success` → capturer ce qui a fait cliquer |
| Besoin d'exécution de workflow fiable | `/command` (déterministe) enveloppant skill (connaissance) |
| Workflow complexe adapté à votre système de fichiers | `/command` avec sous-agents parallèles + dépendances séquentielles |
| Claude demande trop de permissions | Hooks + dangerously-skip-permissions |
| Contexte se remplit trop vite | Désactiver autocompact, ajouter status line, compact manuel |
| Bug corrigé mais contexte pollué | Double-escape → restaurer conversation seulement (garder code) |
| Claude tourne en boucle/dérape | Double-escape → restaurer code ET conversation |
| CLAUDE.md semble surchargé | Revue hebdomadaire, fichiers repo-spécifiques, nettoyer impitoyablement |
| Besoin de passation propre entre sessions | `/handoff {NOTES}` commande personnalisée |
| Point de rupture clair atteint | `/clear` + CLAUDE.md repo-spécifique |
| Sous-agents utilisent le mauvais modèle | Ajouter "Always launch opus subagents" au CLAUDE.md global |
| Impossible de voir ce que font les sous-agents | Dashboard de monitoring d'agents (localhost) |
| Hallucination empoisonnant chaîne de sous-agents | Tâches isolées, vérifications déterministes, Agent X valide Agent Y |
| Taper les prompts est lent | Reprompter: voix → questions clarifiantes → prompt structuré |

---

## Mise en Pratique

### Checklist pour Démarrer

- [ ] Créer un fichier de log d'erreurs
- [ ] Identifier 3 workflows répétitifs à transformer en slash commands
- [ ] Configurer les hooks de sécurité de base
- [ ] Désactiver auto-compact et ajouter status line
- [ ] Ajouter la policy de sous-agents au CLAUDE.md
- [ ] Tester le système de reprompting sur une tâche complexe

### Prochaines Étapes

1. Commencer par **Context Hygiene** (impact immédiat, faible effort)
2. Ajouter **Hooks Safety** pour la tranquillité d'esprit
3. Implémenter **Error Logging** pour l'apprentissage continu
4. Développer vos premiers **Slash Commands**
5. Optimiser avec **Subagent Control**
6. Maîtriser le **Reprompter System**

---

## Ressources Complémentaires

- **[📚 Appendices - Commandes Complètes](appendices.md)** ⭐
  - Commande `/log_error` complète avec template
  - Commande `/log_success` complète avec template
  - Configuration dashboard monitoring sous-agents
  - Liens ressources et communauté
- [Configuration avancée](../configuration/README.md)
- [Exemples pratiques](../exemples/README.md)
- [Troubleshooting](../troubleshooting/README.md)
- [50 Bonnes Pratiques](../bonnes-pratiques/README.md)
- [Référence Rapide](../reference-rapide/README.md)
