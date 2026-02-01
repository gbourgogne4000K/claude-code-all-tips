# 50 Bonnes Pratiques Claude Code

> Guide complet des pratiques essentielles pour maîtriser Claude Code

---

## 🌟 Les Conseils de Boris (Créateur de Claude Code)

> Directement du créateur de Claude Code, voici 10 conseils pratiques pour maximiser votre productivité

### 10. Faites Plus en Parallèle
**Conseil** : Utilisez les git worktrees pour lancer plusieurs sessions Claude en parallèle.

**Mise en pratique** :
```bash
# Créer des worktrees pour différentes tâches
git worktree add ../project-feature-a feature-a
git worktree add ../project-bugfix bugfix-branch

# Lancer Claude dans chaque worktree
# Terminal 1: cd ../project-feature-a && claude
# Terminal 2: cd ../project-bugfix && claude
```

**Bénéfices** :
- Travaillez sur plusieurs features simultanément
- Pas de conflit entre contextes différents
- Isolation parfaite des sessions
- Gardez le contexte intact pour chaque tâche

### 9. Commencez Chaque Tâche Complexe en Mode Plan
**Conseil** : Pour toute tâche non triviale, entrez TOUJOURS en mode Plan d'abord.

**Pourquoi** :
- Évite les erreurs coûteuses
- Clarifie l'approche avant l'exécution
- Permet de valider avec l'utilisateur
- Réduit le risque de refaire le travail

**Pattern** :
```
Tâche complexe → Mode Plan → Validation → Exécution
```

**Ne pas faire** : Sauter directement dans le code pour des tâches avec plusieurs solutions possibles.

### 8. Investissez dans CLAUDE.md
**Conseil** : Traitez votre CLAUDE.md comme une documentation vivante de votre projet.

**Ce qu'il devrait contenir** :
- Stack technique
- Conventions de code
- Patterns spécifiques au projet
- Contraintes et règles métier
- Structure du projet
- Liste "NE PAS FAIRE"

**Règle d'or** : Si vous répétez la même instruction 3+ fois, ajoutez-la à CLAUDE.md.

**Voir** : [Template CLAUDE.md](../templates/CLAUDE.md)

### 7. Créez des Skills et Committez-les dans Git
**Conseil** : Versionnez vos skills personnalisés dans votre repo.

**Structure recommandée** :
```
.claude/
├── commands/
│   ├── commit.md
│   ├── test.md
│   └── deploy.md
└── CLAUDE.md
```

**Avantages** :
- Partage avec l'équipe
- Historique des modifications
- Backup automatique
- Cohérence entre environnements

### 6. Claude Corrige les Bugs Tout Seul
**Conseil** : Configurez Claude pour détecter et corriger automatiquement les erreurs courantes.

**Setup** : Utilisez des hooks pour que Claude lance les tests après chaque modification.

**Exemple de hook** :
```bash
#!/bin/bash
# post-edit.sh - Lance tests après édition
npm test || {
    echo "Tests failed - Claude will fix automatically"
    # Hook peut bloquer ou laisser Claude corriger
}
```

**Impact** : Réduction drastique du temps de debugging.

### 5. Montez en Niveau votre Prompting
**Conseil** : La qualité de vos prompts détermine la qualité des résultats.

**Framework à appliquer** :
1. **[Rôle]** : Définir l'expertise nécessaire
2. **[Tâche]** : Objectif précis et mesurable
3. **[Contexte]** : Toutes les informations pertinentes
4. **[Vérification]** : Comment mesurer le succès

**Ressources** :
- Pratique 47-50 de ce guide
- [Patterns Avancés - Prompt Engineering](../patterns-avances/README.md#8-prompt-engineering-amélioré)

### 4. Setup Terminal et Environnement
**Conseil** : Optimisez votre environnement de développement pour Claude.

**Checklist** :
- [ ] Aliases configurés pour commandes fréquentes
- [ ] Shell personnalisé (zsh/bash avec plugins)
- [ ] Variables d'environnement pour chemins communs
- [ ] Scripts d'automatisation placés dans PATH
- [ ] Intégration IDE configurée

**Exemple ~/.zshrc** :
```bash
# Aliases Claude-friendly
alias cc="claude"
alias ccp="claude --dangerously-skip-permissions"
alias ccplan="echo 'Entering Plan Mode' && claude"

# Fonctions utiles
claude-log() {
    claude /log_success "$1"
}
```

### 3. Utilisez les Sous-Agents
**Conseil** : Déléguez les tâches isolées à des sous-agents spécialisés.

**Quand utiliser** :
- Exploration de codebase large
- Tâches répétitives
- Génération de documentation
- Analyse de sécurité
- Écriture de tests

**Avantages** :
- Préserve votre contexte principal
- Parallélisation des tâches
- Spécialisation par domaine

**Voir** : [Patterns Avancés - Contrôle des Sous-Agents](../patterns-avances/README.md#5-contrôle-des-sous-agents)

### 2. Utilisez Claude pour Data et Analytics
**Conseil** : Claude excelle dans l'analyse de données et la génération de rapports.

**Use cases** :
- Analyser des logs d'application
- Générer des métriques de code
- Créer des dashboards
- Extraire insights de datasets
- Transformer et nettoyer des données

**Exemple** :
```
"Analyse les logs d'erreur dans @logs/app.log des 7 derniers jours.
Groupe par type d'erreur et génère un rapport avec :
- Top 5 erreurs les plus fréquentes
- Timeline de leur apparition
- Suggestions de fixes prioritaires"
```

### 1. Apprenez AVEC Claude
**Conseil** : Utilisez Claude comme tuteur personnel pour apprendre de nouvelles technologies.

**Méthode** :
```
"Je veux apprendre [technologie].
Crée-moi un curriculum personnalisé avec :
1. Concepts fondamentaux
2. Exercices pratiques progressifs
3. Projets réels à construire
4. Ressources recommandées

Ensuite, guide-moi étape par étape avec feedback sur mon code."
```

**Domaines efficaces** :
- Nouveaux langages de programmation
- Frameworks et librairies
- Patterns architecturaux
- Concepts algorithmiques
- Best practices sectorielles

---

## 📝 Cadrage de Tâches et Prompting (50-43)

### 50. Cadrage Clair des Tâches
**Principe** : Indiquez exactement ce que vous voulez que Claude fasse avant toute autre chose.

**Exemple** :
```
❌ Mauvais : "J'ai un problème avec mon auth, regarde le code et dis-moi ce qui ne va pas"

✅ Bon : "Tâche : Identifier pourquoi l'authentification JWT échoue lors du refresh token.
Fichiers concernés : src/auth/jwt.ts, src/middleware/auth.ts
Erreur observée : 'Invalid token' après 15 minutes"
```

### 49. Instructions au Début
**Principe** : Toujours placer l'instruction la plus importante tout en haut du prompt.

**Structure recommandée** :
```
[INSTRUCTION CRITIQUE]

[Contexte]
[Détails]
[Contraintes]
```

### 48. Moyens de Vérification
**Principe** : Incluez tests, captures d'écran, ou outputs attendus pour que Claude puisse se vérifier.

**Impact** : C'est le levier le plus puissant pour améliorer la qualité.

**Exemples** :
```markdown
Tâche : Implémenter la fonction calculateDiscount

Critères de vérification :
- [ ] calculateDiscount(100, 0.1) retourne 90
- [ ] calculateDiscount(0, 0.5) retourne 0
- [ ] calculateDiscount(-10, 0.2) lance une erreur
- [ ] Les tests unitaires passent : npm test
```

### 47. Structure de Prompt Recommandée
**Formule** : `[Rôle] + [Tâche] + [Contexte]`

**Template** :
```markdown
# Rôle
Tu es un expert en sécurité web spécialisé en authentification JWT.

# Tâche
Audite le système d'authentification pour identifier les vulnérabilités potentielles.

# Contexte
- Stack : Node.js + Express + JWT
- Fichiers : src/auth/*.ts
- Préoccupation : Tokens ne semblent pas expirer correctement
- Output attendu : Liste de vulnérabilités avec sévérité et recommandations
```

### 46. Extension Chrome pour Vérification UI
**Astuce** : Les changements d'UI peuvent être vérifiés avec l'extension Chrome de Claude.
- Ouvre un navigateur
- Teste l'UI
- Itère jusqu'à ce que le code fonctionne

### 45. Workflow : Explorer → Planifier → Coder
**Process optimal** :
1. **Recherche** : Utiliser autres LLMs si nécessaire pour comprendre le problème
2. **Plan Mode** : Entrer en mode Plan pour concevoir l'approche
3. **Normal Mode** : Retourner en mode normal pour exécuter le code

**Commandes** :
```bash
# Phase 1: Explorer
/explore [zone à investiguer]

# Phase 2: Planifier
# (Entrer en Plan Mode)

# Phase 3: Coder
# (Sortir du Plan Mode et exécuter)
```

### 44. Contexte Spécifique dans les Prompts
**Principe** : Plus vos instructions sont précises, meilleur sera le résultat.

**Exemples** :
```
❌ "Améliore cette fonction"
✅ "Optimise calculateTotal() pour gérer 10,000+ items sans dégradation de performance"

❌ "Ajoute des tests"
✅ "Ajoute des tests Jest couvrant les cas limites (null, undefined, tableaux vides) pour validateEmail()"
```

### 43. Assumer Zéro Contexte
**Principe** : Partez du principe que Claude ne sait rien de votre projet. Dites-lui tout ce qu'il doit savoir.

**Checklist** :
- [ ] Stack technique mentionnée
- [ ] Conventions de code expliquées
- [ ] Contraintes énoncées
- [ ] Objectif clairement défini
- [ ] Fichiers pertinents identifiés

### 42. Contexte Riche avec @
**Astuce** : Utilisez `@` pour lier fichiers, données, et images.

**Exemples** :
```
"Analyse @src/auth/jwt.ts et @src/middleware/auth.ts pour identifier pourquoi..."

"Voici @screenshot.png du bug. Reproduis ce comportement dans @components/Login.tsx"

"Compare @package.json actuel avec @package-old.json pour voir ce qui a changé"
```

### 41. Claude.md avec /init
**Astuce** : Lancez `/init` pour générer un fichier CLAUDE.md de départ pour votre projet actuel.

---

## 📋 Projets et Skills (40-31)

### 40. Instructions au Niveau Projet
**Principe** : Utilisez les instructions projet pour définir comportements long-terme plutôt que répéter les prompts.

**Emplacement** : `.claude/CLAUDE.md` ou `CLAUDE.md`

### 39. Mémoire de Projet
**Astuce** : Éditez l'onglet "Memory" pour contrôler exactement ce que Claude doit retenir ou ignorer.

**Fonctionnement** : Cela fonctionne aussi dans les projets.

### 38. Utiliser les Claude Skills
**Principe** : Transformez workflows répétables en Skills plutôt que re-prompter.

**Avantages** :
- Réutilisabilité
- Cohérence
- Gain de temps

### 37. Skills depuis Exemples
**Méthode** :
1. Collez un excellent output
2. Demandez à Claude de le transformer en Skill réutilisable
3. Vous pouvez même uploader des captures d'écran et demander à Claude de les répliquer

**Exemple** :
```
"Voici un excellent rapport de bug que j'ai écrit manuellement.
Transforme ça en Skill réutilisable que je pourrai utiliser avec /bug-report"
```

### 36. Versioning des Skills
**Pratique** : Dupliquez et versionnez les Skills lors du raffinement plutôt que d'éditer les versions live.

**Structure** :
```
~/.claude/commands/
├── commit-v1.md
├── commit-v2.md (amélioration)
└── commit.md -> commit-v2.md (symlink vers version actuelle)
```

### 35. Hygiène de Projet
**Principe** : Nettoyer régulièrement mémoire, fichiers, et instructions pour éviter la dérive.

**Checklist mensuelle** :
- [ ] Supprimer instructions obsolètes de CLAUDE.md
- [ ] Nettoyer fichiers inutilisés du projet
- [ ] Réviser et compacter la mémoire
- [ ] Mettre à jour les Skills avec améliorations

### 34. Isolation de Projets
**Principe** : Séparez les projets pour flux de travail non liés afin d'éviter le mélange de contexte.

**Organisation** :
```
~/projects/
├── backend-api/        # Projet séparé
│   └── .claude/
├── frontend-app/       # Projet séparé
│   └── .claude/
└── documentation/      # Projet séparé
    └── .claude/
```

### 33. Repo Claude Skills
**Ressource** : Bibliothèque de 80,000+ Claude Skills
- **URL** : https://skillsmp.com/

### 32. Bibliothèque Claude Skills
**Ressource** : Site web avec Skills plug-and-play et plus
- **URL** : https://mcpservers.org/claude-skills

### 31. Stockage Mémoire Projet
**Emplacements possibles** :
- `./CLAUDE.md` (racine du projet)
- `./.claude/CLAUDE.md` (dans dossier .claude)

Les deux fonctionnent, choisissez selon votre préférence d'organisation.

---

## 💡 Astuces Méconnues (30-21)

### 30. Model Stacking
**Stratégie** : Utilisez d'autres LLMs pour planifier vos projets et générer des mega-prompts avancés avant même d'ouvrir Claude Code.

**Avantages** :
- Économise des tokens du Plan Mode
- Combine les forces de différents modèles
- Meilleure planification initiale

**Workflow** :
```
1. GPT-4 ou autre LLM → Planification initiale
2. Claude Code Plan Mode → Raffinement du plan
3. Claude Code → Exécution
```

### 29. Créer des Sous-Agents Personnalisés
**Emplacement** : Définissez assistants spécialisés dans `.claude/agents/`

**Utilisation** : Claude peut déléguer des tâches isolées à ces agents.

**Voir** : [Section Patterns Avancés - Sous-Agents](../patterns-avances/README.md#5-contrôle-des-sous-agents)

### 28. Notation des Outputs
**Technique** : Demandez à Claude de noter sa réponse selon vos critères de succès pré-définis.

**Exemple** :
```markdown
Après avoir généré le code, note ta solution sur 10 selon ces critères :
- Performance (0-3)
- Lisibilité (0-3)
- Couverture de tests (0-2)
- Respect des conventions (0-2)

Total : X/10
Justification : [explication]
```

### 27. Installer des Plugins
**Commande** : Lancez `/plugin` pour parcourir le marketplace.

**Avantages** : Ajoute skills, outils, et intégrations sans configuration.

### 26. Apprendre Claude Code DANS Claude Code
**Ressource** : Un cours qui enseigne Claude Code directement DANS Claude Code.
- **URL** : https://ccforeveryone.com/

### 25. Interviews par Claude
**Technique** : Pour projets plus larges, laissez Claude vous interviewer d'abord.

**Process** :
1. Commencez avec un prompt minimal
2. Demandez à Claude de vous interviewer avec AskUserQuestion
3. Claude pose questions clarifiantes
4. Vous répondez progressivement
5. Claude construit une compréhension complète

**Exemple de prompt de départ** :
```
"Je veux construire [concept de haut niveau].
Avant de commencer, interviewe-moi pour comprendre exactement ce dont j'ai besoin.
Utilise AskUserQuestion pour poser tes questions une par une."
```

### 24. Corriger Souvent
**Principe** : Corrigez le cap de Claude souvent. Dès qu'il commence à dériver, arrêtez.

**Actions** :
- `ESC` pour arrêter Claude mid-action
- Rediriger immédiatement
- Ne pas laisser dériver

### 23. Commande Clear
**Usage** : Lancez `/clear` pour démarrer une session propre.

**Quand l'utiliser** :
- Changement de tâche complètement différente
- Contexte devient confus
- Trop d'informations obsolètes

### 22. Rewind
**Raccourci** : Double-tap `ESC` ou `/rewind` pour ouvrir le menu checkpoint.

**Utilité** : Retour dans le temps vers n'importe quel état précédent.

### 21. Sessions Multiples Parallèles
**Deux approches** :

#### Claude Desktop
- Gérer plusieurs sessions locales visuellement
- Chaque session obtient son propre worktree isolé

#### Claude Web
- Lance sur infrastructure cloud sécurisée d'Anthropic
- VMs isolées

---

## 🐛 Debugging et Gestion d'Erreurs (20-11)

### 20. Isolation d'Étape
**Principe** : Re-lancez uniquement l'étape cassée au lieu de tout régénérer.

**Exemple** :
```
"L'étape 3 (génération de tests) a échoué.
Relance UNIQUEMENT l'étape 3, en gardant les étapes 1 et 2 inchangées."
```

### 19. Reproduction d'Erreur
**Technique** : Demandez à Claude de reproduire intentionnellement l'échec pour le comprendre.

**Exemple** :
```
"Reproduis l'erreur 'undefined is not a function' que j'ai vue.
Identifie la ligne exacte et la cause racine."
```

### 18. Rollback de Prompts
**Méthode** : Revenez au dernier prompt qui fonctionnait et réappliquez les changements un par un.

**Workflow** :
1. `/rewind` vers état fonctionnel
2. Réappliquer changement 1
3. Tester
4. Réappliquer changement 2
5. Tester
6. Identifier quel changement cause le problème

### 17. CLAUDE.md Sur-Spécifié
**Problème** : Si votre CLAUDE.md est trop long, Claude ignore la moitié car les règles importantes se perdent dans le bruit.

**Solution** : Nettoyez impitoyablement. Si Claude fait déjà quelque chose correctement sans l'instruction, supprimez-la ou convertissez-la en hook.

**Règle d'or** : CLAUDE.md devrait tenir sur 1-2 écrans maximum.

### 16. Erreur de Mélange de Contexte
**Problème** : Vous commencez avec une tâche, puis demandez quelque chose de non lié, puis retournez à la première tâche. Le contexte est plein d'informations non pertinentes.

**Solution** : `/clear` entre tâches non liées.

**Pattern** :
```
Tâche A → /clear → Tâche B → /clear → Retour à Tâche A
```

### 15. Sur-Correction
**Problème** : Claude fait quelque chose de mal, vous corrigez, c'est toujours mal, vous corrigez encore. Le contexte est pollué avec approches échouées.

**Solution** : Après deux corrections échouées, `/clear` et écrivez un meilleur prompt initial incorporant ce que vous avez appris.

**Workflow** :
```
Tentative 1 → Échec
Correction 1 → Échec
→ STOP
→ /clear
→ Nouveau prompt amélioré incorporant les leçons
```

### 14. Replay Étape par Étape
**Technique** : Demandez à Claude de parcourir comment il a généré la réponse ligne par ligne.

**Exemple** :
```
"Explique-moi ligne par ligne comment tu as généré cette fonction.
Pour chaque ligne, dis-moi pourquoi tu as fait ce choix."
```

### 13. Exploration Infinie
**Problème** : Vous demandez à Claude d'"investiguer" quelque chose sans le scoper. Claude lit des centaines de fichiers, remplissant le contexte.

**Solution** : Scopez les investigations étroitement ou utilisez des sous-agents pour que l'exploration ne consomme pas votre contexte principal.

**Exemples** :
```
❌ "Investigate the auth system"
✅ "Investigate only src/auth/jwt.ts - focus on token expiration logic"
✅ "Use a subagent to investigate the entire auth system, then summarize findings"
```

### 12. Projet de Debugging Dédié
**Stratégie** : Créez un projet AI dédié au debugging de code.

**Suggestion** : Grok 4 Heavy est bon pour le debugging.

### 11. Gestion de la Fenêtre de Contexte
**Problème** : La fenêtre de contexte de Claude se remplit rapidement. Claude peut commencer à oublier les instructions précédentes.

**Ressource** : https://code.claude.com/docs/en/costs#reduce-token-usage

**Solutions** :
- Surveiller usage avec `/context`
- Compacter stratégiquement
- Clear régulièrement
- Utiliser sous-agents

---

## 🎯 Conseils Finaux et Ressources (10-1)

### 10. Base de Données Notion
**Astuce** : Connectez votre base de données Notion à Claude pour stocker vos meilleurs prompts les plus utilisés.

**Avantages** :
- Centralisation
- Réutilisabilité
- Versioning
- Partage d'équipe

### 9. Apprendre Claude Code en Action
**Ressource** : Ressources d'apprentissage d'Anthropic
- **URL** : https://www.anthropic.com/learn

### 8. Cours Claude
**Ressource** : Cours depuis Coursera
- **URL** : https://www.anthropic.com/learn

### 7. Setup de Boris
**Ressource** : Comment le créateur de Claude Code maximise Claude Code
- **Titre** : Boris' Claude Code Setup Cheatsheet

### 6. Meilleures Pratiques Claude Code (DOC)
**Ressource** : Lien vers le doc officiel le plus récent
- **URL** : https://code.claude.com/docs/en/best-practices

### 5. Mode Autonome Sécurisé
**Commande** : `claude --dangerously-skip-permissions`

**Usage** : Contourner toutes les vérifications de permissions et laisser Claude travailler sans interruption.

**Idéal pour** :
- Corriger erreurs de lint
- Générer du boilerplate
- Workflows répétitifs

**IMPORTANT** : Utilisez avec hooks de sécurité ! Voir [Patterns Avancés - Hooks](../patterns-avances/README.md#3-hooks-pour-la-sécurité-déterministe)

### 4. Lent et Régulier
**Philosophie** : Prenez votre temps. Surtout si vous construisez un workflow sérieux.

**Mantra** : Planifiez. Planifiez. Planifiez. PUIS, exécutez.

**Anti-pattern** :
```
❌ Démarrer codage immédiatement
✅ Planifier d'abord
✅ Valider l'approche
✅ Puis exécuter
```

### 3. Claude Superpowers
**Ressource** : Un repo GitHub de superpowers Claude Code
- **URL** : https://github.com/obra/superpowers

### 2. Hooks
**Principe** : Idéal pour actions qui doivent arriver à chaque fois avec zéro exception.

**Exemples** :
- Auto-formatage
- Vérification de sécurité
- Logging
- Validation

**Voir** : [Patterns Avancés - Hooks](../patterns-avances/README.md#3-hooks-pour-la-sécurité-déterministe)

### 1. Comment Étendre Claude Code
**Ressource** : Guide officiel d'Anthropic

**Sujets couverts** :
- Créer plugins
- Développer skills
- Configurer hooks
- Intégrations personnalisées

---

## 📊 Récapitulatif par Impact

### 🔥 Impact Maximum (Commencez ici)

1. **Moyens de Vérification (#48)** - Le levier le plus puissant
2. **Instructions au Début (#49)** - Amélioration immédiate
3. **Structure [Rôle + Tâche + Contexte] (#47)** - Prompts cohérents
4. **Corriger Souvent (#24)** - Évite dérive
5. **Clear entre Tâches (#23, #16)** - Contexte propre

### ⚡ Impact Élevé (Apprenez ensuite)

1. **Explorer → Planifier → Coder (#45)** - Workflow optimal
2. **Contexte Riche avec @ (#42)** - Précision maximale
3. **Skills Réutilisables (#38, #37)** - Efficacité long-terme
4. **Sous-Agents (#29)** - Parallélisation
5. **Hooks (#2)** - Automatisation fiable

### 💎 Gemmes Cachées (Expert)

1. **Model Stacking (#30)** - Multi-LLM strategy
2. **Claude Interviews (#25)** - Pour grands projets
3. **Notation des Outputs (#28)** - Auto-vérification
4. **Versioning Skills (#36)** - Évolution contrôlée
5. **Projet Debugging Dédié (#12)** - Spécialisation

---

## 🎓 Checklist de Maîtrise

### Niveau Débutant
- [ ] Utiliser structure [Rôle + Tâche + Contexte]
- [ ] Inclure critères de vérification
- [ ] Instructions importantes au début
- [ ] /clear entre tâches non liées
- [ ] Utiliser @ pour lier fichiers

### Niveau Intermédiaire
- [ ] Créer CLAUDE.md pour projets
- [ ] Développer 3-5 Skills personnalisés
- [ ] Workflow Explorer → Planifier → Coder
- [ ] Gérer contexte activement
- [ ] Corriger Claude dès dérive

### Niveau Avancé
- [ ] Hooks de sécurité configurés
- [ ] Sous-agents personnalisés créés
- [ ] Model Stacking pour projets complexes
- [ ] Versioning de Skills
- [ ] Projet debugging dédié
- [ ] Intégration Notion/outils externes

### Niveau Expert
- [ ] Mode autonome avec hooks
- [ ] Sessions multiples parallèles
- [ ] Plugins personnalisés
- [ ] Contribution au repo Superpowers
- [ ] Mentoring d'autres utilisateurs

---

## 🔗 Ressources Complémentaires

- [Patterns Avancés](../patterns-avances/README.md) - 6 patterns essentiels
- [Référence Rapide](../reference-rapide/README.md) - Aide-mémoire
- [Configuration](../configuration/README.md) - Setup hooks et settings
- [Templates](../templates/CLAUDE.md) - Templates prêts à l'emploi
