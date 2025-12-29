# Whole Project Workflows

Navigation hub for workflow documentation.

## Workflow Quick Reference

| Workflow | Purpose | When to Use |
|----------|---------|-------------|
| [primary-workflow.md](./primary-workflow.md) | Main operational workflow | New to Whole project |
| [editing-workflow.md](./editing-workflow.md) | Content editing process | Editing Whole.md |
| [quality-assurance.md](./quality-assurance.md) | QA validation | Before commit |
| [development-rules.md](./development-rules.md) | Dev principles | Reference |

## Common Tasks

### Adding New Content
1. Start with `primary-workflow.md`
2. Follow `editing-workflow.md` for changes
3. Run validation before commit (see `quality-assurance.md`)

### Regrouping Functions
1. Use `/regroup [number]` command
2. Skill guides through: Grep → Read → Analyze → Edit → Commit
3. Validation runs automatically before commit

### Reconciling Mismatches
1. Use `/reconcile [number]` command
2. Compares Tổng Quan ↔ Content representations
3. Follow intelligent analysis recommendations

## Available Commands

| Command | Description |
|---------|-------------|
| `/status` | Show progress (50/50 complete) |
| `/regroup [num]` | Regroup function concepts |
| `/reconcile [num]` | Sync Tổng Quan ↔ Content |
| `/edit [section]` | Start editing session |
| `/analyze [section]` | Analyze for issues |
| `/validate [section]` | Validate changes |

## Cross-References

- **Skills:** `.claude/skills/` - whole-editor, whole-analyzer, whole-reviewer, whole-regrouper
- **Hooks:** `.claude/hooks/` - Session init, progress indicator, validation
- **Docs:** `docs/` - Project documentation

## Key Principles

1. **Only Add, Never Subtract** - Preserve all existing content
2. **Bilingual First** - Vietnamese primary, English secondary
3. **4-Point Structure** - Definition, Context, Application, Integration
4. **Cross-Reference Integrity** - Bidirectional links required

## Project Status

- **Progress:** 50/50 functions (100% complete)
- **Completion Date:** 2025-12-27
- **Total Concepts:** 2,072
- **Total Groups:** 371
