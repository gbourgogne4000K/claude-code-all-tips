# Claude Code Quick Reference

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Interrupt current operation |
| `Escape Escape` | Open Rewind (time travel) |
| `Shift + Tab` | Toggle Plan Mode / Auto-accept |
| `Ctrl + C` | Exit Claude Code |
| `↑` / `↓` | Navigate prompt history |

## Essential Commands

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/clear` | Clear conversation | Starting new task, context bloat |
| `/compact` | Summarize context | Approaching 70% usage |
| `/context` | Show context usage | Regular monitoring |
| `/rewind` | Time travel UI | Made a mistake, want to undo |
| `/help` | List all commands | Forgot command names |
| `/model` | Switch model | Cost optimization, capability needs |
| `/agents` | Manage subagents | Configure custom agents |
| `/permissions` | View/edit permissions | Troubleshooting tool access |
| `/hooks` | Manage hooks | Review/update safety rules |

## Context Management Thresholds

| Context % | Status | Action |
|-----------|--------|--------|
| 0-40% | 🟢 Healthy | Work freely |
| 40-60% | 🟡 Watch | Be selective about new files |
| 60-80% | 🟠 Caution | Consider compacting |
| 80-95% | 🔴 Critical | /clear or targeted /compact |
| 95-100% | ⛔ Danger | Auto-compact triggers (uncontrolled) |

## Model Selection Guide

| Model | Best For | Cost | Speed |
|-------|----------|------|-------|
| Opus 4.5 | Architecture, complex reasoning, critical code | $$$ | Slow |
| Sonnet 4.5 | Most coding tasks, balanced | $$ | Medium |
| Haiku 4.5 | Quick queries, simple tasks, exploration | $ | Fast |

## File Locations

| Path | Purpose |
|------|---------|
| `~/.claude/CLAUDE.md` | Global instructions |
| `~/.claude/settings.json` | Global settings, hooks |
| `~/.claude/commands/` | Personal slash commands |
| `~/.claude/agents/` | Custom subagents |
| `.claude/CLAUDE.md` | Project instructions (team) |
| `.claude/settings.json` | Project settings (team) |
| `.claude/settings.local.json` | Local project settings (gitignored) |
| `.claude/commands/` | Project slash commands |
| `.claude/agents/` | Project subagents |

## Safety Hook Checklist

| Hook Type | Recommended Use |
|-----------|-----------------|
| `PreToolUse:Bash` | Block dangerous commands |
| `PreToolUse:Write` | Protect sensitive files |
| `PostToolUse:Write(*.py)` | Auto-format Python |
| `PostToolUse:Write(*.ts)` | Auto-format + typecheck |
| `PostToolUse:Edit` | Run linters |
| `Stop` | Session summary logging |

## Prompt Quality Checklist

Before sending a prompt, verify:

- [ ] **Goal is specific**: What exactly should happen?
- [ ] **Context is provided**: What files/info does Claude need?
- [ ] **Constraints are explicit**: What must/must not happen?
- [ ] **Success criteria defined**: How do I know it's done?
- [ ] **Examples given**: For complex patterns, show don't tell

## Error Recovery Flowchart

```
Issue Detected
      │
      ▼
  Small/Local? ────Yes────▶ Escape Escape (Rewind)
      │                           │
      No                    Pick restore point
      │                           │
      ▼                           ▼
  Code broken? ────Yes────▶ git checkout / git stash
      │
      No
      │
      ▼
  Context rot? ────Yes────▶ /clear + restart with notes
      │
      No
      │
      ▼
  Log to error journal for pattern analysis
```

## Quick Formulas

### Safe YOLO Mode
```bash
alias claude-yolo="claude --dangerously-skip-permissions"
```

### Quick Context Check
```
User: What's my current context usage?
```

### Emergency Compaction
```
User: /compact while preserving [critical items]
```

### Complete Reset
```
User: /clear
# Then: summarize current state in 3 points
```

## Common Usage Patterns

### Starting Complex Task
1. `/clear` for fresh context
2. Load relevant files with @mentions
3. Declare constraints and goals explicitly
4. Use `/help` if need special commands

### Mid-Project (50-70% context)
1. Check usage: "what's my context usage?"
2. If >60%: document key decisions in CLAUDE.md
3. Consider `/compact` with preservation rules
4. Or `/clear` and restart with essentials

### Debugging
1. `/investigate [issue-description]` (if command created)
2. Or: read relevant files, trace the problem
3. Use `git blame` for history
4. Log solution in error journal

### End of Session
1. Commit changes with `/commit`
2. Create PR if needed with `/pr`
3. Session hooks automatically log
4. Review session-logs to learn

## Anti-Patterns to Avoid

❌ **Don't** let context reach 90%+ without action
❌ **Don't** repeat same errors without logging them
❌ **Don't** use auto-compact without control
❌ **Don't** forget to test before committing
❌ **Don't** over-engineer (YAGNI)

## Additional Resources

- [Advanced Patterns](../patterns-avances/README.md) - Complete guide to 6 patterns
- [Configuration](../configuration/README.md) - Hooks and settings configuration
- [Examples](../exemples/README.md) - Concrete use cases
- [Troubleshooting](../troubleshooting/README.md) - Common problem solutions
