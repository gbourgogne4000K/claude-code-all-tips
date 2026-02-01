# Practical Examples

## Common Use Cases

### 1. Create a Git Commit

#### Simple Request
```
User: Create a commit with my changes
```

#### What Claude Does
1. Executes `git status`
2. Executes `git diff`
3. Analyzes changes
4. Stages relevant files
5. Creates commit with appropriate message

### 2. Create a Pull Request

```
User: Create a PR for this feature
```

#### Workflow
1. Analyzes git history since divergence
2. Generates title and description
3. Pushes to remote if needed
4. Creates PR via `gh`

### 3. Codebase Search

```
User: Where are client errors handled?
```

#### Approach
- Uses Task with Explore agent
- Searches across multiple files
- Returns locations with `file:line` references

### 4. Feature Implementation

```
User: Add user authentication
```

#### Process with EnterPlanMode
1. Enters Plan mode
2. Explores existing architecture
3. Proposes an approach
4. Awaits validation
5. Implements according to plan

### 5. Debug and Fix

```
User: Fix the bug in the checkout function
```

#### Workflow
1. Reads the relevant code
2. Identifies the problem
3. Proposes a fix
4. Tests if possible

## Best Practices

### Effective Communication
- Be specific
- Provide context
- Mention constraints

### Project Management
- Use TodoWrite for complex tasks
- Validate approach before implementation
- One task at a time in `in_progress`

### Security
- Claude avoids common vulnerabilities (XSS, SQL injection, etc.)
- Always validate at system boundaries
- No secrets in commits

## Anti-Patterns to Avoid

### Over-Engineering
- Don't add unrequested features
- Keep solutions simple
- No premature abstraction

### Misuse of Tools
- Don't use Bash to read files (use Read)
- Don't use echo to communicate (output directly)
- Prefer specialized tools

## Next Steps

If you encounter issues, consult the [troubleshooting guide](../troubleshooting/README.md).
