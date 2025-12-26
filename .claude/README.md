# Claude Code Configuration for Whole Project

This directory contains custom Agent Skills, commands, hooks, and configuration for working with the Whole knowledge architecture documentation using Claude Code.

## Structure

```
.claude/
├── CLAUDE.md                     # Project instructions & context
├── README.md                     # This file
├── settings.json                 # Claude Code settings
│
├── skills/                       # Custom skills
│   ├── whole-editor/             # Main editing skill
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── editing-protocol.md
│   │       ├── duplicate-resolution.md
│   │       ├── bilingual-rules.md
│   │       └── structure-validation.md
│   ├── whole-analyzer/           # Pre-editing analysis
│   │   └── SKILL.md
│   ├── whole-reviewer/           # Post-editing validation
│   │   └── SKILL.md
│   └── whole-regrouper/          # Concept reorganization (v3.0.0)
│       ├── SKILL.md
│       ├── references/
│       │   ├── grouping-principles.md
│       │   ├── workflow-steps.md
│       │   ├── naming-guidelines.md
│       │   ├── quality-checklist.md
│       │   └── robust-operations.md
│       ├── plans/templates/
│       │   └── regroup-template.md
│       └── scripts/
│           └── validate-regroup.js
│
├── commands/                     # Slash commands
│   ├── analyze.md                # /analyze [section]
│   ├── edit.md                   # /edit [section]
│   ├── expand.md                 # /expand [domain] [func] [topic]
│   ├── next.md                   # /next - auto-detect next task
│   ├── regroup.md                # /regroup [number]
│   ├── report.md                 # /report - progress report
│   ├── status.md                 # /status - show progress
│   └── validate.md               # /validate [section]
│
├── hooks/                        # Automation hooks
│   ├── regroup-session-init.cjs  # Session startup hook
│   └── docs/
│       └── README.md
│
├── agents/                       # Task agents
│   ├── whole-content-validator.md
│   ├── whole-cross-reference.md
│   └── whole-translator.md
│
└── workflows/                    # Process guides
    ├── editing-workflow.md
    ├── primary-workflow.md
    ├── development-rules.md
    └── quality-assurance.md
```

## Available Skills

### whole-editor
Main editing skill for Whole documentation. Use when editing, expanding, or refining content.

**Activation**: `/edit [section]`

### whole-analyzer
Pre-editing analysis tool. Use before making changes to understand current state.

**Activation**: `/analyze [section]`

### whole-reviewer
Post-editing validation tool. Use after editing to ensure quality standards.

**Activation**: Automatically after edits

### whole-regrouper (v3.0.0)
Concept reorganization skill with progressive disclosure. Use to reorganize concepts into thematic groups.

**Features**:
- Auto-detects next function to process
- Progressive disclosure (loads references as needed)
- Integrated validation
- Progress tracking

**Activation**: `/regroup [number]` or just `/regroup`

## Available Commands

| Command | Purpose |
|---------|---------|
| `/status` | Show current progress (37/50 functions) |
| `/next` | Auto-detect next function to work on |
| `/analyze [section]` | Analyze section for issues |
| `/edit [section]` | Start editing session |
| `/expand [domain] [func] [topic]` | Add new concepts |
| `/regroup [number]` | Reorganize concepts into groups |
| `/validate [section]` | Validate changes |
| `/report` | Generate comprehensive progress report |

## Agents

### whole-content-validator
Automated content validation after edits. Checks 4-point structure, bilingual integrity, and cross-references.

### whole-translator
Translation assistance for Vietnamese-English with cultural adaptation and terminology consistency.

### whole-cross-reference
Manages bidirectional cross-references. Validates links and detects orphaned references.

## Hooks

### regroup-session-init.cjs
Runs on session startup to display:
- Current progress (X/50 functions)
- Next suggested function
- Last session info

## Workflow

1. **Check Status**: `/status` or `/report`
2. **Identify Task**: `/next` or specify function
3. **Analyze**: `/analyze [section]` (optional)
4. **Execute**: `/regroup`, `/edit`, or `/expand`
5. **Validate**: `/validate [section]`
6. **Commit**: Follow commit message format

## Key Principles

- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual First**: Vietnamese primary, English secondary
- **4-Point Structure**: Definition, Context, Application, Integration
- **Cross-Reference Integrity**: Bidirectional links required

## Progress Tracking

Progress is tracked in `.whole-progress.json`:
- 37/50 functions completed (74%)
- 7 domains complete
- 1,504 concepts processed
- 278 groups created

Use `/status` for quick check or `/report` for detailed report.
