# Référence Rapide Claude Code

## Raccourcis Clavier

| Raccourci | Action |
|-----------|--------|
| `Escape` | Interrompre l'opération en cours |
| `Escape Escape` | Ouvrir Rewind (voyage dans le temps) |
| `Shift + Tab` | Basculer Mode Plan / Auto-accept |
| `Ctrl + C` | Quitter Claude Code |
| `↑` / `↓` | Naviguer dans l'historique des prompts |

## Commandes Essentielles

| Commande | But | Quand Utiliser |
|----------|-----|----------------|
| `/clear` | Effacer la conversation | Nouvelle tâche, contexte surchargé |
| `/compact` | Résumer le contexte | Approche des 70% d'usage |
| `/context` | Afficher l'usage du contexte | Surveillance régulière |
| `/rewind` | Interface de voyage temporel | Erreur commise, vouloir annuler |
| `/help` | Lister toutes les commandes | Oubli des noms de commande |
| `/model` | Changer de modèle | Optimisation coût, besoins de capacité |
| `/agents` | Gérer les sous-agents | Configurer agents personnalisés |
| `/permissions` | Voir/éditer permissions | Résolution de problèmes d'accès |
| `/hooks` | Gérer les hooks | Réviser/mettre à jour règles de sécurité |

## Seuils de Gestion du Contexte

| Context % | Status | Action |
|-----------|--------|--------|
| 0-40% | 🟢 Sain | Travailler librement |
| 40-60% | 🟡 Surveiller | Être sélectif sur nouveaux fichiers |
| 60-80% | 🟠 Attention | Considérer compaction |
| 80-95% | 🔴 Critique | /clear ou /compact ciblé |
| 95-100% | ⛔ Danger | Auto-compact se déclenche (incontrôlé) |

## Guide de Sélection de Modèle

| Modèle | Idéal Pour | Coût | Vitesse |
|--------|------------|------|---------|
| Opus 4.5 | Architecture, raisonnement complexe, code critique | $$$ | Lent |
| Sonnet 4.5 | La plupart des tâches de codage, équilibré | $$ | Moyen |
| Haiku 4.5 | Requêtes rapides, tâches simples, exploration | $ | Rapide |

## Emplacements de Fichiers

| Chemin | But |
|--------|-----|
| `~/.claude/CLAUDE.md` | Instructions globales |
| `~/.claude/settings.json` | Paramètres globaux, hooks |
| `~/.claude/commands/` | Slash commands personnels |
| `~/.claude/agents/` | Sous-agents personnalisés |
| `.claude/CLAUDE.md` | Instructions projet (équipe) |
| `.claude/settings.json` | Paramètres projet (équipe) |
| `.claude/settings.local.json` | Paramètres projet locaux (gitignored) |
| `.claude/commands/` | Slash commands de projet |
| `.claude/agents/` | Sous-agents de projet |

## Checklist des Hooks de Sécurité

| Type de Hook | Usage Recommandé |
|--------------|------------------|
| `PreToolUse:Bash` | Bloquer commandes dangereuses |
| `PreToolUse:Write` | Protéger fichiers sensibles |
| `PostToolUse:Write(*.py)` | Auto-formater Python |
| `PostToolUse:Write(*.ts)` | Auto-formater + vérif types |
| `PostToolUse:Edit` | Lancer linters |
| `Stop` | Logger résumé de session |

## Checklist Qualité des Prompts

Avant d'envoyer un prompt, vérifier :

- [ ] **Objectif spécifique** : Que doit-il se passer exactement ?
- [ ] **Contexte fourni** : Quels fichiers/infos Claude a-t-il besoin ?
- [ ] **Contraintes explicites** : Qu'est-ce qui doit/ne doit pas arriver ?
- [ ] **Critères de succès définis** : Comment sais-je que c'est fini ?
- [ ] **Exemples donnés** : Pour patterns complexes, montrer ne pas juste dire

## Diagramme de Récupération d'Erreur

```
Problème Détecté
      │
      ▼
 Petit/Local ? ────Oui────▶ Escape Escape (Rewind)
      │                          │
      Non                   Choisir point de restauration
      │                          │
      ▼                          ▼
 Code cassé ? ────Oui────▶ git checkout / git stash
      │
      Non
      │
      ▼
 Context rot ? ────Oui────▶ /clear + redémarrer avec notes
      │
      Non
      │
      ▼
 Logger dans journal d'erreurs pour analyse de patterns
```

## Formules Rapides

### Safe YOLO Mode
```bash
alias claude-yolo="claude --dangerously-skip-permissions"
```

### Vérification Rapide du Contexte
```
Utilisateur : Quel est mon usage de contexte actuel ?
```

### Compaction d'Urgence
```
Utilisateur : /compact en préservant [éléments critiques]
```

### Reset Complet
```
Utilisateur : /clear
# Puis : résumer l'état actuel en 3 points
```

## Patterns d'Usage Courants

### Début de Tâche Complexe
1. `/clear` pour contexte frais
2. Charger fichiers pertinents avec @mentions
3. Déclarer contraintes et objectifs explicitement
4. Utiliser `/help` si besoin de commandes spéciales

### Mi-Projet (50-70% contexte)
1. Vérifier usage : "quel est mon usage de contexte ?"
2. Si >60% : documenter décisions clés dans CLAUDE.md
3. Considérer `/compact` avec règles de préservation
4. Ou `/clear` et redémarrer avec contexte essentiel

### Debugging
1. `/investigate [description-problème]` (si command créé)
2. Ou : lire fichiers pertinents, tracer le problème
3. Utiliser `git blame` pour historique
4. Logger la solution dans journal d'erreurs

### Fin de Session
1. Commit des changements avec `/commit`
2. Créer PR si nécessaire avec `/pr`
3. Les hooks de session loggent automatiquement
4. Réviser session-logs pour apprendre

## Anti-Patterns à Éviter

❌ **Ne pas** laisser le contexte atteindre 90%+ sans action
❌ **Ne pas** répéter les mêmes erreurs sans les logger
❌ **Ne pas** utiliser auto-compact sans contrôle
❌ **Ne pas** oublier de tester avant de commiter
❌ **Ne pas** sur-ingénier (YAGNI)

## Ressources Complémentaires

- [Patterns Avancés](../patterns-avances/README.md) - Guide complet des 6 patterns
- [Configuration](../configuration/README.md) - Configuration hooks et settings
- [Exemples](../exemples/README.md) - Cas d'usage concrets
- [Troubleshooting](../troubleshooting/README.md) - Solutions aux problèmes courants
