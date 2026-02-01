# Projet : [NOM DU PROJET]

## Vue d'Ensemble
[2-3 phrases décrivant le projet]

## Stack Technique
- Langage : [ex: TypeScript 5.3]
- Framework : [ex: Next.js 14]
- Base de données : [ex: PostgreSQL + Prisma]
- Tests : [ex: Jest + React Testing Library]

## Commandes Clés
- `npm run dev` - Démarrer serveur de développement
- `npm run build` - Build de production
- `npm run test` - Lancer les tests
- `npm run lint` - Lancer le linter

## Structure du Projet
```
src/
├── app/          # Next.js app router
├── components/   # Composants React
├── lib/          # Utilitaires et helpers
├── hooks/        # Hooks React personnalisés
└── types/        # Types TypeScript
```

## Standards de Codage
- Utiliser composants fonctionnels avec hooks
- Préférer exports nommés aux exports par défaut
- Un composant par fichier
- Tests dans répertoires `__tests__/`

## Patterns Importants
- Gestion d'état : [décrire pattern]
- Appels API : [décrire pattern]
- Gestion d'erreurs : [décrire pattern]

## NE PAS
- Modifier les fichiers dans `node_modules/`
- Commiter directement sur main
- Sauter les tests pour nouvelles features

## Règles des Sous-Agents
- Toujours utiliser Opus pour les sous-agents
- Annoncer avant de spawner des sous-agents
- Résumer les résultats des sous-agents de manière concise

## Gestion du Contexte
- Avertir quand le contexte dépasse 60%
- Inclure "Context : X%" dans les réponses quand >50%
- Jamais auto-compacter sans demander
