# Claude Hooks System

Hook scripts that fire on Claude Code events for the Whole Knowledge Architecture project.

## Hook Types

| Hook File | Event | Purpose | Exit Code |
|-----------|-------|---------|-----------|
| `session-init.cjs` | SessionStart | Display progress, key rules | Always 0 |
| `dev-rules-reminder.cjs` | UserPromptSubmit | Inject session context | Always 0 |
| `progress-indicator.cjs` | PostToolUse | Tool completion feedback | Always 0 |
| `validate-edit.cjs` | PostToolUse | Whole.md edit validation | Always 0 |

## Shared Utilities

`lib/ck-config-utils.cjs` provides:

### Progress & Git
- `loadProgress()` - Load .whole-progress.json
- `saveProgress()` - Save progress data
- `getGitBranch()` - Get current git branch
- `getGitStatus()` - Get staged/unstaged counts

### Security (Phase 3)
- `sanitizeSessionId()` - Sanitize session ID for filesystem
- `validateHookInput()` - Validate JSON input structure
- `validateFunctionNumber()` - Validate CLI function number
- `escapeRegex()` - Escape special regex characters

### Formatting
- `COLORS` - ANSI color codes
- `colorize()` - Apply color to text
- `formatDateVN()` - Format date for Vietnamese locale

## Testing Hooks

```bash
# Test session-init
echo '{"source":"startup","session_id":"test123"}' | node session-init.cjs

# Test progress-indicator
echo '{"tool_name":"Read","tool_parameters":{"file_path":"test.md"}}' | node progress-indicator.cjs

# Test path traversal protection (security)
echo '{"session_id":"../../../etc/passwd"}' | node session-init.cjs
# Should sanitize to safe value
```

## Stdin Contract

All hooks receive JSON via stdin:

| Field | Type | Description |
|-------|------|-------------|
| `source` | string | Event source (startup/resume/clear/compact) |
| `session_id` | string | Unique session identifier |
| `tool_name` | string | Tool that executed |
| `tool_parameters` | object | Tool parameters |
| `tool_input` | object | Tool input data |

## Error Handling

All hooks `exit(0)` to prevent blocking Claude operations:
- Parse errors caught silently
- Missing fields use defaults
- Invalid input sanitized automatically

## Directory Structure

```
hooks/
├── README.md                 # This file
├── session-init.cjs          # SessionStart hook (v2.1.0)
├── dev-rules-reminder.cjs    # UserPromptSubmit hook
├── progress-indicator.cjs    # PostToolUse feedback
├── validate-edit.cjs         # Whole.md validation (v2.1.0)
├── lib/
│   └── ck-config-utils.cjs   # Shared utilities
├── docs/
│   └── README.md             # Hook system guide
└── git-hooks/
    ├── README.md             # Git hooks guide
    └── pre-commit.template   # Documentation validation hook
```

## Version History

- **v2.1.0** - Updated for agents v2.1.0 integration
  - session-init: Added missing commands (/reconcile, /next, /report)
  - validate-edit: Suggest validation scripts/commands after edits
- **v2.0.0** - Merged hooks, DRY refactoring, security hardening
- **v1.0.0** - Initial hook system
