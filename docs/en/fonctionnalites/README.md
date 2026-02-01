# Features

## Available Tools

### File Tools
- **Read** - Read files
- **Write** - Create files
- **Edit** - Modify files
- **Glob** - Search files by pattern
- **Grep** - Search content

### Execution Tools
- **Bash** - Execute shell commands
- **Task** - Launch specialized agents

### Web Tools
- **WebSearch** - Search the web
- **WebFetch** - Fetch web content

### Interactive Tools
- **AskUserQuestion** - Ask questions to the user
- **TodoWrite** - Task management

## Specialized Agents

### Bash Agent
Specialized in terminal command execution.

### Explore Agent
Fast codebase exploration with different depth levels:
- `quick` - Basic search
- `medium` - Moderate exploration
- `very thorough` - Complete analysis

### Plan Agent
Implementation plan design with architectural considerations.

### Other Agents
[To document based on your findings]

## Plan Mode

### When to Use EnterPlanMode
- Important new features
- Multiple possible approaches
- Architectural modifications
- Multi-file tasks
- Uncertain requirements

### Plan Mode Workflow
1. Codebase exploration
2. Approach design
3. User presentation
4. Validation with ExitPlanMode

## Task Management

### TodoWrite
- Task planning
- Progress tracking
- States: `pending`, `in_progress`, `completed`
- Only one `in_progress` task at a time

## Next Steps

Check out [practical examples](../exemples/README.md) to see these features in action.
