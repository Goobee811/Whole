# Claude Code Configuration for Whole Project

This directory contains custom Agent Skills and configuration for working with the Whole knowledge architecture documentation using Claude Code.

## Structure

```
.claude/
├── CLAUDE.md                    # Project overview and context
├── settings.json                # Claude Code settings
├── README.md                    # This file
├── skills/                      # Custom skills directory
│   ├── whole-editor/            # Main editing skill
│   │   ├── SKILL.md
│   │   └── references/
│   │       ├── editing-protocol.md
│   │       ├── duplicate-resolution.md
│   │       ├── bilingual-rules.md
│   │       └── structure-validation.md
│   ├── whole-analyzer/          # Pre-editing analysis
│   │   └── SKILL.md
│   └── whole-reviewer/          # Post-editing validation
│       └── SKILL.md
├── commands/                    # Slash commands
│   ├── edit.md
│   ├── analyze.md
│   └── expand.md
└── workflows/                   # Workflow definitions
    └── editing-workflow.md
```

## Available Skills

### whole-editor
Main editing skill for Whole documentation. Use when editing, expanding, or refining content.

### whole-analyzer
Pre-editing analysis tool. Use before making changes to understand current state.

### whole-reviewer
Post-editing validation tool. Use after editing to ensure quality standards.

## Available Commands

- `/analyze [section-path]` - Analyze section for issues
- `/edit [section-path]` - Start editing session
- `/expand [domain] [function] [topic]` - Add new concepts

## Workflow

1. **whole-analyzer** → Analyze target section
2. **whole-editor** → Add/expand content based on analysis
3. **whole-reviewer** → Validate changes
4. Commit if approved

## Key Principles

- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual First**: Vietnamese primary, English secondary
- **4-Point Structure**: Definition, Context, Application, Integration
- **Cross-Reference Integrity**: Bidirectional links required
