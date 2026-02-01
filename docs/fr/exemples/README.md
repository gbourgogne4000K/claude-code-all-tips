# Exemples pratiques

## Cas d'usage courants

### 1. Créer un commit Git

#### Demande simple
```
User: Crée un commit avec mes changements
```

#### Ce que fait Claude
1. Exécute `git status`
2. Exécute `git diff`
3. Analyse les changements
4. Stage les fichiers pertinents
5. Crée un commit avec un message approprié

### 2. Créer une Pull Request

```
User: Crée une PR pour cette feature
```

#### Workflow
1. Analyse l'historique git depuis la divergence
2. Génère titre et description
3. Push vers remote si nécessaire
4. Crée la PR via `gh`

### 3. Recherche dans le codebase

```
User: Où sont gérées les erreurs du client ?
```

#### Approche
- Utilise Task avec agent Explore
- Recherche dans plusieurs fichiers
- Retourne les localisations avec références `file:line`

### 4. Implémentation de fonctionnalité

```
User: Ajoute l'authentification utilisateur
```

#### Process avec EnterPlanMode
1. Entre en mode Plan
2. Explore l'architecture existante
3. Propose une approche
4. Attend validation
5. Implémente selon le plan

### 5. Debug et correction

```
User: Fix le bug dans la fonction checkout
```

#### Workflow
1. Lit le code concerné
2. Identifie le problème
3. Propose une correction
4. Teste si possible

## Best Practices

### Communication efficace
- Soyez spécifique
- Fournissez le contexte
- Mentionnez les contraintes

### Gestion de projets
- Utilisez TodoWrite pour les tâches complexes
- Validez l'approche avant l'implémentation
- Une tâche à la fois en `in_progress`

### Sécurité
- Claude évite les vulnérabilités courantes (XSS, SQL injection, etc.)
- Validez toujours aux frontières du système
- Pas de secrets dans les commits

## Anti-patterns à éviter

### Over-engineering
- Ne pas ajouter de fonctionnalités non demandées
- Garder les solutions simples
- Pas d'abstraction prématurée

### Mauvaise utilisation des outils
- Ne pas utiliser Bash pour lire des fichiers (utiliser Read)
- Ne pas utiliser echo pour communiquer (output directement)
- Préférer les outils spécialisés

## Prochaines étapes

Si vous rencontrez des problèmes, consultez le [guide de dépannage](../troubleshooting/README.md).
