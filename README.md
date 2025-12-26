# Whole Knowledge Architecture

Claude Code skills for editing and managing the Whole bilingual knowledge architecture documentation.

## Current Progress

```
██████████████████████░░░░░░░░ 74% (37/50 functions)
```

**Completed Domains**: FOUNDATIONS, DYNAMICS, OPERATIONS, CREATION, NAVIGATION, INTEGRATION, VALIDATION
**In Progress**: AMPLIFICATION (2/5)
**Remaining**: TRANSCENDENCE, META

## Quick Start

1. Clone this repo
2. Open with Claude Code: `cd Whole && claude`
3. Check progress: `/status`
4. Start working: `/regroup` (auto-detects next function)

## Skills

| Skill | Purpose |
|-------|---------|
| whole-editor | Main editing operations |
| whole-analyzer | Pre-edit analysis & duplicate detection |
| whole-reviewer | Post-edit validation |
| whole-regrouper | Concept reorganization into thematic groups |

## Commands

| Command | Description |
|---------|-------------|
| `/status` | Show current progress status |
| `/next` | Auto-detect next function to work on |
| `/analyze [section]` | Analyze section for issues |
| `/edit [section]` | Start editing session |
| `/expand [domain] [func] [topic]` | Add new concepts |
| `/regroup [number]` | Reorganize concepts (auto-detects if no number) |
| `/validate [section]` | Validate changes |
| `/report` | Generate comprehensive progress report |

## Core Philosophy

- **Only Add, Never Subtract**: Preserve all existing content
- **Bilingual Integrity**: Vietnamese primary, English secondary
- **4-Point Structure**: Definition, Context, Application, Integration (minimum)
- **Cross-Reference Integrity**: Bidirectional links always

## Document Structure

- **10 Domains** × **5 Functions** = **50 sections**
- 4-point descriptions for each concept
- Cross-references across domains

### Domains

1. FOUNDATIONS - Epistemological & ontological basics
2. DYNAMICS - Systems thinking & emergence
3. OPERATIONS - Process & workflow management
4. CREATION - Innovation & design thinking
5. NAVIGATION - Decision making & pathfinding
6. INTEGRATION - Synthesis & connection
7. VALIDATION - Testing & verification
8. AMPLIFICATION - Scaling & growth
9. TRANSCENDENCE - Meta-cognition & evolution
10. META - Self-reference & documentation

## Project Structure

```
Whole/
├── Whole.md                      # Main documentation (>1MB)
├── .whole-progress.json          # Progress tracking (37/50)
├── README.md                     # This file
├── .claude/
│   ├── CLAUDE.md                 # Project instructions
│   ├── README.md                 # Claude config docs
│   ├── settings.json             # Claude Code settings
│   ├── skills/
│   │   ├── whole-editor/
│   │   │   ├── SKILL.md
│   │   │   └── references/
│   │   ├── whole-analyzer/
│   │   │   └── SKILL.md
│   │   ├── whole-reviewer/
│   │   │   └── SKILL.md
│   │   └── whole-regrouper/
│   │       ├── SKILL.md
│   │       ├── references/
│   │       ├── plans/templates/
│   │       └── scripts/
│   ├── commands/
│   │   ├── analyze.md
│   │   ├── edit.md
│   │   ├── expand.md
│   │   ├── next.md
│   │   ├── regroup.md
│   │   ├── report.md
│   │   ├── status.md
│   │   └── validate.md
│   ├── hooks/
│   │   └── regroup-session-init.cjs
│   ├── agents/
│   │   ├── whole-content-validator.md
│   │   ├── whole-cross-reference.md
│   │   └── whole-translator.md
│   └── workflows/
│       ├── editing-workflow.md
│       ├── primary-workflow.md
│       ├── development-rules.md
│       └── quality-assurance.md
├── docs/
│   ├── project-overview.md
│   ├── skill-reference.md
│   ├── workflow-guide.md
│   └── troubleshooting.md
└── plans/
    └── templates/
```

## Workflow Example

```
User: /status
Claude: Progress: 37/50 (74%) | Next: CF38 | Domain: AMPLIFICATION

User: /regroup
Claude: [Auto-detects CF38: AMPLIFICATION > RESOURCE OPTIMIZATION]
        [Activates whole-regrouper]
        [Analyzes 45 concepts]
        [Proposes 8 thematic groups]

User: Approved

Claude: [Applies regrouping]
        [Validates changes]
        [Updates progress tracker]
        Summary: 45 concepts -> 8 groups, all content preserved
```

## Working with Whole.md

**IMPORTANT**: Whole.md is a large file (>1MB). Always:

1. Use `grep` to find relevant sections first
2. Read with `offset/limit` parameters
3. Never load the entire file at once

## Statistics

| Metric | Value |
|--------|-------|
| Total concepts processed | 1,504 |
| Total groups created | 278 |
| Average concepts/function | 40.6 |
| Average groups/function | 7.5 |
| Sessions completed | 23 |

## License

Private project for Whole Knowledge Architecture development.
