# Claude Code Tips & Techniques

> Practical tips collection from the community and expert users

---

## 📊 Essential Commands

### Monitoring Commands

#### `/usage` - Monitor Limits
```bash
/usage
```
**Utility**: Displays rate limits and real-time token usage.

**When to use**:
- Before launching expensive tasks
- To check remaining requests
- To optimize resource usage

#### `/stats` - Activity Statistics
```bash
/stats
```
**Displays**:
- Activity graphs
- Historical usage
- Consumption patterns
- Per-project statistics

### Context Management Commands

#### `/copy` - Copy as Markdown
```bash
/copy
```
**Utility**: Copies Claude's last response in markdown format.

**Use cases**:
- Extract generated code
- Save explanations
- Share outputs
- Quick documentation

#### `/chrome` - Browser Integration
```bash
/chrome
```
**Toggle**: Enables/disables Claude's native browser integration.

**When to use**:
- Interface testing
- Web content scraping
- Visual verification
- UI debugging

**Note**: Playwright MCP is often preferable (more reliable, uses accessibility tree).

#### `/mcp` - MCP Server Management
```bash
/mcp
```
**Utility**: Manage Model Context Protocol servers.

**Available actions**:
- List active servers
- Enable/disable servers
- Configure new connections
- Debug MCP issues

### Workflow Commands

#### `/plan` - Extended Planning Mode
```bash
/plan
```
**Recommended workflow**:
1. Launch `/plan` to gather complete context
2. Claude creates detailed plan
3. Select "clear context and auto-accept edits"
4. New conversation starts with only the plan as reference

**Benefits**:
- Fresh context for execution
- Complete plan as guide
- Optimal performance
- Fewer errors

---

## ⚡ Recommended Terminal Aliases

### Basic Shell Configuration

Add to your `~/.zshrc` or `~/.bashrc`:

```bash
# Quick launch
alias c='claude'
alias cc='claude --continue'      # Continue last conversation
alias cr='claude --recent'         # See recent conversations

# With integrations
alias ch='claude --chrome'        # Claude with Chrome
alias ccp='claude --dangerously-skip-permissions'  # Autonomous mode

# Specific workflows
alias cplan='claude /plan'        # Start in plan mode
alias cusage='claude /usage'      # Check usage
alias cstats='claude /stats'      # View statistics

# Powerful combinations
alias ccp='c -c'                  # Continue with permissions
alias cclear='claude /clear'      # Clear and restart
```

### Advanced Aliases

```bash
# Advanced shell functions
c-new() {
    # New conversation with specific context
    cd "$1" && claude
}

c-compact() {
    # Compact and document
    claude /compact
    echo "📝 Create handoff doc before /clear"
}

c-search() {
    # Search in history
    grep -r -i "$1" ~/.claude/projects/
}

c-backup() {
    # Backup important conversations
    local backup_dir="$HOME/claude-backups/$(date +%Y-%m-%d)"
    mkdir -p "$backup_dir"
    cp -r ~/.claude/projects/* "$backup_dir/"
    echo "✅ Backup created: $backup_dir"
}
```

---

## 🎤 Voice Integration

### Philosophy
> "Communicate through voice faster than typing"

**Impact**: 60-80% reduction in prompting time.

### Recommended Tools

#### 1. Superwhisper (Recommended) ⭐
**Platform**: macOS

**Features**:
- Local real-time transcription
- High precision
- Customizable hotkey
- System integration

**Installation**:
```bash
brew install --cask superwhisper
```

**Setup**:
1. Configure hotkey (e.g., Cmd+Shift+Space)
2. Speak → automatic transcription
3. Text inserted directly into Claude

#### 2. MacWhisper
**Alternative**: Similar to Superwhisper, free for basic usage.

#### 3. Super Voice Assistant (Open Source)
**Advantage**: Free and open source.

**GitHub**: https://github.com/k-m-jin/super-voice-assistant

### Optimal Voice Workflow

```
1. Press voice hotkey
   ↓
2. Dictate high-level intent (30 sec)
   "I want to refactor auth to use the new middleware pattern"
   ↓
3. Claude asks clarifying questions
   ↓
4. Respond by voice (15 sec each)
   ↓
5. Structured prompt generated
```

**Total**: ~2 minutes vs 10+ minutes manual typing.

### Error Tolerance

**Important**: Even with transcription errors, Claude understands intent.

**Example**:
```
Transcription: "I want to create a function for validating mail address"
                                              ↑ error: "email"
Claude understands: validate email ✓
```

---

## 🔄 Advanced Context Management

### The Milk Rule
> "AI context is like milk; it's best served fresh and condensed!"

**Principle**: Context degrades like milk. The fresher, the better.

### Proactive Compaction Strategy

#### 1. Disable Auto-Compact

**File**: `~/.claude/settings.json`

```json
{
  "conversation": {
    "autoCompact": false,
    "compactThreshold": 0.95
  }
}
```

**Why**: Total control over when and how to compact.

#### 2. Create Handoff Documents

Before `/clear`, create a handoff document:

**Template**: `handoff-[date].md`

```markdown
# Handoff Document - [Date]

## Context
- Project: [name]
- Goal: [current objective]

## Progress
- ✅ Completed: [list]
- 🔄 In progress: [list]
- ⏳ Todo: [list]

## Important Decisions
1. [Decision 1 + rationale]
2. [Decision 2 + rationale]

## What Worked
- [Successful pattern/approach]

## What DIDN'T Work
- [Failed approach + why]

## Next Steps
1. [Step 1]
2. [Step 2]

## Critical Context to Retain
- [Essential info 1]
- [Essential info 2]

## Key Files
- [list of relevant files]
```

#### 3. Handoff Workflow

```bash
# 1. Generate handoff
claude "Create a handoff document summarizing our session"

# 2. Save
mv handoff.md handoff-$(date +%Y%m%d).md

# 3. Clear
/clear

# 4. New session with handoff
claude "Here's the handoff from previous session: @handoff-20260201.md
Let's continue from there"
```

---

## 🧪 Autonomous Testing with tmux

### Concept

Allow Claude to test its code autonomously using tmux for background execution.

### tmux Setup

```bash
# Install tmux if needed
brew install tmux  # macOS
sudo apt install tmux  # Linux

# Basic configuration
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

### Autonomous Testing Pattern

**Slash Command**: `~/.claude/commands/test-autonomous.md`

```markdown
---
description: Run tests autonomously with verification
allowed-tools: Bash
---

Run tests autonomously:

1. **Create tmux session**:
   ```bash
   tmux new-session -d -s test-run
   ```

2. **Send test commands**:
   ```bash
   tmux send-keys -t test-run "npm test" C-m
   ```

3. **Capture output**:
   ```bash
   sleep 5  # Wait for execution
   tmux capture-pane -t test-run -p > test-output.txt
   ```

4. **Analyze results**:
   - Read test-output.txt
   - Identify failures
   - Propose corrections

5. **If failures**:
   - Fix code
   - Re-run tests
   - Repeat until success

6. **Cleanup**:
   ```bash
   tmux kill-session -t test-run
   ```

**Success criteria**: All tests pass without intervention.
```

### Autonomous Git Bisect

```markdown
# In your prompt
"Use git bisect to find the commit that introduced this bug.
Run tests in tmux for each commit.
Operate autonomously until identifying the faulty commit."
```

**Automatic workflow**:
1. `git bisect start`
2. Mark good/bad commits
3. For each commit, run tests in tmux
4. Analyze output
5. `git bisect good/bad` based on result
6. Continue until identification

---

## 🌐 Playwright MCP vs Native Chrome

### Comparison

| Feature | Playwright MCP | Native Chrome |
|---------|---------------|---------------|
| **Method** | Accessibility tree | Screenshots |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Performance** | Fast | Slower |
| **Click precision** | Ref-based (precise) | Coordinates (approximate) |
| **Context usage** | Low | High (images) |
| **Debugging** | Excellent | Visual but heavy |

### Recommendation

**Use Playwright MCP for**:
- Automated tests
- Data scraping
- Complex interactions
- CI/CD integration

**Use Native Chrome for**:
- Visual debugging
- UI design validation
- Demonstrations
- Cases where screenshots needed

### Playwright Configuration

**Installation**:
```bash
npm install -g playwright-mcp
```

**In CLAUDE.md**:
```markdown
## Browser Testing Guidelines

For browser interactions:
1. **Always** use Playwright MCP by default
2. Use `read_page` to get refs from accessibility tree
3. Click using `ref`, never coordinates
4. DO NOT take screenshots unless explicitly requested
5. Use native Chrome only for visual validation
```

---

## 📂 History Search

### Conversation Location

**Path**: `~/.claude/projects/`

**Format**: `.jsonl` files (JSON Lines)

### Search Techniques

#### 1. Keyword Search (grep)

```bash
# Search in all conversations
grep -r -i "authentication" ~/.claude/projects/

# List conversations containing a term
grep -l -i "jwt" ~/.claude/projects/**/*.jsonl

# With context (3 lines before/after)
grep -C 3 -i "bug fix" ~/.claude/projects/**/*.jsonl
```

#### 2. Structured Search (jq)

```bash
# Extract all user prompts
jq -r 'select(.role == "user") | .content' conversation.jsonl

# Find messages containing code
jq -r 'select(.content | contains("```")) | .content' conversation.jsonl

# Extract errors
jq -r 'select(.content | contains("error") or contains("Error")) | {timestamp: .timestamp, content: .content}' conversation.jsonl

# Conversation statistics
jq -s 'length' conversation.jsonl  # Number of messages
```

#### 3. Custom Search Script

**File**: `~/bin/claude-search`

```bash
#!/bin/bash

QUERY="$1"
CLAUDE_DIR="$HOME/.claude/projects"

if [ -z "$QUERY" ]; then
    echo "Usage: claude-search <query>"
    exit 1
fi

echo "🔍 Searching for: $QUERY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Search and display with context
find "$CLAUDE_DIR" -name "*.jsonl" -type f | while read file; do
    if grep -q -i "$QUERY" "$file"; then
        PROJECT=$(basename $(dirname "$file"))
        echo ""
        echo "📁 Project: $PROJECT"
        echo "📄 File: $(basename $file)"

        # Extract context with jq if valid JSON
        jq -r "select(.content | ascii_downcase | contains(\"${QUERY,,}\")) | \"  → [\(.timestamp // \"no-time\")]: \(.content[0:200])...\"" "$file" 2>/dev/null || \
        grep -i -C 2 "$QUERY" "$file" | head -10
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
```

**Usage**:
```bash
chmod +x ~/bin/claude-search
claude-search "authentication bug"
```

#### 4. Ask Claude

```
"Search my conversation history for discussions
about JWT authentication implementation.
Directory: ~/.claude/projects/"
```

---

## 🎛️ Advanced Configuration

### Custom Status Line

**Script**: `~/.claude/status-line.sh`

```bash
#!/bin/bash

# Colors (10 themes available - adjust per preference)
COLOR_MODEL="\033[1;36m"      # Cyan
COLOR_DIR="\033[1;33m"        # Yellow
COLOR_GIT="\033[1;35m"        # Magenta
COLOR_FILES="\033[1;32m"      # Green
COLOR_SYNC="\033[1;34m"       # Blue
COLOR_TOKENS="\033[1;31m"     # Red
COLOR_RESET="\033[0m"

# Get info
MODEL=$(claude --version 2>/dev/null | head -1)
DIR=$(pwd | sed "s|$HOME|~|")
GIT_BRANCH=$(git branch --show-current 2>/dev/null || echo "no-git")
UNCOMMITTED=$(git status --short 2>/dev/null | wc -l | tr -d ' ')
SYNC_STATUS=$(git status --short --branch 2>/dev/null | grep -q "ahead\|behind" && echo "⚠" || echo "✓")

# Token usage (requires API integration or parsing)
TOKEN_USAGE="--"  # Placeholder

# Display status line
echo -e "${COLOR_MODEL}Model: ${MODEL}${COLOR_RESET} | ${COLOR_DIR}${DIR}${COLOR_RESET} | ${COLOR_GIT}⎇ ${GIT_BRANCH}${COLOR_RESET} | ${COLOR_FILES}📝 ${UNCOMMITTED}${COLOR_RESET} | ${COLOR_SYNC}${SYNC_STATUS}${COLOR_RESET} | ${COLOR_TOKENS}🎫 ${TOKEN_USAGE}${COLOR_RESET}"
```

**Integration**:

```bash
# Add to ~/.zshrc or ~/.bashrc
precmd() {
    ~/.claude/status-line.sh
}
```

### Disable Git Attribution

**Problem**: Commits/PRs include "Co-Authored-By: Claude"

**Solution**: `~/.claude/settings.json`

```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

**Alternative**: Keep attribution but customize:

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

### Fundamental Difference

| Aspect | Skills | CLAUDE.md |
|--------|--------|-----------|
| **Loading** | On-demand (via `/skill`) | Every conversation |
| **Token impact** | Only when invoked | Always present |
| **Use case** | Specialized capabilities | General instructions |
| **Sharing** | Portable, reusable | Project-specific |

### When to Use Skills

**Use Skills for**:
- Rarely used functionality
- Complex specific workflows
- External integrations (APIs, services)
- Fallbacks for limited capabilities

**Example**: Gemini CLI Fallback

**File**: `~/.claude/commands/gemini-fallback.md`

```markdown
---
description: Use Gemini for inaccessible sites (Reddit, etc.)
---

For sites blocking Claude (Reddit, certain forums):

1. Use Gemini CLI:
   ```bash
   gemini "summarize this Reddit thread: [URL]"
   ```

2. Gemini accesses content
3. Return summary to user
4. Continue normal workflow

**Supported sites**:
- Reddit
- Certain forums
- Sites with aggressive anti-bot
```

### When to Use CLAUDE.md

**Use CLAUDE.md for**:
- Project code conventions
- Architecture and patterns
- Business constraints
- Always-applicable instructions

**Golden rule**: If used in >50% conversations → CLAUDE.md. Otherwise → Skill.

---

## 🚀 Output Extraction Techniques

### 1. `/copy` Command

```bash
/copy
```
→ Copies last response as markdown

### 2. File Redirection

```
"Write complete response to output.md and open in VS Code"
```

**Claude executes**:
```bash
cat > output.md << 'EOF'
[content]
EOF
code output.md
```

### 3. pbcopy (macOS)

```
"Generate code and copy to clipboard with pbcopy"
```

**Workflow**:
```bash
echo "[code]" | pbcopy
```

### 4. Open URLs

```
"Find this API documentation and open it in my browser"
```

**Claude can execute**:
```bash
open https://api-docs-url.com
# or
xdg-open https://... # Linux
```

### 5. Code Sharing

**Script**: `~/bin/share-code`

```bash
#!/bin/bash

# Copy and upload code
CONTENT="$1"
echo "$CONTENT" | pbcopy
echo "✅ Copied to clipboard"

# Optional: upload to gist
if [ "$2" == "--gist" ]; then
    gh gist create --public - <<< "$CONTENT"
fi
```

---

## 📋 Optimal Setup Checklist

### Initial Configuration

- [ ] Install voice tools (Superwhisper/MacWhisper)
- [ ] Configure shell aliases (`~/.zshrc`)
- [ ] Setup tmux for autonomous tests
- [ ] Install Playwright MCP
- [ ] Create status line script
- [ ] Disable auto-compact
- [ ] Configure git attribution
- [ ] Create handoff documents folder
- [ ] Setup history search script
- [ ] Install dx plugin

### Daily Workflow

- [ ] Check `/usage` before expensive tasks
- [ ] Use voice for long prompts
- [ ] Create handoff before `/clear`
- [ ] Test with tmux for autonomy
- [ ] Prefer Playwright over Chrome
- [ ] Backup important conversations
- [ ] Review stats with `/stats`

### Weekly Maintenance

- [ ] Clean CLAUDE.md (remove obsolete)
- [ ] Convert repeated instructions to skills
- [ ] Review and improve aliases
- [ ] Backup `~/.claude/`
- [ ] Analyze usage patterns in `/stats`

---

## 🎯 Productivity Patterns

### Pattern 1: Voice → Plan → Execute

```
1. Dictate intent (voice)
   ↓
2. /plan with complete context
   ↓
3. Clear + auto-accept
   ↓
4. Execution with fresh context
```

**Gain**: 70% time saved, better quality.

### Pattern 2: Autonomous Test Loop

```
1. Write feature
   ↓
2. Write tests
   ↓
3. Run tests in tmux
   ↓
4. Claude analyzes failures
   ↓
5. Claude auto-corrects
   ↓
6. Repeat until success
```

**Gain**: Uninterrupted development.

### Pattern 3: Fresh Context Cadence

```
0-40%: Normal work
  ↓
40-60%: Checkpoint (document decisions)
  ↓
60-70%: Create handoff
  ↓
70%: /clear + new session with handoff
```

**Gain**: Constant quality, no degradation.

### Pattern 4: Browser Testing Workflow

```
1. Develop UI feature
   ↓
2. Test with Playwright MCP (functional)
   ↓
3. If OK: Native Chrome (visual validation)
   ↓
4. Screenshot for documentation
```

**Gain**: Reliable tests + visual validation at right time.

---

## 🔗 Additional Resources

### GitHub Repos

- **claude-code-tips**: https://github.com/ykdojo/claude-code-tips
- **superpowers**: https://github.com/obra/superpowers
- **Super Voice Assistant**: https://github.com/k-m-jin/super-voice-assistant

### External Tools

- **Superwhisper**: https://superwhisper.com/
- **MacWhisper**: https://goodsnooze.gumroad.com/l/macwhisper
- **Playwright**: https://playwright.dev/

### Community

- **Skool Community**: https://www.skool.com/the-agentic-lab-6743
- **Claude Skills Library**: https://mcpservers.org/claude-skills
- **Skills Marketplace**: https://skillsmp.com/

---

## 📊 Impact Summary

### 🔥 Maximum Impact

1. **Voice integration** - 70% prompting time reduction
2. **Fresh context cadence** - Consistent quality
3. **Handoff documents** - Perfect continuity
4. **Autonomous tmux testing** - Frictionless development
5. **Playwright MCP** - Reliable tests

### ⚡ High Impact

1. **Terminal aliases** - Instant access
2. **Status line** - Constant visibility
3. **`/copy` and extraction** - Fluid workflow
4. **History search** - Fast learning
5. **Token-efficient skills** - Resource optimization

### 💎 Nice to Have

1. **Attribution config** - Customization
2. **Backup script** - Security
3. **Custom themes** - Aesthetics
4. **Gemini fallback** - Edge cases

---

*Tips updated: February 2026*
