# Appendices - Commandes Complètes

## Appendice A : La Commande /log_error (Complète)

### Fichier : `~/.claude/commands/log_error.md`

```markdown
---
description: Logger une erreur/échec survenu pendant le codage agentique
---

# Log Error

Vous aidez l'utilisateur à logger une erreur/échec qui vient de se produire pendant le codage agentique.

L'objectif PRINCIPAL est d'identifier ce que l'UTILISATEUR a fait de mal dans son prompting, sa gestion de contexte, ou sa configuration de harnais.

Il s'agit de développer la COMPÉTENCE de l'utilisateur, pas de cataloguer les échecs du modèle.

## Philosophie Fondamentale

Les erreurs en codage agentique sont presque toujours traçables à :

### Erreurs de Prompt
- **Instruction ambiguë** - Peut être interprétée de plusieurs façons
- **Contraintes manquantes** - N'a pas spécifié quoi NE PAS faire
- **Trop verbeux** - Exigences clés enterrées dans des murs de texte
- **Référence vs exigences** - A donné du matériel de référence, attendait des exigences extraites
- **Attentes implicites** - Avait des exigences en tête, pas dans le prompt
- **Pas de critères de succès** - N'a pas défini à quoi ressemble "terminé"
- **Mauvais niveau d'abstraction** - Trop haut niveau ou trop détaillé pour la tâche

### Erreurs de Contexte
- **Context rot** - Conversation trop longue, aurait dû /clear
- **Contexte obsolète** - Anciennes informations polluant les nouvelles réponses
- **Débordement de contexte** - Trop d'info a dégradé la performance
- **Contexte manquant** - A supposé que Claude se souvenait de quelque chose qu'il ne savait pas
- **Mauvais contexte** - Informations non pertinentes noyant le signal

### Erreurs de Harnais
- **Perte de contexte du sous-agent** - Info critique n'a pas atteint les sous-agents
- **Mauvais type d'agent** - A utilisé le mauvais agent spécialisé pour la tâche
- **Pas de guardrails** - N'a pas contraint le comportement de l'agent de manière appropriée
- **Parallèle quand séquentiel nécessaire** - A lancé des agents avec des dépendances
- **Séquentiel quand parallèle possible** - Exécution lente due à sérialisation inutile
- **Validation manquante** - Pas de vérification que l'output de l'agent était correct
- **Confiance sans vérification** - A accepté l'output de l'agent sans revue

### Erreurs Meta
- **N'a pas posé de questions clarifiantes** - Aurait pu attraper ça plus tôt
- **Précipitation vers l'implémentation** - A sauté planification/vérification
- **Compétence supposée** - S'attendait à ce que Claude infère trop

Le modèle est la constante. L'input de l'utilisateur est la variable. **Concentrez-vous sur la variable.**

## Répertoire des Logs

Tous les logs sont stockés dans : `/home/[user]/claude_accessible/agentic_practice_logs/`
- Erreurs : `/errors/error-XXX.md`
- Métadonnées (pour suivi des IDs) : `/metadata.json`

## Votre Tâche

1. **Revoyez la conversation** pour identifier ce qui s'est mal passé.

2. **Posez 5-8 questions pointues** focalisées sur le COMPORTEMENT de l'UTILISATEUR :
   - "Votre prompt faisait 4000 mots. Quelles étaient les 3 exigences les plus importantes ?"
   - "Avez-vous spécifié quoi NE PAS faire, ou seulement quoi faire ?"
   - "Quand avez-vous fait /clear pour la dernière fois ? Le contexte était à combien ?"
   - "Avez-vous vérifié que les sous-agents ont reçu le contexte critique ?"
   - "Était-ce du matériel de référence ou des exigences explicites ?"
   - "Quelles contraintes étiez dans votre tête mais pas dans le prompt ?"

3. **Tracez le prompt déclencheur** - Obtenez le prompt EXACT qui a mené à l'échec.

4. **Soyez critique envers l'utilisateur** - Il a demandé cela. Ne pas adoucir.

5. **Loggez l'erreur** avec le template ci-dessous.

## Template de Log

\`\`\`markdown
# Erreur #[ID] : [Nom Descriptif Court]

**Date :** [Date]
**Projet/Contexte :** [Sur quoi travailliez-vous]

## Ce qui s'est Passé
[2-3 phrases - qu'est-ce qui s'est mal passé spécifiquement]

## Catégorie d'Erreur Utilisateur
**Cause primaire :** [Choisissez UNE des catégories ci-dessus]

## Le Prompt Déclencheur
\`\`\`
[Prompt exact - verbatim]
\`\`\`

## Ce qui ne Allait pas Avec ce Prompt
[Soyez spécifique et critique. Qu'aurait dû être différent ?]

## Ce que l'Utilisateur Aurait Dû Dire à la Place
\`\`\`
[Prompt réécrit qui aurait prévenu cette erreur]
\`\`\`

## L'Écart
- **Ce que l'utilisateur attendait :** [Résultat attendu]
- **Ce que l'utilisateur a obtenu :** [Résultat réel]
- **Pourquoi l'écart existe :** [Connexion directe à l'erreur utilisateur ci-dessus]

## Impact
- **Temps perdu :** [X minutes]
- **Retravail requis :** [Qu'est-ce qui doit être refait]

## Prévention - Actions Utilisateur
1. [Action spécifique que l'utilisateur devrait prendre la prochaine fois]
2. [Autre action spécifique]
3. [Considérer ajout au CLAUDE.md personnel ou workflow]

## Vérification de Pattern
- **Vu ça avant ?** [Oui/Non - si oui, c'est une habitude à briser]
- **Prévisible ?** [L'utilisateur aurait-il dû anticiper cela ?]

## Leçon en Une Ligne (pour l'UTILISATEUR)
[Takeaway actionnable sur prompting/contexte/harnais - PAS sur comportement du modèle]

---
*Loggé le [timestamp]*
\`\`\`

## Important

- Soyez CRITIQUE envers l'utilisateur - il logge cela pour apprendre, pas pour se sentir bien
- Focalisez 80% sur erreur utilisateur, 20% sur comportement modèle
- Le but est d'améliorer la COMPÉTENCE de l'utilisateur en codage agentique
- Si l'utilisateur ne peut identifier son erreur, aidez-le à la trouver
- Les logs aseptisés sont inutiles - soyez spécifique et honnête
```

---

## Appendice B : La Commande /log_success (Complète)

### Fichier : `~/.claude/commands/log_success.md`

```markdown
---
description: Logger un succès/victoire survenu pendant le codage agentique
---

# Log Success

Vous aidez l'utilisateur à logger un succès/victoire qui s'est produit pendant le codage agentique.

La plupart des gens sautent cela - ils ne loggent que les échecs. Mais comprendre POURQUOI les choses fonctionnent est aussi important que pourquoi elles échouent.

Capturez ce qui s'est bien passé.

## Répertoire des Logs

Tous les logs sont stockés dans : `/home/[user]/claude_accessible/agentic_practice_logs/`
- Succès : `/successes/success-XXX.md`
- Métadonnées (pour suivi des IDs) : `/metadata.json`

## Votre Tâche

### 1. Revoyez le contexte récent de conversation

Comprenez ce qui s'est notamment bien passé. Cherchez :
- Quelle tâche a été accomplie en douceur
- Quelle approche a été utilisée qui a bien fonctionné
- Moments où quelque chose a juste cliqué
- Complétion inhabituellement rapide
- Succès du premier coup
- Solutions élégantes
- Intervention minimale nécessaire
- Bon usage d'outil/commande

### 2. Posez 4-6 questions clarifiantes

Extrayez POURQUOI ça a fonctionné. Soyez SPÉCIFIQUE à ce qui s'est réellement passé.

**Exemples** :
- "Ce flux d'auth s'est assemblé en moins de 20 minutes. Qu'est-ce qui dans la configuration du prompt l'a rendu si fluide ?"
- "Vous n'avez pas eu à me corriger une seule fois pendant le refactor. Était-ce de la chance ou le contexte dans CLAUDE.md a-t-il aidé ?"
- "La solution que j'ai suggérée était plus propre que ce que vous aviez initialement en tête. Qu'est-ce qui a fait cliquer ?"

**Les questions devraient couvrir** :
- **Qu'est-ce qui s'est spécifiquement bien passé :** Pas générique "ça a marché" mais victoire précise
- **Pourquoi ça a fonctionné :** Les facteurs contribuants
- **La configuration :** Quel contexte/prompt/approche a été utilisé
- **L'ingrédient clé :** Quelle était la chose qui a fait la différence ?
- **Reproductibilité :** Pourriez-vous refaire cela ? Devrait-ce devenir pratique standard ?

### 3. Tracez le prompt déclencheur

Après l'interview, identifiez et citez les prompts EXACTS de l'utilisateur qui ont mené à ce succès.

C'est critique pour comprendre quelle instruction a produit la victoire.

Demandez à l'utilisateur de confirmer ou coller le prompt exact si vous ne le trouvez pas dans le contexte.

### 4. Après avoir obtenu les réponses

Lisez `metadata.json` pour obtenir le prochain ID de succès, puis créez le fichier de log.

### 5. Mettez à jour metadata.json

Avec le compteur incrémenté.

## Template de Log

\`\`\`markdown
# Succès #[ID] : [Nom Descriptif Court]

**Date :** [Date]
**Projet/Contexte :** [Sur quoi travailliez-vous]

## Ce qui s'est Bien Passé
[2-3 phrases - qu'est-ce qui a été notamment réussi]

## Le Prompt Déclencheur
\`\`\`
[Prompt(s) exact(s) qui ont mené au succès - verbatim]
\`\`\`

## Pourquoi Ça a Fonctionné

### Facteurs Contribuants
1. [Facteur spécifique]
2. [Facteur spécifique]
3. [Facteur spécifique]

### L'Ingrédient Clé
[La chose principale qui a fait la différence]

## La Configuration

**Contexte** :
- Pourcentage utilisé : [X]%
- Fichiers pertinents : [liste]
- CLAUDE.md contenait : [éléments clés]

**Approche** :
- [Décrivez la méthode/workflow utilisé]

**Outils/Commandes utilisés** :
- [Liste des outils ou commandes qui ont aidé]

## Peut-on Reproduire ?

- **Était-ce reproductible ?** [Oui/Non/Peut-être]
- **Devrait devenir pratique standard ?** [Oui/Non]
- **Action à prendre** : [Ajouter au CLAUDE.md, créer skill, etc.]

## Métriques de Succès

- **Temps pris** : [X minutes] (comparé à estimation : [Y minutes])
- **Itérations nécessaires** : [X] (habituellement : [Y])
- **Qualité** : [Excellent/Bon/Acceptable]

## Leçon en Une Ligne

[Takeaway actionnable sur ce qui a fait fonctionner ce succès]

---
*Loggé le [timestamp]*
\`\`\`

## Important

- Capturez les DÉTAILS - "ça a marché" n'est pas assez
- Identifiez les patterns de succès, pas juste célébrer
- Le but est de RÉPÉTER le succès, pas juste le noter
- Soyez aussi critique sur les succès que sur les échecs - qu'est-ce qui était vraiment l'ingrédient clé ?
```

---

## Appendice C : Configuration du Dashboard de Monitoring de Sous-Agents

[À venir - Configuration complète du dashboard localhost pour monitoring des sous-agents en temps réel]

---

## Appendice D : Ressources et Communauté

### Ressources Gratuites

**Communauté Skool (GRATUIT)** :
- https://www.skool.com/the-agentic-lab-6743
- Code du dashboard de monitoring
- Code du système Reprompter
- Templates de commandes
- Support communautaire

**YouTube** :
- Tutoriels approfondis
- Cas d'usage réels
- Patterns avancés en vidéo

### Liens de Référence

- [Six Niveaux de Slash Commands](https://www.youtube.com/watch?v=[ID])
- [Context Engineering - La Compétence la Plus Importante](https://www.youtube.com/watch?v=[ID])
- [Context Rot Expliqué](https://www.youtube.com/watch?v=IMWpVV-VtnI)

---

*Appendices mis à jour : Janvier 2026*
