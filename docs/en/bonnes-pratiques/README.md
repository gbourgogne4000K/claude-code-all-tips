# 50 Claude Code Best Practices

> Complete guide to essential practices for mastering Claude Code

---

## 🌟 Boris's Tips (Claude Code Creator)

> Straight from the creator of Claude Code, here are 10 practical tips to maximize your productivity

### 10. Do More in Parallel
**Tip**: Use git worktrees to run multiple Claude sessions in parallel.

**Implementation**:
```bash
# Create worktrees for different tasks
git worktree add ../project-feature-a feature-a
git worktree add ../project-bugfix bugfix-branch

# Launch Claude in each worktree
# Terminal 1: cd ../project-feature-a && claude
# Terminal 2: cd ../project-bugfix && claude
```

**Benefits**:
- Work on multiple features simultaneously
- No conflict between different contexts
- Perfect isolation between sessions
- Keep context intact for each task

### 9. Start Every Complex Task in Plan Mode
**Tip**: For any non-trivial task, ALWAYS enter Plan mode first.

**Why**:
- Avoids costly mistakes
- Clarifies approach before execution
- Allows validation with user
- Reduces risk of rework

**Pattern**:
```
Complex task → Plan Mode → Validation → Execution
```

**Don't**: Jump straight into code for tasks with multiple possible solutions.

### 8. Invest in CLAUDE.md
**Tip**: Treat your CLAUDE.md as living documentation for your project.

**What it should contain**:
- Tech stack
- Code conventions
- Project-specific patterns
- Business rules and constraints
- Project structure
- "DO NOT" list

**Golden rule**: If you repeat the same instruction 3+ times, add it to CLAUDE.md.

**See**: [CLAUDE.md Template](../templates/CLAUDE.md)

### 7. Create Skills and Commit Them to Git
**Tip**: Version your custom skills in your repository.

**Recommended structure**:
```
.claude/
├── commands/
│   ├── commit.md
│   ├── test.md
│   └── deploy.md
└── CLAUDE.md
```

**Benefits**:
- Team sharing
- Modification history
- Automatic backup
- Consistency across environments

### 6. Claude Fixes Bugs By Itself
**Tip**: Configure Claude to automatically detect and fix common errors.

**Setup**: Use hooks so Claude runs tests after each modification.

**Example hook**:
```bash
#!/bin/bash
# post-edit.sh - Run tests after edit
npm test || {
    echo "Tests failed - Claude will fix automatically"
    # Hook can block or let Claude fix
}
```

**Impact**: Drastic reduction in debugging time.

### 5. Level Up Your Prompting
**Tip**: The quality of your prompts determines the quality of results.

**Framework to apply**:
1. **[Role]**: Define required expertise
2. **[Task]**: Precise and measurable objective
3. **[Context]**: All relevant information
4. **[Verification]**: How to measure success

**Resources**:
- Practices 47-50 in this guide
- [Advanced Patterns - Prompt Engineering](../patterns-avances/README.md#8-improved-prompt-engineering)

### 4. Terminal and Environment Setup
**Tip**: Optimize your development environment for Claude.

**Checklist**:
- [ ] Aliases configured for frequent commands
- [ ] Custom shell (zsh/bash with plugins)
- [ ] Environment variables for common paths
- [ ] Automation scripts in PATH
- [ ] IDE integration configured

**Example ~/.zshrc**:
```bash
# Claude-friendly aliases
alias cc="claude"
alias ccp="claude --dangerously-skip-permissions"
alias ccplan="echo 'Entering Plan Mode' && claude"

# Useful functions
claude-log() {
    claude /log_success "$1"
}
```

### 3. Use Subagents
**Tip**: Delegate isolated tasks to specialized subagents.

**When to use**:
- Large codebase exploration
- Repetitive tasks
- Documentation generation
- Security analysis
- Test writing

**Benefits**:
- Preserves your main context
- Task parallelization
- Domain specialization

**See**: [Advanced Patterns - Subagent Control](../patterns-avances/README.md#5-subagent-control)

### 2. Use Claude for Data and Analytics
**Tip**: Claude excels at data analysis and report generation.

**Use cases**:
- Analyze application logs
- Generate code metrics
- Create dashboards
- Extract insights from datasets
- Transform and clean data

**Example**:
```
"Analyze error logs in @logs/app.log from the last 7 days.
Group by error type and generate a report with:
- Top 5 most frequent errors
- Timeline of their appearance
- Priority fix suggestions"
```

### 1. Learn WITH Claude
**Tip**: Use Claude as a personal tutor to learn new technologies.

**Method**:
```
"I want to learn [technology].
Create a personalized curriculum with:
1. Fundamental concepts
2. Progressive practical exercises
3. Real projects to build
4. Recommended resources

Then, guide me step by step with feedback on my code."
```

**Effective domains**:
- New programming languages
- Frameworks and libraries
- Architectural patterns
- Algorithmic concepts
- Industry best practices

---

## 📝 Task Framing and Prompting (50-43)

### 50. Clear Task Framing
**Principle**: State exactly what you want Claude to do before anything else.

**Example**:
```
❌ Bad: "I have a problem with my auth, look at the code and tell me what's wrong"

✅ Good: "Task: Identify why JWT authentication fails during token refresh.
Affected files: src/auth/jwt.ts, src/middleware/auth.ts
Observed error: 'Invalid token' after 15 minutes"
```

### 49. Front Load Instructions
**Principle**: Always put the most important instruction at the very top of the prompt.

**Recommended structure**:
```
[CRITICAL INSTRUCTION]

[Context]
[Details]
[Constraints]
```

### 48. Give Claude a Way to Verify Its Work
**Principle**: Include tests, screenshots, or expected outputs so Claude can check itself.

**Impact**: This is the single highest-leverage thing you can do.

**Examples**:
```markdown
Task: Implement calculateDiscount function

Verification criteria:
- [ ] calculateDiscount(100, 0.1) returns 90
- [ ] calculateDiscount(0, 0.5) returns 0
- [ ] calculateDiscount(-10, 0.2) throws error
- [ ] Unit tests pass: npm test
```

### 47. Recommended Prompt Structure
**Formula**: `[Role] + [Task] + [Context]`

**Template**:
```markdown
# Role
You are a web security expert specialized in JWT authentication.

# Task
Audit the authentication system to identify potential vulnerabilities.

# Context
- Stack: Node.js + Express + JWT
- Files: src/auth/*.ts
- Concern: Tokens don't seem to expire correctly
- Expected output: List of vulnerabilities with severity and recommendations
```

### 46. Chrome Extension for UI Verification
**Tip**: UI changes can be verified using the Claude Chrome extension.
- Opens a browser
- Tests the UI
- Iterates until code works

### 45. Workflow: Explore → Plan → Code
**Optimal process**:
1. **Research**: Use other LLMs if needed to understand the problem
2. **Plan Mode**: Enter Plan mode to design approach
3. **Normal Mode**: Return to normal mode to execute code

**Commands**:
```bash
# Phase 1: Explore
/explore [area to investigate]

# Phase 2: Plan
# (Enter Plan Mode)

# Phase 3: Code
# (Exit Plan Mode and execute)
```

### 44. Provide Specific Context in Prompts
**Principle**: The more precise your instructions, the better the result.

**Examples**:
```
❌ "Improve this function"
✅ "Optimize calculateTotal() to handle 10,000+ items without performance degradation"

❌ "Add tests"
✅ "Add Jest tests covering edge cases (null, undefined, empty arrays) for validateEmail()"
```

### 43. Assume Zero Context
**Principle**: Assume Claude knows nothing about your project. Tell it everything it needs to know.

**Checklist**:
- [ ] Tech stack mentioned
- [ ] Coding conventions explained
- [ ] Constraints stated
- [ ] Goal clearly defined
- [ ] Relevant files identified

### 42. Rich Context with @
**Tip**: Use `@` to link files, data, and images.

**Examples**:
```
"Analyze @src/auth/jwt.ts and @src/middleware/auth.ts to identify why..."

"Here's @screenshot.png of the bug. Reproduce this behavior in @components/Login.tsx"

"Compare current @package.json with @package-old.json to see what changed"
```

### 41. Claude.md with /init
**Tip**: Run `/init` to generate a starter CLAUDE.md file for your current project.

---

## 📋 Projects & Skills (40-31)

### 40. Project-Level Instructions
**Principle**: Use project-level instructions to define long-term behavior instead of repeating prompts.

**Location**: `.claude/CLAUDE.md` or `CLAUDE.md`

### 39. Project Memory
**Tip**: Edit the "Memory" tab to control exactly what Claude should retain or ignore over time.

**Functionality**: This works in projects as well.

### 38. Use Claude Skills
**Principle**: Turn repeatable workflows into Skills instead of re-prompting.

**Benefits**:
- Reusability
- Consistency
- Time savings

### 37. Skills From Examples
**Method**:
1. Paste a great output
2. Ask Claude to turn it into a reusable Skill
3. You can even upload screenshots and ask Claude to replicate them

**Example**:
```
"Here's an excellent bug report I wrote manually.
Turn this into a reusable Skill I can use with /bug-report"
```

### 36. Skill Versioning
**Practice**: Duplicate and version Skills as you refine workflows instead of editing live ones.

**Structure**:
```
~/.claude/commands/
├── commit-v1.md
├── commit-v2.md (improvement)
└── commit.md -> commit-v2.md (symlink to current version)
```

### 35. Project Hygiene
**Principle**: Regularly prune memory, files, and instructions to avoid drift.

**Monthly checklist**:
- [ ] Remove obsolete instructions from CLAUDE.md
- [ ] Clean unused project files
- [ ] Review and compact memory
- [ ] Update Skills with improvements

### 34. Project Context Bleed
**Principle**: Separate projects for unrelated workstreams to prevent context bleed.

**Organization**:
```
~/projects/
├── backend-api/        # Separate project
│   └── .claude/
├── frontend-app/       # Separate project
│   └── .claude/
└── documentation/      # Separate project
    └── .claude/
```

### 33. Claude Skills Repo
**Resource**: A library of 80,000+ Claude Skills
- **URL**: https://skillsmp.com/

### 32. Claude Skills Library
**Resource**: Website with plug-and-play Skills and more
- **URL**: https://mcpservers.org/claude-skills

### 31. Project Memory Storage
**Possible locations**:
- `./CLAUDE.md` (project root)
- `./.claude/CLAUDE.md` (in .claude folder)

Both work, choose based on your organization preference.

---

## 💡 Underrated Mini Tips (30-21)

### 30. Model Stacking
**Strategy**: Use other LLMs to plan your projects and generate advanced mega prompts before ever opening Claude Code.

**Benefits**:
- Saves tokens from Plan Mode
- Combines strengths of different models
- Better initial planning

**Workflow**:
```
1. GPT-4 or other LLM → Initial planning
2. Claude Code Plan Mode → Plan refinement
3. Claude Code → Execution
```

### 29. Create Custom Subagents
**Location**: Define specialized assistants in `.claude/agents/`

**Usage**: Claude can delegate to these agents for isolated tasks.

**See**: [Advanced Patterns - Subagents](../patterns-avances/README.md#5-subagent-control)

### 28. Output Scoring
**Technique**: Ask Claude to score its answer against your pre-defined success criteria.

**Example**:
```markdown
After generating the code, score your solution out of 10 based on:
- Performance (0-3)
- Readability (0-3)
- Test coverage (0-2)
- Convention adherence (0-2)

Total: X/10
Justification: [explanation]
```

### 27. Install Plugins
**Command**: Run `/plugin` to browse the marketplace.

**Benefits**: Adds skills, tools, and integrations without any configuration.

### 26. Claude Code Taught IN Claude Code
**Resource**: A course that teaches you Claude Code directly IN Claude Code.
- **URL**: https://ccforeveryone.com/

### 25. Claude Interviews
**Technique**: For larger projects, have Claude interview you first.

**Process**:
1. Start with a minimal prompt
2. Ask Claude to interview you using AskUserQuestion
3. Claude asks clarifying questions
4. You answer progressively
5. Claude builds complete understanding

**Example starter prompt**:
```
"I want to build [high-level concept].
Before starting, interview me to understand exactly what I need.
Use AskUserQuestion to ask your questions one at a time."
```

### 24. Correct Often
**Principle**: Course-correct Claude often. The moment it starts going off track, stop.

**Actions**:
- `ESC` to stop Claude mid-action
- Redirect immediately
- Don't let it drift

### 23. Clear Command
**Usage**: Run `/clear` to start a clean session.

**When to use**:
- Switching to completely different task
- Context becomes confusing
- Too much obsolete information

### 22. Rewind
**Shortcut**: Double-tap `ESC` or `/rewind` to open checkpoint menu.

**Utility**: Time travel to any previous state.

### 21. Run Multiple Sessions
**Two approaches**:

#### Claude Desktop
- Manage multiple local sessions visually
- Each session gets its own isolated worktree

#### Claude Web
- Run on Anthropic's secure cloud infrastructure
- Isolated VMs

---

## 🐛 Debugging & Error Handling (20-11)

### 20. Step Isolation
**Principle**: Re-run only the broken step instead of regenerating everything.

**Example**:
```
"Step 3 (test generation) failed.
Re-run ONLY step 3, keeping steps 1 and 2 unchanged."
```

### 19. Error Reproduction
**Technique**: Ask Claude to intentionally reproduce the failure to understand it.

**Example**:
```
"Reproduce the 'undefined is not a function' error I saw.
Identify the exact line and root cause."
```

### 18. Rollback Prompts
**Method**: Revert to the last known good prompt and reapply changes one at a time.

**Workflow**:
1. `/rewind` to working state
2. Reapply change 1
3. Test
4. Reapply change 2
5. Test
6. Identify which change causes the issue

### 17. Over-Specified CLAUDE.md
**Problem**: If your CLAUDE.md is too long, Claude ignores half of it because important rules get lost in the noise.

**Solution**: Ruthlessly prune. If Claude already does something correctly without the instruction, delete it or convert it to a hook.

**Golden rule**: CLAUDE.md should fit on 1-2 screens maximum.

### 16. Context Mixing Error
**Problem**: You start with one task, then ask something unrelated, then go back to the first task. Context is full of irrelevant information.

**Solution**: `/clear` between unrelated tasks.

**Pattern**:
```
Task A → /clear → Task B → /clear → Back to Task A
```

### 15. Over-Correcting
**Problem**: Claude does something wrong, you correct it, it's still wrong, you correct again. Context is polluted with failed approaches.

**Solution**: After two failed corrections, `/clear` and write a better initial prompt incorporating what you learned.

**Workflow**:
```
Attempt 1 → Fail
Correction 1 → Fail
→ STOP
→ /clear
→ New improved prompt incorporating lessons
```

### 14. Step-by-Step Replay
**Technique**: Have Claude walk through how it generated the answer line by line.

**Example**:
```
"Explain line by line how you generated this function.
For each line, tell me why you made that choice."
```

### 13. The Infinite Exploration
**Problem**: You ask Claude to "investigate" something without scoping it. Claude reads hundreds of files, filling the context.

**Solution**: Scope investigations narrowly or use subagents so exploration doesn't consume your main context.

**Examples**:
```
❌ "Investigate the auth system"
✅ "Investigate only src/auth/jwt.ts - focus on token expiration logic"
✅ "Use a subagent to investigate the entire auth system, then summarize findings"
```

### 12. Debugging Project
**Strategy**: Create an AI project dedicated to debugging code.

**Suggestion**: Grok 4 Heavy is good at debugging.

### 11. Context Window Management
**Problem**: Claude's context window fills up fast. Claude may start forgetting earlier instructions.

**Resource**: https://code.claude.com/docs/en/costs#reduce-token-usage

**Solutions**:
- Monitor usage with `/context`
- Strategic compaction
- Regular clears
- Use subagents

---

## 🎯 Final Tips & Resources (10-1)

### 10. Notion Database
**Tip**: Connect your Notion database to Claude to store your best & most commonly used prompts.

**Benefits**:
- Centralization
- Reusability
- Versioning
- Team sharing

### 9. Learn Claude Code in Action
**Resource**: Anthropic's learning resources
- **URL**: https://www.anthropic.com/learn

### 8. Claude Courses
**Resource**: Courses from Coursera
- **URL**: https://www.anthropic.com/learn

### 7. Boris' Setup
**Resource**: How the creator of Claude Code maximizes Claude Code
- **Title**: Boris' Claude Code Setup Cheatsheet

### 6. Claude Code Best Practices (DOC)
**Resource**: Link to the latest official doc
- **URL**: https://code.claude.com/docs/en/best-practices

### 5. Safe Autonomous Mode
**Command**: `claude --dangerously-skip-permissions`

**Usage**: Bypass all permission checks and let Claude work uninterrupted.

**Ideal for**:
- Fixing lint errors
- Generating boilerplate
- Repetitive workflows

**IMPORTANT**: Use with safety hooks! See [Advanced Patterns - Hooks](../patterns-avances/README.md#3-hooks-for-deterministic-safety)

### 4. Slow & Steady
**Philosophy**: Take your time. Especially if building a serious workflow.

**Mantra**: Plan. Plan. Plan. THEN, execute.

**Anti-pattern**:
```
❌ Start coding immediately
✅ Plan first
✅ Validate approach
✅ Then execute
```

### 3. Claude Superpowers
**Resource**: A GitHub Repo of Claude Code superpowers
- **URL**: https://github.com/obra/superpowers

### 2. Hooks
**Principle**: Best for actions that must happen every time with zero exceptions.

**Examples**:
- Auto-formatting
- Security checks
- Logging
- Validation

**See**: [Advanced Patterns - Hooks](../patterns-avances/README.md#3-hooks-for-deterministic-safety)

### 1. How to Extend Claude Code
**Resource**: Anthropic's official guide

**Topics covered**:
- Create plugins
- Develop skills
- Configure hooks
- Custom integrations

---

## 📊 Impact Summary

### 🔥 Maximum Impact (Start Here)

1. **Verification Methods (#48)** - The most powerful lever
2. **Front Load Instructions (#49)** - Immediate improvement
3. **[Role + Task + Context] Structure (#47)** - Consistent prompts
4. **Correct Often (#24)** - Avoid drift
5. **Clear Between Tasks (#23, #16)** - Clean context

### ⚡ High Impact (Learn Next)

1. **Explore → Plan → Code (#45)** - Optimal workflow
2. **Rich Context with @ (#42)** - Maximum precision
3. **Reusable Skills (#38, #37)** - Long-term efficiency
4. **Subagents (#29)** - Parallelization
5. **Hooks (#2)** - Reliable automation

### 💎 Hidden Gems (Expert)

1. **Model Stacking (#30)** - Multi-LLM strategy
2. **Claude Interviews (#25)** - For large projects
3. **Output Scoring (#28)** - Self-verification
4. **Skill Versioning (#36)** - Controlled evolution
5. **Dedicated Debugging Project (#12)** - Specialization

---

## 🎓 Mastery Checklist

### Beginner Level
- [ ] Use [Role + Task + Context] structure
- [ ] Include verification criteria
- [ ] Important instructions first
- [ ] /clear between unrelated tasks
- [ ] Use @ to link files

### Intermediate Level
- [ ] Create CLAUDE.md for projects
- [ ] Develop 3-5 custom Skills
- [ ] Explore → Plan → Code workflow
- [ ] Actively manage context
- [ ] Correct Claude as soon as it drifts

### Advanced Level
- [ ] Safety hooks configured
- [ ] Custom subagents created
- [ ] Model Stacking for complex projects
- [ ] Skill versioning
- [ ] Dedicated debugging project
- [ ] Notion/external tool integration

### Expert Level
- [ ] Autonomous mode with hooks
- [ ] Multiple parallel sessions
- [ ] Custom plugins
- [ ] Contribution to Superpowers repo
- [ ] Mentoring other users

---

## 🔗 Additional Resources

- [Advanced Patterns](../patterns-avances/README.md) - 6 essential patterns
- [Quick Reference](../reference-rapide/README.md) - Cheat sheet
- [Configuration](../configuration/README.md) - Hooks and settings setup
- [Templates](../templates/CLAUDE.md) - Ready-to-use templates
