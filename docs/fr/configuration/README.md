# Configuration

## Fichiers de configuration

### Emplacement
- `~/.claude/` - Dossier principal de configuration
- `~/.claude/keybindings.json` - Raccourcis clavier personnalisés

## Raccourcis clavier

### Modification des keybindings
Pour personnaliser vos raccourcis :
```bash
# Utiliser le skill keybindings-help
/keybindings-help
```

### Raccourcis par défaut
[À documenter]

## Hooks personnalisés

### Types de hooks
- `user-prompt-submit-hook` - Exécuté lors de la soumission de prompt
- [Autres hooks à documenter]

### Configuration des hooks
```json
{
  "hooks": {
    "user-prompt-submit-hook": "commande-shell"
  }
}
```

## MCP Servers

### Qu'est-ce qu'un MCP Server ?
[À compléter avec vos informations]

### Configuration
[À compléter]

### Servers disponibles
[À documenter]

## Settings avancés

### Modèles disponibles
- `sonnet` - Claude Sonnet (par défaut)
- `opus` - Claude Opus
- `haiku` - Claude Haiku (pour tâches rapides)

### Configuration du modèle
[À documenter selon vos découvertes]

## Prochaines étapes

Découvrez les [exemples pratiques](../exemples/README.md) utilisant ces configurations.
