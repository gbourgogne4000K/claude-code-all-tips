# Dépannage

## Problèmes courants

### Installation

#### Erreur: "Command not found"
**Cause**: Claude Code n'est pas dans le PATH
**Solution**:
```bash
# Vérifier l'installation
npm list -g @anthropic-ai/claude-code

# Réinstaller si nécessaire
npm install -g @anthropic-ai/claude-code
```

#### Problème de permissions
[À compléter]

### Configuration

#### Clé API invalide
**Symptôme**: Erreur d'authentification
**Solution**:
```bash
# Reconfigurer la clé API
claude-code config set api-key YOUR_NEW_API_KEY
```

#### Hooks bloqués
**Symptôme**: Actions bloquées par les hooks
**Solution**:
- Vérifier la configuration dans `~/.claude/`
- Ajuster les commandes de hook
- Demander à l'utilisateur de vérifier les hooks

### Utilisation

#### Timeout des commandes
**Cause**: Commande trop longue
**Solution**: Utiliser `timeout` parameter ou `run_in_background`

#### Fichier non trouvé
**Cause**: Chemin relatif au lieu d'absolu
**Solution**: Toujours utiliser des chemins absolus avec les outils

#### Context trop large
**Cause**: Lecture de fichiers trop volumineux
**Solution**: Utiliser `limit` et `offset` avec Read

## Messages d'erreur

### Git related

#### "No changes to commit"
**Solution**: Vérifier qu'il y a bien des modifications avec `git status`

#### "Pre-commit hook failed"
**Solution**:
- Corriger le problème signalé
- Créer un NOUVEAU commit (pas --amend)

### Tool related

#### "File not read before edit"
**Solution**: Toujours Read avant Edit/Write

#### "old_string not unique"
**Solution**: Fournir plus de contexte dans old_string ou utiliser replace_all

## FAQ

### Général

**Q: Comment obtenir de l'aide ?**
A: Utilisez `/help` ou visitez https://github.com/anthropics/claude-code/issues

**Q: Puis-je utiliser Claude Code sans connexion internet ?**
A: Non, Claude Code nécessite une connexion pour communiquer avec l'API

### Performance

**Q: Comment accélérer les recherches ?**
A: Utilisez l'agent Explore avec niveau `quick` pour des recherches rapides

**Q: Quel modèle choisir ?**
A:
- `haiku` - Tâches simples et rapides
- `sonnet` - Usage général (par défaut)
- `opus` - Tâches complexes

### Sécurité

**Q: Claude peut-il exécuter des commandes dangereuses ?**
A: Claude a des protections mais demande toujours confirmation pour les commandes destructives

**Q: Comment éviter de commiter des secrets ?**
A: Claude évite de stage des fichiers comme .env, mais restez vigilant

## Ressources supplémentaires

- Documentation officielle: [À ajouter]
- GitHub Issues: https://github.com/anthropics/claude-code/issues
- Community: [À ajouter]

## Contribuer au guide

Vous avez trouvé un problème non documenté ? Contribuez à ce guide !
