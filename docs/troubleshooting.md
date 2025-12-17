# Troubleshooting Guide

Common issues and solutions when working with Whole Knowledge Architecture.

## File Operations

### Issue: "File too large" or timeout when reading Whole.md

**Cause**: Whole.md is >1MB, reading entire file at once.

**Solution**:
1. Always use `grep` first to find line numbers
2. Use `Read` with `offset` and `limit` parameters
3. Target specific sections, not entire file

```
# Good: Find section first
grep -n "CHUC NANG 9" Whole.md

# Good: Read specific lines
Read Whole.md with offset=1000, limit=500

# Bad: Never do this
Read Whole.md (entire file)
```

### Issue: Edit operation fails

**Cause**: Usually due to ambiguous string matching.

**Solution**:
1. Include more context in `old_string`
2. Use unique markers (line numbers, headers)
3. Read section first to verify content

## Validation Errors

### Issue: "Missing bilingual format"

**Cause**: Header doesn't have proper separator.

**Solution**:
```markdown
# Wrong
#### **1. Concept Name**

# Correct
#### **1. Concept Name - Ten Khai Niem**
```

### Issue: "Only N bullet points (minimum 4 required)"

**Cause**: 4-point structure not complete.

**Solution**:
Ensure each concept has at least 4 bullet points:
- Definition point
- Context point
- Application point
- Integration point

### Issue: "Missing cross-reference section"

**Cause**: No `Lien ket` section in concept.

**Solution**:
Add cross-references:
```markdown
-> **Lien ket:** Domain > Function > Concept
```

## Hooks Issues

### Issue: Hook not firing

**Cause**: Settings.json misconfigured or script error.

**Solution**:
1. Check `.claude/settings.json` for correct hook config
2. Test script manually:
   ```bash
   echo '{"source":"startup"}' | node .claude/hooks/session-init.cjs
   ```
3. Check script for syntax errors

### Issue: Hook output not showing

**Cause**: Script exiting with error or wrong output.

**Solution**:
1. Ensure script uses `console.log()` for output
2. Exit with `process.exit(0)` even on errors
3. Check stderr for error messages

## Progress Tracking

### Issue: Progress not updating

**Cause**: `.whole-progress.json` not being updated.

**Solution**:
1. Check file permissions
2. Verify JSON syntax is valid
3. Update manually if needed

### Issue: Wrong function suggested

**Cause**: `nextSuggested` out of sync.

**Solution**:
1. Check `completedFunctions` array
2. Update `nextSuggested` to correct value
3. Verify domain status is accurate

## Git Issues

### Issue: Push fails with 403

**Cause**: Branch name doesn't match required format.

**Solution**:
Use branch starting with `claude/` and ending with session ID:
```bash
git checkout -b claude/task-description-sessionId
```

### Issue: Pre-commit hook fails

**Cause**: Validation checks not passing.

**Solution**:
1. Run validation manually to see errors
2. Fix identified issues
3. Re-run commit

## Performance Issues

### Issue: Slow responses

**Cause**: Loading too much content at once.

**Solution**:
1. Use targeted searches (grep, glob)
2. Read smaller sections
3. Use Task tool for complex searches

### Issue: Context overflow

**Cause**: Too much content in conversation.

**Solution**:
1. Start new conversation for fresh context
2. Use more targeted queries
3. Break large tasks into smaller steps

## Common Mistakes

| Mistake | Correct Approach |
|---------|------------------|
| Reading entire Whole.md | Use grep + offset/limit |
| Deleting content | Only add, get approval for removal |
| Missing translations | Always include both languages |
| Skipping validation | Validate after every edit |
| Generic commit messages | Use detailed, specific messages |

## Getting Help

1. Check this troubleshooting guide
2. Review workflow documentation
3. Examine skill references
4. Report issues at project repository
