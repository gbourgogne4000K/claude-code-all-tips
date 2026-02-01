# Workflow & Project Bootstrap

> Structured approach for initializing and managing projects with Claude Code

**Source**: Based on [claude-bootstrap](https://github.com/alinaqi/claude-bootstrap) by Ali Naqi

---

## 🎯 Core Philosophy

### The New Bottleneck

> "The bottleneck has moved from code generation to code comprehension"

AI generates code quickly, but without structure and constraints, this leads to:
- Semantic duplication (same PURPOSE, different implementation)
- Uncontrolled complexity
- Rapid technical debt
- Hard-to-maintain code

**Solution**: Opinionated system with guardrails, strict TDD, and automatic iteration.

### Key Principles

#### 1. Iterative Loops by Default
Don't manually invoke commands. Describe requirements naturally and let Claude iterate **automatically** until success.

#### 2. Tests First, Always
- **Features**: RED → RUN → GREEN → RUN → VALIDATE
- **Bugs**: Identify test gap → write failing test → fix → validate

#### 3. Simplicity is Non-Negotiable
Strict measurable constraints:
- **20 lines maximum** per function
- **3 parameters maximum** per function
- **2 levels** of nesting maximum
- **200 lines maximum** per file
- **80% minimum** test coverage

#### 4. Security by Default
- No secrets in code
- No secrets in client environment variables
- Dependency scanning
- Mandatory pre-commit hooks
- CI/CD enforcement

#### 5. Code Reviews are Mandatory
All commits require review before push, with blocking based on severity.

---

## 🚀 Quick Installation

### Install Toolkit

```bash
# Clone bootstrap repo
git clone https://github.com/alinaqi/claude-bootstrap.git ~/.claude-bootstrap

# Install
cd ~/.claude-bootstrap && ./install.sh
```

### Initialize New Project

```bash
# In your project directory
claude

# Then in Claude
/initialize-project
```

**Claude will**:
1. ✅ Validate available tooling
2. 🔧 Ask configuration questions
3. 📁 Create repository structure
4. 📋 Establish specs for first features

---

## 🔄 Ralph Wiggum: Automatic Iterative Loops

### Concept

**Ralph Wiggum** is a plugin that automatically manages iteration loops. Named after the Simpsons character, it embodies **"iteration > perfection"**.

### Installation

```bash
/plugin install ralph-loop@claude-plugins-official
```

If path error occurs, create symlink to resolve marketplace naming mismatch.

### Automatic Behavior

| Scenario | Ralph's Behavior |
|----------|------------------|
| "Add user authentication" | Loops until auth tests pass |
| "Fix login bug" | Finds test gap → writes test → loops until fixed |
| "Build REST API for todos" | Loops until all endpoint tests pass |
| "Refactor auth module" | Loops with tests as safety net |

### Opt-Out

To disable automatic iteration, use explicit phrases:
- "Just explain..."
- "Quick fix without loop..."
- "Don't loop..."

### Benefits

- **Complete autonomy**: Claude iterates alone until success
- **Zero manual management**: No need to say "continue" or "fix that"
- **Safety net**: Tests guarantee quality at each iteration
- **Flow state**: Focus on requirements, not execution

---

## 📊 Commit Hygiene & PR Size Management

### Automatic Monitoring

Claude automatically monitors changes and recommends commits based on thresholds:

| State | Threshold | Action |
|-------|-----------|--------|
| 🟢 **Green** | ≤5 files, ≤200 lines | Optimal commit size |
| 🟡 **Yellow** | 6-10 files, 201-400 lines | Consider committing soon |
| 🔴 **Red** | >10 files, >400 lines | Commit IMMEDIATELY |

### PR Size Research

Studies show dramatic increase in defect rates with PR size:

| PR Size | Defect Rate | Reason |
|---------|-------------|---------|
| ≤200 lines | ~15% | Thorough review possible |
| 201-400 lines | ~25% | Attention begins to decline |
| >400 lines | ~40%+ | Inadequate review guaranteed |

### Atomic Commit Principle

> "If you need 'and' to describe your commit, split it"

**Examples**:

❌ Bad:
```
"Add auth feature and fix cart bug and refactor utils"
```

✅ Good:
```
Commit 1: "feat: Add JWT authentication"
Commit 2: "fix: Fix cart total calculation"
Commit 3: "refactor: Extract common utility functions"
```

---

## 🏗️ Multi-Repo Workspace Awareness

### Concept

For projects with multiple repos (microservices, monorepos, etc.), Claude must understand complete topology.

### Analysis Command

```bash
/analyze-workspace
```

### Generated Artifacts

| Artifact | Purpose |
|----------|---------|
| `TOPOLOGY.md` | Module roles and tech stacks |
| `CONTRACTS.md` | API endpoints and shared types |
| `DEPENDENCY_GRAPH.md` | Cross-module call hierarchy |
| `KEY_FILES.md` | Context loading recommendations |
| `CROSS_REPO_INDEX.md` | Cross-repo search capabilities |

### Freshness Verification

Automatic contract checks:
- **Session start**: ~5s
- **Post-commit**: ~15s
- **Pre-push**: ~10s

### Workspace Structure

```
workspace/
├── backend-api/
│   ├── .claude/
│   │   └── workspace.md          # Workspace config
│   ├── TOPOLOGY.md
│   └── CONTRACTS.md
├── frontend-web/
│   ├── .claude/
│   │   └── workspace.md
│   └── CONTRACTS.md (consumer)
├── mobile-app/
│   └── CONTRACTS.md (consumer)
└── shared-types/
    └── index.ts                   # Shared types
```

### Benefits

- **API consistency**: Automatically synchronized contracts
- **Breaking change detection**: Pre-push checks
- **Optimized context loading**: KEY_FILES.md guides Claude
- **Cross-repo navigation**: CROSS_REPO_INDEX.md enables search

---

## 🔍 Mandatory Code Review

### Command

```bash
/code-review
```

**Automatic execution**: Every push requires review.

### Severity System

| Level | Icon | Blocks Push | Examples |
|-------|------|-------------|----------|
| **Critical** | 🔴 | YES | SQL injection, hardcoded credentials |
| **High** | 🟠 | YES | XSS, exposed secrets, N+1 queries |
| **Medium** | 🟡 | NO (advisory) | High cyclomatic complexity |
| **Low** | 🟢 | NO (advisory) | Inconsistent style, naming |

### Install Pre-Push Hooks

```bash
~/.claude/install-hooks.sh
```

Hook automatically blocks pushes with Critical/High findings.

### Review Categories

#### 1. Security
- SQL injection
- XSS (Cross-Site Scripting)
- CSRF
- Exposed secrets
- Missing input validation
- Unsafe deserialization

#### 2. Performance
- N+1 queries
- Inefficient loops
- Unnecessary data loading
- Missing indexing
- Potential memory leaks

#### 3. Architecture
- Violations of established patterns
- Tight coupling
- Poorly defined responsibilities
- Missing abstractions
- Logic duplication

#### 4. Code Quality
- Excessive complexity (>20 lines/function)
- Too many parameters (>3)
- Deep nesting (>2 levels)
- Missing tests
- Coverage <80%

### Workflow with Review

```
1. Make code changes
   ↓
2. Claude monitors (commit hygiene)
   ↓
3. Suggests commit (optimal size)
   ↓
4. You commit
   ↓
5. Ready to push
   ↓
6. Automatic /code-review
   ↓
7a. Critical/High found → BLOCKED
7b. Only Medium/Low → Advisory, can push
   ↓
8. Fix if blocked, re-review
   ↓
9. Push authorized
```

---

## 👥 Team Coordination

### Multi-Person Detection

```bash
/check-contributors
```

Claude detects project scope and establishes shared state management if needed.

### Structure Created

```
_project_specs/team/
├── state.md              # Active contributors, claimed todos, conflicts
├── contributors.md       # Team members, ownership, focus areas
└── handoffs/
    ├── alice-to-bob.md   # Handoff context
    └── bob-to-carol.md
```

### Coordination Features

#### 1. Todo Claiming

**Before working**:
```bash
/claim-todo "Implement JWT auth"
```

**Claude updates** `state.md`:
```markdown
## Active Work

- **alice**: Implement JWT auth (claimed 2024-02-01 14:30)
- **bob**: Fix cart bug (claimed 2024-02-01 15:00)
```

**Benefit**: Prevents duplicate work.

#### 2. Active Session Visibility

`state.md` shows who's working on what in real-time.

#### 3. Conflict Warnings

If two people modify same area:
```
⚠️ WARNING: bob is also working on auth module.
Consider coordinating before continuing.
```

#### 4. Handoff Notes

**Before finishing session**:
```bash
/create-handoff "alice" "bob"
```

**Generates** `handoffs/alice-to-bob.md`:
```markdown
# Handoff: alice → bob

**Date**: 2024-02-01

## What I Did
- Implemented JWT token generation
- Tests pass for login flow

## What Remains
- Refresh token logic
- Token expiration handling

## Important Decisions
- Used RS256 (not HS256) for better security
- Tokens valid 15 minutes

## Gotchas
- Secret key MUST be in .env, not code
- Tests require MOCK_AUTH_SECRET in env
```

#### 5. Shared Decision Tracking

`contributors.md` tracks major decisions:
```markdown
## Architectural Decisions

1. **Auth Strategy**: JWT with RS256 (alice, 2024-02-01)
2. **Database**: PostgreSQL (bob, 2024-01-28)
3. **API Pattern**: REST not GraphQL (team discussion, 2024-01-25)
```

---

## 🔄 Code Deduplication

### The Problem

**AI reimplements** rather than copying, creating **duplicate PURPOSE** despite unique implementations.

**Example**:
```javascript
// File A - by Alice
function validateUserEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// File B - by Claude (later)
function checkEmailFormat(emailAddress) {
    const emailRegex = /^[\w.-]+@[\w.-]+\.\w+$/;
    return emailRegex.test(emailAddress);
}
```

**Same PURPOSE**: validate email. **Different implementations**.

### Prevention

#### 1. Check CODE_INDEX.md Before Writing

**Workflow**:
```
Claude wants to create function → Check CODE_INDEX.md → Similar function exists?
   ↓ YES                                              ↓ NO
   Extend existing                                    Create new
```

#### 2. Codebase Search

Before creation, search for similar implementations:
```bash
# Search for email validation
grep -r "email.*valid" src/
grep -r "validate.*email" src/
```

#### 3. Extend vs Create

**Prefer**: Extend existing function with additional parameters

**Rather than**: Create new function with similar behavior

### Code Index Maintenance

#### Regeneration

```bash
/update-code-index
```

**Recommended frequency**:
- After adding major features
- Weekly in active projects
- Post-refactor

#### Duplicate Audit

```bash
/audit-duplicates
```

**Output**:
```
🔍 Duplicate Functions Found:

1. validateUserEmail (utils/validation.ts:12)
   checkEmailFormat (helpers/email.ts:45)
   → Similarity: 95% (same purpose: email validation)
   → Recommendation: Merge into utils/validation.ts

2. formatCurrency (utils/money.ts:8)
   displayPrice (components/Price.tsx:23)
   → Similarity: 90% (same purpose: currency formatting)
   → Recommendation: Extract to shared utils
```

### Semantic Search (Large Codebases)

For projects >100 files, integrate vector database:

**Options**:
- **ChromaDB** (Python-friendly)
- **LanceDB** (TypeScript-friendly)

**Setup**:
```bash
/setup-semantic-search chromadb
```

**Usage**:
```bash
# Semantic search
/search-similar "validate email address"

# Returns functions with similar PURPOSE
```

---

## 📁 Created Project Structure

### Complete Tree

```
your-project/
├── .claude/
│   └── skills/                    # Coding guardrails
│       ├── base.md                # Universal patterns
│       ├── security.md            # Security requirements
│       ├── typescript.md          # TypeScript-specific
│       ├── react-web.md           # React-specific
│       └── [framework].md         # Other frameworks
│
├── .github/
│   └── workflows/
│       ├── quality.yml            # Lint, type-check, tests (80% coverage)
│       └── security.yml           # Secret scanning, dependency audit
│
├── _project_specs/
│   ├── overview.md                # Project vision
│   ├── features/
│   │   ├── auth.md                # Auth feature spec
│   │   └── payments.md            # Payments feature spec
│   ├── todos/
│   │   ├── todo-001.md            # Atomic todo with test cases
│   │   └── todo-002.md
│   └── team/                      # If multi-person
│       ├── state.md
│       ├── contributors.md
│       └── handoffs/
│
├── docs/
│   ├── architecture.md            # Architectural decisions
│   ├── api.md                     # API documentation
│   └── deployment.md              # Deployment guide
│
├── scripts/
│   ├── verify-tooling.sh          # CLI validation
│   ├── security-check.sh          # Pre-commit security
│   └── setup-dev.sh               # Dev environment setup
│
├── src/
│   ├── [source code]
│   └── tests/
│       └── [tests with 80% coverage]
│
├── .env.example                   # Environment variables template
├── .gitignore                     # Includes .env
├── CLAUDE.md                      # Instructions for Claude
├── CODE_INDEX.md                  # Capabilities index
├── TOPOLOGY.md                    # If multi-repo
├── CONTRACTS.md                   # If multi-repo
└── README.md                      # Project documentation
```

### Key Files

#### CLAUDE.md

```markdown
# Project Instructions

## Stack
- TypeScript + Node.js
- React frontend
- PostgreSQL database

## Coding Standards
- Max 20 lines per function
- Max 3 parameters per function
- 80% test coverage minimum

## Security
- NO secrets in code
- ALL API keys in .env
- Pre-commit security checks enforced

## Workflow
- TDD: RED → RUN → GREEN → RUN → VALIDATE
- Atomic commits (use commit hygiene)
- Code review before push

## DO NOT
- Skip tests
- Commit without review
- Use any, ignore TypeScript errors
- Disable linters
```

#### CODE_INDEX.md

```markdown
# Code Capabilities Index

## Authentication
- `validateJWT(token)` - src/auth/jwt.ts:12
- `generateToken(userId)` - src/auth/jwt.ts:45
- `refreshToken(oldToken)` - src/auth/jwt.ts:78

## Validation
- `validateEmail(email)` - src/utils/validation.ts:5
- `validatePassword(pwd)` - src/utils/validation.ts:18
- `validateURL(url)` - src/utils/validation.ts:31

## Database
- `connectDB()` - src/db/connection.ts:8
- `executeQuery(sql, params)` - src/db/query.ts:15
- `transaction(callback)` - src/db/transaction.ts:22

[Auto-generated by /update-code-index]
Last updated: 2024-02-01
```

---

## 🧪 TDD Development Workflow

### Feature Workflow

#### Phase Structure

```
1. RED    : Write tests from acceptance criteria
2. RUN    : Execute tests—ALL MUST FAIL
3. GREEN  : Implement minimum code to pass
4. RUN    : Execute tests—ALL MUST PASS
5. VALIDATE : Lint + TypeCheck + Coverage ≥80%
```

**Critical**: Tests MUST fail first to prove they actually validate requirements.

#### Bug Workflow

```
1. Identify test gap
2. Write failing test reproducing bug
3. Execute test—MUST FAIL
4. Fix bug
5. Execute test—MUST PASS
6. Full test suite + Lint + TypeCheck
```

### Complete Example

**Feature**: Add email validation

#### Phase RED

```typescript
// tests/validation.test.ts
describe('validateEmail', () => {
    it('should accept valid email', () => {
        expect(validateEmail('user@example.com')).toBe(true);
    });

    it('should reject invalid email', () => {
        expect(validateEmail('invalid-email')).toBe(false);
    });

    it('should reject empty string', () => {
        expect(validateEmail('')).toBe(false);
    });
});
```

#### Phase RUN (must fail)

```bash
npm test

FAIL  tests/validation.test.ts
  validateEmail
    ✗ should accept valid email (5 ms)
    ✗ should reject invalid email (2 ms)
    ✗ should reject empty string (1 ms)

Error: validateEmail is not defined
```

✅ **GOOD**: Tests fail as expected.

#### Phase GREEN

```typescript
// src/utils/validation.ts
export function validateEmail(email: string): boolean {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

#### Phase RUN (must pass)

```bash
npm test

PASS  tests/validation.test.ts
  validateEmail
    ✓ should accept valid email (3 ms)
    ✓ should reject invalid email (2 ms)
    ✓ should reject empty string (1 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Coverage:    100%
```

✅ **GOOD**: All tests pass.

#### Phase VALIDATE

```bash
npm run lint && npm run type-check && npm test -- --coverage

✓ Lint passed
✓ Type-check passed
✓ Tests passed (coverage: 100%)
```

✅ **COMPLETE**: Feature validated.

### Ralph Wiggum + TDD

With Ralph, this workflow is **automatic**:

```
You: "Add email validation with tests"
   ↓
Ralph:
   1. Generate tests (RED)
   2. Verify they fail (RUN)
   3. Implement function (GREEN)
   4. Verify they pass (RUN)
   5. Run lint/type-check (VALIDATE)
   6. If failure, return to appropriate step
   ↓
Done: Complete feature with passing tests
```

**You do nothing** after the initial request.

---

## 🔐 Security: Centralized Credentials Management

### The Problem

Credentials scattered everywhere:
- Multiple config files
- Copy-paste between projects
- Forget to gitignore
- Accidentally exposed secrets

### The Solution: Single Source of Truth

**Single file**: `~/Documents/Access.txt` (or other personal location)

```
# API Keys
OpenAI API: sk-proj-abc123xyz
Claude API: sk-ant-def456uvw
Stripe Test: sk_test_ghi789rst
Stripe Live: sk_live_jkl012mno

# Database
Supabase URL: https://abc123.supabase.co
Supabase Anon Key: eyJhbGci...
PostgreSQL: postgres://user:pass@host:5432/db

# Third-party Services
SendGrid API Key: SG.abc123
Twilio SID: AC123abc
Twilio Token: def456xyz

# OAuth
GitHub Client ID: Iv1.abc123
GitHub Secret: def456ghi789
Google Client ID: 123-abc.apps.googleusercontent.com
Google Secret: GOCSPX-xyz789
```

### Automatic Detection

Claude detects keys by **patterns**:

| Service | Pattern | Detection |
|---------|---------|-----------|
| OpenAI | `sk-proj-*` | ✅ Auto |
| Claude | `sk-ant-*` | ✅ Auto |
| Stripe | `sk_test_*` or `sk_live_*` | ✅ Auto |
| Supabase | URL + JWT key | ✅ Auto |
| PostgreSQL | Connection string | ✅ Auto |
| Generic | Explicit labels | ✅ Auto |

### Automated Workflow

#### 1. New Project Needs Credentials

```
Claude: "I need an OpenAI key for this project"
   ↓
Claude reads ~/Documents/Access.txt
   ↓
Claude finds: OpenAI API: sk-proj-abc123xyz
   ↓
Claude creates .env:
OPENAI_API_KEY=sk-proj-abc123xyz
   ↓
Claude verifies .gitignore includes .env
```

**You never intervene**.

#### 2. Key Validation

```
Claude detects key → Tests validity → Confirms or alerts
```

**Examples**:
```bash
# OpenAI
curl https://api.openai.com/v1/models -H "Authorization: Bearer $KEY"

# Stripe
curl https://api.stripe.com/v1/charges -u $KEY:
```

If key invalid: **Immediate alert**.

#### 3. Automatic .env Creation

**Template detected** from project:
```bash
# .env.example
OPENAI_API_KEY=
STRIPE_KEY=
DATABASE_URL=
```

**Claude fills** from Access.txt:
```bash
# .env (generated)
OPENAI_API_KEY=sk-proj-abc123xyz
STRIPE_KEY=sk_test_ghi789rst
DATABASE_URL=postgres://user:pass@host:5432/db
```

### Non-Negotiable Rules

#### ❌ NEVER

1. **Secrets in code**
   ```typescript
   // ❌ WRONG
   const apiKey = 'sk-proj-abc123xyz';
   ```

2. **Secrets in client variables**
   ```typescript
   // ❌ WRONG
   const apiKey = process.env.VITE_OPENAI_KEY;    // Exposed to client!
   const key = process.env.NEXT_PUBLIC_API_KEY;   // Exposed to client!
   ```

3. **Secrets in version control**
   ```bash
   // ❌ WRONG
   git add .env
   ```

#### ✅ ALWAYS

1. **Secrets in .env**
   ```typescript
   // ✅ CORRECT (backend only)
   const apiKey = process.env.OPENAI_API_KEY;
   ```

2. **.env in .gitignore**
   ```
   # .gitignore
   .env
   .env.local
   .env.*.local
   ```

3. **Pre-commit validation**
   ```bash
   # scripts/security-check.sh
   # Search for secret patterns
   ```

### Security Pre-commit Hook

**Installation**:
```bash
~/.claude/install-hooks.sh
```

**Hook script**: `.git/hooks/pre-commit`
```bash
#!/bin/bash

echo "🔐 Running security checks..."

# Search for secret patterns
if git diff --cached | grep -E "(sk-proj-|sk-ant-|sk_test_|sk_live_)"; then
    echo "❌ ERROR: API key detected in staged changes"
    echo "Remove secrets before committing"
    exit 1
fi

# Check .env not staged
if git diff --cached --name-only | grep -E "^\.env"; then
    echo "❌ ERROR: .env file is staged"
    echo "Never commit .env files"
    exit 1
fi

echo "✅ Security checks passed"
exit 0
```

---

## 📋 Included Skills & Commands (53 Total)

### Core Skills (14)

| Skill | Description |
|-------|-------------|
| `base` | Universal patterns (20 lines/function, 3 params max) |
| `iterative-development` | Strict TDD workflow |
| `code-review` | Automatic review with severity |
| `codex-review` | Review via Codex (alternative) |
| `gemini-review` | Review via Gemini (alternative) |
| `workspace` | Multi-repo awareness |
| `commit-hygiene` | Commit size monitoring |
| `code-deduplication` | Duplicate prevention |
| `team-coordination` | Shared team state |
| `security` | Strict security rules |
| `credentials` | Centralized secret management |
| `session-management` | Handoffs and continuity |
| `project-tooling` | Tooling validation |
| `existing-repo` | Existing repo integration |

### Language Skills (8)

- `python` - Python best practices
- `typescript` - TypeScript strict mode
- `nodejs-backend` - Node.js backend patterns
- `react-web` - React web apps
- `react-native` - React Native mobile
- `android-java` - Android Java patterns
- `android-kotlin` - Android Kotlin patterns
- `flutter` - Flutter cross-platform

### UI Skills (6)

- `ui-web` - Web UI patterns
- `ui-mobile` - Mobile UI patterns
- `ui-testing` - UI test automation
- `playwright-testing` - Playwright E2E
- `user-journeys` - User flow testing
- `pwa-development` - Progressive Web Apps

### AI Skills (3)

- `agentic-development` - Building AI agents
- `llm-patterns` - LLM integration patterns
- `ai-models` - Model selection & usage

### Database & Backend Skills

Architecture-specific patterns for various stacks (20+ skills).

### Loading Skills

```bash
# In your project
/load-skill typescript react-web playwright-testing
```

Claude automatically loads relevant skills during `/initialize-project`.

---

## 🎯 Complexity Constraints

### Strict Limits

| Constraint | Limit | Rationale |
|-----------|-------|-----------|
| **Lines per function** | 20 max | Readability, testability |
| **Parameters per function** | 3 max | Cognitive complexity |
| **Nesting depth** | 2 levels max | Avoid callback hell |
| **Lines per file** | 200 max | Single responsibility |
| **Test coverage** | 80% minimum | Confidence in code |

### Automatic Enforcement

#### 1. Linting Rules

```json
// .eslintrc.json
{
    "rules": {
        "max-lines-per-function": ["error", { "max": 20 }],
        "max-params": ["error", 3],
        "max-depth": ["error", 2],
        "max-lines": ["error", { "max": 200 }]
    }
}
```

#### 2. Pre-commit Validation

```bash
# .git/hooks/pre-commit
npm run lint || exit 1
npm test -- --coverage --coverageThreshold='{"global":{"lines":80}}' || exit 1
```

#### 3. CI/CD Gates

```yaml
# .github/workflows/quality.yml
- name: Check complexity
  run: |
    npm run lint
    npm test -- --coverage
    if [ $(cat coverage/coverage-summary.json | jq '.total.lines.pct') -lt 80 ]; then
      echo "Coverage below 80%"
      exit 1
    fi
```

### Philosophy

> "If the entire system cannot be understood in one development session, it has become too complex"

**Implication**:
- Refactor aggressively
- Extract functions/modules early
- Favor composition over complexity

---

## 🚀 Unique Innovations

### 1. Agentic Ad Optimization

Background service running every 4-6h for automated Reddit campaigns.

**Cycle**:
```
1. Analyze performance metrics
   ↓
2. Identify underperforming ads
   ↓
3. Execute optimization actions:
   - Pause low CTR ads
   - Scale high ROI ads
   - Adjust bids
   - Rotate creatives
   ↓
4. Log decisions
   ↓
5. Repeat cycle
```

**Without human intervention**.

### 2. Ralph Wiggum Philosophy

> "Iteration > Perfection"

Named after Simpsons character, framework allows Claude to:
- Iterate **autonomously** until requirements satisfied
- No need for "continue" or "fix that" prompts
- Flow state for developer

### 3. Visual Testing Integration

Via `playwright-testing` skill, catch invisible issues:
- Invisible buttons (text color == background color)
- Broken layouts
- Contrast problems
- Responsive issues

**Automatic tests** with screenshot comparison.

### 4. Pre-push Hook Integration

Security review gates automatically blocking Critical/High findings.

**Workflow**:
```
git push
   ↓
Pre-push hook triggered
   ↓
/code-review automatically
   ↓
Critical found? → BLOCKED
   ↓
Dev must fix before push
```

---

## 📊 Impact Summary

### 🔥 Maximum Impact

1. **Ralph Wiggum loops** - Autonomous development
2. **Commit hygiene** - Small, reviewable PRs
3. **Code review gates** - Guaranteed quality
4. **Strict TDD** - Confidence in code
5. **Constraints enforcement** - Controlled complexity

### ⚡ High Impact

1. **Multi-repo awareness** - Cross-module consistency
2. **Team coordination** - Fluid collaboration
3. **Deduplication system** - DRY maintained
4. **Centralized credentials** - Simplified security
5. **Visual testing** - UI quality assurance

### 💎 Innovation Territory

1. **Agentic optimization** - Self-managing systems
2. **Semantic search** - Find by purpose, not name
3. **Contract freshness** - Always-synced APIs
4. **Atomic todo system** - Perfect granularity

---

## 🎓 Setup Checklist

### Initial Setup

- [ ] Clone claude-bootstrap repo
- [ ] Install with `./install.sh`
- [ ] Install Ralph Wiggum plugin
- [ ] Configure Access.txt with credentials
- [ ] Create personal project template

### New Project

- [ ] `/initialize-project` in project directory
- [ ] Validate tooling (node, git, etc.)
- [ ] Answer configuration questions
- [ ] Verify created structure
- [ ] Load relevant skills
- [ ] Create first feature spec
- [ ] Write first tests (RED)

### Team Setup (if applicable)

- [ ] `/check-contributors` to init team mode
- [ ] Document ownership in contributors.md
- [ ] Establish todo claiming workflow
- [ ] Configure handoff notifications
- [ ] Define decision-making process

### Security Hardening

- [ ] Install pre-commit hooks
- [ ] Configure CI/CD security scans
- [ ] Validate .env in .gitignore
- [ ] Test pre-push review gate
- [ ] Initial audit with `/code-review`

### Multi-Repo (if applicable)

- [ ] `/analyze-workspace` in each repo
- [ ] Create TOPOLOGY.md
- [ ] Define CONTRACTS.md
- [ ] Setup contract freshness checks
- [ ] Document KEY_FILES.md

---

## 🔗 Resources

### Main Repo

- **claude-bootstrap**: https://github.com/alinaqi/claude-bootstrap

### Complementary Documentation

- [Advanced Patterns](../patterns-avances/README.md) - Context engineering
- [50 Best Practices](../bonnes-pratiques/README.md) - Expert tips
- [Tips & Techniques](../astuces-techniques/README.md) - Community tips
- [Configuration](../configuration/README.md) - Setup hooks and settings

### Research & Philosophy

- **PR Size vs Defects**: Studies from Google, Microsoft engineering blogs
- **TDD Effectiveness**: "Test-Driven Development by Example" - Kent Beck
- **Complexity Metrics**: Cyclomatic complexity research

---

*Workflow & bootstrap guide updated: February 2026*
