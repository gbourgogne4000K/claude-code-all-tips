# Fonctionnalités

## Outils disponibles

### Outils de fichiers
- **Read** - Lecture de fichiers
- **Write** - Création de fichiers
- **Edit** - Modification de fichiers
- **Glob** - Recherche de fichiers par pattern
- **Grep** - Recherche de contenu

### Outils d'exécution
- **Bash** - Exécution de commandes shell
- **Task** - Lancement d'agents spécialisés

### Outils web
- **WebSearch** - Recherche sur le web
- **WebFetch** - Récupération de contenu web

### Outils interactifs
- **AskUserQuestion** - Poser des questions à l'utilisateur
- **TodoWrite** - Gestion de tâches

## Agents spécialisés

### Agent Bash
Spécialisé dans l'exécution de commandes terminal.

### Agent Explore
Exploration rapide du codebase avec différents niveaux de profondeur :
- `quick` - Recherche basique
- `medium` - Exploration modérée
- `very thorough` - Analyse complète

### Agent Plan
Conception de plans d'implémentation avec considérations architecturales.

### Autres agents
[À documenter selon vos découvertes]

## Mode Plan

### Quand utiliser EnterPlanMode
- Nouvelles fonctionnalités importantes
- Plusieurs approches possibles
- Modifications architecturales
- Tâches multi-fichiers
- Requis incertains

### Workflow en mode Plan
1. Exploration du codebase
2. Conception de l'approche
3. Présentation au user
4. Validation avec ExitPlanMode

## Gestion des tâches

### TodoWrite
- Planification des tâches
- Suivi de progression
- États: `pending`, `in_progress`, `completed`
- Une seule tâche `in_progress` à la fois

## Prochaines étapes

Consultez les [exemples pratiques](../exemples/README.md) pour voir ces fonctionnalités en action.
