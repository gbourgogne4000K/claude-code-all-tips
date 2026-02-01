# Troubleshooting

## Common Issues

### Installation

#### Error: "Command not found"
**Cause**: Claude Code is not in PATH
**Solution**:
```bash
# Check installation
npm list -g @anthropic-ai/claude-code

# Reinstall if necessary
npm install -g @anthropic-ai/claude-code
```

#### Permission Issues
[To be completed]

### Configuration

#### Invalid API Key
**Symptom**: Authentication error
**Solution**:
```bash
# Reconfigure API key
claude-code config set api-key YOUR_NEW_API_KEY
```

#### Blocked Hooks
**Symptom**: Actions blocked by hooks
**Solution**:
- Check configuration in `~/.claude/`
- Adjust hook commands
- Ask user to check hooks

### Usage

#### Command Timeout
**Cause**: Command takes too long
**Solution**: Use `timeout` parameter or `run_in_background`

#### File Not Found
**Cause**: Relative path instead of absolute
**Solution**: Always use absolute paths with tools

#### Context Too Large
**Cause**: Reading files that are too large
**Solution**: Use `limit` and `offset` with Read

## Error Messages

### Git Related

#### "No changes to commit"
**Solution**: Verify there are modifications with `git status`

#### "Pre-commit hook failed"
**Solution**:
- Fix the reported issue
- Create a NEW commit (not --amend)

### Tool Related

#### "File not read before edit"
**Solution**: Always Read before Edit/Write

#### "old_string not unique"
**Solution**: Provide more context in old_string or use replace_all

## FAQ

### General

**Q: How do I get help?**
A: Use `/help` or visit https://github.com/anthropics/claude-code/issues

**Q: Can I use Claude Code without internet?**
A: No, Claude Code requires a connection to communicate with the API

### Performance

**Q: How to speed up searches?**
A: Use the Explore agent with `quick` level for fast searches

**Q: Which model to choose?**
A:
- `haiku` - Simple and fast tasks
- `sonnet` - General use (default)
- `opus` - Complex tasks

### Security

**Q: Can Claude execute dangerous commands?**
A: Claude has protections but always asks for confirmation for destructive commands

**Q: How to avoid committing secrets?**
A: Claude avoids staging files like .env, but stay vigilant

## Additional Resources

- Official documentation: [To add]
- GitHub Issues: https://github.com/anthropics/claude-code/issues
- Community: [To add]

## Contributing to the Guide

Found an undocumented issue? Contribute to this guide!
