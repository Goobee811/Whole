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
│   └── whole-regrouper/          # Concept reorganization (v5.0.0)
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
│   ├── session-init.cjs          # Session startup hook (unified)
│   ├── progress-indicator.cjs    # PostToolUse feedback
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

### whole-regrouper (v5.0.0)
Concept reorganization skill with intelligent analysis and progressive disclosure.

**Features**:
- Intelligent dual-representation analysis (Tổng Quan ↔ Content)
- 4-criterion evaluation (Coherence, Balance, Natural Thinking, Accuracy)
- Strategy options: [A] Tổng Quan→Content, [B] Content→Tổng Quan, [C] Regroup, [H] Hybrid
- Progressive disclosure (loads references as needed)
- Progress tracking

**Activation**: `/regroup [number]` or `/reconcile [number]`

## Available Commands

| Command | Purpose |
|---------|---------|
| `/status` | Show current progress (50/50 - COMPLETE) |
| `/next` | Auto-detect next function to work on |
| `/analyze [section]` | Analyze section for issues |
| `/edit [section]` | Start editing session |
| `/expand [domain] [func] [topic]` | Add new concepts |
| `/regroup [number]` | Full regroup - reorganize concepts into groups |
| `/reconcile [number]` | Sync Tổng Quan ↔ Content (v5.0.0) |
| `/validate [section]` | Validate changes |
| `/report` | Generate comprehensive progress report |

## Agents (Modernized v2.1.0)

### whole-content-validator
**Purpose**: Comprehensive post-editing validation
**Model**: haiku (efficient for validation tasks)
**Integration**: Invoked by whole-reviewer skill
**Features**:
- Executes all validation scripts (validate-structure, bilingual-check, check-cross-refs)
- Supports whole-regrouper v5.0.0 (Tổng Quan preservation, numbering)
- Uses shared utilities (v1.0.0)
- Distinguishes CRITICAL vs WARNING issues
**When to use**: After edits, before commit, for comprehensive validation

### whole-cross-reference
**Purpose**: Bidirectional cross-reference management and graph analysis
**Model**: haiku
**Integration**: Invoked by whole-editor or whole-content-validator
**Features**:
- Validates bidirectional links (A→B requires B→A)
- Builds reference graphs with connectivity analysis
- Identifies high-connectivity concepts (hubs)
- Suggests strategic link additions
- Advanced: Cross-domain analysis, orphaned reference detection
**When to use**: After editing cross-references, for reference graph analysis

### whole-translator
**Purpose**: Complex translation with cultural adaptation
**Model**: haiku
**Integration**: Invoked by whole-editor for complex translations
**Features**:
- Cultural adaptation (Vietnamese primary, not literal translation)
- Terminology glossary management
- Consistency checking across functions
- Documents translation choices and alternatives
- Validates bilingual format compliance
**When to use**: Complex concepts, terminology audits, bulk translations
**Don't use for**: Simple words (use bilingual-rules.md), format validation (use scripts)

## Hooks

### session-init.cjs (unified v2.0)
Runs on session startup to display:
- Current progress (X/50 functions)
- Next suggested function
- Key rules reminder
- Available commands

### progress-indicator.cjs
PostToolUse hook for feedback after each tool call.

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

**PROJECT COMPLETE** - Progress tracked in `.whole-progress.json`:
- 50/50 functions completed (100%)
- All 10 domains complete
- 2,072 concepts processed
- 371 groups created
- Project duration: 12 days (2025-12-16 to 2025-12-27)

Use `/status` for quick check or `/report` for detailed report.
