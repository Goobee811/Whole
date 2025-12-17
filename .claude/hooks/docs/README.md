# Whole Hooks System

Documentation for Claude Code hooks in the Whole Knowledge Architecture project.

## Overview

Hooks are scripts that run automatically in response to Claude Code events. They provide:
- Session context and reminders
- Progress tracking integration
- Edit validation and quality checks

## Available Hooks

### session-init.cjs

**Trigger**: SessionStart (startup, resume, clear, compact)

**Purpose**:
- Display current progress from `.whole-progress.json`
- Show key rules and available commands
- Provide session context (branch, last activity)

**Output Example**:
```
Session startup. Whole Knowledge Architecture
Progress: 8/50 (16%) | Next: CF9 | Branch: main

Key Rules:
 1. Only Add, Never Subtract
 2. Bilingual: Vietnamese primary, English secondary
 3. 4-Point Structure: Definition, Context, Application, Integration
```

### dev-rules-reminder.cjs

**Trigger**: UserPromptSubmit

**Purpose**:
- Inject contextual reminders on every user prompt
- Keep key rules visible during editing sessions
- Show current work status

### validate-edit.cjs

**Trigger**: PostToolUse (Edit, Write)

**Purpose**:
- Validate edits to Whole.md
- Warn about potential content deletion
- Check bilingual format compliance

## Shared Utilities

### lib/ck-config-utils.cjs

Common functions used across hooks:

| Function | Description |
|----------|-------------|
| `loadProgress()` | Load `.whole-progress.json` |
| `saveProgress(data)` | Save progress file |
| `getGitBranch()` | Get current branch name |
| `getGitStatus()` | Get git status summary |
| `calcPercentage(n, total)` | Calculate completion % |
| `formatDateVN(date)` | Format date for Vietnamese locale |
| `wholeExists()` | Check if Whole.md exists |
| `colorize(text, color)` | Add ANSI color to text |

## Configuration

Hooks are configured in `.claude/settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/session-init.cjs"
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/dev-rules-reminder.cjs"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "node .claude/hooks/validate-edit.cjs"
          }
        ]
      }
    ]
  }
}
```

## Creating New Hooks

1. Create `.cjs` file in `.claude/hooks/`
2. Use shebang: `#!/usr/bin/env node`
3. Read stdin for hook data: `JSON.parse(fs.readFileSync(0, 'utf-8'))`
4. Always exit cleanly: `process.exit(0)`
5. Import shared utils: `require('./lib/ck-config-utils.cjs')`
6. Add hook to `settings.json`

## Error Handling

Hooks should:
- Never block operations on error
- Exit with code 0 even on failure
- Log errors to stderr if needed
- Keep output concise

## Testing Hooks

```bash
# Test session-init
echo '{"source":"startup"}' | node .claude/hooks/session-init.cjs

# Test dev-rules-reminder
node .claude/hooks/dev-rules-reminder.cjs

# Test validate-edit
echo '{"tool_name":"Edit","tool_input":{"file_path":"Whole.md"}}' | node .claude/hooks/validate-edit.cjs
```
