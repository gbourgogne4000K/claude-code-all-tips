# Astuces et Techniques Claude Code

> Collection de conseils pratiques issus de la communauté et des utilisateurs experts

---

## 📊 Commandes Essentielles

### Commandes de Monitoring

#### `/usage` - Surveiller les Limites
```bash
/usage
```
**Utilité** : Affiche les limites de rate et l'utilisation des tokens en temps réel.

**Quand l'utiliser** :
- Avant de lancer une tâche coûteuse
- Pour vérifier combien de requêtes restent
- Pour optimiser l'utilisation des ressources

#### `/stats` - Statistiques d'Activité
```bash
/stats
```
**Affiche** :
- Graphiques d'activité
- Utilisation historique
- Patterns de consommation
- Statistiques par projet

### Commandes de Gestion du Contexte

#### `/copy` - Copier comme Markdown
```bash
/copy
```
**Utilité** : Copie la dernière réponse de Claude en format markdown.

**Use cases** :
- Extraire du code généré
- Sauvegarder des explications
- Partager des outputs
- Documentation rapide

#### `/chrome` - Intégration Navigateur
```bash
/chrome
```
**Toggle** : Active/désactive l'intégration native du navigateur de Claude.

**Quand utiliser** :
- Testing d'interfaces
- Scraping de contenu web
- Vérification visuelle
- Debugging UI

**Note** : Playwright MCP est souvent préférable (plus fiable, utilise l'accessibility tree).

#### `/mcp` - Gestion MCP Servers
```bash
/mcp
```
**Utilité** : Gérer les serveurs Model Context Protocol.

**Actions disponibles** :
- Lister serveurs actifs
- Activer/désactiver serveurs
- Configurer nouvelles connexions
- Débugger problèmes MCP

### Commandes de Workflow

#### `/plan` - Mode Planification Étendu
```bash
/plan
```
**Workflow recommandé** :
1. Lancer `/plan` pour rassembler contexte complet
2. Claude crée un plan détaillé
3. Sélectionner "clear context and auto-accept edits"
4. Nouvelle conversation démarre avec seulement le plan comme référence

**Bénéfices** :
- Contexte frais pour l'exécution
- Plan complet comme guide
- Performance optimale
- Moins d'erreurs

---

## ⚡ Aliases Terminaux Recommandés

### Configuration Shell de Base

Ajoutez à votre `~/.zshrc` ou `~/.bashrc` :

```bash
# Lancement rapide
alias c='claude'
alias cc='claude --continue'      # Continuer dernière conversation
alias cr='claude --recent'         # Voir conversations récentes

# Avec intégrations
alias ch='claude --chrome'        # Claude avec Chrome
alias ccp='claude --dangerously-skip-permissions'  # Mode autonome

# Workflows spécifiques
alias cplan='claude /plan'        # Démarrer en mode plan
alias cusage='claude /usage'      # Vérifier usage
alias cstats='claude /stats'      # Voir statistiques

# Combinaisons puissantes
alias ccp='c -c'                  # Continue avec permissions
alias cclear='claude /clear'      # Clear et relancer
```

### Aliases Avancés

```bash
# Fonctions shell avancées
c-new() {
    # Nouvelle conversation avec contexte spécifique
    cd "$1" && claude
}

c-compact() {
    # Compacter et documenter
    claude /compact
    echo "📝 Créer handoff doc avant /clear"
}

c-search() {
    # Rechercher dans l'historique
    grep -r -i "$1" ~/.claude/projects/
}

c-backup() {
    # Backup conversations importantes
    local backup_dir="$HOME/claude-backups/$(date +%Y-%m-%d)"
    mkdir -p "$backup_dir"
    cp -r ~/.claude/projects/* "$backup_dir/"
    echo "✅ Backup créé: $backup_dir"
}
```

---

## 🎤 Intégration Voix

### Philosophie
> "Communiquer via la voix est plus rapide que taper"

**Impact** : Réduction de 60-80% du temps de prompting.

### Outils Recommandés

#### 1. Superwhisper (Recommandé) ⭐
**Plateforme** : macOS

**Caractéristiques** :
- Transcription locale temps réel
- Haute précision
- Hotkey personnalisable
- Intégration système

**Installation** :
```bash
brew install --cask superwhisper
```

**Setup** :
1. Configurer hotkey (ex: Cmd+Shift+Space)
2. Parler → transcription automatique
3. Texte inséré directement dans Claude

#### 2. MacWhisper
**Alternative** : Similaire à Superwhisper, gratuit pour usage basique.

#### 3. Super Voice Assistant (Open Source)
**Avantage** : Gratuit et open source.

**GitHub** : https://github.com/k-m-jin/super-voice-assistant

### Workflow Voix Optimal

```
1. Appuyer sur hotkey voix
   ↓
2. Dicter intention haute niveau (30 sec)
   "Je veux refactorer l'auth pour utiliser le nouveau pattern middleware"
   ↓
3. Claude pose questions clarifiantes
   ↓
4. Répondre à la voix (15 sec chacune)
   ↓
5. Prompt structuré généré
```

**Total** : ~2 minutes vs 10+ minutes de typing manuel.

### Tolérance aux Erreurs

**Important** : Même avec erreurs de transcription, Claude comprend l'intention.

**Exemple** :
```
Transcription: "Je veux créer une fonction pour valider l'adresse mail"
                                              ↑ erreur: "email"
Claude comprend: validate email ✓
```

---

## 🔄 Gestion du Contexte Avancée

### La Règle du Lait
> "AI context is like milk; it's best served fresh and condensed!"

**Principe** : Le contexte se dégrade comme du lait. Plus il est frais, meilleur il est.

### Stratégie de Compaction Proactive

#### 1. Désactiver Auto-Compact

**Fichier** : `~/.claude/settings.json`

```json
{
  "conversation": {
    "autoCompact": false,
    "compactThreshold": 0.95
  }
}
```

**Pourquoi** : Contrôle total sur quand et comment compacter.

#### 2. Créer Handoff Documents

Avant de `/clear`, créer un document de passation :

**Template** : `handoff-[date].md`

```markdown
# Handoff Document - [Date]

## Contexte
- Projet : [nom]
- Objectif : [objectif actuel]

## Progrès
- ✅ Complété : [liste]
- 🔄 En cours : [liste]
- ⏳ À faire : [liste]

## Décisions Importantes
1. [Décision 1 + rationale]
2. [Décision 2 + rationale]

## Ce qui a Fonctionné
- [Pattern/approche réussie]

## Ce qui N'a PAS Fonctionné
- [Approche échouée + pourquoi]

## Prochaines Étapes
1. [Step 1]
2. [Step 2]

## Contexte Critique à Retenir
- [Info essentielle 1]
- [Info essentielle 2]

## Fichiers Clés
- [liste des fichiers pertinents]
```

#### 3. Workflow de Passation

```bash
# 1. Générer handoff
claude "Crée un handoff document résumant notre session"

# 2. Sauvegarder
mv handoff.md handoff-$(date +%Y%m%d).md

# 3. Clear
/clear

# 4. Nouvelle session avec handoff
claude "Voici le handoff de la session précédente: @handoff-20260201.md
Continuons à partir de là"
```

---

## 🧪 Testing Autonome avec tmux

### Concept

Permettre à Claude de tester son code de manière autonome en utilisant tmux pour les exécutions en background.

### Setup tmux

```bash
# Installer tmux si nécessaire
brew install tmux  # macOS
sudo apt install tmux  # Linux

# Configuration de base
cat > ~/.tmux.conf << 'EOF'
# Scrollback buffer
set-option -g history-limit 50000

# Mouse support
set -g mouse on

# Status bar
set -g status-bg colour235
set -g status-fg white
EOF
```

### Pattern de Test Autonome

**Slash Command** : `~/.claude/commands/test-autonomous.md`

```markdown
---
description: Lancer tests de manière autonome avec vérification
allowed-tools: Bash
---

Lance les tests de manière autonome :

1. **Créer session tmux** :
   ```bash
   tmux new-session -d -s test-run
   ```

2. **Envoyer commandes de test** :
   ```bash
   tmux send-keys -t test-run "npm test" C-m
   ```

3. **Capturer output** :
   ```bash
   sleep 5  # Attendre exécution
   tmux capture-pane -t test-run -p > test-output.txt
   ```

4. **Analyser résultats** :
   - Lire test-output.txt
   - Identifier échecs
   - Proposer corrections

5. **Si échecs** :
   - Corriger code
   - Re-lancer tests
   - Répéter jusqu'à succès

6. **Cleanup** :
   ```bash
   tmux kill-session -t test-run
   ```

**Critère de succès** : Tous les tests passent sans intervention.
```

### Git Bisect Autonome

```markdown
# Dans votre prompt
"Utilise git bisect pour trouver le commit qui a introduit ce bug.
Lance les tests dans tmux pour chaque commit.
Opère de manière autonome jusqu'à identifier le commit fautif."
```

**Workflow automatique** :
1. `git bisect start`
2. Marquer bon/mauvais commits
3. Pour chaque commit, lancer tests en tmux
4. Analyser output
5. `git bisect good/bad` selon résultat
6. Continuer jusqu'à identification

---

## 🌐 Playwright MCP vs Chrome Natif

### Comparaison

| Feature | Playwright MCP | Chrome Natif |
|---------|---------------|--------------|
| **Méthode** | Accessibility tree | Screenshots |
| **Fiabilité** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | Rapide | Plus lent |
| **Précision clicks** | Ref-based (précis) | Coordonnées (approximatif) |
| **Usage contexte** | Faible | Élevé (images) |
| **Debugging** | Excellent | Visuel mais lourd |

### Recommandation

**Utiliser Playwright MCP pour** :
- Tests automatisés
- Scraping de données
- Interactions complexes
- CI/CD integration

**Utiliser Chrome Natif pour** :
- Debugging visuel
- Validation UI design
- Démonstrations
- Cas où screenshots nécessaires

### Configuration Playwright

**Installation** :
```bash
npm install -g playwright-mcp
```

**Dans CLAUDE.md** :
```markdown
## Browser Testing Guidelines

Pour interactions browser :
1. **Toujours** utiliser Playwright MCP par défaut
2. Utiliser `read_page` pour obtenir refs depuis accessibility tree
3. Cliquer en utilisant `ref`, jamais coordonnées
4. NE PAS prendre de screenshots sauf si explicitement demandé
5. Utiliser Chrome natif seulement pour validation visuelle
```

---

## 📂 Recherche dans l'Historique

### Localisation des Conversations

**Chemin** : `~/.claude/projects/`

**Format** : Fichiers `.jsonl` (JSON Lines)

### Techniques de Recherche

#### 1. Recherche par Mot-Clé (grep)

```bash
# Rechercher dans toutes les conversations
grep -r -i "authentication" ~/.claude/projects/

# Lister conversations contenant un terme
grep -l -i "jwt" ~/.claude/projects/**/*.jsonl

# Avec contexte (3 lignes avant/après)
grep -C 3 -i "bug fix" ~/.claude/projects/**/*.jsonl
```

#### 2. Recherche Structurée (jq)

```bash
# Extraire tous les prompts utilisateur
jq -r 'select(.role == "user") | .content' conversation.jsonl

# Trouver messages contenant du code
jq -r 'select(.content | contains("```")) | .content' conversation.jsonl

# Extraire erreurs
jq -r 'select(.content | contains("error") or contains("Error")) | {timestamp: .timestamp, content: .content}' conversation.jsonl

# Statistiques de conversation
jq -s 'length' conversation.jsonl  # Nombre de messages
```

#### 3. Script de Recherche Personnalisé

**Fichier** : `~/bin/claude-search`

```bash
#!/bin/bash

QUERY="$1"
CLAUDE_DIR="$HOME/.claude/projects"

if [ -z "$QUERY" ]; then
    echo "Usage: claude-search <query>"
    exit 1
fi

echo "🔍 Recherche de: $QUERY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Rechercher et afficher avec contexte
find "$CLAUDE_DIR" -name "*.jsonl" -type f | while read file; do
    if grep -q -i "$QUERY" "$file"; then
        PROJECT=$(basename $(dirname "$file"))
        echo ""
        echo "📁 Projet: $PROJECT"
        echo "📄 Fichier: $(basename $file)"

        # Extraire contexte avec jq si JSON valide
        jq -r "select(.content | ascii_downcase | contains(\"${QUERY,,}\")) | \"  → [\(.timestamp // \"no-time\")]: \(.content[0:200])...\"" "$file" 2>/dev/null || \
        grep -i -C 2 "$QUERY" "$file" | head -10
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

**Utilisation** :
```bash
chmod +x ~/bin/claude-search
claude-search "authentication bug"
```

#### 4. Demander à Claude

```
"Recherche dans mon historique de conversations les discussions
sur l'implémentation de l'authentification JWT.
Dossier: ~/.claude/projects/"
```

---

## 🎛️ Configuration Avancée

### Status Line Personnalisée

**Script** : `~/.claude/status-line.sh`

```bash
#!/bin/bash

# Couleurs (10 thèmes disponibles - ajuster selon préférence)
COLOR_MODEL="\033[1;36m"      # Cyan
COLOR_DIR="\033[1;33m"        # Jaune
COLOR_GIT="\033[1;35m"        # Magenta
COLOR_FILES="\033[1;32m"      # Vert
COLOR_SYNC="\033[1;34m"       # Bleu
COLOR_TOKENS="\033[1;31m"     # Rouge
COLOR_RESET="\033[0m"

# Récupérer infos
MODEL=$(claude --version 2>/dev/null | head -1)
DIR=$(pwd | sed "s|$HOME|~|")
GIT_BRANCH=$(git branch --show-current 2>/dev/null || echo "no-git")
UNCOMMITTED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
SYNC_STATUS=$(git status --short --branch 2>/dev/null | grep -q "ahead\|behind" && echo "⚠" || echo "✓")

# Token usage (nécessite intégration API ou parsing)
TOKEN_USAGE="--"  # Placeholder

# Afficher status line
echo -e "${COLOR_MODEL}Model: ${MODEL}${COLOR_RESET} | ${COLOR_DIR}${DIR}${COLOR_RESET} | ${COLOR_GIT}⎇ ${GIT_BRANCH}${COLOR_RESET} | ${COLOR_FILES}📝 ${UNCOMMITTED}${COLOR_RESET} | ${COLOR_SYNC}${SYNC_STATUS}${COLOR_RESET} | ${COLOR_TOKENS}🎫 ${TOKEN_USAGE}${COLOR_RESET}"
```

**Intégration** :

```bash
# Ajout à ~/.zshrc ou ~/.bashrc
precmd() {
    ~/.claude/status-line.sh
}
```

### Désactiver Attribution Git

**Problème** : Les commits/PRs incluent "Co-Authored-By: Claude"

**Solution** : `~/.claude/settings.json`

```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

**Alternative** : Garder attribution mais personnaliser :

```json
{
  "attribution": {
    "commit": "Co-Authored-By: AI Assistant <noreply@anthropic.com>",
    "pr": "🤖 Generated with assistance from Claude Code"
  }
}
```

---

## 💡 Skills vs CLAUDE.md

### Différence Fondamentale

| Aspect | Skills | CLAUDE.md |
|--------|--------|-----------|
| **Chargement** | À la demande (via `/skill`) | Chaque conversation |
| **Impact tokens** | Seulement quand invoqué | Toujours présent |
| **Use case** | Capacités spécialisées | Instructions générales |
| **Partage** | Portable, réutilisable | Spécifique au projet |

### Quand Utiliser Skills

**Utiliser Skills pour** :
- Fonctionnalités rarement utilisées
- Workflows complexes spécifiques
- Intégrations externes (APIs, services)
- Fallbacks pour capacités limitées

**Exemple** : Gemini CLI Fallback

**Fichier** : `~/.claude/commands/gemini-fallback.md`

```markdown
---
description: Utiliser Gemini pour sites inaccessibles (Reddit, etc.)
---

Pour les sites bloquant Claude (Reddit, certains forums) :

1. Utiliser Gemini CLI :
   ```bash
   gemini "résume ce thread Reddit: [URL]"
   ```

2. Gemini accède au contenu
3. Retourner résumé à l'utilisateur
4. Continuer workflow normal

**Sites supportés** :
- Reddit
- Certains forums
- Sites avec anti-bot agressif
```

### Quand Utiliser CLAUDE.md

**Utiliser CLAUDE.md pour** :
- Conventions de code du projet
- Architecture et patterns
- Contraintes métier
- Instructions toujours applicables

**Règle d'or** : Si utilisé dans >50% des conversations → CLAUDE.md. Sinon → Skill.

---

## 🚀 Techniques d'Extraction d'Output

### 1. Commande `/copy`

```bash
/copy
```
→ Copie dernière réponse en markdown

### 2. Redirection vers Fichier

```
"Écris la réponse complète dans output.md et ouvre-le dans VS Code"
```

**Claude exécute** :
```bash
cat > output.md << 'EOF'
[contenu]
EOF
code output.md
```

### 3. pbcopy (macOS)

```
"Génère le code et copie-le dans le clipboard avec pbcopy"
```

**Workflow** :
```bash
echo "[code]" | pbcopy
```

### 4. Ouvrir URLs

```
"Trouve la documentation de cette API et ouvre-la dans mon navigateur"
```

**Claude peut exécuter** :
```bash
open https://api-docs-url.com
# ou
xdg-open https://... # Linux
```

### 5. Partage de Code

**Script** : `~/bin/share-code`

```bash
#!/bin/bash

# Copier et uploader code
CONTENT="$1"
echo "$CONTENT" | pbcopy
echo "✅ Copié dans clipboard"

# Optionnel: upload vers gist
if [ "$2" == "--gist" ]; then
    gh gist create --public - <<< "$CONTENT"
fi
```

---

## 📋 Checklist de Setup Optimal

### Configuration Initiale

- [ ] Installer outils voix (Superwhisper/MacWhisper)
- [ ] Configurer aliases shell (`~/.zshrc`)
- [ ] Setup tmux pour tests autonomes
- [ ] Installer Playwright MCP
- [ ] Créer script status line
- [ ] Désactiver auto-compact
- [ ] Configurer attribution git
- [ ] Créer dossier handoff documents
- [ ] Setup script de recherche historique
- [ ] Installer dx plugin

### Workflow Quotidien

- [ ] Vérifier `/usage` avant tâches coûteuses
- [ ] Utiliser voix pour prompts longs
- [ ] Créer handoff avant `/clear`
- [ ] Tester avec tmux pour autonomie
- [ ] Privilégier Playwright sur Chrome
- [ ] Backup conversations importantes
- [ ] Review stats avec `/stats`

### Maintenance Hebdomadaire

- [ ] Nettoyer CLAUDE.md (supprimer obsolète)
- [ ] Convertir instructions répétées en skills
- [ ] Review et améliorer aliases
- [ ] Backup `~/.claude/`
- [ ] Analyser patterns d'usage dans `/stats`

---

## 🎯 Patterns de Productivité

### Pattern 1 : Voice → Plan → Execute

```
1. Dicter intention (voix)
   ↓
2. /plan avec contexte complet
   ↓
3. Clear + auto-accept
   ↓
4. Exécution avec contexte frais
```

**Gain** : 70% temps économisé, meilleure qualité.

### Pattern 2 : Test Loop Autonome

```
1. Écrire feature
   ↓
2. Écrire tests
   ↓
3. Lancer tests dans tmux
   ↓
4. Claude analyse échecs
   ↓
5. Claude corrige automatiquement
   ↓
6. Répéter jusqu'à succès
```

**Gain** : Développement sans interruption.

### Pattern 3 : Fresh Context Cadence

```
0-40%: Travail normal
  ↓
40-60%: Checkpoint (documenter décisions)
  ↓
60-70%: Créer handoff
  ↓
70%: /clear + nouvelle session avec handoff
```

**Gain** : Qualité constante, pas de dégradation.

### Pattern 4 : Browser Testing Workflow

```
1. Développer feature UI
   ↓
2. Tester avec Playwright MCP (fonctionnel)
   ↓
3. Si OK: Chrome natif (validation visuelle)
   ↓
4. Screenshot pour documentation
```

**Gain** : Tests fiables + validation visuelle au bon moment.

---

## 🔗 Ressources Complémentaires

### GitHub Repos

- **claude-code-tips** : https://github.com/ykdojo/claude-code-tips
- **superpowers** : https://github.com/obra/superpowers
- **Super Voice Assistant** : https://github.com/k-m-jin/super-voice-assistant

### Outils Externes

- **Superwhisper** : https://superwhisper.com/
- **MacWhisper** : https://goodsnooze.gumroad.com/l/macwhisper
- **Playwright** : https://playwright.dev/

### Communauté

- **Skool Community** : https://www.skool.com/the-agentic-lab-6743
- **Claude Skills Library** : https://mcpservers.org/claude-skills
- **Skills Marketplace** : https://skillsmp.com/

---

## 📊 Récapitulatif par Impact

### 🔥 Maximum Impact

1. **Intégration voix** - Réduction 70% temps de prompting
2. **Fresh context cadence** - Qualité constante
3. **Handoff documents** - Continuité parfaite
4. **Test autonome tmux** - Développement sans friction
5. **Playwright MCP** - Tests fiables

### ⚡ High Impact

1. **Aliases terminaux** - Accès instant
2. **Status line** - Visibilité constante
3. **`/copy` et extraction** - Workflow fluide
4. **Recherche historique** - Apprentissage rapide
5. **Skills token-efficient** - Optimisation ressources

### 💎 Nice to Have

1. **Configuration attribution** - Personnalisation
2. **Script backup** - Sécurité
3. **Custom themes** - Esthétique
4. **Gemini fallback** - Cas edge

---

*Astuces mises à jour : Février 2026*
