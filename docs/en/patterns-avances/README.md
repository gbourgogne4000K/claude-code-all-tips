# Advanced Claude Code Usage Patterns

> **Source**: Based on 2000 hours of coding with LLMs in 2025

## Core Philosophy

**Fundamental Principle**: Any issue in LLM generated code is solely due to YOU. Errors are traceable to:
- Improper prompting
- Improper context engineering

**Central Problem**: Context rot (and lost in the middle) impacts the quality of output heavily, and does so very quickly.

---

## 1. Error Logging System

### Principle
Reconstructing the input-output loop that agentic coding hides from you.

### Implementation
```markdown
## Error Log Structure

### Date: [Date]
### Triggering Prompt:
[Exact prompt that caused the error]

### Error Encountered:
[Error description]

### Category:
- [ ] Context rot
- [ ] Ambiguous prompt
- [ ] Insufficient context
- [ ] Tool misuse
- [ ] Other: _______

### Analysis:
What did I do wrong?
[Your analysis]

### Pattern Identified:
[If a pattern emerges]
```

### Benefits
- Error patterns emerge naturally
- Learn to identify your prompting mistakes
- Continuous skill improvement

---

## 2. Slash Commands as Lightweight Local Apps

### Concept
Slash commands are secretly one of the most powerful parts of Claude Code.

### Philosophy
Think of them as **"Claude as a Service"**:
- Workflows with the power of a SaaS
- Way quicker to build
- Fully customizable

### Use Cases
#### Creating a Custom Command
```bash
# Example: Project setup command
/setup-project [type] [name]

# What the command does:
1. Creates folder structure
2. Initializes git
3. Configures pre-commit hooks
4. Installs dependencies
5. Creates README file
```

#### Advantages
- Instant reusability
- Standardized workflows
- Massive time savings

---

## 3. Hooks for Deterministic Safety

### The Magic Formula
```
dangerously-skip-permissions + hooks that prevent dangerous actions = flow state without fear
```

### Recommended Configuration

#### In `~/.claude/settings.json`
```json
{
  "dangerously-skip-permissions": true,
  "hooks": {
    "pre-bash": "~/scripts/claude-safety-check.sh",
    "pre-write": "~/scripts/check-protected-files.sh"
  }
}
```

#### Example Safety Hook
```bash
#!/bin/bash
# claude-safety-check.sh

# List of forbidden commands
FORBIDDEN_CMDS=("rm -rf /" "dd if=" "mkfs" ":(){ :|:& };:")

for cmd in "${FORBIDDEN_CMDS[@]}"; do
    if [[ "$1" == *"$cmd"* ]]; then
        echo "❌ Dangerous command blocked: $cmd"
        exit 1
    fi
done

exit 0
```

### Benefits
- Work in flow state without interruptions
- Protection against accidentally destructive actions
- Total confidence in automation

---

## 4. Context Hygiene

### Problem
Auto-compaction hides context management and can remove crucial information.

### Solution

#### 1. Disable Auto-Compaction
```json
{
  "auto-compact": false
}
```

#### 2. Add a Status Line
```json
{
  "status-line": "Context: {{context_usage}}% | Tokens: {{tokens_used}}/{{tokens_max}}"
}
```

#### 3. Strategic Manual Compaction
You decide **when** and **how** to compact:
- Before a critical task
- After completing a section
- When context reaches 70-80%

### Hidden Feature: Double-Escape Time Travel

#### What is it?
The ability to go back in the conversation precisely.

#### Usage
```
User: @@back 5  # Go back 5 messages
User: @@snapshot save critical-point
User: @@snapshot restore critical-point
```

### Benefits
- Total control over context
- No loss of critical information
- Optimized output quality

---

## 5. Subagent Control

### Observation
Claude Code consistently spawns Sonnet/Haiku subagents even for knowledge tasks.

### Optimization

#### Add to Global CLAUDE.md
```markdown
# Agent Configuration

## Subagent Policy
- Always launch Opus subagents for complex reasoning tasks
- Use Haiku for simple, quick operations only
- Prefer subagent delegation for large projects
```

#### Recommended Pattern
```
Orchestrator (Claude Code) + Subagents >> Claude Code vanilla
```

### When to Use Subagents

#### Use Way More Subagents Than You Think
- Parallelizable tasks
- Complex multi-file projects
- Deep research
- Significant code analysis

#### Optimal Configuration
```markdown
# In your prompt
Use Task tool with subagent for:
1. Code exploration (Explore agent)
2. Complex planning (Plan agent)
3. Parallel operations (multiple agents)
```

### Benefits
- Better quality for complex tasks
- Efficient parallelization
- Dedicated context per task

---

## 6. The Reprompter System

### Problem
Writing high-quality prompts takes time and breaks flow.

### Solution: Voice-to-Structured-Prompt Pipeline

#### Step 1: Voice Dictation
```
Use a voice-to-text tool to capture your intention
```

#### Step 2: Clarifying Questions
Claude automatically asks questions to clarify:
- Exact objective
- Constraints
- Preferences
- Missing context

#### Step 3: Structured Prompt with XML
Claude generates a structured prompt:

```xml
<task>
  <objective>
    Implement a JWT authentication system
  </objective>

  <constraints>
    <constraint>Use Express.js</constraint>
    <constraint>No external library except jsonwebtoken</constraint>
    <constraint>Support refresh tokens</constraint>
  </constraints>

  <context>
    <existing-code>
      - REST API already in place
      - PostgreSQL database
      - Existing User model
    </existing-code>
  </context>

  <preferences>
    <preference>Code commented in English</preference>
    <preference>Unit tests included</preference>
  </preferences>
</task>
```

### Complete Workflow
```
1. Speak your intention (30 seconds)
   ↓
2. Claude asks 2-3 clarifying questions (1 minute)
   ↓
3. Claude generates structured prompt (10 seconds)
   ↓
4. You validate or adjust (20 seconds)
   ↓
5. Execution with perfect context
```

### Benefits
- High-quality prompting without friction
- Drastic reduction in back-and-forth
- Complete intent capture
- Massive time savings

---

## Pattern Summary

| Pattern | Impact | Difficulty | ROI |
|---------|--------|------------|-----|
| Error Logging | 🔥🔥🔥 | Low | Very High |
| Slash Commands | 🔥🔥🔥🔥 | Medium | Extremely High |
| Hooks Safety | 🔥🔥🔥🔥🔥 | Medium | Critical |
| Context Hygiene | 🔥🔥🔥🔥 | Low | Very High |
| Subagent Control | 🔥🔥🔥 | High | High |
| Reprompter | 🔥🔥🔥🔥 | Medium | Very High |

---

## Getting Started

### Checklist to Begin

- [ ] Create an error log file
- [ ] Identify 3 repetitive workflows to transform into slash commands
- [ ] Configure basic safety hooks
- [ ] Disable auto-compact and add status line
- [ ] Add subagent policy to CLAUDE.md
- [ ] Test the reprompter system on a complex task

### Next Steps

1. Start with **Context Hygiene** (immediate impact, low effort)
2. Add **Hooks Safety** for peace of mind
3. Implement **Error Logging** for continuous learning
4. Develop your first **Slash Commands**
5. Optimize with **Subagent Control**
6. Master the **Reprompter System**

---

## Additional Resources

- [Advanced Configuration](../configuration/README.md)
- [Practical Examples](../exemples/README.md)
- [Troubleshooting](../troubleshooting/README.md)
